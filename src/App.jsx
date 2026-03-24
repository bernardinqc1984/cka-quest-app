import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const LANGS = {
  fr: {
    flag: "🇫🇷",
    name: "Français",
    dir: "ltr",
    hero: "CKA Quest\nPrépare ta certification Kubernetes",
    heroSub:
      "Entraîne-toi comme en conditions réelles avec des QCM orientés kubectl, un système XP et des explications techniques pour réussir la certification CKA.",
    warnTitle: "⚠️ La certification CKA se prépare sérieusement",
    warnText:
      "Taux d'échec proche de 40%, examen pratique de 2h, score minimal de 66%, coût de 395 USD. Une préparation solide fait la différence.",
    start: "Commencer l'aventure",
    login: "Connexion",
    register: "Inscription",
    logout: "Déconnexion",
    loginTitle: "Connexion CKA Quest",
    registerTitle: "Créer un compte CKA Quest",
    user: "Nom d'utilisateur",
    pass: "Mot de passe",
    noAccount: "Pas encore de compte ? Inscris-toi",
    hasAccount: "Déjà inscrit ? Connecte-toi",
    errUser: "Cet utilisateur existe déjà.",
    errCred: "Identifiants incorrects.",
    errFields: "Tous les champs sont obligatoires.",
    domains: "Domaines",
    questions: "Questions",
    accuracy: "Précision",
    level: "Niveau",
    next: "Question suivante",
    results: "Résultats",
    back: "Retour",
    restart: "Recommencer",
    home: "Menu principal",
    correct: "🎉 Excellent ! Bonne réponse !",
    wrongPre: "❌ La bonne réponse est :",
    encourage: "💪 Ne lâche rien ! Chaque erreur te rapproche du succès.",
    streak: "Série",
    done: "Terminé",
    resGreat: "Performance solide, tu es prêt pour le rythme CKA.",
    resGood: "Bonne progression, continue pour sécuriser tes réflexes.",
    resLearn: "Continue à pratiquer, chaque itération renforce ta maîtrise.",
    goodAns: "bonnes réponses",
    rate: "de réussite",
    reset: "Réinitialiser ma progression",
    f1: "📝 Questions CKA",
    f1d: "QCM basés sur les domaines officiels Linux Foundation.",
    f2: "⚡ XP & Niveaux",
    f2d: "Gagne de l'XP, monte de niveau, garde ta streak.",
    f3: "💡 Explications",
    f3d: "Chaque réponse apporte une explication technique ciblée.",
    f4: "💾 Progression",
    f4d: "Ta session est sauvegardée automatiquement.",
    exam: "Examen CKA — 2h · 66% min · 395 USD",
    welcome: "Bienvenue",
  },
  en: {
    flag: "🇬🇧",
    name: "English",
    dir: "ltr",
    hero: "CKA Quest\nLevel up for Kubernetes certification",
    heroSub:
      "Train under real exam pressure with kubectl-focused MCQs, XP progression, and practical explanations designed for CKA success.",
    warnTitle: "⚠️ CKA requires focused preparation",
    warnText:
      "Around 40% fail rate, 2-hour hands-on exam, 66% minimum score, 395 USD fee. Structured practice is essential.",
    start: "Start quest",
    login: "Login",
    register: "Register",
    logout: "Logout",
    loginTitle: "CKA Quest Login",
    registerTitle: "Create CKA Quest account",
    user: "Username",
    pass: "Password",
    noAccount: "No account yet? Register",
    hasAccount: "Already registered? Login",
    errUser: "User already exists.",
    errCred: "Invalid credentials.",
    errFields: "All fields are required.",
    domains: "Domains",
    questions: "Questions",
    accuracy: "Accuracy",
    level: "Level",
    next: "Next question",
    results: "Results",
    back: "Back",
    restart: "Restart",
    home: "Main menu",
    correct: "🎉 Excellent! Correct answer!",
    wrongPre: "❌ Correct answer is:",
    encourage: "💪 Keep going! Every mistake brings you closer to success.",
    streak: "Streak",
    done: "Done",
    resGreat: "Strong performance, you're matching CKA pace.",
    resGood: "Good progress, keep sharpening your execution.",
    resLearn: "Keep practicing, repetition builds confidence.",
    goodAns: "correct answers",
    rate: "success rate",
    reset: "Reset my progress",
    f1: "📝 CKA Questions",
    f1d: "MCQs aligned with Linux Foundation exam domains.",
    f2: "⚡ XP & Levels",
    f2d: "Gain XP, level up, and protect your streak.",
    f3: "💡 Explanations",
    f3d: "Every answer includes practical technical context.",
    f4: "💾 Progress",
    f4d: "Your journey is saved automatically.",
    exam: "CKA Exam — 2h · 66% min · 395 USD",
    welcome: "Welcome",
  },
  pt: {
    flag: "🇧🇷",
    name: "Português",
    dir: "ltr",
    hero: "CKA Quest\nPrepare-se para a certificação Kubernetes",
    heroSub: "Treine com questões práticas, XP, níveis e explicações técnicas para dominar o exame CKA.",
    warnTitle: "⚠️ A certificação CKA exige preparo",
    warnText: "Taxa de reprovação perto de 40%, prova prática de 2h, mínimo 66%, custo de 395 USD.",
    start: "Começar jornada",
    login: "Entrar",
    register: "Registrar",
    logout: "Sair",
    loginTitle: "Entrar no CKA Quest",
    registerTitle: "Criar conta CKA Quest",
    user: "Usuário",
    pass: "Senha",
    noAccount: "Sem conta? Registre-se",
    hasAccount: "Já tem conta? Entre",
    errUser: "Usuário já existe.",
    errCred: "Credenciais inválidas.",
    errFields: "Preencha todos os campos.",
    domains: "Domínios",
    questions: "Questões",
    accuracy: "Precisão",
    level: "Nível",
    next: "Próxima questão",
    results: "Resultados",
    back: "Voltar",
    restart: "Recomeçar",
    home: "Menu principal",
    correct: "🎉 Excelente! Resposta correta!",
    wrongPre: "❌ A resposta correta é:",
    encourage: "💪 Continue! Cada erro te aproxima do sucesso.",
    streak: "Sequência",
    done: "Concluído",
    resGreat: "Ótimo desempenho para o ritmo CKA.",
    resGood: "Boa evolução, continue praticando.",
    resLearn: "Siga praticando para consolidar conhecimento.",
    goodAns: "respostas corretas",
    rate: "de aproveitamento",
    reset: "Resetar meu progresso",
    f1: "📝 Questões CKA",
    f1d: "Questões alinhadas aos domínios oficiais.",
    f2: "⚡ XP e Níveis",
    f2d: "Ganhe XP e avance de nível.",
    f3: "💡 Explicações",
    f3d: "Explicações técnicas após cada resposta.",
    f4: "💾 Progresso",
    f4d: "Seu progresso é salvo automaticamente.",
    exam: "Exame CKA — 2h · 66% min · 395 USD",
    welcome: "Bem-vindo",
  },
  it: {
    flag: "🇮🇹",
    name: "Italiano",
    dir: "ltr",
    hero: "CKA Quest\nPreparati alla certificazione Kubernetes",
    heroSub: "Allenati con quiz pratici, XP, livelli e spiegazioni tecniche per superare il CKA.",
    warnTitle: "⚠️ La certificazione CKA richiede preparazione",
    warnText: "Tasso di insuccesso vicino al 40%, esame pratico da 2h, minimo 66%, costo 395 USD.",
    start: "Inizia missione",
    login: "Accedi",
    register: "Registrati",
    logout: "Esci",
    loginTitle: "Accesso CKA Quest",
    registerTitle: "Crea account CKA Quest",
    user: "Username",
    pass: "Password",
    noAccount: "Nessun account? Registrati",
    hasAccount: "Hai già un account? Accedi",
    errUser: "Utente già esistente.",
    errCred: "Credenziali non valide.",
    errFields: "Compila tutti i campi.",
    domains: "Domini",
    questions: "Domande",
    accuracy: "Precisione",
    level: "Livello",
    next: "Prossima domanda",
    results: "Risultati",
    back: "Indietro",
    restart: "Ricomincia",
    home: "Menu principale",
    correct: "🎉 Ottimo! Risposta corretta!",
    wrongPre: "❌ La risposta corretta è:",
    encourage: "💪 Continua! Ogni errore ti avvicina al successo.",
    streak: "Serie",
    done: "Completato",
    resGreat: "Ottima performance per il ritmo CKA.",
    resGood: "Buon progresso, continua così.",
    resLearn: "Continua a esercitarti per migliorare.",
    goodAns: "risposte corrette",
    rate: "di successo",
    reset: "Reimposta progresso",
    f1: "📝 Domande CKA",
    f1d: "Quiz allineati ai domini ufficiali.",
    f2: "⚡ XP e Livelli",
    f2d: "Guadagna XP e sali di livello.",
    f3: "💡 Spiegazioni",
    f3d: "Spiegazioni tecniche dopo ogni risposta.",
    f4: "💾 Progressi",
    f4d: "Progressi salvati automaticamente.",
    exam: "Esame CKA — 2h · 66% min · 395 USD",
    welcome: "Benvenuto",
  },
  th: {
    flag: "🇹🇭",
    name: "ไทย",
    dir: "ltr",
    hero: "CKA Quest\nเตรียมสอบ Kubernetes CKA",
    heroSub: "ฝึกทำข้อสอบแบบลงมือจริง พร้อมระบบ XP และคำอธิบายเชิงเทคนิคเพื่อสอบผ่าน CKA",
    warnTitle: "⚠️ CKA ต้องเตรียมตัวอย่างจริงจัง",
    warnText: "อัตราสอบไม่ผ่านใกล้ 40% สอบปฏิบัติ 2 ชั่วโมง ผ่านขั้นต่ำ 66% ค่าสอบ 395 USD",
    start: "เริ่มภารกิจ",
    login: "เข้าสู่ระบบ",
    register: "สมัครสมาชิก",
    logout: "ออกจากระบบ",
    loginTitle: "เข้าสู่ระบบ CKA Quest",
    registerTitle: "สมัคร CKA Quest",
    user: "ชื่อผู้ใช้",
    pass: "รหัสผ่าน",
    noAccount: "ยังไม่มีบัญชี? สมัครเลย",
    hasAccount: "มีบัญชีแล้ว? เข้าสู่ระบบ",
    errUser: "มีผู้ใช้นี้แล้ว",
    errCred: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
    errFields: "กรอกข้อมูลให้ครบทุกช่อง",
    domains: "โดเมน",
    questions: "คำถาม",
    accuracy: "ความแม่นยำ",
    level: "ระดับ",
    next: "ข้อต่อไป",
    results: "ผลลัพธ์",
    back: "ย้อนกลับ",
    restart: "เริ่มใหม่",
    home: "เมนูหลัก",
    correct: "🎉 ยอดเยี่ยม! ตอบถูกต้อง!",
    wrongPre: "❌ คำตอบที่ถูกคือ:",
    encourage: "💪 สู้ต่อไป! ทุกความผิดพลาดพาไปสู่ความสำเร็จ",
    streak: "ต่อเนื่อง",
    done: "เสร็จสิ้น",
    resGreat: "ทำได้ดีมาก ใกล้รูปแบบข้อสอบจริง",
    resGood: "พัฒนาได้ดี ฝึกต่ออีกนิด",
    resLearn: "ฝึกต่อเนื่องเพื่อความมั่นใจ",
    goodAns: "คำตอบถูก",
    rate: "อัตราความสำเร็จ",
    reset: "รีเซ็ตความคืบหน้า",
    f1: "📝 คำถาม CKA",
    f1d: "คำถามตามหัวข้อสอบทางการ",
    f2: "⚡ XP และเลเวล",
    f2d: "สะสม XP และอัปเลเวล",
    f3: "💡 คำอธิบาย",
    f3d: "มีคำอธิบายเชิงเทคนิคทุกข้อ",
    f4: "💾 ความคืบหน้า",
    f4d: "บันทึกอัตโนมัติทุกช่วง",
    exam: "ข้อสอบ CKA — 2ชม. · ขั้นต่ำ 66% · 395 USD",
    welcome: "ยินดีต้อนรับ",
  },
  zh: {
    flag: "🇨🇳",
    name: "中文",
    dir: "ltr",
    hero: "CKA Quest\n备战 Kubernetes CKA 认证",
    heroSub: "通过实战化题目、XP 进阶和技术解析，系统提升你的 CKA 通过率。",
    warnTitle: "⚠️ CKA 需要系统化准备",
    warnText: "约 40% 未通过，2 小时实操考试，66% 及格线，费用 395 美元。",
    start: "开始挑战",
    login: "登录",
    register: "注册",
    logout: "退出",
    loginTitle: "登录 CKA Quest",
    registerTitle: "创建 CKA Quest 账号",
    user: "用户名",
    pass: "密码",
    noAccount: "没有账号？去注册",
    hasAccount: "已有账号？去登录",
    errUser: "用户已存在。",
    errCred: "用户名或密码错误。",
    errFields: "请填写所有字段。",
    domains: "领域",
    questions: "题目",
    accuracy: "正确率",
    level: "等级",
    next: "下一题",
    results: "结果",
    back: "返回",
    restart: "重新开始",
    home: "主菜单",
    correct: "🎉 太棒了！回答正确！",
    wrongPre: "❌ 正确答案是：",
    encourage: "💪 继续坚持！每次错误都在靠近成功。",
    streak: "连胜",
    done: "完成",
    resGreat: "表现很强，接近 CKA 实战节奏。",
    resGood: "进步明显，继续强化操作。",
    resLearn: "继续练习，稳步提升。",
    goodAns: "题答对",
    rate: "通过率",
    reset: "重置我的进度",
    f1: "📝 CKA 题库",
    f1d: "覆盖官方考试五大领域。",
    f2: "⚡ XP 与等级",
    f2d: "获得 XP 并提升等级。",
    f3: "💡 解析",
    f3d: "每题附带关键技术解析。",
    f4: "💾 进度",
    f4d: "自动保存你的学习进度。",
    exam: "CKA 考试 — 2小时 · 最低66% · 395 美元",
    welcome: "欢迎",
  },
  ru: {
    flag: "🇷🇺",
    name: "Русский",
    dir: "ltr",
    hero: "CKA Quest\nПодготовка к сертификации Kubernetes",
    heroSub: "Практические вопросы, XP, уровни и техобъяснения для уверенной сдачи CKA.",
    warnTitle: "⚠️ CKA требует серьезной подготовки",
    warnText: "Около 40% не сдают, 2 часа практики, минимум 66%, стоимость 395 USD.",
    start: "Начать квест",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    loginTitle: "Вход в CKA Quest",
    registerTitle: "Создать аккаунт CKA Quest",
    user: "Имя пользователя",
    pass: "Пароль",
    noAccount: "Нет аккаунта? Зарегистрируйся",
    hasAccount: "Уже есть аккаунт? Войти",
    errUser: "Пользователь уже существует.",
    errCred: "Неверные данные для входа.",
    errFields: "Заполните все поля.",
    domains: "Домены",
    questions: "Вопросы",
    accuracy: "Точность",
    level: "Уровень",
    next: "Следующий вопрос",
    results: "Результаты",
    back: "Назад",
    restart: "Начать заново",
    home: "Главное меню",
    correct: "🎉 Отлично! Верный ответ!",
    wrongPre: "❌ Правильный ответ:",
    encourage: "💪 Не сдавайся! Каждая ошибка приближает к успеху.",
    streak: "Серия",
    done: "Завершено",
    resGreat: "Отличный темп для экзамена CKA.",
    resGood: "Хороший прогресс, продолжай.",
    resLearn: "Практикуйся дальше для уверенности.",
    goodAns: "верных ответов",
    rate: "успешности",
    reset: "Сбросить прогресс",
    f1: "📝 Вопросы CKA",
    f1d: "Вопросы по официальным доменам экзамена.",
    f2: "⚡ XP и уровни",
    f2d: "Получай XP и повышай уровень.",
    f3: "💡 Объяснения",
    f3d: "После каждого ответа подробное объяснение.",
    f4: "💾 Прогресс",
    f4d: "Прогресс сохраняется автоматически.",
    exam: "Экзамен CKA — 2ч · мин 66% · 395 USD",
    welcome: "Добро пожаловать",
  },
  ar: {
    flag: "🇸🇦",
    name: "العربية",
    dir: "rtl",
    hero: "CKA Quest\nاستعد لشهادة Kubernetes",
    heroSub: "تدرب بأسئلة عملية، نظام XP، وشروحات تقنية لرفع فرص نجاحك في اختبار CKA.",
    warnTitle: "⚠️ شهادة CKA تحتاج تحضيرًا جادًا",
    warnText: "نسبة الرسوب تقارب 40%، اختبار عملي لمدة ساعتين، الحد الأدنى 66%، التكلفة 395 دولار.",
    start: "ابدأ الرحلة",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
    loginTitle: "دخول CKA Quest",
    registerTitle: "إنشاء حساب CKA Quest",
    user: "اسم المستخدم",
    pass: "كلمة المرور",
    noAccount: "ليس لديك حساب؟ أنشئ حسابًا",
    hasAccount: "لديك حساب بالفعل؟ سجّل الدخول",
    errUser: "المستخدم موجود بالفعل.",
    errCred: "بيانات الدخول غير صحيحة.",
    errFields: "جميع الحقول مطلوبة.",
    domains: "المجالات",
    questions: "الأسئلة",
    accuracy: "الدقة",
    level: "المستوى",
    next: "السؤال التالي",
    results: "النتائج",
    back: "رجوع",
    restart: "إعادة",
    home: "القائمة الرئيسية",
    correct: "🎉 رائع! إجابة صحيحة!",
    wrongPre: "❌ الإجابة الصحيحة هي:",
    encourage: "💪 استمر! كل خطأ يقربك من النجاح.",
    streak: "سلسلة",
    done: "مكتمل",
    resGreat: "أداء قوي ويشبه إيقاع اختبار CKA.",
    resGood: "تقدم جيد، استمر في التدريب.",
    resLearn: "واصل التدريب لبناء الثقة.",
    goodAns: "إجابات صحيحة",
    rate: "نسبة النجاح",
    reset: "إعادة ضبط التقدم",
    f1: "📝 أسئلة CKA",
    f1d: "أسئلة وفق مجالات الاختبار الرسمية.",
    f2: "⚡ XP والمستويات",
    f2d: "اكسب XP وتقدم في المستويات.",
    f3: "💡 الشروحات",
    f3d: "شرح تقني بعد كل إجابة.",
    f4: "💾 التقدم",
    f4d: "يتم حفظ تقدمك تلقائيًا.",
    exam: "اختبار CKA — ساعتان · حد أدنى 66% · 395 USD",
    welcome: "مرحبًا",
  },
};

