const { useState, useEffect } = React;

// é as variáveis dos gráficos (nem toque nisso aqu)

let graficoFinanceiro = null;
let graficoCategorias = null;

function App() {

  // Estados principais (essas paradas são as variaveis que guardam os dados e tals)

  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("Outros");
  const [erro, setErro] = useState("");

  // Controle de tipos de gráficos ( essa parada são as variaveis que controlam os graficos e pá)
  const [tipoGraficoFinanceiro, setTipoGraficoFinanceiro] = useState("doughnut");
  const [tipoGraficoCategorias, setTipoGraficoCategorias] = useState("bar");
  const [abaAtiva, setAbaAtiva] = useState("despesas");

  const categoriasDisponiveis = [
    "Alimentação", "Transporte", "Lazer", "Saúde", "Educação", "Moradia", "Outros"
  ];

  // Adicionar nova transação (auto explicativo)

  const adicionarTransacao = (tipo) => {
    if (!descricao || !valor || !data || !categoria) {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");
    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: tipo === "receita" ? Math.abs(parseFloat(valor)) : -Math.abs(parseFloat(valor)),
      data,
      categoria
    };
    setTransacoes([novaTransacao, ...transacoes]);
    setDescricao(""); setValor(""); setData(""); setCategoria("Outros");
  };

  // Remover transação ( é o X que aparece do lado das transação lá)

  const removerTransacao = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  // Totais principais (auto explicativo)

  const totalReceitas = transacoes.filter(t => t.valor > 0).reduce((soma,t)=>soma+t.valor,0);
  const totalDespesas = transacoes.filter(t => t.valor < 0).reduce((soma,t)=>soma+t.valor,0);
  const saldoAtual = totalReceitas + totalDespesas;

  // (Complicado) - isso daqui soma por categoria o valor total das receitas ou despesas relacionados as categorias e tals

  const somaPorCategoria = (tipo) => {
    const filtro = tipo === "receita" ? (t => t.valor > 0) : (t => t.valor < 0);
    const valores = {};
    transacoes.filter(filtro).forEach(t => {
      valores[t.categoria] = (valores[t.categoria] || 0) + Math.abs(t.valor);
    });
    return valores;
  };

  // Renderização e atualização dos graficos
  useEffect(() => {
    const ctx = document.getElementById("graficoFinanceiro");
    const ctxCategorias = document.getElementById("graficoCategorias");

    const dadosCategorias = somaPorCategoria(abaAtiva);

    // Gráfico de receitas e despesas (mais pra baixo tem mais grafico)
    if (!graficoFinanceiro) {
      graficoFinanceiro = new Chart(ctx, {
        type: tipoGraficoFinanceiro,
        data: {
          labels: ["Receitas", "Despesas"],
          datasets: [{
            data: transacoes.length === 0 ? [1,1] : [totalReceitas, Math.abs(totalDespesas)],
            backgroundColor: ["#4caf50", "#f44336"]
          }]
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } }
      });
    } else {
      graficoFinanceiro.config.type = tipoGraficoFinanceiro;
      graficoFinanceiro.data.datasets[0].data = transacoes.length === 0 ? [1,1] : [totalReceitas, Math.abs(totalDespesas)];
      graficoFinanceiro.update();
    }

    // Gráfico por categorias (se liga que tem um monte de coisa repetida, mas é pq são graficos diferentes)

    if (!graficoCategorias) {
      graficoCategorias = new Chart(ctxCategorias, {
        type: tipoGraficoCategorias,
        data: {
          labels: Object.keys(dadosCategorias),
          datasets: [{
            label: abaAtiva === "receita" ? "Receitas por Categoria" : "Despesas por Categoria",
            data: Object.values(dadosCategorias),
            backgroundColor: ["#ff6384","#ff9f40","#ffcd56","#4bc0c0","#36a2eb","#9966ff","#c9cbcf"]
          }]
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } }
      });
    }
    // isso daqui é pra ficar atualizando os graficos e tal
      else {
      graficoCategorias.config.type = tipoGraficoCategorias;
      graficoCategorias.data.labels = Object.keys(dadosCategorias);
      graficoCategorias.data.datasets[0].label = abaAtiva === "receita" ? "Receitas por Categoria" : "Despesas por Categoria";
      graficoCategorias.data.datasets[0].data = Object.values(dadosCategorias);
      graficoCategorias.update();
    }

  }, [transacoes, tipoGraficoFinanceiro, tipoGraficoCategorias, abaAtiva]);
  return (
    <div className="container">

      {/* Saldo geral (auto explicativo) */}

      <div className="card">
        <h1>Controle de Finanças</h1>
        <h2>Saldo: R$ {saldoAtual.toFixed(2)}</h2>
      </div>

      {/* Parada pra criar uma nova transação (auto explicativo) */}

      <div className="card">
        <h3>Nova Transação</h3>
        {erro && <p style={{color:"red", fontWeight:"bold"}}>{erro}</p>}
        <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {categoriasDisponiveis.map(cat => (<option key={cat}>{cat}</option>))}
        </select>

        <div style={{display:"flex", justifyContent:"space-between", marginTop:"0.5rem"}}>
          <button className="receita" onClick={() => adicionarTransacao("receita")}>+ Receita</button>
          <button className="despesa" onClick={() => adicionarTransacao("despesa")}>- Despesa</button>
        </div>
      </div>


      {/* Resumo das despesas e receitas*/}

      <div className="card">
        <h3>Resumo</h3>
        <p>Receitas: <b style={{color:"green"}}>R$ {totalReceitas.toFixed(2)}</b></p>
        <p>Despesas: <b style={{color:"red"}}>R$ {Math.abs(totalDespesas).toFixed(2)}</b></p>
        <p>Saldo: <b>R$ {saldoAtual.toFixed(2)}</b></p>
      </div>

      {/* Histórico de transações */}
      
      <div className="card">
        <h3>Histórico</h3>
        <ul>
          {transacoes.map(t => (
            <li key={t.id} style={{color: t.valor<0?"red":"green", display:"flex", flexDirection:"column", marginBottom:"0.5rem"}}>
              <span><b>{t.descricao}</b> - {t.categoria}</span>
              <span>R$ {t.valor.toFixed(2)} | {t.data}</span>
              <button
                onClick={() => removerTransacao(t.id)}
                style={{background:"gray", padding:"0.3rem 0.6rem", marginTop:"0.3rem", alignSelf:"flex-start"}}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Daqui pra baixo é grafico */}

      <div className="graficos-grid">
        {/* aqui é o primeiro graficp */}
        <div className="card">
          <h3>Receitas vs Despesas</h3>
          <label>Tipo de Gráfico: </label>
          <select value={tipoGraficoFinanceiro} onChange={(e)=>setTipoGraficoFinanceiro(e.target.value)}>
            <option value="doughnut">Pizza (Doughnut)</option>
            <option value="bar">Barra</option>
          </select>
          <canvas id="graficoFinanceiro"></canvas>
        </div>

        {/* Gráfico por categoria (função pra alterar os graficos relacionados a categorias e tals) */}

        <div className="card">
          <h3>Gráficos por Categoria</h3>
          <div style={{display:"flex", gap:"0.5rem", marginBottom:"0.5rem"}}>
            <button onClick={()=>setAbaAtiva("despesas")} style={{flex:1, background: abaAtiva==="despesas"?"#f44336":"#ddd", color: abaAtiva==="despesas"?"#fff":"#000"}}>Despesas</button>
            <button onClick={()=>setAbaAtiva("receita")} style={{flex:1, background: abaAtiva==="receita"?"#4caf50":"#ddd", color: abaAtiva==="receita"?"#fff":"#000"}}>Receitas</button>
          </div>
          <label>Tipo de Gráfico: </label>
          <select value={tipoGraficoCategorias} onChange={(e)=>setTipoGraficoCategorias(e.target.value)}>
            <option value="bar">Barra</option>
            <option value="doughnut">Pizza (Doughnut)</option>
          </select>
          <canvas id="graficoCategorias"></canvas>
        </div>
      </div>
    </div>
  );
}

// Renderização ( isso faz aparecer as paradas na tela)
ReactDOM.createRoot(document.getElementById("root")).render(<App />);







// TÔ CANSADO VOU DORMIR e se lembrem de tirar os comentários depois 

// ass: Felipe 