#!/usr/bin/env python3
"""
MBG Monitor — Auto Updater
Dijalankan oleh GitHub Actions setiap 5 menit.
Scrape Google News RSS → Gemini AI ekstrak → tulis ke data.js
"""

import os, json, re, datetime, sys, time
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai

# ── KONFIGURASI ──────────────────────────────────────────────────────────────
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
DATA_FILE      = "data.js"
MAX_NEWS_ITEMS = 15       # berita terbaru yang dibaca Gemini
MIN_KORBAN     = 5        # abaikan kasus dengan korban < angka ini

# Keyword Google News RSS — variasi luas untuk tangkap lebih banyak kasus
KEYWORDS = [
    "keracunan+makan+bergizi+gratis",
    "keracunan+MBG+siswa",
    "keracunan+massal+MBG+sekolah",
    "diduga+keracunan+MBG",           # tangkap "diduga keracunan MBG"
    "mual+muntah+massal+MBG",         # tangkap variasi gejala
    "keracunan+program+makan+bergizi",
    "siswa+dirawat+MBG",              # tangkap kasus rawat inap
    "keracunan+MBG+Jawa+Timur",       # spesifik Jatim
    "keracunan+MBG+Jawa+Tengah",
    "keracunan+MBG+Jawa+Barat",
    "keracunan+MBG+Lampung",
    "keracunan+MBG+Sumatera",
]

# Wikipedia sebagai sumber historis — tangkap kasus yang tidak ada di RSS
WIKIPEDIA_URL = "https://id.wikipedia.org/wiki/Daftar_kasus_keracunan_massal_program_Makan_Bergizi_Gratis"

# ── VALIDASI ─────────────────────────────────────────────────────────────────
if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY tidak ditemukan di environment!")
    sys.exit(1)

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# ── BACA DATA EXISTING ────────────────────────────────────────────────────────
def load_existing_cases(filepath):
    """Baca kasus yang sudah ada dari data.js untuk dedup."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        matches = re.findall(r'tanggal:\s*"([^"]+)".*?kabupaten:\s*"([^"]+)"', content, re.DOTALL)
        return set((t[:7], k.lower()) for t, k in matches)
    except Exception as e:
        print(f"⚠ Tidak bisa baca file existing: {e}")
        return set()

def get_next_id(filepath):
    """Cari ID tertinggi di data.js untuk menentukan ID berikutnya."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        ids = re.findall(r'\bid:\s*(\d+)', content)
        return max(int(i) for i in ids) + 1 if ids else 100
    except:
        return 100

# ── SCRAPING GOOGLE NEWS RSS ──────────────────────────────────────────────────
def fetch_news():
    """Ambil berita dari Google News RSS dengan banyak keyword."""
    all_items = []
    seen_titles = set()
    headers = {"User-Agent": "Mozilla/5.0 (compatible; MBGMonitorBot/1.0)"}

    for keyword in KEYWORDS:
        url = f"https://news.google.com/rss/search?q={keyword}&hl=id&gl=ID&ceid=ID:id"
        try:
            resp = requests.get(url, headers=headers, timeout=15)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.content, features="xml")
            items = soup.findAll("item")

            for item in items:
                title = item.find("title").text.strip() if item.find("title") else ""
                pub   = item.find("pubDate").text.strip() if item.find("pubDate") else ""
                desc  = item.find("description").text.strip() if item.find("description") else ""
                link  = item.find("link").text.strip() if item.find("link") else ""

                # Filter: skip jika tidak mengandung kata kunci penting
                combined = (title + " " + desc).lower()
                if not any(kw in combined for kw in ["mbg", "makan bergizi", "keracunan"]):
                    continue

                if title and title not in seen_titles:
                    seen_titles.add(title)
                    all_items.append({
                        "title": title,
                        "pub_date": pub,
                        "description": BeautifulSoup(desc, "html.parser").get_text()[:400],
                        "link": link
                    })
        except Exception as e:
            print(f"⚠ Gagal fetch keyword '{keyword}': {e}")
        time.sleep(0.5)

    # Urutkan terbaru, ambil MAX_NEWS_ITEMS
    all_items = all_items[:MAX_NEWS_ITEMS]
    print(f"✅ Total {len(all_items)} artikel unik dari Google News RSS")
    return all_items

