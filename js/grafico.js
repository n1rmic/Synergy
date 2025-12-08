document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initChart(); // Inicializa o gráfico
});

function switchView(viewName) {
    document.querySelectorAll('.app-view').forEach(el => {
        el.classList.remove('active-view');
        setTimeout(() => el.classList.add('d-none'), 0);
    });

    document.querySelectorAll('.nav-main-link').forEach(el => el.classList.remove('active'));

    const selectedView = document.getElementById('view-' + viewName);
    if (selectedView) {
        selectedView.classList.remove('d-none');
        setTimeout(() => selectedView.classList.add('active-view'), 10);
    }
}

// Configuração do Gráfico 
function initChart() {
    const ctx = document.getElementById('impactoChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                datasets: [
                    {
                        label: 'Famílias Beneficiadas',
                        data: [20, 35, 45, 60, 85, 120],
                        borderColor: '#6CC24A', // --verde
                        backgroundColor: 'rgba(108, 194, 74, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#6CC24A',
                        pointRadius: 4
                    },
                    {
                        label: 'Área Reflorestada (ha)',
                        data: [12, 19, 25, 30, 45, 60],
                        borderColor: '#00aeef', // --azul
                        backgroundColor: 'rgba(0, 174, 239, 0.05)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#00aeef',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 8
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#fff',
                        titleColor: '#23323a',
                        bodyColor: '#6c757d',
                        borderColor: '#f3eef8',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3eef8',
                            borderDash: [5, 5]
                        },
                        ticks: {
                            color: '#999'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#999'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }
}