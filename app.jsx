const { useState, useEffect } = React;
let graficoFinanceiro = null;
function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const adicionarReceita = () => {
    if (!descricao || !valor) return;
    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: Math.abs(parseFloat(valor))
    };
    setTransacoes([novaTransacao, ...transacoes]);
    setDescricao(""); setValor("");
  };

  const adicionarDespesa = () => {
    if (!descricao || !valor) return;
    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: -Math.abs(parseFloat(valor))
    };
    setTransacoes([novaTransacao, ...transacoes]);
    setDescricao(""); setValor("");
  };

  const removerTransacao = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const totalReceitas = transacoes.filter(t => t.valor > 0).reduce((soma,t)=>soma+t.valor,0);
  const totalDespesas = transacoes.filter(t => t.valor < 0).reduce((soma,t)=>soma+t.valor,0);
  const saldoAtual = totalReceitas + totalDespesas;

  useEffect(() => {
    const ctx = document.getElementById("graficoFinanceiro");

    if (!graficoFinanceiro) {
      graficoFinanceiro = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Receitas", "Despesas"],
          datasets: [{
            data: transacoes.length === 0 ? [1, 1] : [totalReceitas || 0, Math.abs(totalDespesas) || 0],
            backgroundColor: ["#4caf50", "#f44336"]
          }]
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } }
      });
    } else {
      graficoFinanceiro.data.datasets[0].data = transacoes.length === 0 ? [1, 1] : [totalReceitas || 0, Math.abs(totalDespesas) || 0];
      graficoFinanceiro.update();
    }
  }, [transacoes]);

  return (
    <div className="container">
      <div className="card">
        <h1>Controle de Finanças</h1>
        <h2>Saldo: R$ {saldoAtual.toFixed(2)}</h2>
      </div>

      <div className="card">
        <h3>Nova Transação</h3>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <div style={{display:"flex", justifyContent:"space-between", marginTop:"0.5rem"}}>
          <button className="receita" onClick={adicionarReceita}>+ Receita</button>
          <button className="despesa" onClick={adicionarDespesa}>- Despesa</button>
        </div>
      </div>

      <div className="card">
        <h3>Resumo</h3>
        <p>Receitas: <b style={{color:"green"}}>R$ {totalReceitas.toFixed(2)}</b></p>
        <p>Despesas: <b style={{color:"red"}}>R$ {Math.abs(totalDespesas).toFixed(2)}</b></p>
        <p>Saldo: <b>R$ {saldoAtual.toFixed(2)}</b></p>
        <div className="barra-progresso">
          <div className="receita-bar" style={{width: `${totalReceitas + Math.abs(totalDespesas) > 0 ? (totalReceitas / (totalReceitas + Math.abs(totalDespesas))) * 100 : 0}%`, borderRadius: totalReceitas > 0 && Math.abs(totalDespesas) === 0 ? '6px' : totalReceitas > 0 && Math.abs(totalDespesas) > 0 ? '6px 0 0 6px' : '0'}}></div>
          <div className="despesa-bar" style={{width: `${totalReceitas + Math.abs(totalDespesas) > 0 ? (Math.abs(totalDespesas) / (totalReceitas + Math.abs(totalDespesas))) * 100 : 0}%`, borderRadius: Math.abs(totalDespesas) > 0 && totalReceitas === 0 ? '6px' : Math.abs(totalDespesas) > 0 && totalReceitas > 0 ? '0 6px 6px 0' : '0'}}></div>
        </div>
      </div>

      <div className="card">
        <h3>Histórico</h3>

        <ul>
          {transacoes.map(t => (
            <li key={t.id} style={{color: t.valor<0?"red":"green", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
              <span>{t.descricao}</span>
              <span>R$ {t.valor.toFixed(2)}</span>
              <button
                onClick={() => removerTransacao(t.id)}
                style={{background:"gray", padding:"0.3rem 0.6rem", marginLeft:"0.5rem"}}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Receitas vs Despesas</h3>
        <canvas id="graficoFinanceiro"></canvas>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);