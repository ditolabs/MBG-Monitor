#!/bin/bash

# ============================================================
#  MBG Monitor — Deployment Script
#  Versi: 2.0 (merged Claude UI + Gemini backend)
#  Diperbarui sesuai struktur file terbaru:
#    index.html · data.js · updater.py · requirements.txt
#    .github/workflows/update.yml
# ============================================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${BLUE}${BOLD}"
echo "╔══════════════════════════════════════════╗"
echo "║       MBG Monitor — Deploy Script        ║"
echo "║   Auto-update via GitHub Actions + AI    ║"
echo "╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ── 1. CEK GIT REPO ─────────────────────────────────────────
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Folder ini bukan git repository.${NC}"
    echo -e "Jalankan terlebih dahulu: ${CYAN}git init && git remote add origin <URL_REPO>${NC}"
    exit 1
fi

# ── 2. SIAPKAN FOLDER WORKFLOW ───────────────────────────────
echo -e "${YELLOW}[1/5] Menyiapkan struktur folder...${NC}"
mkdir -p .github/workflows

# ── 3. VERIFIKASI FILE UTAMA ─────────────────────────────────
echo -e "${YELLOW}[2/5] Memverifikasi file-file utama...${NC}"

FILES=(
    "index.html"
    "data.js"
    "updater.py"
    "requirements.txt"
    ".github/workflows/update.yml"
)

ALL_OK=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✔${NC} $file"
    else
        echo -e "  ${RED}✘ $file — TIDAK DITEMUKAN${NC}"
        ALL_OK=false
    fi
done

if [ "$ALL_OK" = false ]; then
    echo ""
    echo -e "${RED}Deploy dibatalkan. Pastikan semua file sudah ada.${NC}"
    echo -e "Struktur yang dibutuhkan:"
    echo -e "  ${CYAN}repo/"
    echo -e "  ├── index.html"
    echo -e "  ├── data.js"
    echo -e "  ├── updater.py"
    echo -e "  ├── requirements.txt"
    echo -e "  └── .github/"
    echo -e "      └── workflows/"
    echo -e "          └── update.yml${NC}"
    exit 1
fi

echo -e "  ${GREEN}Semua file terverifikasi.${NC}"

# ── 4. INFO DATASET ──────────────────────────────────────────
echo ""
echo -e "${YELLOW}[3/5] Mengecek dataset...${NC}"

# Hitung jumlah kasus di data.js
KASUS_COUNT=$(grep -c "tanggal:" data.js 2>/dev/null || echo "?")
LAST_UPDATED=$(grep -o 'lastUpdated:.*"[^"]*"' data.js 2>/dev/null | grep -o '"[^"]*"' | tail -1 | tr -d '"')

echo -e "  ${CYAN}Jumlah kasus dalam data.js : ${BOLD}${KASUS_COUNT}${NC}"
echo -e "  ${CYAN}Last updated               : ${BOLD}${LAST_UPDATED:-tidak ditemukan}${NC}"

# ── 5. DETEKSI BRANCH ────────────────────────────────────────
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
echo ""
echo -e "${YELLOW}[4/5] Branch aktif: ${CYAN}${BRANCH}${NC}"

# ── 6. PROSES GIT ────────────────────────────────────────────
echo ""
echo -e "${YELLOW}[5/5] Proses Git...${NC}"

# Tampilkan file yang berubah
CHANGED=$(git status --short)
if [ -z "$CHANGED" ]; then
    echo -e "  ${CYAN}Tidak ada perubahan baru. Tidak ada yang perlu di-push.${NC}"
    exit 0
fi

echo -e "  File yang berubah:"
git status --short | while read line; do
    echo -e "    ${CYAN}${line}${NC}"
done

echo ""
git add .

# Input pesan commit
read -p "$(echo -e "${BOLD}Pesan commit${NC} [Enter = default]: ")" commit_msg
if [ -z "$commit_msg" ]; then
    TIMESTAMP=$(date +'%Y-%m-%d %H:%M')
    commit_msg="🚀 Deploy MBG Monitor v2 — ${TIMESTAMP}"
fi

echo ""
echo -e "${YELLOW}Melakukan commit...${NC}"
git commit -m "$commit_msg"

echo -e "${YELLOW}Push ke GitHub (branch: ${BRANCH})...${NC}"
git push origin "$BRANCH"

PUSH_STATUS=$?

# ── HASIL ────────────────────────────────────────────────────
echo ""
if [ $PUSH_STATUS -eq 0 ]; then
    echo -e "${GREEN}${BOLD}"
    echo "╔══════════════════════════════════════════╗"
    echo "║           ✅  DEPLOY BERHASIL            ║"
    echo "╚══════════════════════════════════════════╝"
    echo -e "${NC}"

    # Coba deteksi nama repo untuk URL
    REMOTE_URL=$(git remote get-url origin 2>/dev/null)
    REPO_PATH=$(echo "$REMOTE_URL" | sed 's/.*github.com[:/]//' | sed 's/\.git$//')
    PAGES_URL="https://$(echo $REPO_PATH | cut -d'/' -f1).github.io/$(echo $REPO_PATH | cut -d'/' -f2)"

    echo -e "${CYAN}Langkah selanjutnya:${NC}"
    echo ""
    echo -e "  ${BOLD}1. Tambahkan GEMINI_API_KEY di GitHub Secrets${NC}"
    echo -e "     ${BLUE}https://github.com/${REPO_PATH}/settings/secrets/actions${NC}"
    echo -e "     Name  : ${YELLOW}GEMINI_API_KEY${NC}"
    echo -e "     Value : API key dari ${BLUE}https://aistudio.google.com${NC}"
    echo ""
    echo -e "  ${BOLD}2. Aktifkan GitHub Pages${NC}"
    echo -e "     ${BLUE}https://github.com/${REPO_PATH}/settings/pages${NC}"
    echo -e "     Source : Deploy from branch → ${YELLOW}${BRANCH}${NC} → / (root)"
    echo ""
    echo -e "  ${BOLD}3. Pantau GitHub Actions${NC}"
    echo -e "     ${BLUE}https://github.com/${REPO_PATH}/actions${NC}"
    echo -e "     Workflow: ${YELLOW}🤖 MBG Monitor — Auto Update Data${NC}"
    echo -e "     Jadwal : setiap 5 menit (bisa dipicu manual)"
    echo ""
    echo -e "  ${BOLD}4. URL Website (setelah Pages aktif)${NC}"
    echo -e "     ${GREEN}${PAGES_URL}${NC}"
    echo ""
    echo -e "${YELLOW}Catatan:${NC}"
    echo -e "  • GitHub Actions mungkin delay 5–15 menit di jam sibuk — normal"
    echo -e "  • Pastikan repo bersifat ${BOLD}public${NC} agar Actions gratis unlimited"
    echo -e "  • Kunjungi Actions → Run workflow untuk test manual pertama kali"
else
    echo -e "${RED}${BOLD}"
    echo "╔══════════════════════════════════════════╗"
    echo "║           ❌  PUSH GAGAL                 ║"
    echo "╚══════════════════════════════════════════╝"
    echo -e "${NC}"
    echo -e "Kemungkinan penyebab:"
    echo -e "  • Belum login git: ${CYAN}git config --global user.email 'kamu@email.com'${NC}"
    echo -e "  • Remote belum di-set: ${CYAN}git remote add origin <URL_REPO>${NC}"
    echo -e "  • Koneksi internet bermasalah"
    echo -e "  • Branch protection rule di GitHub"
    echo ""
    echo -e "Coba push manual: ${CYAN}git push origin ${BRANCH}${NC}"
    exit 1
fi
