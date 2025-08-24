// proxy_server.js - خادم الوكيل للتخفي
const express = require('express');
const http = require('http');
const https = require('https');
const url = require('url');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// إعدادات الأمان
app.use(helmet());
app.use(cors());

// تخزين لجلسات المستخدمين
const userSessions = new Map();

//中间件 للتحقق من الهوية
function authenticate(req, res, next) {
    const sessionId = req.headers['x-session-id'];
    if (sessionId && userSessions.has(sessionId)) {
        req.user = userSessions.get(sessionId);
        next();
    } else {
        res.status(401).json({ error: 'غير مصرح بالوصول' });
    }
}

// إنشاء جلسة جديدة
app.post('/api/session/create', (req, res) => {
    const sessionId = generateSessionId();
    const userInfo = {
        id: sessionId,
        fakeIp: generateFakeIP(),
        country: getRandomCountry(),
        userAgent: req.headers['user-agent'],
        createdAt: new Date()
    };
    
    userSessions.set(sessionId, userInfo);
    
    res.json({
        sessionId,
        fakeIp: userInfo.fakeIp,
        country: userInfo.country
    });
});

//路由 للتصفح عبر الوكيل
app.use('/proxy', authenticate, createProxyMiddleware({
    target: 'http://example.com',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        // تعديل headers لإخفاء الهوية الحقيقية
        proxyReq.setHeader('X-Forwarded-For', req.user.fakeIp);
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36');
        proxyReq.setHeader('Accept-Language', 'ar,en-US;q=0.7,en;q=0.3');
        
        console.log(`Proxying request: ${req.user.fakeIp} -> ${proxyReq.path}`);
    },
    onProxyRes: (proxyRes, req, res) => {
        // تعديل الاستجابة لإزالة المعلومات التي قد تكشف الهوية
        delete proxyRes.headers['x-powered-by'];
        delete proxyRes.headers['server'];
        
        console.log(`Received response: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'خطأ في الخادم الوكيل' });
    }
}));

// وظائف المساعدة
function generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateFakeIP() {
    return `${rand(1, 255)}.${rand(1, 255)}.${rand(1, 255)}.${rand(1, 255)}`;
}

function getRandomCountry() {
    const countries = ['سويسرا', 'السويد', 'سنغافورة', 'كندا', 'ألمانيا'];
    return countries[rand(0, countries.length - 1)];
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// بدء الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`الخادم الوكيل يعمل على المنفذ ${PORT}`);
});

// تنظيف الجلسات القديمة كل ساعة
setInterval(() => {
    const now = new Date();
    for (const [sessionId, session] of userSessions.entries()) {
        if (now - session.createdAt > 60 * 60 * 1000) { // 1 ساعة
            userSessions.delete(sessionId);
        }
    }
}, 60 * 60 * 1000);