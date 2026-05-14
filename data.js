// ============================================================
//  MBG Monitor — Database Kasus & Koordinat
//  Diperbarui otomatis oleh GitHub Actions + Gemini AI
//  Format: window.MBG_DATA diakses oleh index.html
// ============================================================

window.MBG_DATA = {

  lastUpdated: "2026-05-14T07:00:00Z",

  // ----------------------------------------------------------
  //  KOORDINAT KABUPATEN/KOTA & PROVINSI
  //  Digunakan peta sebagai fallback jika kasus baru belum
  //  punya koordinat spesifik dari updater.py
  // ----------------------------------------------------------
  geoCoords: {
    // Jawa Tengah
    "Sukoharjo":          [-7.672,  110.838],
    "Wonogiri":           [-7.810,  110.920],
    "Klaten":             [-7.706,  110.656],
    "Semarang":           [-7.005,  110.438],
    "Boyolali":           [-7.532,  110.601],
    "Sragen":             [-7.426,  111.027],
    "Karanganyar":        [-7.603,  111.028],
    "Purworejo":          [-7.714,  110.017],
    "Kebumen":            [-7.668,  109.652],
    "Banyumas":           [-7.514,  109.293],
    // Jawa Barat
    "Bandung Barat":      [-6.846,  107.404],
    "Sumedang":           [-6.858,  107.920],
    "Bogor":              [-6.531,  107.069],
    "Ciamis":             [-7.394,  108.352],
    "Garut":              [-7.213,  107.906],
    "Tasikmalaya":        [-7.350,  108.220],
    "Cianjur":            [-6.817,  107.142],
    "Sukabumi":           [-6.921,  106.930],
    "Bandung":            [-6.917,  107.619],
    "Cirebon":            [-6.732,  108.551],
    "Karawang":           [-6.321,  107.338],
    "Bekasi":             [-6.238,  106.975],
    // Jawa Timur
    "Surabaya":           [-7.257,  112.752],
    "Lumajang":           [-8.126,  113.220],
    "Malang":             [-7.980,  112.630],
    "Kota Malang":        [-7.980,  112.630],
    "Kabupaten Malang":   [-8.160,  112.640],
    "Sidoarjo":           [-7.446,  112.718],
    "Gresik":             [-7.157,  112.655],
    "Pasuruan":           [-7.647,  112.906],
    "Kota Pasuruan":      [-7.647,  112.906],
    "Mojokerto":          [-7.471,  111.441],
    "Probolinggo":        [-7.754,  113.215],
    "Kota Probolinggo":   [-7.754,  113.215],
    "Jember":             [-8.172,  113.700],
    "Banyuwangi":         [-8.219,  114.370],
    "Lamongan":           [-7.119,  112.417],
    "Tuban":              [-6.897,  112.051],
    "Bojonegoro":         [-7.151,  111.881],
    "Madiun":             [-7.630,  111.524],
    "Ngawi":              [-7.407,  111.451],
    "Kediri":             [-7.816,  112.018],
    "Blitar":             [-8.098,  112.168],
    "Tulungagung":        [-8.065,  111.902],
    "Trenggalek":         [-8.051,  111.713],
    "Ponorogo":           [-7.866,  111.502],
    "Pacitan":            [-8.195,  111.101],
    "Nganjuk":            [-7.603,  111.906],
    "Jombang":            [-7.553,  112.235],
    "Sampang":            [-7.183,  113.250],
    "Pamekasan":          [-7.157,  113.473],
    "Sumenep":            [-6.998,  113.870],
    "Bangkalan":          [-7.040,  112.731],
    // Lampung
    "Lampung Utara":      [-4.550,  104.660],
    "Bandar Lampung":     [-5.389,  105.262],
    "Lampung Timur":      [-5.100,  105.900],
    "Lampung Selatan":    [-5.722,  105.561],
    "Lampung Tengah":     [-4.822,  105.224],
    "Pringsewu":          [-5.358,  104.973],
    "Pesawaran":          [-5.320,  105.092],
    "Tanggamus":          [-5.467,  104.625],
    "Metro":              [-5.113,  105.306],
    // Sumatera Utara
    "Toba":               [ 2.577,   99.084],
    "Nias Utara":         [ 1.308,   97.538],
    "Dairi":              [ 2.777,   98.320],
    "Nias Selatan":       [ 0.452,   97.830],
    "Medan":              [ 3.595,   98.672],
    "Deli Serdang":       [ 3.423,   98.771],
    "Serdang Bedagai":    [ 3.289,   99.170],
    "Simalungun":         [ 2.959,   99.061],
    "Karo":               [ 3.126,   98.491],
    "Langkat":            [ 3.805,   98.345],
    "Humbahas":           [ 2.175,   98.522],
    "Tapanuli Utara":     [ 2.063,   98.984],
    // Sumatera Selatan
    "Empat Lawang":       [-3.954,  103.082],
    "PALI":               [-3.501,  103.798],
    "Palembang":          [-2.976,  104.745],
    "Ogan Komering Ulu":  [-4.001,  104.169],
    "Musi Banyuasin":     [-2.567,  103.768],
    // Aceh
    "Aceh Selatan":       [ 3.000,   97.580],
    "Banda Aceh":         [ 5.548,   95.323],
    "Aceh Besar":         [ 5.367,   95.678],
    "Pidie":              [ 4.950,   96.133],
    // Sulawesi Tengah
    "Banggai Kepulauan":  [-1.580,  123.480],
    "Palu":               [-0.900,  119.878],
    "Donggala":           [-0.679,  119.740],
    // Maluku
    "Kota Tual":          [-5.630,  132.740],
    "Ambon":              [-3.658,  128.190],
    // Yogyakarta
    "Kota Yogyakarta":    [-7.797,  110.370],
    "Sleman":             [-7.717,  110.356],
    "Bantul":             [-7.888,  110.329],
    "Gunung Kidul":       [-7.960,  110.592],
    // DKI Jakarta
    "Jakarta Selatan":    [-6.261,  106.810],
    "Jakarta Barat":      [-6.168,  106.762],
    "Jakarta Timur":      [-6.225,  106.900],
    // Banten
    "Tangerang":          [-6.178,  106.630],
    "Serang":             [-6.119,  106.150],
    // Kalimantan Selatan
    "Banjarmasin":        [-3.316,  114.590],
    "Banjarbaru":         [-3.443,  114.834],
    // Fallback per provinsi
    "Jawa Tengah":        [-7.150,  110.140],
    "Jawa Barat":         [-6.889,  107.640],
    "Jawa Timur":         [-7.536,  112.238],
    "Lampung":            [-5.389,  105.262],
    "Sumatera Selatan":   [-3.319,  104.914],
    "Sumatera Utara":     [ 2.154,   99.522],
    "Sulawesi Tengah":    [-1.580,  123.480],
    "Maluku":             [-3.238,  130.145],
    "Aceh":               [ 4.695,   96.749],
    "Yogyakarta":         [-7.797,  110.370],
    "DKI Jakarta":        [-6.200,  106.816],
    "Banten":             [-6.405,  106.064],
    "Kalimantan Selatan": [-3.316,  114.590],
  },

  // ----------------------------------------------------------
  //  DATABASE KASUS
  //  Kasus baru dari updater.py disisipkan di atas array ini
  // ----------------------------------------------------------
  cases: [
    // ── JANUARI 2025 ──────────────────────────────────────
    { id:1,  tanggal:"2025-01-16", provinsi:"Jawa Tengah",    kabupaten:"Sukoharjo",        kecamatan:"Sukoharjo",    lokasi:"SD Negeri 3 Dukuh",              korban:40,   rawatInap:0,  gejala:"Mual, muntah (ayam marinasi)",                        sumber:"Kepresidenan / Detik.com", isNew:false, isKLB:false },
    // ── FEBRUARI 2025 ─────────────────────────────────────
    { id:2,  tanggal:"2025-02-18", provinsi:"Sumatera Selatan", kabupaten:"Empat Lawang",   kecamatan:"Tebing Tinggi",lokasi:"SPPG Tanjungkupang",             korban:8,    rawatInap:0,  gejala:"Gangguan kesehatan",                                  sumber:"BGN",                      isNew:false, isKLB:false },
    // ── MEI 2025 ──────────────────────────────────────────
    { id:3,  tanggal:"2025-05-05", provinsi:"Sumatera Selatan", kabupaten:"PALI",           kecamatan:"Talang Ubi",   lokasi:"SPPG Handayani Mulya",           korban:12,   rawatInap:0,  gejala:"Dugaan keracunan",                                    sumber:"BGN",                      isNew:false, isKLB:false },
    // ── JULI 2025 ─────────────────────────────────────────
    { id:4,  tanggal:"2025-07-15", provinsi:"Lampung",        kabupaten:"Lampung Utara",    kecamatan:"-",            lokasi:"SD Negeri, Lampung Utara",        korban:16,   rawatInap:0,  gejala:"Keracunan setelah santap MBG",                        sumber:"Cakra Lampung",            isNew:false, isKLB:false },
    // ── AGUSTUS 2025 ──────────────────────────────────────
    { id:5,  tanggal:"2025-08-12", provinsi:"Lampung",        kabupaten:"Bandar Lampung",   kecamatan:"-",            lokasi:"Sekolah, Lampung",                korban:18,   rawatInap:0,  gejala:"Mual, lemas usai konsumsi lele",                      sumber:"Liputan6",                 isNew:false, isKLB:false },
    { id:6,  tanggal:"2025-08-28", provinsi:"Lampung",        kabupaten:"Lampung Timur",    kecamatan:"-",            lokasi:"SMP, Lampung Timur",              korban:40,   rawatInap:31, gejala:"Keracunan, 31 rawat inap",                            sumber:"iNews Lampung",            isNew:false, isKLB:false },
    { id:7,  tanggal:"2025-08-30", provinsi:"Lampung",        kabupaten:"Lampung Utara",    kecamatan:"-",            lokasi:"Sekolah, Lampung Utara",          korban:16,   rawatInap:0,  gejala:"Keracunan MBG berulang",                              sumber:"Detik Sumbagsel",          isNew:false, isKLB:false },
    // ── SEPTEMBER 2025 ────────────────────────────────────
    { id:8,  tanggal:"2025-09-12", provinsi:"Jawa Tengah",    kabupaten:"Wonogiri",         kecamatan:"Wonogiri Kota",lokasi:"MIN Wonogiri",                    korban:110,  rawatInap:0,  gejala:"Mual, diare setelah santap MBG",                      sumber:"JOGLOSEMAR News",          isNew:false, isKLB:false },
    { id:9,  tanggal:"2025-09-17", provinsi:"Sulawesi Tengah",kabupaten:"Banggai Kepulauan",kecamatan:"Salakan",      lokasi:"RS Trikora Salakan",              korban:251,  rawatInap:78, gejala:"Keracunan massal, 78 rawat intensif",                 sumber:"Tribunnews",               isNew:false, isKLB:false },
    { id:10, tanggal:"2025-09-18", provinsi:"Maluku",         kabupaten:"Kota Tual",        kecamatan:"Tual",         lokasi:"SDN 19 Kota Tual",                korban:18,   rawatInap:10, gejala:"Keracunan usai santap MBG di sekolah",                sumber:"Tribun Manado",            isNew:false, isKLB:false },
    { id:11, tanggal:"2025-09-26", provinsi:"Jawa Barat",     kabupaten:"Bandung Barat",    kecamatan:"Cipongkor",    lokasi:"Berbagai sekolah, Cipongkor KBB", korban:1333, rawatInap:0,  gejala:"Keracunan bakteri massal — kasus terbesar tunggal",   sumber:"Kompas / Detik",           isNew:false, isKLB:false },
    { id:12, tanggal:"2025-09-26", provinsi:"Jawa Barat",     kabupaten:"Sumedang",         kecamatan:"-",            lokasi:"Berbagai sekolah, Sumedang",      korban:164,  rawatInap:0,  gejala:"Keracunan MBG massal",                                sumber:"Detik.com",                isNew:false, isKLB:false },
    { id:13, tanggal:"2025-09-26", provinsi:"Jawa Barat",     kabupaten:"Bogor",            kecamatan:"Jonggol",      lokasi:"SMP, Jonggol, Bogor",             korban:4,    rawatInap:0,  gejala:"Dugaan keracunan menu MBG",                           sumber:"Detiknews",                isNew:false, isKLB:false },
    { id:14, tanggal:"2025-09-26", provinsi:"Lampung",        kabupaten:"Bandar Lampung",   kecamatan:"Way Lunik",    lokasi:"SMAN 6 Bandar Lampung",           korban:300,  rawatInap:0,  gejala:"Keracunan massal, dapur Way Lunik disetop",           sumber:"Liputan6",                 isNew:false, isKLB:false },
    { id:15, tanggal:"2025-09-29", provinsi:"Jawa Barat",     kabupaten:"Ciamis",           kecamatan:"Pamarican",    lokasi:"SMPN 4 Pamarican, Ciamis",        korban:52,   rawatInap:0,  gejala:"Keracunan (ayam dan labu)",                           sumber:"Tribunnews",               isNew:false, isKLB:false },
    // ── OKTOBER 2025 ──────────────────────────────────────
    { id:16, tanggal:"2025-10-01", provinsi:"Jawa Barat",     kabupaten:"Bogor",            kecamatan:"Megamendung",  lokasi:"SDN Pasir Angin 02, Bogor",       korban:107,  rawatInap:3,  gejala:"107 siswa sakit, 3 muntah",                           sumber:"Detikjabar",               isNew:false, isKLB:false },
    { id:17, tanggal:"2025-10-01", provinsi:"Lampung",        kabupaten:"Lampung Utara",    kecamatan:"-",            lokasi:"SMA, Lampung Utara",              korban:52,   rawatInap:0,  gejala:"Keracunan (menu ayam crispy MBG)",                    sumber:"Detik Sumbagsel",          isNew:false, isKLB:false },
    { id:18, tanggal:"2025-10-09", provinsi:"Jawa Tengah",    kabupaten:"Wonogiri",         kecamatan:"Slogohimo",    lokasi:"Sekolah & Pesantren, Slogohimo",  korban:200,  rawatInap:0,  gejala:"Keracunan massal (ratusan siswa + santri)",           sumber:"Detikjateng",              isNew:false, isKLB:false },
    { id:19, tanggal:"2025-10-17", provinsi:"Jawa Barat",     kabupaten:"Bogor",            kecamatan:"Gunung Putri", lokasi:"SDN Ciangsana 02, Bogor",          korban:7,    rawatInap:0,  gejala:"Mual, muntah usai konsumsi MBG",                      sumber:"Kompas.com",               isNew:false, isKLB:false },
    { id:20, tanggal:"2025-10-20", provinsi:"Sumatera Utara", kabupaten:"Toba",             kecamatan:"-",            lokasi:"Berbagai sekolah, Kab. Toba",     korban:121,  rawatInap:32, gejala:"Dugaan keracunan MBG, 32 dirawat RS",                sumber:"Metro Daily",              isNew:false, isKLB:false },
    { id:21, tanggal:"2025-10-20", provinsi:"Jawa Timur",     kabupaten:"Pasuruan",         kecamatan:"Bangil",       lokasi:"SDN Kolursari, Bangil",           korban:47,   rawatInap:5,  gejala:"Mual, muntah, pusing usai makan MBG",                 sumber:"Radar Bromo",              isNew:false, isKLB:false },
    { id:22, tanggal:"2025-10-31", provinsi:"Sumatera Utara", kabupaten:"Nias Utara",       kecamatan:"-",            lokasi:"SD, Nias Utara",                  korban:30,   rawatInap:0,  gejala:"Sakit perut, sesak napas (susu MBG)",                 sumber:"Wahana News Nias",         isNew:false, isKLB:false },
    // ── NOVEMBER 2025 ─────────────────────────────────────
    { id:23, tanggal:"2025-11-08", provinsi:"Jawa Timur",     kabupaten:"Probolinggo",      kecamatan:"Dringu",       lokasi:"SDN Dringu 2, Probolinggo",       korban:38,   rawatInap:0,  gejala:"Mual, diare, pusing — menu ikan asin MBG",           sumber:"Radar Bromo",              isNew:false, isKLB:false },
    { id:24, tanggal:"2025-11-22", provinsi:"Jawa Timur",     kabupaten:"Jember",           kecamatan:"Sumbersari",   lokasi:"SMPN 3 Jember",                   korban:63,   rawatInap:8,  gejala:"Keracunan massal, 8 rawat inap",                      sumber:"Jember Pos",               isNew:false, isKLB:false },
    { id:25, tanggal:"2025-11-30", provinsi:"Jawa Timur",     kabupaten:"Mojokerto",        kecamatan:"Sooko",        lokasi:"SD di Kec. Sooko, Mojokerto",     korban:29,   rawatInap:0,  gejala:"Mual, kram perut (ayam & nasi MBG)",                  sumber:"Mojokerto Post",           isNew:false, isKLB:false },
    // ── DESEMBER 2025 ─────────────────────────────────────
    { id:26, tanggal:"2025-12-04", provinsi:"Lampung",        kabupaten:"Lampung Selatan",  kecamatan:"Kalianda",     lokasi:"SMPN Kalianda, Lamsel",           korban:40,   rawatInap:0,  gejala:"Dugaan keracunan makanan MBG",                        sumber:"Dinkes Lamsel",            isNew:false, isKLB:false },
    { id:27, tanggal:"2025-12-18", provinsi:"Jawa Timur",     kabupaten:"Malang",           kecamatan:"Blimbing",     lokasi:"SDN Blimbing 3, Kota Malang",     korban:55,   rawatInap:4,  gejala:"Mual, muntah usai konsumsi nasi MBG — lauk ayam",    sumber:"Malang Posco",             isNew:false, isKLB:false },
    // ── JANUARI 2026 ──────────────────────────────────────
    { id:28, tanggal:"2026-01-14", provinsi:"Jawa Tengah",    kabupaten:"Wonogiri",         kecamatan:"Jatisrono",    lokasi:"Berbagai sekolah, Jatisrono",     korban:206,  rawatInap:0,  gejala:"Keracunan massal MBG",                                sumber:"Suara Merdeka",            isNew:false, isKLB:false },
    { id:29, tanggal:"2026-01-27", provinsi:"Jawa Timur",     kabupaten:"Sidoarjo",         kecamatan:"Gedangan",     lokasi:"SDN Gedangan 1, Sidoarjo",        korban:41,   rawatInap:3,  gejala:"Mual, muntah, pusing — menu tempe & sayur MBG",      sumber:"Delta FM Sidoarjo",        isNew:false, isKLB:false },
    // ── FEBRUARI 2026 ─────────────────────────────────────
    { id:30, tanggal:"2026-02-05", provinsi:"Jawa Timur",     kabupaten:"Gresik",           kecamatan:"Driyorejo",    lokasi:"SDN Driyorejo 1, Gresik",         korban:33,   rawatInap:0,  gejala:"Mual, diare (nasi + ayam MBG)",                       sumber:"Gresik Today",             isNew:false, isKLB:false },
    { id:31, tanggal:"2026-02-12", provinsi:"Sumatera Utara", kabupaten:"Dairi",            kecamatan:"-",            lokasi:"Berbagai sekolah, Kab. Dairi",    korban:271,  rawatInap:0,  gejala:"Keracunan MBG (terus bertambah)",                     sumber:"Mistar.id",                isNew:false, isKLB:false },
    { id:32, tanggal:"2026-02-15", provinsi:"Lampung",        kabupaten:"Bandar Lampung",   kecamatan:"Kemiling",     lokasi:"Berbagai sekolah, Kemiling",      korban:300,  rawatInap:0,  gejala:"Keracunan massal MBG",                                sumber:"VIVA Lampung",             isNew:false, isKLB:false },
    { id:33, tanggal:"2026-02-19", provinsi:"Jawa Timur",     kabupaten:"Lamongan",         kecamatan:"Deket",        lokasi:"SDN Deket Wetan, Lamongan",       korban:27,   rawatInap:0,  gejala:"Mual, lemas (telur & sayur MBG basi)",                sumber:"Lensa Indonesia",          isNew:false, isKLB:false },
    { id:34, tanggal:"2026-02-24", provinsi:"Sumatera Utara", kabupaten:"Nias Selatan",     kecamatan:"Kepulauan Batu",lokasi:"SDN 071123 Kepulauan Batu",       korban:35,   rawatInap:0,  gejala:"Dugaan keracunan MBG",                                sumber:"Komunitas Today",          isNew:false, isKLB:false },
    { id:35, tanggal:"2026-02-28", provinsi:"Aceh",           kabupaten:"Aceh Selatan",     kecamatan:"-",            lokasi:"Wilayah Aceh Selatan",            korban:120,  rawatInap:0,  gejala:"KLB keracunan pangan MBG ditetapkan Dinkes",          sumber:"Merdeka.com",              isNew:false, isKLB:true  },
    // ── MARET 2026 ────────────────────────────────────────
    { id:36, tanggal:"2026-03-10", provinsi:"Jawa Timur",     kabupaten:"Jember",           kecamatan:"Patrang",      lokasi:"SDN Patrang 1, Jember",           korban:52,   rawatInap:6,  gejala:"Keracunan massal, mual dan muntah",                   sumber:"Jawa Pos",                 isNew:false, isKLB:false },
    { id:37, tanggal:"2026-03-18", provinsi:"Jawa Timur",     kabupaten:"Banyuwangi",       kecamatan:"Banyuwangi",   lokasi:"SMPN 1 Banyuwangi",               korban:44,   rawatInap:2,  gejala:"Mual, pusing, diare (menu ikan MBG)",                 sumber:"Radar Banyuwangi",         isNew:false, isKLB:false },
    { id:38, tanggal:"2026-03-25", provinsi:"Jawa Timur",     kabupaten:"Tulungagung",      kecamatan:"Kedungwaru",   lokasi:"SDN Kedungwaru 1, Tulungagung",   korban:36,   rawatInap:0,  gejala:"Mual, lemas usai makan MBG",                          sumber:"Kabar Tulungagung",        isNew:false, isKLB:false },
    // ── APRIL 2026 ────────────────────────────────────────
    { id:39, tanggal:"2026-04-07", provinsi:"Jawa Timur",     kabupaten:"Nganjuk",          kecamatan:"Nganjuk",      lokasi:"SDN Begadung 2, Nganjuk",         korban:31,   rawatInap:0,  gejala:"Keracunan usai santap MBG, mual dan diare",           sumber:"Radar Kediri",             isNew:false, isKLB:false },
    { id:40, tanggal:"2026-04-15", provinsi:"Jawa Timur",     kabupaten:"Kediri",           kecamatan:"Ngasem",       lokasi:"SDN Ngasem, Kab. Kediri",         korban:49,   rawatInap:3,  gejala:"Mual, muntah — menu ayam & nasi MBG diduga basi",    sumber:"Radar Kediri",             isNew:false, isKLB:false },
    { id:41, tanggal:"2026-04-22", provinsi:"Jawa Timur",     kabupaten:"Malang",           kecamatan:"Kepanjen",     lokasi:"SDN Kepanjen 1, Kab. Malang",     korban:58,   rawatInap:4,  gejala:"Keracunan massal (40+ anak + 18 guru)",               sumber:"Malang Posco",             isNew:false, isKLB:false },
    // ── MEI 2026 ──────────────────────────────────────────
    { id:42, tanggal:"2026-05-08", provinsi:"Jawa Timur",     kabupaten:"Lumajang",         kecamatan:"Jatiroto",     lokasi:"SMKN 1 Jatiroto, Lumajang",       korban:200,  rawatInap:0,  gejala:"Ratusan siswa & guru alami diare, diselidiki",        sumber:"RI News Portal",           isNew:false, isKLB:false },
    { id:43, tanggal:"2026-05-12", provinsi:"Jawa Timur",     kabupaten:"Surabaya",         kecamatan:"-",            lokasi:"Berbagai sekolah, Surabaya",      korban:200,  rawatInap:0,  gejala:"Keracunan MBG — walimurid minta ganti bekal",         sumber:"Kompas.com",               isNew:false, isKLB:false },
  ]

}; // end MBG_DATA
