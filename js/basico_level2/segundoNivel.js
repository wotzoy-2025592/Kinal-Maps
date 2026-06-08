const CELL = 24;
const COLS = 80;
const ROWS = 55;
const W = COLS * CELL;
const H = ROWS * CELL;


const T = {
    salonH24izq:   1,
    salonH23:      2,
    salonH22:      3,
    pasilloBloqueH: 4,
    gradasBloqueH:  5,
    miniSalonH25:   6,
    miniSalonH26:   7,
    pasilloConectorH: 8,
    coordinacion:  9,
    salonG25:     10,
    salonG24:     11,
    serviciosSS:  12,
    salonG21:     13,
    pasilloCentral: 14,
    gradasG:       15,
    gradasConector: 16,
    oficina1:      17,
    oficina2:      18,
    laboratorioTics: 19,
    pasilloEste:   20,
    preceptorias:  21,
    salaReuniones: 22,
    gradasBloqueB: 23,
    salonB22der:   24,
    salonB21der:   25,
    areaVerde:     26,
    pasilloHorizontalDer: 27,
};


const COLORS = {
    [T.salonH24izq]:        '#b0b0b0',
    [T.salonH23]:           '#b0b0b0',
    [T.salonH22]:           '#b0b0b0',
    [T.pasilloBloqueH]:     '#f5c842',
    [T.gradasBloqueH]:      '#4ecdc4',
    [T.miniSalonH25]:       '#b0b0b0',
    [T.miniSalonH26]:       '#b0b0b0',
    [T.pasilloConectorH]:   '#f5c842',
    [T.coordinacion]:       '#b0b0b0',
    [T.salonG25]:           '#b0b0b0',
    [T.salonG24]:           '#b0b0b0',
    [T.serviciosSS]:        '#b0b0b0',
    [T.salonG21]:           '#b0b0b0',
    [T.pasilloCentral]:     '#f5c842',
    [T.gradasG]:            '#4ecdc4',
    [T.gradasConector]:     '#4ecdc4',
    [T.oficina1]:           '#b0b0b0',
    [T.oficina2]:           '#b0b0b0',
    [T.laboratorioTics]:    '#b0b0b0',
    [T.pasilloEste]:        '#f5c842',
    [T.preceptorias]:       '#b0b0b0',
    [T.salaReuniones]:      '#b0b0b0',
    [T.gradasBloqueB]:      '#4ecdc4',
    [T.salonB22der]:        '#b0b0b0',
    [T.salonB21der]:        '#b0b0b0',
    [T.areaVerde]:          '#5dbb63',
    [T.pasilloHorizontalDer]: '#f5c842',
};

const STROKE = {
    [T.salonH24izq]:        '#555',
    [T.salonH23]:           '#555',
    [T.salonH22]:           '#555',
    [T.pasilloBloqueH]:     '#c9970a',
    [T.gradasBloqueH]:      '#289991',
    [T.miniSalonH25]:       '#555',
    [T.miniSalonH26]:       '#555',
    [T.pasilloConectorH]:   '#c9970a',
    [T.coordinacion]:       '#555',
    [T.salonG25]:           '#555',
    [T.salonG24]:           '#555',
    [T.serviciosSS]:        '#555',
    [T.salonG21]:           '#555',
    [T.pasilloCentral]:     '#c9970a',
    [T.gradasG]:            '#289991',
    [T.gradasConector]:     '#289991',
    [T.oficina1]:           '#555',
    [T.oficina2]:           '#555',
    [T.laboratorioTics]:    '#555',
    [T.pasilloEste]:        '#c9970a',
    [T.preceptorias]:       '#555',
    [T.salaReuniones]:      '#555',
    [T.gradasBloqueB]:      '#289991',
    [T.salonB22der]:        '#555',
    [T.salonB21der]:        '#555',
    [T.areaVerde]:          '#2e7d32',
    [T.pasilloHorizontalDer]: '#c9970a',
};


const listaEtiquetas = [];
function agregarEtiqueta(r, c, texto, tam, negrita) {
    listaEtiquetas.push({ r, c, texto, tam: tam || 10, negrita: negrita || false });
}


