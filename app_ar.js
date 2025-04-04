// المتغيرات العامة
let map;
let userMarker;
let mosquesMarkers = [];
let userPosition = null;
let statusElement;
let mosquesListElement;
let isMobile;

// دالة تهيئة واجهة المستخدم
function initUI() {
    statusElement = document.getElementById('status');
    mosquesListElement = document.getElementById('mosques');
    isMobile = window.innerWidth <= 768;
    
    // معالجة الأحداث الخاصة بالهواتف المحمولة
    if (isMobile) {
        // الكشف عن تغييرات الاتجاه
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                map.invalidateSize();
            }, 200);
        });
        
        // تنفيذ كاشف سحب بسيط للتنقل بين الخريطة والقائمة
        let touchStartY = 0;
        let touchEndY = 0;
        const mapElement = document.getElementById('map');
        const listElement = document.getElementById('mosque-list');
        
        // الكشف عن السحب على الخريطة
        mapElement.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: true});
        
        mapElement.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, {passive: true});
        
        // الكشف عن السحب على القائمة
        listElement.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, {passive: true});
        
        listElement.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            const swipeDistance = touchEndY - touchStartY;
            
            // السحب للأعلى (من الخريطة إلى القائمة)
            if (swipeDistance < -50) {
                listElement.scrollIntoView({ behavior: 'smooth' });
            }
            
            // السحب للأسفل (من القائمة إلى الخريطة)
            if (swipeDistance > 50) {
                mapElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    // إضافة معالج لزر العودة (لإغلاق النوافذ المنبثقة على الجوال)
    window.addEventListener('popstate', function(event) {
        if (map) {
            map.closePopup();
        }
    });
}

// دالة التهيئة
function initApp() {
    // التحقق مما إذا كان هناك موقع محفوظ في localStorage
    let savedPosition = localStorage.getItem('userPosition');
    let initialView = [48.8566, 2.3522]; // باريس كافتراضي
    let initialZoom = 13;
    
    if (savedPosition) {
        try {
            const position = JSON.parse(savedPosition);
            initialView = [position.lat, position.lng];
            initialZoom = 15;
        } catch (e) {
            console.error('خطأ عند تحليل الموقع المحفوظ:', e);
        }
    }
    
    // الكشف عما إذا كنا على هاتف محمول
    const isMobile = window.innerWidth <= 768;
    
    // تهيئة الخريطة بخيارات تتكيف مع الهاتف المحمول
    map = L.map('map', {
        zoomControl: !isMobile, // تعطيل أدوات التكبير على الهاتف المحمول
        dragging: true, 
        tap: true, // تمكين النقر للهاتف المحمول
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true
    }).setView(initialView, initialZoom);
    
    // إضافة طبقة OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Style: <a href="https://www.hotosm.org/">HOT</a>',
        maxZoom: 19
    }).addTo(map);
    
    // إذا كنا على هاتف محمول، أضف أدوات التكبير في الزاوية اليسرى السفلية
    if (isMobile) {
        L.control.zoom({
            position: 'bottomleft'
        }).addTo(map);
    }
    
    // إضافة مقياس في الزاوية اليمنى السفلية
    L.control.scale({
        imperial: false,
        maxWidth: 200,
        position: 'bottomright'
    }).addTo(map);
    
    // تخصيص نمط الخريطة
    const mapContainer = document.getElementById('map');
    mapContainer.style.position = 'relative';
    
    // إنشاء وإضافة بوصلة صغيرة
    const compass = document.createElement('div');
    compass.className = 'map-compass';
    compass.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30" height="30">
        <path fill="#7c3f00" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
    </svg>`;
    mapContainer.appendChild(compass);
    
    // إضافة زر "موقعي" على الخريطة
    const locateButton = document.createElement('div');
    locateButton.className = 'locate-button';
    locateButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
        <path fill="#007bff" d="M256 0c17.7 0 32 14.3 32 32v32.2c1.7 0 3.4 0 5.1 .1c31.8 1.4 61.3 10 86.1 23.8L409 68.3c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-19.8 19.8c13.8 24.8 22.4 54.3 23.8 86.1c.1 1.7 .1 3.4 .1 5.1H490c17.7 0 32 14.3 32 32s-14.3 32-32 32H458.2c0 1.7 0 3.4-.1 5.1c-1.4 31.8-10 61.3-23.8 86.1L454 369c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-19.8-19.8c-24.8 13.8-54.3 22.4-86.1 23.8c-1.7 .1-3.4 .1-5.1 .1V458c0 17.7-14.3 32-32 32s-32-14.3-32-32V426.2c-1.7 0-3.4 0-5.1-.1c-31.8-1.4-61.3-10-86.1-23.8L103 422c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l19.8-19.8C63.8 332.1 55.1 302.6 53.8 270.8c-.1-1.7-.1-3.4-.1-5.1H22c-17.7 0-32-14.3-32-32s14.3-32 32-32H53.8c0-1.7 0-3.4 .1-5.1c1.4-31.8 10-61.3 23.8-86.1L58 91c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l19.8 19.8c24.8-13.8 54.3-22.4 86.1-23.8c1.7-.1 3.4-.1 5.1-.1V9.7c0-17.7 14.3-32 32-32zM256 192a64 64 0 1 0 0 128 64 64 0 1 0 0-128z"/>
    </svg>`;
    mapContainer.appendChild(locateButton);
    
    // إضافة حدث إلى زر تحديد الموقع
    locateButton.addEventListener('click', function() {
        if (userPosition) {
            map.setView([userPosition.lat, userPosition.lng], 16);
            
            // تأثير نبض لعلامة المستخدم
            const userIcon = document.querySelector('.user-location-icon');
            if (userIcon) {
                userIcon.classList.add('pulse-animation');
                setTimeout(() => {
                    userIcon.classList.remove('pulse-animation');
                }, 1500);
            }
        } else {
            getUserLocation();
        }
    });
    
    // إضافة حدث نقر على خلفية الخريطة للتحكم في النوافذ المنبثقة
    map.on('click', function() {
        // إغلاق جميع النوافذ المنبثقة المفتوحة
        map.closePopup();
    });
    
    // إضافة حدث تكبير لضبط الواجهة
    map.on('zoomend', function() {
        // ضبط حجم الأيقونات حسب مستوى التكبير
        const zoomLevel = map.getZoom();
        const icons = document.querySelectorAll('.mosque-icon, .user-location-icon');
        
        icons.forEach(icon => {
            if (zoomLevel > 16) {
                icon.classList.add('zoom-in');
            } else {
                icon.classList.remove('zoom-in');
            }
        });
    });
    
    // طلب موقع المستخدم
    getUserLocation();
}

