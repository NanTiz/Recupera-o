function botao_buscar() {
    let ddd = document.getElementById("input_DDD").value;
    let tabelaResultado = document.getElementById("resultado_tabela");
    let tbody = tabelaResultado.querySelector("tbody");

    if (ddd && /^[0-9]{2}$/.test(ddd)) {
        fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('DDD não encontrado.');
                }
                return response.json();
            })
            .then(data => {
                tbody.innerHTML = '';

                let state = data.state;
                let cities = data.cities.join(", ");

                let linhaEstado = `<tr>
                                    <td><strong>${state}</strong></td>
                                    <td>${cities}</td>
                                  </tr>`;
                tbody.innerHTML = linhaEstado;

                tabelaResultado.style.display = "table";
            })
            .catch(error => {
                alert(error.message);
                tbody.innerHTML = '';
                tabelaResultado.style.display = "none";
            });
    } else {
        alert("Por favor, insira um DDD válido (com 2 dígitos).");
        tbody.innerHTML = '';
        tabelaResultado.style.display = "none";
    }
}