/**
 * Questions Service Module
 * Handles loading of questions from local JSON file with fallback support.
 */

// Fallback questions embedded for offline/file:// protocol execution
const FALLBACK_QUESTIONS = [
  {
    "id": 1,
    "statement": "Qual dos seguintes componentes é considerado o 'cérebro' do computador, responsável por processar dados e executar instruções?",
    "options": [
      "Memória RAM",
      "Unidade Central de Processamento (CPU)",
      "Disco Rígido (HD/SSD)",
      "Placa Mãe"
    ],
    "correctIndex": 1,
    "explanation": "A CPU (Central Processing Unit) é o componente principal encarregado de buscar, decodificar e executar as instruções dos programas."
  },
  {
    "id": 2,
    "statement": "O que caracteriza a Memória RAM em um sistema computacional?",
    "options": [
      "É uma memória de armazenamento permanente e não volátil.",
      "É uma memória volátil usada para armazenar dados temporários de programas em execução.",
      "É um dispositivo exclusivo para armazenamento de arquivos de mídia.",
      "É a memória responsável pelo carregamento inicial da BIOS."
    ],
    "correctIndex": 1,
    "explanation": "A RAM (Random Access Memory) é uma memória volátil que perde seus dados quando o computador é desligado, sendo usada para armazenar temporariamente os dados ativos."
  },
  {
    "id": 3,
    "statement": "Em ciência da computação, o que é um Algoritmo?",
    "options": [
      "Um componente físico de hardware dentro do gabinete.",
      "Uma sequência finita de passos bem definidos e lógicos para resolver um problema.",
      "Um tipo de vírus de computador que afeta o sistema operacional.",
      "Uma linguagem de programação de baixo nível."
    ],
    "correctIndex": 1,
    "explanation": "Um algoritmo é um conjunto ordenado e finito de instruções claras que conduz à solução de um problema específico."
  },
  {
    "id": 4,
    "statement": "Qual é a principal função de um Sistema Operacional (ex: Windows, Linux, macOS)?",
    "options": [
      "Compilar programas escritos em linguagens de alto nível.",
      "Gerenciar os recursos de hardware do computador e fornecer uma interface para o usuário e aplicativos.",
      "Proteger o computador exclusivamente contra invasões físicas.",
      "Fornecer conexão direta com a rede mundial de computadores."
    ],
    "correctIndex": 1,
    "explanation": "O Sistema Operacional atua como intermediário entre o usuário/aplicativos e o hardware, gerenciando memória, processos e dispositivos."
  },
  {
    "id": 5,
    "statement": "O que significa a sigla HTTP na Web?",
    "options": [
      "HyperText Transfer Protocol",
      "High Technical Transfer Program",
      "Hyperlink Text Technology Protocol",
      "Home Tool Technical Process"
    ],
    "correctIndex": 0,
    "explanation": "HTTP (HyperText Transfer Protocol) é o protocolo padrão utilizado para a transferência de dados e páginas de hipertexto na World Wide Web."
  },
  {
    "id": 6,
    "statement": "Qual dos seguintes números representa o valor decimal 5 no sistema binário?",
    "options": [
      "010",
      "100",
      "101",
      "111"
    ],
    "correctIndex": 2,
    "explanation": "Em sistema binário, 101 equivale a 1×(2²) + 0×(2¹) + 1×(2⁰) = 4 + 0 + 1 = 5."
  },
  {
    "id": 7,
    "statement": "Qual é a principal diferença entre Software Livre e Software Proprietário?",
    "options": [
      "Software livre não pode ser utilizado para fins comerciais.",
      "Software livre garante aos usuários a liberdade de executar, estudar, modificar e redistribuir o código-fonte.",
      "Software proprietário é sempre gratuito para download.",
      "Software livre não possui direitos autorais."
    ],
    "correctIndex": 1,
    "explanation": "Software Livre refere-se à liberdade dos usuários de usar, modificar e compartilhar o código-fonte, independente de ser pago ou gratuito."
  },
  {
    "id": 8,
    "statement": "Em redes de computadores, qual é a função principal de um Endereço IP?",
    "options": [
      "Identificar o número de série físico da placa de rede.",
      "Identificar e localizar unicamente um dispositivo em uma rede de comunicação.",
      "Criptografar todas as mensagens enviadas pela internet.",
      "Medir a velocidade de transmissão de dados da conexão."
    ],
    "correctIndex": 1,
    "explanation": "O Endereço IP (Internet Protocol) é um identificador numérico atribuído a cada dispositivo conectado a uma rede para permitir o roteamento de dados."
  },
  {
    "id": 9,
    "statement": "O que é um 'Bug' no contexto do desenvolvimento de software?",
    "options": [
      "Uma ferramenta de otimização de velocidade do processador.",
      "Um erro, falha ou defeito no código de um programa que causa um comportamento incorreto ou inesperado.",
      "Um tipo especial de banco de dados relacional.",
      "Uma atualização de segurança recomendada pelo fabricante."
    ],
    "correctIndex": 1,
    "explanation": "Termo usado historicamente para designar qualquer erro ou falha de lógica/sintaxe em um software que impede seu funcionamento correto."
  },
  {
    "id": 10,
    "statement": "Qual estrutura de dados funciona segundo o princípio LIFO (Last In, First Out - O último que entra é o primeiro que sai)?",
    "options": [
      "Fila (Queue)",
      "Pilha (Stack)",
      "Tabela Hash",
      "Matriz Bidimensional"
    ],
    "correctIndex": 1,
    "explanation": "Na estrutura de dados Pilha (Stack), os elementos são adicionados e removidos do topo, seguindo a regra LIFO."
  }
];

export class QuestionsService {
  /**
   * Fetches questions array from local JSON or uses fallback.
   * @returns {Promise<Array>} Array of 10 question objects.
   */
  static async loadQuestions() {
    try {
      const response = await fetch('./src/data/questions.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const questions = await response.json();
      if (Array.isArray(questions) && questions.length === 10) {
        return questions;
      }
      console.warn('JSON loaded does not contain 10 questions. Using fallback data.');
      return FALLBACK_QUESTIONS;
    } catch (error) {
      console.warn('Could not fetch questions.json via HTTP (likely local file:// mode). Using fallback questions.', error);
      return FALLBACK_QUESTIONS;
    }
  }
}