const LEVELS = [
  { minXP: 0, icon: "🌱", name: "Padawan K8s" },
  { minXP: 100, icon: "⚡", name: "Kubectl Initié" },
  { minXP: 300, icon: "🐋", name: "Pod Wrangler" },
  { minXP: 600, icon: "🚀", name: "Deployer Pro" },
  { minXP: 1000, icon: "🛡️", name: "Cluster Guardian" },
  { minXP: 1500, icon: "⭐", name: "Node Master" },
  { minXP: 2200, icon: "👑", name: "CKA Ready" },
];

const DOMAINS = [
  {
    id: "storage",
    icon: "💾",
    color: "#818cf8",
    name: "Storage (10%)",
    questions: [
      { q: "Quelle ressource fournit du stockage persistant dans Kubernetes ?", options: ["PersistentVolume", "ConfigMap", "ReplicaSet", "StatefulNode"], answer: 0, xp: 12, explanation: "Un PersistentVolume (PV) est une ressource cluster qui représente du stockage provisionné indépendamment des Pods." },
      { q: "Quel objet consomme un PersistentVolume ?", options: ["PersistentVolumeClaim", "ServiceAccount", "IngressClass", "EndpointSlice"], answer: 0, xp: 12, explanation: "Le PVC demande du stockage (taille, mode d'accès) et se lie à un PV compatible." },
      { q: "Quel access mode autorise plusieurs nœuds en lecture/écriture ?", options: ["ReadWriteMany (RWX)", "ReadWriteOncePod", "ReadOnlyOnce", "WriteManyOnly"], answer: 0, xp: 15, explanation: "RWX permet le montage en lecture/écriture sur plusieurs nœuds, selon le backend de stockage." },
      { q: "Que fait la reclaim policy Retain d'un PV ?", options: ["Conserve les données après suppression du PVC", "Supprime automatiquement le PV", "Convertit le PV en ConfigMap", "Force un remount"], answer: 0, xp: 15, explanation: "Retain garde le volume et ses données pour récupération manuelle après suppression du claim." },
      { q: "Quelle commande applique un manifeste de StorageClass ?", options: ["kubectl apply -f storageclass.yaml", "kubectl create pvc storageclass.yaml", "kubectl set storage storageclass.yaml", "kubectl attach storageclass.yaml"], answer: 0, xp: 10, explanation: "La création déclarative passe par kubectl apply -f pour créer/mettre à jour une StorageClass." },
    ],
  },
  {
    id: "troubleshooting",
    icon: "🔧",
    color: "#f87171",
    name: "Troubleshooting (30%)",
    questions: [
      { q: "Quelle commande affiche les logs d'un Pod ?", options: ["kubectl logs <pod>", "kubectl events <pod>", "kubectl output <pod>", "kubectl trace <pod>"], answer: 0, xp: 16, explanation: "kubectl logs est la commande de base pour inspecter stdout/stderr d'un conteneur." },
      { q: "Un nœud passe NotReady après un souci kubelet. Action la plus directe ?", options: ["systemctl restart kubelet", "kubectl restart apiserver", "kubectl delete node", "reboot etcd"], answer: 0, xp: 18, explanation: "Redémarrer kubelet côté nœud est souvent l'action immédiate pour récupérer l'état Ready." },
      { q: "Pour comprendre pourquoi un Pod reste Pending, on commence par :", options: ["kubectl describe pod <pod>", "kubectl top pod <pod>", "kubectl cp <pod>", "kubectl expose pod <pod>"], answer: 0, xp: 18, explanation: "kubectl describe expose les événements de scheduling, taints, ressources insuffisantes, etc." },
      { q: "Quelle commande liste les événements récents du cluster ?", options: ["kubectl get events --sort-by=.lastTimestamp", "kubectl logs events", "kubectl inspect events", "kubectl show events"], answer: 0, xp: 20, explanation: "get events trié par timestamp aide à reconstruire la chronologie d'incidents." },
      { q: "Quelle commande donne les détails d'un nœud pour diagnostic ?", options: ["kubectl describe node <node>", "kubectl logs node <node>", "kubectl apply node <node>", "kubectl expose node <node>"], answer: 0, xp: 16, explanation: "describe node affiche conditions, capacité, taints et événements liés au nœud." },
      { q: "Quel signal indique souvent un problème de scheduler/ressources ?", options: ["Pods en Pending avec FailedScheduling", "Pods en Running", "Services en ClusterIP", "CoreDNS en Ready"], answer: 0, xp: 20, explanation: "L'événement FailedScheduling révèle directement les contraintes empêchant le placement." },
    ],
  },
  {
    id: "workloads",
    icon: "📦",
    color: "#fbbf24",
    name: "Workloads & Scheduling (15%)",
    questions: [
      { q: "Commande standard pour rolling update d'un Deployment ?", options: ["kubectl set image deploy/web web=nginx:1.28", "kubectl replace pod web", "kubectl patch service web", "kubectl scale node web"], answer: 0, xp: 15, explanation: "kubectl set image sur le Deployment déclenche un rolling update contrôlé." },
      { q: "Pour rollback la dernière révision d'un Deployment :", options: ["kubectl rollout undo deployment/web", "kubectl rollback deployment/web", "kubectl revert deploy/web", "kubectl undo pod/web"], answer: 0, xp: 15, explanation: "rollout undo revient à la révision précédente d'un Deployment." },
      { q: "Pour changer rapidement le nombre de réplicas :", options: ["kubectl scale deployment api --replicas=5", "kubectl set replicas api 5", "kubectl grow deployment api 5", "kubectl edit service api"], answer: 0, xp: 12, explanation: "kubectl scale ajuste replicas sur Deployment/RS/StatefulSet." },
      { q: "Quel contrôleur garantit un Pod par nœud ?", options: ["DaemonSet", "Deployment", "Job", "StatefulSet"], answer: 0, xp: 14, explanation: "DaemonSet est adapté aux agents node-level (logs, monitoring, CNI)." },
      { q: "Option pour générer un manifeste sans le créer :", options: ["--dry-run=client -o yaml", "--server-preview", "--validate-only=client", "--simulate"], answer: 0, xp: 16, explanation: "Le dry-run client avec sortie YAML produit le manifeste sans persistance API." },
    ],
  },
  {
    id: "architecture",
    icon: "🏗️",
    color: "#34d399",
    name: "Cluster Architecture (25%)",
    questions: [
      { q: "Composant qui stocke l'état du cluster ?", options: ["etcd", "kube-proxy", "CoreDNS", "kubelet"], answer: 0, xp: 16, explanation: "etcd est la base clé-valeur distribuée qui conserve l'état source de vérité du cluster." },
      { q: "Commande pour préparer un nœud à la maintenance en évacuant les Pods ?", options: ["kubectl drain <node> --ignore-daemonsets", "kubectl cordon <node> --delete-pods", "kubectl taint <node> drain=true", "kubectl delete node <node>"], answer: 0, xp: 20, explanation: "drain marque Unschedulable et évacue les workloads non DaemonSet." },
      { q: "Différence principale entre cordon et drain ?", options: ["cordon bloque le scheduling, drain bloque + évacue", "drain est plus rapide mais identique", "cordon supprime le nœud", "drain redémarre kubelet"], answer: 0, xp: 20, explanation: "cordon seul ne déplace pas les Pods existants, contrairement à drain." },
      { q: "Commande etcdctl pour snapshot backup ?", options: ["etcdctl snapshot save snapshot.db", "etcdctl backup create snapshot.db", "etcdctl dump snapshot.db", "etcdctl save --snapshot"], answer: 0, xp: 18, explanation: "snapshot save crée une sauvegarde exploitable pour restauration etcd." },
      { q: "Quel composant assigne les Pods aux nœuds ?", options: ["kube-scheduler", "kube-controller-manager", "kube-apiserver", "kube-proxy"], answer: 0, xp: 14, explanation: "kube-scheduler sélectionne le nœud en fonction des contraintes/affinités/ressources." },
      { q: "Commande type pour upgrade plan kubeadm :", options: ["kubeadm upgrade plan", "kubectl upgrade plan", "kubelet upgrade plan", "etcdctl upgrade plan"], answer: 0, xp: 18, explanation: "kubeadm upgrade plan vérifie les versions cibles et prérequis avant upgrade." },
    ],
  },
  {
    id: "networking",
    icon: "🌐",
    color: "#c084fc",
    name: "Services & Networking (20%)",
    questions: [
      { q: "Type de Service exposant un port statique sur chaque nœud ?", options: ["NodePort", "ClusterIP", "ExternalName", "Headless"], answer: 0, xp: 15, explanation: "NodePort alloue un port dans une plage dédiée sur chaque nœud." },
      { q: "Type de Service interne par défaut ?", options: ["ClusterIP", "NodePort", "LoadBalancer", "Ingress"], answer: 0, xp: 12, explanation: "ClusterIP expose le service uniquement dans le réseau cluster." },
      { q: "Composant qui gère principalement les règles réseau des Services ?", options: ["kube-proxy", "kube-scheduler", "kubeadm", "kubelet"], answer: 0, xp: 14, explanation: "kube-proxy programme iptables/ipvs pour router le trafic vers les endpoints." },
      { q: "Objet qui restreint les flux Pod-to-Pod ?", options: ["NetworkPolicy", "ResourceQuota", "LimitRange", "RuntimeClass"], answer: 0, xp: 20, explanation: "NetworkPolicy définit des règles ingress/egress, avec plugin réseau compatible." },
      { q: "Service DNS interne standard du cluster ?", options: ["CoreDNS", "kube-dhcp", "dnsmasq", "etcd-dns"], answer: 0, xp: 14, explanation: "CoreDNS résout les noms de services et pods dans le cluster Kubernetes." },
      { q: "Rôle principal d'un Ingress ?", options: ["Router HTTP/HTTPS vers Services", "Créer un PV", "Planifier des Pods", "Sauvegarder etcd"], answer: 0, xp: 20, explanation: "Ingress définit le routage L7; un Ingress Controller applique ces règles." },
    ],
  },
];

