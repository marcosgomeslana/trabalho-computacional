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

    if (isNaN(salarioBruto) || isNaN(numDep) || isNaN(contPrevidenciaria)) {
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

    resultado.textContent = `R$ ${irrf.toFixed(2)}`;

    return irrf;
}

function limparCampos() {
    document.getElementById('salarioBruto').value = '';
    document.getElementById('numDependentes').value = '';
    document.getElementById('contPrevidenciaria').value = '';
    resultado.textContent = '---';
}

const bases = [
    1621,
    2000,
    2259.20,
    2400,
    2600,
    2826.65,
    3000,
    3400,
    3751.05,
    4000,
    4300,
    4664.68,
    6000,
    10000,
    20000,
    30000
];

const valoresIRRF = [
    0, // Até R$ 2259.20 é isento 
    0,
    0,

    //  (Base calculo * aliquota) - parcelaAdeduzir
    (2400 * 0.075) - 169.44,
    (2600 * 0.075) - 169.44,
    (2826.65 * 0.075) - 169.44,


    (3000 * 0.15) - 381.44,
    (3400 * 0.15) - 381.44,
    (3751.05 * 0.15) - 381.44,


    (4000 * 0.225) - 662.77,
    (4300 * 0.225) - 662.77,
    (4664.68 * 0.225) - 662.77,


    (6000 * 0.275) - 896.00,
    (10000 * 0.275) - 896.00,
    (20000 * 0.275) - 896.00,
    (30000 * 0.275) - 896.00
];

function desenharGraficoIRRF() {

    if (!grafico) return;

    const ctx = grafico.getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: bases.map(b => `R$ ${b}`),
            datasets: [{
                label: 'IRRF (Base de Cálculo)',
                data: valoresIRRF,
                borderColor: 'rgba(177, 96, 230, 0.85)',
                backgroundColor: 'rgba(177, 96, 230, 0.2)',
                fill: true,
                tension: 0.2,
                pointRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Base de Cálculo (R$)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'IRRF (R$)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
desenharGraficoIRRF();