// دالة للحصول على موقع المستخدم
function getUserLocation() {
    if ('geolocation' in navigator) {
        statusElement.textContent = 'البحث عن موقعك...';
        statusElement.classList.add('loading');
        
        // عرض رسالة محددة لأجهزة iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            statusElement.textContent = 'في انتظار الموقع... تأكد من أنك سمحت بتحديد الموقع.';
        }
        
        navigator.geolocation.getCurrentPosition(
            // نجاح
            position => {
                userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                statusElement.textContent = 'تم العثور على الموقع!';
                statusElement.classList.remove('loading');
                
                // حفظ الموقع في localStorage
                localStorage.setItem('userPosition', JSON.stringify(userPosition));
                
                // توسيط الخريطة على موقع المستخدم
                map.setView([userPosition.lat, userPosition.lng], 15);
                
                // إضافة علامة لموقع المستخدم
                if (userMarker) {
                    map.removeLayer(userMarker);
                }
                
                userMarker = L.marker([userPosition.lat, userPosition.lng], {
                    icon: L.divIcon({
                        className: 'user-marker',
                        html: '<div class="user-location-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" fill="#007bff"/></svg></div>',
                        iconSize: [36, 36],
                        iconAnchor: [18, 36]
                    })
                }).addTo(map);
                
                // إضافة دائرة حول موقع المستخدم للإشارة إلى الدقة
                L.circle([userPosition.lat, userPosition.lng], {
                    radius: position.coords.accuracy / 2,
                    color: '#007bff',
                    fillColor: '#007bff',
                    fillOpacity: 0.1,
                    weight: 1
                }).addTo(map);
                
                // البحث عن المساجد القريبة
                findMosques();
            },
            // خطأ
            error => {
                console.error('خطأ في تحديد الموقع:', error);
                statusElement.textContent = 'تعذر الحصول على موقعك. ' + error.message;
                statusElement.classList.remove('loading');
            },
            // خيارات
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        statusElement.textContent = 'تحديد الموقع غير مدعوم في متصفحك.';
    }
}

