// Consumo de API pública de tipos de cambio (Exchange Rate API)
async function obtenerCotizaciones() {
    const contenedor = document.getElementById('divisas-container');
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        
        const usdToEur = data.rates.EUR;
        const usdToCop = data.rates.COP;

        contenedor.innerHTML = `
            <p><strong>1 USD =</strong> ${usdToEur.toFixed(2)} EUR</p>
            <p><strong>1 USD =</strong> $${usdToCop.toLocaleString()} COP</p>
            <small>Última actualización: ${new Date().toLocaleTimeString()}</small>
        `;
    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar divisas.</p>`;
        console.error("Error en la API:", error);
    }
}

document.addEventListener('DOMContentLoaded', obtenerCotizaciones);