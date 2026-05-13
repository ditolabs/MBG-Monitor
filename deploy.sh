#!/bin/bash

# --- MBG Monitor Deployment Script ---
# Script ini membantu mengunggah (push) perubahan terbaru ke GitHub 
# agar sistem otomatisasi GitHub Actions & Gemini API mulai bekerja.

# Warna untuk output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== MBG Monitor Deployer ===${NC}"

# 1. Pastikan folder .github/workflows tersedia
echo -e "${YELLOW}Menyiapkan struktur folder...${NC}"
mkdir -p .github/workflows

# 2. Verifikasi file-file utama
FILES=("index.html" "updater.py" "requirements.txt" ".github/workflows/auto-update.yml")
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}Error: File $file tidak ditemukan!${NC}"
        echo -e "Pastikan Anda sudah membuat semua file sesuai diskusi."
        exit 1
    fi
done

echo -e "${GREEN}Semua file terverifikasi.${NC}"

# 3. Proses Git
echo -e "${YELLOW}Melakukan staging file...${NC}"
git add .

# Input pesan commit (opsional)
read -p "Masukkan pesan commit [Update sistem otomatisasi]: " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update sistem otomatisasi MBG Monitor & Gemini API"
fi

echo -e "${YELLOW}Melakukan commit...${NC}"
git commit -m "$commit_msg"

echo -e "${YELLOW}Mengirim ke GitHub (push)...${NC}"
git push origin main # Ganti 'main' dengan 'master' jika branch Anda masih master

if [ $? -eq 0 ]; then
    echo -e "${GREEN}=== BERHASIL TERDEPLOY ===${NC}"
    echo -e "Silakan cek tab 'Actions' di halaman GitHub Anda."
    echo -e "${YELLOW}PENTING:${NC} Pastikan Anda sudah menambahkan ${BLUE}GEMINI_API_KEY${NC} di Settings > Secrets repositori Anda."
else
    echo -e "${RED}Gagal melakukan push. Pastikan koneksi internet aktif dan git sudah terkonfigurasi.${NC}"
fi