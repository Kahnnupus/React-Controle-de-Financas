const { useState, useEffect } = React;
let graficoFinanceiro = null;
let graficoCategorias = null;

function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("Outros");
  const [erro, setErro] = useState("");
  const [tipoGraficoFinanceiro, setTipoGraficoFinanceiro] = useState("doughnut");
  const [tipoGraficoCategorias, setTipoGraficoCategorias] = useState("bar");
  const [abaAtiva, setAbaAtiva] = useState("despesas");

  const categoriasDisponiveis = [
    "Salário","Alimentação", "Transporte", "Lazer", "Saúde", "Educação", "Moradia", "Outros"
  ];

  const validarInputs = () => {
    if (!descricao) return "O campo 'Descrição' deve ser preenchido.";
    if (!valor) return "O campo 'Valor' deve ser preenchido.";
    if (!data) return "O campo 'Data' deve ser preenchido.";
    if (!categoria) return "Selecione uma categoria.";
    return "";
  };

  const adicionarTransacao = (tipo) => {
    const erroValidacao = validarInputs();
    if (erroValidacao) {
      setErro(erroValidacao);
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

  const removerTransacao = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const totalReceitas = transacoes.filter(t => t.valor > 0).reduce((soma,t)=>soma+t.valor,0);
  const totalDespesas = transacoes.filter(t => t.valor < 0).reduce((soma,t)=>soma+t.valor,0);
  const saldoAtual = totalReceitas + totalDespesas;

  const somaPorCategoria = (tipo) => {
    const filtro = tipo === "receita" ? (t => t.valor > 0) : (t => t.valor < 0);
    const valores = {};
    transacoes.filter(filtro).forEach(t => {
      valores[t.categoria] = (valores[t.categoria] || 0) + Math.abs(t.valor);
    });
    return valores;
  };

  useEffect(() => {
    const ctx = document.getElementById("graficoFinanceiro");
    const ctxCategorias = document.getElementById("graficoCategorias");
    const dadosGerais = { Receitas: totalReceitas, Despesas: Math.abs(totalDespesas) };
    const dadosCategorias = somaPorCategoria(abaAtiva);
    Chart.defaults.font.family = "Poppins";
    Chart.defaults.font.size = 13;
    Chart.defaults.font.weight = 600;
    Chart.defaults.color = "#fff"; 

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: function(context) {
              let valor = context.raw;
              return "R$ " + valor.toLocaleString("pt-BR");
            }
          }
        }
      }
    };

    if (!graficoFinanceiro) {
      graficoFinanceiro = new Chart(ctx, {
        type: tipoGraficoFinanceiro,
        data: {
          labels: ["Receitas", "Despesas"],
          datasets: [{
            label: "Receitas vs Despesas",
            data: [totalReceitas, Math.abs(totalDespesas)],
            backgroundColor: ["#5e18df", "#d32056"]
          }]
        },
        options: chartOptions
      });
    } else {
      graficoFinanceiro.config.type = tipoGraficoFinanceiro;
      graficoFinanceiro.options = chartOptions;
      graficoFinanceiro.data.labels = Object.keys(dadosGerais);
      graficoFinanceiro.data.datasets[0].labels = ["Receitas vs Despesas"];
      graficoFinanceiro.data.datasets[0].data = [totalReceitas, Math.abs(totalDespesas)];
      graficoFinanceiro.update();
    }

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
        options: chartOptions
      });
    } else {
      graficoCategorias.config.type = tipoGraficoCategorias;
      graficoCategorias.options = chartOptions;
      graficoCategorias.data.labels = Object.keys(dadosCategorias);
      graficoCategorias.data.datasets[0].label =
        abaAtiva === "receita" ? "Receitas por Categoria" : "Despesas por Categoria";
      graficoCategorias.data.datasets[0].data = Object.values(dadosCategorias);
      graficoCategorias.update();
    }
  }, [transacoes, tipoGraficoFinanceiro, tipoGraficoCategorias, abaAtiva]);

  return (
    <div className="container">
      <div className="card saldo">
        <div className="saldo-top">
          <span className="saldo-label">Saldo Atual · BRL</span>
        </div>
        <div className="saldo-balance">
          R$ {saldoAtual.toFixed(2)}
        </div>
      </div>

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

      <div className="card">
        <h3>Resumo</h3>
        <p>Receitas: <b style={{color:"#5e18df"}}>R$ {totalReceitas.toFixed(2)}</b></p>
        <p>Despesas: <b style={{color:"#d32056"}}>R$ {Math.abs(totalDespesas).toFixed(2)}</b></p>
        <p>Saldo: <b>R$ {saldoAtual.toFixed(2)}</b></p>
      </div>

      <div className="card">
        <h3>Histórico</h3>
        <ul>
          {transacoes.map(t => (
            <li key={t.id}>
              <span>
                <b style={{color:"#fff"}}>{t.descricao}</b> - <span style={{color:"#fff"}}>{t.categoria}</span>
              </span>
              <span>
                <b className={t.valor < 0 ? "valor-despesa" : "valor-receita"}>
                  R$ {t.valor.toFixed(2)}
                </b>
                {" | "}
                <span className="data">{t.data}</span>
              </span>
              <button onClick={()=>removerTransacao(t.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="graficos-grid">
        <div className="card">
          <h3>Receitas vs Despesas</h3>
          <label>Tipo de Gráfico: </label>
          <select value={tipoGraficoFinanceiro} onChange={(e)=>setTipoGraficoFinanceiro(e.target.value)}>
            <option value="doughnut">Pizza</option>
            <option value="bar">Barra</option>
          </select>
          <canvas id="graficoFinanceiro"></canvas>
        </div>

        <div className="card">
          <h3>Gráficos por Categoria</h3>
          <div style={{display:"flex", gap:"0.5rem", marginBottom:"0.5rem"}}>
            <button onClick={()=>setAbaAtiva("receita")} style={{flex:1, background: abaAtiva==="receita"?"#5e18df":"#ddd", color: abaAtiva==="receita"?"#fff":"#000"}}>Receitas</button>
            <button onClick={()=>setAbaAtiva("despesas")} style={{flex:1, background: abaAtiva==="despesas"?"#d32056":"#ddd", color: abaAtiva==="despesas"?"#fff":"#000"}}>Despesas</button>           
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
