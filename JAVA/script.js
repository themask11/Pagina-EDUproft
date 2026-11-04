const $ = id => document.getElementById(id);
const leer = (clave, defecto) => { try { return JSON.parse(localStorage.getItem(clave)) || defecto; } catch (e) { return defecto; } };
const guardar = (clave, valor) => localStorage.setItem(clave, JSON.stringify(valor));
const formatoPrecio = valor => '$' + valor.toLocaleString('es-CL');
const avisar = (el, texto, ok) => { el.textContent = texto; el.className = `mensaje-compra ${ok ? 'mensaje-exito' : 'mensaje-error'}`; };
const idProducto = new URLSearchParams(location.search).get('id');

document.querySelectorAll('.dropdown .dropbtn').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const dropdown = btn.parentElement;
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) d.classList.remove('activo-dropdown');
        });
        dropdown.classList.toggle('activo-dropdown');
    });
});

window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => {
        d.classList.remove('activo-dropdown');
    });
});

const equipo = [
    { nombre: 'Vicente Leiva', rol: 'Desarrollador HTML, CSS y JavaScript', foto: 'IMG/yo.jpg', descripcion: 'Especializado en el dominio de código y diseño web.' },
    { nombre: 'Jose Cabello', rol: 'Jefe de ensamblaje', foto: 'IMG/marge.jpg', descripcion: 'Encargado de el ensamblaje, control de calidad y soporte técnico.' },
    { nombre: 'Cilin Jhonny', rol: 'Jefatura de ventas online.', foto: 'IMG/cartman.jpg', descripcion: 'Encargado de el marketing, atención al cliente y ventas online.' }
];

if ($('equipo')) {
    $('equipo').innerHTML = equipo.map(m => `
        <div class="tarjeta-miembro">
            <img src="${m.foto}" alt="${m.nombre}">
            <h3>${m.nombre}</h3>
            <h4>${m.rol}</h4>
            <p>${m.descripcion}</p>
        </div>`).join('');
}

const crearProducto = (id, nombre, precio, descripcion, specs, imagen = `IMG/${id}.webp`) => ({ id, nombre, precio, imagen, descripcion, specs });

