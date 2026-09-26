# Feature Specification: Quiz Computacional

**Feature Branch**: `001-quiz-computacional`

**Created**: 2026-09-26

**Status**: Draft

**Input**: User description: "Desenvolver uma aplicação educacional chamada Quiz Computacional. A aplicação permitirá que um estudante pratique conhecimentos básicos de Computação respondendo questões de múltipla escolha. Ao iniciar o quiz, o estudante deverá visualizar uma questão por vez. Cada questão deverá apresentar: o enunciado; quatro alternativas; apenas uma alternativa correta. O estudante deverá selecionar uma alternativa e confirmar sua resposta. Depois da confirmação, a aplicação deverá informar se a resposta está correta ou incorreta. O estudante poderá então avançar para a próxima questão. O quiz terá inicialmente 10 questões. Ao finalizar todas as questões, a aplicação deverá apresentar: quantidade de acertos; quantidade de erros; percentual de acertos. O estudante deverá poder reiniciar o quiz. Não haverá cadastro ou autenticação nesta primeira versão."

## Clarifications

### Session 2026-09-26

- Q: Quando o estudante escolhe uma alternativa incorreta, a aplicação deve apenas indicar o erro ou também destacar qual era a alternativa correta? → A: Exibir o indicador de resposta incorreta, destacar a alternativa correta e apresentar uma breve explicação didática sobre o conceito da questão.
- Q: O estudante deve poder voltar para revisar questões anteriores durante o quiz ou a navegação deve ser estritamente sequencial (apenas para a frente)? → A: Permitir voltar a qualquer questão anterior e alterar a resposta antes do término do quiz.
- Q: Quando o estudante clica no botão de reiniciar no meio do quiz (antes da 10ª questão), a aplicação deve pedir confirmação ou reiniciar imediatamente? → A: Solicitar confirmação sempre através de um modal/alerta ("Deseja reiniciar?") antes de zerar o progresso.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Responder e Navegar entre Questões do Quiz (Priority: P1)

Como estudante, quero visualizar uma questão de múltipla escolha por vez, selecionar a alternativa desejada, navegar livremente entre as questões (avançar e voltar) e alterar minhas respostas antes da finalização do quiz, para praticar e revisar meu conhecimento.

**Why this priority**: É o fluxo de aprendizado central e indispensável da aplicação (MVP). Sem a apresentação da questão, seleção, confirmação e navegação flexível, a aplicação não cumpre sua função educacional.

**Independent Test**: Pode ser testado de forma independente navegando entre as questões, selecionando respostas, voltando a questões anteriores e alterando a opção escolhida. O teste é bem-sucedido se a aplicação permitir navegar para frente e para trás, refletir as respostas alteradas e exibir o feedback/explicação correspondente.

**Acceptance Scenarios**:

1. **Given** que o estudante inicia a aplicação, **When** a tela do quiz carrega, **Then** o sistema exibe a primeira questão com enunciado e exatamente 4 alternativas desmarcadas.
2. **Given** que o estudante selecionou uma alternativa na questão atual, **When** ele clica em confirmar ou avança para a próxima questão, **Then** o sistema registra a resposta e fornece feedback visual.
3. **Given** que o estudante avançou para uma questão seguinte (ex: questão 3), **When** ele clica em "Voltar", **Then** a aplicação retorna à questão anterior (ex: questão 2), exibindo a alternativa previamente selecionada e permitindo alterar a seleção.

---

### User Story 2 - Visualizar Resumo de Desempenho ao Final do Quiz (Priority: P2)

Como estudante, quero visualizar um resumo claro com a quantidade de acertos, erros e o percentual de aproveitamento ao concluir a 10ª questão, para avaliar meu nível de conhecimento em Computação.

**Why this priority**: É essencial para fechar o ciclo de aprendizagem do estudante e dar visibilidade sobre seu desempenho geral.

**Independent Test**: Pode ser testado respondendo às 10 questões do quiz até o final. O teste passa se ao concluir a 10ª questão for apresentada uma tela final com o total correto de acertos, erros e porcentagem precisa calculada a partir das últimas respostas salvas.

**Acceptance Scenarios**:

1. **Given** que o estudante respondeu a todas as 10 questões, **When** finaliza o quiz, **Then** a aplicação apresenta a tela de resultados finais contendo a quantidade total de acertos, a quantidade total de erros e o percentual de acertos (ex: 8 acertos, 2 erros = 80%).

---

### User Story 3 - Reiniciar o Quiz (Priority: P3)

Como estudante, quero poder reiniciar o quiz a qualquer momento ou após visualizar o resultado final (com confirmação previa), para refazer as questões e praticar novamente sem riscos de perda acidental de progresso.

