const TELEFONO_WHATSAPP = "51983537632";
const CLAVE_ALMACENAMIENTO = "nitro_sport_lista_v1";



const TALLAS_DISPONIBLES = [ "6","8","10","12","14","16","S", "M", "L", "XL", "XXL"];

// Cambiar entre Catálogo y Crea tu lista
function cambiarSeccion(seccion) {
    const catalogoEl = document.getElementById("catalogo");
    const seccionListaEl = document.getElementById("seccion-lista");
    const buscadorEl = document.getElementById("contenedor-buscador");
    const btnCatalogo = document.getElementById("btn-nav-catalogo");
    const btnLista = document.getElementById("btn-nav-lista");

    if (seccion === "lista") {
        catalogoEl.classList.add("oculto");
        buscadorEl.classList.add("oculto");
        seccionListaEl.classList.remove("oculto");
        btnLista.classList.add("activo");
        btnCatalogo.classList.remove("activo");
    } else {
        seccionListaEl.classList.add("oculto");
        catalogoEl.classList.remove("oculto");
        buscadorEl.classList.remove("oculto");
        btnCatalogo.classList.add("activo");
        btnLista.classList.remove("activo");
    }
}

function mostrarCatalogo(lista) {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    lista.forEach((item) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-producto";

        tarjeta.innerHTML = `
            <div class="contenedor-imagen" onclick="abrirModelo('${item.codigo}', '${item.nombre}', '${item.descripcion}', '${item.imagen}')">
                <img src="${item.imagen}" alt="${item.nombre}">
            </div>
            <div class="info-producto">
                <span class="codigo-badge">${item.codigo}</span>
                <h3 onclick="abrirModelo('${item.codigo}', '${item.nombre}', '${item.descripcion}', '${item.imagen}')">${item.nombre}</h3>
                <p class="descripcion">${item.descripcion}</p>
                
                <button type="button" class="btn-whatsapp" onclick="pedirPorWhatsapp('${item.codigo}', '${item.nombre}', '${item.imagen}')">
                    Cotizar por WhatsApp
                </button>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

function abrirModelo(codigo, nombre, descripcion, imagen) {
    const modal = document.getElementById("modal-modelo");
    document.getElementById("modal-img").src = imagen;
    document.getElementById("modal-img").alt = nombre;
    document.getElementById("modal-codigo").textContent = codigo;
    document.getElementById("modal-titulo").textContent = nombre;
    document.getElementById("modal-descripcion").textContent = descripcion;

    const btnWsp = document.getElementById("modal-btn-whatsapp");
    btnWsp.onclick = () => pedirPorWhatsapp(codigo, nombre, imagen);

    modal.classList.add("activo");
}

function cerrarModalModelo(event) {
    if (!event || event.target.id === "modal-modelo") {
        document.getElementById("modal-modelo").classList.remove("activo");
    }
}

function filtrarModelos() {
    const texto = document.getElementById("buscador").value.toLowerCase();
    const filtrados = modelos.filter(m =>
        m.nombre.toLowerCase().includes(texto) ||
        m.codigo.toLowerCase().includes(texto) ||
        m.descripcion.toLowerCase().includes(texto)
    );
    mostrarCatalogo(filtrados);
}

function pedirPorWhatsapp(codigo, nombre, imagen) {
    const mensaje = `Hola NITRO SPORT, me interesa cotizar este modelo:\n` +
                    `*Código:* ${codigo}\n` +
                    `*Modelo:* ${nombre}\n` +
                    `*Imagen referencia:* ${imagen}`;

    const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// --- FUNCIONES DE "CREA TU LISTA" ---

function crearElementoFila(datos = { nombre: "", numero: "", talla: "M" }) {
    const tr = document.createElement("tr");

    const opcionesTalla = TALLAS_DISPONIBLES.map(t =>
        `<option value="${t}" ${datos.talla === t ? "selected" : ""}>${t}</option>`
    ).join("");

    tr.innerHTML = `
        <td class="col-indice"></td>
        <td>
            <input type="text" class="inp-nombre" placeholder="Ej: Carlos Pérez" value="${datos.nombre.replace(/"/g, "&quot;")}" oninput="guardarListaLocal()">
        </td>
        <td>
            <input type="text" class="inp-numero" placeholder="Ej: 10" value="${datos.numero.replace(/"/g, "&quot;")}" oninput="guardarListaLocal()">
        </td>
        <td>
            <select class="sel-talla" onchange="guardarListaLocal()">
                ${opcionesTalla}
            </select>
        </td>
        <td>
            <button type="button" class="btn-quitar-fila" title="Quitar fila" onclick="quitarFila(this)">✕</button>
        </td>
    `;

    return tr;
}

function renumerarFilas() {
    const filas = document.querySelectorAll("#cuerpo-tabla-lista tr");
    filas.forEach((fila, index) => {
        fila.querySelector(".col-indice").textContent = index + 1;
    });
}

function agregarFila(datos) {
    const tbody = document.getElementById("cuerpo-tabla-lista");
    tbody.appendChild(crearElementoFila(datos));
    renumerarFilas();
    guardarListaLocal();
}

function quitarFila(boton) {
    const tbody = document.getElementById("cuerpo-tabla-lista");
    if (tbody.children.length > 1) {
        boton.closest("tr").remove();
        renumerarFilas();
        guardarListaLocal();
    } else {
        const fila = boton.closest("tr");
        fila.querySelector(".inp-nombre").value = "";
        fila.querySelector(".inp-numero").value = "";
        fila.querySelector(".sel-talla").value = "M";
        guardarListaLocal();
    }
}

function limpiarLista() {
    document.getElementById("descripcion-equipo").value = "";
    const tbody = document.getElementById("cuerpo-tabla-lista");
    tbody.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        tbody.appendChild(crearElementoFila());
    }
    renumerarFilas();
    localStorage.removeItem(CLAVE_ALMACENAMIENTO);
}

function guardarListaLocal() {
    const descripcion = document.getElementById("descripcion-equipo").value;
    const filas = [];

    document.querySelectorAll("#cuerpo-tabla-lista tr").forEach(tr => {
        filas.push({
            nombre: tr.querySelector(".inp-nombre").value,
            numero: tr.querySelector(".inp-numero").value,
            talla: tr.querySelector(".sel-talla").value
        });
    });

    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify({ descripcion, filas }));
}

function cargarListaLocal() {
    const tbody = document.getElementById("cuerpo-tabla-lista");
    tbody.innerHTML = "";

    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (guardado) {
        try {
            const data = JSON.parse(guardado);
            document.getElementById("descripcion-equipo").value = data.descripcion || "";
            if (Array.isArray(data.filas) && data.filas.length > 0) {
                data.filas.forEach(f => tbody.appendChild(crearElementoFila(f)));
                renumerarFilas();
                return;
            }
        } catch (e) {
            // Si hay algún dato corrupto, crea filas limpias
        }
    }

    for (let i = 0; i < 5; i++) {
        tbody.appendChild(crearElementoFila());
    }
    renumerarFilas();
}

function enviarListaPorWhatsapp() {
    const descripcion = document.getElementById("descripcion-equipo").value.trim();
    const registros = [];

    document.querySelectorAll("#cuerpo-tabla-lista tr").forEach((tr, idx) => {
        const nombre = tr.querySelector(".inp-nombre").value.trim();
        const numero = tr.querySelector(".inp-numero").value.trim();
        const talla = tr.querySelector(".sel-talla").value;

        if (nombre || numero) {
            registros.push(`${idx + 1}. *Nombre:* ${nombre || "-"} | *N°:* ${numero || "-"} | *Talla:* ${talla}`);
        }
    });

    if (!descripcion && registros.length === 0) {
        alert("Escribe el nombre/descripción del equipo o agrega al menos un nombre o número antes de enviar.");
        return;
    }

    let mensaje = `Hola NITRO SPORT, quiero enviar mi lista de pedido:\n`;
    if (descripcion) {
        mensaje += `*Descripción / Equipo:* ${descripcion}\n`;
    }
    if (registros.length > 0) {
        mensaje += `\n*Detalle de jugadores / prendas:*\n${registros.join("\n")}`;
    }

    const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalModelo();
});

// Carga inicial
mostrarCatalogo(modelos);
cargarListaLocal();
