/**
 * Fonction pour créer un popup amélioré pour une mosquée
 * @param {String} name - Nom de la mosquée
 * @param {String} address - Adresse de la mosquée
 * @param {Number} distance - Distance en km
 * @param {Number} lat - Latitude
 * @param {Number} lng - Longitude
 * @returns {String} - Contenu HTML du popup
 */
function createEnhancedPopup(name, address, distance, lat, lng) {
    return `
        <div style="text-align: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32" style="margin: 0 auto 5px auto;">
                <path d="M256 32C135.1 32 36.1 127.9 32.2 248c-.2 6.6 5.1 12 11.7 12h39.3c5.8 0 10.5-4.3 11.4-10 14.1-93.7 93.1-166 190.6-166 106 0 192 86 192 192s-86 192-192 192c-97.5 0-176.5-72.3-190.6-166-1-5.7-5.6-10-11.4-10H32.9c-6.6 0-11.9 5.4-11.7 12C25.9 384.1 124.9 480 245.8 480h10.2C379.5 480 480 379.5 480 256S379.5 32 256 32z" fill="#7c3f00"/>
            </svg>
            <strong style="font-size: 16px; color: #7c3f00;">${name}</strong>
        </div>
        <div style="margin-top: 12px; border-top: 1px dashed #ddd; padding-top: 10px;">
            ${address ? `<div style="margin-bottom: 8px;"><strong style="color: #5e3000;">Adresse:</strong> ${address}</div>` : ''}
            <div><strong style="color: #5e3000;">Distance:</strong> ${distance.toFixed(1)} km</div>
        </div>
        <div style="margin-top: 15px; text-align: center;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" style="display: inline-block; background-color: #7c3f00; color: white; padding: 8px 15px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: bold;">Itinéraire</a>
        </div>
    `;
}