**Why this priority**: Permite que o estudante repita o treino sem precisar recarregar manualmente a página ou perder o controle da aplicação.

**Independent Test**: Pode ser testado clicando no botão "Reiniciar Quiz" na tela final ou durante a execução do quiz e confirmando a caixas de diálogo. O teste passa se após a confirmação a aplicação retornar à 1ª questão e zerar a contagem de acertos/erros.

**Acceptance Scenarios**:

1. **Given** que o estudante clica no botão "Reiniciar Quiz" (no meio do quiz ou na tela final), **When** a caixa de confirmação ("Deseja reiniciar?") é exibida e o estudante confirma a ação, **Then** a aplicação retorna à primeira questão, zera o contador de pontuação/respostas e permite responder novamente desde o início.

---

### Edge Cases

- **Tentativa de avançar sem selecionar alternativa**: O sistema deve alertar ou impedir a navegação/finalização enquanto existirem questões não respondidas, ou considerar questões em branco como incorretas na finalização.
- **Navegação involuntária ou atualização de página**: Como não há autenticação ou persistência externa no MVP v1, recarregar a página reiniciará o quiz a partir da primeira questão.
- **Alteração de resposta em questão anterior**: Ao voltar para uma questão anterior e alterar a alternativa selecionada, o sistema atualiza a resposta gravada e recalcula a pontuação ao finalizar.
- **Cancelamento do reinício**: Se o estudante clicar em "Cancelar" no modal de confirmação de reinício, o estado atual do quiz e o progresso da tentativa são totalmente preservados.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE apresentar uma questão por vez, exibindo um enunciado claro e exatamente 4 alternativas de resposta.
- **FR-002**: O sistema DEVE garantir que cada questão possua estritamente uma única alternativa correta.
- **FR-003**: O sistema DEVE permitir que o estudante selecione uma alternativa para cada questão apresentada.
- **FR-004**: O sistema DEVE fornecer feedback imediato indicando se a resposta confirmada está correta ou incorreta; em caso de erro, DEVE destacar visualmente a alternativa correta e exibir uma breve explicação didática sobre o conceito.
- **FR-005**: O sistema DEVE permitir que o estudante navegue livremente entre as questões (avançar e voltar) e altere sua resposta escolhida a qualquer momento antes da finalização do quiz.
- **FR-006**: O sistema DEVE manter o histórico de seleções do estudante durante a sessão, atualizando a pontuação final com base na última alternativa escolhida para cada questão.
- **FR-007**: O sistema DEVE conter um conjunto inicial fixo de 10 questões focadas em conhecimentos básicos de Computação.
- **FR-008**: O sistema DEVE calcular automaticamente e apresentar na tela final: a quantidade de acertos, a quantidade de erros e o percentual de acertos.
- **FR-009**: O sistema DEVE disponibilizar uma funcionalidade para reiniciar o quiz a qualquer momento ou na tela final, SEMPRE exibindo um alerta ou modal de confirmação ("Deseja reiniciar?") para evitar perdas acidentais de progresso.
- **FR-010**: O sistema DEVE operar sem necessidade de cadastro, login ou qualquer mecanismo de autenticação de usuários nesta primeira versão.

### Key Entities

- **Questão**: Representa a unidade de avaliação do quiz, composta por identificador, enunciado, lista com exatamente 4 alternativas, índice da alternativa correta e uma breve explicação didática do conceito.
- **Alternativa**: Opção de resposta associada a uma questão.
- **Sessão do Quiz**: Controla o estado dinâmico da tentativa atual do estudante (índice da questão corrente, alternativas selecionadas para cada uma das 10 questões, estado de confirmação e pontuação).
- **Resultado Final**: Estrutura de resumo gerada ao concluir a 10ª questão, contendo contagem de acertos, erros e o percentual de aproveitamento.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos estudantes conseguem navegar livremente entre as questões (para frente e para trás) e alterar suas respostas antes de finalizar o quiz.
- **SC-002**: O cálculo do resultado final ao término das 10 questões é 100% exato e determinístico refletindo as últimas alternativas selecionadas.
- **SC-003**: O tempo de resposta para troca de questão e exibição de estado/feedback é inferior a 300ms.
- **SC-004**: O estudante consegue reiniciar o quiz e retornar à primeira questão em até 2 cliques (1 clique no botão reiniciar + 1 clique no modal de confirmação).

## Assumptions

- O aplicativo será construído como uma aplicação web front-end simples e responsiva, sem dependência de banco de dados ou servidores backend complexos (conforme princípio de Simplicidade e Minimalismo da Constituição).
- As 10 questões iniciais cobrem conceitos fundamentais de Computação (como hardware, software, redes, algoritmos e lógica).
- O estado da sessão é armazenado apenas na memória da aplicação do cliente durante a execução.