# ── SCRAPING WIKIPEDIA ────────────────────────────────────────────────────────
def fetch_wikipedia_cases(existing_cases):
    """
    Ambil daftar kasus dari halaman Wikipedia MBG.
    Ini tangkap kasus historis yang tidak muncul di RSS karena sudah lama.
    """
    headers = {"User-Agent": "Mozilla/5.0 (compatible; MBGMonitorBot/1.0)"}
    print("\n📖 Scraping Wikipedia untuk kasus historis...")
    try:
        resp = requests.get(WIKIPEDIA_URL, headers=headers, timeout=20)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.content, "html.parser")

        # Cari semua tabel wikitable di halaman
        tables = soup.find_all("table", class_=re.compile("wikitable"))
        wiki_items = []

        for table in tables:
            rows = table.find_all("tr")
            headers_row = rows[0].find_all(["th", "td"]) if rows else []
            header_texts = [h.get_text(strip=True).lower() for h in headers_row]

            # Cari kolom yang relevan
            col_map = {}
            for i, h in enumerate(header_texts):
                if any(x in h for x in ["tanggal", "date"]): col_map["tanggal"] = i
                elif any(x in h for x in ["lokasi", "tempat", "wilayah"]): col_map["lokasi"] = i
                elif any(x in h for x in ["korban", "jumlah"]): col_map["korban"] = i
                elif any(x in h for x in ["provinsi"]): col_map["provinsi"] = i
                elif any(x in h for x in ["kabupaten", "kota"]): col_map["kabupaten"] = i
                elif any(x in h for x in ["kecamatan"]): col_map["kecamatan"] = i
                elif any(x in h for x in ["gejala", "keterangan"]): col_map["gejala"] = i
                elif any(x in h for x in ["sumber", "referensi"]): col_map["sumber"] = i

            if not col_map.get("tanggal") and not col_map.get("lokasi"):
                continue  # bukan tabel kasus, skip

            for row in rows[1:]:
                cells = row.find_all(["td", "th"])
                if len(cells) < 2:
                    continue
                def cell(k):
                    idx = col_map.get(k)
                    return cells[idx].get_text(strip=True) if idx is not None and idx < len(cells) else ""

                wiki_items.append({
                    "title": f"[Wikipedia] {cell('lokasi') or cell('kabupaten')} - {cell('tanggal')}",
                    "pub_date": cell("tanggal"),
                    "description": f"Lokasi: {cell('lokasi')}. Provinsi: {cell('provinsi')}. Kabupaten: {cell('kabupaten')}. Kecamatan: {cell('kecamatan')}. Korban: {cell('korban')}. Gejala: {cell('gejala')}.",
                    "link": WIKIPEDIA_URL
                })

        print(f"   Ditemukan {len(wiki_items)} baris dari Wikipedia")
        return wiki_items

    except Exception as e:
        print(f"⚠ Gagal scrape Wikipedia: {e}")
        return []

