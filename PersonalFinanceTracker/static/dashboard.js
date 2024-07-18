document.addEventListener('DOMContentLoaded', (event) => {
    const themeSwitch = document.getElementById('theme-switch');
    const languageSelect = document.getElementById('language-select');
    const currentDatetime = document.getElementById('datetime-text');
    const incomeForm = document.getElementById('income-form');
    const budgetForm = document.getElementById('budget-form');
    const incomeChartCtx = document.getElementById('income-chart').getContext('2d');
    const budgetChartCtx = document.getElementById('budget-chart').getContext('2d');
    const exportExcelBtn = document.getElementById('export-excel');
    const clearDataBtn = document.getElementById('clear-data');

    let incomeChart = new Chart(incomeChartCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Income',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    let budgetChart = new Chart(budgetChartCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Budget',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

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
            dashboard: 'Dashboard',
            income_tracker: 'Income Tracker',
            add_income: 'Add Income',
            budget_tracker: 'Budget Tracker',
            add_budget: 'Add Budget',
            export_excel: 'Export to Excel',
            clear_data: 'Clear Data',
            logout: 'Logout'
        },
        es: {
            dashboard: 'Tablero',
            income_tracker: 'Rastreador de Ingresos',
            add_income: 'Agregar Ingreso',
            budget_tracker: 'Rastreador de Presupuesto',
            add_budget: 'Agregar Presupuesto',
            export_excel: 'Exportar a Excel',
            clear_data: 'Borrar Datos',
            logout: 'Cerrar sesión'
        },
        fr: {
            dashboard: 'Tableau de Bord',
            income_tracker: 'Suivi des Revenus',
            add_income: 'Ajouter un Revenu',
            budget_tracker: 'Suivi du Budget',
            add_budget: 'Ajouter un Budget',
            export_excel: 'Exporter vers Excel',
            clear_data: 'Effacer les Données',
            logout: 'Se déconnecter'
        },
        zh: {
            dashboard: '仪表板',
            income_tracker: '收入追踪器',
            add_income: '添加收入',
            budget_tracker: '预算追踪器',
            add_budget: '添加预算',
            export_excel: '导出到Excel',
            clear_data: '清除数据',
            logout: '登出'
        },
        ko: {
            dashboard: '대시보드',
            income_tracker: '수입 추적기',
            add_income: '수입 추가',
            budget_tracker: '예산 추적기',
            add_budget: '예산 추가',
            export_excel: '엑셀로 내보내기',
            clear_data: '데이터 지우기',
            logout: '로그아웃'
        },
        id: {
            dashboard: 'Dasbor',
            income_tracker: 'Pelacak Pendapatan',
            add_income: 'Tambah Pendapatan',
            budget_tracker: 'Pelacak Anggaran',
            add_budget: 'Tambah Anggaran',
            export_excel: 'Ekspor ke Excel',
            clear_data: 'Hapus Data',
            logout: 'Keluar'
        }
    };

    function updateCurrentDatetime() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const timeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        });
        currentDatetime.textContent = `📅 ${dateStr} 🕒 ${timeStr}`;
    }

    updateCurrentDatetime();
    setInterval(updateCurrentDatetime, 1000);

    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('income-amount').value;
        const source = document.getElementById('income-source').value;
        addDataToChart(incomeChart, source, amount);
    });

    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('budget-amount').value;
        const category = document.getElementById('budget-category').value;
        addDataToChart(budgetChart, category, amount);
    });

    exportExcelBtn.addEventListener('click', () => {
        exportToExcel();
    });

    clearDataBtn.addEventListener('click', () => {
        clearData();
    });

    function addDataToChart(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    function exportToExcel() {
        let incomeData = [];
        incomeChart.data.labels.forEach((label, index) => {
            incomeData.push({
                source: label,
                amount: incomeChart.data.datasets[0].data[index]
            });
        });

        let budgetData = [];
        budgetChart.data.labels.forEach((label, index) => {
            budgetData.push({
                category: label,
                amount: budgetChart.data.datasets[0].data[index]
            });
        });

        let data = [
            { worksheet: 'Income', content: incomeData },
            { worksheet: 'Budget', content: budgetData }
        ];

        let wb = XLSX.utils.book_new();
        data.forEach(sheet => {
            let ws = XLSX.utils.json_to_sheet(sheet.content);
            XLSX.utils.book_append_sheet(wb, ws, sheet.worksheet);
        });

        XLSX.writeFile(wb, 'financial_data.xlsx');
        alert('Data has been exported to Excel file. View your downloads.');

    }

    function clearData() {
        incomeChart.data.labels = [];
        incomeChart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        incomeChart.update();

        budgetChart.data.labels = [];
        budgetChart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        budgetChart.update();

        alert('Data has been cleared.');
    }
});
