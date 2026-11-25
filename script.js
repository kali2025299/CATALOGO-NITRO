const TELEFONO_WHATSAPP = "51983537632";
const CLAVE_ALMACENAMIENTO = "nitro_sport_lista_v1";

const modelos = [
    { codigo: "NITRO-01", nombre: "Modelo 01", descripcion: "Camiseta deportiva sublimada.", imagen: "foto1.jpg" },
    { codigo: "NITRO-02", nombre: "Modelo 02", descripcion: "Camiseta deportiva sublimada.", imagen: "foto2.jpg" },
    { codigo: "NITRO-03", nombre: "Modelo 03", descripcion: "Camiseta deportiva sublimada.", imagen: "foto3.jpg" },
    { codigo: "NITRO-04", nombre: "Modelo 04", descripcion: "Camiseta deportiva sublimada.", imagen: "foto4.jpg" },
    { codigo: "NITRO-05", nombre: "Modelo 05", descripcion: "Camiseta deportiva sublimada.", imagen: "foto5.jpg" },
    { codigo: "NITRO-06", nombre: "Modelo 06", descripcion: "Camiseta deportiva sublimada.", imagen: "foto6.jpg" },
    { codigo: "NITRO-07", nombre: "Modelo 07", descripcion: "Camiseta deportiva sublimada.", imagen: "foto7.jpg" },
    { codigo: "NITRO-08", nombre: "Modelo 08", descripcion: "Camiseta deportiva sublimada.", imagen: "foto8.jpg" },
    { codigo: "NITRO-09", nombre: "Modelo 09", descripcion: "Camiseta deportiva sublimada.", imagen: "foto9.jpg" },
    { codigo: "NITRO-10", nombre: "Modelo 10", descripcion: "Camiseta deportiva sublimada.", imagen: "foto10.jpg" },
    { codigo: "NITRO-11", nombre: "Modelo 11", descripcion: "Camiseta deportiva sublimada.", imagen: "foto11.jpg" },
    { codigo: "NITRO-12", nombre: "Modelo 12", descripcion: "Camiseta deportiva sublimada.", imagen: "foto12.jpg" },
    { codigo: "NITRO-13", nombre: "Modelo 13", descripcion: "Camiseta deportiva sublimada.", imagen: "foto13.jpg" },
    { codigo: "NITRO-14", nombre: "Modelo 14", descripcion: "Camiseta deportiva sublimada.", imagen: "foto14.jpg" },
    { codigo: "NITRO-15", nombre: "Modelo 15", descripcion: "Camiseta deportiva sublimada.", imagen: "foto15.jpg" },
    { codigo: "NITRO-16", nombre: "Modelo 16", descripcion: "Camiseta deportiva sublimada.", imagen: "foto16.jpg" }
];

const TALLAS_DISPONIBLES = ["Niño", "S", "M", "L", "XL", "XXL"];

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
    if (!contenedor) return;
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
    for (let i = 0; i < 5; i++) {
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
    if (!tbody) return;
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
        } catch (e) {}
    }

    for (let i = 0; i < 5; i++) {
        tbody.appendChild(crearElementoFila());
    }
    renumerarFilas();
}

function obtenerDatosLista() {
    const descripcion = document.getElementById("descripcion-equipo").value.trim();
    const registros = [];

    document.querySelectorAll("#cuerpo-tabla-lista tr").forEach((tr) => {
        const nombre = tr.querySelector(".inp-nombre").value.trim();
        const numero = tr.querySelector(".inp-numero").value.trim();
        const talla = tr.querySelector(".sel-talla").value.trim();

        if (nombre || numero) {
            registros.push({ nombre, numero, talla });
        }
    });

    return { descripcion, registros };
}

function escaparCSV(valor) {
    const texto = String(valor ?? "");
    if (texto.includes(",") || texto.includes('"') || texto.includes("\n")) {
        return `"${texto.replace(/"/g, '""')}"`;
    }
    return texto;
}

function descargarCSV() {
    const { descripcion, registros } = obtenerDatosLista();

    if (!descripcion && registros.length === 0) {
        alert("Escribe el nombre del equipo o agrega al menos un jugador para descargar el CSV.");
        return null;
    }

    const lineas = [];
    if (descripcion) {
        lineas.push(`EQUIPO,${escaparCSV(descripcion)}`);
    }
    lineas.push("NAME,NUMBER,SIZE");

    registros.forEach((r) => {
        lineas.push(`${escaparCSV(r.nombre)},${escaparCSV(r.numero)},${escaparCSV(r.talla)}`);
    });

    const contenidoCSV = "\uFEFF" + lineas.join("\n");
    const blob = new Blob([contenidoCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const nombreLimpio = (descripcion || "lista_equipo")
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, "_")
        .replace(/^_+|_+$/g, "");

    const nombreArchivo = `${nombreLimpio || "lista_equipo"}.csv`;

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);

    return { descripcion, registros, nombreArchivo };
}

function enviarListaPorWhatsapp() {
    const resultado = descargarCSV();
    if (!resultado) return;

    const { descripcion, registros, nombreArchivo } = resultado;

    const lineasTexto = registros.map((r, idx) =>
        `${idx + 1}. *Nombre:* ${r.nombre || "-"} | *N°:* ${r.numero || "-"} | *Talla:* ${r.talla}`
    );

    let mensaje = `Hola NITRO SPORT, envío mi lista de pedido:\n` +
                  `*Equipo / Descripción:* ${descripcion || "Sin especificar"}\n` +
                  `*Total de prendas:* ${registros.length}\n` +
                  `*Archivo CSV generado:* ${nombreArchivo}\n`;

    if (lineasTexto.length > 0) {
        mensaje += `\n*Detalle:*\n${lineasTexto.join("\n")}`;
    }

    const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalModelo();
});

mostrarCatalogo(modelos);
cargarListaLocal();
