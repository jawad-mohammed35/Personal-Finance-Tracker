document.addEventListener('DOMContentLoaded', (event) => {
    const themeSwitch = document.getElementById('theme-switch');
    const languageSelect = document.getElementById('language-select');
    const currentDatetime = document.getElementById('current-datetime');

    // Apply saved theme and language
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.textContent = '🌙';
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        updateTranslations(savedLanguage);
    }

    themeSwitch.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        themeSwitch.textContent = theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', theme);
    });

    languageSelect.addEventListener('change', (event) => {
        const language = event.target.value;
        updateTranslations(language);
        localStorage.setItem('language', language);
    });

    function updateTranslations(language) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translations[language][key];
        });
    }

    const translations = {
        en: {
            about_title: 'About Personal Finance Tracker',
            about_description: 'This application helps you manage your personal finances by tracking your income and expenses, creating budgets, and visualizing your financial data.',
            about_creator: 'About the Creator',
            creator_name: 'Name: Jawad Mohammed',
            creator_school: 'School: Florida International University',
            creator_major: 'Major: Computer Science',
            login_page: 'Go to Login Page',
            register_page: 'Go to Register Page'
        },
        es: {
            about_title: 'Acerca de Personal Finance Tracker',
            about_description: 'Esta aplicación te ayuda a gestionar tus finanzas personales rastreando tus ingresos y gastos, creando presupuestos y visualizando tus datos financieros.',
            about_creator: 'Acerca del Creador',
            creator_name: 'Nombre: Jawad Mohammed',
            creator_school: 'Escuela: Florida International University',
            creator_major: 'Especialidad: Ciencias de la Computación',
            login_page: 'Ir a la página de inicio de sesión',
            register_page: 'Ir a la página de registro'
        },
        fr: {
            about_title: 'À propos de Personal Finance Tracker',
            about_description: 'Cette application vous aide à gérer vos finances personnelles en suivant vos revenus et dépenses, en créant des budgets et en visualisant vos données financières.',
            about_creator: 'À propos du créateur',
            creator_name: 'Nom: Jawad Mohammed',
            creator_school: 'École: Florida International University',
            creator_major: 'Majeure: Informatique',
            login_page: 'Aller à la page de connexion',
            register_page: 'Aller à la page d\'inscription'
        },
        zh: {
            about_title: '关于个人财务跟踪器',
            about_description: '该应用程序通过跟踪您的收入和支出、创建预算和可视化您的财务数据来帮助您管理个人财务。',
            about_creator: '关于创建者',
            creator_name: '姓名：Jawad Mohammed',
            creator_school: '学校：佛罗里达国际大学',
            creator_major: '专业：计算机科学',
            login_page: '前往登录页面',
            register_page: '前往注册页面'
        },
        ko: {
            about_title: '개인 재정 추적기 정보',
            about_description: '이 응용 프로그램은 귀하의 수입 및 지출을 추적하고 예산을 작성하며 재무 데이터를 시각화하여 개인 재정을 관리하는 데 도움이 됩니다.',
            about_creator: '창작자 정보',
            creator_name: '이름: 자와드 모하메드',
            creator_school: '학교: 플로리다 국제 대학교',
            creator_major: '전공: 컴퓨터 과학',
            login_page: '로그인 페이지로 이동',
            register_page: '등록 페이지로 이동'
        },
        id: {
            about_title: 'Tentang Pelacak Keuangan Pribadi',
            about_description: 'Aplikasi ini membantu Anda mengelola keuangan pribadi Anda dengan melacak pendapatan dan pengeluaran Anda, membuat anggaran, dan memvisualisasikan data keuangan Anda.',
            about_creator: 'Tentang Pencipta',
            creator_name: 'Nama: Jawad Mohammed',
            creator_school: 'Sekolah: Universitas Internasional Florida',
            creator_major: 'Jurusan: Ilmu Komputer',
            login_page: 'Buka Halaman Masuk',
            register_page: 'Buka Halaman Daftar'
        }
    };

    function updateDatetime() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
        currentDatetime.textContent = `📅 ${dateStr} 🕒 ${timeStr}`;
    }

    setInterval(updateDatetime, 1000);
    updateDatetime(); // initial call to set the datetime immediately
});