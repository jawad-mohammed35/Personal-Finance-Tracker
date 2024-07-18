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
            login: 'Login',
            login_button: 'Login',
            welcome_text: 'Welcome to the Personal Finance Tracker!',
            register_button: 'Register'
        },
        es: {
            login: 'Iniciar sesión',
            login_button: 'Iniciar sesión',
            welcome_text: '¡Bienvenido al Rastreador de Finanzas Personales!',
            register_button: 'Registrarse'
        },
        fr: {
            login: 'Connexion',
            login_button: 'Connexion',
            welcome_text: 'Bienvenue dans le Suivi des Finances Personnelles!',
            register_button: 'S\'inscrire'
        },
        zh: {
            login: '登录',
            login_button: '登录',
            welcome_text: '欢迎使用个人理财追踪器！',
            register_button: '注册'
        },
        ko: {
            login: '로그인',
            login_button: '로그인',
            welcome_text: '개인 금융 추적기에 오신 것을 환영합니다!',
            register_button: '등록'
        },
        id: {
            login: 'Masuk',
            login_button: 'Masuk',
            welcome_text: 'Selamat datang di Pelacak Keuangan Pribadi!',
            register_button: 'Daftar'
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
