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

    const numDep =
        parseInt(document.getElementById('numDependentes').value);

    const contPrevidenciaria =
        parseFloat(document.getElementById('contPrevidenciaria').value);

    if (isNaN(salarioBruto) ||
        isNaN(numDep) ||
        isNaN(contPrevidenciaria)) {

        alert('Preencha todos os campos.');
        return;
    }

    if (salarioBruto < 0 || numDep < 0 || contPrevidenciaria < 0) {

        alert('Os valores não podem ser negativos.');
        return;
    }

    let baseCalculo = salarioBruto - contPrevidenciaria - (numDep * 189.59);

    let aliquota;
    let parcelaDeduzir;

    if (baseCalculo <= 2259.20) {
        aliquota = 0;
        parcelaDeduzir = 0;
    }
    else if (baseCalculo <= 2826.65) {
        aliquota = 0.075;
        parcelaDeduzir = 169.44;
    }
    else if (baseCalculo <= 3751.05) {
        aliquota = 0.15;
        parcelaDeduzir = 381.44;
    }
    else if (baseCalculo <= 4664.68) {
        aliquota = 0.225;
        parcelaDeduzir = 662.77;
    }
    else {
        aliquota = 0.275;
        parcelaDeduzir = 896.00;
    }

    let irrf = (baseCalculo * aliquota) - parcelaDeduzir;

    if (irrf < 0) {
        irrf = 0;
    }

    resultado.textContent =
        `R$ ${irrf.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

    return irrf;
}


function limparCampos() {
    document.getElementById('salarioBruto').value = '';
    document.getElementById('numDependentes').value = '';
    document.getElementById('contPrevidenciaria').value = '';
    resultado.textContent = '---';
}


const bases = [
    1621.00,
    2000.00,
    2259.20,
    2400.00,
    2600.00,
    2826.65,
    3000.00,
    3400.00,
    3751.05,
    4000.00,
    4300.00,
    4664.68,
    6000.00,
    10000.00,
    20000.00,
    30000.00
];

const valoresIRRF = [
    0,
    0,
    0,

    (2400.00 * 0.075) - 169.44,
    (2600.00 * 0.075) - 169.44,
    (2826.65 * 0.075) - 169.44,

    (3000.00 * 0.15) - 381.44,
    (3400.00 * 0.15) - 381.44,
    (3751.05 * 0.15) - 381.44,

    (4000.00 * 0.225) - 662.77,
    (4300.00 * 0.225) - 662.77,
    (4664.68 * 0.225) - 662.77,

    (6000.00 * 0.275) - 896.00,
    (10000.00 * 0.275) - 896.00,
    (20000.00 * 0.275) - 896.00,
    (30000.00 * 0.275) - 896.00
];

function desenharGraficoIRRF() {

    if (!grafico) return;

    const ctx = grafico.getContext('2d');

    new Chart(ctx, {
        type: 'line',

        data: {
            labels: bases.map(
                b => `R$ ${b.toFixed(2)}`
            ),

            datasets: [{
                label: 'IRRF (Base de Cálculo)',
                data: valoresIRRF,
                borderColor: 'rgba(177, 96, 230, 0.85)',
                backgroundColor: 'rgba(177, 96, 230, 0.20)',
                fill: true,
                tension: 0.2,
                pointRadius: 3
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `IRRF: R$ ${Number(context.raw).toFixed(2)}`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Base de Cálculo (R$)'
                    },
                    ticks: {
                        autoSkip: false, 
                        maxRotation: 45,
                        minRotation: 45
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: 'IRRF (R$)'
                    },
                    beginAtZero: true,

                    ticks: {
                        callback: function (value) {
                            return `R$ ${Number(value).toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

desenharGraficoIRRF();