const storageGet = async (key) => {
  try {
    if (!window.storage) {
      const mem = (window.__ckaMem = window.__ckaMem || new Map());
      return mem.has(key) ? mem.get(key) : null;
    }
    const r = await window.storage.get(key);
    return r ? JSON.parse(r.value) : null;
  } catch {
    return null;
  }
};
const storageSet = async (key, val) => {
  try {
    if (!window.storage) {
      const mem = (window.__ckaMem = window.__ckaMem || new Map());
      mem.set(key, val);
      return;
    }
    await window.storage.set(key, JSON.stringify(val));
  } catch {}
};
const storageDel = async (key) => {
  try {
    if (!window.storage) {
      const mem = (window.__ckaMem = window.__ckaMem || new Map());
      mem.delete(key);
      return;
    }
    await window.storage.delete(key);
  } catch {}
};

function Fireworks({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const colors = ["#fbbf24", "#f87171", "#34d399", "#60a5fa", "#a78bfa", "#fb923c", "#f472b6", "#38bdf8", "#e879f9"];
    let raf = 0;
    let ended = false;
    const particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const burst = (delay) => {
      setTimeout(() => {
        const cx = canvas.width * (0.15 + Math.random() * 0.7);
        const cy = canvas.height * (0.15 + Math.random() * 0.5);
        for (let i = 0; i < 60; i += 1) {
          const a = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
          const speed = 2 + Math.random() * 6;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            g: 0.045,
            life: 1,
            decay: 0.01 + Math.random() * 0.015,
            size: 2 + Math.random() * 3,
            color: colors[(Math.random() * colors.length) | 0],
          });
        }
      }, delay);
    };
    for (let i = 0; i < 6; i += 1) burst(i * 180);
    const start = Date.now();
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!ended && Date.now() - start < 2800) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      ended = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);
  return <canvas className={`fireworks ${active ? "show" : ""}`} ref={ref} aria-hidden="true" />;
}

