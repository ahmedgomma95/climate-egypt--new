// ==========================================
// 1. حاسبة الأثر الكربوني
// ==========================================
function calculateCarbon() {
    const elec = parseFloat(document.getElementById('electricity').value) || 0;
    const trans = parseFloat(document.getElementById('transport').value) || 0;

    if (elec === 0 && trans === 0) {
        alert("برجاء إدخال أرقام صحيحة للحساب");
        return;
    }

    // معادلة حساسية الانبعاثات الكيلوجرامية الكاربونية شهرياً
    const carbonTotal = (elec * 0.5) + (trans * 4 * 0.12);
    
    const resultDiv = document.getElementById('carbon-result');
    const resultText = document.getElementById('carbon-text');
    
    resultDiv.classList.remove('d-none');
    resultText.innerHTML = `انبعاثاتك الكاربونية التقديرية هي: <br><strong class="fs-5 text-dark">${carbonTotal.toFixed(1)} كجم CO2 / شهرياً</strong>`;
}

// ==========================================
// 2. حاسبة غرس الأشجار والأثر البيئي
// ==========================================
function calculateTreesEffect() {
    const count = parseInt(document.getElementById('treesCount').value) || 0;
    const factor = parseFloat(document.getElementById('treeType').value) || 22;

    if (count <= 0) {
        alert("برجاء إدخال عدد الأشجار");
        return;
    }

    const co2Absorbed = count * factor; // كجم CO2 الممتص سنوياً
    
    const resultDiv = document.getElementById('tree-result');
    const resultText = document.getElementById('tree-text');
    
    resultDiv.classList.remove('d-none');
    resultText.innerHTML = `زراعة ${count} شجرة تمتص حوالي:<br><strong class="fs-5 text-success">${co2Absorbed} كجم من CO2 سنوياً</strong> 🌳`;
}

// ==========================================
// 3. مؤشر تقييم المدرسة الخضراء
// ==========================================
function calculateSchoolScore() {
    const greenSpace = parseInt(document.getElementById('schoolTrees').value) || 0;
    const recyclingScore = parseInt(document.getElementById('recycling').value) || 0;

    const totalScore = greenSpace + recyclingScore;
    
    const resultDiv = document.getElementById('school-result');
    const resultText = document.getElementById('school-text');
    
    resultDiv.classList.remove('d-none');
    
    let status = "مدرسة ناهضة نحو التحول الأخضر 🌱";
    if (totalScore >= 80) status = "مدرسة خضراء نموذجية مستدامة 🏆";
    else if (totalScore >= 50) status = "مدرسة صديقة للبيئة بدرجة متوسطة 🌿";

    resultText.innerHTML = `تقييم الاستدامة: <strong>${totalScore}%</strong><br>${status}`;
}

// ==========================================
// 4. اختبار الوعي المناخي (Quiz)
// ==========================================
const quizData = [
    {
        question: "ما هو الغاز الرئيسي المسبب لظاهرة الاحتباس الحراري؟",
        options: ["ثاني أكسيد الكربون (CO2)", "الأكسجين", "النيتروجين"],
        correct: 0
    },
    {
        question: "أي من التالي يعد مصدر طاقة نظيف ومستدام؟",
        options: ["الفحم الحجري", "الطاقة الشمسية", "البترول"],
        correct: 1
    },
    {
        question: "ما الهدف الرئيسي من مشروعات الهيدروجين الأخضر بالسويس؟",
        options: ["إنتاج طاقة خالية من الكربون", "زيادة استهلاك الوقود الأحفوري", "تقليل المساحات الخضراء"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    if (currentQuestion >= quizData.length) {
        document.getElementById('quiz-container').classList.add('d-none');
        document.getElementById('quiz-result').classList.remove('d-none');
        document.getElementById('quiz-score-text').innerText = `حصلت على ${score} من ${quizData.length} إجابات صحيحة!`;
        return;
    }

    const q = quizData[currentQuestion];
    document.getElementById('quiz-question').innerText = q.question;
    
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-success text-start rounded-3 py-2 fw-bold';
        btn.innerText = opt;
        btn.onclick = () => {
            if (idx === q.correct) score++;
            currentQuestion++;
            loadQuiz();
        };
        optionsDiv.appendChild(btn);
    });
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-container').classList.remove('d-none');
    document.getElementById('quiz-result').classList.add('d-none');
    loadQuiz();
}

// تشغيل الاختبار عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    loadQuiz();
});