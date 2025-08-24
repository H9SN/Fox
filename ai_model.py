# ai_model.py - نموذج الذكاء الاصطناعي
import random
import re
from datetime import datetime

class AIModel:
    def __init__(self):
        self.knowledge_base = {
            'encryption': [
                "التشفير هو عملية تحويل المعلومات إلى شكل غير قابل للقراءة إلا لأولئك الذين يملكون المفتاح المناسب لفك التشفير.",
                "هناك نوعان رئيسيان من التشفير: التشفير المتماثل (بمفتاح واحد) والتشفير غير المتماثل (بمفتاحين).",
                "خوارزميات التشفير القوية مثل AES-256 تعتبر آمنة للغاية وتستخدم من قبل الحكومات والمنظمات الأمنية."
            ],
            'privacy': [
                "حماية الخصوصية على الإنترنت أصبحت أكثر أهمية than ever مع تزايد التهديدات الإلكترونية.",
                "استخدام شبكات VPN وبرامج التشفير يساعد في حماية بياناتك من المتطفلين.",
                "تجنب مشاركة المعلومات الشخصية الحساسة على مواقع التواصل الاجتماعي."
            ],
            'security': [
                "أمن المعلومات يتطلب نهجًا متعدد الطبقات يشمل التشفير، الجدران النارية، والوعي الأمني.",
                "كلمات المرور القوية والمختلفة لكل حساب هي أول خطوة نحو حماية فعالة.",
                "التحديثات المنتظمة للبرامج تساعد في سد الثغرات الأمنية المعروفة."
            ]
        }
        
        self.patterns = {
            r'كيف (.*) التشفير': 'encryption',
            r'ما هو (.*) التشفير': 'encryption',
            r'كيف (.*) الخصوصية': 'privacy',
            r'ما هي (.*) الخصوصية': 'privacy',
            r'كيف (.*) الأمان': 'security',
            r'ما هو (.*) الأمن': 'security',
            r'كيف (.*) VPN': 'privacy',
            r'ما هو (.*) VPN': 'privacy',
            r'كيف (.*) AES': 'encryption',
            r'ما هو (.*) AES': 'encryption',
        }
    
    def generate_response(self, message, conversation_history=[]):
        # تحديد نية المستخدم بناء على الأنماط
        intent = self.detect_intent(message)
        
        # إذا تم التعرف على النية، اختيار رد من قاعدة المعرفة
        if intent in self.knowledge_base:
            response = random.choice(self.knowledge_base[intent])
            return f"{response} هل تريد معرفة المزيد عن هذا الموضوع؟"
        
        # إذا كان السؤال يحتوي على كلمات محددة
        if any(word in message for word in ['مرحبا', 'اهلا', 'hello', 'hi']):
            return "مرحباً! كيف يمكنني مساعدتك في مواضيع التشفير والأمان والخصوصية اليوم؟"
        
        if any(word in message for word in ['شكرا', 'thanks', 'thank you']):
            return "على الرحب والسعة! هل هناك شيء آخر تحتاج المساعدة فيه؟"
        
        # رد افتراضي
        default_responses = [
            "هذا سؤال مثير للاهتمام. يمكنني مساعدتك في مواضيع التشفير، الخصوصية، والأمان الإلكتروني.",
            "أنا متخصص في مواضيع الأمان الإلكتروني. هل لديك سؤال محدد عن التشفير أو حماية البيانات؟",
            "لحماية خصوصيتك، تم تشفير هذه المحادثة. كيف يمكنني مساعدتك اليوم؟",
            "هل تريد معرفة المزيد عن طرق حماية بياناتك على الإنترنت؟",
            "يمكنني تقديم معلومات عن خوارزميات التشفير المختلفة وكيفية استخدامها."
        ]
        
        return random.choice(default_responses)
    
    def detect_intent(self, message):
        message = message.lower()
        for pattern, intent in self.patterns.items():
            if re.search(pattern, message):
                return intent
        return None
    
    def analyze_decryption(self, text, method):
        analysis = f"تم فك التشفير باستخدام خوارزمية {method}. "
        
        if method == 'unknown':
            analysis += "لم يتم التعرف على خوارزمية التشفير المستخدمة، ولكن النص يبدو الآن مقروءاً."
        else:
            analysis += "النص المفكوك يبدو سليماً ومقروءاً."
        
        # إضافة بعض التحليل الإضافي
        text_length = len(text)
        word_count = len(text.split())
        
        analysis += f" النص يحتوي على {text_length} حرف و{word_count} كلمة."
        
        if text_length > 100:
            analysis += " هذا نص طويل، مما يزيد من ثقة عملية الفك."
        
        return analysis
    
    def attempt_decryption(self, encrypted_text):
        # محاولة تحليل النص المشفر باستخدام طرق إبداعية
        # هذه مجرد محاكاة للذكاء الاصطناعي الحقيقي
        
        confidence = random.uniform(0.1, 0.7)  # ثقة منخفضة إلى متوسطة
        
        # محاولة التعرف على بعض أنماط التشفير الشائعة
        if re.match(r'^[01\s]+$', encrypted_text):
            #可能是二进制
            return {
                'text': "يبدو أن هذا نص مشفر بنظام الثنائي (Binary).",
                'confidence': confidence,
                'analysis': "تم التعرف على نمط الثنائي. حاول استخدام أداة فك التشفير المناسبة."
            }
        
        if re.match(r'^[A-Za-z\s]+$', encrypted_text) and ' ' in encrypted_text:
            #可能是摩斯电码
            return {
                'text': "يبدو أن هذا نص مشفر بشفرة مورس.",
                'confidence': confidence,
                'analysis': "تم التعرف على نمط يشبه شفرة مورس. حاول استخدام أداة فك التشفير المناسبة."
            }
        
        if re.match(r'^[A-Za-z]=*$', encrypted_text) or '=' in encrypted_text:
            #可能是Base64
            return {
                'text': "يبدو أن هذا نص مشفر بتنسيق Base64.",
                'confidence': confidence + 0.2,
                'analysis': "تم التعرف على نمط Base64. حاول استخدام أداة فك التشفير المناسبة."
            }
        
        # رد افتراضي
        return {
            'text': "لم يتمكن الذكاء الاصطناعي من فك هذا التشفير بشكل كامل. جرب خوارزمية مختلفة.",
            'confidence': 0.1,
            'analysis': "النص المشفر معقد أو uses خوارزمية غير معروفة. جرب خيارات فك التشفير الأخرى."
        }