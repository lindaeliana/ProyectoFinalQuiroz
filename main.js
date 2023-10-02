const hasDiscountKey = "hasDiscount";

const consultaBtn = document.getElementById("consultarBtn");
const marcaInput = document.getElementById("marcaInput");
const resultadoDiv = document.getElementById("resultado");

consultaBtn.addEventListener("click", function () {
    const nombre = marcaInput.value.toLowerCase();

    fetch("./cars.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            let hasDiscount = localStorage.getItem(hasDiscountKey);
            let mensaje = "";

            data.forEach(producto => {
                const { marca, modelo, precio } = producto; // Destructuring

                if (marca.toLowerCase() === nombre) {
                    mensaje = `
                        Disponible el modelo: ${modelo}<br>
                        Precio: $${precio}
                    `
                    Swal.fire('Usted tiene un descuento especial');

                    // Aplica descuento si el usuario aún no lo recibió
                    if (hasDiscount !== "true") {
                        localStorage.setItem(hasDiscountKey, "true");
                        const descuento = 20;
                        const precioConDescuento = calcularPrecioConDescuento(precio, descuento);
                        mensaje += `<br>Precio con descuento: $${precioConDescuento}`;
                    }
                }
            });

            if (!mensaje) {
                mensaje = "No disponible";
            }

            resultadoDiv.innerHTML = mensaje;
        })
        .catch(error => {
            console.error("Error fetching car data:", error);
        });
});

function calcularPrecioConDescuento(precio, descuento) {
    const descuentoAplicado = (precio * descuento) / 100;
    const precioConDescuento = precio - descuentoAplicado;
    return precioConDescuento;
}