const productos = [
    crearProducto('pc1', 'PC Gama Básica Ofimática Ryzen 5 5600G', 359990, 'Equipo ideal para ofimática, estudio y navegación diaria. Viene armado, testeado y listo para usar.',
        [['Gama', 'Básica'], ['Procesador', 'AMD Ryzen 5 5600G'], ['Memoria RAM', '16GB DDR4'], ['Almacenamiento', 'SSD NVMe 500GB'], ['Tarjeta de video', 'Gráficos integrados Radeon']]),
    crearProducto('pc2', 'PC Gama Básica Estudio Intel Core i3-12100', 329990, 'Equipo pensado para estudiantes: rápido para clases online, trabajos y multitarea liviana.',
        [['Gama', 'Básica'], ['Procesador', 'Intel Core i3-12100'], ['Memoria RAM', '16GB DDR4'], ['Almacenamiento', 'SSD SATA 512GB'], ['Tarjeta de video', 'Intel UHD Graphics 730']]),
    crearProducto('pc3', 'PC Gama Media Gaming Ryzen 5 7600 + RTX 4060', 649990, 'Equipo para jugar en 1080p con buena fluidez y también apto para programación.',
        [['Gama', 'Media'], ['Procesador', 'AMD Ryzen 5 7600'], ['Memoria RAM', '16GB DDR5'], ['Almacenamiento', 'SSD NVMe 1TB'], ['Tarjeta de video', 'NVIDIA GeForce RTX 4060 8GB']]),
    crearProducto('component1', 'Procesador AMD Ryzen 5 7600', 189990, 'Procesador de 6 núcleos y 12 hilos con arquitectura Zen 4, ideal para gaming y multitarea.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM5'], ['Núcleos / Hilos', '6 / 12'], ['Frecuencia máxima', '5.1 GHz']]),
    crearProducto('component2', 'Procesador Intel Core i5-13400F', 169990, 'Procesador de 10 núcleos con excelente rendimiento para gaming y programación. Requiere tarjeta de video dedicada.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '10 / 16'], ['Frecuencia máxima', '4.6 GHz']]),
    crearProducto('component3', 'Tarjeta de Video NVIDIA GeForce RTX 4060 8GB', 329990, 'Tarjeta de video para jugar en 1080p con trazado de rayos y DLSS 3.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'NVIDIA'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0 x8'], ['Consumo', '115 W']]),
    crearProducto('component4', 'Tarjeta de Video AMD Radeon RX 7600 8GB', 279990, 'Tarjeta de video de gran relación precio-rendimiento para jugar en 1080p.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'AMD'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0 x8'], ['Consumo', '165 W']]),
    crearProducto('component5', 'Placa Madre ASUS Prime B650M-A AM5', 149990, 'Placa madre compatible con procesadores AMD Ryzen serie 7000 y memoria DDR5.',
        [['Categoría', 'Placas madre'], ['Marca', 'ASUS'], ['Socket', 'AM5'], ['Formato', 'Micro-ATX'], ['Memoria', 'DDR5']]),
    crearProducto('component6', 'Memoria RAM Kingston Fury Beast 16GB DDR5 5600MHz', 74990, 'Módulo de memoria DDR5 de alto rendimiento con compatibilidad Intel XMP 3.0.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'Kingston'], ['Capacidad', '16GB'], ['Tipo', 'DDR5'], ['Frecuencia', '5600 MHz']]),
    crearProducto('component7', 'SSD NVMe Samsung 980 1TB', 69990, 'Unidad de estado sólido NVMe para cargas rápidas de sistema operativo, juegos y programas.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Samsung'], ['Capacidad', '1TB'], ['Interfaz', 'PCIe 3.0 NVMe'], ['Lectura secuencial', '3500 MB/s']]),
    crearProducto('component8', 'Fuente de Poder Corsair CX650 650W 80 Plus Bronze', 59990, 'Fuente de poder con certificación 80 Plus Bronze para equipos de gama media.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'Corsair'], ['Potencia', '650 W'], ['Certificación', '80 Plus Bronze'], ['Formato', 'ATX']]),
    crearProducto('component9', 'Gabinete Gamer Vidrio Templado ARGB', 64990, 'Gabinete con paneles de vidrio templado y ventiladores ARGB incluidos.',
        [['Categoría', 'Gabinetes'], ['Formato', 'Mid Tower ATX'], ['Panel lateral', 'Vidrio templado'], ['Ventiladores', 'ARGB'], ['Color', 'Negro']]),
    crearProducto('component10', 'Refrigeración Líquida 240mm ARGB', 69990, 'Refrigeración líquida AIO con radiador de 240mm y ventiladores ARGB.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Líquida AIO'], ['Radiador', '240mm'], ['Iluminación', 'ARGB'], ['Compatibilidad', 'Intel LGA1700 / AMD AM5']]),
    crearProducto('component11', 'Monitor Gamer LG 24" FHD 144Hz IPS', 87990, 'Monitor gamer con panel IPS, 144Hz y compatibilidad con NVIDIA G-SYNC y AMD FreeSync.',
        [['Categoría', 'Monitores'], ['Marca', 'LG'], ['Resolución', 'FHD (1920 x 1080)'], ['Frecuencia', '144Hz'], ['Panel', 'IPS']]),
    crearProducto('component12', 'Teclado Mecánico Gamer RGB', 34990, 'Teclado mecánico con switches rojos e iluminación RGB personalizable.',
        [['Categoría', 'Teclados y mouse'], ['Tipo', 'Mecánico'], ['Switch', 'Rojo'], ['Iluminación', 'RGB'], ['Conexión', 'USB']]),
    crearProducto('component13', 'Windows 11 Home Licencia Digital', 139990, 'Licencia digital de Windows 11 Home para instalar en tu equipo armado.',
        [['Categoría', 'Sistemas operativos'], ['Marca', 'Microsoft'], ['Versión', 'Windows 11 Home'], ['Licencia', 'Digital'], ['Arquitectura', '64 bits']], 'IMG/so.jpeg'),
    crearProducto('component14', 'Procesador AMD Ryzen 3 4100', 69990, 'Procesador quad-core eficiente con solución térmica Wraith Stealth incluida.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM4'], ['Núcleos / Hilos', '4 / 8'], ['Frecuencia base', '3.8 GHz']], 'IMG/component13.png'),
    crearProducto('component15', 'Procesador AMD Ryzen 5 4500', 89990, 'Procesador de 6 núcleos Serie 4000 para presupuestos ajustados y buen rendimiento.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM4'], ['Núcleos / Hilos', '6 / 12'], ['Frecuencia base', '3.6 GHz']], 'IMG/component14.jpg'),
    crearProducto('component16', 'Procesador AMD Ryzen 5 5500', 99990, 'Excelente procesador Serie 5000 para armado de PCs económicos.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM4'], ['Núcleos / Hilos', '6 / 12'], ['Frecuencia máxima', '4.2 GHz']], 'IMG/component15.webp'),
    crearProducto('component17', 'Procesador AMD Ryzen 5 5600X', 149990, 'Procesador de 6 núcleos y 12 hilos hasta 4.6 GHz max boost con 35 MB de caché.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM4'], ['Núcleos / Hilos', '6 / 12'], ['Frecuencia máxima', '4.6 GHz']], 'IMG/component16.webp'),
    crearProducto('component18', 'Procesador AMD Ryzen 5 7600 (OEM)', 185990, 'Procesador Ryzen 5 7000 Series con 6 núcleos y gráficos AMD Radeon integrados.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM5'], ['Núcleos / Hilos', '6 / 12'], ['Frecuencia base', '3.80 GHz']], 'IMG/component17.webp'),
    crearProducto('component19', 'Procesador AMD Ryzen 7 5700X', 179990, 'Procesador de 8 núcleos de alto rendimiento Serie 5000 para multitarea pesada.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM4'], ['Núcleos / Hilos', '8 / 16'], ['Frecuencia máxima', '4.6 GHz']], 'IMG/component18.webp'),
    crearProducto('component20', 'Procesador AMD Ryzen 7 7700X', 289990, 'Procesador de 8 núcleos para socket AM5 pensado para máxima velocidad en juegos.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM5'], ['Núcleos / Hilos', '8 / 16'], ['Frecuencia máxima', '5.4 GHz']], 'IMG/component19.jpg'),
    crearProducto('component21', 'Procesador AMD Ryzen 9 7900X', 429990, 'Procesador de alto rendimiento 7000 Series con 12 núcleos para renderizado y streaming.',
        [['Categoría', 'Procesadores'], ['Marca', 'AMD'], ['Socket', 'AM5'], ['Núcleos / Hilos', '12 / 24'], ['Frecuencia máxima', '5.6 GHz']], 'IMG/component20.webp'),
    crearProducto('component22', 'Procesador Intel Core i3-12100F (12th Gen)', 84990, 'Procesador de 12va generación Intel, excelente relación calidad-precio.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '4 / 8'], ['Frecuencia máxima', '4.3 GHz']], 'IMG/component21.webp'),
    crearProducto('component23', 'Procesador Intel Core i3-13100F (13th Gen)', 94990, 'Procesador de 13ra generación Intel ideal para gaming de entrada.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '4 / 8'], ['Frecuencia máxima', '4.5 GHz']], 'IMG/component22.jpg'),
    crearProducto('component25', 'Procesador Intel Core i5-13600KF (13th Gen)', 279990, 'Procesador Intel Core i5 de 13ra generación desbloqueado para overclocking.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '14 / 20'], ['Frecuencia máxima', '5.1 GHz']], 'IMG/component25.jpg'),
    crearProducto('component26', 'Procesador Intel Core i9-12900K (12th Gen)', 389990, 'Procesador de gama alta Intel 12va generación para estaciones de trabajo y gaming extremo.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '16 / 24'], ['Frecuencia máxima', '5.2 GHz']], 'IMG/component26.webp'),
    crearProducto('component27', 'Procesador Intel Core i9-13900K (13th Gen)', 499990, 'Procesador tope de gama Intel 13ra generación con arquitectura híbrida avanzada.',
        [['Categoría', 'Procesadores'], ['Marca', 'Intel'], ['Socket', 'LGA1700'], ['Núcleos / Hilos', '24 / 32'], ['Frecuencia máxima', '5.8 GHz']], 'IMG/component27.jpg'),

    crearProducto('component28', 'Tarjeta de Video NVIDIA GeForce GTX 1650 4GB', 149990, 'Tarjeta gráfica compacta de entrada ideal para juegos esports.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'NVIDIA'], ['Memoria', '4GB GDDR6'], ['Interfaz', 'PCIe 3.0'], ['Consumo', '75 W']],'IMG/component28.jpg'),
    crearProducto('component29', 'Tarjeta de Video NVIDIA GeForce RTX 3050 8GB', 219990, 'Entrada a la tecnología Ray Tracing y DLSS de NVIDIA.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'NVIDIA'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0'], ['Consumo', '130 W']]),
    crearProducto('component30', 'Tarjeta de Video NVIDIA GeForce RTX 4060 Ti 8GB', 429990, 'Rendimiento fluido en 1080p y 1440p con arquitectura Ada Lovelace.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'NVIDIA'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0'], ['Consumo', '160 W']],'IMG/component30.jpg'),
    crearProducto('component31', 'Tarjeta de Video AMD Radeon RX 6650 XT 8GB', 259990, 'Excelente relación precio-rendimiento para juego full HD.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'AMD'], ['Memoria', '8GB GDDR6'], ['Interfaz', 'PCIe 4.0'], ['Consumo', '180 W']],'IMG/component31.jpg'),
    crearProducto('component32', 'Tarjeta de Video AMD Radeon RX 7600 XT 16GB', 369990, 'Memoria VRAM ampliada para texturas en alta resolución.',
        [['Categoría', 'Tarjetas de video'], ['Marca', 'AMD'], ['Memoria', '16GB GDDR6'], ['Interfaz', 'PCIe 4.0'], ['Consumo', '190 W']]),

    crearProducto('component33', 'Memoria RAM Kingston Fury Beast 16GB DDR4 2666MHz', 429990, 'Módulo estándar fiable para plataformas DDR4.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'Kingston'], ['Capacidad', '16GB'], ['Tipo', 'DDR4'], ['Frecuencia', '2666 MHz']],'IMG/component33.jpg'),
    crearProducto('component34', 'Memoria RAM Corsair Vengeance RGB PRO 16GB (2x8GB) DDR4 3200MHz', 64990, 'Kit Dual Channel con iluminación RGB avanzada.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'Corsair'], ['Capacidad', '16GB (2x8GB)'], ['Tipo', 'DDR4'], ['Frecuencia', '3200 MHz']]),
    crearProducto('component35', 'Memoria RAM TeamGroup T-Force Delta RGB 32GB (2x16GB) DDR4 3600MHz', 99990, 'Capacidad amplia y alta frecuencia en DDR4 con disipador térmico.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'TeamGroup'], ['Capacidad', '32GB (2x16GB)'], ['Tipo', 'DDR4'], ['Frecuencia', '3600 MHz']]),
    crearProducto('component36', 'Memoria RAM Corsair Vengeance 32GB (2x16GB) DDR5 5600MHz', 129990, 'Rendimiento DDR5 de nueva generación para multitarea pesada.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'Corsair'], ['Capacidad', '32GB (2x16GB)'], ['Tipo', 'DDR5'], ['Frecuencia', '5600 MHz']],'IMG/component36.jpg'),
    crearProducto('component37', 'Memoria RAM G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000MHz', 159990, 'Frecuencia extrema optimizada para setups de alto nivel.',
        [['Categoría', 'Memoria RAM'], ['Marca', 'G.Skill'], ['Capacidad', '32GB (2x16GB)'], ['Tipo', 'DDR5'], ['Frecuencia', '6000 MHz']]),

    crearProducto('component38', 'SSD SATA Kingston A400 240GB', 22990, 'Almacenamiento sólido formato 2.5 pulgadas para acelerar equipos.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Kingston'], ['Capacidad', '240GB'], ['Interfaz', 'SATA III'], ['Lectura secuencial', '500 MB/s']]),
    crearProducto('component39', 'SSD SATA Crucial MX500 1TB', 68990, 'SATA de alta fiabilidad con protección contra pérdida de energía.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Crucial'], ['Capacidad', '1TB'], ['Interfaz', 'SATA III'], ['Lectura secuencial', '560 MB/s']]),
    crearProducto('component40', 'SSD NVMe Crucial P3 1TB', 64990, 'Unidad de estado sólido NVMe M.2 rápida para gaming y archivos.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Crucial'], ['Capacidad', '1TB'], ['Interfaz', 'PCIe 3.0 NVMe'], ['Lectura secuencial', '3500 MB/s']]),
    crearProducto('component41', 'SSD NVMe Western Digital Black SN850X 1TB', 109990, 'Disco NVMe PCIe 4.0 ultra rápido optimizado para gamers.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Western Digital'], ['Capacidad', '1TB'], ['Interfaz', 'PCIe 4.0 NVMe'], ['Lectura secuencial', '7300 MB/s']]),
    crearProducto('component42', 'Disco Duro HDD Seagate Barracuda 2TB 3.5"', 54990, 'Disco duro mecánico tradicional para almacenamiento secundario de archivos.',
        [['Categoría', 'Almacenamiento'], ['Marca', 'Seagate'], ['Capacidad', '2TB'], ['Interfaz', 'SATA III 3.5"'], ['RPM', '7200 RPM']]),

    crearProducto('component43', 'Fuente de Poder EVGA 700 BR 700W 80 Plus Bronze', 67990, 'Potencia continua y confiable con certificación 80 Plus Bronze.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'EVGA'], ['Potencia', '700 W'], ['Certificación', '80 Plus Bronze'], ['Formato', 'ATX']],'IMG/component43.jpg'),
    crearProducto('component44', 'Fuente de Poder Corsair RM650 650W 80 Plus Gold Modular', 104990, 'Cableado totalmente modular y eficiencia Gold supersilenciosa.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'Corsair'], ['Potencia', '650 W'], ['Certificación', '80 Plus Gold Modular'], ['Formato', 'ATX']],'IMG/component44.avif'),
    crearProducto('component45', 'Fuente de Poder Cooler Master MWE 750W 80 Plus Gold', 109990, 'Suministro eléctrico estable preparado para tarjetas exigentes.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'Cooler Master'], ['Potencia', '750 W'], ['Certificación', '80 Plus Gold'], ['Formato', 'ATX']],'IMG/component45.jpg'),
    crearProducto('component46', 'Fuente de Poder DeepCool PK650D 650W 80 Plus Bronze', 56990, 'Fuente eficiente con protecciones eléctricas completas.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'DeepCool'], ['Potencia', '650 W'], ['Certificación', '80 Plus Bronze'], ['Formato', 'ATX']]),
    crearProducto('component47', 'Fuente de Poder Seasonic Focus GX-850 850W 80 Plus Gold Modular', 149990, 'Calidad de construcción premium con 10 años de garantía.',
        [['Categoría', 'Fuentes de poder'], ['Marca', 'Seasonic'], ['Potencia', '850 W'], ['Certificación', '80 Plus Gold Modular'], ['Formato', 'ATX']],'IMG/component47.jpg'),

    crearProducto('component48', 'Cooler CPU Cooler Master Hyper 212 Halo ARGB', 39990, 'Iconico disipador por aire renovado con ventilador ARGB Halo.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Aire'], ['Heatpipes', '4'], ['Iluminación', 'ARGB'], ['Compatibilidad', 'Intel / AMD']]),
    crearProducto('component49', 'Cooler CPU Noctua NH-D15 chromax.black', 129990, 'El disipador de aire tope de gama en acabado negro mate silencioso.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Aire de doble torre'], ['Heatpipes', '6'], ['Color', 'Negro Chromax'], ['Compatibilidad', 'Universal']]),
    crearProducto('component50', 'Refrigeración Líquida DeepCool LS520 240mm ARGB', 89990, 'Bomba de cuarta generación con diseño de espejo infinito ARGB.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Líquida AIO'], ['Radiador', '240mm'], ['Iluminación', 'ARGB'], ['Compatibilidad', 'Universal']],'IMG/component50.avif'),
    crearProducto('component51', 'Refrigeración Líquida DeepCool LT720 360mm ARGB', 124990, 'Radiador de 360mm con estética tridimensional de espejo cúbico.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Líquida AIO'], ['Radiador', '360mm'], ['Iluminación', 'ARGB'], ['Compatibilidad', 'Universal']]),
    crearProducto('component52', 'Refrigeración Líquida NZXT Kraken 360 RGB', 219990, 'Sistema AIO con pantalla LCD personalizable y ventiladores RGB.',
        [['Categoría', 'Refrigeración'], ['Tipo', 'Líquida AIO'], ['Radiador', '360mm'], ['Pantalla', 'LCD 1.54"'], ['Compatibilidad', 'Universal']],'IMG/component52.webp')
];


