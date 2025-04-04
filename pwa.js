// Aide à l'installation PWA pour les appareils mobiles
// Détecte si l'application peut être installée et affiche un message

let deferredPrompt;
const installBanner = document.createElement('div');
installBanner.style.display = 'none';
installBanner.className = 'install-banner';

// Préparer la bannière
installBanner.innerHTML = `
    <div class="install-content">
        <p>Installez cette application sur votre appareil</p>
        <div class="install-buttons">
            <button id="install-button">Installer</button>
            <button id="dismiss-button">Plus tard</button>
        </div>
    </div>
`;

document.body.appendChild(installBanner);

// Styles pour la bannière d'installation
const style = document.createElement('style');
style.textContent = `
    .install-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #7c3f00;
        color: white;
        padding: 12px;
        z-index: 1000;
        box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
    }
    .install-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .install-content p {
        margin: 0;
        padding: 5px 0;
    }
    .install-buttons {
        display: flex;
        gap: 10px;
    }
    .install-buttons button {
        background-color: white;
        color: #7c3f00;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
    }
    #dismiss-button {
        background-color: transparent;
        color: white;
    }
`;

document.head.appendChild(style);

// Événement déclenché lorsque le navigateur est prêt à installer l'application
window.addEventListener('beforeinstallprompt', (e) => {
    // Empêcher Chrome de montrer automatiquement l'invite d'installation
    e.preventDefault();
    
    // Stocker l'événement pour pouvoir le déclencher plus tard
    deferredPrompt = e;
    
    // Afficher notre bannière d'installation personnalisée
    installBanner.style.display = 'block';
});

// Gestion des boutons d'installation
document.getElementById('install-button').addEventListener('click', async () => {
    // Cacher la bannière
    installBanner.style.display = 'none';
    
    // Montrer l'invite d'installation
    if (deferredPrompt) {
        deferredPrompt.prompt();
        
        // Attendre que l'utilisateur réponde à l'invite
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Installation: ${outcome}`);
        
        // On ne peut utiliser deferredPrompt qu'une fois
        deferredPrompt = null;
    }
});

document.getElementById('dismiss-button').addEventListener('click', () => {
    // Cacher la bannière
    installBanner.style.display = 'none';
});

// Événement lorsque l'application a été installée
window.addEventListener('appinstalled', (evt) => {
    // Cacher la bannière si elle est encore visible
    installBanner.style.display = 'none';
    
    // Journalisation pour les statistiques
    console.log('Application installée');
});