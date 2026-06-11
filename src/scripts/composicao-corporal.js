let graficoCorporal = null;

const inputSB = document.getElementById("subescapular");
const inputTR = document.getElementById("triceps");
const inputSI = document.getElementById("supraIliaca");
const inputAB = document.getElementById("abdominal");
const inputPeso = document.getElementById("peso");

const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const mensagemErro = document.getElementById("mensagemErro");
const cardResultados = document.getElementById("cardResultados");

function mostrarErro(msg) {
    mensagemErro.textContent = msg;
    mensagemErro.style.display = "block";
    cardResultados.style.display = "none";
}

function esconderErro() {
    mensagemErro.style.display = "none";
}

function calcularComposicao() {
    esconderErro();

    const sb = Number(inputSB.value);
    const tr = Number(inputTR.value);
    const si = Number(inputSI.value);
    const ab = Number(inputAB.value);
    const peso = Number(inputPeso.value);

    if (isNaN(sb) || sb <= 0) return mostrarErro("Informe um valor válido para Subescapular.");
    if (isNaN(tr) || tr <= 0) return mostrarErro("Informe um valor válido para Tríceps.");
    if (isNaN(si) || si <= 0) return mostrarErro("Informe um valor válido para Supra-ilíaca.");
    if (isNaN(ab) || ab <= 0) return mostrarErro("Informe um valor válido para Abdominal.");
    if (isNaN(peso) || peso <= 0) return mostrarErro("Informe um peso válido.");

    const somaDobras = sb + tr + si + ab;
    const percentualGordura = (somaDobras * 0.153) + 5.783;
    const massaGorda = peso * (percentualGordura / 100);
    const massaMagra = peso - massaGorda;

    let classificacao = "";
    if (percentualGordura <= 15) {
        classificacao = "Bom";
    } else if (percentualGordura > 15 && percentualGordura <= 20) {
        classificacao = "Ocupacional";
    } else {
        classificacao = "Elevado";
    }

    document.getElementById("resGordura").textContent = percentualGordura.toFixed(2);
    document.getElementById("resMassaGorda").textContent = massaGorda.toFixed(2);
    document.getElementById("resMassaMagra").textContent = massaMagra.toFixed(2);
    document.getElementById("resClassificacao").textContent = classificacao;

    cardResultados.style.display = "block";
    cardResultados.scrollIntoView({ behavior: "smooth", block: "start" });

    renderizarGrafico(massaMagra, massaGorda);
}

function limparCampos() {
    inputSB.value = "";
    inputTR.value = "";
    inputSI.value = "";
    inputAB.value = "";
    inputPeso.value = "";
    esconderErro();
    cardResultados.style.display = "none";
    
    if (graficoCorporal) {
        graficoCorporal.destroy();
        graficoCorporal = null;
    }
}

function renderizarGrafico(massaMagra, massaGorda) {
    const ctx = document.getElementById('graficoCorporal').getContext('2d');
    
    if (graficoCorporal) {
        graficoCorporal.destroy();
    }

    graficoCorporal = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Massa Magra (kg)', 'Massa Gorda (kg)'],
            datasets: [{
                data: [massaMagra.toFixed(2), massaGorda.toFixed(2)],
                backgroundColor: ['#3b82f6', '#ef4444'], // Azul para magra, Vermelho para gorda
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

btnCalcular.addEventListener("click", calcularComposicao);
btnLimpar.addEventListener("click", limparCampos);

// Suporte para calcular apertando Enter
[inputSB, inputTR, inputSI, inputAB, inputPeso].forEach(input => {
    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") calcularComposicao();
    });
});