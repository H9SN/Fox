# encryption.py - مكتبة التشفير المتقدمة
import base64
import hashlib
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Protocol.KDF import PBKDF2
import random

class AdvancedEncryption:
    def __init__(self):
        self.encryption_methods = {
            'aes': self.encrypt_aes,
            'morse': self.encrypt_morse,
            'caesar': self.encrypt_caesar,
            'vigenere': self.encrypt_vigenere,
            'binary': self.encrypt_binary,
            'rot13': self.encrypt_rot13,
            'atbash': self.encrypt_atbash,
            'hex': self.encrypt_hex,
            # يمكن إضافة المزيد من خوارزميات التشفير هنا
        }
        
        self.decryption_methods = {
            'aes': self.decrypt_aes,
            'morse': self.decrypt_morse,
            'caesar': self.decrypt_caesar,
            'vigenere': self.decrypt_vigenere,
            'binary': self.decrypt_binary,
            'rot13': self.decrypt_rot13,
            'atbash': self.decrypt_atbash,
            'hex': self.decrypt_hex,
        }
    
    def encrypt(self, text, method='aes'):
        if method in self.encryption_methods:
            return self.encryption_methods[method](text)
        else:
            # استخدام AES كافتراضي إذا لم يتم التعرف على الطريقة
            return self.encrypt_aes(text)
    
    def try_decrypt(self, text):
        # محاولة فك التشفير باستخدام جميع الخوارزميات المتاحة
        for method_name, method_func in self.decryption_methods.items():
            try:
                decrypted = method_func(text)
                if decrypted != text:  # إذا كان الناتج مختلف عن المدخل
                    return {
                        'success': True,
                        'decrypted_text': decrypted,
                        'method': method_name
                    }
            except:
                continue
        
        return {'success': False, 'decrypted_text': text, 'method': 'unknown'}
    
    def encrypt_aes(self, text):
        # توليد مفتاح عشوائي
        salt = get_random_bytes(16)
        key = PBKDF2("secret_password", salt, 32, count=1000000)
        cipher = AES.new(key, AES.MODE_GCM)
        ciphertext, tag = cipher.encrypt_and_digest(text.encode('utf-8'))
        
        # دمج جميع المكونات في نص مشفر واحد
        encrypted_data = salt + cipher.nonce + tag + ciphertext
        return base64.b64encode(encrypted_data).decode('utf-8')
    
    def decrypt_aes(self, encrypted_text):
        try:
            encrypted_data = base64.b64decode(encrypted_text)
            salt = encrypted_data[:16]
            nonce = encrypted_data[16:32]
            tag = encrypted_data[32:48]
            ciphertext = encrypted_data[48:]
            
            key = PBKDF2("secret_password", salt, 32, count=1000000)
            cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
            decrypted = cipher.decrypt_and_verify(ciphertext, tag)
            return decrypted.decode('utf-8')
        except:
            return encrypted_text  # إذا فشل الفك، إرجاع النص الأصلي
    
    def encrypt_morse(self, text):
        morse_code = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', ' ': '/', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
        }
        
        return ' '.join(morse_code.get(char.upper(), char) for char in text)
    
    def decrypt_morse(self, text):
        morse_code = {v: k for k, v in self.encrypt_morse('').items()}
        words = text.split(' / ')
        return ' '.join(''.join(morse_code.get(char, char) for char in word.split()) for word in words)
    
    def encrypt_caesar(self, text, shift=3):
        result = ""
        for char in text:
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                result += chr((ord(char) - shift_base + shift) % 26 + shift_base)
            else:
                result += char
        return result
    
    def decrypt_caesar(self, text, shift=3):
        return self.encrypt_caesar(text, -shift)
    
    def encrypt_vigenere(self, text, key='SECRET'):
        result = ""
        key_repeated = (key * (len(text) // len(key) + 1))[:len(text)]
        for i, char in enumerate(text):
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                key_char = key_repeated[i].upper()
                key_shift = ord(key_char) - 65
                result += chr((ord(char) - shift_base + key_shift) % 26 + shift_base)
            else:
                result += char
        return result
    
    def decrypt_vigenere(self, text, key='SECRET'):
        result = ""
        key_repeated = (key * (len(text) // len(key) + 1))[:len(text)]
        for i, char in enumerate(text):
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                key_char = key_repeated[i].upper()
                key_shift = ord(key_char) - 65
                result += chr((ord(char) - shift_base - key_shift) % 26 + shift_base)
            else:
                result += char
        return result
    
    def encrypt_binary(self, text):
        return ' '.join(format(ord(char), '08b') for char in text)
    
    def decrypt_binary(self, text):
        binary_values = text.split()
        return ''.join(chr(int(binary, 2)) for binary in binary_values)
    
    def encrypt_rot13(self, text):
        return self.encrypt_caesar(text, 13)
    
    def decrypt_rot13(self, text):
        return self.encrypt_caesar(text, 13)
    
    def encrypt_atbash(self, text):
        result = ""
        for char in text:
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                result += chr(25 - (ord(char) - shift_base) + shift_base)
            else:
                result += char
        return result
    
    def decrypt_atbash(self, text):
        return self.encrypt_atbash(text)
    
    def encrypt_hex(self, text):
        return text.encode('utf-8').hex()
    
    def decrypt_hex(self, text):
        try:
            return bytes.fromhex(text).decode('utf-8')
        except:
            return text
    
    def generate_strong_password(self, length=16):
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-='
        return ''.join(random.choice(chars) for _ in range(length))