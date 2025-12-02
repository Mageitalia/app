// ===== CONFIG SUPABASE =====
const SUPABASE_URL = 'https://uoeprypjgybmpfstnrih.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvZXByeXBqZ3libXBmc3RucmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDcyNDAsImV4cCI6MjA4MDE4MzI0MH0.dDlthk4idy21aWEldrqB1U9-5awh42rC9v6fa0_mFyI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== VARIABILI GLOBALI =====
let currentUser = null;
let currentRole = null;
let currentNome = null;
let currentPunto = null;
let logoBase64 = null;

// ===== LOAD LOGO DA LOCALSTORAGE =====
function loadLogo() {
    const savedLogo = localStorage.getItem('mageitaliaLogo');
    if (savedLogo) {
        logoBase64 = savedLogo;
        const loginLogo = document.getElementById('loginLogo');
        const appLogo = document.getElementById('appLogo');
        if (loginLogo) loginLogo.src = logoBase64;
        if (appLogo) appLogo.src = logoBase64;
    }
}

// ===== FUNZIONE: CHECK SESSIONE =====
async function checkSession() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Session error:', error);
            return null;
        }
        
        if (data.session && data.session.user) {
            currentUser = data.session.user;
            const metadata = currentUser.user_metadata || {};
            currentRole = metadata.role || 'operatore';
            currentNome = metadata.nome || 'Utente';
            currentPunto = metadata.punto_vendita || null;
            
            console.log('Sessione trovata:', { currentRole, currentNome, currentPunto });
            return data.session.user;
        }
        
        return null;
    } catch (err) {
        console.error('Check session error:', err);
        return null;
    }
}

// ===== FUNZIONE: REDIRECT INTELLIGENTE =====
async function redirectIntelligente() {
    const user = await checkSession();
    
    if (!user) {
        // Nessuna sessione, vai a login
        window.location.href = 'index.html';
        return;
    }
    
    // Controlla dove dovrebbe stare
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentRole === 'admin') {
        if (currentPage !== 'admin.html') {
            window.location.href = 'admin.html';
        }
    } else {
        // Operatore
        const puntoPagina = `operatore-${currentPunto}.html`;
        if (currentPage !== puntoPagina && currentPage !== 'index.html') {
            window.location.href = puntoPagina;
        }
    }
}

// Load logo al caricamento
document.addEventListener('DOMContentLoaded', loadLogo);
