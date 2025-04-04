// Détection avancée des appareils mobiles et optimisation en conséquence

// Fonction pour détecter si l'utilisateur est sur mobile
function detectMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Expressions régulières pour détecter les appareils mobiles
    const regexPhone = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
    const regexTablet = /android|ipad|playbook|silk/i;
    
    // Détecter le type d'appareil
    const isMobile = regexPhone.test(userAgent);
    const isTablet = !isMobile && regexTablet.test(userAgent);
    
    // Déterminer l'OS
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(userAgent);
    
    // Déterminer le navigateur
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    const isChrome = /chrome/i.test(userAgent) && !/edge/i.test(userAgent);
    
    // Déterminer l'orientation
    const isPortrait = window.innerHeight > window.innerWidth;
    
    return {
        isMobile,
        isTablet,
        isIOS,
        isAndroid,
        isSafari,
        isChrome,
        isPortrait,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio || 1
    };
}

// Appliquer les optimisations mobiles
function applyMobileOptimizations() {
    const device = detectMobileDevice();
    
    // Ajouter une classe au body pour les styles CSS spécifiques
    if (device.isMobile) {
        document.body.classList.add('mobile-device');
    }
    if (device.isTablet) {
        document.body.classList.add('tablet-device');
    }
    if (device.isIOS) {
        document.body.classList.add('ios-device');
    }
    if (device.isAndroid) {
        document.body.classList.add('android-device');
    }
    
    // Optimisations spécifiques à iOS
    if (device.isIOS) {
        // Éviter les problèmes de défilement sur iOS
        document.addEventListener('touchmove', function(e) {
            if (document.querySelector('.leaflet-container').contains(e.target)) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Ajuster les styles pour tenir compte de la barre de navigation iOS
        const safeAreaElement = document.createElement('meta');
        safeAreaElement.setAttribute('name', 'viewport');
        safeAreaElement.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        document.head.appendChild(safeAreaElement);
        
        // Ajouter du padding pour la safe area
        document.body.style.paddingBottom = 'env(safe-area-inset-bottom)';
    }
    
    // Optimisations pour mobiles à petit écran
    if (device.screenWidth < 360) {
        document.body.classList.add('small-screen');
    }
    
    // Améliorer la réactivité des éléments tactiles
    if (device.isMobile || device.isTablet) {
        // Ajuster les zones tactiles pour qu'elles soient plus grandes
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .mosque-btn, .mosque-directions, #refresh-btn {
                min-height: 44px;
                min-width: 44px;
            }
            #mosques li {
                padding: 12px 8px;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Détecter les changements d'orientation
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            const isPortrait = window.innerHeight > window.innerWidth;
            if (isPortrait) {
                document.body.classList.add('portrait');
                document.body.classList.remove('landscape');
            } else {
                document.body.classList.add('landscape');
                document.body.classList.remove('portrait');
            }
            
            // Rafraîchir la carte si elle existe
            if (window.map) {
                window.map.invalidateSize();
            }
        }, 200);
    });
    
    // Appliquer l'orientation initiale
    if (device.isPortrait) {
        document.body.classList.add('portrait');
    } else {
        document.body.classList.add('landscape');
    }
}

// Exécuter lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', applyMobileOptimizations);