const lugaresEnMapa = [
    { nombre: 'Clase H24',        r: 14, c: 5  },
    { nombre: 'Clase H23',        r: 22, c: 5  },
    { nombre: 'Clase H22',        r: 30, c: 5  },
    { nombre: 'Clase G25',        r: 8,  c: 27 },
    { nombre: 'Clase G24',        r: 14, c: 27 },
    { nombre: 'SS',               r: 20, c: 24 },
    { nombre: 'Clase G21',        r: 26, c: 24 },
    { nombre: 'Coordinacion',     r: 4,  c: 27 },
    { nombre: 'Oficina 1',        r: 35, c: 42 },
    { nombre: 'Oficina 2',        r: 40, c: 42 },
    { nombre: 'Tics',             r: 46, c: 47 },
    { nombre: 'Sala de Reuniones',r: 18, c: 62 },
    { nombre: 'Clase B22',        r: 22, c: 73 },
    { nombre: 'Clase B21',        r: 30, c: 73 },
    { nombre: 'Gradas H',         r: 8,  c: 18 },
    { nombre: 'Gradas G',         r: 28, c: 36 },
    { nombre: 'Gradas B',         r: 26, c: 68 },
];

//Modelo del mapa 
class ModeloMapa {
    constructor() {
        this.grilla = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
        this.etiquetas = [];
        this.nodoOrigen = null;
        this.nodoDestino = null;
        this.rutaCalculada = null;

        this.construirGrilla();
        this.construirEtiquetas();
    }

    rellenar(r1, c1, r2, c2, tipo) {
        for (let r = r1; r <= r2; r++) {
            for (let c = c1; c <= c2; c++) {
                if (r >= 0 && r < ROWS && c >= 0 && c < COLS)
                    this.grilla[r][c] = tipo;
            }
        }
    }

    etq(r, c, texto, tam, negrita) {
        this.etiquetas.push({ r, c, texto, tam: tam || 10, negrita: negrita || false });
    }

    construirGrilla() {

        // clase h24 
        this.rellenar(8,  0, 18, 10, T.salonH24izq);

        // clase h23 
        this.rellenar(19, 0, 27, 10, T.salonH23);

        // clase h22
        this.rellenar(28, 0, 36, 10, T.salonH22);

        // Pasillo 
        this.rellenar(8, 11, 36, 14, T.pasilloBloqueH);

        // Gradas 
        this.rellenar(6, 15, 11, 19, T.gradasBloqueH);

        // salones
        this.rellenar(8,  15, 12, 19, T.miniSalonH25);
        this.rellenar(14, 15, 18, 19, T.miniSalonH26);

        // Pasillo 
        this.rellenar(20, 15, 22, 19, T.pasilloConectorH);
        this.rellenar(20, 20, 22, 23, T.pasilloConectorH);

        // Bloque G central

        // Coordinacion 
        this.rellenar(0, 22, 5, 31, T.coordinacion);

        // Salon Clase G25
        this.rellenar(6, 22, 13, 31, T.salonG25);

        // Pasillo vertical 
        this.rellenar(6, 32, 30, 35, T.pasilloCentral);

        // Salon Clase G24
        this.rellenar(14, 22, 19, 31, T.salonG24);

        // Servicios SS
        this.rellenar(20, 22, 22, 25, T.serviciosSS);

        // Salon Clase G21 
        this.rellenar(23, 22, 31, 31, T.salonG21);

        // Pasillo horizontal
        this.rellenar(20, 22, 22, 35, T.pasilloCentral);

        //  corredor del centro 
        this.rellenar(6,  32, 22, 38, T.pasilloCentral);
        this.rellenar(22, 36, 26, 41, T.pasilloCentral);
        this.rellenar(26, 38, 30, 44, T.pasilloCentral);

        // Gradas G 
        this.rellenar(28, 32, 32, 36, T.gradasG);

        // Gradas conector 
        this.rellenar(25, 36, 29, 40, T.gradasConector);

        // tics

        // Oficina 1
        this.rellenar(32, 38, 37, 45, T.oficina1);

        // Oficina 2
        this.rellenar(38, 38, 43, 45, T.oficina2);

        // Laboratorio Tics (gran salon gris abajo)
        this.rellenar(39, 43, 51, 54, T.laboratorioTics);

        // Pasillo diagonal

        // Pasillo principal hacia bloque B (diagonal-derecha)
        this.rellenar(22, 44, 34, 50, T.pasilloEste);
        this.rellenar(24, 50, 30, 54, T.pasilloEste);

        // Area verde
        this.rellenar(22, 50, 26, 55, T.areaVerde);

        // Bloque B d

        // Sala de Reuniones (grande gris superior derecha)
        this.rellenar(13, 57, 24, 70, T.salaReuniones);

        // Preceptorias (pequeños cuadros grises en medio)
        this.rellenar(25, 57, 29, 62, T.preceptorias);
        this.rellenar(25, 63, 29, 67, T.preceptorias);

        // Pasillo horizontal derecho (amarillo que conecta a salones B)
        this.rellenar(26, 68, 28, 78, T.pasilloHorizontalDer);

        // Gradas bloque B
        this.rellenar(24, 68, 27, 71, T.gradasBloqueB);

        // Salon clase h24 superior derecha
        this.rellenar(16, 71, 24, 79, T.salonB22der);

        // Salon clase h24 inferior derecha (debajo)
        this.rellenar(28, 71, 36, 79, T.salonB21der);
    }