const buscar = id => productos.find(p => p.id === id);
const categoria = p => p.specs[0][0] === 'Categoría' ? p.specs[0][1] : 'PC armado';
const aleatorios = (cantidad, excluir) => productos.filter(p => p.id !== excluir).sort(() => Math.random() - 0.5).slice(0, cantidad);
const totalDe = items => items.reduce((suma, i) => suma + (buscar(i.id)?.precio || 0) * i.cantidad, 0);

const tarjetaProducto = p => `
    <a class="tarjeta-producto" href="producto.html?id=${p.id}">
        <img src="${p.imagen}" alt="${p.nombre}">
        <span class="etiqueta">${categoria(p)}</span>
        <h3>${p.nombre}</h3>
        <p class="tarjeta-precio">${formatoPrecio(p.precio)}</p>
    </a>`;

const obtenerCarrito = () => leer('carrito', []);
const guardarCarrito = carrito => guardar('carrito', carrito);
const quitarDelCarrito = id => guardarCarrito(obtenerCarrito().filter(i => i.id !== id));

function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id);
    if (item) item.cantidad++;
    else carrito.push({ id, cantidad: 1 });
    guardarCarrito(carrito);
}

function cambiarCantidad(id, cambio) {
    guardarCarrito(obtenerCarrito().map(i => i.id === id ? { ...i, cantidad: i.cantidad + cambio } : i).filter(i => i.cantidad > 0));
}

