# Planejamento-Trabalho-Computacional

**Data**: 22/06/2026  

**Finalizar até dia**: 08/06/2026  

---

## Instruções para Entrega

- Saída com duas casas decimais  
- O sistema deve permitir novos cálculos sem reiniciar o programa  
- IDE disponíveis: VSCode, PyCharm e CodeBlocks  
- O sistema pode ser disponibilizado em uma interface web ou fornecido como arquivo executável  

---

## Stack

- HTML  
- CSS  
- JavaScript  
- Chart.js  
- Vercel  

---

## Como vai funcionar a aplicação

### Tela Inicial

#### Menu de Navegação

- Sistema 1 - Revestimentos  
- Sistema 2 - Corporal  
- Sistema 3 - Capital  
- Sistema 4 - IRRF  

---

## Divisão de tarefas

| Integrante | Responsabilidade |
|---|---|
| Alex | HTML, CSS, JavaScript, cálculos, validações e resultados |
| Daniel | HTML, CSS, JavaScript, cálculos, validações e resultados |
| João | HTML, CSS, JavaScript, cálculos, validações e resultados |
| Marcos | HTML, CSS, JavaScript, cálculos, validações e resultados |

---

A divisão escolhida, onde cada integrante será responsável pelo HTML, CSS, JavaScript, cálculos, validações e resultados do seu sistema, foi planejada para garantir que todos pratiquem a parte matemática do trabalho. Ao final, iremos estudar os sistemas em conjunto para que todos entendam o funcionamento completo da aplicação, consigam responder às possíveis perguntas do professor e também realizar validações e testes.  

---

## Conclusão

Por fim, iremos seguir algumas padronizações no JavaScript para evitar problemas com tipagem, realizando a conversão dos dados dos inputs para número utilizando funções como `Number()` e `parseFloat()`. Também serão utilizadas validações nos campos para evitar entradas inválidas. Além disso, todos os formulários deverão possuir, obrigatoriamente, os botões de `Calcular` e `Limpar`, permitindo novos testes e cálculos sem a necessidade de reiniciar a aplicação.  

---

## Exemplo validação e conversão simples

```javascript
const valor = Number(input.value);

if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido");
}
