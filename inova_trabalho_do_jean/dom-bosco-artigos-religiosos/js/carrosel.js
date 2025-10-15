// ===== CARROSSEL =====
        let slideAtual = 0;
        let intervaloCarrossel;

        function iniciarCarrossel() {
            const slides = document.querySelectorAll('.carrossel-slide');
            const controls = document.getElementById('carrosselControls');
            
            slides.forEach((slide, index) => {
                const dot = document.createElement('div');
                dot.className = 'carrossel-dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => irParaSlide(index);
                controls.appendChild(dot);
            });

            intervaloCarrossel = setInterval(() => {
                slideAtual = (slideAtual + 1) % slides.length;
                atualizarCarrossel();
            }, 4000);
        }

        function irParaSlide(index) {
            slideAtual = index;
            atualizarCarrossel();
            clearInterval(intervaloCarrossel);
            intervaloCarrossel = setInterval(() => {
                slideAtual = (slideAtual + 1) % document.querySelectorAll('.carrossel-slide').length;
                atualizarCarrossel();
            }, 4000);
        }

        function atualizarCarrossel() {
            const slides = document.querySelectorAll('.carrossel-slide');
            const dots = document.querySelectorAll('.carrossel-dot');
            
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === slideAtual);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideAtual);
            });
        }