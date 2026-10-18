// Manejo de Estado y LocalStorage
let transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

const form = document.getElementById('form-transaccion');
const lista = document.getElementById('lista-transacciones');
const saldoTotal = document.getElementById('saldo-total');
const btnBorrarTodo = document.getElementById('btn-borrar-todo');

function actualizarInterfaz() {
    lista.innerHTML = '';
    let total = 0;

    transacciones.forEach((t, index) => {
        const li = document.createElement('li');
        const signo = t.tipo === 'ingreso' ? '+' : '-';
        total += t.tipo === 'ingreso' ? t.monto : -t.monto;

        li.innerHTML = `
            <span>${t.concepto}</span>
            <div>
                <strong style="color: ${t.tipo === 'ingreso' ? '#4ade80' : '#f87171'}; margin-right: 10px;">
                    ${signo}$${t.monto.toFixed(2)}
                </strong>
                <button class="btn-eliminar" onclick="eliminarTransaccion(${index})" title="Eliminar">🗑️</button>
            </div>
        `;
        lista.appendChild(li);
    });

    saldoTotal.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('transacciones', JSON.stringify(transacciones));
}

// Función para eliminar una transacción por su índice
function eliminarTransaccion(index) {
    transacciones.splice(index, 1);
    actualizarInterfaz();
}

// Función para reiniciar/borrar todo el historial
btnBorrarTodo.addEventListener('click', () => {
    if (transacciones.length === 0) {
        alert("No hay transacciones para eliminar.");
        return;
    }

    const confirmar = confirm("¿Estás seguro de que deseas borrar todo el historial y reiniciar el saldo?");
    if (confirmar) {
        transacciones = [];
        actualizarInterfaz();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const concepto = document.getElementById('concepto').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const tipo = document.getElementById('tipo').value;

    transacciones.push({ concepto, monto, tipo });
    actualizarInterfaz();
    form.reset();
});

document.addEventListener('DOMContentLoaded', actualizarInterfaz);