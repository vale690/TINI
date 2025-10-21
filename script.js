document.addEventListener('DOMContentLoaded', () => {

    // ----- Datos (simulan "productos" pero son secciones) -----
    const secciones = [
        { id: 1, titulo: 'Biografía', descripcion: 'Martina Stoessel nació el 21 de marzo de 1997 en Buenos Aires, Argentina. Es cantante, actriz y compositora.' },
        { id: 2, titulo: 'Carrera Artística', descripcion: 'Saltó a la fama con Violetta y luego desarrolló una exitosa carrera musical.' },
        { id: 3, titulo: 'Discografía', descripcion: 'Álbumes: TINI (2016), Quiero Volver (2018), Tini Tini Tini (2020), Cupido (2022).' },
        { id: 4, titulo: 'Galería', descripcion: 'Colección de fotos: conciertos, sesiones y eventos.' }
    ];

    // ----- Referencias al DOM (comprobamos existencia) -----
    const galeriaImgs = document.querySelectorAll('.galeria img'); // NodeList (puede estar vacío)
    const contBio = document.getElementById('biografia');
    const contCarrera = document.getElementById('carrera');
    const contDisco = document.getElementById('discografia');
    const contRefs = document.getElementById('referencias');

    // Confirmación en consola (útil para debugging)
    console.log('Inicializando script.js — buscando elementos del DOM...');

    // Mostrar qué elementos se encontraron (debug)
    console.log('Galería imágenes encontradas:', galeriaImgs.length);
    console.log('Contenedores - biografía:', !!contBio, 'carrera:', !!contCarrera, 'discografía:', !!contDisco, 'referencias:', !!contRefs);

    // ----- Efecto hover en imágenes (si existen) -----
    if (galeriaImgs && galeriaImgs.length > 0) {
        galeriaImgs.forEach(img => {
            // seguridad: comprobar que img es un elemento HTML
            if (!(img instanceof HTMLElement)) return;

            img.addEventListener('mouseover', () => {
                img.style.transition = 'transform 0.3s ease';
                img.style.transform = 'scale(1.05)';
            });
            img.addEventListener('mouseout', () => {
                img.style.transform = 'scale(1)';
            });

            // Opcional: click para mostrar info relacionada (sin errores)
            img.addEventListener('click', () => {
                // si quieres mostrar algo al click, usa la función mostrarInfoSeccion
                mostrarInfoSeccion(4); // 4 = Galería
            });
        });
    }

    // ----- Función: mostrar información de sección (segura) -----
    function mostrarInfoSeccion(id) {
        const s = secciones.find(item => item.id === id);
        if (!s) {
            console.warn('mostrarInfoSeccion: sección no encontrada para id =', id);
            return;
        }

        // En lugar de alert pesado, mostramos un modal simple si existe el contenedor,
        // si no, usamos console.info (evita romper flujo)
        try {
            // crear modal simple temporal
            const modalId = 'info-seccion-modal';
            let modal = document.getElementById(modalId);

            if (!modal) {
                modal = document.createElement('div');
                modal.id = modalId;
                modal.style.position = 'fixed';
                modal.style.inset = '0';
                modal.style.background = 'rgba(0,0,0,0.6)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = '9999';
                modal.innerHTML = `
                    <div style="background:#fff;padding:20px;border-radius:8px;max-width:90%;min-width:260px">
                        <h3 style="margin-top:0;">${s.titulo}</h3>
                        <p>${s.descripcion}</p>
                        <div style="text-align:right;margin-top:12px;">
                            <button id="${modalId}-cerrar" style="padding:8px 12px;border:none;background:#007bff;color:#fff;border-radius:6px;cursor:pointer;">Cerrar</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                // evento cerrar
                const btnCerrar = document.getElementById(${modalId}-cerrar);
                if (btnCerrar) {
                    btnCerrar.addEventListener('click', () => {
                        modal.remove();
                    });
                }

                // cerrar al hacer click fuera del cuadro
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) modal.remove();
                });
            } else {
                // si ya existe, actualizar contenido
                const titulo = modal.querySelector('h3');
                const parrafo = modal.querySelector('p');
                if (titulo) titulo.textContent = s.titulo;
                if (parrafo) parrafo.textContent = s.descripcion;
                modal.style.display = 'flex';
            }
        } catch (err) {
            // si algo falla, no rompas la página: caemos a console
            console.info(${s.titulo}: ${s.descripcion});
            console.error('Error al crear modal info-seccion:', err);
        }
    }

    // ----- Opcional: crear botones tipo "Mostrar/Ocultar" encima de cada sección (como en tu ejemplo) -----
    const seccionesDom = document.querySelectorAll('.contenedor-seccion');
    if (seccionesDom && seccionesDom.length > 0) {
        seccionesDom.forEach((sec) => {
            // crear botón solo si la sección tiene id
            const id = sec.id || '';
            if (!id) return;

            const btn = document.createElement('button');
            btn.textContent = Mostrar / Ocultar ${id};
            btn.style.display = 'block';
            btn.style.margin = '10px auto';
            btn.style.padding = '8px 12px';
            btn.style.border = 'none';
            btn.style.borderRadius = '6px';
            btn.style.background = '#007bff';
            btn.style.color = '#fff';
            btn.style.cursor = 'pointer';

            sec.parentNode.insertBefore(btn, sec);

            // inicialmente ocultar todas menos biografia (igual que en tu ejemplo)
            if (id !== 'biografia') sec.style.display = 'none';

            btn.addEventListener('click', () => {
                sec.style.display = (sec.style.display === 'none') ? 'block' : 'none';
            });
        });
    }

    // ----- Fin -----
    console.log('script.js listo y sin dependencias externas.');

});
