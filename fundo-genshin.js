
(() => {
    const canvas = document.getElementById("genshin-bg");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let largura = 0;
    let altura = 0;
    let particulas = [];
    let raf;

    const mouse = {
        x: -1000,
        y: -1000,
        ativo: false
    };

    const cores = [
        "#ffe6a3", // Dourado
        "#8df8ed", // Anemo
        "#8ecbff", // Hydro
        "#d9a6ff", // Electro
        "#ffad91", // Pyro
        "#d5f5ff"  // Cryo
    ];

    function redimensionar() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        largura = window.innerWidth;
        altura = window.innerHeight;

        canvas.width = Math.round(largura * dpr);
        canvas.height = Math.round(altura * dpr);

        canvas.style.width = largura + "px";
        canvas.style.height = altura + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const quantidade = Math.min(
            130,
            Math.max(45, Math.floor(largura * altura / 12000))
        );

        particulas = Array.from(
            { length: quantidade },
            () => criarParticula(true)
        );
    }

    function criarParticula(aleatoria = false, x, y) {
        return {
            x: x ?? Math.random() * largura,
            y: y ?? Math.random() * altura,

            tamanho: Math.random() * 2.5 + 0.6,
            velocidadeX: (Math.random() - 0.5) * 0.35,
            velocidadeY: -(Math.random() * 0.55 + 0.12),

            fase: Math.random() * Math.PI * 2,
            brilho: Math.random() * 0.6 + 0.3,
            cor: cores[Math.floor(Math.random() * cores.length)],

            vida: aleatoria ? 1 : 0,
            duracao: 1
        };
    }

    function explosao(x, y) {
        for (let i = 0; i < 16; i++) {
            const p = criarParticula(false, x, y);
            const angulo = Math.random() * Math.PI * 2;
            const velocidade = Math.random() * 2.5 + 0.5;

            p.velocidadeX = Math.cos(angulo) * velocidade;
            p.velocidadeY = Math.sin(angulo) * velocidade;
            p.vida = 1;
            p.duracao = Math.random() * 45 + 25;

            particulas.push(p);
        }

        // Evita que os efeitos acumulem demais
        if (particulas.length > 260) {
            particulas.splice(0, particulas.length - 260);
        }
    }

    function desenharParticula(p, tempo) {
        const pulsacao =
            0.55 + Math.sin(tempo * 0.0015 + p.fase) * 0.35;

        const alpha = Math.max(0, Math.min(1, p.brilho * pulsacao));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.cor;
        ctx.shadowColor = p.cor;
        ctx.shadowBlur = p.tamanho * 5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fill();

        // Pequeno brilho em formato de cruz
        if (p.tamanho > 1.8) {
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillRect(
                p.x - p.tamanho * 2,
                p.y - 0.5,
                p.tamanho * 4,
                1
            );

            ctx.fillRect(
                p.x - 0.5,
                p.y - p.tamanho * 2,
                1,
                p.tamanho * 4
            );
        }
    }

    function animar(tempo) {
        ctx.clearRect(0, 0, largura, altura);

        // Brilho elemental discreto no cenário
        const gradiente = ctx.createRadialGradient(
            largura * 0.5,
            altura * 0.5,
            0,
            largura * 0.5,
            altura * 0.5,
            Math.max(largura, altura) * 0.7
        );

        gradiente.addColorStop(0, "#65d8c509");
        gradiente.addColorStop(1, "#65d8c500");

        ctx.fillStyle = gradiente;
        ctx.fillRect(0, 0, largura, altura);

        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];

            p.x += p.velocidadeX;
            p.y += p.velocidadeY;

            // O mouse atrai levemente as partículas próximas
            if (mouse.ativo) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distancia = Math.sqrt(dx * dx + dy * dy);

                if (distancia < 120 && distancia > 1) {
                    const forca = (1 - distancia / 120) * 0.018;

                    p.x += dx * forca;
                    p.y += dy * forca;
                }
            }

            if (p.vida > 0) {
                p.vida -= 1 / p.duracao;
                p.x += p.velocidadeX;
                p.y += p.velocidadeY;
                p.brilho = Math.max(0, p.vida);
            }

            desenharParticula(p, tempo);

            if (
                p.y < -20 ||
                p.x < -20 ||
                p.x > largura + 20 ||
                (p.vida <= 0 && p.duracao !== 1)
            ) {
                particulas[i] = criarParticula();
            }
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        raf = requestAnimationFrame(animar);
    }

    window.addEventListener("mousemove", (evento) => {
        mouse.x = evento.clientX;
        mouse.y = evento.clientY;
        mouse.ativo = true;
    });

    window.addEventListener("mouseout", (evento) => {
        if (!evento.relatedTarget) {
            mouse.ativo = false;
        }
    });

    window.addEventListener("touchmove", (evento) => {
        const toque = evento.touches[0];

        if (toque) {
            mouse.x = toque.clientX;
            mouse.y = toque.clientY;
            mouse.ativo = true;
        }
    }, { passive: true });

    window.addEventListener("touchend", () => {
        mouse.ativo = false;
    }, { passive: true });

    window.addEventListener("click", (evento) => {
        explosao(evento.clientX, evento.clientY);
    });

    window.addEventListener("resize", redimensionar);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(raf);
        } else {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(animar);
        }
    });

    redimensionar();
    raf = requestAnimationFrame(animar);
})();
