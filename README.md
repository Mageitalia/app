# 🍽️ Mage Italia v2.0 - Ready to Deploy

Questa cartella contiene **tutto quello che serve** per mettere Mage Italia online.

## 📦 Contenuto

- `index.html` - L'applicazione completa (Supabase Edition)
- `netlify.toml` - Configurazione per Netlify
- `vercel.json` - Configurazione per Vercel

## 🚀 Deploy Rapido (Scegli 1)

### **Netlify (Consigliato - Drag & Drop)**

1. Vai su https://netlify.com
2. Sign up con email
3. **Trascina questa cartella intera nella pagina**
4. Deploy automatico in 10 secondi ✅
5. Link: `https://mage-italia-xxxxx.netlify.app`

---

### **Vercel**

1. Vai su https://vercel.com
2. Sign up con email
3. New Project → Import from GitHub/Local
4. Seleziona questa cartella
5. Deploy ✅
6. Link: `https://mage-italia-xxxxx.vercel.app`

---

### **Firebase**

1. Vai su https://firebase.google.com
2. Crea progetto
3. `npm install -g firebase-tools`
4. `firebase login`
5. `firebase init hosting`
6. `firebase deploy`
7. Link: `https://mage-italia-xxxxx.web.app`

---

## 🔐 Prima di Deployare

✅ **Verifica che Supabase sia configurato**
- Apri `index.html` in un editor di testo
- Cerca: `const SUPABASE_URL = 'https://uoeprypjgybmpfstnrih.supabase.co'`
- Verifica che le credenziali siano presenti

✅ **Database Supabase deve avere i dati**
- Dipendenti importati ✅
- Prodotti importati ✅
- Utenti admin creati ✅

---

## 📱 Dopo il Deploy

Una volta online:

1. **Accedi** con le credenziali admin
2. **Dashboard** carica i dati da Supabase
3. **Operatori** possono compilare il form
4. **Report** si generano in Excel

---

## 🔗 URL Utili

- **Supabase**: https://supabase.com/dashboard
- **Netlify**: https://app.netlify.com
- **Vercel**: https://vercel.com/dashboard

---

## 🆘 Troubleshooting

**"Errore di connessione"**
- Verifica le credenziali Supabase in `index.html`
- Controlla che il database sia online
- Apri Console (F12) per vedere gli errori

**"Non carica i dati"**
- Verifica che i dipendenti/prodotti siano importati
- Controlla le credenziali Supabase
- Prova a fare logout e login di nuovo

**"Il dominio non funziona"**
- Attendi 1-2 minuti, il deploy impiega tempo
- Pulisci cache browser (Ctrl+Shift+Del)
- Riprova

---

## 📊 Statistiche

- **Linee di codice**: 2000+
- **Versione**: 2.0 (Supabase)
- **Browser**: Chrome, Firefox, Safari, Edge
- **Mobile**: Responsive design

---

**Mage Italia è pronto per il web!** 🚀

Buon deploy! 🎉
