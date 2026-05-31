// =============================================
// revestimentos.js
// Sistema de Orçamento para Revestimentos
// =============================================

// --- Elementos do DOM ---
const inputLargura       = document.getElementById("largura");
const inputComprimento   = document.getElementById("comprimento");
const inputPecaLargura   = document.getElementById("pecaLargura");
const inputPecaComprimento = document.getElementById("pecaComprimento");
const inputQtdPecas      = document.getElementById("qtdPecas");
const inputPrecoCaixa    = document.getElementById("precoCaixa");
const inputPerda         = document.getElementById("perda");

const btnCalcular        = document.getElementById("btnCalcular");
const btnLimpar          = document.getElementById("btnLimpar");
const mensagemErro       = document.getElementById("mensagemErro");
const cardResultados     = document.getElementById("cardResultados");

const resAreaPeca        = document.getElementById("resAreaPeca");
const resAreaAmb         = document.getElementById("resAreaAmb");
const resAreaTotal       = document.getElementById("resAreaTotal");
const resMetCaixa        = document.getElementById("resMetCaixa");
const resCaixas          = document.getElementById("resCaixas");
const resCusto           = document.getElementById("resCusto");

// --- Validação ---
function validarCampos(valores) {
    const { largura, comprimento, pecaLarg, pecaComp, qtdPecas, preco, perda } = valores;

    if (isNaN(largura)      || largura <= 0)      return "Informe uma largura do ambiente válida (maior que 0).";
    if (isNaN(comprimento)  || comprimento <= 0)  return "Informe um comprimento do ambiente válido (maior que 0).";
    if (isNaN(pecaLarg)     || pecaLarg <= 0)     return "Informe a largura da peça válida (maior que 0).";
    if (isNaN(pecaComp)     || pecaComp <= 0)     return "Informe o comprimento da peça válido (maior que 0).";
    if (isNaN(qtdPecas)     || qtdPecas < 1)      return "A quantidade de peças por caixa deve ser pelo menos 1.";
    if (isNaN(preco)        || preco <= 0)         return "Informe um preço de caixa válido (maior que 0).";
    if (isNaN(perda)        || perda < 0 || perda > 100) return "A margem de perda deve estar entre 0% e 100%.";

    return null; // sem erros
}

// --- Exibir erro ---
function mostrarErro(msg) {
    mensagemErro.textContent = msg;
    mensagemErro.style.display = "block";
}

function esconderErro() {
    mensagemErro.style.display = "none";
}

// --- Calcular ---
function calcular() {
    esconderErro();

    const valores = {
        largura:      parseFloat(inputLargura.value),
        comprimento:  parseFloat(inputComprimento.value),
        pecaLarg:     parseFloat(inputPecaLargura.value),
        pecaComp:     parseFloat(inputPecaComprimento.value),
        qtdPecas:     Number(inputQtdPecas.value),
        preco:        parseFloat(inputPrecoCaixa.value),
        perda:        parseFloat(inputPerda.value),
    };

    const erro = validarCampos(valores);
    if (erro) {
        mostrarErro(erro);
        cardResultados.style.display = "none";
        return;
    }

    // --- Fórmulas ---
    // Conversão cm → m
    const pecaLargM = valores.pecaLarg / 100;
    const pecaCompM = valores.pecaComp / 100;

    // Área da peça (m²)
    const areaPeca = pecaLargM * pecaCompM;

    // Área do ambiente (m²)
    const areaAmbiente = valores.largura * valores.comprimento;

    // Área total com margem de perda (m²)
    const areaTotal = areaAmbiente * (1 + valores.perda / 100);

    // Metragem coberta por uma caixa (m²)
    const metCaixa = areaPeca * valores.qtdPecas;

    // Número de caixas — arredondamento para CIMA
    const nCaixas = Math.ceil(areaTotal / metCaixa);

    // Custo total (R$)
    const custoTotal = nCaixas * valores.preco;

    // --- Exibir resultados ---
    resAreaPeca.textContent  = areaPeca.toFixed(4);
    resAreaAmb.textContent   = areaAmbiente.toFixed(2);
    resAreaTotal.textContent = areaTotal.toFixed(2);
    resMetCaixa.textContent  = metCaixa.toFixed(4);
    resCaixas.textContent    = nCaixas;
    resCusto.textContent     = custoTotal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    cardResultados.style.display = "block";
    cardResultados.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --- Limpar ---
function limpar() {
    inputLargura.value          = "";
    inputComprimento.value      = "";
    inputPecaLargura.value      = "";
    inputPecaComprimento.value  = "";
    inputQtdPecas.value         = "";
    inputPrecoCaixa.value       = "";
    inputPerda.value            = "10";

    esconderErro();
    cardResultados.style.display = "none";

    inputLargura.focus();
}

// --- Eventos ---
btnCalcular.addEventListener("click", calcular);
btnLimpar.addEventListener("click", limpar);

// Calcular ao pressionar Enter em qualquer campo
const todosInputs = [
    inputLargura, inputComprimento,
    inputPecaLargura, inputPecaComprimento,
    inputQtdPecas, inputPrecoCaixa, inputPerda,
];

todosInputs.forEach(function(input) {
    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") calcular();
    });
});