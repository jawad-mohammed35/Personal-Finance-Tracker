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
            register: 'Register',
            register_button: 'Register',
            have_account: 'Already have an account?',
            login_here: 'Login here'
        },
        es: {
            register: 'Regístrate',
            register_button: 'Registrarse',
            have_account: '¿Ya tienes una cuenta?',
            login_here: 'Iniciar sesión aquí'
        },
        fr: {
            register: 'S\'inscrire',
            register_button: 'S\'inscrire',
            have_account: 'Vous avez déjà un compte?',
            login_here: 'Connectez-vous ici'
        },
        zh: {
            register: '注册',
            register_button: '注册',
            have_account: '已经有账户了？',
            login_here: '在这里登录'
        },
        ko: {
            register: '등록',
            register_button: '등록',
            have_account: '이미 계정이 있습니까?',
            login_here: '여기에서 로그인'
        },
        id: {
            register: 'Daftar',
            register_button: 'Daftar',
            have_account: 'Sudah punya akun?',
            login_here: 'Masuk di sini'
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