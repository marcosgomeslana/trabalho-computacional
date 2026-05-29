// Variável global para armazenar a instância do gráfico e evitar sobreposições
let meuGrafico = null;

/* Função para calcular o montante final */
function calcularMontante(C, aporte, t, i) {
    // Prevenção contra divisão por zero caso a taxa seja exatamente 0
    if (i === 0) return parseFloat(C) + (parseFloat(aporte) * t);
    return C * Math.pow((1 + i), t) + aporte * ((Math.pow((1 + i), t) - 1) / i);
}

/* Função responsável por capturar os inputs e acionar os cálculos de Acúmulo de Capital. */
function calcularAcumuloCapital() {
    // 1. Captura dos valores do formulário (com parseFloat para garantir que sejam números)
    const capital = parseFloat(document.getElementById('capital').value) || 0;
    const aporte = parseFloat(document.getElementById('aporte').value) || 0;
    const tempo = parseInt(document.getElementById('tempo').value) || 0;
    const taxaAplicacao = (parseFloat(document.getElementById('taxaAplicacao').value) || 0) / 100;
    const taxaIpca = (parseFloat(document.getElementById('taxaIpca').value) || 0) / 100;

    // 2. Variáveis de retorno para o resultado final em texto
    let montanteAplicacao = calcularMontante(capital, aporte, tempo, taxaAplicacao);
    let montanteIpca = calcularMontante(capital, aporte, tempo, taxaIpca);
    let diferenca = montanteAplicacao - montanteIpca;

    // 3. Atualização dos campos de saída na tela
    document.getElementById('resAplicacao').innerText = `R$ ${montanteAplicacao.toFixed(2)}`;
    document.getElementById('resIpca').innerText = `R$ ${montanteIpca.toFixed(2)}`;
    document.getElementById('resDiferenca').innerText = `R$ ${diferenca.toFixed(2)}`;

    // 4. Lógica para gerar os dados do gráfico mês a mês
    let labelsMeses = [];
    let dadosAplicacao = [];
    let dadosIpca = [];

    for (let mes = 0; mes <= tempo; mes++) {
        labelsMeses.push(`Mês ${mes}`);
        // Calcula o valor até o mês atual do loop e salva no array
        dadosAplicacao.push(calcularMontante(capital, aporte, mes, taxaAplicacao));
        dadosIpca.push(calcularMontante(capital, aporte, mes, taxaIpca));
    }

    // 5. Chamada para atualizar o gráfico passando os dados históricos
    renderizarGrafico(labelsMeses, dadosAplicacao, dadosIpca);
}

/*
Função para limpar os campos de entrada e resetar os resultados.
*/
function limparCampos() {
    document.getElementById('form-acumulo').reset();
    
    // Retorna os resultados para o estado inicial visual (traços duplos)
    document.getElementById('resAplicacao').innerText = "--";
    document.getElementById('resIpca').innerText = "--";
    document.getElementById('resDiferenca').innerText = "--";

    // Destrói o gráfico instanciado para limpar o canvas corretamente
    if (meuGrafico) {
        meuGrafico.destroy();
        meuGrafico = null;
    }
}

/*
Função para a renderização do Gráfico usando Chart.js
*/
function renderizarGrafico(labelsMeses, dadosAplicacao, dadosIpca) {
    const canvas = document.getElementById('graficoCanvas');
    const ctx = canvas.getContext('2d');
    
    // Se o gráfico já existir na tela, destrói para desenhar o novo cálculo
    if (meuGrafico) {
        meuGrafico.destroy();
    }
    
    // Cria o gráfico com as duas linhas
    meuGrafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsMeses,
            datasets: [
                {
                    label: 'Montante com Aplicação (R$)',
                    data: dadosAplicacao,
                    borderColor: '#2563eb', // Cor azul combinando com o botão
                    backgroundColor: '#2563eb',
                    borderWidth: 2,
                    tension: 0.1 // linha aredondada
                },
                {
                    label: 'Montante corrigido (IPCA) (R$)',
                    data: dadosIpca,
                    borderColor: '#f97316', // Cor laranja para contraste
                    backgroundColor: '#f97316',
                    borderWidth: 2,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite que o gráfico preencha a div pai
            interaction: {
                mode: 'index',
                intersect: false, // Melhora a exibição do tooltip ao passar o mouse
            }
        }
    });
}