function K8sBg() {
  const floats = useMemo(() => Array.from({ length: 8 }, (_, i) => ({ id: i, left: 8 + i * 11 + (i % 2) * 3, top: 5 + (i * 12) % 75, dur: 16 + (i * 1.3) % 9, sym: i % 2 ? "☸" : "⎈" })), []);
  const nodes = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ id: i, left: 12 + i * 18, top: 24 + (i % 3) * 20, delay: i * 1.1 })), []);
  return (
    <div className="k8s-bg" aria-hidden="true">
      <svg className="net" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 12 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 9} x2="100" y2={i * 9} />)}
        {Array.from({ length: 12 }).map((_, i) => <line key={`v${i}`} y1="0" x1={i * 9} y2="100" x2={i * 9} />)}
      </svg>
      <div className="mesh" />
      {floats.map((f) => (
        <span key={f.id} className="float-symbol" style={{ left: `${f.left}%`, top: `${f.top}%`, animationDuration: `${f.dur}s` }}>{f.sym}</span>
      ))}
      {nodes.map((n) => <span key={n.id} className="node" style={{ left: `${n.left}%`, top: `${n.top}%`, animationDelay: `${n.delay}s` }} />)}
    </div>
  );
}

const totalQuestions = DOMAINS.reduce((acc, d) => acc + d.questions.length, 0);

