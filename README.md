# 🧴 Skinthesia – Personalized Skincare Recommendation Platform
Skinthesia adalah platform web yang membantu pengguna memilih produk skincare yang tepat berdasarkan kondisi kulit mereka dengan memanfaatkan teknologi Machine Learning dan sistem rekomendasi berbasis data. Proyek ini merupakan bagian dari Capstone Project Coding Camp 2025 dengan tema *Health Innovation*.

## 📌 Daftar Isi
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Cara Menjalankan Proyek](#cara-menjalankan-proyek)

---

## ✨ Fitur Utama
- Rekomendasi produk skincare berdasarkan:
  - Jenis kulit
  - Masalah kulit (skin concern)
  - Tujuan perawatan (skin goals)
  - Preferensi ingredients
- Sistem klasifikasi multi-label dengan TensorFlow
- UI responsif dan interaktif menggunakan React.js & Tailwind CSS
- RESTful API yang aman dan terdokumentasi
- Filtering produk berdasarkan harga, kategori, dan usia


## 💻 Tech Stack
### Development Tools
- Visual Studio Code
- GitHub
- Figma

### Front-End
- JavaScript
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Anime.js
- Lucide-react
- Prettier

### Back-End
- Hapi.js
- Joi
- Vision & Inert
- JWT
- Bcrypt 
- Dotenv 
- Hapi-Swagger
- MySQL 
- DBeaver
- mysql2 
- Nanoid 
- Postman 
- Nodemon 
- PM2 

---
## 📁 Struktur Proyek
```
SKINTHESIA-CAPSTONE
│
├── backend
│   ├── dist/                  # Build output folder
│   ├── public/                # Static public files
│   ├── utils/                 # Utility modules
│   ├── .env                   # Environment variables
│   ├── .gitignore             # Git ignore file
│   ├── handler.js             # Request handler logic
│   ├── options.js             # Configuration or middleware options
│   ├── package.json           # Backend dependencies and scripts
│   ├── package-lock.json      # Exact dependency versions
│   ├── routes.js              # API route definitions
│   ├── server.js              # Main server entry point
│   └── userData.sql           # SQL file for user data
│
├── frontend
│   ├── dist/                  # Build output folder
│   ├── node_modules/          # Frontend dependencies
│   ├── public/                # Static assets (HTML, icons, etc.)
│   ├── src/                   # Source code (React/JS files etc.)
│   ├── .gitignore             # Git ignore file
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # Main HTML file
│   ├── package.json           # Frontend dependencies and scripts
│   └── package-lock.json      # Exact dependency versions
│   ├── postcss.config.js      # PostCSS configuration
│   ├── vite.config.js         # Vite configuration for development/build
│   └── README.md              # Frontend-specific README (if applicable)
│
├── .gitignore                 # Root git ignore
└── README.md                  # Main project README
```

---

## 🚀 Cara Menjalankan Proyek
### 1. Clone Repository
```bash
git clone https://github.com/Capstone-Coding-Camp/Skinthesia-Capstone.git
cd Skinthesia-Capstone
```

### 2. Jalankan Front-End
```bash
cd frontend
npm install
npm run dev
```

### 3. Jalankan Back-End
```bash
cd backend
npm install
npm run start
```

