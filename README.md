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
├─ PinDown.io_@KillyanAZ_1758799301.mp4 → Vídeo de demonstração
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

## Instalação e Execução

1. **Baixe o projeto** ou clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd React-Controle-de-Financas-main
````

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Rode o projeto localmente**:

   ```bash
   npm run dev   # ou   npm start
   ```

4. **Acesse no navegador**:

   ```
   http://localhost:5173
   ou
   http://localhost:3000
   ```

---

## Trecho Importante do Código – `App.jsx`


```javascript
// Importações principais
import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erro, setErro] = useState('');
  const [tipoGraficoFinanceiro, setTipoGraficoFinanceiro] = useState('doughnut');
  const [tipoGraficoCategorias, setTipoGraficoCategorias] = useState('bar');
  const [abaAtiva, setAbaAtiva] = useState('receitas');

  function validarInputs() {
    if (!descricao || !valor || !data || !categoria) {
      setErro('Preencha todos os campos obrigatórios.');
      return false;
    }
    setErro('');
    return true;
  }

  function adicionarTransacao(tipo) {
    if (!validarInputs()) return;
    const nova = { descricao, valor: parseFloat(valor), data, categoria, tipo };
    setTransacoes([...transacoes, nova]);
    atualizarGraficos();
  }

  function atualizarGraficos() {
    // lógica de atualização dos gráficos Chart.js
  }

  function removerTransacao(index) {
    const lista = [...transacoes];
    lista.splice(index, 1);
    setTransacoes(lista);
    atualizarGraficos();
  }

  return (
    <div>
      {/* Código JSX de interface */}
    </div>
  );
}

export default App;
```

---

## 🚀 Extensões Futuras

* Implementar **filtros por período** (mês, ano).
* Exportar relatórios em **PDF/Excel**.
* Criar **sistema de autenticação de usuário**.
* Integração com banco de dados (ex.: **Firebase** ou **Supabase**).

```
```
