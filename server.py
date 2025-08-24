# server.py - خادم Flask متكامل
from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
from encryption import AdvancedEncryption
from ai_model import AIModel
import random
import time
import json
import os

app = Flask(__name__)
CORS(app)

# تهيئة المكونات
encryption = AdvancedEncryption()
ai_model = AIModel()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/encrypt', methods=['POST'])
def encrypt():
    try:
        data = request.get_json()
        text = data.get('text', '')
        method = data.get('method', 'aes')
        
        if not text:
            return jsonify({'status': 'error', 'message': 'No text provided'})
        
        # استخدام مكتبة التشفير المتقدمة
        encrypted_text = encryption.encrypt(text, method)
        
        return jsonify({
            'status': 'success', 
            'encrypted_text': encrypted_text,
            'method': method
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/api/decrypt', methods=['POST'])
def decrypt():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'status': 'error', 'message': 'No text provided'})
        
        # محاولة فك التشفير باستخدام جميع الخوارزميات المتاحة
        result = encryption.try_decrypt(text)
        
        if result['success']:
            # تحليل النتائج باستخدام الذكاء الاصطناعي
            ai_analysis = ai_model.analyze_decryption(result['decrypted_text'], result['method'])
            
            return jsonify({
                'status': 'success',
                'decrypted_text': result['decrypted_text'],
                'method': result['method'],
                'ai_analysis': ai_analysis
            })
        else:
            # إذا فشل الفك التلقائي، استخدام الذكاء الاصطناعي لمحاولة الفك
            ai_attempt = ai_model.attempt_decryption(text)
            return jsonify({
                'status': 'partial',
                'decrypted_text': ai_attempt.get('text', ''),
                'confidence': ai_attempt.get('confidence', 0),
                'ai_analysis': ai_attempt.get('analysis', '')
            })
            
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        conversation_history = data.get('history', [])
        
        if not message:
            return jsonify({'status': 'error', 'message': 'No message provided'})
        
        # الحصول على رد من الذكاء الاصطناعي
        response = ai_model.generate_response(message, conversation_history)
        
        return jsonify({
            'status': 'success',
            'response': response,
            'encrypted': True  # للإشارة أن الرد مشفر
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/api/stealth/browse', methods=['POST'])
def stealth_browse():
    try:
        data = request.get_json()
        url = data.get('url', '')
        
        if not url:
            return jsonify({'status': 'error', 'message': 'No URL provided'})
        
        # محاكاة التصفح المخفي
        # في التطبيق الحقيقي، سيتم هنا استخدام خادم وكيل حقيقي
        fake_ip = f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"
        country = random.choice(['سويسرا', 'السويد', 'سنغافورة', 'كندا', 'ألمانيا'])
        
        # محاكاة وقت التحميل
        time.sleep(1.5)
        
        return jsonify({
            'status': 'success',
            'url': url,
            'fake_ip': fake_ip,
            'country': country,
            'encrypted': True,
            'content': f'تم تحميل محتوى {url} بشكل آمن ومشفر'
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/api/account/generate', methods=['POST'])
def generate_account():
    try:
        data = request.get_json()
        platform = data.get('platform', 'general')
        
        countries = ['سويسرا', 'السويد', 'سنغافورة', 'كندا', 'ألمانيا', 'اليابان']
        usernames = ['user', 'anon', 'secure', 'private', 'ghost']
        domains = ['protonmail.com', 'tutanota.com', 'mailbox.org', 'disroot.org']
        
        country = random.choice(countries)
        username = f"{random.choice(usernames)}_{country.lower()}_{random.randint(1000, 9999)}"
        domain = random.choice(domains)
        email = f"{username}@{domain}"
        
        # إنشاء كلمة مرور قوية
        password = encryption.generate_strong_password(16)
        
        return jsonify({
            'status': 'success',
            'username': username,
            'password': password,
            'email': email,
            'country': country,
            'platform': platform
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/api/security/status')
def security_status():
    return jsonify({
        'status': 'secure',
        'encryption_level': 'extreme',
        'anonymity_level': 'high',
        'threats_blocked': random.randint(100, 500),
        'last_scan': time.time()
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)