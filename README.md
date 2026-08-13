# CargoFlow

Aplicação frontend desenvolvida como desafio técnico para simular um módulo operacional utilizado em um recinto alfandegado (Porto Seco).

O sistema permite acompanhar operações, consultar documentos e realizar o fluxo de averbação de forma simulada, com foco em organização de código, experiência do usuário, responsividade e tratamento de regras de negócio no frontend.

## Demo

A aplicação está disponível em:

https://cargoflow-psi.vercel.app/

## Funcionalidades

### Login

- Tela de acesso à aplicação
- Validação dos campos do formulário
- Redirecionamento para o Dashboard após o login
- Autenticação simulada, conforme escopo do desafio

### Dashboard

- Visão geral das operações
- Indicadores por modal:
  - Aéreo
  - Marítimo
  - Rodoviário
- Acompanhamento do fluxo documental
- Visualização de documentos recentes
- Fila de processamento com diferentes estados
- Indicadores de sucesso, processamento e falha

### Averbação

- Consulta de operação através do número da DTA
- Validação do formato informado
- Exibição dos dados da operação encontrada
- Seleção entre processos DI e DUIMP
- Campos condicionais conforme o tipo de processo
- Upload e validação dos documentos obrigatórios
- Validação dos campos com React Hook Form e Zod
- Feedback visual durante o envio
- Simulação de sucesso e falha no processamento
- Geração de protocolo após envio bem-sucedido

### Documentos

- Consulta por DTA, DI ou DUIMP
- Validação dos formatos informados
- Exibição das operações encontradas
- Identificação visual do status da operação
- Visualização dos dados detalhados
- Listagem dos arquivos vinculados

## Validações

Os números dos documentos seguem os formatos definidos no desafio:

```text
DTA:   25/0000000-1
DI:    25/0000000-1
DUIMP: 26BR0000123456-7
```

Os formulários também possuem validações para campos obrigatórios e regras específicas de DI e DUIMP.

## Dados para teste

A aplicação utiliza dados simulados para permitir a navegação e avaliação dos fluxos sem necessidade de backend.

Alguns documentos disponíveis para consulta:

```text
DTA
25/0004821-7

DI
25/9876543-1

DUIMP
26BR0000123456-7
```

Também existe um cenário de falha disponível na averbação.

Para simulá-lo, utilize no campo **Código de referência**:

```text
SIMULAR-ERRO
```

## Simulação da API

Como o desafio não possui backend, as operações são simuladas utilizando **Mock Service Worker (MSW)**.

Os mocks representam chamadas HTTP para consulta de documentos, consulta de DTA e envio de averbações.

Foram adicionados pequenos delays às respostas para representar o comportamento assíncrono de uma API e permitir a visualização dos estados de carregamento e feedback da interface.

Os dados utilizados nas consultas estão localizados em:

```text
mocks/data/
```

e os endpoints simulados estão definidos em:

```text
mocks/handlers.ts
```

Essa abordagem mantém a camada de interface desacoplada dos dados simulados e permite que futuramente os mocks sejam substituídos por uma API real com poucas alterações na camada de consumo.

## Tecnologias

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Mock Service Worker (MSW)
- Lucide React
- ESLint

## Estrutura do projeto

```text
app/
├── averbacao/
├── dashboard/
├── documentos/
└── login/

components/
├── averbacao/
├── dashboard/
├── documentos/
├── layout/
├── providers/
└── ui/

lib/
├── api/
└── validations/

mocks/
├── data/
├── browser.ts
└── handlers.ts

types/
```

A organização separa páginas, componentes de domínio, componentes reutilizáveis, validações, comunicação com API simulada, mocks e tipagens.

## Decisões de implementação

### Navegação

A aplicação utiliza o App Router do Next.js e navegação client-side, permitindo transições entre as áreas sem recarregamento completo da página.

O Sidebar identifica automaticamente a rota ativa para fornecer feedback visual durante a navegação.

### Processamento assíncrono

O fluxo foi pensado considerando que um operador pode trabalhar com diversos documentos durante o expediente.

Os estados de processamento são representados individualmente na interface, permitindo comunicar visualmente operações:

- em processamento;
- concluídas;
- com falha.

Falhas são tratadas individualmente e não representam interrupção das demais operações simuladas.

### Interface

A interface foi desenvolvida com foco em um ambiente operacional, priorizando:

- hierarquia visual;
- leitura rápida de status;
- consistência entre componentes;
- feedback das ações;
- responsividade;
- acessibilidade;
- navegação clara em desktop e dispositivos móveis.

## Como executar

Clone o repositório e instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

## Validação do projeto

Antes da entrega foram executados:

```bash
npm run lint
npm run build
```

O projeto possui build de produção compatível com o deploy na Vercel.

## Observações

Este projeto foi desenvolvido exclusivamente como desafio técnico frontend.

Não existe persistência real de dados ou autenticação integrada a um backend. Consultas, envios e processamentos são simulados para representar os comportamentos esperados da interface e permitir a avaliação dos diferentes estados da aplicação.

---

Desenvolvido por **Jessica Lyra**.