# Tasks: Quiz Computacional

**Input**: Design documents from `/specs/001-quiz-computacional/`
**Prerequisites**: [plan.md](file:///c:/Users/Manoel&M%C3%B4nica&Ian/Desktop/Projeto%20Jo%C3%A3o/quiz-computacional/specs/001-quiz-computacional/plan.md), [spec.md](file:///c:/Users/Manoel&M%C3%B4nica&Ian/Desktop/Projeto%20Jo%C3%A3o/quiz-computacional/specs/001-quiz-computacional/spec.md), [data-model.md](file:///c:/Users/Manoel&M%C3%B4nica&Ian/Desktop/Projeto%20Jo%C3%A3o/quiz-computacional/specs/001-quiz-computacional/data-model.md), [contracts/](file:///c:/Users/Manoel&M%C3%B4nica&Ian/Desktop/Projeto%20Jo%C3%A3o/quiz-computacional/specs/001-quiz-computacional/contracts/)

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Parallelizable task (independent files)
- **[Story]**: User story label (`[US1]`, `[US2]`, `[US3]`)
- Every task specifies the target file path.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic SPA HTML/CSS layout structure

- [x] T001 Initialize HTML5 SPA directory layout and base document shell in `index.html`
- [x] T002 [P] Create base CSS variables, reset rules, and container layout in `src/styles/main.css`
- [x] T003 [P] Create responsive layout rules and viewport breakpoints in `src/styles/responsive.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data and state engine required before implementing UI user stories

- [x] T004 [P] Create local JSON dataset with 10 computing questions in `src/data/questions.json` with mandatory fields `id`, `statement`, `options` (length=4), `correctIndex` (0 to 3), and `explanation`
- [x] T005 Implement questions loader service with local fetch and fallback mechanism in `src/data/questions-service.js`
- [x] T006 Implement core state engine class `QuizEngine` in `src/engine/quiz-engine.js` matching API contract (`getCurrentQuestion`, `selectOption`, `nextQuestion`, `previousQuestion`, `isFirstQuestion`, `isLastQuestion`, `calculateResult`, `reset`)

---

## Phase 3: User Story 1 - Responder e Navegar entre Questões (Priority: P1) 🎯 MVP

**Goal**: Permitir ao estudante visualizar uma questão por vez com 4 alternativas, navegar bidirecionalmente (para frente e para trás), alterar escolhas e receber feedback visual imediato com explicação didática.

**Independent Test**: Carregar a Questão 1, selecionar uma opção, avançar para a Questão 2, retornar à Questão 1, alterar a opção e validar o feedback/explicação ao confirmar a resposta.

- [x] T007 [P] [US1] Create question card, options list, and navigation button styles in `src/styles/components.css`
- [x] T008 [US1] Implement UI rendering controller for question presentation and option selection handling in `src/ui/ui-controller.js`
- [x] T009 [US1] Implement immediate answer confirmation, correct answer visual highlight, and explanation text display logic in `src/ui/ui-controller.js`
- [x] T010 [US1] Implement bidirectional navigation buttons (Próxima / Anterior) and selection state persistence across screens in `src/ui/ui-controller.js`
- [x] T011 [US1] Create main entry point module `src/ui/main.js` to connect `questions-service.js`, `QuizEngine`, and `ui-controller.js` and link script in `index.html`

**Checkpoint**: Neste ponto, a User Story 1 (MVP) está 100% funcional e testável de forma independente.

---

## Phase 4: User Story 2 - Visualizar Resumo de Desempenho ao Final do Quiz (Priority: P2)

**Goal**: Exibir a tela final de resultados ao concluir a 10ª questão contendo a contagem exata de acertos, erros e o percentual de aproveitamento.

**Independent Test**: Responder a todas as 10 questões do quiz e verificar se a tela final exibe corretamente a quantidade de acertos, erros e porcentagem precisa.

- [x] T012 [P] [US2] Create result summary card and metric badge styles in `src/styles/components.css`
- [x] T013 [US2] Implement result screen rendering logic and metric calculation binding (`totalQuestions`, `correctCount`, `incorrectCount`, `percentage`) in `src/ui/ui-controller.js`
- [x] T014 [US2] Implement smooth transition from 10th question completion to result view in `src/ui/ui-controller.js`

**Checkpoint**: As User Stories 1 e 2 funcionam juntas e podem ser validadas do início ao fim.

---

## Phase 5: User Story 3 - Reiniciar o Quiz (Priority: P3)

**Goal**: Oferecer o botão de reiniciar a qualquer momento e na tela final, sempre exibindo modal de confirmação ("Deseja reiniciar?") antes de resetar o estado.

**Independent Test**: Clicar em "Reiniciar Quiz" durante o quiz ou no resultado final, verificar o surgimento do modal, testar a opção "Cancelar" (mantendo estado) e a opção "Confirmar" (zerando respostas e retornando à Questão 1).

- [x] T015 [P] [US3] Create overlay and dialog modal styles for reset confirmation in `src/styles/components.css`
- [x] T016 [US3] Implement modal controller for reset confirmation dialog in `src/ui/modal-controller.js`
- [x] T017 [US3] Integrate reset trigger button and modal confirmation events into main application flow in `src/ui/ui-controller.js`

**Checkpoint**: Todas as 3 histórias do usuário estão totalmente integradas e operacionais.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Ajustes de usabilidade, audit visual e execução do teste fim a fim

- [x] T018 [P] Audit touch target sizes (min 44px) and mobile responsiveness across smartphone viewports in `src/styles/responsive.css`
- [x] T019 Execute manual validation scenarios defined in `specs/001-quiz-computacional/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências.
- **Foundational (Phase 2)**: Depende da inicialização da Phase 1 - BLOQUEIA todas as User Stories.
- **User Story 1 (Phase 3)**: Depende do término da Phase 2 (Foundational).
- **User Story 2 (Phase 4)**: Depende da Phase 3 (US1).
- **User Story 3 (Phase 5)**: Depende da Phase 3 (US1).
- **Polish (Phase 6)**: Depende da conclusão de todas as User Stories.

---

## Parallel Execution Opportunities

```bash
# Execução paralela da infraestrutura CSS (Fase 1):
T002 em src/styles/main.css
T003 em src/styles/responsive.css

# Execução paralela do Dataset e Engine (Fase 2):
T004 em src/data/questions.json
T006 em src/engine/quiz-engine.js

# Execução paralela de Estilos de Componentes durante as histórias:
T007 [US1] em src/styles/components.css
T012 [US2] em src/styles/components.css
T015 [US3] em src/styles/components.css
```

---

## Implementation Strategy

1. **MVP Primeiro**: Executar Fase 1 + Fase 2 + Fase 3 (User Story 1). Validar o MVP navegando e respondendo questões.
2. **Incremento de Desempenho**: Adicionar Fase 4 (User Story 2) para exibir a tela de resultado final.
3. **Incremento de Usabilidade**: Adicionar Fase 5 (User Story 3) para o modal de confirmação de reinício.
4. **Polimento**: Finalizar com a Fase 6 validando a responsividade mobile e o roteiro de testes.
