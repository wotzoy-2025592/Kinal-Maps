const lienzo = document.getElementById('lienzo-imagen');
        const lugarActualTxt = document.getElementById('nombre-lugar-actual');
        const panelFlotante = document.getElementById('entry-panel');
        const epTitulo = document.getElementById('ep-txt-titulo');
        const epBadge = document.getElementById('ep-txt-badge');
        const epDescripcion = document.getElementById('ep-txt-descripcion');

        const configNodos = {
            1: { imagen: "Basicos/pasillos/pasillo_inicial.png", nombre: "Pasillo Inicial" },
            2: { imagen: "Basicos/pasillos/gradas.jpg", nombre: "Área de Gradas" },
            3: { imagen: "Basicos/pasillos/salones.png", nombre: "Pasillo de Salones" },
            4: { imagen: "Basicos/pasillos/balcon.png", nombre: "Zona del Balcón" },
            5: { imagen: "Basicos/pasillos/Coordinacion.png", nombre: "Pasillo de Coordinación" },
            6: { imagen: "Basicos/pasillos/Coordinacion-puerta.png", nombre: "Puerta de Coordinación" }
        };

        function cambiarNodo(numeroNodo) {
            cerrarPanelFlotante();
            
            const nodo = configNodos[numeroNodo];
            if(nodo) {
                lienzo.src = nodo.imagen;
                lugarActualTxt.innerText = nodo.nombre;
            }

            // Remueve las clases para limpiar los botones anteriores y activa los del nodo actual
            document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active', 'activo'));
            document.querySelectorAll(`[data-nodo="${numeroNodo}"]`).forEach(h => h.classList.add('activo'));
        }

        function abrirPanelFlotante(titulo, badge, descripcion) {
            epTitulo.innerText = titulo;
            epBadge.innerText = badge;
            epDescripcion.innerText = descripcion;
            panelFlotante.classList.add('visible');
        }

        function cerrarPanelFlotante() {
            panelFlotante.classList.remove('visible');
        }