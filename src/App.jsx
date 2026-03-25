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
    f1: "📝 50+ Questions CKA",
    f1d: "7 domaines + Killer Shell simulator",
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
    f1: "📝 50+ CKA Questions",
    f1d: "7 domains + Killer Shell simulator",
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
    f1: "📝 50+ Questões CKA",
    f1d: "7 domínios + Killer Shell",
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
    f1: "📝 50+ Domande CKA",
    f1d: "7 domini + Killer Shell",
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
    f1: "📝 50+ คำถาม CKA",
    f1d: "7 โดเมน + Killer Shell",
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
    f1: "📝 50+ CKA 题目",
    f1d: "7 个领域 + Killer Shell",
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
    f1: "📝 50+ Вопросов CKA",
    f1d: "7 доменов + Killer Shell",
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
    f1: "📝 50+ سؤال CKA",
    f1d: "7 مجالات + Killer Shell",
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
      { q: "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?", options: ["PersistentVolume", "PersistentVolumeClaim", "VolumeSnapshot", "StatefulSet"], answer: 0, xp: 14, explanation: "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer." },
      { q: "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?", options: ["spec.volumeMode", "spec.storageClassName", "spec.resourcesClass", "spec.provisioner"], answer: 1, xp: 14, explanation: "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique." },
      { q: "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?", options: ["Namespace différent", "Nom du Pod incorrect", "Modes d'accès ou capacité incompatibles", "ImagePullPolicy erronée"], answer: 2, xp: 18, explanation: "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles." },
      { q: "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?", options: ["Supprimé avec ses données", "Toujours présent, données conservées", "Converti en ConfigMap", "Remis automatiquement en Available et vidé"], answer: 1, xp: 18, explanation: "Avec Retain, le PV et ses données sont conservés pour traitement manuel." },
      { q: "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?", options: ["kubectl apply -f pvc.yaml", "kubectl mount pvc.yaml", "kubectl create volume -f pvc.yaml", "kubectl attach -f pvc.yaml"], answer: 0, xp: 12, explanation: "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource." },
    ],
  },
  {
    id: "troubleshooting",
    icon: "🔧",
    color: "#f87171",
    name: "Troubleshooting (30%)",
    questions: [
      { q: "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?", options: ["kubectl logs <pod> api", "kubectl logs <pod> -c api", "kubectl describe <pod> -c api", "kubectl get logs <pod>/api"], answer: 1, xp: 16, explanation: "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'." },
      { q: "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?", options: ["systemctl status kubelet", "kubectl rollout status kubelet", "crictl pull kubelet", "kubectl replace node"], answer: 0, xp: 18, explanation: "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique." },
      { q: "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?", options: ["kubectl top pod <pod>", "kubectl logs <pod>", "kubectl describe pod <pod>", "kubectl cp <pod>:/tmp"], answer: 2, xp: 18, explanation: "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc." },
      { q: "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?", options: ["kubectl get events --sort-by=.metadata.creationTimestamp", "kubectl logs events --tail=100", "kubectl describe events", "kubectl top events"], answer: 0, xp: 20, explanation: "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident." },
      { q: "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?", options: ["kubectl logs node/<node>", "kubectl describe node <node>", "kubectl get node <node> -o name", "kubectl explain node"], answer: 1, xp: 16, explanation: "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc." },
      { q: "Quel symptôme indique principalement un problème de planification (scheduler) ?", options: ["Pod Running mais non joignable", "Pod en CrashLoopBackOff", "Pods Pending avec évènement FailedScheduling", "Service en type NodePort"], answer: 2, xp: 20, explanation: "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes." },
    ],
  },
  {
    id: "workloads",
    icon: "📦",
    color: "#fbbf24",
    name: "Workloads & Scheduling (15%)",
    questions: [
      { q: "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?", options: ["kubectl set image deployment/web web=nginx:1.27", "kubectl replace pod web", "kubectl expose deployment web", "kubectl patch service web"], answer: 0, xp: 16, explanation: "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé." },
      { q: "Quelle commande annule la dernière révision d'un Deployment ?", options: ["kubectl rollout undo deployment/web", "kubectl rollback deployment/web", "kubectl set image --undo web", "kubectl revert deployment/web"], answer: 0, xp: 16, explanation: "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment." },
      { q: "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?", options: ["kubectl autoscale deployment api --min=6 --max=6", "kubectl scale deployment api --replicas=6", "kubectl patch deployment api --replicas=6", "kubectl set replicas deployment/api 6"], answer: 1, xp: 12, explanation: "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin." },
      { q: "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?", options: ["Deployment", "StatefulSet", "DaemonSet", "Job"], answer: 2, xp: 14, explanation: "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level." },
      { q: "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?", options: ["--dry-run=server -o yml", "--render-only", "--dry-run=client -o yaml", "--validate=false -o yaml"], answer: 2, xp: 16, explanation: "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster." },
    ],
  },
  {
    id: "architecture",
    icon: "🏗️",
    color: "#34d399",
    name: "Cluster Architecture (25%)",
    questions: [
      { q: "Quel composant est la source de vérité de l'état du cluster Kubernetes ?", options: ["kube-scheduler", "CoreDNS", "etcd", "kubelet"], answer: 2, xp: 16, explanation: "etcd stocke l'état cluster dans une base clé-valeur distribuée." },
      { q: "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?", options: ["kubectl cordon <node>", "kubectl drain <node> --ignore-daemonsets", "kubectl taint <node> maintenance=true:NoSchedule", "kubectl delete node <node>"], answer: 1, xp: 20, explanation: "drain rend le nœud unschedulable et évacue les Pods non DaemonSet." },
      { q: "Quelle phrase décrit correctement 'cordon' vs 'drain' ?", options: ["cordon redémarre kubelet, drain redémarre kube-proxy", "cordon bloque seulement le scheduling, drain bloque + évacue", "cordon supprime le nœud, drain le recrée", "Les deux font exactement la même chose"], answer: 1, xp: 20, explanation: "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants." },
      { q: "Quelle commande etcdctl réalise une sauvegarde snapshot ?", options: ["etcdctl snapshot save /backup/etcd.db", "etcdctl dump /backup/etcd.db", "etcdctl backup now /backup/etcd.db", "etcdctl state save /backup/etcd.db"], answer: 0, xp: 18, explanation: "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis." },
      { q: "Quel composant décide sur quel nœud un Pod sera placé ?", options: ["kube-controller-manager", "kube-apiserver", "kube-scheduler", "kube-proxy"], answer: 2, xp: 14, explanation: "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible." },
      { q: "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?", options: ["kubeadm upgrade check", "kubeadm upgrade plan", "kubectl upgrade plan", "kubelet --upgrade-plan"], answer: 1, xp: 18, explanation: "'kubeadm upgrade plan' affiche versions disponibles et prérequis." },
    ],
  },
  {
    id: "networking",
    icon: "🌐",
    color: "#c084fc",
    name: "Services & Networking (20%)",
    questions: [
      { q: "Quel type de Service expose un port fixe sur chaque nœud du cluster ?", options: ["ClusterIP", "ExternalName", "NodePort", "Headless"], answer: 2, xp: 15, explanation: "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767)." },
      { q: "Quel type de Service est créé par défaut si rien n'est précisé ?", options: ["LoadBalancer", "ClusterIP", "NodePort", "Ingress"], answer: 1, xp: 12, explanation: "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster)." },
      { q: "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?", options: ["kube-proxy", "kubelet", "CoreDNS", "kubeadm"], answer: 0, xp: 14, explanation: "kube-proxy traduit les Services en règles de forwarding vers les endpoints." },
      { q: "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?", options: ["NetworkPolicy", "ServiceAccount", "PodDisruptionBudget", "ResourceQuota"], answer: 0, xp: 20, explanation: "NetworkPolicy applique des règles de filtrage réseau selon labels et ports." },
      { q: "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?", options: ["dnsmasq", "CoreDNS", "kube-proxy", "etcd-dns"], answer: 1, xp: 14, explanation: "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes." },
      { q: "Quel est le rôle principal d'un Ingress dans Kubernetes ?", options: ["Stocker des certificats secrets", "Planifier les Pods", "Router HTTP/HTTPS vers des Services", "Créer automatiquement des Nodes"], answer: 2, xp: 20, explanation: "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller." },
    ],
  },
  {
    id: "exam-sim",
    icon: "🎯",
    color: "#f472b6",
    name: "Simulation Examen (Bonus)",
    questions: [
      { q: "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?", options: ["kubectl create deploy nginx-app --image=nginx:1.11.10-alpine --dry-run=client -o yaml", "kubectl run nginx-app --image=nginx:1.11.10-alpine --replicas=3", "kubectl apply deploy nginx-app --image=nginx:1.11.10-alpine", "kubectl make deploy nginx-app --image=nginx:1.11.10-alpine"], answer: 0, xp: 20, explanation: "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application." },
      { q: "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?", options: ["kubectl rollout undo deployment/nginx-app", "kubectl rollout restart deployment/nginx-app", "kubectl set image deployment/nginx-app nginx=nginx:latest", "kubectl delete deployment nginx-app && kubectl apply -f backup.yaml"], answer: 0, xp: 20, explanation: "'kubectl rollout undo' annule la dernière révision et restaure la précédente." },
      { q: "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?", options: ["systemctl restart kubelet && systemctl enable kubelet", "kubectl restart kubelet", "kubeadm reset && kubeadm init", "docker restart kubelet"], answer: 0, xp: 25, explanation: "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot." },
      { q: "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?", options: ["kubectl drain ek8s-node-1 --ignore-daemonsets --delete-emptydir-data --force", "kubectl cordon ek8s-node-1", "kubectl taint node ek8s-node-1 maintenance=true:NoSchedule", "kubectl delete node ek8s-node-1"], answer: 0, xp: 20, explanation: "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification." },
      { q: "Comment passer le deployment 'webserver' à 6 replicas ?", options: ["kubectl scale deploy webserver --replicas=6", "kubectl patch deployment webserver -p '{\"spec\":{\"replicas\":6}}'", "kubectl edit deployment webserver", "Toutes ces réponses sont valides"], answer: 3, xp: 15, explanation: "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen." },
      { q: "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?", options: ["kubectl run busybox --image=busybox --restart=Never --rm -it -- env > envpod.yaml", "kubectl create pod busybox --image=busybox -- env > envpod.yaml", "kubectl exec busybox -- env > envpod.yaml", "kubectl logs busybox -- env > envpod.yaml"], answer: 0, xp: 15, explanation: "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie." },
      { q: "Quelle commande liste tous les Pods triés par nom ?", options: ["kubectl get pods --sort-by=.metadata.name", "kubectl get pods --order-by=name", "kubectl get pods | sort -k1", "kubectl sort pods --by name"], answer: 0, xp: 10, explanation: "'--sort-by=.metadata.name' est la syntaxe kubectl attendue." },
      { q: "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?", options: ["kubectl run nginx --image=nginx --restart=Never --labels=env=test -n engineering", "kubectl create pod nginx --image=nginx --label env=test --ns engineering", "kubectl apply nginx --label env=test -n engineering", "kubectl expose pod nginx --labels env=test -n engineering"], answer: 0, xp: 15, explanation: "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard." },
      { q: "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?", options: ["kind: PersistentVolume + spec.capacity.storage: 2Gi + spec.accessModes: [ReadWriteMany] + spec.hostPath.path: /srv/app-data", "kind: PersistentVolumeClaim + spec.storage: 2Gi + hostPath", "kind: StorageClass + size: 2Gi + path: /srv/app-data", "kind: Volume + accessMode: ReadWriteMany + path: /srv/app-data"], answer: 0, xp: 20, explanation: "Le PV doit contenir capacity, accessModes et hostPath dans spec." },
      { q: "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?", options: ["kubectl get pod nginx -o jsonpath='{.spec.containers[].image}'", "kubectl logs nginx --image", "kubectl top pod nginx --containers", "kubectl get pod nginx -o wide | awk '{print $7}'"], answer: 0, xp: 15, explanation: "jsonpath sur .spec.containers[].image est la méthode précise et portable." },
    ],
  },
  {
    id: "killer-shell",
    icon: "💀",
    color: "#38bdf8",
    name: "Killer Shell Simulator",
    questions: [
      { q: "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?", options: ["spec.completions: 3 et spec.parallelism: 2", "spec.replicas: 3 et spec.parallel: 2", "spec.runs: 3 et spec.concurrent: 2", "spec.repeat: 3 et spec.threads: 2"], answer: 0, xp: 20, explanation: "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées." },
      { q: "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?", options: ["resources.requests.memory=20Mi et resources.limits.memory=50Mi", "memoryRequest=20Mi et memoryLimit=50Mi", "resources.min.memory=20Mi et resources.max.memory=50Mi", "spec.memory.request=20Mi et spec.memory.limit=50Mi"], answer: 0, xp: 15, explanation: "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits." },
      { q: "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?", options: ["spec.serviceAccountName: neptune-sa-v2", "metadata.serviceAccount: neptune-sa-v2", "spec.containers[].serviceAccount: neptune-sa-v2", "spec.securityContext.serviceAccount: neptune-sa-v2"], answer: 0, xp: 15, explanation: "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName." },
      { q: "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?", options: ["readinessProbe.exec.command: ['cat','/tmp/ready']", "readinessProbe.httpGet.path: /tmp/ready", "readinessProbe.tcpSocket.file: /tmp/ready", "readinessProbe.fileCheck: /tmp/ready"], answer: 0, xp: 20, explanation: "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès." },
      { q: "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?", options: ["Exporter le YAML, changer namespace, recréer, supprimer l'ancien", "kubectl move pod <name> -n neptune", "kubectl edit pod et modifier metadata.namespace", "kubectl cp pod saturn/neptune"], answer: 0, xp: 20, explanation: "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace." },
      { q: "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :", options: ["kubectl create configmap cm-html --from-file=index.html=/path/file.html", "kubectl create configmap cm-html --data index.html=/path/file.html", "kubectl apply configmap cm-html --file index.html=/path/file.html", "kubectl create cm-html --from-content /path/file.html"], answer: 0, xp: 15, explanation: "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap." },
      { q: "Pattern sidecar logs : quel design est correct ?", options: ["Deux conteneurs partageant un volume, sidecar en tail -f", "Un initContainer qui lit les logs en continu", "Un seul conteneur avec deux commandes", "kubectl logs --sidecar"], answer: 0, xp: 25, explanation: "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte." },
      { q: "Où définir les InitContainers dans un Pod ?", options: ["spec.initContainers", "spec.containers.init", "spec.preContainers", "metadata.initContainers"], answer: 0, xp: 15, explanation: "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers." },
      { q: "La commande kubectl expose sans --type crée par défaut quel Service ?", options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"], answer: 0, xp: 10, explanation: "Le type par défaut d'un Service est ClusterIP." },
      { q: "Un Service n'a aucun Endpoint. Cause la plus fréquente ?", options: ["Le selector du Service ne matche aucun label de Pod", "Le Service est en ClusterIP", "Le port targetPort est 80", "Le Pod est Running"], answer: 0, xp: 20, explanation: "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides." },
      { q: "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?", options: ["Éditer le Service: spec.type=NodePort + nodePort:30100", "kubectl convert service --type NodePort", "kubectl set type service NodePort", "kubectl expose --nodePort 30100"], answer: 0, xp: 15, explanation: "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort." },
      { q: "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?", options: ["Deux règles egress séparées (OR logique)", "Une seule règle combinant podSelector et ports", "Activer spec.dns=true", "Aucune règle DNS nécessaire"], answer: 0, xp: 25, explanation: "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND." },
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

  const QUIZ_I18N = useMemo(
    () => ({
      it: {
        // Storage
        "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?":
          "Devi creare un volume persistente da 2Gi con hostPath '/srv/app-data'. Quale risorsa definisci per prima?",
        "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer.":
          "Il PV è la risorsa di cluster che rappresenta lo storage disponibile. Il PVC viene dopo per consumarlo.",
        "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?":
          "Quale campo di un PVC permette di selezionare una StorageClass dinamica?",
        "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique.":
          "Il campo 'spec.storageClassName' indica la StorageClass che gestirà il provisioning dinamico.",
        "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?":
          "Un PVC è in Pending anche se esiste un PV libero. Qual è l'incompatibilità più probabile?",
        "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles.":
          "Il binding PVC/PV verifica, tra le altre cose, la capacità richiesta e gli accessModes compatibili.",
        "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?":
          "Elimini un PVC collegato a un PV con reclaimPolicy 'Retain'. Cosa succede al PV?",
        "Avec Retain, le PV et ses données sont conservés pour traitement manuel.":
          "Con Retain, il PV e i suoi dati vengono conservati per una gestione manuale.",
        "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?":
          "Quale comando è corretto per creare un PVC da un file YAML?",
        "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource.":
          "L'approccio dichiarativo standard è 'kubectl apply -f ...' per creare o aggiornare la risorsa.",

        // Troubleshooting
        "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?":
          "Quale comando mostrerà i log del container 'api' in un Pod multi-container?",
        "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'.":
          "Per un Pod multi-container, si specifica esplicitamente il container con '-c <nome>'.",
        "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?":
          "Un nodo è NotReady. Quale verifica di sistema è prioritaria sul nodo?",
        "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique.":
          "Il kubelet pubblica lo stato del nodo. Verificarne lo stato systemd è il primo passo logico.",
        "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?":
          "Un Pod rimane in Pending. Quale comando fornisce la causa più diretta?",
        "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc.":
          "Gli eventi di 'describe pod' indicano FailedScheduling, taints, mancanza di CPU/memoria, ecc.",
        "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?":
          "Quale comando è più adatto per vedere la cronologia degli eventi del cluster?",
        "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident.":
          "Ordinare per timestamp è molto utile per ricostruire la sequenza di un incidente.",
        "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?":
          "Vuoi diagnosticare pressione memoria/disco su un nodo. Quale comando usare?",
        "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc.":
          "La sezione Conditions di 'describe node' mostra MemoryPressure, DiskPressure, PIDPressure, ecc.",
        "Quel symptôme indique principalement un problème de planification (scheduler) ?":
          "Quale sintomo indica principalmente un problema di scheduling (scheduler)?",
        "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes.":
          "FailedScheduling indica vincoli di scheduling o risorse insufficienti.",

        // Workloads & Scheduling
        "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?":
          "Quale comando aggiorna l'immagine di un Deployment senza un'interruzione globale?",
        "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé.":
          "Il comando 'set image' su un Deployment avvia un rolling update controllato.",
        "Quelle commande annule la dernière révision d'un Deployment ?":
          "Quale comando annulla l'ultima revisione di un Deployment?",
        "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment.":
          "'kubectl rollout undo' ripristina la revisione precedente registrata dal Deployment.",
        "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?":
          "Devi passare rapidamente da 3 a 6 repliche. Quale comando usare?",
        "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin.":
          "'kubectl scale ... --replicas' è il metodo diretto ed esplicito per questa esigenza.",
        "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?":
          "Quale controller è adatto per eseguire un agente su ogni nodo (log, monitoring)?",
        "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level.":
          "DaemonSet garantisce un Pod per ogni nodo idoneo, ideale per agenti a livello nodo.",
        "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?":
          "Quale opzione è corretta per generare un manifesto YAML senza creare la risorsa?",
        "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster.":
          "'--dry-run=client -o yaml' genera il manifesto localmente senza persisterlo nel cluster.",

        // Architecture
        "Quel composant est la source de vérité de l'état du cluster Kubernetes ?":
          "Quale componente è la fonte di verità dello stato del cluster Kubernetes?",
        "etcd stocke l'état cluster dans une base clé-valeur distribuée.":
          "etcd memorizza lo stato del cluster in un database distribuito key-value.",
        "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?":
          "Stai preparando la manutenzione di un nodo evacuando i Pod applicativi. Quale comando è più adatto?",
        "drain rend le nœud unschedulable et évacue les Pods non DaemonSet.":
          "drain rende il nodo unschedulable ed evacua i Pod non DaemonSet.",
        "Quelle phrase décrit correctement 'cordon' vs 'drain' ?":
          "Quale frase descrive correttamente 'cordon' vs 'drain'?",
        "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants.":
          "cordon impedisce nuovi Pod; drain aggiunge l'evacuazione dei Pod esistenti.",
        "Quelle commande etcdctl réalise une sauvegarde snapshot ?":
          "Quale comando etcdctl esegue un backup snapshot?",
        "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis.":
          "Il sottocomando ufficiale è 'snapshot save' con i parametri TLS/endpoints richiesti.",
        "Quel composant décide sur quel nœud un Pod sera placé ?":
          "Quale componente decide su quale nodo verrà posizionato un Pod?",
        "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible.":
          "Lo scheduler valuta vincoli e risorse per selezionare il nodo di destinazione.",
        "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?":
          "Prima di un upgrade del control-plane, quale comando kubeadm fornisce il piano di upgrade?",
        "'kubeadm upgrade plan' affiche versions disponibles et prérequis.":
          "'kubeadm upgrade plan' mostra le versioni disponibili e i prerequisiti.",

        // Networking
        "Quel type de Service expose un port fixe sur chaque nœud du cluster ?":
          "Quale tipo di Service espone una porta fissa su ogni nodo del cluster?",
        "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767).":
          "NodePort apre una porta su ogni nodo (range predefinito 30000-32767).",
        "Quel type de Service est créé par défaut si rien n'est précisé ?":
          "Quale tipo di Service viene creato per default se non è specificato nulla?",
        "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster).":
          "Il tipo predefinito di un Service Kubernetes è ClusterIP (interno al cluster).",
        "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?":
          "Quale componente mantiene le regole di rete dei Service (iptables/ipvs) sui nodi?",
        "kube-proxy traduit les Services en règles de forwarding vers les endpoints.":
          "kube-proxy traduce i Service in regole di forwarding verso gli endpoint.",
        "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?":
          "Quale oggetto limita esplicitamente il traffico ingress/egress tra Pod?",
        "NetworkPolicy applique des règles de filtrage réseau selon labels et ports.":
          "NetworkPolicy applica regole di filtraggio di rete in base a label e porte.",
        "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?":
          "Quale componente DNS interno risolve i nomi dei Service (es: mysvc.myns.svc.cluster.local)?",
        "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes.":
          "CoreDNS è il server DNS standard dei cluster Kubernetes moderni.",
        "Quel est le rôle principal d'un Ingress dans Kubernetes ?":
          "Qual è il ruolo principale di un Ingress in Kubernetes?",
        "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller.":
          "Ingress descrive route L7 (HTTP/HTTPS) applicate da un Ingress Controller.",

        // Exam sim
        "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?":
          "Devi creare un Deployment 'nginx-app' con nginx:1.11.10-alpine e 3 repliche. Quale comando genera lo YAML senza creare la risorsa?",
        "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application.":
          "Usa '--dry-run=client -o yaml' per generare il manifesto, poi aggiungi replicas: 3 prima di applicarlo.",
        "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?":
          "Dopo un rolling update di nginx-app a 1.11.13-alpine, quale comando torna alla versione precedente?",
        "'kubectl rollout undo' annule la dernière révision et restaure la précédente.":
          "'kubectl rollout undo' annulla l'ultima revisione e ripristina la precedente.",
        "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?":
          "Il kubelet del master è andato giù. Quale sequenza ripristina il servizio in modo persistente?",
        "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot.":
          "kubelet è un servizio systemd. Restart + enable copre il ripristino immediato e al reboot.",
        "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?":
          "Devi rendere 'ek8s-node-1' indisponibile e ripianificare i Pod. Quale comando corrisponde?",
        "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification.":
          "'drain' cordona ed evacua i Pod. È l'azione attesa per manutenzione con ripianificazione.",
        "Comment passer le deployment 'webserver' à 6 replicas ?":
          "Come portare il deployment 'webserver' a 6 repliche?",
        "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen.":
          "Tutti e tre i metodi funzionano; 'scale' resta il più rapido in esame.",
        "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?":
          "Crea un Pod busybox che esegue 'env' e salva l'output in un file. Quale comando è corretto?",
        "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie.":
          "Con 'run ... --restart=Never --rm -it -- env' esegui env in un Pod effimero e reindirizzi l'output.",
        "Quelle commande liste tous les Pods triés par nom ?":
          "Quale comando elenca tutti i Pod ordinati per nome?",
        "'--sort-by=.metadata.name' est la syntaxe kubectl attendue.":
          "'--sort-by=.metadata.name' è la sintassi kubectl attesa.",
        "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?":
          "Crea un Pod nginx con l'etichetta env=test nel namespace engineering. Quale comando è corretto?",
        "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard.":
          "'kubectl run ... --restart=Never --labels ... -n engineering' è l'opzione imperativa standard.",
        "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?":
          "Quale snippet descrive correttamente un PV hostPath app-data da 2Gi in ReadWriteMany?",
        "Le PV doit contenir capacity, accessModes et hostPath dans spec.":
          "Il PV deve contenere capacity, accessModes e hostPath in spec.",
        "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?":
          "Senza 'kubectl describe', come mostrare l'immagine di un Pod nginx?",
        "jsonpath sur .spec.containers[].image est la méthode précise et portable.":
          "jsonpath su .spec.containers[].image è il metodo preciso e portabile.",

        // Killer shell
        "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?":
          "Un Job deve eseguire un'attività 3 volte in totale, con 2 Pod in parallelo. Quali campi YAML configurare?",
        "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées.":
          "Per un Job, 'completions' definisce il numero totale di successi attesi e 'parallelism' il numero di esecuzioni simultanee.",
        "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?":
          "Come impostare request memoria 20Mi e limit memoria 50Mi su un container?",
        "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits.":
          "Le risorse si definiscono sotto spec.containers[].resources con le sezioni requests e limits.",
        "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?":
          "In un Pod, dove si dichiara il ServiceAccount 'neptune-sa-v2'?",
        "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName.":
          "Il ServiceAccount di un Pod si configura a livello di spec.serviceAccountName.",
        "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?":
          "Quale readinessProbe exec verifica che esista un file /tmp/ready?",
        "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès.":
          "Una probe exec esegue un comando nel container; codice di ritorno 0 = successo.",
        "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?":
          "Per spostare un Pod da 'saturn' a 'neptune', quale approccio è corretto?",
        "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace.":
          "Non si può cambiare il namespace di un Pod esistente: bisogna ricreare la risorsa nel nuovo namespace.",
        "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :":
          "Crea un ConfigMap 'cm-html' con una chiave esplicita index.html da un file locale:",
        "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap.":
          "Il flag '--from-file=<key>=<path>' permette di fissare il nome della chiave nel ConfigMap.",
        "Pattern sidecar logs : quel design est correct ?":
          "Pattern sidecar logs: quale design è corretto?",
        "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte.":
          "Il pattern sidecar si basa su un volume condiviso tra container applicativo e container di raccolta.",
        "Où définir les InitContainers dans un Pod ?":
          "Dove definire gli InitContainers in un Pod?",
        "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers.":
          "Gli initContainers sono dichiarati sotto spec.initContainers e vengono eseguiti prima di spec.containers.",
        "La commande kubectl expose sans --type crée par défaut quel Service ?":
          "Il comando kubectl expose senza --type crea per default quale Service?",
        "Le type par défaut d'un Service est ClusterIP.":
          "Il tipo predefinito di un Service è ClusterIP.",
        "Un Service n'a aucun Endpoint. Cause la plus fréquente ?":
          "Un Service non ha Endpoints. Causa più frequente?",
        "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides.":
          "Senza corrispondenza selector/labels, nessun Pod è associato e gli Endpoints restano vuoti.",
        "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?":
          "Convertire un Service ClusterIP in NodePort 30100: metodo affidabile?",
        "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort.":
          "Il modo semplice è modificare il manifesto del Service per cambiare type e nodePort.",
        "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?":
          "In una NetworkPolicy egress, come consentire traffico verso Pod api O DNS:53?",
        "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND.":
          "Voci egress separate permettono un OR logico. Combinare vincoli in una sola voce equivale a un AND.",

        // Options that were in FR
        "Namespace différent": "Namespace diverso",
        "Nom du Pod incorrect": "Nome del Pod errato",
        "Modes d'accès ou capacité incompatibles": "AccessModes o capacità incompatibili",
        "ImagePullPolicy erronée": "ImagePullPolicy errata",
        "Supprimé avec ses données": "Eliminato con i suoi dati",
        "Toujours présent, données conservées": "Ancora presente, dati conservati",
        "Converti en ConfigMap": "Convertito in ConfigMap",
        "Remis automatiquement en Available et vidé": "Riportato automaticamente in Available e svuotato",
        "Pod Running mais non joignable": "Pod in Running ma non raggiungibile",
        "Pod en CrashLoopBackOff": "Pod in CrashLoopBackOff",
        "Pods Pending avec évènement FailedScheduling": "Pod Pending con evento FailedScheduling",
        "Service en type NodePort": "Service di tipo NodePort",
        "cordon redémarre kubelet, drain redémarre kube-proxy": "cordon riavvia kubelet, drain riavvia kube-proxy",
        "cordon bloque seulement le scheduling, drain bloque + évacue": "cordon blocca solo lo scheduling, drain blocca + evacua",
        "cordon supprime le nœud, drain le recrée": "cordon rimuove il nodo, drain lo ricrea",
        "Les deux font exactement la même chose": "Entrambi fanno esattamente la stessa cosa",
        "Stocker des certificats secrets": "Archiviare certificati segreti",
        "Planifier les Pods": "Schedulare i Pod",
        "Router HTTP/HTTPS vers des Services": "Instradare HTTP/HTTPS verso i Service",
        "Créer automatiquement des Nodes": "Creare automaticamente i Node",
        "Toutes ces réponses sont valides": "Tutte queste risposte sono valide",
        "Deux conteneurs partageant un volume, sidecar en tail -f": "Due container che condividono un volume, sidecar con tail -f",
        "Un initContainer qui lit les logs en continu": "Un initContainer che legge i log in continuo",
        "Un seul conteneur avec deux commandes": "Un solo container con due comandi",
        "Deux règles egress séparées (OR logique)": "Due regole egress separate (OR logico)",
        "Une seule règle combinant podSelector et ports": "Un'unica regola che combina podSelector e porte",
        "Activer spec.dns=true": "Attivare spec.dns=true",
        "Aucune règle DNS nécessaire": "Nessuna regola DNS necessaria",
        "Éditer le Service: spec.type=NodePort + nodePort:30100": "Modificare il Service: spec.type=NodePort + nodePort:30100",
      },
      pt: {
        // Storage
        "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?":
          "Você precisa criar um volume persistente de 2Gi usando hostPath '/srv/app-data'. Qual recurso você define primeiro?",
        "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer.":
          "O PV é o recurso do cluster que representa o armazenamento disponível. O PVC vem depois para consumi-lo.",
        "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?":
          "Qual campo de um PVC permite apontar para uma StorageClass dinâmica?",
        "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique.":
          "O campo 'spec.storageClassName' indica a StorageClass que controlará o provisionamento dinâmico.",
        "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?":
          "Um PVC está em Pending mesmo existindo um PV livre. Qual incompatibilidade é mais provável?",
        "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles.":
          "O binding PVC/PV verifica, principalmente, a capacidade solicitada e os accessModes compatíveis.",
        "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?":
          "Você exclui um PVC ligado a um PV com reclaimPolicy 'Retain'. O que acontece com o PV?",
        "Avec Retain, le PV et ses données sont conservés pour traitement manuel.":
          "Com Retain, o PV e seus dados são preservados para tratamento manual.",
        "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?":
          "Qual comando é correto para criar um PVC a partir de um arquivo YAML?",
        "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource.":
          "A abordagem declarativa padrão é 'kubectl apply -f ...' para criar ou atualizar o recurso.",

        // Troubleshooting
        "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?":
          "Qual comando exibirá os logs do contêiner 'api' em um Pod com múltiplos contêineres?",
        "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'.":
          "Para um Pod com múltiplos contêineres, você aponta explicitamente o contêiner com '-c <nome>'.",
        "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?":
          "Um nó está NotReady. Qual verificação de sistema é prioritária no nó?",
        "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique.":
          "O kubelet publica o estado do nó. Verificar o status no systemd é o primeiro passo lógico.",
        "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?":
          "Um Pod permanece em Pending. Qual comando dá a causa mais direta?",
        "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc.":
          "Os eventos do 'describe pod' mostram FailedScheduling, taints, falta de CPU/memória, etc.",
        "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?":
          "Qual comando é mais adequado para ver a cronologia dos eventos do cluster?",
        "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident.":
          "Ordenar por timestamp é muito útil para reconstruir a sequência de um incidente.",
        "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?":
          "Você quer diagnosticar pressão de memória/disco em um nó. Qual comando usar?",
        "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc.":
          "A seção Conditions do 'describe node' mostra MemoryPressure, DiskPressure, PIDPressure, etc.",
        "Quel symptôme indique principalement un problème de planification (scheduler) ?":
          "Qual sintoma indica principalmente um problema de agendamento (scheduler)?",
        "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes.":
          "FailedScheduling aponta para restrições de scheduling ou recursos insuficientes.",

        // Workloads
        "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?":
          "Qual comando atualiza a imagem de um Deployment sem uma interrupção global?",
        "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé.":
          "O comando 'set image' em um Deployment dispara um rolling update controlado.",
        "Quelle commande annule la dernière révision d'un Deployment ?":
          "Qual comando desfaz a última revisão de um Deployment?",
        "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment.":
          "'kubectl rollout undo' restaura a revisão anterior registrada pelo Deployment.",
        "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?":
          "Você precisa passar rapidamente de 3 para 6 réplicas. Qual comando usar?",
        "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin.":
          "'kubectl scale ... --replicas' é o método direto e explícito para essa necessidade.",
        "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?":
          "Qual controlador é adequado para executar um agente em cada nó (logs, monitoramento)?",
        "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level.":
          "DaemonSet garante um Pod por nó elegível, ideal para agentes no nível do nó.",
        "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?":
          "Qual opção é correta para gerar um manifesto YAML sem criar o recurso?",
        "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster.":
          "'--dry-run=client -o yaml' gera o manifesto localmente sem persistir no cluster.",

        // Architecture
        "Quel composant est la source de vérité de l'état du cluster Kubernetes ?":
          "Qual componente é a fonte de verdade do estado do cluster Kubernetes?",
        "etcd stocke l'état cluster dans une base clé-valeur distribuée.":
          "O etcd armazena o estado do cluster em um banco de dados distribuído chave-valor.",
        "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?":
          "Você está preparando uma manutenção de nó evacuando os Pods de aplicação. Qual comando é o mais adequado?",
        "drain rend le nœud unschedulable et évacue les Pods non DaemonSet.":
          "drain torna o nó unschedulable e evacua Pods que não são DaemonSet.",
        "Quelle phrase décrit correctement 'cordon' vs 'drain' ?":
          "Qual frase descreve corretamente 'cordon' vs 'drain'?",
        "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants.":
          "cordon impede novos Pods; drain adiciona a evacuação dos Pods existentes.",
        "Quelle commande etcdctl réalise une sauvegarde snapshot ?":
          "Qual comando etcdctl realiza um backup snapshot?",
        "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis.":
          "O subcomando oficial é 'snapshot save' com os parâmetros TLS/endpoints necessários.",
        "Quel composant décide sur quel nœud un Pod sera placé ?":
          "Qual componente decide em qual nó um Pod será colocado?",
        "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible.":
          "O scheduler avalia restrições e recursos para selecionar o nó alvo.",
        "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?":
          "Antes de um upgrade do control-plane, qual comando kubeadm fornece o plano de upgrade?",
        "'kubeadm upgrade plan' affiche versions disponibles et prérequis.":
          "'kubeadm upgrade plan' mostra as versões disponíveis e os pré-requisitos.",

        // Networking
        "Quel type de Service expose un port fixe sur chaque nœud du cluster ?":
          "Qual tipo de Service expõe uma porta fixa em cada nó do cluster?",
        "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767).":
          "NodePort abre uma porta em cada nó (faixa padrão 30000-32767).",
        "Quel type de Service est créé par défaut si rien n'est précisé ?":
          "Qual tipo de Service é criado por padrão se nada for especificado?",
        "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster).":
          "O tipo padrão de um Service Kubernetes é ClusterIP (interno ao cluster).",
        "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?":
          "Qual componente mantém as regras de rede dos Services (iptables/ipvs) nos nós?",
        "kube-proxy traduit les Services en règles de forwarding vers les endpoints.":
          "kube-proxy traduz Services em regras de encaminhamento para os endpoints.",
        "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?":
          "Qual objeto limita explicitamente o tráfego ingress/egress entre Pods?",
        "NetworkPolicy applique des règles de filtrage réseau selon labels et ports.":
          "NetworkPolicy aplica regras de filtragem de rede com base em labels e portas.",
        "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?":
          "Qual componente DNS interno resolve nomes de Services (ex: mysvc.myns.svc.cluster.local)?",
        "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes.":
          "CoreDNS é o servidor DNS padrão dos clusters Kubernetes modernos.",
        "Quel est le rôle principal d'un Ingress dans Kubernetes ?":
          "Qual é o papel principal de um Ingress no Kubernetes?",
        "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller.":
          "Ingress descreve rotas L7 (HTTP/HTTPS) aplicadas por um Ingress Controller.",

        // Exam sim
        "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?":
          "Você precisa criar um Deployment 'nginx-app' com nginx:1.11.10-alpine e 3 réplicas. Qual comando gera o YAML sem criar o recurso?",
        "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application.":
          "Use '--dry-run=client -o yaml' para gerar o manifesto e depois adicione replicas: 3 antes de aplicar.",
        "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?":
          "Após um rolling update de nginx-app para 1.11.13-alpine, qual comando volta para a versão anterior?",
        "'kubectl rollout undo' annule la dernière révision et restaure la précédente.":
          "'kubectl rollout undo' cancela a última revisão e restaura a anterior.",
        "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?":
          "O kubelet do master caiu. Qual sequência restaura o serviço de forma persistente?",
        "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot.":
          "kubelet é um serviço systemd. Restart + enable cobre a restauração imediata e após reboot.",
        "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?":
          "Você precisa tornar 'ek8s-node-1' indisponível e replanejar os Pods. Qual comando corresponde?",
        "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification.":
          "'drain' cordona e evacua os Pods. É a ação esperada para manutenção com replanejamento.",
        "Comment passer le deployment 'webserver' à 6 replicas ?":
          "Como ajustar o deployment 'webserver' para 6 réplicas?",
        "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen.":
          "As três maneiras funcionam; 'scale' ainda é a mais rápida no exame.",
        "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?":
          "Crie um Pod busybox que execute 'env' e salve a saída em um arquivo. Qual comando é correto?",
        "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie.":
          "Com 'run ... --restart=Never --rm -it -- env' você executa env em um Pod efêmero e redireciona a saída.",
        "Quelle commande liste tous les Pods triés par nom ?":
          "Qual comando lista todos os Pods ordenados por nome?",
        "'--sort-by=.metadata.name' est la syntaxe kubectl attendue.":
          "'--sort-by=.metadata.name' é a sintaxe esperada do kubectl.",
        "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?":
          "Crie um Pod nginx com o label env=test no namespace engineering. Qual comando é correto?",
        "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard.":
          "'kubectl run ... --restart=Never --labels ... -n engineering' é a opção imperativa padrão.",
        "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?":
          "Qual trecho descreve corretamente um PV hostPath app-data de 2Gi em ReadWriteMany?",
        "Le PV doit contenir capacity, accessModes et hostPath dans spec.":
          "O PV deve conter capacity, accessModes e hostPath em spec.",
        "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?":
          "Sem 'kubectl describe', como exibir a imagem de um Pod nginx?",
        "jsonpath sur .spec.containers[].image est la méthode précise et portable.":
          "jsonpath em .spec.containers[].image é o método preciso e portátil.",

        // Killer shell
        "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?":
          "Um Job precisa executar uma tarefa 3 vezes no total, com 2 Pods em paralelo. Quais campos YAML configurar?",
        "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées.":
          "Em um Job, 'completions' define o total de sucessos esperados e 'parallelism' o número de execuções simultâneas.",
        "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?":
          "Como definir request de memória 20Mi e limit de memória 50Mi em um contêiner?",
        "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits.":
          "Recursos são definidos em spec.containers[].resources com as seções requests e limits.",
        "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?":
          "Em um Pod, onde declarar o ServiceAccount 'neptune-sa-v2'?",
        "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName.":
          "O ServiceAccount de um Pod é configurado em spec.serviceAccountName.",
        "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?":
          "Qual readinessProbe exec verifica se existe um arquivo /tmp/ready?",
        "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès.":
          "Uma probe exec executa um comando no contêiner; código de retorno 0 = sucesso.",
        "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?":
          "Para mover um Pod de 'saturn' para 'neptune', qual abordagem é correta?",
        "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace.":
          "Não é possível mudar o namespace de um Pod existente: é preciso recriar o recurso no novo namespace.",
        "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :":
          "Crie um ConfigMap 'cm-html' com uma chave explícita index.html a partir de um arquivo local:",
        "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap.":
          "A flag '--from-file=<key>=<path>' permite definir o nome da chave no ConfigMap.",
        "Pattern sidecar logs : quel design est correct ?":
          "Padrão sidecar logs: qual design é correto?",
        "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte.":
          "O padrão sidecar se baseia em um volume compartilhado entre o contêiner da aplicação e o contêiner de coleta.",
        "Où définir les InitContainers dans un Pod ?":
          "Onde definir os InitContainers em um Pod?",
        "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers.":
          "InitContainers são declarados em spec.initContainers e executam antes de spec.containers.",
        "La commande kubectl expose sans --type crée par défaut quel Service ?":
          "O comando kubectl expose sem --type cria por padrão qual Service?",
        "Le type par défaut d'un Service est ClusterIP.":
          "O tipo padrão de um Service é ClusterIP.",
        "Un Service n'a aucun Endpoint. Cause la plus fréquente ?":
          "Um Service não tem Endpoints. Causa mais comum?",
        "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides.":
          "Sem correspondência selector/labels, nenhum Pod é associado e os Endpoints ficam vazios.",
        "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?":
          "Converter um Service ClusterIP em NodePort 30100: método confiável?",
        "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort.":
          "O caminho simples é editar o manifesto do Service para alterar type e nodePort.",
        "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?":
          "Em uma NetworkPolicy egress, como permitir tráfego para Pods api OU DNS:53?",
        "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND.":
          "Entradas egress separadas permitem um OR lógico. Combinar restrições em uma única entrada resulta em AND.",

        // Options that were in FR
        "Namespace différent": "Namespace diferente",
        "Nom du Pod incorrect": "Nome do Pod incorreto",
        "Modes d'accès ou capacité incompatibles": "AccessModes ou capacidade incompatíveis",
        "ImagePullPolicy erronée": "ImagePullPolicy incorreta",
        "Supprimé avec ses données": "Excluído com seus dados",
        "Toujours présent, données conservées": "Ainda presente, dados preservados",
        "Converti en ConfigMap": "Convertido em ConfigMap",
        "Remis automatiquement en Available et vidé": "Retornado automaticamente para Available e esvaziado",
        "Pod Running mais non joignable": "Pod em Running, mas inacessível",
        "Pod en CrashLoopBackOff": "Pod em CrashLoopBackOff",
        "Pods Pending avec évènement FailedScheduling": "Pods Pending com evento FailedScheduling",
        "Service en type NodePort": "Service do tipo NodePort",
        "cordon redémarre kubelet, drain redémarre kube-proxy": "cordon reinicia o kubelet, drain reinicia o kube-proxy",
        "cordon bloque seulement le scheduling, drain bloque + évacue": "cordon apenas bloqueia o scheduling, drain bloqueia + evacua",
        "cordon supprime le nœud, drain le recrée": "cordon remove o nó, drain o recria",
        "Les deux font exactement la même chose": "Ambos fazem exatamente a mesma coisa",
        "Stocker des certificats secrets": "Armazenar certificados secretos",
        "Planifier les Pods": "Agendar os Pods",
        "Router HTTP/HTTPS vers des Services": "Roteiar HTTP/HTTPS para Services",
        "Créer automatiquement des Nodes": "Criar Nodes automaticamente",
        "Toutes ces réponses sont valides": "Todas estas respostas são válidas",
        "Deux conteneurs partageant un volume, sidecar en tail -f": "Dois contêineres compartilhando um volume, sidecar com tail -f",
        "Un initContainer qui lit les logs en continu": "Um initContainer lendo logs continuamente",
        "Un seul conteneur avec deux commandes": "Um único contêiner com dois comandos",
        "Deux règles egress séparées (OR logique)": "Duas regras egress separadas (OR lógico)",
        "Une seule règle combinant podSelector et ports": "Uma única regra combinando podSelector e portas",
        "Activer spec.dns=true": "Ativar spec.dns=true",
        "Aucune règle DNS nécessaire": "Nenhuma regra DNS necessária",
        "Éditer le Service: spec.type=NodePort + nodePort:30100": "Editar o Service: spec.type=NodePort + nodePort:30100",
      },
      th: {
        // Storage
        "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?":
          "คุณต้องสร้าง Persistent Volume ขนาด 2Gi โดยใช้ hostPath '/srv/app-data' คุณต้องสร้างทรัพยากรใดก่อน?",
        "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer.":
          "PV คือทรัพยากรระดับคลัสเตอร์ที่แทนพื้นที่จัดเก็บที่มีอยู่ จากนั้น PVC จะมาใช้ (consume) PV นั้น",
        "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?":
          "ฟิลด์ใดใน PVC ที่ใช้ระบุ StorageClass แบบไดนามิก?",
        "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique.":
          "ฟิลด์ 'spec.storageClassName' ระบุ StorageClass ที่จะควบคุมการ provision แบบไดนามิก",
        "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?":
          "PVC อยู่สถานะ Pending ทั้งที่มี PV ว่างอยู่ สาเหตุความไม่เข้ากันที่เป็นไปได้มากที่สุดคืออะไร?",
        "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles.":
          "การ bind PVC/PV จะตรวจสอบความจุที่ขอและ accessModes ที่เข้ากันได้เป็นหลัก",
        "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?":
          "คุณลบ PVC ที่ผูกกับ PV ซึ่งมี reclaimPolicy เป็น 'Retain' แล้ว PV จะเป็นอย่างไร?",
        "Avec Retain, le PV et ses données sont conservés pour traitement manuel.":
          "เมื่อเป็น Retain ตัว PV และข้อมูลจะถูกเก็บไว้เพื่อให้จัดการด้วยตนเอง",
        "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?":
          "คำสั่งใดถูกต้องสำหรับสร้าง PVC จากไฟล์ YAML?",
        "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource.":
          "แนวทาง declarative มาตรฐานคือ 'kubectl apply -f ...' เพื่อสร้างหรืออัปเดตทรัพยากร",

        // Troubleshooting
        "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?":
          "คำสั่งใดจะแสดง log ของคอนเทนเนอร์ 'api' ใน Pod ที่มีหลายคอนเทนเนอร์?",
        "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'.":
          "สำหรับ Pod หลายคอนเทนเนอร์ ต้องระบุคอนเทนเนอร์ด้วย '-c <ชื่อ>'",
        "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?":
          "โหนดเป็น NotReady การตรวจสอบระดับระบบใดควรทำก่อนบนโหนดนั้น?",
        "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique.":
          "kubelet เป็นผู้รายงานสถานะของโหนด การตรวจสอบสถานะผ่าน systemd เป็นขั้นแรกที่เหมาะสม",
        "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?":
          "Pod ยังคงเป็น Pending คำสั่งใดบอกสาเหตุได้ตรงที่สุด?",
        "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc.":
          "เหตุการณ์ใน 'describe pod' จะแสดง FailedScheduling, taints, CPU/หน่วยความจำไม่พอ ฯลฯ",
        "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?":
          "คำสั่งใดเหมาะที่สุดสำหรับดูไทม์ไลน์ของเหตุการณ์ในคลัสเตอร์?",
        "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident.":
          "การเรียงตาม timestamp มีประโยชน์มากในการสร้างลำดับเหตุการณ์ของ incident",
        "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?":
          "คุณต้องการตรวจสอบแรงกดดันหน่วยความจำ/ดิสก์บนโหนด ควรใช้คำสั่งใด?",
        "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc.":
          "ส่วน Conditions ใน 'describe node' จะแสดง MemoryPressure, DiskPressure, PIDPressure ฯลฯ",
        "Quel symptôme indique principalement un problème de planification (scheduler) ?":
          "อาการใดบ่งชี้หลักๆ ว่าเป็นปัญหาด้านการ scheduling (scheduler)?",
        "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes.":
          "FailedScheduling ชี้ไปที่ข้อจำกัดในการ scheduling หรือทรัพยากรไม่เพียงพอ",

        // Workloads
        "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?":
          "คำสั่งใดอัปเดตอิมเมจของ Deployment โดยไม่ทำให้หยุดทั้งระบบ?",
        "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé.":
          "คำสั่ง 'set image' บน Deployment จะเริ่ม rolling update แบบควบคุมได้",
        "Quelle commande annule la dernière révision d'un Deployment ?":
          "คำสั่งใดใช้ย้อนกลับ (rollback) ไปยังรีวิชันก่อนหน้าของ Deployment?",
        "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment.":
          "'kubectl rollout undo' จะคืนค่ากลับไปยังรีวิชันก่อนหน้าที่ Deployment บันทึกไว้",
        "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?":
          "คุณต้องเปลี่ยนจาก 3 เป็น 6 replicas อย่างรวดเร็ว ควรใช้คำสั่งใด?",
        "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin.":
          "'kubectl scale ... --replicas' คือวิธีที่ตรงและชัดเจนที่สุดสำหรับงานนี้",
        "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?":
          "คอนโทรลเลอร์ใดเหมาะสำหรับรัน agent บนทุกโหนด (logs, monitoring)?",
        "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level.":
          "DaemonSet รับประกัน Pod หนึ่งตัวต่อโหนดที่เข้าเงื่อนไข เหมาะกับ agent ระดับโหนด",
        "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?":
          "ออปชันใดถูกต้องสำหรับสร้าง YAML manifest โดยไม่สร้างทรัพยากรจริง?",
        "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster.":
          "'--dry-run=client -o yaml' จะสร้าง manifest ในเครื่องโดยไม่สร้างในคลัสเตอร์",

        // Architecture
        "Quel composant est la source de vérité de l'état du cluster Kubernetes ?":
          "คอมโพเนนต์ใดเป็นแหล่งข้อมูลจริง (source of truth) ของสถานะคลัสเตอร์ Kubernetes?",
        "etcd stocke l'état cluster dans une base clé-valeur distribuée.":
          "etcd เก็บสถานะของคลัสเตอร์ไว้ในฐานข้อมูล key-value แบบกระจาย",
        "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?":
          "คุณเตรียมซ่อมบำรุงโหนดโดยย้าย/ไล่ Pods แอปออก คำสั่งใดเหมาะที่สุด?",
        "drain rend le nœud unschedulable et évacue les Pods non DaemonSet.":
          "drain ทำให้โหนด unschedulable และไล่ Pods ที่ไม่ใช่ DaemonSet ออกไป",
        "Quelle phrase décrit correctement 'cordon' vs 'drain' ?":
          "ข้อความใดอธิบาย 'cordon' กับ 'drain' ได้ถูกต้อง?",
        "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants.":
          "cordon กันไม่ให้มี Pod ใหม่ลงมา ส่วน drain เพิ่มการไล่ Pod ที่มีอยู่แล้วออก",
        "Quelle commande etcdctl réalise une sauvegarde snapshot ?":
          "คำสั่ง etcdctl ใดใช้ทำ snapshot backup?",
        "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis.":
          "ซับคอมมานด์ทางการคือ 'snapshot save' พร้อมพารามิเตอร์ TLS/endpoints ที่จำเป็น",
        "Quel composant décide sur quel nœud un Pod sera placé ?":
          "คอมโพเนนต์ใดตัดสินว่า Pod จะถูกวางบนโหนดใด?",
        "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible.":
          "scheduler ประเมินเงื่อนไขและทรัพยากรเพื่อเลือกโหนดเป้าหมาย",
        "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?":
          "ก่อนอัปเกรด control-plane คำสั่ง kubeadm ใดแสดงแผนอัปเกรด?",
        "'kubeadm upgrade plan' affiche versions disponibles et prérequis.":
          "'kubeadm upgrade plan' แสดงเวอร์ชันที่มีและข้อกำหนดก่อนอัปเกรด",

        // Networking
        "Quel type de Service expose un port fixe sur chaque nœud du cluster ?":
          "Service ชนิดใดเปิดพอร์ตคงที่บนทุกโหนดของคลัสเตอร์?",
        "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767).":
          "NodePort เปิดพอร์ตบนทุกโหนด (ช่วงค่าเริ่มต้น 30000-32767)",
        "Quel type de Service est créé par défaut si rien n'est précisé ?":
          "หากไม่ระบุ type จะสร้าง Service ชนิดใดโดยค่าเริ่มต้น?",
        "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster).":
          "Service ค่าเริ่มต้นคือ ClusterIP (ภายในคลัสเตอร์)",
        "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?":
          "คอมโพเนนต์ใดดูแลกฎเครือข่ายของ Service (iptables/ipvs) บนโหนด?",
        "kube-proxy traduit les Services en règles de forwarding vers les endpoints.":
          "kube-proxy แปลง Service เป็นกฎ forwarding ไปยัง endpoints",
        "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?":
          "อ็อบเจ็กต์ใดใช้จำกัดทราฟฟิก ingress/egress ระหว่าง Pods อย่างชัดเจน?",
        "NetworkPolicy applique des règles de filtrage réseau selon labels et ports.":
          "NetworkPolicy ใช้กฎกรองเครือข่ายตาม labels และ ports",
        "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?":
          "คอมโพเนนต์ DNS ภายในใดใช้ resolve ชื่อ Service (เช่น mysvc.myns.svc.cluster.local)?",
        "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes.":
          "CoreDNS คือ DNS เซิร์ฟเวอร์มาตรฐานของคลัสเตอร์ Kubernetes สมัยใหม่",
        "Quel est le rôle principal d'un Ingress dans Kubernetes ?":
          "บทบาทหลักของ Ingress ใน Kubernetes คืออะไร?",
        "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller.":
          "Ingress อธิบายเส้นทาง L7 (HTTP/HTTPS) ที่ถูกบังคับใช้โดย Ingress Controller",

        // Exam sim
        "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?":
          "คุณต้องสร้าง Deployment 'nginx-app' ด้วย nginx:1.11.10-alpine และ 3 replicas คำสั่งใดสร้าง YAML โดยไม่สร้างทรัพยากรจริง?",
        "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application.":
          "ใช้ '--dry-run=client -o yaml' เพื่อสร้าง manifest แล้วเพิ่ม replicas: 3 ก่อน apply",
        "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?":
          "หลัง rolling update nginx-app ไป 1.11.13-alpine คำสั่งใดกลับไปเวอร์ชันก่อนหน้า?",
        "'kubectl rollout undo' annule la dernière révision et restaure la précédente.":
          "'kubectl rollout undo' ยกเลิกรีวิชันล่าสุดและคืนค่าก่อนหน้า",
        "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?":
          "kubelet บน master ล่ม ลำดับคำสั่งใดกู้คืนบริการให้ถาวร?",
        "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot.":
          "kubelet เป็นบริการ systemd การ restart + enable ครอบคลุมทั้งกู้คืนทันทีและหลังรีบูต",
        "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?":
          "คุณต้องทำให้ 'ek8s-node-1' ใช้งานไม่ได้และให้ Pods ย้ายไปโหนดอื่น คำสั่งใดตรงกับงานนี้?",
        "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification.":
          "'drain' จะ cordon และไล่ Pods ออก เป็นการทำที่คาดหวังสำหรับการบำรุงรักษาพร้อมย้าย Pods",
        "Comment passer le deployment 'webserver' à 6 replicas ?":
          "จะปรับ deployment 'webserver' ให้เป็น 6 replicas ได้อย่างไร?",
        "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen.":
          "ทั้งสามวิธีใช้ได้ แต่ 'scale' ยังเร็วที่สุดในสถานการณ์สอบ",
        "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?":
          "สร้าง Pod busybox ที่รัน 'env' และบันทึกผลลัพธ์ลงไฟล์ คำสั่งใดถูกต้อง?",
        "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie.":
          "ด้วย 'run ... --restart=Never --rm -it -- env' คุณรัน env ใน Pod ชั่วคราวและ redirect output",
        "Quelle commande liste tous les Pods triés par nom ?":
          "คำสั่งใดแสดงรายการ Pods ทั้งหมดเรียงตามชื่อ?",
        "'--sort-by=.metadata.name' est la syntaxe kubectl attendue.":
          "'--sort-by=.metadata.name' คือไวยากรณ์ kubectl ที่ถูกต้อง",
        "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?":
          "สร้าง Pod nginx พร้อม label env=test ใน namespace engineering คำสั่งใดถูกต้อง?",
        "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard.":
          "'kubectl run ... --restart=Never --labels ... -n engineering' คือออปชันแบบ imperative มาตรฐาน",
        "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?":
          "สไนปเป็ตใดอธิบาย PV hostPath app-data ขนาด 2Gi แบบ ReadWriteMany ได้ถูกต้อง?",
        "Le PV doit contenir capacity, accessModes et hostPath dans spec.":
          "PV ต้องมี capacity, accessModes และ hostPath อยู่ภายใต้ spec",
        "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?":
          "หากไม่ใช้ 'kubectl describe' จะดูอิมเมจของ Pod nginx ได้อย่างไร?",
        "jsonpath sur .spec.containers[].image est la méthode précise et portable.":
          "การใช้ jsonpath ที่ .spec.containers[].image เป็นวิธีที่แม่นยำและพกพาได้",

        // Killer shell
        "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?":
          "Job ต้องรันงานรวม 3 ครั้ง โดยรันพร้อมกัน 2 Pods ต้องตั้งค่า YAML ฟิลด์ใด?",
        "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées.":
          "สำหรับ Job, 'completions' กำหนดจำนวนความสำเร็จรวม และ 'parallelism' กำหนดจำนวนที่รันพร้อมกัน",
        "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?":
          "จะกำหนด memory request 20Mi และ memory limit 50Mi ในคอนเทนเนอร์ได้อย่างไร?",
        "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits.":
          "ทรัพยากรถูกกำหนดใน spec.containers[].resources โดยมีส่วน requests และ limits",
        "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?":
          "ใน Pod ต้องประกาศ ServiceAccount 'neptune-sa-v2' ตรงไหน?",
        "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName.":
          "ServiceAccount ของ Pod ตั้งค่าที่ spec.serviceAccountName",
        "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?":
          "readinessProbe แบบ exec ใดตรวจว่าไฟล์ /tmp/ready มีอยู่?",
        "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès.":
          "probe แบบ exec รันคำสั่งในคอนเทนเนอร์; โค้ดคืนค่า 0 = สำเร็จ",
        "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?":
          "จะย้าย Pod จาก 'saturn' ไป 'neptune' วิธีใดถูกต้อง?",
        "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace.":
          "ไม่สามารถเปลี่ยน namespace ของ Pod ที่มีอยู่แล้วได้ ต้องสร้างใหม่ใน namespace ใหม่",
        "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :":
          "สร้าง ConfigMap 'cm-html' โดยกำหนดคีย์เป็น index.html จากไฟล์ในเครื่อง:",
        "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap.":
          "แฟลก '--from-file=<key>=<path>' ใช้กำหนดชื่อคีย์ใน ConfigMap",
        "Pattern sidecar logs : quel design est correct ?":
          "แพตเทิร์น sidecar logs: ดีไซน์ใดถูกต้อง?",
        "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte.":
          "แพตเทิร์น sidecar อาศัย volume ที่แชร์ร่วมกันระหว่างคอนเทนเนอร์แอปและคอนเทนเนอร์เก็บ log",
        "Où définir les InitContainers dans un Pod ?":
          "จะกำหนด InitContainers ใน Pod ที่ไหน?",
        "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers.":
          "initContainers ถูกประกาศใต้ spec.initContainers และรันก่อน spec.containers",
        "La commande kubectl expose sans --type crée par défaut quel Service ?":
          "คำสั่ง kubectl expose โดยไม่ระบุ --type จะสร้าง Service ชนิดใดเป็นค่าเริ่มต้น?",
        "Le type par défaut d'un Service est ClusterIP.":
          "ชนิดค่าเริ่มต้นของ Service คือ ClusterIP",
        "Un Service n'a aucun Endpoint. Cause la plus fréquente ?":
          "Service ไม่มี Endpoint สาเหตุที่พบบ่อยที่สุดคืออะไร?",
        "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides.":
          "ถ้า selector ไม่ตรงกับ labels ของ Pod จะไม่มี Pod ถูกผูก และ Endpoints จะว่าง",
        "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?":
          "แปลง Service จาก ClusterIP เป็น NodePort 30100 วิธีที่เชื่อถือได้คืออะไร?",
        "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort.":
          "วิธีง่ายคือแก้ manifest ของ Service เพื่อเปลี่ยน type และ nodePort",
        "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?":
          "ใน NetworkPolicy egress จะอนุญาตทราฟฟิกไปยัง Pods api หรือ DNS:53 ได้อย่างไร?",
        "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND.":
          "แยก egress หลายรายการจะได้ OR เชิงตรรกะ แต่รวมเงื่อนไขในรายการเดียวจะเป็น AND",

        // Options that were in FR
        "Namespace différent": "เนมสเปซต่างกัน",
        "Nom du Pod incorrect": "ชื่อ Pod ไม่ถูกต้อง",
        "Modes d'accès ou capacité incompatibles": "accessModes หรือความจุไม่เข้ากัน",
        "ImagePullPolicy erronée": "ImagePullPolicy ไม่ถูกต้อง",
        "Supprimé avec ses données": "ถูกลบพร้อมข้อมูล",
        "Toujours présent, données conservées": "ยังคงอยู่ และเก็บข้อมูลไว้",
        "Converti en ConfigMap": "ถูกแปลงเป็น ConfigMap",
        "Remis automatiquement en Available et vidé": "ถูกตั้งกลับเป็น Available และล้างข้อมูลอัตโนมัติ",
        "Pod Running mais non joignable": "Pod Running แต่ติดต่อไม่ได้",
        "Pod en CrashLoopBackOff": "Pod อยู่ใน CrashLoopBackOff",
        "Pods Pending avec évènement FailedScheduling": "Pods Pending พร้อมอีเวนต์ FailedScheduling",
        "Service en type NodePort": "Service ชนิด NodePort",
        "cordon redémarre kubelet, drain redémarre kube-proxy": "cordon รีสตาร์ท kubelet, drain รีสตาร์ท kube-proxy",
        "cordon bloque seulement le scheduling, drain bloque + évacue": "cordon บล็อกแค่การ scheduling, drain บล็อก + ไล่ Pods ออก",
        "cordon supprime le nœud, drain le recrée": "cordon ลบโหนด, drain สร้างใหม่",
        "Les deux font exactement la même chose": "ทั้งสองทำเหมือนกันทุกอย่าง",
        "Stocker des certificats secrets": "เก็บใบรับรองลับ",
        "Planifier les Pods": "ทำ scheduling ให้ Pods",
        "Router HTTP/HTTPS vers des Services": "กำหนดเส้นทาง HTTP/HTTPS ไปยัง Services",
        "Créer automatiquement des Nodes": "สร้าง Nodes อัตโนมัติ",
        "Toutes ces réponses sont valides": "ทุกคำตอบถูกต้อง",
        "Deux conteneurs partageant un volume, sidecar en tail -f": "สองคอนเทนเนอร์แชร์ volume, sidecar ทำ tail -f",
        "Un initContainer qui lit les logs en continu": "initContainer อ่าน logs ต่อเนื่อง",
        "Un seul conteneur avec deux commandes": "คอนเทนเนอร์เดียวสองคำสั่ง",
        "Deux règles egress séparées (OR logique)": "กฎ egress แยกสองรายการ (OR)",
        "Une seule règle combinant podSelector et ports": "กฎเดียวรวม podSelector และ ports",
        "Activer spec.dns=true": "เปิดใช้ spec.dns=true",
        "Aucune règle DNS nécessaire": "ไม่ต้องมีกฎ DNS",
        "Éditer le Service: spec.type=NodePort + nodePort:30100": "แก้ Service: spec.type=NodePort + nodePort:30100",
      },
      zh: {
        // Storage
        "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?":
          "你需要创建一个 2Gi 的 hostPath（'/srv/app-data'）持久卷。你首先要定义哪个资源？",
        "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer.":
          "PV 是表示集群可用存储的资源；随后再创建 PVC 来使用（绑定）它。",
        "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?":
          "PVC 的哪个字段用于指定动态 StorageClass？",
        "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique.":
          "字段 'spec.storageClassName' 指定将驱动动态制备的 StorageClass。",
        "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?":
          "PVC 处于 Pending，但存在空闲 PV。最可能的不匹配是什么？",
        "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles.":
          "PVC/PV 绑定会检查请求的容量以及兼容的 accessModes 等条件。",
        "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?":
          "你删除了一个绑定到 reclaimPolicy 为 'Retain' 的 PV 的 PVC。PV 会怎样？",
        "Avec Retain, le PV et ses données sont conservés pour traitement manuel.":
          "使用 Retain 时，PV 及其数据会保留，需手动处理。",
        "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?":
          "从 YAML 文件创建 PVC 的正确命令是哪一个？",
        "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource.":
          "标准声明式方式是使用 'kubectl apply -f ...' 创建或更新资源。",

        // Troubleshooting
        "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?":
          "在多容器 Pod 中，哪个命令可以查看容器 'api' 的日志？",
        "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'.":
          "对于多容器 Pod，需要用 '-c <name>' 明确指定容器。",
        "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?":
          "节点 NotReady。优先在节点上做哪项系统检查？",
        "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique.":
          "kubelet 发布节点状态。首先检查其 systemd 服务状态是合理的第一步。",
        "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?":
          "Pod 一直处于 Pending。哪个命令能最直接给出原因？",
        "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc.":
          "'describe pod' 的事件会显示 FailedScheduling、taints、CPU/内存不足等原因。",
        "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?":
          "查看集群事件时间线最合适的命令是哪一个？",
        "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident.":
          "按时间戳排序非常有助于还原事故发生的顺序。",
        "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?":
          "你要诊断节点的内存/磁盘压力，应使用哪个命令？",
        "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc.":
          "'describe node' 的 Conditions 会显示 MemoryPressure、DiskPressure、PIDPressure 等。",
        "Quel symptôme indique principalement un problème de planification (scheduler) ?":
          "哪个现象主要表明是调度（scheduler）问题？",
        "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes.":
          "FailedScheduling 指向调度约束或资源不足。",

        // Workloads
        "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?":
          "哪个命令可以在不造成整体中断的情况下更新 Deployment 镜像？",
        "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé.":
          "对 Deployment 使用 'set image' 会触发受控的滚动更新。",
        "Quelle commande annule la dernière révision d'un Deployment ?":
          "哪个命令用于回滚 Deployment 的上一版本？",
        "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment.":
          "'kubectl rollout undo' 会恢复 Deployment 记录的上一修订版本。",
        "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?":
          "你需要快速从 3 个副本变为 6 个副本，应使用哪个命令？",
        "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin.":
          "'kubectl scale ... --replicas' 是最直接、最明确的方法。",
        "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?":
          "在每个节点上运行 agent（日志/监控）适合用哪个控制器？",
        "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level.":
          "DaemonSet 保证每个符合条件的节点有一个 Pod，非常适合节点级 agent。",
        "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?":
          "生成 YAML 清单但不创建资源，正确的选项是哪一个？",
        "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster.":
          "'--dry-run=client -o yaml' 在本地生成清单，不会在集群中创建。",

        // Architecture
        "Quel composant est la source de vérité de l'état du cluster Kubernetes ?":
          "Kubernetes 集群状态的“真实来源”（source of truth）是哪个组件？",
        "etcd stocke l'état cluster dans une base clé-valeur distribuée.":
          "etcd 将集群状态存储在分布式键值数据库中。",
        "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?":
          "你准备对节点维护并驱逐应用 Pod。最合适的命令是哪一个？",
        "drain rend le nœud unschedulable et évacue les Pods non DaemonSet.":
          "drain 会将节点设为不可调度并驱逐非 DaemonSet 的 Pod。",
        "Quelle phrase décrit correctement 'cordon' vs 'drain' ?":
          "哪句话正确描述了 'cordon' 与 'drain' 的区别？",
        "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants.":
          "cordon 阻止新 Pod 调度到该节点；drain 在此基础上还会驱逐现有 Pod。",
        "Quelle commande etcdctl réalise une sauvegarde snapshot ?":
          "哪个 etcdctl 命令用于做 snapshot 备份？",
        "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis.":
          "官方子命令是 'snapshot save'，需带上必要的 TLS/endpoints 参数。",
        "Quel composant décide sur quel nœud un Pod sera placé ?":
          "哪个组件决定 Pod 会被放到哪个节点？",
        "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible.":
          "scheduler 会评估约束和资源来选择目标节点。",
        "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?":
          "升级 control-plane 前，哪个 kubeadm 命令会给出升级计划？",
        "'kubeadm upgrade plan' affiche versions disponibles et prérequis.":
          "'kubeadm upgrade plan' 会显示可用版本和前置条件。",

        // Networking
        "Quel type de Service expose un port fixe sur chaque nœud du cluster ?":
          "哪种 Service 类型会在每个节点上暴露固定端口？",
        "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767).":
          "NodePort 会在每个节点上打开端口（默认范围 30000-32767）。",
        "Quel type de Service est créé par défaut si rien n'est précisé ?":
          "未指定类型时默认创建哪种 Service？",
        "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster).":
          "Kubernetes Service 默认类型是 ClusterIP（集群内部）。",
        "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?":
          "哪个组件在节点上维护 Service 的网络规则（iptables/ipvs）？",
        "kube-proxy traduit les Services en règles de forwarding vers les endpoints.":
          "kube-proxy 将 Service 转换为转发到 endpoints 的规则。",
        "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?":
          "哪个对象可以显式限制 Pod 之间的 ingress/egress 流量？",
        "NetworkPolicy applique des règles de filtrage réseau selon labels et ports.":
          "NetworkPolicy 根据 labels 和 ports 应用网络过滤规则。",
        "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?":
          "哪个内部 DNS 组件解析 Service 名称（如 mysvc.myns.svc.cluster.local）？",
        "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes.":
          "CoreDNS 是现代 Kubernetes 集群的标准 DNS 服务器。",
        "Quel est le rôle principal d'un Ingress dans Kubernetes ?":
          "Ingress 在 Kubernetes 中的主要作用是什么？",
        "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller.":
          "Ingress 描述由 Ingress Controller 应用的 L7（HTTP/HTTPS）路由。",

        // Exam sim
        "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?":
          "你需要创建一个名为 'nginx-app' 的 Deployment（nginx:1.11.10-alpine，3 副本）。哪个命令可以生成 YAML 而不创建资源？",
        "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application.":
          "使用 '--dry-run=client -o yaml' 生成清单，然后在应用前添加 replicas: 3。",
        "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?":
          "将 nginx-app 滚动更新到 1.11.13-alpine 后，哪个命令回到上一版本？",
        "'kubectl rollout undo' annule la dernière révision et restaure la précédente.":
          "'kubectl rollout undo' 会取消最后一次修订并恢复上一修订。",
        "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?":
          "master 上的 kubelet 挂了。哪组步骤可以持久恢复该服务？",
        "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot.":
          "kubelet 是 systemd 服务。restart + enable 覆盖立即恢复以及重启后自动启动。",
        "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?":
          "你需要让 'ek8s-node-1' 不可用并重新调度 Pod。对应的命令是哪一个？",
        "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification.":
          "'drain' 会 cordon 并驱逐 Pod。这是维护时进行重调度的预期操作。",
        "Comment passer le deployment 'webserver' à 6 replicas ?":
          "如何将 'webserver' deployment 调整为 6 副本？",
        "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen.":
          "三种方法都可行；考试中 'scale' 依然最快。",
        "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?":
          "创建一个运行 'env' 的 busybox Pod 并把输出保存到文件。哪个命令是正确的？",
        "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie.":
          "使用 'run ... --restart=Never --rm -it -- env' 可在临时 Pod 中执行 env 并重定向输出。",
        "Quelle commande liste tous les Pods triés par nom ?":
          "哪个命令按名称排序列出所有 Pod？",
        "'--sort-by=.metadata.name' est la syntaxe kubectl attendue.":
          "'--sort-by=.metadata.name' 是正确的 kubectl 语法。",
        "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?":
          "在 engineering 命名空间创建带 env=test 标签的 nginx Pod。哪个命令是正确的？",
        "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard.":
          "'kubectl run ... --restart=Never --labels ... -n engineering' 是标准的命令式写法。",
        "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?":
          "哪个片段正确描述了 2Gi 的 hostPath app-data PV（ReadWriteMany）？",
        "Le PV doit contenir capacity, accessModes et hostPath dans spec.":
          "PV 的 spec 中应包含 capacity、accessModes 和 hostPath。",
        "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?":
          "不使用 'kubectl describe'，如何查看 nginx Pod 的镜像？",
        "jsonpath sur .spec.containers[].image est la méthode précise et portable.":
          "对 .spec.containers[].image 使用 jsonpath 是精确且通用的方法。",

        // Killer shell
        "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?":
          "一个 Job 需要总共完成 3 次执行，并行运行 2 个 Pod。应配置哪些 YAML 字段？",
        "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées.":
          "对 Job 而言，'completions' 指定期望成功次数总量，'parallelism' 指定并发执行数量。",
        "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?":
          "如何在容器上设置内存 request 为 20Mi、limit 为 50Mi？",
        "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits.":
          "资源在 spec.containers[].resources 下定义，包含 requests 与 limits。",
        "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?":
          "在 Pod 中应在哪里声明 ServiceAccount 'neptune-sa-v2'？",
        "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName.":
          "Pod 的 ServiceAccount 在 spec.serviceAccountName 处配置。",
        "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?":
          "哪个 exec readinessProbe 用于检查 /tmp/ready 文件是否存在？",
        "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès.":
          "exec 探针会在容器内执行命令；返回码 0 表示成功。",
        "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?":
          "要将 Pod 从 'saturn' 移到 'neptune'，哪个方法正确？",
        "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace.":
          "无法修改现有 Pod 的 namespace：必须在新 namespace 中重新创建资源。",
        "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :":
          "从本地文件创建 ConfigMap 'cm-html'，并指定键名为 index.html：",
        "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap.":
          "参数 '--from-file=<key>=<path>' 可在 ConfigMap 中固定键名。",
        "Pattern sidecar logs : quel design est correct ?":
          "sidecar 日志模式：哪个设计是正确的？",
        "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte.":
          "sidecar 模式依赖应用容器与采集容器共享同一个卷。",
        "Où définir les InitContainers dans un Pod ?":
          "在 Pod 的哪里定义 InitContainers？",
        "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers.":
          "initContainers 定义在 spec.initContainers 下，并在 spec.containers 之前运行。",
        "La commande kubectl expose sans --type crée par défaut quel Service ?":
          "kubectl expose 不带 --type 时默认创建哪种 Service？",
        "Le type par défaut d'un Service est ClusterIP.":
          "Service 的默认类型是 ClusterIP。",
        "Un Service n'a aucun Endpoint. Cause la plus fréquente ?":
          "Service 没有 Endpoints。最常见原因是什么？",
        "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides.":
          "如果 selector 与 Pod labels 不匹配，将不会关联 Pod，Endpoints 也会为空。",
        "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?":
          "将 ClusterIP Service 转为 NodePort 30100：可靠的方法是什么？",
        "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort.":
          "最简单的方法是编辑 Service 清单来修改 type 和 nodePort。",
        "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?":
          "在 NetworkPolicy 的 egress 中，如何允许到 api Pods 或 DNS:53 的流量？",
        "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND.":
          "分开的 egress 条目实现逻辑 OR；将约束合并在同一条目中相当于 AND。",

        // Options that were in FR
        "Namespace différent": "命名空间不同",
        "Nom du Pod incorrect": "Pod 名称错误",
        "Modes d'accès ou capacité incompatibles": "accessModes 或容量不兼容",
        "ImagePullPolicy erronée": "ImagePullPolicy 错误",
        "Supprimé avec ses données": "连同数据一起删除",
        "Toujours présent, données conservées": "仍然存在，数据保留",
        "Converti en ConfigMap": "转换为 ConfigMap",
        "Remis automatiquement en Available et vidé": "自动恢复为 Available 并清空",
        "Pod Running mais non joignable": "Pod 处于 Running 但不可达",
        "Pod en CrashLoopBackOff": "Pod 处于 CrashLoopBackOff",
        "Pods Pending avec évènement FailedScheduling": "Pod Pending 且出现 FailedScheduling 事件",
        "Service en type NodePort": "NodePort 类型的 Service",
        "cordon redémarre kubelet, drain redémarre kube-proxy": "cordon 重启 kubelet，drain 重启 kube-proxy",
        "cordon bloque seulement le scheduling, drain bloque + évacue": "cordon 仅阻止调度，drain 阻止并驱逐",
        "cordon supprime le nœud, drain le recrée": "cordon 删除节点，drain 重新创建",
        "Les deux font exactement la même chose": "两者完全一样",
        "Stocker des certificats secrets": "存储机密证书",
        "Planifier les Pods": "调度 Pod",
        "Router HTTP/HTTPS vers des Services": "将 HTTP/HTTPS 路由到 Services",
        "Créer automatiquement des Nodes": "自动创建 Nodes",
        "Toutes ces réponses sont valides": "以上答案都正确",
        "Deux conteneurs partageant un volume, sidecar en tail -f": "两个容器共享卷，sidecar 执行 tail -f",
        "Un initContainer qui lit les logs en continu": "一个持续读取日志的 initContainer",
        "Un seul conteneur avec deux commandes": "一个容器运行两个命令",
        "Deux règles egress séparées (OR logique)": "两条独立的 egress 规则（逻辑 OR）",
        "Une seule règle combinant podSelector et ports": "一条规则同时包含 podSelector 和 ports",
        "Activer spec.dns=true": "启用 spec.dns=true",
        "Aucune règle DNS nécessaire": "不需要 DNS 规则",
        "Éditer le Service: spec.type=NodePort + nodePort:30100": "编辑 Service：spec.type=NodePort + nodePort:30100",
      },
      ru: {
        // Storage
        "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?":
          "Тебе нужно создать Persistent Volume на 2Gi через hostPath '/srv/app-data'. Какой ресурс ты определишь первым?",
        "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer.":
          "PV — кластерный ресурс, представляющий доступное хранилище. Затем создают PVC, чтобы его использовать.",
        "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?":
          "Какое поле PVC позволяет указать динамический StorageClass?",
        "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique.":
          "Поле 'spec.storageClassName' указывает StorageClass, который будет управлять динамическим provision.",
        "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?":
          "PVC в Pending, хотя есть свободный PV. Какая несовместимость наиболее вероятна?",
        "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles.":
          "Привязка PVC/PV проверяет запрошенную ёмкость и совместимые accessModes.",
        "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?":
          "Ты удаляешь PVC, привязанный к PV с reclaimPolicy 'Retain'. Что произойдёт с PV?",
        "Avec Retain, le PV et ses données sont conservés pour traitement manuel.":
          "При Retain PV и данные сохраняются для ручной обработки.",
        "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?":
          "Какая команда корректна для создания PVC из YAML-файла?",
        "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource.":
          "Стандартный декларативный подход — 'kubectl apply -f ...' для создания или обновления ресурса.",

        // Troubleshooting
        "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?":
          "Какая команда покажет логи контейнера 'api' в Pod с несколькими контейнерами?",
        "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'.":
          "Для Pod с несколькими контейнерами нужно явно указать контейнер через '-c <имя>'.",
        "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?":
          "Нода в состоянии NotReady. Какая системная проверка приоритетна на ноде?",
        "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique.":
          "kubelet публикует состояние ноды. Проверка статуса systemd — логичный первый шаг.",
        "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?":
          "Pod остаётся Pending. Какая команда даёт наиболее прямую причину?",
        "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc.":
          "События в 'describe pod' показывают FailedScheduling, taints, нехватку CPU/памяти и т. п.",
        "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?":
          "Какая команда лучше всего подходит, чтобы увидеть хронологию событий кластера?",
        "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident.":
          "Сортировка по timestamp полезна для восстановления последовательности инцидента.",
        "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?":
          "Нужно диагностировать давление по памяти/диску на ноде. Какую команду использовать?",
        "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc.":
          "Раздел Conditions в 'describe node' показывает MemoryPressure, DiskPressure, PIDPressure и т. д.",
        "Quel symptôme indique principalement un problème de planification (scheduler) ?":
          "Какой симптом в основном указывает на проблему планирования (scheduler)?",
        "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes.":
          "FailedScheduling указывает на ограничения scheduling или недостаток ресурсов.",

        // Workloads
        "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?":
          "Какая команда обновляет образ Deployment без глобального простоя?",
        "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé.":
          "Команда 'set image' для Deployment запускает контролируемый rolling update.",
        "Quelle commande annule la dernière révision d'un Deployment ?":
          "Какая команда откатывает последнюю ревизию Deployment?",
        "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment.":
          "'kubectl rollout undo' восстанавливает предыдущую ревизию, сохранённую Deployment.",
        "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?":
          "Нужно быстро перейти с 3 на 6 реплик. Какую команду использовать?",
        "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin.":
          "'kubectl scale ... --replicas' — самый прямой и явный способ для этой задачи.",
        "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?":
          "Какой контроллер подходит для запуска агента на каждой ноде (логи, мониторинг)?",
        "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level.":
          "DaemonSet гарантирует Pod на каждой подходящей ноде, идеально для node-level агентов.",
        "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?":
          "Какая опция корректна, чтобы сгенерировать YAML-манифест без создания ресурса?",
        "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster.":
          "'--dry-run=client -o yaml' генерирует манифест локально без создания в кластере.",

        // Architecture
        "Quel composant est la source de vérité de l'état du cluster Kubernetes ?":
          "Какой компонент является источником истины (source of truth) состояния кластера Kubernetes?",
        "etcd stocke l'état cluster dans une base clé-valeur distribuée.":
          "etcd хранит состояние кластера в распределённой key-value базе.",
        "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?":
          "Ты готовишь обслуживание ноды, эвакуируя application Pods. Какая команда наиболее подходящая?",
        "drain rend le nœud unschedulable et évacue les Pods non DaemonSet.":
          "drain делает ноду unschedulable и эвакуирует Pods, кроме DaemonSet.",
        "Quelle phrase décrit correctement 'cordon' vs 'drain' ?":
          "Какая фраза правильно описывает 'cordon' и 'drain'?",
        "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants.":
          "cordon блокирует новые Pods, а drain дополнительно эвакуирует существующие Pods.",
        "Quelle commande etcdctl réalise une sauvegarde snapshot ?":
          "Какая команда etcdctl делает snapshot backup?",
        "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis.":
          "Официальная подкоманда — 'snapshot save' с необходимыми параметрами TLS/endpoints.",
        "Quel composant décide sur quel nœud un Pod sera placé ?":
          "Какой компонент решает, на какой ноде будет размещён Pod?",
        "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible.":
          "Scheduler оценивает ограничения и ресурсы, чтобы выбрать целевую ноду.",
        "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?":
          "Перед апгрейдом control-plane какая команда kubeadm показывает план upgrade?",
        "'kubeadm upgrade plan' affiche versions disponibles et prérequis.":
          "'kubeadm upgrade plan' показывает доступные версии и требования.",

        // Networking
        "Quel type de Service expose un port fixe sur chaque nœud du cluster ?":
          "Какой тип Service открывает фиксированный порт на каждой ноде кластера?",
        "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767).":
          "NodePort открывает порт на каждой ноде (по умолчанию диапазон 30000-32767).",
        "Quel type de Service est créé par défaut si rien n'est précisé ?":
          "Какой тип Service создаётся по умолчанию, если ничего не указано?",
        "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster).":
          "Тип Service по умолчанию — ClusterIP (внутри кластера).",
        "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?":
          "Какой компонент поддерживает сетевые правила Service (iptables/ipvs) на нодах?",
        "kube-proxy traduit les Services en règles de forwarding vers les endpoints.":
          "kube-proxy переводит Services в правила forwarding к endpoints.",
        "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?":
          "Какой объект явно ограничивает ingress/egress трафик между Pods?",
        "NetworkPolicy applique des règles de filtrage réseau selon labels et ports.":
          "NetworkPolicy применяет правила фильтрации по labels и ports.",
        "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?":
          "Какой внутренний DNS-компонент резолвит имена Service (например, mysvc.myns.svc.cluster.local)?",
        "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes.":
          "CoreDNS — стандартный DNS-сервер современных кластеров Kubernetes.",
        "Quel est le rôle principal d'un Ingress dans Kubernetes ?":
          "Какова основная роль Ingress в Kubernetes?",
        "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller.":
          "Ingress описывает L7 (HTTP/HTTPS) маршруты, применяемые Ingress Controller.",

        // Exam sim + Killer shell (keep concise but translated)
        "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?":
          "Нужно создать Deployment 'nginx-app' (nginx:1.11.10-alpine) с 3 репликами. Какая команда сгенерирует YAML без создания ресурса?",
        "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application.":
          "Используй '--dry-run=client -o yaml' для генерации манифеста, затем добавь replicas: 3 перед apply.",
        "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?":
          "После rolling update nginx-app до 1.11.13-alpine какая команда вернёт предыдущую версию?",
        "'kubectl rollout undo' annule la dernière révision et restaure la précédente.":
          "'kubectl rollout undo' отменяет последнюю ревизию и восстанавливает предыдущую.",
        "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?":
          "kubelet на master упал. Какая последовательность устойчиво восстановит сервис?",
        "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot.":
          "kubelet — это systemd-сервис. Restart + enable обеспечивает восстановление сразу и после перезагрузки.",
        "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?":
          "Нужно сделать 'ek8s-node-1' недоступной и переселить Pods. Какая команда подходит?",
        "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification.":
          "'drain' делает cordon и эвакуирует Pods — ожидаемое действие при обслуживании с перепланированием.",
        "Comment passer le deployment 'webserver' à 6 replicas ?":
          "Как изменить deployment 'webserver' на 6 реплик?",
        "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen.":
          "Все три метода работают; 'scale' самый быстрый на экзамене.",
        "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?":
          "Создать Pod busybox, выполнить 'env' и сохранить вывод в файл. Какая команда корректна?",
        "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie.":
          "С 'run ... --restart=Never --rm -it -- env' ты выполняешь env в временном Pod и перенаправляешь вывод.",
        "Quelle commande liste tous les Pods triés par nom ?":
          "Какая команда выводит все Pods, отсортированные по имени?",
        "'--sort-by=.metadata.name' est la syntaxe kubectl attendue.":
          "'--sort-by=.metadata.name' — ожидаемый синтаксис kubectl.",
        "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?":
          "Создать Pod nginx с label env=test в namespace engineering. Какая команда корректна?",
        "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard.":
          "'kubectl run ... --restart=Never --labels ... -n engineering' — стандартная imperative опция.",
        "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?":
          "Какой фрагмент корректно описывает PV hostPath app-data на 2Gi с ReadWriteMany?",
        "Le PV doit contenir capacity, accessModes et hostPath dans spec.":
          "PV должен содержать capacity, accessModes и hostPath в spec.",
        "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?":
          "Без 'kubectl describe' как показать image Pod nginx?",
        "jsonpath sur .spec.containers[].image est la méthode précise et portable.":
          "jsonpath по .spec.containers[].image — точный и переносимый метод.",

        "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?":
          "Job должен выполнить задачу всего 3 раза, с 2 Pods параллельно. Какие поля YAML настроить?",
        "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées.":
          "Для Job 'completions' задаёт общее число успешных завершений, а 'parallelism' — число параллельных запусков.",
        "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?":
          "Как задать memory request 20Mi и memory limit 50Mi для контейнера?",
        "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits.":
          "Ресурсы задаются в spec.containers[].resources в секциях requests и limits.",
        "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?":
          "Где в Pod указать ServiceAccount 'neptune-sa-v2'?",
        "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName.":
          "ServiceAccount Pod настраивается через spec.serviceAccountName.",
        "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?":
          "Какая exec readinessProbe проверяет, что существует файл /tmp/ready?",
        "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès.":
          "exec probe выполняет команду в контейнере; код 0 = успех.",
        "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?":
          "Чтобы перенести Pod из 'saturn' в 'neptune', какой подход верный?",
        "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace.":
          "Нельзя изменить namespace существующего Pod: нужно пересоздать ресурс в новом namespace.",
        "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :":
          "Создать ConfigMap 'cm-html' с явным ключом index.html из локального файла:",
        "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap.":
          "Флаг '--from-file=<key>=<path>' позволяет задать имя ключа в ConfigMap.",
        "Pattern sidecar logs : quel design est correct ?":
          "Паттерн sidecar logs: какой дизайн правильный?",
        "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte.":
          "Паттерн sidecar основан на общем томе между приложением и контейнером-сборщиком.",
        "Où définir les InitContainers dans un Pod ?":
          "Где в Pod определяются InitContainers?",
        "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers.":
          "initContainers объявляются в spec.initContainers и выполняются до spec.containers.",
        "La commande kubectl expose sans --type crée par défaut quel Service ?":
          "Команда kubectl expose без --type создаёт какой Service по умолчанию?",
        "Le type par défaut d'un Service est ClusterIP.":
          "Тип Service по умолчанию — ClusterIP.",
        "Un Service n'a aucun Endpoint. Cause la plus fréquente ?":
          "У Service нет Endpoints. Самая частая причина?",
        "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides.":
          "Без совпадения selector/labels ни один Pod не будет привязан, Endpoints останутся пустыми.",
        "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?":
          "Преобразовать Service ClusterIP в NodePort 30100: надёжный способ?",
        "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort.":
          "Проще всего отредактировать манифест Service, изменив type и nodePort.",
        "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?":
          "В NetworkPolicy egress как разрешить трафик к Pods api ИЛИ DNS:53?",
        "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND.":
          "Отдельные egress-entries дают логическое OR. Объединение ограничений в одном entry даёт AND.",

        // Options
        "Namespace différent": "Другой namespace",
        "Nom du Pod incorrect": "Неверное имя Pod",
        "Modes d'accès ou capacité incompatibles": "Несовместимые accessModes или ёмкость",
        "ImagePullPolicy erronée": "Неверный ImagePullPolicy",
        "Supprimé avec ses données": "Удалён вместе с данными",
        "Toujours présent, données conservées": "Остаётся, данные сохранены",
        "Converti en ConfigMap": "Преобразован в ConfigMap",
        "Remis automatiquement en Available et vidé": "Автоматически возвращён в Available и очищен",
        "Pod Running mais non joignable": "Pod Running, но недоступен",
        "Pod en CrashLoopBackOff": "Pod в CrashLoopBackOff",
        "Pods Pending avec évènement FailedScheduling": "Pods Pending с событием FailedScheduling",
        "Service en type NodePort": "Service типа NodePort",
        "cordon redémarre kubelet, drain redémarre kube-proxy": "cordon перезапускает kubelet, drain перезапускает kube-proxy",
        "cordon bloque seulement le scheduling, drain bloque + évacue": "cordon блокирует только scheduling, drain блокирует + эвакуирует",
        "cordon supprime le nœud, drain le recrée": "cordon удаляет ноду, drain её пересоздаёт",
        "Les deux font exactement la même chose": "Оба делают ровно одно и то же",
        "Stocker des certificats secrets": "Хранить секретные сертификаты",
        "Planifier les Pods": "Планировать Pods",
        "Router HTTP/HTTPS vers des Services": "Маршрутизировать HTTP/HTTPS к Services",
        "Créer automatiquement des Nodes": "Автоматически создавать Nodes",
        "Toutes ces réponses sont valides": "Все ответы верны",
        "Deux conteneurs partageant un volume, sidecar en tail -f": "Два контейнера с общим томом, sidecar делает tail -f",
        "Un initContainer qui lit les logs en continu": "initContainer, который читает логи непрерывно",
        "Un seul conteneur avec deux commandes": "Один контейнер с двумя командами",
        "Deux règles egress séparées (OR logique)": "Две отдельные egress-правила (логическое OR)",
        "Une seule règle combinant podSelector et ports": "Одно правило, комбинирующее podSelector и ports",
        "Activer spec.dns=true": "Включить spec.dns=true",
        "Aucune règle DNS nécessaire": "DNS-правило не нужно",
        "Éditer le Service: spec.type=NodePort + nodePort:30100": "Отредактировать Service: spec.type=NodePort + nodePort:30100",
      },
      ar: {
        // Storage
        "Tu dois créer un volume persistant de 2Gi en hostPath '/srv/app-data'. Quelle ressource définis-tu d'abord ?":
          "يجب أن تُنشئ Volume دائم بحجم 2Gi باستخدام hostPath '/srv/app-data'. أي مورد تُعرّفه أولاً؟",
        "Le PV est la ressource cluster représentant le stockage disponible. Le PVC vient ensuite pour le consommer.":
          "الـ PV هو مورد على مستوى الكلاستر يمثل التخزين المتاح، ثم يأتي الـ PVC لاستهلاكه.",
        "Quel champ d'un PVC permet de cibler une classe de stockage dynamique ?":
          "أي حقل في PVC يسمح بتحديد StorageClass ديناميكية؟",
        "Le champ 'spec.storageClassName' indique la StorageClass qui pilotera le provisionnement dynamique.":
          "الحقل 'spec.storageClassName' يحدد StorageClass التي ستتحكم في الـ provisioning الديناميكي.",
        "Un PVC est en Pending alors qu'un PV libre existe. Quelle incompatibilité est la plus probable ?":
          "PVC في حالة Pending رغم وجود PV متاح. ما عدم التوافق الأكثر احتمالاً؟",
        "Le binding PVC/PV vérifie notamment la capacité demandée et les accessModes compatibles.":
          "ربط PVC/PV يتحقق من السعة المطلوبة وأنماط الوصول المتوافقة (accessModes).",
        "Tu supprimes un PVC lié à un PV avec reclaimPolicy 'Retain'. Que devient le PV ?":
          "قمت بحذف PVC مرتبط بـ PV بسياسة reclaimPolicy 'Retain'. ماذا يحدث للـ PV؟",
        "Avec Retain, le PV et ses données sont conservés pour traitement manuel.":
          "مع Retain يتم الاحتفاظ بالـ PV وبياناته للتعامل اليدوي.",
        "Quelle commande est correcte pour créer un PVC à partir d'un fichier YAML ?":
          "أي أمر صحيح لإنشاء PVC من ملف YAML؟",
        "L'approche déclarative standard est 'kubectl apply -f ...' pour créer ou mettre à jour la ressource.":
          "النهج التصريحي القياسي هو 'kubectl apply -f ...' لإنشاء المورد أو تحديثه.",

        // Troubleshooting
        "Quelle commande affichera les logs du conteneur 'api' dans un Pod multi-conteneurs ?":
          "أي أمر سيعرض سجلات الحاوية 'api' داخل Pod متعدد الحاويات؟",
        "Pour un Pod multi-conteneurs, on cible explicitement le conteneur avec '-c <nom>'.":
          "في Pod متعدد الحاويات يجب تحديد الحاوية صراحةً باستخدام '-c <name>'.",
        "Un nœud est NotReady. Quelle vérification système est prioritaire sur le nœud ?":
          "هناك Node بحالة NotReady. ما الفحص النظامي الأولوي على الـ Node؟",
        "Le kubelet publie l'état du nœud. Vérifier son statut systemd est la première étape logique.":
          "kubelet ينشر حالة الـ Node. التحقق من حالة خدمة systemd هو الخطوة الأولى المنطقية.",
        "Un Pod reste Pending. Quelle commande donne la cause la plus directe ?":
          "Pod يبقى في حالة Pending. أي أمر يعطي السبب الأكثر مباشرة؟",
        "Les événements de 'describe pod' indiquent FailedScheduling, taints, manque CPU/mémoire, etc.":
          "أحداث 'describe pod' تُظهر FailedScheduling و taints ونقص CPU/الذاكرة وغيرها.",
        "Quelle commande est la plus adaptée pour voir la chronologie des événements du cluster ?":
          "أي أمر هو الأنسب لرؤية التسلسل الزمني لأحداث الكلاستر؟",
        "Le tri par timestamp est très utile pour reconstruire la séquence d'un incident.":
          "الفرز حسب timestamp مفيد جدًا لإعادة بناء تسلسل الحادث.",
        "Tu veux diagnostiquer pressions mémoire/disque sur un nœud. Quelle commande utiliser ?":
          "تريد تشخيص ضغط الذاكرة/القرص على Node. أي أمر تستخدم؟",
        "La section Conditions de 'describe node' montre MemoryPressure, DiskPressure, PIDPressure, etc.":
          "قسم Conditions في 'describe node' يعرض MemoryPressure و DiskPressure و PIDPressure وغيرها.",
        "Quel symptôme indique principalement un problème de planification (scheduler) ?":
          "أي عرض يدل غالبًا على مشكلة في الجدولة (scheduler)؟",
        "FailedScheduling pointe vers des contraintes de scheduling ou des ressources insuffisantes.":
          "FailedScheduling يشير إلى قيود في الجدولة أو نقص في الموارد.",

        // Workloads
        "Quelle commande met à jour l'image d'un Deployment sans interruption globale ?":
          "أي أمر يحدّث صورة Deployment دون انقطاع شامل؟",
        "La commande 'set image' sur un Deployment déclenche un rolling update contrôlé.":
          "أمر 'set image' على Deployment يُطلق rolling update مُتحكَّم به.",
        "Quelle commande annule la dernière révision d'un Deployment ?":
          "أي أمر يُرجع Deployment إلى المراجعة السابقة (rollback)؟",
        "'kubectl rollout undo' restaure la révision précédente enregistrée par le Deployment.":
          "'kubectl rollout undo' يستعيد المراجعة السابقة المسجلة بواسطة Deployment.",
        "Tu dois passer rapidement de 3 à 6 replicas. Quelle commande utiliser ?":
          "تحتاج الانتقال سريعًا من 3 إلى 6 replicas. أي أمر تستخدم؟",
        "'kubectl scale ... --replicas' est la méthode directe et explicite pour ce besoin.":
          "'kubectl scale ... --replicas' هي الطريقة المباشرة والواضحة لهذه الحاجة.",
        "Quel contrôleur est adapté pour exécuter un agent sur chaque nœud (logs, monitoring) ?":
          "أي Controller مناسب لتشغيل Agent على كل Node (logs/monitoring)؟",
        "DaemonSet garantit un Pod par nœud éligible, idéal pour les agents node-level.":
          "DaemonSet يضمن Pod لكل Node مؤهل، وهو مثالي لوكلاء node-level.",
        "Quelle option est correcte pour générer un manifeste YAML sans créer la ressource ?":
          "أي خيار صحيح لتوليد YAML دون إنشاء المورد؟",
        "'--dry-run=client -o yaml' génère le manifeste localement sans persistance en cluster.":
          "'--dry-run=client -o yaml' يولد الـ manifest محليًا دون إنشائه في الكلاستر.",

        // Architecture
        "Quel composant est la source de vérité de l'état du cluster Kubernetes ?":
          "أي مكوّن هو مصدر الحقيقة (source of truth) لحالة كلاستر Kubernetes؟",
        "etcd stocke l'état cluster dans une base clé-valeur distribuée.":
          "etcd يخزن حالة الكلاستر في قاعدة بيانات موزعة من نوع key-value.",
        "Tu prépares une maintenance de nœud en évacuant les Pods applicatifs. Quelle commande est la plus adaptée ?":
          "تجهز لصيانة Node عبر إخلاء Pods التطبيق. أي أمر هو الأنسب؟",
        "drain rend le nœud unschedulable et évacue les Pods non DaemonSet.":
          "drain يجعل الـ Node غير قابل للجدولة ويُخلي Pods غير التابعة لـ DaemonSet.",
        "Quelle phrase décrit correctement 'cordon' vs 'drain' ?":
          "أي عبارة تصف 'cordon' مقابل 'drain' بشكل صحيح؟",
        "cordon empêche les nouveaux Pods, drain ajoute l'évacuation des Pods existants.":
          "cordon يمنع Pods الجديدة، و drain يضيف إخلاء Pods الموجودة.",
        "Quelle commande etcdctl réalise une sauvegarde snapshot ?":
          "أي أمر etcdctl يقوم بأخذ snapshot backup؟",
        "La sous-commande officielle est 'snapshot save' avec les paramètres TLS/endpoints requis.":
          "الأمر الفرعي الرسمي هو 'snapshot save' مع معلمات TLS/endpoints المطلوبة.",
        "Quel composant décide sur quel nœud un Pod sera placé ?":
          "أي مكوّن يقرر على أي Node سيتم وضع Pod؟",
        "Le scheduler évalue contraintes et ressources pour sélectionner le nœud cible.":
          "scheduler يقيّم القيود والموارد لاختيار الـ Node الهدف.",
        "Avant une montée de version control-plane, quelle commande kubeadm donne le plan d'upgrade ?":
          "قبل ترقية control-plane، أي أمر kubeadm يعرض خطة الترقية؟",
        "'kubeadm upgrade plan' affiche versions disponibles et prérequis.":
          "'kubeadm upgrade plan' يعرض الإصدارات المتاحة والمتطلبات.",

        // Networking
        "Quel type de Service expose un port fixe sur chaque nœud du cluster ?":
          "أي نوع Service يفتح منفذًا ثابتًا على كل Node في الكلاستر؟",
        "NodePort ouvre un port sur chaque nœud (plage par défaut 30000-32767).":
          "NodePort يفتح منفذًا على كل Node (النطاق الافتراضي 30000-32767).",
        "Quel type de Service est créé par défaut si rien n'est précisé ?":
          "ما نوع Service الافتراضي إذا لم يتم تحديده؟",
        "Le type par défaut d'un Service Kubernetes est ClusterIP (interne au cluster).":
          "النوع الافتراضي لخدمة Kubernetes هو ClusterIP (داخلي).",
        "Quel composant maintient les règles réseau des Services (iptables/ipvs) sur les nœuds ?":
          "أي مكوّن يحافظ على قواعد الشبكة للخدمات (iptables/ipvs) على الـ Nodes؟",
        "kube-proxy traduit les Services en règles de forwarding vers les endpoints.":
          "kube-proxy يحول Services إلى قواعد forwarding نحو endpoints.",
        "Quel objet permet de limiter explicitement le trafic ingress/egress entre Pods ?":
          "أي كائن يحد صراحةً من حركة ingress/egress بين Pods؟",
        "NetworkPolicy applique des règles de filtrage réseau selon labels et ports.":
          "NetworkPolicy تطبق قواعد فلترة الشبكة بحسب labels والمنافذ.",
        "Quel composant DNS interne résout les noms de Services (ex: mysvc.myns.svc.cluster.local) ?":
          "أي مكوّن DNS داخلي يحل أسماء Services (مثل mysvc.myns.svc.cluster.local)؟",
        "CoreDNS est le serveur DNS standard des clusters Kubernetes modernes.":
          "CoreDNS هو خادم DNS القياسي في كلاسترات Kubernetes الحديثة.",
        "Quel est le rôle principal d'un Ingress dans Kubernetes ?":
          "ما الدور الأساسي لـ Ingress في Kubernetes؟",
        "Ingress décrit des routes L7 (HTTP/HTTPS) appliquées par un Ingress Controller.":
          "Ingress يصف مسارات L7 (HTTP/HTTPS) التي يطبقها Ingress Controller.",

        // Exam sim + Killer shell
        "Tu dois créer un Deployment 'nginx-app' avec nginx:1.11.10-alpine et 3 replicas. Quelle commande génère un YAML sans créer la ressource ?":
          "يجب إنشاء Deployment 'nginx-app' بـ nginx:1.11.10-alpine و 3 replicas. أي أمر يولد YAML دون إنشاء المورد؟",
        "Utilise '--dry-run=client -o yaml' pour générer le manifeste, puis ajoute replicas: 3 avant application.":
          "استخدم '--dry-run=client -o yaml' لتوليد الـ manifest ثم أضف replicas: 3 قبل apply.",
        "Après un rolling update de nginx-app vers 1.11.13-alpine, quelle commande revient à la version précédente ?":
          "بعد rolling update لـ nginx-app إلى 1.11.13-alpine، أي أمر يرجع للإصدار السابق؟",
        "'kubectl rollout undo' annule la dernière révision et restaure la précédente.":
          "'kubectl rollout undo' يلغي آخر مراجعة ويستعيد السابقة.",
        "Le kubelet du master est tombé. Quelle séquence restaure durablement le service ?":
          "kubelet على master تعطل. ما التسلسل الذي يعيد الخدمة بشكل دائم؟",
        "Le kubelet est un service systemd. Restart + enable couvre la restauration immédiate et au reboot.":
          "kubelet خدمة systemd. Restart + enable يغطي الاستعادة الفورية وبعد إعادة التشغيل.",
        "Tu dois rendre 'ek8s-node-1' indisponible et replanifier les Pods. Quelle commande correspond ?":
          "تحتاج جعل 'ek8s-node-1' غير متاح وإعادة جدولة Pods. أي أمر يطابق ذلك؟",
        "'drain' cordonne + évacue les Pods. C'est l'action attendue pour maintenance avec replanification.":
          "'drain' يقوم بـ cordon وإخلاء Pods. هذا الإجراء المتوقع للصيانة مع إعادة الجدولة.",
        "Comment passer le deployment 'webserver' à 6 replicas ?":
          "كيف تضبط deployment 'webserver' إلى 6 replicas؟",
        "Les trois méthodes fonctionnent ; 'scale' reste la plus rapide en examen.":
          "الطرق الثلاث تعمل؛ لكن 'scale' تبقى الأسرع في الامتحان.",
        "Créer un Pod busybox qui exécute 'env' et sauvegarder la sortie dans un fichier. Quelle commande est correcte ?":
          "إنشاء Pod busybox ينفذ 'env' وحفظ الناتج في ملف. أي أمر صحيح؟",
        "Avec 'run ... --restart=Never --rm -it -- env', tu exécutes env dans un Pod éphémère et rediriges la sortie.":
          "باستخدام 'run ... --restart=Never --rm -it -- env' تنفذ env داخل Pod مؤقت وتعيد توجيه الناتج.",
        "Quelle commande liste tous les Pods triés par nom ?":
          "أي أمر يسرد جميع Pods مرتبة حسب الاسم؟",
        "'--sort-by=.metadata.name' est la syntaxe kubectl attendue.":
          "'--sort-by=.metadata.name' هي صيغة kubectl المتوقعة.",
        "Créer un Pod nginx avec le label env=test dans le namespace engineering. Quelle commande est correcte ?":
          "إنشاء Pod nginx مع label env=test في namespace engineering. أي أمر صحيح؟",
        "'kubectl run ... --restart=Never --labels ... -n engineering' est l'option impérative standard.":
          "'kubectl run ... --restart=Never --labels ... -n engineering' هو الخيار imperative القياسي.",
        "Quel extrait décrit correctement un PV hostPath app-data de 2Gi en ReadWriteMany ?":
          "أي مقطع يصف بشكل صحيح PV hostPath app-data بحجم 2Gi وبوضع ReadWriteMany؟",
        "Le PV doit contenir capacity, accessModes et hostPath dans spec.":
          "يجب أن يحتوي PV على capacity و accessModes و hostPath داخل spec.",
        "Sans 'kubectl describe', comment afficher l'image d'un Pod nginx ?":
          "بدون 'kubectl describe' كيف تعرض صورة (image) Pod nginx؟",
        "jsonpath sur .spec.containers[].image est la méthode précise et portable.":
          "استخدام jsonpath على .spec.containers[].image هو الأسلوب الدقيق والقابل للنقل.",

        "Un Job doit exécuter une tâche 3 fois au total, avec 2 Pods en parallèle. Quels champs YAML configurer ?":
          "يجب أن ينفذ Job المهمة 3 مرات إجمالاً مع تشغيل 2 Pods بالتوازي. أي حقول YAML تُضبط؟",
        "Pour un Job, 'completions' fixe le nombre total de succès attendus et 'parallelism' le nombre d'exécutions simultanées.":
          "في Job، 'completions' تحدد عدد النجاحات الإجمالي و 'parallelism' عدد التنفيذات المتزامنة.",
        "Comment définir request mémoire 20Mi et limit mémoire 50Mi sur un conteneur ?":
          "كيف تحدد طلب الذاكرة 20Mi وحد الذاكرة 50Mi على حاوية؟",
        "Les ressources se définissent sous spec.containers[].resources avec sections requests et limits.":
          "يتم تعريف الموارد تحت spec.containers[].resources ضمن requests و limits.",
        "Dans un Pod, où déclarer le ServiceAccount 'neptune-sa-v2' ?":
          "في Pod، أين تُعرّف ServiceAccount 'neptune-sa-v2'؟",
        "Le ServiceAccount d'un Pod se configure au niveau spec.serviceAccountName.":
          "يتم ضبط ServiceAccount للـ Pod عبر spec.serviceAccountName.",
        "Quelle readinessProbe exec vérifie qu'un fichier /tmp/ready existe ?":
          "أي readinessProbe exec يتحقق من وجود ملف /tmp/ready؟",
        "Une probe exec exécute une commande dans le conteneur ; code retour 0 = succès.":
          "probe exec تنفذ أمرًا داخل الحاوية؛ كود 0 يعني نجاح.",
        "Pour déplacer un Pod de 'saturn' vers 'neptune', quelle approche est correcte ?":
          "لنقل Pod من 'saturn' إلى 'neptune'، ما النهج الصحيح؟",
        "On ne peut pas changer le namespace d'un Pod existant : il faut recréer la ressource dans le nouveau namespace.":
          "لا يمكن تغيير namespace لـ Pod موجود؛ يجب إعادة إنشاء المورد في namespace جديد.",
        "Créer un ConfigMap 'cm-html' avec une clé explicite index.html depuis un fichier local :":
          "إنشاء ConfigMap 'cm-html' بمفتاح صريح index.html من ملف محلي:",
        "Le flag '--from-file=<key>=<path>' permet de fixer le nom de clé dans le ConfigMap.":
          "الخيار '--from-file=<key>=<path>' يسمح بتحديد اسم المفتاح في ConfigMap.",
        "Pattern sidecar logs : quel design est correct ?":
          "نمط sidecar logs: أي تصميم صحيح؟",
        "Le pattern sidecar repose sur un volume partagé entre conteneur applicatif et conteneur de collecte.":
          "نمط sidecar يعتمد على Volume مشترك بين حاوية التطبيق وحاوية التجميع.",
        "Où définir les InitContainers dans un Pod ?":
          "أين يتم تعريف InitContainers في Pod؟",
        "Les initContainers sont déclarés sous spec.initContainers et s'exécutent avant spec.containers.":
          "تُعرّف initContainers تحت spec.initContainers وتعمل قبل spec.containers.",
        "La commande kubectl expose sans --type crée par défaut quel Service ?":
          "أمر kubectl expose بدون --type ينشئ أي Service افتراضيًا؟",
        "Le type par défaut d'un Service est ClusterIP.":
          "النوع الافتراضي لـ Service هو ClusterIP.",
        "Un Service n'a aucun Endpoint. Cause la plus fréquente ?":
          "Service لا يملك Endpoints. ما السبب الأكثر شيوعًا؟",
        "Sans correspondance selector/labels, aucun Pod n'est associé et les Endpoints restent vides.":
          "بدون تطابق selector/labels لن يتم ربط أي Pod وستبقى Endpoints فارغة.",
        "Convertir un Service ClusterIP en NodePort 30100 : méthode fiable ?":
          "تحويل Service من ClusterIP إلى NodePort 30100: ما الطريقة الموثوقة؟",
        "La voie simple est d'éditer le manifeste du Service pour modifier type et nodePort.":
          "الطريقة الأسهل هي تعديل manifest الخاص بالـ Service لتغيير type و nodePort.",
        "Dans une NetworkPolicy egress, comment autoriser trafic vers Pods api OU DNS:53 ?":
          "في NetworkPolicy egress، كيف تسمح بالمرور إلى Pods api أو DNS:53؟",
        "Des entrées egress distinctes permettent un OR logique. Combiner contraintes dans une seule entrée revient à un AND.":
          "إدخالات egress منفصلة تعطي OR منطقي. دمج القيود في إدخال واحد يعطي AND.",

        // Options
        "Namespace différent": "Namespace مختلف",
        "Nom du Pod incorrect": "اسم Pod غير صحيح",
        "Modes d'accès ou capacité incompatibles": "accessModes أو السعة غير متوافقة",
        "ImagePullPolicy erronée": "ImagePullPolicy غير صحيحة",
        "Supprimé avec ses données": "محذوف مع بياناته",
        "Toujours présent, données conservées": "ما زال موجودًا والبيانات محفوظة",
        "Converti en ConfigMap": "تم تحويله إلى ConfigMap",
        "Remis automatiquement en Available et vidé": "أعيد تلقائيًا إلى Available وتم تفريغه",
        "Pod Running mais non joignable": "Pod Running لكنه غير قابل للوصول",
        "Pod en CrashLoopBackOff": "Pod في CrashLoopBackOff",
        "Pods Pending avec évènement FailedScheduling": "Pods Pending مع حدث FailedScheduling",
        "Service en type NodePort": "Service من نوع NodePort",
        "cordon redémarre kubelet, drain redémarre kube-proxy": "cordon يعيد تشغيل kubelet، drain يعيد تشغيل kube-proxy",
        "cordon bloque seulement le scheduling, drain bloque + évacue": "cordon يمنع الجدولة فقط، drain يمنع + يُخلي",
        "cordon supprime le nœud, drain le recrée": "cordon يحذف الـ node، drain يعيد إنشاءه",
        "Les deux font exactement la même chose": "كلاهما يفعل نفس الشيء تمامًا",
        "Stocker des certificats secrets": "تخزين شهادات سرية",
        "Planifier les Pods": "جدولة Pods",
        "Router HTTP/HTTPS vers des Services": "توجيه HTTP/HTTPS إلى Services",
        "Créer automatiquement des Nodes": "إنشاء Nodes تلقائيًا",
        "Toutes ces réponses sont valides": "كل هذه الإجابات صحيحة",
        "Deux conteneurs partageant un volume, sidecar en tail -f": "حاويتان تشتركان في Volume، و sidecar يقوم بـ tail -f",
        "Un initContainer qui lit les logs en continu": "initContainer يقرأ السجلات باستمرار",
        "Un seul conteneur avec deux commandes": "حاوية واحدة مع أمرين",
        "Deux règles egress séparées (OR logique)": "قاعدتا egress منفصلتان (OR منطقي)",
        "Une seule règle combinant podSelector et ports": "قاعدة واحدة تجمع podSelector و ports",
        "Activer spec.dns=true": "تفعيل spec.dns=true",
        "Aucune règle DNS nécessaire": "لا حاجة لقواعد DNS",
        "Éditer le Service: spec.type=NodePort + nodePort:30100": "تعديل Service: spec.type=NodePort + nodePort:30100",
      },
    }),
    []
  );

  const frToEn = useCallback((value) => {
    if (!value || typeof value !== "string") return value;
    const rules = [
      [/Tu dois/gi, "You must"],
      [/définis-tu d'abord/gi, "do you define first"],
      [/La bonne réponse est/gi, "Correct answer is"],
      [/Quelle commande/gi, "Which command"],
      [/Quel objet/gi, "Which object"],
      [/Quel composant/gi, "Which component"],
      [/Quel type de Service/gi, "Which Service type"],
      [/Quel est le type de Service par défaut/gi, "What is the default Service type"],
      [/Comment/gi, "How"],
      [/Que se passe-t-il/gi, "What happens"],
      [/créer/gi, "create"],
      [/Créer/gi, "Create"],
      [/supprimé/gi, "deleted"],
      [/nœud/gi, "node"],
      [/nœuds/gi, "nodes"],
      [/réseau/gi, "network"],
      [/déploiement/gi, "deployment"],
      [/mise à jour/gi, "update"],
      [/réplicas/gi, "replicas"],
      [/namespace/gi, "namespace"],
      [/triés par nom/gi, "sorted by name"],
      [/sauvegarder/gi, "save"],
      [/fichier/gi, "file"],
      [/persistant/gi, "persistent"],
      [/un persistent volume/gi, "a persistent volume"],
      [/persistent volume de/gi, "persistent volume of"],
      [/volume persistant/gi, "persistent volume"],
      [/en hostPath/gi, "using hostPath"],
      [/classes de stockage/gi, "storage classes"],
      [/classe de stockage dynamique/gi, "dynamic StorageClass"],
      [/provisionnement dynamique/gi, "dynamic provisioning"],
      [/Quel champ d'un PVC/gi, "Which field of a PVC"],
      [/permet de cibler une/gi, "lets you target a"],
      [/Un PVC est en Pending/gi, "A PVC is in Pending"],
      [/alors qu'un PV libre existe/gi, "even though a free PV exists"],
      [/Quelle incompatibilité/gi, "Which incompatibility"],
      [/incompatibilité est la plus probable/gi, "incompatibility is most likely"],
      [/Quelle commande est correcte pour/gi, "Which command is correct to"],
      [/multi-conteneurs/gi, "multi-container"],
      [/cause la plus directe/gi, "most direct cause"],
      [/chronologie des événements/gi, "timeline of events"],
      [/événements du cluster/gi, "cluster events"],
      [/vérification système est prioritaire/gi, "system check is a priority"],
      [/Le PV est la ressource cluster représentant le stockage disponible/gi, "The PV is the cluster resource representing available storage"],
      [/Le PVC vient ensuite pour le consommer/gi, "The PVC comes next to consume it"],
      [/Le champ 'spec\.storageClassName'/gi, "The 'spec.storageClassName' field"],
      [/indique la StorageClass/gi, "indicates the StorageClass"],
      [/pilotera le provisionnement dynamique/gi, "will drive dynamic provisioning"],
      [/Un node est NotReady/gi, "A node is NotReady"],
      [/Un Pod reste Pending/gi, "A Pod remains Pending"],
      [/est la plus adaptée/gi, "is best suited"],
      [/pour voir/gi, "to view"],
      [/Tu supprimes un PVC lié à un PV/gi, "You delete a PVC bound to a PV"],
      [/Que devient le PV/gi, "What happens to the PV"],
      [/Avec Retain/gi, "With Retain"],
      [/traitement manuel/gi, "manual handling"],
      [/binding PVC\/PV vérifie/gi, "PVC\/PV binding checks"],
      [/capacité demandée/gi, "requested capacity"],
      [/accessModes compatibles/gi, "compatible accessModes"],
      [/à partir d'un fichier YAML/gi, "from a YAML file"],
      [/stockage/gi, "storage"],
      [/par défaut/gi, "by default"],
      [/serveur DNS/gi, "DNS server"],
      [/sans utiliser/gi, "without using"],
      [/vérifier/gi, "check"],
      [/image/gi, "image"],
      [/Quelle ressource/gi, "Which resource"],
      [/d'abord/gi, "first"],
      [/crée/gi, "creates"],
      [/sont valides/gi, "are valid"],
      [/sauvegarde/gi, "save"],
      [/sortie/gi, "output"],
      [/n'affiche pas/gi, "does not show"],
      [/méthode/gi, "method"],
    ];
    return rules.reduce((txt, [pattern, replacement]) => txt.replace(pattern, replacement), value);
  }, []);

  // Question bank source is FR.
  // Prefer native quiz translations if available for the selected language.
  const localizeQuizText = useCallback((value) => {
    if (!value || typeof value !== "string") return value;
    if (lang === "fr") return value;
    const m = QUIZ_I18N[lang];
    if (m && m[value]) return m[value];
    if (lang === "en") return frToEn(value);
    return value;
  }, [QUIZ_I18N, frToEn, lang]);

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
                <div className="q">{localizeQuizText(quizQuestion.q)}</div>
                <div className="opts">
                  {quizQuestion.options.map((o, i) => {
                    const isOk = selected !== null && i === quizQuestion.answer;
                    const isBad = selected !== null && i === selected && i !== quizQuestion.answer;
                    return (
                      <button key={o} className={`opt ${isOk ? "ok" : ""} ${isBad ? "bad" : ""}`} disabled={selected !== null} onClick={() => answerCurrent(i)} aria-pressed={selected === i}>
                        <span className="letter">{String.fromCharCode(65 + i)}</span>
                        <span>{localizeQuizText(o)}</span>
                      </button>
                    );
                  })}
                </div>
                {selected !== null && (
                  <div className="exp">
                    {selected === quizQuestion.answer ? <div className="oktxt">{tr.correct}</div> : <div className="badtxt">{tr.wrongPre} {localizeQuizText(quizQuestion.options[quizQuestion.answer])}</div>}
                    <p>{localizeQuizText(quizQuestion.explanation)}</p>
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
