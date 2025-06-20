async function converter() {
  const valor = parseFloat(document.getElementById("valor").value);
  const moeda = document.getElementById("moeda").value;

  const res = await fetch(`https://api.exchangerate.host/latest?base=BRL`);
  const data = await res.json();
  const taxa = data.rates[moeda];
  const convertido = (valor * taxa).toFixed(2);

  document.getElementById("resultado").textContent = `R$${valor} = ${convertido} ${moeda}`;

  salvarHistorico(valor, convertido, moeda);
}

function salvarHistorico(valor, convertido, moeda) {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.unshift({
    data: new Date().toLocaleString(),
    valor,
    convertido,
    moeda
  });

  localStorage.setItem("historico", JSON.stringify(historico));
  mostrarHistorico();
}

function mostrarHistorico() {
  const historico = JSON.parse(localStorage.getItem("historico")) || [];
  const lista = document.getElementById("lista-historico");
  lista.innerHTML = "";

  historico.slice(0, 5).forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.data}: R$${item.valor} → ${item.convertido} ${item.moeda}`;
    lista.appendChild(li);
  });
}

mostrarHistorico();