export default function CKAQuest() {
  const [lang, setLang] = useState("fr");
  const [screen, setScreen] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [authUser, setAuthUser] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [user, setUser] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentDomain, setCurrentDomain] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [xpDelta, setXpDelta] = useState(null);
  const [showFx, setShowFx] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const langRef = useRef(null);
  const tr = LANGS[lang] || LANGS.fr;

  const currentLevel = useMemo(() => {
    if (!user) return LEVELS[0];
    for (let i = LEVELS.length - 1; i >= 0; i -= 1) if (user.xp >= LEVELS[i].minXP) return LEVELS[i];
    return LEVELS[0];
  }, [user]);
  const nextLevel = useMemo(() => LEVELS.find((l) => l.minXP > (user?.xp || 0)) || currentLevel, [currentLevel, user]);
  const xpProgress = useMemo(() => {
    if (!user) return 0;
    if (nextLevel.minXP === currentLevel.minXP) return 100;
    const pct = ((user.xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [currentLevel.minXP, nextLevel.minXP, user]);

  const answeredCount = useMemo(() => Object.keys(user?.answered || {}).length, [user]);
  const correctCount = useMemo(
    () => Object.values(user?.answered || {}).filter((x) => x.correct).length,
    [user]
  );
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;

  useEffect(() => {
    (async () => {
      const ses = await storageGet("cka-session");
      if (ses && ses.name) {
        setUser(ses);
        setScreen("dashboard");
      }
    })();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const persistUser = useCallback(async (u) => {
    if (!u?.name) return;
    const key = `cka-user-${u.name.toLowerCase()}`;
    await storageSet(key, u);
    await storageSet("cka-session", u);
  }, []);

  const doAuth = useCallback(async (ev) => {
    ev.preventDefault();
    if (authBusy) return;
    setAuthBusy(true);
    try {
      setAuthErr("");
      const name = authUser.trim();
      const pass = authPass;
      if (!name || !pass) {
        setAuthErr(tr.errFields);
        return;
      }
      const key = `cka-user-${name.toLowerCase()}`;
      const existing = await storageGet(key);
      if (authMode === "register") {
        if (existing) {
          setAuthErr(tr.errUser);
          return;
        }
        const nu = { name, pass, xp: 0, answered: {}, streak: 0 };
        await storageSet(key, nu);
        await storageSet("cka-session", nu);
        setUser(nu);
        setScreen("dashboard");
        return;
      }
      if (!existing || existing.pass !== pass) {
        setAuthErr(tr.errCred);
        return;
      }
      await storageSet("cka-session", existing);
      setUser(existing);
      setScreen("dashboard");
    } finally {
      setAuthBusy(false);
    }
  }, [authBusy, authMode, authPass, authUser, tr.errCred, tr.errFields, tr.errUser]);

  const logout = useCallback(async () => {
    setUser(null);
    setCurrentDomain(null);
    setSelected(null);
    setQIndex(0);
    await storageDel("cka-session");
    setScreen("landing");
  }, []);

  const openDomain = useCallback((domain) => {
    setCurrentDomain(domain);
    setQIndex(0);
    setSelected(null);
    setScreen("quiz");
  }, []);

  const domainStats = useMemo(() => {
    const ans = user?.answered || {};
    return DOMAINS.map((d) => {
      const ids = d.questions.map((_, i) => `${d.id}-${i}`);
      const done = ids.filter((id) => ans[id]).length;
      const c = ids.filter((id) => ans[id]?.correct).length;
      return { id: d.id, done, correct: c, total: d.questions.length, pct: Math.round((done / d.questions.length) * 100) };
    });
  }, [user]);

  const answerCurrent = useCallback(async (idx) => {
    if (!user || !currentDomain || selected !== null) return;
    const q = currentDomain.questions[qIndex];
    const correct = idx === q.answer;
    setSelected(idx);
    const key = `${currentDomain.id}-${qIndex}`;
    if (user.answered[key]) return;
    const streak = correct ? user.streak + 1 : 0;
    const bonus = correct && streak >= 2 ? Math.floor(q.xp * 0.5) : 0;
    const gained = correct ? q.xp + bonus : 0;
    if (correct) {
      setShowFx(true);
      setXpDelta(gained);
      setTimeout(() => setShowFx(false), 2000);
      setTimeout(() => setXpDelta(null), 1800);
    }
    const updated = {
      ...user,
      xp: user.xp + gained,
      streak,
      answered: {
        ...user.answered,
        [key]: { picked: idx, correct, ts: Date.now() },
      },
    };
    setUser(updated);
    await persistUser(updated);
  }, [currentDomain, persistUser, qIndex, selected, user]);

  const nextQuestion = useCallback(() => {
    if (!currentDomain) return;
    if (qIndex < currentDomain.questions.length - 1) {
      setQIndex((x) => x + 1);
      setSelected(null);
      return;
    }
    setScreen("results");
  }, [currentDomain, qIndex]);

  const resetAll = useCallback(async () => {
    if (!user) return;
    const updated = { ...user, xp: 0, answered: {}, streak: 0 };
    setUser(updated);
    await persistUser(updated);
  }, [persistUser, user]);

  const restartDomain = useCallback(async () => {
    if (!user || !currentDomain) return;
    const out = { ...user, answered: { ...user.answered }, streak: 0 };
    currentDomain.questions.forEach((_, i) => delete out.answered[`${currentDomain.id}-${i}`]);
    setUser(out);
    await persistUser(out);
    setScreen("quiz");
    setQIndex(0);
    setSelected(null);
  }, [currentDomain, persistUser, user]);

  const quizQuestion = currentDomain?.questions[qIndex];
  const resultStats = useMemo(() => {
    if (!user || !currentDomain) return { good: 0, total: 0, pct: 0 };
    const keys = currentDomain.questions.map((_, i) => `${currentDomain.id}-${i}`);
    const good = keys.filter((k) => user.answered[k]?.correct).length;
    const total = keys.filter((k) => user.answered[k]).length;
    const pct = total ? Math.round((good / total) * 100) : 0;
    return { good, total: currentDomain.questions.length, pct };
  }, [currentDomain, user]);

  return (
    <div className="app" dir={tr.dir}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Fira+Code:wght@400;600&display=swap');
:root{--bg:#060a14;--bg2:#0d1424;--bg3:#131c30;--border:#1a2744;--text:#d4daf0;--dim:#6b7fa8;--accent:#818cf8;--accent2:#6366f1;--green:#34d399;--red:#f87171;--gold:#fbbf24;--pink:#f472b6}
*{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif}
.app{min-height:100vh;position:relative;overflow-x:hidden}.mono{font-family:'Fira Code',monospace}
button,input{font-family:inherit}.card{background:var(--bg2);border:1px solid var(--border);border-radius:18px}
.k8s-bg{position:fixed;inset:0;z-index:0;pointer-events:none}.net{position:absolute;inset:0;width:100%;height:100%}.net line{stroke:#94a3b8;stroke-opacity:.025;stroke-width:.16}
.mesh{position:absolute;inset:-10%;background:radial-gradient(circle at 20% 15%,rgba(99,102,241,.18),transparent 36%),radial-gradient(circle at 75% 28%,rgba(52,211,153,.12),transparent 33%),radial-gradient(circle at 50% 80%,rgba(168,85,247,.15),transparent 40%)}
.float-symbol{position:absolute;font-size:30px;opacity:.04;animation:k8sFloat 22s ease-in-out infinite}
.node{position:absolute;width:10px;height:10px;border-radius:999px;background:rgba(129,140,248,.35);animation:nodePulse 10s ease-in-out infinite}
.main{position:relative;z-index:1;max-width:1160px;margin:0 auto;padding:24px}
.hero{margin-top:58px;text-align:center;animation:landReveal .8s ease both}.wheel{font-size:92px;filter:drop-shadow(0 0 18px rgba(99,102,241,.42));animation:spinWheel 20s linear infinite}
h1{white-space:pre-line;font-size:clamp(38px,5vw,68px);line-height:1.04;margin:18px auto;background:linear-gradient(120deg,#e2e8f0,#a5b4fc,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent;animation:heroGlow 2.8s ease infinite}
.sub{max-width:520px;margin:0 auto;color:var(--dim);line-height:1.7}
.cta{margin-top:24px;background:linear-gradient(135deg,var(--accent),var(--accent2));border:0;color:#fff;padding:13px 20px;border-radius:12px;font-weight:700;cursor:pointer;transition:.25s}
.cta:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(99,102,241,.33)}.cta:focus-visible{outline:2px solid #fff;outline-offset:2px}
.warn{margin:30px auto 18px;max-width:780px;padding:18px;border:1px solid rgba(251,191,36,.45);background:linear-gradient(120deg,rgba(251,191,36,.06),rgba(251,191,36,.02));animation:fadeUp .8s .3s both,borderShimmer 3s ease infinite}
.warn h3{margin:0 0 10px;color:var(--gold)}.badge-exam{margin-top:12px;display:inline-block;background:rgba(248,113,113,.18);border:1px solid rgba(248,113,113,.45);color:#fecaca;padding:7px 11px;border-radius:999px;font-size:12px}
.features{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:26px}.feature{padding:14px;animation:fadeUp .75s both;transition:.2s}
.feature:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 12px 24px rgba(8,15,35,.45);background:var(--bg3)}.feature h4{margin:0 0 8px}.feature p{margin:0;color:var(--dim);line-height:1.5}
.auth-wrap{min-height:calc(100vh - 40px);display:grid;place-items:center}.auth{width:min(380px,95%);padding:24px;animation:fadeUp .5s both}
.auth-title{font-size:22px;font-weight:700;background:linear-gradient(120deg,#e2e8f0,#a5b4fc,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent;margin:6px 0 14px}
.field{margin-bottom:11px}.field input{width:100%;border-radius:10px;border:1px solid var(--border);padding:11px 12px;background:#070d1a;color:var(--text);font-family:'Fira Code',monospace}
.field input:focus{outline:0;border-color:var(--accent);box-shadow:0 0 0 2px rgba(129,140,248,.2)}.err{color:#fca5a5;font-size:13px;margin-bottom:10px}
.toggle{margin-top:12px;background:none;border:0;color:var(--dim);cursor:pointer}
.top{position:sticky;top:0;z-index:100;background:rgba(6,10,20,.72);backdrop-filter:blur(24px);border-bottom:1px solid rgba(148,163,184,.12)}
.top-in{max-width:1160px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.logo{display:flex;align-items:center;gap:8px;background:none;border:0;color:var(--text);cursor:pointer;font-weight:800}
.logo .spin{animation:spinWheel 16s linear infinite}.logo-t{background:linear-gradient(120deg,#c7d2fe,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.r{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
.b{padding:6px 10px;border:1px solid var(--border);background:var(--bg2);border-radius:999px;font-size:12px}.b.orange{border-color:rgba(251,146,60,.5);color:#fdba74}
.b.xp{background:rgba(251,191,36,.08);border-color:rgba(251,191,36,.3);font-family:'Fira Code',monospace}
.logout{border:1px solid rgba(248,113,113,.5);background:rgba(248,113,113,.08);color:#fecaca;border-radius:10px;padding:8px 10px;cursor:pointer}
.logout:hover{background:rgba(248,113,113,.16)}.lang{position:relative}.langbtn{border:1px solid var(--border);background:var(--bg2);color:var(--text);padding:8px 10px;border-radius:10px;cursor:pointer}
.menu{position:absolute;top:calc(100% + 6px);right:0;min-width:185px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:6px;animation:slideDown .2s ease;box-shadow:0 10px 22px rgba(0,0,0,.35)}
[dir="rtl"] .menu{right:auto;left:0}
.mi{display:flex;gap:8px;align-items:center;width:100%;border:0;background:none;color:var(--text);padding:8px;border-radius:8px;cursor:pointer;text-align:left}
[dir="rtl"] .mi{text-align:right}.mi:hover,.mi.active{background:var(--bg3)}
.langbtn:focus-visible,.mi:focus-visible,.logout:focus-visible,.logo:focus-visible,.back:focus-visible,.next:focus-visible,.opt:focus-visible,.reset:focus-visible,.toggle:focus-visible{outline:2px solid #c7d2fe;outline-offset:2px}
.xp-track{height:3px;background:rgba(99,102,241,.15)}.xp-fill{height:100%;background:linear-gradient(90deg,var(--accent),#93c5fd,var(--gold));transition:width .8s cubic-bezier(.16,1,.3,1)}
.dash h2{margin:2px 0 20px;font-size:32px;background:linear-gradient(120deg,#e2e8f0,#a5b4fc,#818cf8);-webkit-background-clip:text;background-clip:text;color:transparent}
.stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.stat{padding:14px}.k{color:var(--dim);font-size:13px}.v{font-weight:800;font-size:28px}
.domains{margin-top:16px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.d{position:relative;padding:14px;cursor:pointer;transition:.2s}.d:hover{background:var(--bg3);transform:translateY(-2px);box-shadow:0 12px 24px rgba(8,15,35,.4)}
.bar{position:absolute;inset:0 0 auto 0;height:3px;border-radius:12px 12px 0 0}.done{font-size:11px;color:var(--green)}
.progress{height:5px;background:rgba(148,163,184,.15);border-radius:999px;overflow:hidden;margin:8px 0}
.progress span{display:block;height:100%}.reset{display:block;margin:18px auto 0;background:none;border:0;color:var(--dim);opacity:.5;cursor:pointer}
.quiz-h{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px}.back{border:1px solid var(--border);background:var(--bg2);color:var(--text);padding:8px 11px;border-radius:10px;cursor:pointer}
.qcard{padding:16px;background:linear-gradient(180deg,rgba(20,31,56,.96),rgba(13,20,36,.95));border-color:rgba(129,140,248,.28)}
.xpb{display:inline-block;background:rgba(251,191,36,.16);border:1px solid rgba(251,191,36,.48);color:#fcd34d;padding:4px 9px;border-radius:999px;font-family:'Fira Code',monospace;font-size:12px}
.q{font-size:20px;font-weight:700;margin:11px 0 14px;color:#e7ecff;text-shadow:0 1px 0 rgba(0,0,0,.18)}.opts{display:grid;gap:9px}
.opt{display:flex;align-items:flex-start;gap:10px;border:1px solid rgba(129,140,248,.28);border-radius:12px;padding:11px;background:#0f1a33;cursor:pointer;transition:.2s;text-align:left;color:#dce5ff}
.opt:hover{background:rgba(129,140,248,.16);border-color:rgba(129,140,248,.5)}.opt:disabled{cursor:not-allowed;opacity:1}.opt.ok{border-color:rgba(52,211,153,.75);background:rgba(52,211,153,.16);color:#bbf7d0}
.opt.bad{border-color:rgba(248,113,113,.75);background:rgba(248,113,113,.16);color:#fecaca}.letter{width:26px;height:26px;display:grid;place-items:center;border-radius:8px;background:rgba(129,140,248,.32);font-weight:700;color:#eef2ff}
.exp{margin-top:13px;padding:12px;border-radius:11px;border:1px solid rgba(129,140,248,.34);background:rgba(20,31,56,.9)}.oktxt{color:var(--green);font-weight:700}.badtxt{color:var(--red);font-weight:700}.enc{color:var(--gold);margin-top:8px}
.next{margin-top:12px;width:100%;border:0;border-radius:12px;padding:12px;color:#fff;font-weight:700;cursor:pointer;background:linear-gradient(135deg,var(--accent),var(--accent2))}
.result{max-width:620px;margin:38px auto;padding:20px;text-align:center}.result .icon{font-size:52px}.small{color:var(--dim)}
.xp-pop{position:fixed;left:50%;top:52%;transform:translate(-50%,-50%);z-index:10000;color:var(--gold);font-size:44px;font-weight:900;font-family:'Fira Code',monospace;text-shadow:0 0 26px rgba(251,191,36,.5);animation:xpFly 1.8s ease both;pointer-events:none}
.fireworks{position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0}.fireworks.show{opacity:1}
@keyframes k8sFloat{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-24px) rotate(10deg)}}@keyframes nodePulse{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:.55;transform:scale(1.45)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes glow{0%,100%{box-shadow:0 0 0 rgba(129,140,248,0)}50%{box-shadow:0 0 18px rgba(129,140,248,.35)}}
@keyframes xpFly{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}45%{opacity:1;transform:translate(-50%,-53%) scale(1.15)}100%{opacity:0;transform:translate(-50%,-72%) scale(1.3)}}
@keyframes spinWheel{to{transform:rotate(360deg)}}@keyframes landReveal{from{opacity:0;transform:translateY(40px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes heroGlow{0%,100%{text-shadow:0 0 0 rgba(129,140,248,0)}50%{text-shadow:0 0 24px rgba(129,140,248,.36)}}@keyframes borderShimmer{0%,100%{box-shadow:0 0 0 rgba(251,191,36,.08)}50%{box-shadow:0 0 20px rgba(251,191,36,.22)}}
@media (max-width:700px){.features{grid-template-columns:1fr 1fr}.stats{grid-template-columns:1fr}.domains{grid-template-columns:1fr}.wheel{font-size:70px}.hero{margin-top:34px}.top-in{align-items:flex-start}.r{justify-content:flex-start}}
@media (max-width:480px){.features{grid-template-columns:1fr}.main{padding:14px}.q{font-size:18px}.dash h2{font-size:24px}.xp-pop{font-size:34px}}
      `}</style>
      <K8sBg />
      {showFx && <Fireworks active={showFx} />}
      {xpDelta !== null && <div className="xp-pop">+{xpDelta} XP</div>}

      {user && (
        <div className="top">
          <div className="top-in">
            <button className="logo" onClick={() => setScreen(user ? "dashboard" : "landing")}><span className="spin">☸</span><span className="logo-t">CKA QUEST</span></button>
            <div className="r">
              {user.streak >= 2 && <span className="b orange">🔥 {tr.streak}: {user.streak}</span>}
              <span className="b">{currentLevel.icon} {currentLevel.name}</span>
              <span className="b xp">⚡ {user.xp} XP</span>
              <span className="b">👤 {user.name}</span>
              <button className="logout" onClick={logout}>{tr.logout}</button>
              <div className="lang" ref={langRef}>
                <button className="langbtn" onClick={() => setLangOpen((x) => !x)} aria-haspopup="menu" aria-expanded={langOpen}>{LANGS[lang].flag} {LANGS[lang].name} ▾</button>
                {langOpen && <div className="menu" role="menu">{Object.entries(LANGS).map(([k, v]) => <button key={k} className={`mi ${k === lang ? "active" : ""}`} onClick={() => { setLang(k); setLangOpen(false); }} role="menuitem">{v.flag} {v.name}</button>)}</div>}
              </div>
            </div>
          </div>
          <div className="xp-track"><div className="xp-fill" style={{ width: `${xpProgress}%` }} /></div>
        </div>
      )}

      {!user && (
        <div className="main">
          <div className="lang" style={{ display: "flex", justifyContent: "flex-end" }} ref={langRef}>
            <button className="langbtn" onClick={() => setLangOpen((x) => !x)} aria-haspopup="menu" aria-expanded={langOpen}>{LANGS[lang].flag} {LANGS[lang].name} ▾</button>
            {langOpen && <div className="menu" role="menu">{Object.entries(LANGS).map(([k, v]) => <button key={k} className={`mi ${k === lang ? "active" : ""}`} onClick={() => { setLang(k); setLangOpen(false); }} role="menuitem">{v.flag} {v.name}</button>)}</div>}
          </div>
          {screen === "landing" && (
            <div className="hero">
              <div className="wheel">☸</div>
              <h1>{tr.hero}</h1>
              <p className="sub">{tr.heroSub}</p>
              <button className="cta" onClick={() => setScreen("auth")}>{tr.start}</button>
              <section className="warn card">
                <h3>{tr.warnTitle}</h3>
                <p>{tr.warnText}</p>
                <span className="badge-exam">{tr.exam}</span>
              </section>
              <div className="features">
                {[["f1", "f1d"], ["f2", "f2d"], ["f3", "f3d"], ["f4", "f4d"]].map(([k, kd], i) => (
                  <article key={k} className="feature card" style={{ animationDelay: `${0.6 + i * 0.12}s` }}>
                    <h4>{tr[k]}</h4><p>{tr[kd]}</p>
                  </article>
                ))}
              </div>
              <button className="toggle" style={{ marginTop: 24 }} onClick={() => { setScreen("auth"); setAuthMode("login"); }}>{tr.login}</button>
            </div>
          )}
          {screen === "auth" && (
            <div className="auth-wrap">
              <form className="auth card" onSubmit={doAuth} aria-live="polite">
                <div style={{ textAlign: "center", fontSize: 44 }}>☸</div>
                <div className="auth-title">{authMode === "login" ? tr.loginTitle : tr.registerTitle}</div>
                <div className="field"><input placeholder="k8s_ninja" value={authUser} onChange={(e) => setAuthUser(e.target.value)} autoComplete="username" /></div>
                <div className="field"><input type="password" placeholder="••••••••" value={authPass} onChange={(e) => setAuthPass(e.target.value)} autoComplete={authMode === "login" ? "current-password" : "new-password"} /></div>
                {authErr && <div className="err" role="alert">{authErr}</div>}
                <button className="cta" style={{ width: "100%" }} type="submit" disabled={authBusy} aria-busy={authBusy}>{authMode === "login" ? tr.login : tr.register}</button>
                <button type="button" className="toggle" onClick={() => setAuthMode((m) => (m === "login" ? "register" : "login"))}>{authMode === "login" ? tr.noAccount : tr.hasAccount}</button>
              </form>
            </div>
          )}
        </div>
      )}

      {user && (
        <div className="main">
          {screen === "dashboard" && (
            <section className="dash">
              <h2>{tr.welcome}, {user.name} 👋</h2>
              <div className="stats">
                <article className="stat card"><div className="k">{tr.questions}</div><div className="v">{answeredCount}/{totalQuestions}</div></article>
                <article className="stat card"><div className="k">{tr.accuracy}</div><div className="v">{accuracy}%</div></article>
                <article className="stat card"><div className="k">{tr.level}</div><div className="v" style={{ fontSize: 22 }}>{currentLevel.icon} {currentLevel.name}</div></article>
              </div>
              <div className="domains">
                {DOMAINS.map((d) => {
                  const s = domainStats.find((x) => x.id === d.id);
                  return (
                    <article key={d.id} className="d card" onClick={() => openDomain(d)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openDomain(d); }}>
                      <span className="bar" style={{ background: d.color }} />
                      {s.done === s.total && <div className="done">✓ {tr.done}</div>}
                      <h3>{d.icon} {d.name}</h3>
                      <div className="progress"><span style={{ width: `${s.pct}%`, background: d.color }} /></div>
                      <div className="small">{s.done}/{s.total} {tr.questions}</div>
                    </article>
                  );
                })}
              </div>
              <button className="reset" onClick={resetAll}>{tr.reset}</button>
            </section>
          )}

          {screen === "quiz" && currentDomain && quizQuestion && (
            <section>
              <div className="quiz-h">
                <button className="back" onClick={() => setScreen("dashboard")}>← {tr.back}</button>
                <div>{currentDomain.icon} {currentDomain.name} · Q {qIndex + 1}/{currentDomain.questions.length}</div>
                <div>{user.streak >= 2 ? `🔥 ${tr.streak}: ${user.streak}` : " "}</div>
              </div>
              <article className="qcard card">
                <span className="xpb">+{quizQuestion.xp} XP</span>
                <div className="q">{quizQuestion.q}</div>
                <div className="opts">
                  {quizQuestion.options.map((o, i) => {
                    const isOk = selected !== null && i === quizQuestion.answer;
                    const isBad = selected !== null && i === selected && i !== quizQuestion.answer;
                    return (
                      <button key={o} className={`opt ${isOk ? "ok" : ""} ${isBad ? "bad" : ""}`} disabled={selected !== null} onClick={() => answerCurrent(i)} aria-pressed={selected === i}>
                        <span className="letter">{String.fromCharCode(65 + i)}</span>
                        <span>{o}</span>
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <div className="exp">
                    {selected === quizQuestion.answer ? <div className="oktxt">{tr.correct}</div> : <div className="badtxt">{tr.wrongPre} {quizQuestion.options[quizQuestion.answer]}</div>}
                    <p>{quizQuestion.explanation}</p>
                    {selected !== quizQuestion.answer && <div className="enc">{tr.encourage}</div>}
                    <button className="next" onClick={nextQuestion}>{qIndex === currentDomain.questions.length - 1 ? tr.results : tr.next}</button>
                  </div>
                )}
              </article>
            </section>
          )}

          {screen === "results" && currentDomain && (
            <section className="result card">
              <div className="icon">{resultStats.pct >= 80 ? "🏆" : resultStats.pct >= 50 ? "👍" : "📚"}</div>
              <h2>{currentDomain.icon} {currentDomain.name}</h2>
              <p>{resultStats.good}/{resultStats.total} {tr.goodAns} — {resultStats.pct}% {tr.rate}</p>
              <p className="small">{resultStats.pct >= 80 ? tr.resGreat : resultStats.pct >= 50 ? tr.resGood : tr.resLearn}</p>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr", marginTop: 14 }}>
                <button className="back" onClick={restartDomain}>🔄 {tr.restart}</button>
                <button className="cta" onClick={() => setScreen("dashboard")}>🏠 {tr.home}</button>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
