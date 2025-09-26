```markdown
# React-Controle-de-Financas

## Documentação Expandida – React Controle de Finanças

**Projeto:** React Controle de Finanças – Albinstech  
**Descrição:**  
Sistema React de controle financeiro desenvolvido pela Albinstech.  
Este documento serve como guia técnico completo, incluindo visão geral, arquitetura, diagramas, trechos de código e estrutura de pastas.

---

## Visão Geral do Sistema

O sistema permite o **cadastro de transações financeiras** (receitas e despesas), exibindo **gráficos dinâmicos** com estatísticas em tempo real.  
Foi desenvolvido em **React**, utilizando **Hooks** (`useState`, `useEffect`) para gerenciamento de estado, e a biblioteca **Chart.js** para visualização de dados.

### Principais funcionalidades:
- Cadastro de transações com **descrição**, **valor**, **data** e **categoria**.
- Visualização de **gráficos por tipo e categoria** (despesas/receitas).
- Atualização dinâmica das estatísticas a cada nova transação.

---

## Estrutura do Projeto

A aplicação é composta pelos seguintes arquivos e pastas detectados:



React-Controle-de-Financas-main/
│
├─ app.jsx            → Componente principal da aplicação React
├─ index.html         → Estrutura HTML base
├─ style.css          → Estilos globais
├─ favicon.png        → Ícone do site
├─ logo app.png       → Logotipo do aplicativo
├─ README.md          → Documentação básica
└─ video_att_.mov     → Vídeo de demonstração

````
````
---

## Estados Principais (`useState`)

Os estados controlam dados e comportamento da aplicação:

- **transacoes**: lista de todas as transações.  
- **descricao, valor, data, categoria**: inputs do formulário.  
- **erro**: mensagens de validação.  
- **tipoGraficoFinanceiro** e **tipoGraficoCategorias**: configurações de gráficos.  
- **abaAtiva**: alterna entre despesas e receitas.

---

## Funções Importantes

- **validarInputs()**: Verifica se todos os campos obrigatórios estão preenchidos.  
- **adicionarTransacao(tipo)**: Cria uma nova transação (receita ou despesa).  
- **atualizarGraficos()**: Atualiza os gráficos com base nas transações.  
- **filtrarTransacoes(tipo)**: Filtra apenas receitas ou despesas.  
- **removerTransacao(index)**: Exclui uma transação da lista.
---

## 🚀 Extensões Futuras

* Implementar **filtros por período** (mês, ano).
* Exportar relatórios em **PDF/Excel**.
* Criar **sistema de autenticação de usuário**.
* Integração com banco de dados (ex.: **Firebase** ou **Supabase**).

```
```
