# 💻 Quiz Computacional

> **Aplicação web educacional interativa para prática de conhecimentos básicos de Computação.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Architecture](https://img.shields.io/badge/Architecture-ES6_Modules-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura e Padrões de Projeto](#-arquitetura-e-padrões-de-projeto)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)
- [Regras de Negócio e Especificações](#-regras-de-negócio-e-especificações)
- [Como Executar](#-como-executar)
- [Demonstração do Fluxo de Uso](#-demonstração-do-fluxo-de-uso)
- [Contribuição e Licença](#-contribuição-e-licença)

---

## 📖 Visão Geral

O **Quiz Computacional** é uma Single-Page Application (SPA) educacional projetada para auxiliar estudantes a fixarem conceitos fundamentais de Ciência da Computação (hardware, software, redes, algoritmos, sistemas operacionais e estruturas de dados).

Construído inteiramente com **tecnologias web nativas (HTML5, CSS3 e Vanilla JavaScript)**, a aplicação não possui dependências de bibliotecas de terceiros ou frameworks frontend, operando de forma 100% autônoma diretamente no navegador.

---

## ✨ Funcionalidades Principais

- ❓ **Visualização Individual de Questões**: Exibição de uma questão por vez, com enunciado claro e exatamente **4 alternativas de resposta** (apenas 1 correta).
- 💡 **Feedback Imediato com Explicação Didática**: Ao confirmar a resposta, a aplicação informa instantaneamente se o estudante acertou ou errou, destaca visualmente a opção correta em verde e apresenta uma explicação didática do conceito.
- 🔄 **Navegação Bidirecional**: O estudante pode navegar para frente e para trás entre as 10 questões, além de alterar a alternativa selecionada antes de finalizar o quiz.
- 🏆 **Resumo de Desempenho no Final**: Ao término da 10ª questão, apresenta um relatório com contagem de acertos, erros e o percentual de aproveitamento exato (ex: 8 acertos, 2 erros = 80%).
- 🛡️ **Reinício com Modal de Confirmação**: Botão para reiniciar a qualquer momento ou na tela final, sempre exigindo confirmação via janela modal ("Deseja reiniciar?") para prevenir perdas acidentais de progresso.
- 📱 **Interface 100% Responsiva (Mobile-First)**: Ajuste fluido para smartphones e desktops, garantindo áreas de toque otimizadas (mínimo 44px).

---

## 🏛️ Arquitetura e Padrões de Projeto

A aplicação foi desenvolvida seguindo o princípio da **separação estrita de responsabilidades**:

```text
               +----------------------------------+
               |        Apresentação (DOM)        |
               | (ui-controller.js / CSS3 / HTML) |
               +-----------------+----------------+
                                 |
                                 v
               +-----------------+----------------+
               |     Lógica do Quiz (Engine)      |
               |      (quiz-engine.js state)      |
               +-----------------+----------------+
                                 |
                                 v
               +-----------------+----------------+
               |    Camada de Dados (Repository)  |
               | (questions-service / JSON local) |
               +----------------------------------+
```

1. **Apresentação (`src/ui/`)**: Manipulação de elementos do DOM, renderização de cards, atualização da barra de progresso, listeners de botões e controle do modal.
2. **Lógica de Negócio (`src/engine/`)**: Classe `QuizEngine` em JavaScript puro, desacoplada do HTML, responsável pela gestão de estado da sessão, histórico de respostas e cálculos matemáticos determinísticos.
3. **Camada de Dados (`src/data/`)**: Leitura do arquivo JSON de questões (`questions.json`) com mecanismo de fallback transparente para execução local sem servidor.

---

## 📁 Estrutura de Diretórios

```text
quiz-computacional/
├── index.html                      # Documento principal SPA e contêineres HTML5
├── README.md                       # Documentação completa do projeto
├── .gitignore                      # Regras de ignoração do Git
├── .specify/                       # Configurações de governança e memória de especificações
├── specs/                          # Artefatos de especificação, plano, tarefas e checklists
│   └── 001-quiz-computacional/
│       ├── spec.md                 # Especificação técnica e requisitos funcionais
│       ├── plan.md                 # Plano de arquitetura e tecnologia
│       ├── data-model.md           # Modelo de dados e entidades
│       ├── quickstart.md           # Guia rápido de validação manual
│       ├── tasks.md                # Tarefas de implementação executadas
│       ├── contracts/              # Schemas e APIs JS da engine
│       └── checklists/             # Listas de qualidade de requisitos
└── src/
    ├── data/
    │   ├── questions.json          # Banco local de 10 questões com explicações
    │   └── questions-service.js    # Serviço de carregamento assíncrono das questões
    ├── engine/
    │   └── quiz-engine.js          # Classe de controle de estado e regras de negócio
    ├── ui/
    │   ├── main.js                 # Ponto de entrada do script SPA
    │   ├── ui-controller.js        # Gerenciador de eventos e renderização da UI
    │   └── modal-controller.js     # Gerenciador do modal de confirmação de reinício
    └── styles/
        ├── main.css                # Variáveis de tema e reset de estilos globais
        ├── components.css          # Estilos de cards, opções, botões, modais e badges
        └── responsive.css          # Regras de mídia e breakpoints móveis
```

---

## 📜 Regras de Negócio e Especificações

A aplicação foi rigorosamente desenvolvida em conformidade com as diretrizes constitucionais do projeto:

- **Estrutura Padrão de Questões**: Cada questão possui obrigatoriamente 4 alternativas de resposta.
- **Alternativa Correta Única**: Cada questão possui estritamente 1 opção marcada como correta (`correctIndex`).
- **Feedback Transparente**: Destaque imediato com a indicação da resposta correta e texto explicativo pedagógico.
- **Zero Dependências Supérfluas**: Desenvolvido sem bibliotecas ou frameworks externos para garantir máxima velocidade de carregamento.

---

## 💻 Como Executar

### Método 1: Abertura Direta no Navegador (Mais Rápido)
Não requer instalação de nenhuma ferramenta ou servidor. Basta abrir o arquivo `index.html` diretamente:

- Clique duas vezes no arquivo **[index.html](file:///c:/Users/Manoel&M%C3%B4nica&Ian/Desktop/Projeto%20Jo%C3%A3o/quiz-computacional/index.html)**.

### Método 2: Servidor Web Local (Python)
Caso prefira rodar através de um servidor HTTP local:

1. Abra o terminal na pasta do projeto.
2. Execute o comando:
   ```bash
   python -m http.server 8000
   ```
3. Acesse no navegador: **`http://localhost:8000`**

---

## 🎮 Demonstração do Fluxo de Uso

```text
[ Tela do Quiz ]
├─ Header (Título + Botão Reiniciar)
├─ Barra de Progresso (Questão X de 10)
├─ Card da Questão (Enunciado + 4 Alternativas A, B, C, D)
├─ Painel de Feedback (Exibido após confirmação: Acerto/Erro + Explicação)
└─ Ações (Botões: ← Anterior | Confirmar Resposta | Próxima Questão →)

[ Tela Final ]
├─ Card de Resultado (Ícone 🏆 + Estatísticas)
├─ Indicador de Acertos (ex: 8)
├─ Indicador de Erros (ex: 2)
└─ Percentual de Aproveitamento (ex: 80%)
```

---

## 📄 Licença

Este projeto é parte de um recurso educacional de código aberto sob a licença [MIT](LICENSE).
#   Q U I Z - C O M P U T A C I O N A L  
 