// دالة للبحث عن المساجد القريبة
function findMosques() {
    statusElement.textContent = 'البحث عن المساجد القريبة...';
    statusElement.classList.add('loading');
    
    // تنظيف العلامات الموجودة
    clearMosquesMarkers();
    
    // إنشاء طلب Overpass API
    const radius = 5000; // 5 كم
    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    
    // استعلام Overpass للعثور على المساجد
    const query = `
        [out:json];
        (
          node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${userPosition.lat},${userPosition.lng});
          way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${userPosition.lat},${userPosition.lng});
          relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${userPosition.lat},${userPosition.lng});
        );
        out center;
    `;
    
    // إرسال الطلب
    fetch(overpassUrl, {
        method: 'POST',
        body: query,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        statusElement.textContent = 'اكتمل البحث!';
        statusElement.classList.remove('loading');
        
        if (data.elements.length === 0) {
            statusElement.textContent = 'لم يتم العثور على مساجد قريبة.';
            mosquesListElement.innerHTML = '<li>لم يتم العثور على مساجد في نطاق 5 كم.</li>';
            return;
        }
        
        // معالجة وعرض النتائج
        displayMosques(data.elements);
    })
    .catch(error => {
        console.error('خطأ أثناء البحث عن المساجد:', error);
        statusElement.textContent = 'خطأ أثناء البحث عن المساجد.';
        statusElement.classList.remove('loading');
    });
}