function openTab(evt, tabName) {
    document.querySelectorAll('.tab-content, .tab-btn').forEach(el => el.classList.remove('active'));
    $(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function renderCarrito() {
    const contenedor = $('carrito-items');
    if (!contenedor) return;
    const lineas = obtenerCarrito().filter(i => buscar(i.id));

    $('carrito-cantidad').textContent = lineas.reduce((suma, i) => suma + i.cantidad, 0);
    $('carrito-total').textContent = formatoPrecio(totalDe(lineas));

    contenedor.innerHTML = lineas.length ? lineas.map(({ id, cantidad }) => {
        const p = buscar(id);
        return `
            <li class="carrito-item">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="carrito-item-info">
                    <h3>${p.nombre}</h3>
                    <p>${formatoPrecio(p.precio)} c/u</p>
                </div>
                <div class="carrito-cantidad">
                    <button data-id="${id}" data-accion="restar">-</button>
                    <span>${cantidad}</span>
                    <button data-id="${id}" data-accion="sumar">+</button>
                </div>
                <strong class="carrito-subtotal">${formatoPrecio(p.precio * cantidad)}</strong>
                <button class="carrito-quitar" data-id="${id}" data-accion="quitar">Quitar</button>
            </li>`;
    }).join('') : '<li class="carrito-vacio">Tu carrito está vacío. <a href="servicio.html">Ver productos</a></li>';
}

function renderCatalogo(texto = '') {
    const busqueda = texto.trim().toLowerCase();
    const filtrados = productos.filter(p => `${p.nombre} ${categoria(p)}`.toLowerCase().includes(busqueda));
    $('catalogo').innerHTML = filtrados.map(tarjetaProducto).join('') || '<p class="carrito-vacio">No se encontraron productos.</p>';
}

if ($('catalogo')) {
    renderCatalogo();
    $('buscador')?.addEventListener('input', e => renderCatalogo(e.target.value));
}

['destacados', 'relacionados'].forEach(id => {
    if ($(id)) $(id).innerHTML = aleatorios(4, idProducto).map(tarjetaProducto).join('');
});

if ($('producto')) {
    const p = buscar(idProducto);
    $('producto').innerHTML = p ? `
        <div class="ventana-venta">
            <div class="columna-imagen">
                <img src="${p.imagen}" alt="${p.nombre}" class="img-exhibicion">
            </div>
            <div class="columna-detalles">
                <div class="product-tabs">
                    <button class="tab-btn active" onclick="openTab(event, 'sobre-producto')">Sobre este producto</button>
                    <button class="tab-btn" onclick="openTab(event, 'especificaciones')">Especificaciones</button>
                    <button class="tab-btn" onclick="openTab(event, 'garantia')">Garantía</button>
                </div>
                <div id="sobre-producto" class="tab-content active">
                    <h2>Sobre el producto</h2>
                    <p>${p.descripcion}</p>
                </div>
                <div id="especificaciones" class="tab-content">
                    <h2>Especificaciones Generales</h2>
                    <table class="tabla-specs">
                        ${p.specs.map(([nombre, valor]) => `<tr><td><strong>${nombre}:</strong></td><td>${valor}</td></tr>`).join('')}
                    </table>
                </div>
                <div id="garantia" class="tab-content">
                    <h2>Información de Garantía</h2>
                    <p>Todo producto nuevo cuenta con una garantía legal de seis meses contados desde la fecha de compra en caso de falla de fábrica (Ley del consumidor 19.496). Además, los componentes cuentan con la garantía del fabricante.</p>
                </div>
            </div>
        </div>
        <div class="precio">
            <h1>${p.nombre}</h1>
            <h1>${formatoPrecio(p.precio)}</h1>
            <p>${categoria(p) === 'PC armado' ? 'Incluye ensamblaje y testeo' : 'Transferencia / Débito'}</p>
            <button id="btnEstatico">+ Agregar al carro</button>
            <p id="mensaje-agregado" class="mensaje-compra mensaje-exito"></p>
            <ul class="lista-beneficios">
                <li>Garantía legal de 6 meses y del fabricante</li>
                <li>Retiro en el taller o despacho por courier</li>
                <li>Si quieres, te lo armamos y probamos</li>
            </ul>
        </div>` : '<p>Producto no encontrado.</p>';

    $('btnEstatico')?.addEventListener('click', () => {
        agregarAlCarrito(p.id);
        $('mensaje-agregado').textContent = 'Producto añadido al carrito.';
    });
}

if ($('carrito-items')) {
    $('carrito-items').addEventListener('click', e => {
        const boton = e.target.closest('button[data-accion]');
        if (!boton) return;
        const { id, accion } = boton.dataset;
        if (accion === 'quitar') quitarDelCarrito(id);
        else cambiarCantidad(id, accion === 'sumar' ? 1 : -1);
        renderCarrito();
    });
    renderCarrito();
}

function guardarUsuario(usuario) {
    guardar('usuarioActivo', usuario);
    guardar('usuarios', leer('usuarios', []).map(u => u.correo === usuario.correo ? usuario : u));
}

function pedirSesion() {
    if ($('modal-sesion')) return;
    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-sesion" class="modal-fondo">
            <div class="modal-caja" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
                <button type="button" class="modal-cerrar" id="modal-cerrar" aria-label="Cerrar">&times;</button>
                <div id="modal-contenido"></div>
            </div>
        </div>`);

    const modal = $('modal-sesion');
    const contenido = $('modal-contenido');

    function esc(e) { if (e.key === 'Escape') cerrar(); }
    function cerrar() {
        modal.remove();
        document.removeEventListener('keydown', esc);
    }
    document.addEventListener('keydown', esc);
    $('modal-cerrar').addEventListener('click', cerrar);
    modal.addEventListener('click', e => { if (e.target === modal) cerrar(); });

    const vistaInicial = () => {
        contenido.innerHTML = `
            <h2 id="modal-titulo">Necesitas una cuenta para comprar</h2>
            <p>Inicia sesión o crea tu cuenta para finalizar tu compra. Tu carrito se mantiene guardado.</p>
            <div class="modal-botones">
                <button type="button" class="btn btn-azul" id="modal-ir-login">Iniciar sesión</button>
                <button type="button" class="btn" id="modal-ir-registro">Crear cuenta</button>
            </div>`;
        $('modal-ir-login').addEventListener('click', () => vistaFormulario('login'));
        $('modal-ir-registro').addEventListener('click', () => vistaFormulario('registro'));
    };

    const sesionIniciada = usuario => {
        localStorage.removeItem('esAdmin');
        guardar('usuarioActivo', usuario);
        if ($('nav-cuenta')) $('nav-cuenta').textContent = 'Mi cuenta';
        cerrar();
        if ($('mensaje-compra')) avisar($('mensaje-compra'), 'Sesión iniciada. Ya puedes presionar Comprar para finalizar tu pedido.', true);
    };

    const vistaFormulario = modo => {
        const esLogin = modo === 'login';
        contenido.innerHTML = `
            <h2 id="modal-titulo">${esLogin ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
            <form id="modal-form" class="modal-form">
                <label for="modal-correo">Correo electrónico:</label>
                <input type="email" id="modal-correo" required>

                <label for="modal-password">Contraseña:</label>
                <input type="password" id="modal-password" required>

                <button type="submit" class="btn btn-azul">${esLogin ? 'Ingresar' : 'Registrarme'}</button>
                <p id="modal-mensaje" class="mensaje-compra"></p>
            </form>
            <div class="modal-enlaces">
                <button type="button" class="modal-enlace" id="modal-volver">← Volver</button>
                <button type="button" class="modal-enlace" id="modal-cambiar">${esLogin ? '¿No tienes cuenta? Crear cuenta' : '¿Ya tienes cuenta? Iniciar sesión'}</button>
            </div>`;

        $('modal-correo').focus();
        $('modal-volver').addEventListener('click', vistaInicial);
        $('modal-cambiar').addEventListener('click', () => vistaFormulario(esLogin ? 'registro' : 'login'));

        $('modal-form').addEventListener('submit', e => {
            e.preventDefault();
            const correo = $('modal-correo').value.trim().toLowerCase();
            const password = $('modal-password').value;
            const aviso = $('modal-mensaje');
            const lista = leer('usuarios', []);

            if (esLogin) {
                const encontrado = lista.find(u => u.correo === correo && u.password === password);
                if (!encontrado || correo === 'admin') return avisar(aviso, 'Correo o contraseña incorrectos.', false);
                return sesionIniciada(encontrado);
            }

            if (lista.some(u => u.correo === correo)) return avisar(aviso, 'El correo electrónico ya está registrado.', false);
            const nuevo = { correo, password, nombre: '', apellido: '', fotoPerfil: '', compras: [] };
            guardar('usuarios', [...lista, nuevo]);
            sesionIniciada(nuevo);
        });
    };

    vistaInicial();
}

$('btnComprar')?.addEventListener('click', () => {
    const aviso = $('mensaje-compra');
    const carrito = obtenerCarrito();
    if (!carrito.length) return avisar(aviso, 'Tu carrito está vacío. Agrega productos para poder comprar.', false);

    const sesion = leer('usuarioActivo', null);
    if (!sesion) return pedirSesion();

    const usuario = leer('usuarios', []).find(u => u.correo === sesion.correo) || sesion;
    const fecha = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    guardarUsuario({ ...usuario, compras: [...(usuario.compras || []), { fecha, total: totalDe(carrito), items: carrito }] });

    guardarCarrito([]);
    renderCarrito();
    avisar(aviso, '¡Gracias por tu compra! Tu pedido fue registrado y guardado en tu historial.', true);
});

const reglasFiltro = {
    cpu: ['procesador', 'ryzen', 'intel'],
    gpu: ['tarjeta de video', 'rtx', 'gtx', 'radeon'],
    ram: ['memoria ram'],
    almacenamiento: ['ssd', 'disco duro'],
    fuente: ['fuente de poder'],
    refrigeracion: ['refrigeración', 'cooler'],
    so: ['licencia']
};

const nombresCategorias = {
    cpu: 'Procesadores (CPU)',
    gpu: 'Tarjetas de Video (GPU)',
    ram: 'Memorias RAM',
    almacenamiento: 'Almacenamiento (SSD/HDD)',
    fuente: 'Fuentes de Poder',
    refrigeracion: 'Refrigeración / Ventilación',
    so: 'Sistemas Operativos'
};

const obtenerTextoCompatibilidad = p => {
    const specsMap = new Map(p.specs);
    const compat = [];

    if (specsMap.has('Socket')) compat.push(`Socket ${specsMap.get('Socket')}`);
    if (specsMap.has('Tipo')) compat.push(`Tipo ${specsMap.get('Tipo')}`);
    if (specsMap.has('Memoria')) compat.push(specsMap.get('Memoria'));
    if (specsMap.has('Interfaz')) compat.push(specsMap.get('Interfaz'));
    if (specsMap.has('Compatibilidad')) compat.push(specsMap.get('Compatibilidad'));
    if (specsMap.has('Formato')) compat.push(`Formato ${specsMap.get('Formato')}`);
    if (specsMap.has('Certificación')) compat.push(specsMap.get('Certificación'));
    if (specsMap.has('Licencia')) compat.push(`Licencia ${specsMap.get('Licencia')}`);

    if (compat.length) {
        return `Compatibilidad: ${compat.join(' | ')}`;
    }

    if (p.id.startsWith('pc')) {
        return 'Compatibilidad: Sistema preensamblado listo para usar';
    }

    return 'Compatibilidad: Estándar ATX / Universal';
};

function ejecutarFiltroDeComponentes() {
    const contenedor = $('resultados-compatibles');
    if (!contenedor) return;
    const seleccionadas = [...document.querySelectorAll('input[name="componente"]:checked')].map(cb => cb.value);
    const soloCompatibles = $('soloCompatibles')?.checked;

    if (!seleccionadas.length) {
        contenedor.innerHTML = '<p><em>Por favor, selecciona al menos una categoría de componente.</em></p>';
        return;
    }

    let componentes = productos.filter(p => {
        if (!p.id.startsWith('component')) return false;
        return seleccionadas.some(cat => {
            const catNombre = categoria(p).toLowerCase();
            const nombreP = p.nombre.toLowerCase();
            if (cat === 'cpu') return catNombre.includes('procesador') || nombreP.includes('procesador') || nombreP.includes('ryzen') || nombreP.includes('intel');
            if (cat === 'gpu') return catNombre.includes('tarjetas de video') || nombreP.includes('tarjeta de video') || nombreP.includes('rtx') || nombreP.includes('gtx') || nombreP.includes('radeon');
            if (cat === 'ram') return catNombre.includes('memoria ram') || nombreP.includes('memoria ram') || nombreP.includes('ddr4') || nombreP.includes('ddr5');
            if (cat === 'almacenamiento') return catNombre.includes('almacenamiento') || nombreP.includes('ssd') || nombreP.includes('disco duro');
            if (cat === 'fuente') return catNombre.includes('fuentes de poder') || nombreP.includes('fuente de poder');
            if (cat === 'refrigeracion') return catNombre.includes('refrigeración') || nombreP.includes('cooler') || nombreP.includes('refrigeración');
            if (cat === 'so') return catNombre.includes('sistemas operativos') || nombreP.includes('windows');
            return false;
        });
    });

    if (soloCompatibles) {
        const tieneAM4 = componentes.some(p => p.specs.some(s => s[1].toLowerCase().includes('am4')));
        const tieneAM5 = componentes.some(p => p.specs.some(s => s[1].toLowerCase().includes('am5')));
        const tieneLGA1700 = componentes.some(p => p.specs.some(s => s[1].toLowerCase().includes('lga1700')));

        componentes = componentes.filter(p => {
            const specsTexto = JSON.stringify(p.specs).toLowerCase();
            if (tieneAM4) {
                if (specsTexto.includes('am5') || specsTexto.includes('lga1700')) return false;
                if (specsTexto.includes('ddr5') && !specsTexto.includes('ddr4')) return false;
            }
            if (tieneAM5) {
                if (specsTexto.includes('am4') || specsTexto.includes('lga1700')) return false;
                if (specsTexto.includes('ddr4')) return false;
            }
            if (tieneLGA1700) {
                if (specsTexto.includes('am4') || specsTexto.includes('am5')) return false;
            }
            return true;
        });
    }

    componentes.sort((a, b) => a.precio - b.precio);

    const fila = (p, clase, enlace) => `
        <div class="card-producto-filtro ${clase}">
            <div class="filtro-info">
                <img src="${p.imagen}" alt="${p.nombre}">
                <div>
                    <h4>${p.nombre}</h4>
                    <p>${p.descripcion}</p>
                    <small style="display: inline-block; margin-top: 5px; color: #15803d; font-weight: 600; background: #f0fdf4; padding: 3px 8px; border-radius: 4px; border: 1px solid #bbf7d0;">
                        ✓ ${obtenerTextoCompatibilidad(p)}
                    </small>
                </div>
            </div>
            <div class="filtro-precio">
                <span>${formatoPrecio(p.precio)}</span>
                <a href="producto.html?id=${p.id}">${enlace}</a>
            </div>
        </div>`;

    let htmlDivisiones = '';

    seleccionadas.forEach(cat => {
        const compsCat = componentes.filter(p => {
            const catNombre = categoria(p).toLowerCase();
            const nombreP = p.nombre.toLowerCase();
            if (cat === 'cpu') return catNombre.includes('procesador') || nombreP.includes('procesador') || nombreP.includes('ryzen') || nombreP.includes('intel');
            if (cat === 'gpu') return catNombre.includes('tarjetas de video') || nombreP.includes('tarjeta de video') || nombreP.includes('rtx') || nombreP.includes('gtx') || nombreP.includes('radeon');
            if (cat === 'ram') return catNombre.includes('memoria ram') || nombreP.includes('memoria ram') || nombreP.includes('ddr4') || nombreP.includes('ddr5');
            if (cat === 'almacenamiento') return catNombre.includes('almacenamiento') || nombreP.includes('ssd') || nombreP.includes('disco duro');
            if (cat === 'fuente') return catNombre.includes('fuentes de poder') || nombreP.includes('fuente de poder');
            if (cat === 'refrigeracion') return catNombre.includes('refrigeración') || nombreP.includes('cooler') || nombreP.includes('refrigeración');
            if (cat === 'so') return catNombre.includes('sistemas operativos') || nombreP.includes('windows');
            return false;
        });

        if (compsCat.length) {
            htmlDivisiones += `
                <div class="mini-division-categoria" style="margin-top: 25px; margin-bottom: 15px; border-bottom: 2px solid var(--borde, #e2e8f0); padding-bottom: 8px;">
                    <h4 style="margin: 0; color: var(--primario, #1e3a8a); font-size: 1.1rem;">
                        ${nombresCategorias[cat] || cat}
                    </h4>
                </div>
                <div class="lista-filtrada-grid">
                    ${compsCat.map(p => fila(p, '', 'Ver detalle')).join('')}
                </div>`;
        }
    });

    contenedor.innerHTML = `
        <h3 class="filtro-titulo">Componentes encontrados organizados por categoría y ordenados por menor precio:</h3>
        ${htmlDivisiones || '<p><em>No hay componentes sueltos compatibles para esta selección específica.</em></p>'}
        <div class="mini-division-categoria" style="margin-top: 35px; margin-bottom: 15px; border-bottom: 2px solid var(--borde, #e2e8f0); padding-bottom: 8px;">
            <h4 style="margin: 0; color: #1e3a8a; font-size: 1.1rem;">Sugerencias de PCs Armadas Compatibles</h4>
        </div>
        <div class="lista-filtrada-grid">${productos.filter(p => p.id.startsWith('pc')).map(p => fila(p, 'pc-armada', 'Ver PC Armada')).join('')}</div>`;
}

function renderHistorialCompras(compras) {
    const lista = $('historial-compras');
    if (!lista) return;
    lista.innerHTML = compras?.length ? compras.map((c, i) => `
        <li class="compra-historial">
            <div class="compra-cabecera">
                <strong>Compra #${i + 1} - Fecha: ${c.fecha}</strong>
                <span>Total: ${formatoPrecio(c.total || 0)}</span>
            </div>
            <ul style="list-style: none; padding: 0; margin-top: 10px;">
                ${c.items.map(item => {
                    const p = buscar(item.id);
                    return `<li style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                        <img src="${p ? p.imagen : ''}" alt="${p ? p.nombre : 'Producto'}" style="width: 40px; height: 40px; object-fit: contain; background: #fff; border: 1px solid var(--borde); border-radius: 4px;">
                        <span>${p ? p.nombre : 'Producto'} - Cantidad: ${item.cantidad} (${formatoPrecio((p ? p.precio : 0) * item.cantidad)})</span>
                    </li>`;
                }).join('')}
            </ul>
        </li>`).join('') : '<li>No tienes compras registradas todavía.</li>';
}

function renderPanelAdmin() {
    const contenedor = $('contenedor-usuarios-admin');
    if (!contenedor) return;
    const clientes = leer('usuarios', []).filter(u => u.correo !== 'admin' && u.correo !== 'administrador');

    contenedor.innerHTML = clientes.length ? clientes.map(u => `
        <div class="tarjeta-admin">
            <div class="admin-cabecera">
                ${u.fotoPerfil ? `<img src="${u.fotoPerfil}" alt="Foto de perfil">` : '<div class="admin-sin-foto">Sin foto</div>'}
                <div>
                    <h4>${u.correo}</h4>
                    <p><strong>Nombre:</strong> ${u.nombre || 'No registrado'} ${u.apellido || ''}</p>
                </div>
            </div>
            <h5>Historial de productos comprados:</h5>
            ${u.compras?.length ? `<ul>${u.compras.map(c => `
                <li>
                    <strong>Fecha: ${c.fecha}</strong> - Total: ${formatoPrecio(c.total || 0)}
                    <ul style="list-style: none; padding: 0; margin-top: 5px;">${c.items.map(i => {
                        const p = buscar(i.id);
                        return `<li style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                            <img src="${p ? p.imagen : ''}" alt="${p ? p.nombre : 'Producto'}" style="width: 35px; height: 35px; object-fit: contain; background: #fff; border: 1px solid var(--borde); border-radius: 4px;">
                            <span>${p ? p.nombre : 'Producto'} (Cant: ${i.cantidad})</span>
                        </li>`;
                    }).join('')}</ul>
                </li>`).join('')}</ul>` : '<p class="admin-vacio">Este usuario aún no ha realizado compras.</p>'}
        </div>`).join('') : '<p>No hay cuentas de usuarios clientes registradas.</p>';
}

const pagina = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('header a:not(:first-child)').forEach(a => {
    if (a.getAttribute('href') === (pagina === 'producto.html' ? 'servicio.html' : pagina)) a.classList.add('activo');
});

const paginaActual = location.pathname.split('/').pop() || 'index.html';

if (paginaActual !== 'registro.html') {
    document.querySelector('footer')?.insertAdjacentHTML('beforebegin', (a => `
        <section class="publicidad">
            <div class="publicidad-imagen"><img src="${a.imagen}" alt="${a.nombre}"></div>
            <div class="publicidad-texto">
                <span class="etiqueta">Te recomendamos</span>
                <h2>${a.nombre}</h2>
                <p>${a.descripcion}</p>
                <strong>${formatoPrecio(a.precio)}</strong>
                <a class="boton" href="producto.html?id=${a.id}">Ver producto</a>
            </div>
        </section>`)(aleatorios(1, idProducto)[0]));
}

document.addEventListener('DOMContentLoaded', () => {
    const usuarios = leer('usuarios', []);
    if (!usuarios.some(u => u.correo === 'admin')) {
        guardar('usuarios', [...usuarios, { correo: 'admin', password: '123', nombre: 'Admin', apellido: 'General', compras: [] }]);
    }

    $('btnFiltrar')?.addEventListener('click', ejecutarFiltroDeComponentes);

    const usuarioActivo = leer('usuarioActivo', null);
    const esAdmin = localStorage.getItem('esAdmin') === 'true';
    const formRegistro = $('form-registro');
    const contenedorForms = formRegistro?.closest('main');
    const inputNombre = $('user-nombre');
    const inputApellido = $('user-apellido');
    const btnEditar = $('btn-habilitar-edicion');
    const ver = (el, visible, tipo = 'block') => { if (el) el.style.display = visible ? tipo : 'none'; };

    const mostrarFoto = src => {
        if (src) $('preview-foto').src = src;
        ver($('preview-foto'), !!src);
        ver($('sin-foto'), !src, 'flex');
    };

    const modoEdicion = editando => {
        inputNombre.disabled = inputApellido.disabled = !editando;
        ver($('btn-guardar-datos'), editando, 'inline-block');
        btnEditar.textContent = editando ? 'Cancelar' : 'Modificar Datos';
        btnEditar.classList.toggle('btn-naranja', editando);
        btnEditar.classList.toggle('btn-azul', !editando);
    };

    if ($('nav-cuenta')) {
        $('nav-cuenta').textContent = esAdmin ? 'Panel Admin' : usuarioActivo ? 'Mi cuenta' : 'Inicio de sesión';
    }

    if (esAdmin) {
        ver(contenedorForms, false);
        ver($('panel-usuario'), false);
        if ($('panel-admin')) {
            ver($('panel-admin'), true);
            renderPanelAdmin();
        }
    } else if (usuarioActivo && $('panel-usuario')) {
        ver(contenedorForms, false);
        ver($('panel-usuario'), true);
        $('span-correo').textContent = usuarioActivo.correo;
        inputNombre.value = usuarioActivo.nombre || '';
        inputApellido.value = usuarioActivo.apellido || '';
        mostrarFoto(usuarioActivo.fotoPerfil);
        renderHistorialCompras(usuarioActivo.compras);
    }

    btnEditar?.addEventListener('click', () => {
        const editar = inputNombre.disabled;
        modoEdicion(editar);
        if (!editar && usuarioActivo) {
            inputNombre.value = usuarioActivo.nombre || '';
            inputApellido.value = usuarioActivo.apellido || '';
        }
    });

    if (usuarioActivo) {
        $('input-foto')?.addEventListener('change', e => {
            const archivo = e.target.files[0];
            if (!archivo) return;
            const lector = new FileReader();
            lector.onload = ev => {
                usuarioActivo.fotoPerfil = ev.target.result;
                guardarUsuario(usuarioActivo);
                mostrarFoto(usuarioActivo.fotoPerfil);
            };
            lector.readAsDataURL(archivo);
        });

        $('form-datos-personales')?.addEventListener('submit', e => {
            e.preventDefault();
            const aviso = $('mensaje-datos');
            const [nombre, apellido] = [inputNombre, inputApellido].map(i => i.value.trim());
            if (!nombre || !apellido) return avisar(aviso, 'Por favor completa ambos campos.', false);

            const capitalizar = t => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
            usuarioActivo.nombre = inputNombre.value = capitalizar(nombre);
            usuarioActivo.apellido = inputApellido.value = capitalizar(apellido);
            guardarUsuario(usuarioActivo);
            modoEdicion(false);
            avisar(aviso, '¡Datos personales actualizados correctamente!', true);
        });
    }

    formRegistro?.addEventListener('submit', e => {
        e.preventDefault();
        const correo = $('reg-correo').value.trim().toLowerCase();
        const aviso = $('mensaje-registro');
        const lista = leer('usuarios', []);
        if (lista.some(u => u.correo === correo)) return avisar(aviso, 'El correo electrónico ya está registrado.', false);

        guardar('usuarios', [...lista, { correo, password: $('reg-password').value, nombre: '', apellido: '', fotoPerfil: '', compras: [] }]);
        avisar(aviso, '¡Registro exitoso! Ya puedes iniciar sesión.', true);
        formRegistro.reset();
    });

    $('form-login')?.addEventListener('submit', e => {
        e.preventDefault();
        const correo = $('login-correo').value.trim().toLowerCase();
        const password = $('login-password').value;
        const encontrado = leer('usuarios', []).find(u => u.correo === correo && u.password === password);
        if (!encontrado || correo === 'admin') return avisar($('mensaje-login'), 'Correo o contraseña incorrectos.', false);

        localStorage.removeItem('esAdmin');
        guardar('usuarioActivo', encontrado);
        location.reload();
    });

    $('form-login-admin')?.addEventListener('submit', e => {
        e.preventDefault();
        if ($('admin-correo').value.trim().toLowerCase() === 'admin' && $('admin-password').value === '123') {
            localStorage.setItem('esAdmin', 'true');
            localStorage.removeItem('usuarioActivo');
            return location.reload();
        }
        avisar($('mensaje-login-admin'), 'Credenciales de administrador incorrectas.', false);
    });

    $('CerrarSesion')?.addEventListener('click', () => { localStorage.removeItem('usuarioActivo'); location.reload(); });
    $('CerrarSesionAdmin')?.addEventListener('click', () => { localStorage.removeItem('esAdmin'); location.reload(); });
});
