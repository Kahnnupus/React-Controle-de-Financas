# Controle de Finanças em React

Aplicação web desenvolvida pela Albinstech para simplificar o gerenciamento financeiro pessoal. O sistema centraliza o registro de entradas e saídas financeiras, gerando relatórios visuais automáticos para facilitar a análise de gastos e receitas.

---

## Sobre o Projeto

O objetivo principal desta ferramenta é oferecer um painel direto e intuitivo para o acompanhamento do orçamento diário. Construída em React, a interface atualiza métricas e dados gráficos instantaneamente a cada nova movimentação cadastrada pelo usuário.

### Recursos

* **Entrada de dados:** Registro detalhado de transações informando descrição, valor monetário, data e categoria.
* **Métricas visuais:** Gráficos interativos renderizados via Chart.js que dividem os valores por tipo (receita ou despesa) e por categorias específicas.
* **Painel reativo:** Recálculo imediato de totais e indicadores a cada inclusão ou remoção de item.
* **Validação de campos:** Checagem preventiva para evitar o envio de dados em branco ou inconsistentes.

---

## Tecnologias Empregadas

* **React:** Construção de interface reativa utilizando Hooks nativos (`useState`, `useEffect`) para controle de estado e ciclo de vida.
* **Chart.js:** Renderização de gráficos dinâmicos para visualização analítica dos dados.
* **HTML5 e CSS3:** Estrutura semântica e estilização dos componentes.

---

## Estrutura de Arquivos

```text
React-Controle-de-Financas-main/
│
├── app.jsx            # Componente central com a lógica de negócio e renderização
├── index.html         # Página base da aplicação
├── style.css          # Folha de estilos e layout visual
├── favicon.png        # Ícone de navegador
├── logo app.png       # Identidade visual da aplicação
├── README.md          # Documentação do projeto
└── video_att_.mov     # Demonstração do funcionamento da interface
```

---

## Arquitetura e Fluxo de Dados

A aplicação gerencia o fluxo de informações internamente por meio de estados locais no componente principal:

* `transacoes`: Coleção de objetos contendo todo o histórico de entradas e saídas.
* `descricao`, `valor`, `data`, `categoria`: Estados dedicados a capturar e manter o valor dos campos do formulário antes do envio.
* `erro`: Armazena mensagens de feedback caso a validação do formulário aponte pendências.
* `abaAtiva`: Define a visualização atual do usuário entre o painel de receitas ou despesas.
* `tipoGraficoFinanceiro` e `tipoGraficoCategorias`: Configuram parâmetros de exibição dos relatórios visuais.

### Principais Métodos

* `validarInputs()`: Confirma o preenchimento correto de todos os campos obrigatórios antes do processamento.
* `adicionarTransacao(tipo)`: Formata os dados do formulário e os consolida como uma nova receita ou despesa na lista.
* `atualizarGraficos()`: Repassa o conjunto de dados atualizado para as instâncias do Chart.js.
* `filtrarTransacoes(tipo)`: Separa as movimentações registradas de acordo com a aba ou o filtro selecionado.
* `removerTransacao(index)`: Exclui um registro específico e dispara a atualização das métricas.

---

## Próximos Passos e Melhorias

* Implementação de filtros temporais para análise de dados por mês, trimestre ou ano.
* Exportação de demonstrativos e relatórios em formatos como PDF e planilhas (CSV/Excel).
* Autenticação de usuários para suporte a múltiplos perfis individuais.
* Persistência em nuvem utilizando serviços de backend como Supabase ou Firebase.