# ── GEMINI AI EKSTRAKSI ───────────────────────────────────────────────────────
def extract_cases_with_gemini(news_items, existing_cases):
    """Kirim daftar berita ke Gemini, minta ekstrak kasus terstruktur."""
    if not news_items:
        print("ℹ Tidak ada berita untuk dianalisis.")
        return []

    today = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    news_text = "\n".join(
        f"[{i+1}] [{item['pub_date'][:16]}] {item['title']}\n    {item['description']}"
        for i, item in enumerate(news_items)
    )

    prompt = f"""
Berikut daftar berita terbaru keracunan program Makan Bergizi Gratis (MBG) di Indonesia:

{news_text}

Tugasmu:
1. Ekstrak SEMUA kasus keracunan yang disebutkan menjadi JSON array.
2. Jika berita sama (kasus yang sama), gabungkan menjadi 1 entri.
3. Hanya masukkan kasus dengan korban minimal {MIN_KORBAN} orang.
4. Abaikan berita yang bukan tentang keracunan MBG (opini, kebijakan, dll).
5. Tanggal hari ini: {today}. Jika tanggal kejadian tidak jelas, gunakan tanggal publikasi berita.

Keluarkan HANYA JSON array murni tanpa markdown, tanpa penjelasan:
[
  {{
    "tanggal": "YYYY-MM-DD",
    "provinsi": "Nama Provinsi Lengkap",
    "kabupaten": "Nama Kabupaten/Kota",
    "kecamatan": "Nama Kecamatan atau -",
    "lokasi": "Nama Sekolah/Tempat Spesifik",
    "korban": 50,
    "rawatInap": 0,
    "gejala": "deskripsi gejala singkat",
    "sumber": "Nama Media",
    "isKLB": false
  }}
]

Jika tidak ada kasus yang bisa diekstrak, keluarkan: []
"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        # Bersihkan markdown jika ada
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
        text = text.strip()

        cases = json.loads(text)
        if not isinstance(cases, list):
            print("⚠ Gemini tidak mengembalikan array.")
            return []

        # Filter dedup — skip kasus yang sudah ada (bulan + kabupaten sama)
        new_cases = []
        for c in cases:
            key = (c.get("tanggal", "")[:7], c.get("kabupaten", "").lower())
            if key not in existing_cases:
                new_cases.append(c)
            else:
                print(f"  ↩ Skip duplikat: {c.get('kabupaten')} ({c.get('tanggal','')})")

        print(f"✅ Gemini ekstrak {len(cases)} kasus, {len(new_cases)} kasus baru setelah dedup.")
        return new_cases

    except json.JSONDecodeError as e:
        print(f"❌ Gagal parse JSON dari Gemini: {e}")
        print(f"   Raw response: {response.text[:500]}")
        return []
    except Exception as e:
        print(f"❌ Error Gemini: {e}")
        return []

# ── TULIS KE DATA.JS ──────────────────────────────────────────────────────────
def write_to_datajs(filepath, new_cases, next_id):
    """Sisipkan kasus baru di awal array cases, update lastUpdated."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Buat string JS untuk kasus-kasus baru
    js_entries = ""
    for i, c in enumerate(new_cases):
        cid = next_id + i
        korban    = int(c.get("korban", 0))
        rawat     = int(c.get("rawatInap", 0))
        is_klb    = "true" if c.get("isKLB") else "false"
        tanggal   = c.get("tanggal", "").replace('"', '')
        provinsi  = c.get("provinsi", "").replace('"', '').replace("'", '')
        kabupaten = c.get("kabupaten", "").replace('"', '').replace("'", '')
        kecamatan = c.get("kecamatan", "-").replace('"', '').replace("'", '')
        lokasi    = c.get("lokasi", "-").replace('"', '').replace("'", '')
        gejala    = c.get("gejala", "-").replace('"', '').replace("'", '')
        sumber    = c.get("sumber", "AI/Google News").replace('"', '').replace("'", '')

        js_entries += f"""
    {{ id:{cid}, tanggal:"{tanggal}", provinsi:"{provinsi}", kabupaten:"{kabupaten}", kecamatan:"{kecamatan}", lokasi:"{lokasi}", korban:{korban}, rawatInap:{rawat}, gejala:"{gejala}", sumber:"{sumber}", isNew:true, isKLB:{is_klb} }},"""

    if not js_entries:
        print("ℹ Tidak ada kasus baru untuk ditulis.")
        return False

    # Sisipkan setelah "cases: ["
    target = "cases: ["
    pos = content.find(target)
    if pos == -1:
        print("❌ Tidak menemukan 'cases: [' di data.js")
        return False

    insert_at = pos + len(target)
    content = content[:insert_at] + js_entries + content[insert_at:]

    # Update lastUpdated timestamp
    now_iso = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    content = re.sub(
        r'lastUpdated:\s*"[^"]*"',
        f'lastUpdated: "{now_iso}"',
        content
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ data.js diperbarui: {len(new_cases)} kasus baru ditambahkan (ID mulai {next_id}).")
    return True

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    print(f"\n{'='*60}")
    print(f"  MBG Monitor Updater — {datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"{'='*60}\n")

    print("📖 Membaca kasus existing dari data.js...")
    existing = load_existing_cases(DATA_FILE)
    next_id  = get_next_id(DATA_FILE)
    print(f"   Ditemukan {len(existing)} entri existing, next ID: {next_id}")

    # ── Sumber 1: Google News RSS ──────────────────────────
    print("\n🔍 Scraping Google News RSS...")
    rss_news = fetch_news()

    # ── Sumber 2: Wikipedia ────────────────────────────────
    wiki_news = fetch_wikipedia_cases(existing)

    # Gabungkan semua sumber
    all_news = rss_news + wiki_news
    print(f"\n📦 Total sumber yang dikirim ke Gemini: {len(all_news)} item")

    if not all_news:
        print("ℹ Tidak ada berita ditemukan dari semua sumber. Selesai.")
        return

    print("\n🤖 Meminta Gemini menganalisis semua sumber...")
    new_cases = extract_cases_with_gemini(all_news, existing)

    if new_cases:
        print(f"\n💾 Menulis {len(new_cases)} kasus baru ke data.js...")
        write_to_datajs(DATA_FILE, new_cases, next_id)
    else:
        print("\nℹ Tidak ada kasus baru. data.js tidak diubah.")

    print("\n✅ Selesai.\n")

if __name__ == "__main__":
    main()
