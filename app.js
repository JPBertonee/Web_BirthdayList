$(document).ready(function () {
    // Función para cargar la sección seleccionada
    function loadSection(section) {
        const sections = {
            "inicio": `
                <section id="inicio" class="inicio-bg">
                    <div class="overlay">
                        <div class="intro-text">
                            <h1>Bienvenido a Mi Perfil Profesional</h1>
                            <p>Explora mis habilidades como Analista y Científico de Datos</p>
                        </div>
                    </div>
                </section>
            `,
            "quien-soy": `
                <section id="quien-soy">
                    <h2>Quién Soy</h2>
                    <p>Soy un Analista y Científico de Datos con experiencia en análisis de datos, modelos predictivos y visualización avanzada.</p>
                </section>
            `,
            "estudios": `
                <section id="estudios">
                    <h2>Estudios</h2>
                    <ul>
                        <li><strong>Maestría en Ciencia de Datos</strong> - Universidad XYZ (2020 - 2022)</li>
                        <li><strong>Licenciatura en Ingeniería en Sistemas</strong> - Universidad ABC (2015 - 2020)</li>
                        <li><strong>Certificación en Machine Learning</strong> - Plataforma Online (2021)</li>
                        <li><strong>Certificación en Análisis de Datos con Python</strong> - Plataforma Online (2020)</li>
                    </ul>
                </section>
            `,
            "proyectos": `
                <section id="proyectos">
                    <h2>Proyectos</h2>
                    <div class="project-grid">
                        <div class="project-item">
                            <h3>Proyecto 1: Análisis de Ventas Predictivo</h3>
                            <p>Este proyecto utiliza modelos de machine learning para predecir las ventas futuras de una empresa.</p>
                            <a href="https://github.com/tuusuario/proyecto1" class="button" target="_blank">Ver en GitHub</a>
                        </div>
                        <div class="project-item">
                            <h3>Proyecto 2: Clasificación de Imágenes con Redes Neuronales</h3>
                            <p>Modelo de red neuronal convolucional para la clasificación de imágenes.</p>
                            <a href="https://github.com/tuusuario/proyecto2" class="button" target="_blank">Ver en GitHub</a>
                        </div>
                    </div>
                </section>
            `,
            "herramientas": `
                <section id="herramientas">
                    <h2>Herramientas Utilizadas</h2>
                    <div class="tools-grid">
                        <div class="tool-item">
                            <img src="images/python-logo.png" alt="Python" class="tool-logo">
                            <p>Python</p>
                        </div>
                        <div class="tool-item">
                            <img src="images/r-logo.png" alt="R" class="tool-logo">
                            <p>R</p>
                        </div>
                        <div class="tool-item">
                            <img src="images/sql-logo.png" alt="SQL" class="tool-logo">
                            <p>SQL</p>
                        </div>
                    </div>
                </section>
            `,
            "contacto": `
                <section id="contacto">
                    <h2>Contacto</h2>
                    <p>Puedes contactarme a través de mi correo electrónico: contacto@miemail.com</p>
                </section>
            `
        };

        // Reemplazar el contenido con la sección seleccionada
        $('#content').html(sections[section]);
    }

    // Cargar sección de inicio por defecto
    loadSection('inicio');

    // Manejador de clics en los enlaces de navegación
    $('.nav-link').on('click', function (e) {
        e.preventDefault();
        const target = $(this).data('target');
        loadSection(target);
    });
});
