# 🍽️ Mage Italia v2.0 - Food Waste Management System

Sistema di gestione scarti alimentari per panifici e ristoranti. Powered by **Supabase** ☁️

![Mage Italia](https://img.shields.io/badge/version-2.0-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/status-active-brightgreen?style=flat-square)

---

## 🎯 Panoramica

**Mage Italia** è un'applicazione web moderna per tracciare e gestire gli scarti alimentari.

### Funzionalità Principali
- 📝 **Form Giornaliero**: Compila gli scarti direttamente online
- 📊 **Report Excel**: Genera automaticamente report giornalieri e riepilogativi
- 👥 **Gestione Operatori**: Admin può aggiungere e gestire gli operatori
- 🍽️ **Catalogo Prodotti**: Database completo di dolci e salati
- ☁️ **Cloud Database**: Sincronizzazione real-time con Supabase
- 📱 **Responsive Design**: Funziona su PC, tablet, smartphone
- 🔐 **Autenticazione**: Login sicuro con email e password

---

## 📋 Requisiti

- Browser moderno (Chrome, Firefox, Safari, Edge)
- Connessione internet
- Account Supabase (gratuito)
- Netlify o Vercel per il deploy (gratuito)

---

## 🚀 Quick Start

### 1. Deploy Istantaneo su Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TuoUsername/mage-italia)

Oppure manualmente:

```bash
# 1. Clona il repository
git clone https://github.com/TuoUsername/mage-italia.git

# 2. Vai nella cartella
cd mage-italia

# 3. Apri index.html nel browser
# Oppure fai deploy su Netlify
```

### 2. Configura Supabase

1. Vai su [https://supabase.com](https://supabase.com)
2. Crea un nuovo progetto
3. Copia le credenziali:
   - Project URL
   - Anon Key
4. Nel file `index.html`, sostituisci:
   ```javascript
   const SUPABASE_URL = 'https://TUO_URL.supabase.co';
   const SUPABASE_KEY = 'TUA_KEY';
   ```

### 3. Importa Database

Nel SQL Editor di Supabase, esegui:

```sql
-- Esegui lo script in docs/database.sql
```

Oppure scarica il file **`MAGE_ITALIA_FULL_SETUP_FINALE.sql`** dalla documentazione.

### 4. Crea Utente Admin

In Supabase → Authentication → Users → Create new user

---

## 📁 Struttura Progetto

```
mage-italia/
├── index.html              # App principale
├── netlify.toml            # Config Netlify
├── vercel.json             # Config Vercel
├── .gitignore              # Git ignore
├── README.md               # Questo file
├── LICENSE                 # MIT License
└── docs/
    ├── SETUP.md            # Guida setup
    ├── DATABASE.md         # Schema database
    ├── GUIDE.md            # Guida utente
    ├── DEPLOY.md           # Guida deploy
    ├── API.md              # Documentazione API
    └── database.sql        # Script SQL
```

---

## 🔧 Configurazione

### Variabili di Ambiente

Nel file `index.html` (linee 847-848):

```javascript
const SUPABASE_URL = 'https://uoeprypjgybmpfstnrih.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

Sostituisci con le tue credenziali Supabase.

### Configurazione Netlify

Il file `netlify.toml` è già configurato. Non serve cambiare nulla.

---

## 📖 Documentazione

- **[SETUP.md](docs/SETUP.md)** - Come configurare il sistema
- **[DATABASE.md](docs/DATABASE.md)** - Schema database e tabelle
- **[GUIDE.md](docs/GUIDE.md)** - Guida completa per gli utenti
- **[DEPLOY.md](docs/DEPLOY.md)** - Come deployare online
- **[API.md](docs/API.md)** - Documentazione API Supabase

---

## 🚀 Deploy Online

### Netlify (Consigliato)

1. Push il repo su GitHub
2. Vai su [https://netlify.com](https://netlify.com)
3. Clicca "New site from Git"
4. Autorizza GitHub
5. Seleziona il repo `mage-italia`
6. Deploy automatico ✅

Il sito sarà online a: `https://mage-italia-xxxxx.netlify.app`

### Vercel

1. Vai su [https://vercel.com](https://vercel.com)
2. Clicca "New Project"
3. Importa il repo GitHub
4. Deploy automatico ✅

### Firebase

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🎮 Come Usare

### Per Admin

1. **Login**: Email e password
2. **Amministrazione** → Dipendenti
   - Aggiungi operatori
   - Gestisci ubicazioni
3. **Amministrazione** → Prodotti
   - Aggiungi prodotti
   - Definisci categorie
4. **Amministrazione** → Report
   - Genera report Excel
   - Scegli intervallo date

### Per Operatori

1. **Login**: Email e password
2. **Compila Scarti**
   - Seleziona data
   - Inserisci prodotti recuperati
   - Inserisci prodotti buttati
3. **Salva registrazioni**

---

## 📊 Tecnologie

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Librerie**:
  - XLSX.js (generazione Excel)
  - Supabase JS Client
- **Deploy**: Netlify / Vercel

---

## 🔐 Sicurezza

- ✅ Autenticazione email/password
- ✅ Credenziali Supabase in variabili
- ✅ HTTPS/SSL automatico
- ✅ RLS (Row Level Security) su Supabase
- ✅ Backup automatico dei dati

---

## 📞 Support & Help

- **Documentazione**: Leggi i file in `/docs`
- **Issues**: Apri un issue su GitHub
- **Email**: Contattami per problemi

---

## 🤝 Contributi

Contributi benvenuti! 

1. Fork il progetto
2. Crea un branch (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

---

## 📄 License

Questo progetto è sotto licenza **MIT**. Vedi il file [LICENSE](LICENSE) per dettagli.

---

## 🎉 Credits

- **Mage Italia** - Sistema gestione scarti
- **Supabase** - Database cloud
- **Netlify** - Hosting
- **XLSX.js** - Generazione Excel

---

## 📈 Roadmap

- [ ] v2.1: Miglioramenti UI/UX
- [ ] v2.2: Grafici e statistiche avanzate
- [ ] v3.0: Mobile app (iOS/Android)
- [ ] v3.1: Integrazione foto scarti
- [ ] v3.2: API pubblica
- [ ] v4.0: Multi-tenant completo

---

## 🌐 Link Utili

- [Supabase](https://supabase.com)
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub](https://github.com)

---

**Made with ❤️ for Mage Italia**

Ultima modifica: Dicembre 2024
