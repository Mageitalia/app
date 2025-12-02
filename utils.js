// ===== UTILITY FUNCTIONS =====

// Mostra messaggi
function showMessage(elementId, message, type) {
    const div = document.getElementById(elementId);
    if (!div) return;
    
    div.className = 'message ' + type;
    div.textContent = message;
    div.style.display = 'block';
    setTimeout(() => { div.style.display = 'none'; }, 4000);
}

// Logout
async function logout() {
    await supabase.auth.signOut();
    currentUser = null;
    currentRole = null;
    currentNome = null;
    currentPunto = null;
    window.location.href = 'index.html';
}

// Capitalizza nome
function capitalizeNome(nome) {
    return nome ? nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase() : '';
}

// Nome punto vendita
function getNomePunto(punto) {
    const punti = {
        'pisa': 'Pisa',
        'sesto': 'Sesto Fiorentino',
        'cosenza': 'Cosenza'
    };
    return punti[punto] || punto;
}

// ===== FUNZIONI REPORT EXCEL =====

async function generaReport(filtri) {
    try {
        if (typeof XLSX === 'undefined') {
            showMessage('reportMessage', '⚠️ Libreria Excel non caricata. Ricarica la pagina.', 'error');
            return;
        }

        showMessage('reportMessage', '⏳ Generando report...', 'info');
        
        const { punto, dataInizio, dataFine, tipo } = filtri;

        if (!dataInizio || !dataFine) {
            showMessage('reportMessage', '⚠️ Seleziona le date', 'error');
            return;
        }

        let query = supabase
            .from('registrazioni_giornaliere')
            .select(`
                *,
                dipendenti(nome, cognome),
                prodotti(nome, categoria, codice_prodotto),
                punti_vendita(nome)
            `)
            .gte('data_registrazione', dataInizio)
            .lte('data_registrazione', dataFine);

        if (punto && punto !== '') {
            query = query.eq('punto_vendita_id', punto);
        }

        const { data: registrazioni, error } = await query.order('data_registrazione');

        if (error) {
            console.error('Query error:', error);
            throw error;
        }

        if (!registrazioni || registrazioni.length === 0) {
            showMessage('reportMessage', 'ℹ️ Nessun dato nel periodo selezionato', 'info');
            return;
        }

        const wb = XLSX.utils.book_new();

        if (tipo === 'completo') {
            const wsData = [['Data', 'Operatore', 'Punto', 'Prodotto', 'Codice', 'Categoria', 'Recuperati', 'Buttati']];
            
            registrazioni.forEach(r => {
                wsData.push([
                    r.data_registrazione || '',
                    r.dipendenti ? (r.dipendenti.nome + ' ' + r.dipendenti.cognome) : '',
                    r.punti_vendita ? r.punti_vendita.nome : '',
                    r.prodotti ? r.prodotti.nome : '',
                    r.prodotti ? r.prodotti.codice_prodotto : '',
                    r.prodotti ? r.prodotti.categoria : '',
                    r.recuperati || 0,
                    r.buttati || 0
                ]);
            });

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, 'Report');

        } else if (tipo === 'riepilogo') {
            const byProd = {};
            registrazioni.forEach(r => {
                const key = r.prodotto_id;
                if (!byProd[key]) {
                    byProd[key] = { nome: '', codice: '', categoria: '', recuperati: 0, buttati: 0 };
                }
                if (r.prodotti) {
                    byProd[key].nome = r.prodotti.nome;
                    byProd[key].codice = r.prodotti.codice_prodotto;
                    byProd[key].categoria = r.prodotti.categoria;
                }
                byProd[key].recuperati += r.recuperati || 0;
                byProd[key].buttati += r.buttati || 0;
            });

            const wsData = [['Prodotto', 'Codice', 'Categoria', 'Recuperati', 'Buttati']];
            Object.values(byProd).forEach(p => {
                wsData.push([p.nome, p.codice, p.categoria, p.recuperati, p.buttati]);
            });

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, 'Riepilogo');

        } else {
            const filtered = registrazioni.filter(r => r.prodotti && r.prodotti.categoria === tipo);
            const wsData = [['Data', 'Operatore', 'Punto', 'Prodotto', 'Codice', 'Recuperati', 'Buttati']];
            
            filtered.forEach(r => {
                wsData.push([
                    r.data_registrazione || '',
                    r.dipendenti ? (r.dipendenti.nome + ' ' + r.dipendenti.cognome) : '',
                    r.punti_vendita ? r.punti_vendita.nome : '',
                    r.prodotti ? r.prodotti.nome : '',
                    r.prodotti ? r.prodotti.codice_prodotto : '',
                    r.recuperati || 0,
                    r.buttati || 0
                ]);
            });

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            const label = tipo === 'dolce' ? 'Dolci' : 'Salati';
            XLSX.utils.book_append_sheet(wb, ws, label);
        }

        const fileName = `Mage-Italia-Report-${dataInizio}-${dataFine}.xlsx`;
        XLSX.writeFile(wb, fileName);
        showMessage('reportMessage', '✅ Report scaricato con successo!', 'success');

    } catch (err) {
        console.error('Report error:', err);
        showMessage('reportMessage', '❌ Errore: ' + (err.message || 'Errore sconosciuto'), 'error');
    }
}

// ===== FUNZIONI DASHBOARD =====

async function loadDashboard() {
    try {
        let query = supabase.from('registrazioni_giornaliere').select('*', { count: 'exact', head: true });
        
        if (currentPunto && currentPunto !== '') {
            query = query.eq('punto_vendita_id', currentPunto);
        }

        const today = new Date().toISOString().split('T')[0];
        const { count: inserCount } = await query.eq('data_registrazione', today);

        document.getElementById('statInserimenti').textContent = inserCount || 0;

        // Carica ultimi inserimenti
        let queryInserimenti = supabase
            .from('registrazioni_giornaliere')
            .select(`
                id,
                data_registrazione,
                recuperati,
                buttati,
                dipendenti(nome, cognome),
                prodotti(nome, codice_prodotto, categoria)
            `)
            .order('created_at', { ascending: false })
            .limit(10);

        if (currentPunto && currentPunto !== '') {
            queryInserimenti = queryInserimenti.eq('punto_vendita_id', currentPunto);
        }

        const { data: inserimenti } = await queryInserimenti;

        const tbody = document.getElementById('tabellaInserimenti');
        if (tbody) {
            tbody.innerHTML = '';
            
            if (inserimenti) {
                inserimenti.forEach(ins => {
                    const row = tbody.insertRow();
                    row.innerHTML = `
                        <td>${ins.data_registrazione}</td>
                        <td>${ins.dipendenti ? ins.dipendenti.nome + ' ' + ins.dipendenti.cognome : '-'}</td>
                        <td>${ins.prodotti ? ins.prodotti.nome : '-'}</td>
                        <td><span class="prodotto-code">${ins.prodotti ? ins.prodotti.codice_prodotto : '-'}</span></td>
                        <td><strong>${ins.recuperati}</strong></td>
                        <td><strong>${ins.buttati}</strong></td>
                    `;
                });
            }
        }

    } catch (err) {
        console.error('Dashboard error:', err);
    }
}