    construirEtiquetas() {
        // Bloque H izquierdo
        this.etq(13,  5, 'clase\nh24',  11, true);
        this.etq(23,  5, 'clase\nh23',  11, true);
        this.etq(32,  5, 'clase\nh22',  11, true);
        this.etq(12, 12.5, 'cor\ned\nor',  8, false);
        this.etq(24, 12.5, 'core\ndor',    8, false);

        // Gradas y mini salones H
        this.etq(8.5, 17, 'gradas', 8, true);
        this.etq(10, 17, 'salon\nh25', 7, false);
        this.etq(16, 17, 'salon\nh26', 7, false);
        this.etq(21, 18.5, 'core\ndor', 7, false);
        this.etq(21, 21,   'core\ndor', 7, false);

        // Bloque G central
        this.etq(2.5, 26.5, 'cordinacion', 9, true);
        this.etq(9.5, 26.5, 'clase\nG25',  11, true);
        this.etq(16.5, 26.5, 'clase\nG24', 11, true);
        this.etq(21,  23.5, 'SS',           9, true);
        this.etq(27,  26.5, 'CLASE\nG21',  11, true);

        // Pasillo central
        this.etq(9,  33.5, 'cored\nor',  8, false);
        this.etq(14, 33.5, 'cored\nor',  8, false);
        this.etq(18, 35.5, 'coredor',   8, false);
        this.etq(21, 36.5, 'cored\nor',  8, false);
        this.etq(27, 40,   'cored\nor',  8, false);

        // Gradas G
        this.etq(29, 33.5, 'gradas', 8, true);
        this.etq(27, 38,   'gradas', 8, true);

        // Bloque inferior
        this.etq(34.5, 41.5, 'Oficina\n1',  10, true);
        this.etq(40.5, 41.5, 'Oficina\n2',  10, true);
        this.etq(45,   48.5, 'tics',         13, true);

        // Pasillo este
        this.etq(28, 47, 'coredor', 8, false);
        this.etq(26, 52, 'cored\nor', 8, false);

        // Bloque B derecho
        this.etq(18.5, 63.5, 'sala de reuniones', 10, true);
        this.etq(27,   59.5, 'cored\nor', 8, false);

        // Gradas y salones B
        this.etq(25.5, 69.5, 'gradas', 8, true);
        this.etq(20,   75,   'clase\nh24', 10, true);
        this.etq(32,   75,   'clase\nh24', 10, true);
    }

    obtenerNombreZona(r, c) {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return 'Fuera de límites';
        const tipo = this.grilla[r][c];
        for (let clave in T) {
            if (T[clave] === tipo) return clave;
        }
        return 'Desconocido';
    }

    encontrarRuta() {
        if (!this.nodoOrigen || !this.nodoDestino) return null;

        const inicio = this.nodoOrigen;
        const fin    = this.nodoDestino;

        const visitado = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
        const padre    = Array.from({ length: ROWS }, () => new Array(COLS).fill(null));
        const cola     = [inicio];
        visitado[inicio.r][inicio.c] = true;

        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

        while (cola.length) {
            const actual = cola.shift();
            if (actual.r === fin.r && actual.c === fin.c) {
                const camino = [];
                let nodo = actual;
                while (nodo) {
                    camino.unshift(nodo);
                    nodo = padre[nodo.r][nodo.c];
                }
                this.rutaCalculada = camino;
                return camino;
            }
            for (const [dr, dc] of dirs) {
                const nr = actual.r + dr;
                const nc = actual.c + dc;
                if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !visitado[nr][nc] && this.grilla[nr][nc] !== 0) {
                    visitado[nr][nc] = true;
                    padre[nr][nc] = actual;
                    cola.push({ r: nr, c: nc });
                }
            }
        }
        this.rutaCalculada = null;
        return null;
    }

    limpiarRuta() {
        this.nodoOrigen   = null;
        this.nodoDestino  = null;
        this.rutaCalculada = null;
    }
}
//vista
class VistaMapa {
    constructor() {
        this.canvas   = document.getElementById('map');
        this.ctx      = this.canvas.getContext('2d');
        this.envoltura = document.getElementById('map-canvas-wrap');
        this.contenedorMapa = document.getElementById('map-wrap');
        this.panelEntrada   = document.getElementById('entry-panel');

        this.canvas.width  = W;
        this.canvas.height = H;

        this.escala = 1.0;
        this.tx = 0;
        this.ty = 0;
    }

