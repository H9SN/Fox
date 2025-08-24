// script.js - الإصدار المحسن
document.addEventListener('DOMContentLoaded', function() {
    // إعدادات التهيئة
    const config = {
        encryptionLevel: 'extreme',
        defaultEncryption: 'aes',
        theme: 'dark',
        accentColor: 'green'
    };

    // محاكاة تحميل النظام
    simulateLoading();

    // إعداد عناصر واجهة المستخدم
    initializeUI();

    // إعداد معالجات الأحداث
    setupEventHandlers();

    // بدء خدمات الخلفية
    startBackgroundServices();

    function simulateLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        const progressBar = document.querySelector('.progress');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        mainContent.style.display = 'block';
                        initializeApp();
                    }, 500);
                }, 500);
            }
            
            progressBar.style.width = `${progress}%`;
        }, 200);
    }

    function initializeUI() {
        // تهيئة أداة التشفير
        initEncryptionTool();
        
        // تهيئة أداة فك التشفير
        initDecryptionTool();
        
        // تهيئة الدردشة مع الذكاء الاصطناعي
        initAIChat();
        
        // تهيئة مولد الحسابات الوهمية
        initFakeAccountGenerator();
        
        // تهيئة متصفح التخفي
        initStealthBrowser();
        
        // تطبيق الإعدادات
        applySettings(config);
    }

    function setupEventHandlers() {
        // التنقل بين الأقسام
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                showSection(targetId);
            });
        });
        
        // زر البدء
        document.getElementById('start-button').addEventListener('click', function() {
            showSection('browse');
            startStealthBrowsing();
        });
        
        // نمط فتح وإغلاق النماذج
        setupModalHandlers();
        
        // معالجة إرسال النماذج
        setupFormHandlers();
    }

    function startBackgroundServices() {
        // بدء خدمة التخفي
        startStealthService();
        
        // بدء خدمة التشفير
        startEncryptionService();
        
        // بدء خدمة الذكاء الاصطناعي
        startAIService();
        
        // مراقبة حالة الأمان
        startSecurityMonitoring();
    }

    function initEncryptionTool() {
        const encryptBtn = document.getElementById('encrypt-btn');
        const encryptInput = document.getElementById('encrypt-input');
        const encryptOutput = document.getElementById('encrypt-output');
        const encryptionMethod = document.getElementById('encryption-method');
        
        encryptBtn.addEventListener('click', async function() {
            const text = encryptInput.value.trim();
            const method = encryptionMethod.value;
            
            if (!text) {
                showNotification('يرجى إدخال نص للتشفير', 'error');
                return;
            }
            
            try {
                // محاكاة اتصال مع الخادم للتشفير
                const encryptedText = await simulateServerEncryption(text, method);
                encryptOutput.value = encryptedText;
                showNotification('تم تشفير النص بنجاح', 'success');
            } catch (error) {
                showNotification('فشل في التشفير: ' + error.message, 'error');
            }
        });
        
        // إضافة خيارات التشفير الديناميكية
        populateEncryptionMethods();
    }

    function initDecryptionTool() {
        const decryptBtn = document.getElementById('decrypt-btn');
        const decryptInput = document.getElementById('decrypt-input');
        const decryptOutput = document.getElementById('decrypt-output');
        const aiAnalysis = document.getElementById('ai-analysis-result');
        
        decryptBtn.addEventListener('click', async function() {
            const text = decryptInput.value.trim();
            
            if (!text) {
                showNotification('يرجى إدخال نص مشفر', 'error');
                return;
            }
            
            try {
                // محاكاة اتصال مع الخادم لفك التشفير
                const result = await simulateServerDecryption(text);
                decryptOutput.value = result.decryptedText;
                aiAnalysis.textContent = result.aiAnalysis;
                showNotification('تم فك التشفير بنجاح', 'success');
            } catch (error) {
                showNotification('فشل في فك التشفير: ' + error.message, 'error');
            }
        });
    }

    function initAIChat() {
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        function sendMessage() {
            const message = userInput.value.trim();
            if (!message) return;
            
            addMessage(message, true);
            userInput.value = '';
            
            // محاكاة رد الذكاء الاصطناعي
            setTimeout(async () => {
                const aiResponse = await simulateAIResponse(message);
                addMessage(aiResponse, false);
            }, 1000);
        }
        
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
            
            const messageText = document.createElement('p');
            messageText.textContent = text;
            
            const messageTime = document.createElement('span');
            messageTime.classList.add('message-time');
            messageTime.textContent = new Date().toLocaleTimeString();
            
            messageDiv.appendChild(messageText);
            messageDiv.appendChild(messageTime);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function initFakeAccountGenerator() {
        const generateBtn = document.getElementById('generate-account');
        const platformBtns = document.querySelectorAll('.platform-btn');
        
        generateBtn.addEventListener('click', generateFakeAccount);
        
        platformBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                platformBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                generateFakeAccount();
            });
        });
        
        // إنشاء حساب افتراضي عند التحميل
        generateFakeAccount();
    }

    function initStealthBrowser() {
        const urlInput = document.getElementById('url-input');
        const goButton = document.querySelector('.go-button');
        
        goButton.addEventListener('click', function() {
            navigateToUrl(urlInput.value);
        });
        
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                navigateToUrl(urlInput.value);
            }
        });
        
        // تحديث المعلومات الوهمية بانتظام
        setInterval(updateFakeInfo, 10000);
        updateFakeInfo();
    }

    function simulateServerEncryption(text, method) {
        return new Promise((resolve) => {
            // محاكاة وقت الانتظار للخادم
            setTimeout(() => {
                // في التطبيق الحقيقي، سيتم إرسال الطلب إلى الخادم
                const encrypted = `[مشفرة بـ ${method.toUpperCase()}] ${text.split('').reverse().join('')}_${Math.random().toString(36).substr(2, 9)}`;
                resolve(encrypted);
            }, 800);
        });
    }

    function simulateServerDecryption(text) {
        return new Promise((resolve) => {
            // محاكاة وقت الانتظار للخادم والذكاء الاصطناعي
            setTimeout(() => {
                // في التطبيق الحقيقي، سيتم إرسال الطلب إلى الخادم
                const decrypted = text.replace(/^\[مشفرة بـ [A-Z]+\] /, '').split('_')[0].split('').reverse().join('');
                const analysis = "قام الذكاء الاصطناعي بتحليل النص وتمكن من فك التشفير باستخدام خوارزميات متقدمة. النص الأصلي تم استعادته بنجاح.";
                
                resolve({
                    decryptedText: decrypted,
                    aiAnalysis: analysis
                });
            }, 1500);
        });
    }

    function simulateAIResponse(message) {
        return new Promise((resolve) => {
            // محاكاة معالجة الذكاء الاصطناعي
            setTimeout(() => {
                const responses = [
                    "شكراً لسؤالك. هذا رد مشفر لأغراض السلامة. كيف يمكنني مساعدتك further?",
                    "تم تحليل سؤالك بواسطة الذكاء الاصطناعي. هل تحتاج إلى مزيد من المعلومات حول هذا الموضوع؟",
                    "بناءً على سؤالك، أقترح البحث عن مزيد من المعلومات في القسم المخصص لذلك.",
                    "لحماية خصوصيتك، تم تشفير هذه المحادثة بالكامل. هل هناك شيء محدد تريد معرفته؟",
                    "أنظمة التشفير لدينا تعمل على حماية بياناتك. هل تحتاج إلى مساعدة في موضوع معين؟"
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                resolve(randomResponse);
            }, 1000);
        });
    }

    function generateFakeAccount() {
        const countries = ['سويسرا', 'السويد', 'سنغافورة', 'كندا', 'ألمانيا', 'اليابان', 'النرويج', 'فنلندا'];
        const usernames = ['user', 'anon', 'secure', 'private', 'ghost', 'stealth', 'hidden', 'unknown'];
        const domains = ['protonmail.com', 'tutanota.com', 'mailbox.org', 'disroot.org', 'secmail.com'];
        
        const country = countries[Math.floor(Math.random() * countries.length)];
        const username = usernames[Math.floor(Math.random() * usernames.length)] + 
                        '_' + country.toLowerCase() + 
                        '_' + Math.floor(Math.random() * 10000);
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const email = username + '@' + domain;
        
        document.getElementById('fake-username').textContent = username;
        document.getElementById('fake-password').textContent = generatePassword(16);
        document.getElementById('fake-email').textContent = email;
        document.getElementById('fake-account-country').textContent = country;
    }

    function generatePassword(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    function updateFakeInfo() {
        const countries = ['سويسرا', 'السويد', 'سنغافورة', 'كندا', 'ألمانيا', 'اليابان', 'النرويج', 'فنلندا'];
        const osList = ['Windows 11', 'Windows 10', 'macOS 12', 'Ubuntu 20.04', 'Fedora 36'];
        const browsers = ['Chrome 105', 'Firefox 104', 'Safari 16', 'Edge 105'];
        const locations = {
            'سويسرا': 'زوريخ',
            'السويد': 'ستوكهولم',
            'سنغافورة': 'سنغافورة',
            'كندا': 'تورونتو',
            'ألمانيا': 'برلين',
            'اليابان': 'طوكيو',
            'النرويج': 'أوسلو',
            'فنلندا': 'هلسنكي'
        };
        
        const country = countries[Math.floor(Math.random() * countries.length)];
        
        document.getElementById('fake-country').textContent = country;
        document.getElementById('fake-os').textContent = osList[Math.floor(Math.random() * osList.length)];
        document.getElementById('fake-browser').textContent = browsers[Math.floor(Math.random() * browsers.length)];
        document.getElementById('fake-ip').textContent = generateFakeIP();
        document.getElementById('fake-location').textContent = `${locations[country]}, ${country}`;
    }

    function generateFakeIP() {
        return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }

    function navigateToUrl(url) {
        if (!url) return;
        
        // إضافة بروتوكول إذا لم يكن موجودًا
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        // في التطبيق الحقيقي، سيتم تحميل الصفحة عبر الخادم الوكيل
        showNotification(`جاري التوجه إلى: ${url}`, 'info');
        
        // محاكاة تحميل الصفحة
        setTimeout(() => {
            document.querySelector('.viewer').innerHTML = `
                <div class="page-content">
                    <h3>تم تحميل الصفحة بشكل آمن</h3>
                    <p>جميع البيانات من ${url} مشفرة ولا يمكن تتبعها</p>
                    <div class="page-info">
                        <p>تم التخفي بنجاح تحت هوية: ${document.getElementById('fake-country').textContent}</p>
                        <p>IP المخفي: ${document.getElementById('fake-ip').textContent}</p>
                    </div>
                </div>
            `;
        }, 1500);
    }

    function showSection(sectionId) {
        // إخفاء جميع الأقسام
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
        });
        
        // إظهار القسم المطلوب
        document.getElementById(sectionId).style.display = 'block';
        
        // إزالة النشاط من جميع روابط التنقل
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // إضافة النشاط للرابط الحالي
        document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
        
        // التمرير إلى الأعلى
        window.scrollTo(0, 0);
    }

    function showNotification(message, type = 'info') {
        // إنشاء عنصر الإشعار
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="message">${message}</span>
            <button class="close-btn">&times;</button>
        `;
        
        // إضافة الإشعار إلى الصفحة
        document.body.appendChild(notification);
        
        // إظهار الإشعار بتحريكه
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // إعداد إغلاق الإشعار
        notification.querySelector('.close-btn').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // إزالة الإشعار تلقائياً بعد 5 ثوان
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    function setupModalHandlers() {
        // لمحة عن النماذج
    }

    function setupFormHandlers() {
        // لمحة عن معالجات النماذج
    }

    function startStealthService() {
        console.log("بدأت خدمة التخفي...");
        // محاكاة بدء خدمة التخفي
    }

    function startEncryptionService() {
        console.log("بدأت خدمة التشفير...");
        // محاكاة بدء خدمة التشفير
    }

    function startAIService() {
        console.log("بدأت خدمة الذكاء الاصطناعي...");
        // محاكاة بدء خدمة الذكاء الاصطناعي
    }

    function startSecurityMonitoring() {
        console.log("بدأت مراقبة الأمان...");
        // محاكاة مراقبة الأمان
    }

    function applySettings(settings) {
        // تطبيق الإعدادات على الواجهة
        document.documentElement.setAttribute('data-theme', settings.theme);
        document.documentElement.setAttribute('data-accent', settings.accentColor);
        
        // تطبيق إعدادات التشفير
        if (document.getElementById('stealth-level')) {
            document.getElementById('stealth-level').value = settings.encryptionLevel;
        }
        
        if (document.getElementById('default-encryption')) {
            document.getElementById('default-encryption').value = settings.defaultEncryption;
        }
    }

    function populateEncryptionMethods() {
        const methods = [
            'Morse Code', 'Caesar', 'Vigenère', 'Enigma', 'Pigpen', 
            'Emoji Encoding', 'Binary', 'ROT13', 'Atbash', 'Hex',
            'AES', 'RSA', 'Blowfish', 'Twofish', 'Serpent',
            'Triple DES', 'RC4', 'MD5', 'SHA-1', 'SHA-256'
        ];
        
        const select = document.getElementById('encryption-method');
        if (select) {
            // مسح الخيارات الحالية
            select.innerHTML = '';
            
            // إضافة الخيارات الجديدة
            methods.forEach(method => {
                const option = document.createElement('option');
                option.value = method.toLowerCase().replace(' ', '-');
                option.textContent = method;
                select.appendChild(option);
            });
        }
    }

    function initializeApp() {
        console.log("تم تهيئة التطبيق بنجاح");
        showNotification("مرحباً بك في نظام التشفير والتخفي المتقدم", "success");
        
        // بدء التحديث الدوري للمعلومات
        setInterval(updateDynamicContent, 60000);
    }

    function updateDynamicContent() {
        // تحديث المعلومات الديناميكية مثل الوقت، حالة الخدمة، إلخ
        console.log("تم تحديث المحتوى الديناميكي");
    }
});