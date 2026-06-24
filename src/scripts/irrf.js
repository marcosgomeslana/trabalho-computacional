const form = document.getElementById('form-iffr');
const resultado = document.getElementById('valorIrrf');
const grafico = document.querySelector('.graficoIrrf');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    calcularIRRF();
});

function calcularIRRF() {

    const salarioBruto =
        parseFloat(document.getElementById('salarioBruto').value);

    const numDep = parseInt(document.getElementById('numDependentes').value);

    const contPrevidenciaria = parseFloat(document.getElementById('contPrevidenciaria').value);

    if (
        isNaN(salarioBruto) ||
        isNaN(numDep) ||
        isNaN(contPrevidenciaria)
    ) {
        alert('Preencha todos os campos.');
        return;
    }

    if (
        salarioBruto < 0 ||
        numDep < 0 ||
        contPrevidenciaria < 0
    ) {
        alert('Os valores não podem ser negativos.');
        return;
    }

    const baseCalculo =
        salarioBruto -
        contPrevidenciaria -
        (numDep * 189.59);

    const irrf = calcularIRRFBase(baseCalculo);

    resultado.textContent =
        `R$ ${irrf.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
}

function calcularIRRFBase(base) {

    let aliquota;
    let parcelaDeduzir;

    if (base <= 2259.20) {
        aliquota = 0;
        parcelaDeduzir = 0;
    }
    else if (base <= 2826.65) {
        aliquota = 0.075;
        parcelaDeduzir = 169.44;
    }
    else if (base <= 3751.05) {
        aliquota = 0.15;
        parcelaDeduzir = 381.44;
    }
    else if (base <= 4664.68) {
        aliquota = 0.225;
        parcelaDeduzir = 662.77;
    }
    else {
        aliquota = 0.275;
        parcelaDeduzir = 896.00;
    }

    const irrf =
        (base * aliquota) - parcelaDeduzir;

    return Math.max(0, irrf);
}

function limparCampos() {

    document.getElementById('salarioBruto').value = '';
    document.getElementById('numDependentes').value = '';
    document.getElementById('contPrevidenciaria').value = '';

    resultado.textContent = '---';
}

function gerarDadosGrafico() {

    const dados = [];

    for (let base = 1621; base <= 30000; base += 10) {

        dados.push({
            x: base,
            y: calcularIRRFBase(base)
        });
    }

    return dados;
}

function desenharGraficoIRRF() {

    if (!grafico) return;

    const ctx = grafico.getContext('2d');

    new Chart(ctx, {
        type: 'line',

        data: {
            datasets: [{
                label: 'IRRF (R$)',

                data: gerarDadosGrafico(),

                borderColor: 'rgba(177, 96, 230, 0.9)',
                backgroundColor: 'rgba(177, 96, 230, 0.15)',

                borderWidth: 2,

                fill: true,

                tension: 0,

                pointRadius: 0,

                pointHoverRadius: 4
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: 'nearest'
            },

            plugins: {
                legend: {
                    display: true
                },

                tooltip: {
                    callbacks: {

                        title(context) {
                            const base = context[0].raw.x;

                            return `Base: R$ ${base.toLocaleString(
                                'pt-BR',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}`;
                        },

                        label(context) {
                            return `IRRF: R$ ${context.raw.y.toLocaleString(
                                'pt-BR',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}`;
                        }
                    }
                }
            },

            scales: {

                x: {
                    type: 'linear',

                    min: 1621,
                    max: 30000,

                    title: {
                        display: true,
                        text: 'Base de Cálculo (R$)'
                    },

                    ticks: {
                        callback(value) {
                            return Number(value).toLocaleString('pt-BR');
                        }
                    }
                },

                y: {
                    beginAtZero: true,

                    title: {
                        display: true,
                        text: 'IRRF (R$)'
                    },

                    ticks: {
                        callback(value) {
                            return `R$ ${Number(value).toLocaleString(
                                'pt-BR',
                                {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }
                            )}`;
                        }
                    }
                }
            }
        }
    });
}

desenharGraficoIRRF();