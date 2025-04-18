# تطبيق المساجد القريبة

هذا تطبيق ويب تقدمي (PWA) يسمح بالعثور على المساجد القريبة من موقعك الحالي. يستخدم فقط خدمات مجانية وهو مُحسن للأجهزة المحمولة.

## المميزات

- تحديد موقع المستخدم
- عرض المساجد في نطاق 5 كم مع أيقونات تمثل المساجد
- قائمة المساجد مرتبة حسب المسافة
- إمكانية رؤية الموقع على الخريطة
- معلومات مفصلة عن كل مسجد (الاسم، العنوان، المسافة)
- زر الاتجاهات لكل مسجد (عبر خرائط جوجل)
- يعمل دون اتصال بالإنترنت بعد التحميل الأول
- إمكانية التثبيت على الشاشة الرئيسية (PWA)
- دعم كامل للأجهزة المحمولة

## التقنيات المستخدمة

- HTML، CSS، JavaScript
- Leaflet.js للخرائط
- OpenStreetMap كمزود للخرائط
- Overpass API للعثور على نقاط الاهتمام (المساجد)
- واجهة برمجة تطبيقات تحديد الموقع الجغرافي للمتصفح
- تطبيق ويب تقدمي (PWA) للتثبيت على الأجهزة المحمولة

## تحسينات للأجهزة المحمولة

- واجهة متكيفة تتناسب مع مختلف أحجام الشاشات
- إدارة اتجاهات العرض (أفقي ورأسي)
- اكتشاف تلقائي للأجهزة (Android، iOS)
- مناطق لمس موسعة لتجربة مستخدم أفضل
- دعم السحب للتنقل بين الخريطة وقائمة النتائج
- لافتة تثبيت مخصصة لمستخدمي الأجهزة المحمولة
- زر الاتجاهات للتكامل مع تطبيقات الملاحة

## التثبيت

1. انسخ هذا المستودع
2. افتح `index_ar.html` في متصفح أو استخدم خادم ويب محلي
3. للحصول على تجربة كاملة، قم بنشر التطبيق على خادم ويب مع HTTPS
4. على الجوال، يمكنك تثبيت التطبيق على شاشتك الرئيسية

## الاستخدام

1. اسمح بالوصول إلى موقعك عند الطلب
2. سيعرض التطبيق تلقائيًا المساجد القريبة
3. انقر على "عرض" لتوسيط الخريطة على مسجد معين
4. استخدم زر "الاتجاهات" للحصول على مسار إلى المسجد المختار
5. استخدم زر "تحديث الموقع" لتحديث موقعك
6. على الجوال، يمكنك السحب لأعلى/لأسفل للتنقل بين الخريطة والقائمة

## التخصيص

يتضمن التطبيق عدة خيارات لأيقونات المساجد في ملفات `alternative-icons.js` و `more-icons.js`. يمكنك بسهولة تغيير الأيقونة عن طريق استبدال رمز SVG في ملف `app_ar.js`.

لتغيير الأيقونة:

1. افتح `more-icons.js` أو `alternative-icons.js`
2. اختر الأيقونة التي تناسبك
3. انسخ رمز SVG
4. في `app_ar.js`، ابحث عن حالات أيقونة SVG الحالية واستبدلها

## النشر

يمكنك نشر هذا التطبيق على أي خدمة استضافة مجانية:

- GitHub Pages
- Netlify
- Vercel
- Render

لا يلزم وجود تكوين للخادم لأن التطبيق يعمل بالكامل من جانب العميل.

## ملاحظة

هذا التطبيق مجاني 100٪ ولا يتطلب أي خدمة مدفوعة مثل Google Maps API. وهو متوافق مع جميع الأجهزة المحمولة الحديثة.

## تحسينات مستقبلية ممكنة

- إضافة سمة داكنة
- اختيار مسافة البحث
- معلومات عن أوقات الصلاة
- إضافة مرشحات (المسافة، الخدمات المتاحة، إلخ)
- إمكانية إضافة تعليقات وتقييمات
- نسخة متعددة اللغات
- تحسين الأداء على الأجهزة الأقل قوة

## الترخيص

حر الاستخدام