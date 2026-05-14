import os
import json
import datetime
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai

# 1. Konfigurasi Gemini menggunakan API Key dari GitHub Secrets
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY tidak ditemukan!")
    exit(1)

genai.configure(api_key=GEMINI_API_KEY)
# Menggunakan model Gemini 1.5 Flash yang cepat dan gratis
model = genai.GenerativeModel('gemini-1.5-flash')

print("Mencari berita terbaru dari Google News...")
keyword = "keracunan+makan+bergizi+gratis"
# Tambahkan +when:1y untuk mencari arsip berita 1 tahun ke belakang
url = f"https://news.google.com/rss/search?q={keyword}+when:1y&hl=id&gl=ID&ceid=ID:id"

response = requests.get(url)
soup = BeautifulSoup(response.content, features="xml")
items = soup.findAll('item')

# Kumpulkan 5 berita terbaru untuk dibaca Gemini
news_texts = ""
for item in items[:20]:
    title = item.find('title').text
    pub_date = item.find('pubDate').text
    news_texts += f"- [{pub_date}] {title}\n"

if not news_texts:
    print("Tidak ada berita ditemukan.")
    exit(0)

print("Kumpulan berita ditemukan. Meminta Gemini menganalisis data...")

# 2. Prompt untuk Gemini
today_str = datetime.datetime.now().strftime("%Y-%m-%d")
prompt = f"""
Berikut adalah daftar arsip berita tentang keracunan Makan Bergizi Gratis (MBG):
{news_texts}

Tugasmu:
1. Ekstrak kasus-kasus tersebut menjadi format JSON array.
2. Jika beritanya sama/membahas kasus yang sama di daerah yang sama, gabungkan menjadi 1 kasus saja.
3. Ekstrak TANGGAL ASLI kejadian tersebut dari teks berita atau tanggal publikasi. Tulis dalam format YYYY-MM-DD. Jangan gunakan tanggal hari ini jika itu adalah kejadian lama!

Keluarkan HANYA JSON murni tanpa format markdown ```json, contoh formatnya:
[
  {{
    "id": 999,
    "tanggal": "2024-11-20", 
    "provinsi": "Nama Provinsi",
    "kabupaten": "Nama Kabupaten/Kota",
    "kecamatan": "-",
    "kelurahan": "-",
    "lokasi": "Nama Sekolah",
    "korban": 50,
    "rawatInap": 0,
    "gejala": "Pusing, mual",
    "sumber": "Nama Media",
    "isNew": false,
    "isKLB": false
  }}
]
"""

try:
    # 3. Panggil Gemini
    ai_response = model.generate_content(prompt)
    response_text = ai_response.text.strip()
    
    # Bersihkan markdown jika Gemini masih membandel memberikannya
    if response_text.startswith("```json"):
        response_text = response_text[7:-3].strip()
    elif response_text.startswith("```"):
        response_text = response_text[3:-3].strip()
        
    kasus_baru = json.loads(response_text)
    
    if not kasus_baru:
        print("Gemini tidak menemukan kasus baru yang relevan dari teks tersebut.")
        exit(0)
        
    print(f"Gemini berhasil mengekstrak {len(kasus_baru)} kasus baru!")

    # 4. Ubah JSON dari Gemini menjadi string JavaScript
    kasus_baru_js = ""
    for kasus in kasus_baru:
        kasus['id'] = "Date.now() + Math.floor(Math.random() * 1000)"
        
        kasus_js = f"""
  {{ 
    id: {kasus['id']}, 
    tanggal: "{kasus['tanggal']}", 
    provinsi: "{kasus['provinsi']}", 
    kabupaten: "{kasus['kabupaten']}", 
    kecamatan: "{kasus['kecamatan']}", 
    kelurahan: "{kasus['kelurahan']}", 
    lokasi: "{kasus['lokasi']}", 
    korban: {kasus['korban']}, 
    rawatInap: {kasus['rawatInap']}, 
    gejala: "{kasus['gejala']}", 
    sumber: "{kasus['sumber']}", 
    isNew: true, 
    isKLB: {'true' if kasus['isKLB'] else 'false'} 
  }},"""
        kasus_baru_js += kasus_js

    # 5. Suntikkan ke dalam data.js (BUKAN index.html)
    with open('data.js', 'r', encoding='utf-8') as file:
        content = file.read()

    target_string = "let CASES = ["
    insert_position = content.find(target_string) + len(target_string)

    if insert_position > len(target_string):
        new_content = content[:insert_position] + kasus_baru_js + content[insert_position:]
        
        with open('data.js', 'w', encoding='utf-8') as file:
            file.write(new_content)
        print("Database data.js berhasil diperbarui!")
    else:
        print("Error: Tidak menemukan array CASES di data.js")

except Exception as e:
    print(f"Terjadi kesalahan saat memproses dengan Gemini: {e}")