    aplicarTransformacion() {
        this.envoltura.style.transform = `translate(${this.tx}px,${this.ty}px) scale(${this.escala})`;
        document.getElementById('sb-zoom').textContent = Math.round(this.escala * 100) + '%';
        this.actualizarBarraEscala();
    }

    actualizarBarraEscala() {
        const px50m = (50 / 5) * CELL * this.escala;
        document.getElementById('scale-line').style.width = Math.min(120, Math.max(40, px50m)) + 'px';
    }

    centrarMapa() {
        this.tx = (this.contenedorMapa.clientWidth  - W * this.escala) / 2;
        this.ty = (this.contenedorMapa.clientHeight - H * this.escala) / 2;
        this.aplicarTransformacion();
    }

    dibujar(modelo) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);

        // Celdas rellenas
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const t = modelo.grilla[r][c];
                if (t === 0) continue;
                ctx.fillStyle = COLORS[t] || '#cccccc';
                ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
            }
        }

        // Bordes estructurales
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const t = modelo.grilla[r][c];
                if (t === 0) continue;
                const s = STROKE[t];
                if (!s) continue;
                ctx.strokeStyle = s;
                ctx.lineWidth = 1.5;

                if (c === 0 || modelo.grilla[r][c - 1] !== t) {
                    ctx.beginPath(); ctx.moveTo(c * CELL, r * CELL); ctx.lineTo(c * CELL, (r + 1) * CELL); ctx.stroke();
                }
                if (c === COLS - 1 || modelo.grilla[r][c + 1] !== t) {
                    ctx.beginPath(); ctx.moveTo((c + 1) * CELL, r * CELL); ctx.lineTo((c + 1) * CELL, (r + 1) * CELL); ctx.stroke();
                }
                if (r === 0 || modelo.grilla[r - 1][c] !== t) {
                    ctx.beginPath(); ctx.moveTo(c * CELL, r * CELL); ctx.lineTo((c + 1) * CELL, r * CELL); ctx.stroke();
                }
                if (r === ROWS - 1 || modelo.grilla[r + 1][c] !== t) {
                    ctx.beginPath(); ctx.moveTo(c * CELL, (r + 1) * CELL); ctx.lineTo((c + 1) * CELL, (r + 1) * CELL); ctx.stroke();
                }
            }
        }

        //ruta
        if (modelo.rutaCalculada && modelo.rutaCalculada.length > 1) {
            ctx.strokeStyle = '#c0392b';
            ctx.lineWidth = 4;
            ctx.lineCap  = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            modelo.rutaCalculada.forEach((nodo, i) => {
                const x = nodo.c * CELL + CELL / 2;
                const y = nodo.r * CELL + CELL / 2;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        }

        // origen y destino
        if (modelo.nodoOrigen)  this.dibujarPin(modelo.nodoOrigen.c * CELL + CELL / 2,  modelo.nodoOrigen.r * CELL + CELL / 2,  '#27ae60');
        if (modelo.nodoDestino) this.dibujarPin(modelo.nodoDestino.c * CELL + CELL / 2, modelo.nodoDestino.r * CELL + CELL / 2, '#c0392b');

        // Etiquetas
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        modelo.etiquetas.forEach(etq => {
            ctx.font      = `${etq.negrita ? '600' : '400'} ${etq.tam}px 'IBM Plex Mono', monospace`;
            ctx.fillStyle = '#1a1a1a';
            const lineas  = etq.texto.split('\n');
            const altLinea = etq.tam * 1.3;
            const yBase   = etq.r * CELL - ((lineas.length - 1) * altLinea) / 2;
            lineas.forEach((linea, i) => {
                ctx.fillText(linea, etq.c * CELL, yBase + i * altLinea);
            });
        });
    }

    dibujarPin(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath(); this.ctx.arc(x, y, 7, 0, Math.PI * 2); this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    alternarPanelEntrada() { this.panelEntrada.classList.toggle('visible'); }
    cerrarPanelEntrada()   { this.panelEntrada.classList.remove('visible'); }

    actualizarUI(modelo) {
        const elOrigen = document.getElementById('origin-name');
        const elDest   = document.getElementById('dest-name');
        const btnCalc  = document.getElementById('calc-route-btn');

        elOrigen.textContent = modelo.nodoOrigen
            ? `Fila ${modelo.nodoOrigen.r}, Col ${modelo.nodoOrigen.c}`
            : 'Sin seleccionar';
        elOrigen.classList.toggle('set', !!modelo.nodoOrigen);

        elDest.textContent = modelo.nodoDestino
            ? `Fila ${modelo.nodoDestino.r}, Col ${modelo.nodoDestino.c}`
            : 'Sin seleccionar';
        elDest.classList.toggle('set', !!modelo.nodoDestino);

        btnCalc.disabled = !(modelo.nodoOrigen && modelo.nodoDestino);
    }
}

//controller
class ControladorMapa {
    constructor(modelo, vista) {
        this.modelo        = modelo;
        this.vista         = vista;
        this.modoActual    = 'view';
        this.arrastrando   = false;
        this.startX        = 0;
        this.startY        = 0;
        this.lugaresEnMapa = lugaresEnMapa;
    }

    iniciar() {
        this.registrarEventos();
        this.vista.centrarMapa();
        this.vista.dibujar(this.modelo);
    }

    registrarEventos() {
        document.getElementById('btn-view').addEventListener('click',   () => this.cambiarModo('view'));
        document.getElementById('btn-origin').addEventListener('click', () => this.cambiarModo('origin'));
        document.getElementById('btn-dest').addEventListener('click',   () => this.cambiarModo('dest'));

        document.getElementById('clear-btn').addEventListener('click', () => {
            this.modelo.limpiarRuta();
            this.vista.actualizarUI(this.modelo);
            document.getElementById('route-info').textContent = '';
            this.vista.dibujar(this.modelo);
        });

        document.getElementById('calc-route-btn').addEventListener('click', () => {
            const ruta = this.modelo.encontrarRuta();
            const infoEl = document.getElementById('route-info');
            infoEl.textContent = ruta
                ? `Distancia: ~${ruta.length * 5} metros (${ruta.length} celdas)`
                : 'No se encontró una ruta viable.';
            this.vista.dibujar(this.modelo);
        });

        // Zoom con rueda
        this.vista.contenedorMapa.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect     = this.vista.contenedorMapa.getBoundingClientRect();
            const mx       = e.clientX - rect.left;
            const my       = e.clientY - rect.top;
            const escalaAnterior = this.vista.escala;
            const factor   = e.deltaY < 0 ? 1.12 : 0.89;
            const nuevaEscala = Math.min(4, Math.max(0.2, escalaAnterior * factor));

            this.vista.tx = mx - (mx - this.vista.tx) * (nuevaEscala / escalaAnterior);
            this.vista.ty = my - (my - this.vista.ty) * (nuevaEscala / escalaAnterior);
            this.vista.escala = nuevaEscala;
            this.vista.aplicarTransformacion();
        }, { passive: false });

        document.getElementById('zoom-in').addEventListener('click',  () => this.zoomCentro(1.2));
        document.getElementById('zoom-out').addEventListener('click', () => this.zoomCentro(0.8));

        document.getElementById('ver-entrada-btn').addEventListener('click', () => this.vista.alternarPanelEntrada());
        document.getElementById('entry-close').addEventListener('click',     () => this.vista.cerrarPanelEntrada());

        document.getElementById('entry-go-btn').addEventListener('click', () => {
            this.modelo.nodoOrigen = { r: 6, c: 32 };
            this.vista.actualizarUI(this.modelo);
            this.vista.cerrarPanelEntrada();
            this.vista.dibujar(this.modelo);
        });

        //Arrastre 
        const contenedor = this.vista.contenedorMapa;
        contenedor.addEventListener('mousedown', (e) => {
            if (e.target.closest('.zoom-btn') || e.target.closest('#ver-entrada-btn') || e.target.closest('#entry-panel')) return;
            this.arrastrando = true;
            contenedor.classList.add('grabbing');
            this.startX = e.clientX - this.vista.tx;
            this.startY = e.clientY - this.vista.ty;
        });
        window.addEventListener('mousemove', (e) => {
            if (!this.arrastrando) return;
            this.vista.tx = e.clientX - this.startX;
            this.vista.ty = e.clientY - this.startY;
            this.vista.aplicarTransformacion();
        });
        window.addEventListener('mouseup', () => {
            if (!this.arrastrando) return;
            this.arrastrando = false;
            contenedor.classList.remove('grabbing');
        });


        //celda
        this.vista.canvas.addEventListener('click', (e) => {
            const rect  = this.vista.canvas.getBoundingClientRect();
            const clickX = (e.clientX - rect.left) / this.vista.escala;
            const clickY = (e.clientY - rect.top)  / this.vista.escala;
            const c = Math.floor(clickX / CELL);
            const r = Math.floor(clickY / CELL);
            if (r >= 0 && r < ROWS && c >= 0 && c < COLS) this.manejarClickCelda(r, c);
        });

        //Buscar
        document.getElementById('search-btn').addEventListener('click', () => this.ejecutarBusqueda());
        document.getElementById('search-peticion').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.ejecutarBusqueda();
        });
    }

    cambiarModo(modo) {
        this.modoActual = modo;
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        if (modo === 'view')   document.getElementById('btn-view').classList.add('active');
        if (modo === 'origin') document.getElementById('btn-origin').classList.add('active');
        if (modo === 'dest')   document.getElementById('btn-dest').classList.add('active');
    }

    manejarClickCelda(r, c) {
        const nombre = this.modelo.obtenerNombreZona(r, c);
        document.getElementById('cx').textContent    = c;
        document.getElementById('cy').textContent    = r;
        document.getElementById('czone').textContent = nombre;
        document.getElementById('sb-sel').innerHTML  = `SELECCIÓN: <span>Fila ${r}, Col ${c} (${nombre})</span>`;

        if (this.modoActual === 'origin') {
            this.modelo.nodoOrigen = { r, c };
            this.vista.actualizarUI(this.modelo);
            this.cambiarModo('view');
        } else if (this.modoActual === 'dest') {
            this.modelo.nodoDestino = { r, c };
            this.vista.actualizarUI(this.modelo);
            this.cambiarModo('view');
        }
        this.vista.dibujar(this.modelo);
    }

    ejecutarBusqueda() {
        const consulta = document.getElementById('search-peticion').value.trim().toLowerCase();
        if (!consulta) return;
        const encontrado = this.lugaresEnMapa.find(item => item.nombre.toLowerCase().includes(consulta));
        if (encontrado) {
            this.enfocarCelda(encontrado.r, encontrado.c);
            this.manejarClickCelda(encontrado.r, encontrado.c);
        } else {
            alert('No se encontró ningún lugar con ese nombre.');
        }
    }

    enfocarCelda(r, c) {
        const aw = this.vista.contenedorMapa.clientWidth;
        const ah = this.vista.contenedorMapa.clientHeight;
        this.vista.escala = 2.0;
        this.vista.tx = aw / 2 - (c * CELL + CELL / 2) * this.vista.escala;
        this.vista.ty = ah / 2 - (r * CELL + CELL / 2) * this.vista.escala;
        this.vista.aplicarTransformacion();
    }

    zoomCentro(factor) {
        const escalaAnterior = this.vista.escala;
        const nuevaEscala    = Math.min(4, Math.max(0.2, escalaAnterior * factor));
        const cx = this.vista.contenedorMapa.clientWidth  / 2;
        const cy = this.vista.contenedorMapa.clientHeight / 2;
        this.vista.tx = cx - (cx - this.vista.tx) * (nuevaEscala / escalaAnterior);
        this.vista.ty = cy - (cy - this.vista.ty) * (nuevaEscala / escalaAnterior);
        this.vista.escala = nuevaEscala;
        this.vista.aplicarTransformacion();
    }
}

//main
document.addEventListener('DOMContentLoaded', () => {
    const modelo      = new ModeloMapa();
    const vista       = new VistaMapa();
    const controlador = new ControladorMapa(modelo, vista);
    controlador.iniciar();
});