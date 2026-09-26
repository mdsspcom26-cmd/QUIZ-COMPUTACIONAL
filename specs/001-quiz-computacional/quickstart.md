# Quickstart & Validation Guide: Quiz Computacional

**Feature Branch**: `001-quiz-computacional`
**Date**: 2026-09-26

## Visão Geral

Este guia descreve os passos para executar, testar e validar localmente a aplicação **Quiz Computacional** sem a necessidade de compilação, instalação de dependências ou execução de servidores complexos.

---

## 1. Pré-requisitos

- Um navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari).
- (Opcional) Uma extensão de servidor estático local (como Live Server no VS Code) ou Python HTTP Server para servir os arquivos via protocolo HTTP/HTTPS se desejado.

---

## 2. Executando a Aplicação

### Método A: Servidor HTTP Local Estático (Recomendado)
Execute qualquer mini servidor de arquivos estáticos na raiz do repositório:
```bash
# Exemplo com Python (embutido no Windows/Linux/macOS)
python -m http.server 8000
```
Em seguida, abra o navegador no endereço: `http://localhost:8000`

### Método B: Abertura Direta do Arquivo
Abra diretamente o arquivo `index.html` localizado na raiz do projeto no seu navegador:
- Caminho: `file:///c:/Users/.../quiz-computacional/index.html`

---

## 3. Roteiro de Validação Manual (Cenários de Teste)

### Cenário 1: Visualização de Questão e Seleção de Alternativa
1. Abra a aplicação.
2. Verifique se o enunciado da Questão 1 e **exatamente 4 alternativas** são exibidos na tela.
3. Clique em uma das alternativas e confirme que a opção fica visualmente destacada.

### Cenário 2: Feedback de Resposta e Explicação Didática
1. Selecione uma alternativa propositalmente incorreta.
2. Observe se o sistema indica "Incorreto", destaca visualmente a alternativa correta em verde e exibe a mensagem de explicação didática.

### Cenário 3: Navegação Bidirecional (Avançar e Voltar)
1. Clique em "Próxima Questão" para avançar até a Questão 3.
2. Clique no botão "Voltar".
3. Verifique se a aplicação retorna à Questão 2 preservando a seleção anteriormente marcada.
4. Altere a seleção para outra alternativa.

### Cenário 4: Modal de Confirmação de Reinício
1. Durante a resolução de qualquer questão, clique no botão "Reiniciar Quiz".
2. Verifique se o modal/diálogo de confirmação com a pergunta `"Deseja reiniciar o quiz?"` é exibido.
3. Clique em "Cancelar" e confirme que o progresso atual é mantido intacto.
4. Clique em "Reiniciar Quiz" novamente e clique em "Confirmar".
5. Verifique se a aplicação retorna à Questão 1 com o estado zerado.

### Cenário 5: Conclusão e Tela de Resultado Final
1. Responda às 10 questões do quiz até o final.
2. Verifique se a tela final exibe:
   - Quantidade de acertos (ex: 8)
   - Quantidade de erros (ex: 2)
   - Percentual de acertos (ex: 80%)
3. Clique em "Reiniciar Quiz", confirme a caixa de diálogo e valide o retorno à Questão 1.

---

## 4. Teste de Responsividade

1. Abra o **Developer Tools** do navegador (`F12` ou `Ctrl+Shift+I`).
2. Ative o modo de simulação de dispositivos móveis (**Toggle Device Toolbar** - `Ctrl+Shift+M`).
3. Selecione um dispositivo smartphone (ex: iPhone SE ou Pixel 7 - 375px de largura).
4. Confirme que todos os botões de alternativas possuem área clicável adequada (min 44px) e que o layout ajusta-se sem rolagem horizontal indesejada.
