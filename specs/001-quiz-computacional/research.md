# Phase 0 Research: Quiz Computacional

**Feature Branch**: `001-quiz-computacional`
**Date**: 2026-09-26

## Overview

Este documento consolida as decisões técnicas, arquiteturais e estratégias de implementação para o desenvolvimento da aplicação **Quiz Computacional** utilizando exclusivamente web tecnologias nativas (HTML5, CSS3 e Vanilla JavaScript ES6).

---

## Technical Decisions

### Decision 1: Modularização do Código em JavaScript Nativo (ES6 Modules)

- **Decision**: Adotar Módulos ES6 nativos do navegador (`<script type="module" src="src/ui/main.js">`) para estruturar a aplicação.
- **Rationale**: 
  - Permite a separação estrita em camadas (Apresentação, Dados e Lógica de Negócio) sem a necessidade de ferramentas de build ou empacotamento (Vite, Webpack, Babel).
  - Promove legibilidade, testabilidade e atende ao Princípio II (Organização e Legibilidade) e ao Princípio VII (Minimalismo de Dependências) da Constituição.
- **Alternatives considered**:
  - *Arquivo script único*: Rejeitado por acoplar lógica de UI e regras de negócio no mesmo escopo (código spaghetti).
  - *Empacotadores (Vite / Parcel)*: Rejeitados por introduzirem dependências npm desnecessárias para um MVP web simples.

---

### Decision 2: Estratégia de Carregamento do Arquivo JSON de Questões

- **Decision**: Utilizar `fetch('./src/data/questions.json')` com mecanismo de fallback gracioso/inline para garantir compatibilidade caso o arquivo seja aberto via protocolo `file://` direto no navegador (onde algumas políticas CORS de navegadores locais restringem `fetch`).
- **Rationale**: 
  - `fetch` é a API padrão moderna para carregamento assíncrono de dados JSON.
  - O fallback estático embutido garante que a aplicação funcione 100% "out-of-the-box" tanto em servidor HTTP estático quanto em abertura de arquivo local via duplo clique.
- **Alternatives considered**:
  - *Inclusão de arquivo JS com `const questions = [...]`*: Funciona sem CORS, mas viola o requisito explícito do usuário de manter as questões em um arquivo JSON local separado.

---

### Decision 3: Arquitetura de Apresentação e Layout Responsivo

- **Decision**: CSS3 moderno com Mobile-First, utilizando CSS Variables (para padronização de cores e temas de acerto/erro), Flexbox e CSS Grid.
- **Rationale**:
  - Garante uma interface limpa, moderna e adaptável a smartphones (ex: 320px-480px) e telas de desktop (1024px+).
  - Elimina a necessidade de frameworks como Bootstrap ou Tailwind.
- **Alternatives considered**:
  - *Frameworks CSS (Bootstrap / Tailwind)*: Rejeitados conforme diretriz de zero dependências e foco na simplicidade.

---

### Decision 4: Gerenciamento de Estado e Modal de Confirmação de Reinício

- **Decision**: O estado da sessão reside na classe `QuizEngine` (memória JS). O modal de confirmação de reinício será construído utilizando o elemento HTML5 `<dialog>` nativo ou um overlay modal CSS acessível com manipulação via `modal-controller.js`.
- **Rationale**:
  - Atende diretamente à clarificação solicitada pelo usuário (solicitar confirmação sempre ao clicar em reiniciar).
  - Suporta navegação bidirecional (avançar e voltar), atualização da seleção corrente de cada questão e cálculo determinístico dos resultados ao finalizar.
- **Alternatives considered**:
  - `window.confirm()` nativo: Embora funcional, possui baixa flexibilidade visual e estilização inconsistente entre navegadores/SO. Um modal HTML/CSS acessível proporciona melhor experiência estudantil (Princípio I da Constituição).

---

## Technical Risk Assessment

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Bloqueio CORS do `fetch` em `file://` | Baixo | Adicionar fallback transparente que inicializa com dados de fallback caso a requisição `fetch` falhe. |
| Incompatibilidade de layout em telas pequenas | Médio | Estruturar CSS com Mobile-First, testando áreas de toque (min 44px) para botões de alternativas. |
| Perda de estado por recarga acidental | Baixo | Documentado em Assumptions; MVP opera em memória cliente conforme especificado. |