// دالة لعرض المساجد على الخريطة وفي القائمة
function displayMosques(mosques) {
    // تفريغ القائمة
    mosquesListElement.innerHTML = '';
    
    // ترتيب المساجد حسب المسافة
    const sortedMosques = mosques.map(mosque => {
        const lat = mosque.lat || mosque.center.lat;
        const lng = mosque.lon || mosque.center.lon;
        const distance = calculateDistance(userPosition.lat, userPosition.lng, lat, lng);
        
        return {
            id: mosque.id,
            type: mosque.type,
            lat: lat,
            lng: lng,
            tags: mosque.tags || {},
            distance: distance
        };
    }).sort((a, b) => a.distance - b.distance);
    
    // الحد إلى 20 نتيجة للحصول على أداء أفضل
    const limitedMosques = sortedMosques.slice(0, 20);
    
    // إنشاء مجموعة علامات للمساجد
    const mosqueGroup = L.layerGroup().addTo(map);
    
    // عرض المساجد
    limitedMosques.forEach(mosque => {
        // إنشاء علامة على الخريطة مع أيقونة هلال
        const mosqueIcon = L.divIcon({
            className: 'mosque-marker',
            html: '<div class="mosque-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path d="M256 32C135.1 32 36.1 127.9 32.2 248c-.2 6.6 5.1 12 11.7 12h39.3c5.8 0 10.5-4.3 11.4-10 14.1-93.7 93.1-166 190.6-166 106 0 192 86 192 192s-86 192-192 192c-97.5 0-176.5-72.3-190.6-166-1-5.7-5.6-10-11.4-10H32.9c-6.6 0-11.9 5.4-11.7 12C25.9 384.1 124.9 480 245.8 480h10.2C379.5 480 480 379.5 480 256S379.5 32 256 32z" fill="#7c3f00"/></svg></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });
        
        const marker = L.marker([mosque.lat, mosque.lng], { icon: mosqueIcon }).addTo(mosqueGroup);
        
        // الحصول على اسم المسجد
        const name = mosque.tags.name || mosque.tags['name:ar'] || mosque.tags['name:fr'] || 'مسجد (بدون اسم)';
        
        // إعداد المعلومات للنافذة المنبثقة مع نمط محسن
        let address = mosque.tags['addr:street'] || mosque.tags.address || '';
        if (mosque.tags['addr:housenumber']) {
            address = mosque.tags['addr:housenumber'] + ' ' + address;
        }
        if (mosque.tags['addr:postcode'] || mosque.tags['addr:city']) {
            address += '<br>' + (mosque.tags['addr:postcode'] || '') + ' ' + (mosque.tags['addr:city'] || '');
        }
        
        // إضافة نافذة منبثقة إلى العلامة مع مزيد من المعلومات باستخدام دالة التحسين الخاصة بنا
        marker.bindPopup(createEnhancedPopup(name, address, mosque.distance, mosque.lat, mosque.lng), {className: 'custom-popup'});
        
        // إضافة العلامة إلى قائمة العلامات
        mosquesMarkers.push(marker);
        
        // إضافة العنصر إلى القائمة
        const listItem = document.createElement('li');
        listItem.className = 'mosque-list-item';
        listItem.innerHTML = `
            <div class="mosque-info">
                <div class="mosque-icon-small">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
                        <path d="M256 32C135.1 32 36.1 127.9 32.2 248c-.2 6.6 5.1 12 11.7 12h39.3c5.8 0 10.5-4.3 11.4-10 14.1-93.7 93.1-166 190.6-166 106 0 192 86 192 192s-86 192-192 192c-97.5 0-176.5-72.3-190.6-166-1-5.7-5.6-10-11.4-10H32.9c-6.6 0-11.9 5.4-11.7 12C25.9 384.1 124.9 480 245.8 480h10.2C379.5 480 480 379.5 480 256S379.5 32 256 32z" fill="#7c3f00"/>
                    </svg>
                </div>
                <div class="mosque-details">
                    <div class="mosque-name">${name}</div>
                    <div class="mosque-distance">${mosque.distance.toFixed(1)} كم</div>
                </div>
            </div>
            <div class="mosque-actions">
                <button class="mosque-btn" data-lat="${mosque.lat}" data-lng="${mosque.lng}">عرض</button>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}" target="_blank" class="mosque-btn mosque-directions">الاتجاهات</a>
            </div>
        `;
        
        // إضافة تأثيرات تفاعلية عند تمرير المؤشر فوق عناصر القائمة
        listItem.addEventListener('mouseenter', function() {
            marker.setZIndexOffset(1000); // وضع العلامة فوق الآخرين
            const iconElement = marker.getElement().querySelector('.mosque-icon');
            if (iconElement) {
                iconElement.classList.add('hover');
            }
        });
        
        listItem.addEventListener('mouseleave', function() {
            marker.setZIndexOffset(0);
            const iconElement = marker.getElement().querySelector('.mosque-icon');
            if (iconElement) {
                iconElement.classList.remove('hover');
            }
        });
        
        // إضافة حدث إلى زر "عرض"
        const viewButton = listItem.querySelector('.mosque-btn');
        viewButton.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            
            // توسيط الخريطة على المسجد
            map.setView([lat, lng], isMobile ? 17 : 16);
            
            // فتح النافذة المنبثقة
            marker.openPopup();
            
            // تسليط الضوء على عنصر القائمة
            document.querySelectorAll('.mosque-list-item').forEach(item => {
                item.classList.remove('active');
            });
            listItem.classList.add('active');
            
            // التمرير إلى الخريطة على الأجهزة المحمولة
            if (isMobile) {
                document.getElementById('map').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        mosquesListElement.appendChild(listItem);
    });
    
    // إضافة حركة عند ظهور العلامات
    setTimeout(() => {
        document.querySelectorAll('.mosque-icon').forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('fade-in');
            }, index * 50);
        });
    }, 300);
    
    // إنشاء حدود حول منطقة البحث
    L.circle([userPosition.lat, userPosition.lng], {
        radius: 5000,
        color: '#7c3f00',
        fillColor: '#7c3f00',
        fillOpacity: 0.05,
        weight: 1,
        dashArray: '5, 5'
    }).addTo(map);
    
    // تحديث الحالة بمزيد من المعلومات
    statusElement.textContent = `تم العثور على ${limitedMosques.length} مسجد قريب في نطاق 5 كم.`;
    
    // ضبط العرض لرؤية جميع المساجد
    if (limitedMosques.length > 0) {
        const group = L.featureGroup(mosquesMarkers);
        map.fitBounds(group.getBounds().pad(0.2));
        
        // إذا كان مستوى التكبير مرتفعًا جدًا، فحدده لرؤية السياق
        if (map.getZoom() > 15) {
            map.setZoom(15);
        }
    }
}

// دالة لتنظيف علامات المساجد الموجودة
function clearMosquesMarkers() {
    mosquesMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    mosquesMarkers = [];
}

// دالة لحساب المسافة بين نقطتين بالكيلومتر
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // نصف قطر الأرض بالكيلومتر
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance;
}

// دالة لتحويل الدرجات إلى راديان
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initUI();
    initApp();
});

// إضافة زر تحديث
window.refreshLocation = function() {
    getUserLocation();
};