const elImg = (k, ext) => `<img class="ei" src="assets/elementos/${k}.${ext}" alt="${k}">`;
const EL = {
    pyro: [elImg('pyro', 'png'), '#e8362d'],
    hydro: [elImg('hydro', 'webp'), '#3b8fe0'],
    electro: [elImg('electro', 'avif'), '#a05fe6'],
    cryo: [elImg('cryo', 'webp'), '#6cc7e3'],
    anemo: [elImg('anemo', 'webp'), '#43f6db'],
    dendro: [elImg('dendro', 'avif'), '#238343'],
    geo: [elImg('geo', 'webp'), '#e19c1c'],
    phys: ['⚔️', '#8d98a0']
};

const RX = {
    'cryo,hydro': ['Congelado', 1],
    'cryo,pyro': ['Derreter', 2],
    'electro,pyro': ['Sobrecarga', 2, 1],
    'hydro,pyro': ['Vaporizar', 1],
    'cryo,electro': ['Supercondutor', 1],
    'electro,hydro': ['Eletrocarga', 1],
    'dendro,hydro': ['Florescimento', 1],
    'dendro,pyro': ['Queimadura', 1],
    'dendro,electro': ['Intensificar', 1],
    'geo,pyro': ['Cristalizar', 1],
    'geo,hydro': ['Cristalizar', 1],
    'electro,geo': ['Cristalizar', 1],
    'cryo,geo': ['Cristalizar', 1],
};
const SWIRL = {
    direto: 2,                                         // dano extra no alvo atingido
    indireto: 1,                                       // dano nos vizinhos (elemento espalhado)
    elementos: ['pyro', 'hydro', 'electro', 'cryo']    // Geo e Dendro NÃO fazem Redemoinho
};

const PERF_IGNORA_ESCUDO = true;

const T = {
    diluc: {
        n: 'Diluc', e: '🦅', el: 'pyro', mx: 3, m: [
            { n: 'Espada Temperada', c: 2, el: 'phys', d: 2 },
            { n: 'Chama Obscura', c: 3, el: 'pyro', d: 3 },
            { n: 'Alvorada', c: 3, el: 'pyro', d: 7, b: 1 }
        ]
    },

    kaeya: {
        n: 'Kaeya', e: '🗡️', el: 'cryo', mx: 2, m: [
            { n: 'Esgrima Frio', c: 2, el: 'phys', d: 2 },
            { n: 'Frostgnaw', c: 3, el: 'cryo', d: 3 },
            { n: 'Dança Glacial', c: 3, el: 'cryo', d: 4, b: 1 }
        ]
    },

    fischl: {
        n: 'Fischl', e: '🦉', el: 'electro', mx: 2, m: [
            { n: 'Flecha Rápida', c: 2, el: 'phys', d: 2 },
            { n: 'Oz Noturno', c: 3, el: 'electro', d: 1, sm: 'oz' },
            { n: 'Descida da Noite', c: 3, el: 'electro', d: 4, b: 1 }
        ]
    },

    sucrose: {
        n: 'Sucrose', e: '📖', el: 'anemo', mx: 2, m: [
            { n: 'Vento Preciso', c: 1, el: 'anemo', d: 1 },
            { n: 'Vento Rodopiante', c: 3, el: 'anemo', d: 3, sw: 1 },
            { n: 'Frasco Caótico', c: 3, el: 'anemo', d: 4, b: 1 }
        ]
    },

    diona: {
        n: 'Diona', e: '🐱', el: 'cryo', mx: 2, m: [
            { n: 'Pontaria Felina', c: 2, el: 'phys', d: 2 },
            { n: 'Escudo de Patinhas', c: 3, el: 'cryo', d: 1, esc: 3 },
            { n: 'Coquetel da Cauda de Gato', c: 3, el: 'cryo', d: 3, b: 1, cura: 2 }
        ]
    },

    xiangling: {
        n: 'Xiangling', e: '🍜', el: 'pyro', mx: 2, m: [
            { n: 'Corte Rápido', c: 2, el: 'phys', d: 2 },
            { n: 'Guoba', c: 3, el: 'pyro', d: 2, sm: 'gouba' },
            { n: 'Pyronado', c: 3, el: 'pyro', d: 4, b: 1 }
        ]
    },

    mona: {
        n: 'Mona', e: '🔮', el: 'hydro', mx: 3, m: [
            { n: 'Raio d\'Água', c: 1, el: 'hydro', d: 1 },
            { n: 'Reflexo', c: 3, el: 'hydro', d: 1, sm: 'reflexo' },
            { n: 'Estrela Fatal', c: 3, el: 'hydro', d: 4, b: 1, buff: 2 }
        ]
    },

    barbara: {
        n: 'Barbara', e: '🎤', el: 'hydro', mx: 3, m: [
            { n: 'Gotas Cantantes', c: 1, el: 'hydro', d: 1 },
            { n: 'Melodia do Lar', c: 3, el: 'hydro', sm: 'melodia' },
            { n: 'Brilho de Estrela', c: 3, el: 'hydro', d: 1, cura: 4, b: 1, curaAlvo: 'todos' }
        ]
    },

    venti: {
        n: 'Venti', e: '🎻', el: 'anemo', mx: 2, m: [
            { n: 'Flecha Divina', c: 2, el: 'phys', d: 2 },
            { n: 'Hino dos Ventos', c: 3, el: 'anemo', d: 2, sw: 1 },
            { n: 'Ventos Cantantes', c: 3, el: 'anemo', d: 3, sm: 'ventos', b: 1 }
        ]
    },

    ganyu: {
        n: 'Ganyu', e: '🐐', el: 'cryo', mx: 3, m: [
            { n: 'Flecha Gelada', c: 2, el: 'cryo', d: 3 },
            { n: 'Trilha do Qilin', c: 3, el: 'cryo', d: 1, sm: 'flor' },
            { n: 'Chuva Celestial', c: 3, el: 'cryo', d: 6, b: 1 }
        ]
    },

    eula: {
        n: 'Eula', e: '❄️', el: 'cryo', mx: 2, m: [
            { n: 'Dança Glacial', c: 2, el: 'phys', d: 2 },
            { n: 'Lâmina Gélida', c: 3, el: 'cryo', d: 3 },
            { n: 'Onda da Maré Pálida', c: 3, el: 'cryo', d: 3, b: 1, sm: 'lamina' }
        ]
    },

    noelle: {
        n: 'Noelle', e: '🛡️', el: 'geo', mx: 2, m: [
            { n: 'Espada Favonius', c: 2, el: 'phys', d: 1 },
            { n: 'Couraça do Coração', c: 3, el: 'geo', d: 2, esc: 3 },
            { n: 'Grande Limpeza', c: 3, el: 'geo', d: 5, b: 1 }
        ]
    },

    durin: {
        n: 'Durin', e: '🐉', el: 'pyro', mx: 2, m: [
            { n: 'Presas Flamejantes', c: 2, el: 'phys', d: 2 },
            { n: 'Chama Dracônica', c: 3, el: 'pyro', d: 3 },
            { n: 'Coração do Dragão Carmesim', c: 3, el: 'pyro', d: 4, b: 1 }
        ]
    },

    jean: {
        n: 'Jean', e: '🌬️', el: 'anemo', mx: 2, m: [
            { n: 'Espada da Brisa', c: 2, el: 'phys', d: 2 },
            { n: 'Lâmina do Vendaval', c: 3, el: 'anemo', d: 3, sw: 1 },
            { n: 'Brisa da Alvorada', c: 3, el: 'anemo', d: 3, b: 1, cura: 4, curaAlvo: 'todos', buff: 2 }
        ]
    },

    zibai: {
        n: 'Zibai', e: '🌙', el: 'geo', mx: 2, m: [
            { n: 'Dança da Lua Branca', c: 2, el: 'phys', d: 2 },
            { n: 'Passos da Lua Celeste', c: 3, el: 'geo', d: 3 },
            { n: 'Eclipse da Lua Prateada', c: 3, el: 'geo', d: 6, b: 1 }
        ]
    },

    yelan: {
        n: 'Yelan', e: '🎲', el: 'hydro', mx: 2, m: [
            { n: 'Flechas Ocultas', c: 2, el: 'phys', d: 2 },
            { n: 'Fio das Sombras', c: 3, el: 'hydro', d: 4, pierce: 1 },
            { n: 'Lance da Sorte Oculta', c: 3, el: 'hydro', d: 4, b: 1 }
        ]
    },

    lanyan: {
        n: 'Lan Yan', e: '🪭', el: 'anemo', mx: 2, m: [
            { n: 'Dança das Plumas', c: 2, el: 'anemo', d: 2 },
            { n: 'Escudo das Andorinhas', c: 3, el: 'anemo', d: 2, esc: 3 },
            { n: 'Dança do Vendaval Lunar', c: 3, el: 'anemo', d: 4, b: 1 }
        ]
    },

    hutao: {
        n: 'Hu Tao', e: '🦋', el: 'pyro', mx: 2, m: [
            { n: 'Lança da Borboleta', c: 2, el: 'phys', d: 2 },
            { n: 'Chama da Passagem', c: 3, el: 'pyro', d: 3, imb: { el: 'pyro', d: 1 } },
            { n: 'Réquiem do Além', c: 3, el: 'pyro', d: 4, b: 1, cura: 2 }
        ]
    },

    beidou: {
        n: 'Beidou', e: '⚡', el: 'electro', mx: 2, m: [
            { n: 'Cortes da Maré', c: 2, el: 'phys', d: 2 },
            { n: 'Contra-ataque Trovejante', c: 3, el: 'electro', d: 3 },
            { n: 'Tempestade do Dragão Marinho', c: 3, el: 'electro', d: 4, b: 1 }
        ]
    },

    zhongli: {
        n: 'Zhongli', e: '🛡️', el: 'geo', mx: 2, m: [
            { n: 'Lança da Rocha', c: 2, el: 'phys', d: 2 },
            { n: 'Dominus Lapidis', c: 3, el: 'geo', d: 2, esc: 4 },
            { n: 'Chuva de Meteoros', c: 3, el: 'geo', d: 5, b: 1 }
        ]
    },

    raiden: {
        n: 'Raiden Shogun', e: '⚡', el: 'electro', mx: 3, m: [
            { n: 'Corte da Eternidade', c: 2, el: 'phys', d: 2 },
            { n: 'Juízo Relampejante', c: 3, el: 'electro', d: 3, sm: 'olho' },
            { n: 'Veredito da Deusa Inabalável', c: 3, el: 'electro', d: 6, b: 1 }
        ]
    },

    kokomi: {
        n: 'Sangonomiya Kokomi', e: '🪼', el: 'hydro', mx: 2, m: [
            { n: 'Dança das Marés', c: 1, el: 'hydro', d: 1 },
            { n: 'Juramento das Águas', c: 3, el: 'hydro', d: 2, sm: 'bakakura' },
            { n: 'Cerimônia da Lua Oceânica', c: 3, el: 'hydro', d: 3, b: 1, cura: 4, curaAlvo: 'todos' }
        ]
    },

    itto: {
        n: 'Arataki Itto', e: '👹', el: 'geo', mx: 2, m: [
            { n: 'Golpes do Oni', c: 2, el: 'phys', d: 2 },
            { n: 'Investida do Rei Demônio', c: 3, el: 'geo', d: 3, sm: 'ushi' },
            { n: 'Fúria do Oni', c: 3, el: 'geo', d: 2, b: 1, imb: { el: 'geo', d: 4, dur: 1 } }
        ]
    },

    kuki: {
        n: 'Kuki Shinobu', e: '⚡', el: 'electro', mx: 2, m: [
            { n: 'Lâmina Silenciosa', c: 2, el: 'phys', d: 2 },
            { n: 'Anel do Trovão', c: 3, el: 'electro', d: 2, sm: 'anel' },
            { n: 'Ritual da Tempestade Sombria', c: 3, el: 'electro', d: 3, b: 1, cura: 3 }
        ]
    },

    ayaka: {
        n: 'Kamisato Ayaka', e: '❄️', el: 'cryo', mx: 2, m: [
            { n: 'Arte Kamisato: Hyouka', c: 2, el: 'phys', d: 2 },
            { n: 'Arte Kamisato: Soumetsu', c: 3, el: 'cryo', d: 3 },
            { n: 'Arte Kamisato: Senho', c: 3, el: 'cryo', d: 5, b: 1 }
        ]
    },

    cyno: {
        n: 'Cyno', e: '🐺', el: 'electro', mx: 2, m: [
            { n: 'Presas do Juízo', c: 2, el: 'phys', d: 2 },
            { n: 'Investida do Julgamento', c: 3, el: 'electro', d: 3 },
            { n: 'Pactos do Deus Chacal', c: 3, el: 'electro', d: 4, b: 1, imb: { el: 'electro', d: 1, dur: 1 } }
        ]
    },

    nilou: {
        n: 'Nilou', e: '💃', el: 'hydro', mx: 2, m: [
            { n: 'Dança das Sete Águas', c: 2, el: 'phys', d: 2 },
            { n: 'Passos da Flor de Lótus', c: 3, el: 'hydro', d: 3 },
            { n: 'Dança do Paraíso Efêmero', c: 3, el: 'hydro', d: 4, b: 1 }
        ]
    },

    dori: {
        n: 'Dori', e: '💜', el: 'electro', mx: 2, m: [
            { n: 'Golpe da Fortuna', c: 2, el: 'phys', d: 2 },
            { n: 'Espírito da Lâmpada', c: 3, el: 'electro', d: 1, sm: 'lampada' },
            { n: 'Tesouro dos Mil Desejos', c: 3, el: 'electro', b: 1, d: 0, cura: 4, curaAlvo: 'todos' }
        ]
    },

    dehya: {
        n: 'Dehya', e: '🔥', el: 'pyro', mx: 3, m: [
            { n: 'Presas da Areia', c: 2, el: 'phys', d: 2 },
            { n: 'Égide das Chamas', c: 3, el: 'pyro', d: 3, imb: { el: 'pyro', d: 2, dur: 2 } },
            { n: 'Fúria da Leoa Flamejante', c: 3, el: 'pyro', d: 5, b: 1 }
        ]
    },

    furina: {
        n: 'Furina', e: '💧', el: 'hydro', mx: 2, m: [
            { n: 'Solista das Marés', c: 2, el: 'phys', d: 2 },
            { n: 'Companhia das Águas', c: 3, el: 'hydro', d: 1, sm: 'salon' },
            { n: 'Grande Finale: Aplausos Eternos', c: 3, el: 'hydro', d: 3, b: 1, buff: 2 }
        ]
    },

    navia: {
        n: 'Navia', e: '🌂', el: 'geo', mx: 2, m: [
            { n: 'Disparos Dourados', c: 2, el: 'phys', d: 2 },
            { n: 'Salva de Rosas de Cristal', c: 3, el: 'geo', d: 4 },
            { n: 'Chuva de Artilharia', c: 3, el: 'geo', d: 6, b: 1 }
        ]
    },

    wriothesley: {
        n: 'Wriothesley', e: '🥊', el: 'cryo', mx: 2, m: [
            { n: 'Punhos Congelantes', c: 2, el: 'cryo', d: 2 },
            { n: 'Investida Glacial', c: 3, el: 'cryo', d: 3 },
            { n: 'Execução da Geada Implacável', c: 3, el: 'cryo', d: 4, b: 1 }
        ]
    },

    arlecchino: {
        n: 'Arlecchino', e: '🔥', el: 'pyro', mx: 3, m: [
            { n: 'Dança da Lâmina Carmesim', c: 2, el: 'phys', d: 2 },
            { n: 'Marca da Sentença', c: 3, el: 'pyro', d: 3, imb: { el: 'pyro', d: 2, dur: 2 } },
            { n: 'Banquete da Lua Sangrenta', c: 3, el: 'pyro', d: 5, b: 1, cura: 2 }
        ]
    },

    skirk: {
        n: 'Skirk', e: '🌌', el: 'cryo', mx: 2, m: [
            { n: 'Cortes do Abismo', c: 2, el: 'phys', d: 2 },
            { n: 'Ruptura Dimensional', c: 3, el: 'cryo', d: 4, imb: { el: 'cryo', d: 2, dur: 2 } },
            { n: 'Silêncio da Estrela Negra', c: 3, el: 'cryo', d: 5, b: 1 }
        ]
    },

    mavuika: {
        n: 'Mavuika', e: '🔥', el: 'pyro', mx: 3, m: [
            { n: 'Cortes da Chama Eterna', c: 2, el: 'phys', d: 2 },
            { n: 'Cavalgada Flamejante', c: 3, el: 'pyro', d: 3 },
            { n: 'Sol Incandescente', c: 3, el: 'pyro', d: 7, b: 1 }
        ]
    },

    chasca: {
        n: 'Chasca', e: '🏹', el: 'anemo', mx: 2, m: [
            { n: 'Disparos do Vento Livre', c: 2, el: 'phys', d: 2 },
            { n: 'Cavaleira dos Céus', c: 3, el: 'anemo', d: 4 },
            { n: 'Salva do Horizonte Celeste', c: 3, el: 'anemo', d: 4, b: 1 }
        ]
    },

    xilonen: {
        n: 'Xilonen', e: '🎧', el: 'geo', mx: 2, m: [
            { n: 'Ritmo das Lâminas', c: 2, el: 'phys', d: 2 },
            { n: 'Batida das Montanhas', c: 3, el: 'geo', d: 3, buff: 2 },
            { n: 'Ressonância da Terra Dourada', c: 3, el: 'geo', d: 4, b: 1, cura: 2 }
        ]
    },

    varesa: {
        n: 'Varesa', e: '⚡', el: 'electro', mx: 2, m: [
            { n: 'Impacto Trovejante', c: 2, el: 'electro', d: 2 },
            { n: 'Mergulho Relampejante', c: 3, el: 'electro', d: 3 },
            { n: 'Suprema Investida Celeste', c: 3, el: 'electro', d: 5, b: 1 }
        ]
    },

    kinich: {
        n: 'Kinich', e: '🦎', el: 'dendro', mx: 2, m: [
            { n: 'Garras da Selva', c: 2, el: 'phys', d: 3 },
            { n: 'Gancho do Caçador', c: 3, el: 'dendro', d: 2 },
            { n: 'Juízo do Dragão Sauriano', c: 3, el: 'dendro', d: 4, b: 1 }
        ]
    },

    lauma: {
        n: 'Lauma', e: '🌿', el: 'dendro', mx: 2, m: [
            { n: 'Canto da Lua Verde', c: 2, el: 'dendro', d: 2 },
            { n: 'Bênção do Bosque Lunar', c: 3, el: 'dendro', d: 3, buff: 2 },
            { n: 'Hino da Lua Selvagem', c: 3, el: 'dendro', d: 4, b: 1 }
        ]
    },

    columbina: {
        n: 'Columbina', e: '🌙', el: 'hydro', mx: 2, m: [
            { n: 'Lágrimas Celestiais', c: 2, el: 'hydro', d: 2 },
            { n: 'Abraço do Luar', c: 3, el: 'hydro', d: 3, buff: 3 },
            { n: 'Canção do Eclipse Eterno', c: 3, el: 'hydro', d: 4, b: 1 }
        ]
    },

    flins: {
        n: 'Flins', e: '⚡', el: 'electro', mx: 2, m: [
            { n: 'Estocadas do Trovão', c: 2, el: 'phys', d: 2 },
            { n: 'Lança da Noite Eterna', c: 3, el: 'electro', d: 3 },
            { n: 'Réquiem da Lua Carmesim', c: 3, el: 'electro', d: 4, b: 1 }
        ]
    },

    nefer: {
        n: 'Nefer', e: '🐍', el: 'dendro', mx: 2, m: [
            { n: 'Lâminas do Véu Verde', c: 2, el: 'dendro', d: 2 },
            { n: 'Segredo das Sombras', c: 3, el: 'dendro', d: 3, imb: { el: 'dendro', d: 2, dur: 2 } },
            { n: 'Enigma da Serpente Esmeralda', c: 3, el: 'dendro', d: 4, b: 1 }
        ]
    },


};
// ===== COMO ADICIONAR PERSONAGENS / INVOCAÇÕES (o código lê estes dados e aplica as regras sozinho) =====
// Personagem (em T): {n:nome, e:emoji, el:'pyro|hydro|electro|cryo|anemo|phys', mx:carga da explosão, hp:vida (opcional, padrão 10), m:[ataque normal, habilidade, explosão]}
// Cada habilidade: {n:nome, c:custo, el:elemento, d:dano, b:1 (só na explosão), sm:'id da invocação', sw:1 (força o oponente a trocar), cura:N (cura o personagem ativo)}
// Invocação (em SM): {n:nome, e:emoji, el:elemento, d:dano por rodada, u:usos, cura:cura por rodada (opcional)}
// Preço na loja: PRECO. Moedas no fim da partida: MOEDAS. Fotos: objeto IMG (mesmo id do personagem ou da invocação).
const SM = {
    oz: { n: 'Oz', e: '🐦‍⬛', el: 'electro', d: 2, u: 2 },
    gouba: { n: 'Gouba', e: '🐻', el: 'pyro', d: 2, u: 2 },
    reflexo: { n: 'Reflexo da Água', e: '🪞', el: 'hydro', d: 2, u: 1 },
    melodia: { n: 'Que Comece o Espetáculo', e: '🎵', el: 'hydro', u: 2, cura: 2 },
    flor: { n: 'Lótus de Gelo', e: '🌸', el: 'cryo', d: 1, u: 2 },
    ventos: { n: 'Ventos Cantantes', e: '🍃', el: 'anemo', d: 2, u: 2 },
    olho: { n: 'Olho do Julgamento', e: '👁️‍🗨️', el: 'electro', d: 2, u: 3 },
    bakakura: { n: 'Bake-Kurage', e: '🪼', el: 'hydro', d: 1, u: 2, cura: 3 },
    ushi: { n: 'Explosão Akaushi', e: '🐂', el: 'geo', d: 1, u: 2 },
    lampada: { n: 'Lâmpada da Proteção', e: '🪔', el: 'electro', u: 2, cura: 4 },
    salon: { n: 'Membros do Salão', e: '🫧', el: 'hydro', u: 2, d: 2 },
    lamina: { n: 'Espada Luminosa', e: '🗡️', el: 'phys', u: 1, d: 6 },
    anel: { n: 'Anel da Tempestade', e: '💍', el: 'electro', u: 2, cura: 2, d: 1 },
};

const PRECO = { diluc: 0, kaeya: 0, fischl: 0, xiangling: 10, sucrose: 8, barbara: 9, mona: 10, venti: 10, ganyu: 15, noelle: 9, eula: 16, durin: 15, jean: 10, yelan: 16, zibai: 16, hutao: 15, beidou: 14, raiden: 16, kokomi: 15, itto: 14, kuki: 15, cyno: 14, nilou: 15, dori: 14, dehya: 14, furina: 16, navia: 15, wriothesley: 14, arlecchino: 16, skirk: 16, mavuika: 16, chasca: 15, xilonen: 14, kinich: 14, lauma: 14, columbina: 16, flins: 16, nefer: 15, zhongli: 15, lanyan: 10, varesa: 14, diona: 8 };

const OPONENTES = [
    { n: 'Hilichurl Estranho', img: 'assets/oponentes/hilichurl-estranho.png' },
    { n: 'Rhinedottir', img: 'assets/oponentes/rhinedottir.png', chance: 2 },
    { n: 'Operativa Fatui', img: 'assets/oponentes/fatuus2.webp' },
    { n: 'Cão da Fenda', img: 'assets/oponentes/cao.webp' },
    { n: 'Mago do Abismo', img: 'assets/oponentes/abyssmage-cryo.webp' },
    { n: 'Mago do Abismo', img: 'assets/oponentes/abyssmage-pyro.png' },
    { n: 'Oficial Fatui', img: 'assets/oponentes/fatuus.webp' },
    { n: 'Eremita dos Ventos', img: 'assets/oponentes/eremita.webp' },
    { n: 'Signora', img: 'assets/oponentes/signora.avif' },
    { n: 'Rei e Rainha', img: 'assets/oponentes/xadrez.webp' }
];

let ULT_OP = -1;
function escolheOp() {
    if (!OPONENTES.length) return null;
    const fixo = OPONENTES.reduce((s, o) => s + (o.chance || 0), 0), livres = OPONENTES.filter(o => o.chance == null).length;
    const w = OPONENTES.map(o => o.chance != null ? o.chance : (livres ? Math.max(0, 100 - fixo) / livres : 0));
    const sorteio = () => { let r = Math.random() * w.reduce((a, b) => a + b, 0); for (let i = 0; i < w.length; i++) { r -= w[i]; if (r < 0) return i } return w.length - 1 };
    let i = sorteio();
    for (let t = 0; t < 20 && OPONENTES.length > 1 && i == ULT_OP; t++) i = sorteio();   // evita repetir o da última partida
    ULT_OP = i; return OPONENTES[i];
}

const MOEDAS = { vitoria: 10, derrota: 5, porVivo: 1 };
const ENERGIA = 9;

const BGS = { fontaine: 'Fontaine', inazuma: 'Inazuma', liyue: 'Liyue', natlan: 'Natlan', nodkrai: 'Nod-Krai', sumeru: 'Sumeru' };

const PRECO_BG = 60;
const bgUrl = id => `assets/background/${id}-bg.png`;

let TAB = 'chars', SELBG = null;

const preco = id => PRECO[id] ?? 10;

let SV = { coins: 10, owned: ['diluc', 'kaeya', 'fischl'], team: ['diluc', 'kaeya', 'fischl'] }, SCR = 'home', SEL = null;

try { const s = JSON.parse(localStorage.getItem('gi_save')); if (s && s.owned && s.team) SV = s } catch (e) { }
SV.bgs = SV.bgs || []; SV.bg = SV.bg || null;

const save = () => { try { localStorage.setItem('gi_save', JSON.stringify(SV)) } catch (e) { } };
const refresh = () => SCR == 'home' ? home() : render();

function perf(f, n, exc) {
    f.ch.forEach((t, j) => {
        if (j == exc || t.hp <= 0) return;
        let x = n;
        if (!PERF_IGNORA_ESCUDO && t.sh > 0) { const a = Math.min(t.sh, x); t.sh -= a; x -= a }
        t.hp = Math.max(0, t.hp - x);
        G.pops.push({ s: f === G.p ? 'p' : 'o', i: j, t: x, r: 'Perfurante' });
        if (t.hp <= 0) { t.au = null; t.sh = 0; f.sm = f.sm.filter(y => y.own !== j) }
    });
    autoSw(f);
}

function heal(s, n, modo) {
    const vivos = s.ch.map((_, i) => i).filter(i => s.ch[i].hp > 0);
    let alvos;
    if (modo == 'todos') alvos = vivos;
    else if (modo == 'fraco') { const min = Math.min(...vivos.map(i => s.ch[i].hp)); alvos = [vivos.find(i => s.ch[i].hp == min)] }
    else alvos = [s.a];
    alvos.forEach(i => {
        const c = s.ch[i], h = Math.min(T[c.k].hp || 10, c.hp + n) - c.hp;
        c.hp += h;
        if (h > 0) G.pops.push({ s: s === G.p ? 'p' : 'o', i, t: h, h: 1 });
    });
}
const curaTxt = m => ({ todos: 'todo o time', fraco: 'o aliado com menos vida', self: 'o próprio personagem' })[m];

const mk = k => ({ ch: k.map(x => ({ k: x, hp: T[x].hp || 10, cg: 0, au: null })), a: 0, sm: [], pool: ENERGIA });

// ===== FOTOS DOS PERSONAGENS =====
// Opção 1: coloque o caminho/URL da imagem abaixo (URLs externas só carregam se você hospedar este arquivo por conta própria).
// Opção 2: passe o mouse na carta e clique em 📷 para enviar uma foto do computador (botão direito no 📷 remove). Fica salva no navegador.
// Proporção ideal: 160x250 (ex.: 320x500).
const IMG = { diluc: 'https://i.pinimg.com/736x/aa/a6/cb/aaa6cbe01f3d9f5a191b843b4495d9bb.jpg', kaeya: 'https://i.pinimg.com/736x/24/ad/ac/24adace51cf36012475e893ac7d6ee76.jpg', fischl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9vcePCS8K1er47KIJl2RNAgz4Wvdhb-xBekZPNT1H-A&s=10', sucrose: 'https://i.pinimg.com/736x/10/c4/cf/10c4cfa5a0eb314f9a37d8be1152916e.jpg', xiangling: 'https://i.pinimg.com/1200x/5a/ab/c1/5aabc1386b029aacc9d2bd47414ac3fc.jpg', mona: 'https://i.pinimg.com/736x/a1/24/fc/a124fcff172110f97f123786d66c4ca2.jpg', barbara: 'https://i.pinimg.com/736x/6b/ef/28/6bef28931a69f860c774fa9a28dfc955.jpg', venti: 'https://i.pinimg.com/1200x/97/37/7f/97377f2a2dde238f0dd2ce43aea01cf7.jpg', ganyu: 'https://i.pinimg.com/736x/d4/ba/3d/d4ba3d26d86acbd94741d58f247672e4.jpg', eula: 'https://i.pinimg.com/736x/96/fd/cf/96fdcfa951820208b5de030d76e9a707.jpg', noelle: 'https://i.pinimg.com/1200x/14/9d/9a/149d9a899c88bcce707132b4ebc6a546.jpg', durin: 'https://ar-cs.aza.gg/g/genshin_impact/assets/ui/UI_Gcg_CardFace_Char_Avatar_Durin.webp', jean: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9d0TMc0NCjsO8C2hF65WFDc_ND3fG6CXgq2B2v3Ojw&s=10', yelan: 'https://i.pinimg.com/736x/56/11/70/561170a179f2647d7e977484d90cd3e2.jpg', zibai: 'https://i.pinimg.com/736x/8a/e6/2c/8ae62c9c9ec7950049d24251965d0b3f.jpg', hutao: 'https://i.pinimg.com/736x/d1/07/85/d107857355116378de6a1dbb310383b6.jpg', beidou: 'https://i.pinimg.com/736x/e4/6d/60/e46d609fd6e942386bc12271edd84dd2.jpg', raiden: 'https://i.pinimg.com/1200x/5c/10/15/5c10159740019d0558cae2ef49b87e0f.jpg', kokomi: 'https://i.pinimg.com/736x/ca/a6/37/caa63780d7d86e15e1717bc004e49a8c.jpg', itto: 'https://i.pinimg.com/736x/f7/78/11/f778115c0c2bed8fc0e65b2401f73bcb.jpg', kuki: 'https://i.pinimg.com/736x/0c/ec/f8/0cecf8ee6dc4da2d11a3e352cc96df49.jpg', cyno: 'https://i.pinimg.com/1200x/76/54/7c/76547cf42d86c960b5538fae28640468.jpg', nilou: 'https://i.pinimg.com/736x/de/19/0c/de190c64672ed43707e027df37e3aa39.jpg', dori: 'https://i.pinimg.com/736x/d9/fd/8c/d9fd8c1cd25b219a8ff3ef3324b2a086.jpg', dehya: 'https://i.pinimg.com/736x/80/a3/5c/80a35c97bdf6fc646ddaf59a0476c1f2.jpg', furina: 'https://i.pinimg.com/736x/17/21/21/172121e32f372649e8ac6ff450a726d7.jpg', navia: 'https://i.pinimg.com/736x/65/7f/f1/657ff1450f4c9b0c60e6166d49243efa.jpg', wriothesley: 'https://i.pinimg.com/736x/e0/af/1c/e0af1ca21293402585ab2ac4ec6b697a.jpg', arlecchino: 'https://i.pinimg.com/736x/53/39/dd/5339ddba5764b61d89ef33056df1b533.jpg', skirk: 'https://i.pinimg.com/736x/ca/a0/f1/caa0f12cbe69d1e367582950ffd12877.jpg', mavuika: 'https://i.pinimg.com/736x/f1/96/3e/f1963e0faa5cedf0382a26b17ad40caa.jpg', chasca: 'https://i.pinimg.com/736x/bc/69/86/bc6986d7a916ac0d11d759c7db1b5315.jpg', xilonen: 'https://i.pinimg.com/736x/41/19/49/411949991db0234182c52989d4c2eb17.jpg', kinich: 'https://i.pinimg.com/736x/16/12/98/1612980c0d28034815f48d6a9f51d199.jpg', lauma: 'https://i.pinimg.com/736x/e3/45/fc/e345fc130e02feb11d64fc15f6b0f240.jpg', columbina: 'https://i.pinimg.com/736x/5e/85/1a/5e851abeb23c7552f850be6cc3e09338.jpg', flins: 'https://i.pinimg.com/736x/09/5b/da/095bdaa24f0d7c9af6b69002cb6bbbf9.jpg', nefer: 'https://i.pinimg.com/736x/96/b3/54/96b3544f1e5cb5ec6cecd9621d301d91.jpg', olho: 'https://static.wikia.nocookie.net/gensin-impact/images/c/c5/Eye_of_Stormy_Judgment_Summon.png/revision/latest?cb=20230525000538', ushi: 'https://static.wikia.nocookie.net/gensin-impact/images/8/86/Ushi_Summon.png/revision/latest?cb=20230414203854', lampada: 'https://wikistatic.bittopup.com/assets/UI/gcg/UI_Gcg_CardFace_Modify_Constellation_Dori.png', reflexo: 'https://static.wikia.nocookie.net/gensin-impact/images/1/18/Prophecy_of_Submersion_Equipment_Card.png/revision/latest?cb=20240105094139', gouba: 'https://wikistatic.bittopup.com/assets/UI/gcg/UI_Gcg_CardFace_Modify_Talent_Xiangling.png', melodia: 'https://static.wikia.nocookie.net/gensin-impact/images/2/2e/Glorious_Season_Equipment_Card.png/revision/latest?cb=20221205102338', ventos: 'https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Embrace_of_Winds_Equipment_Card.png/revision/latest?cb=20230519022031', flor: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeW0CmjzIGEyGbrsOBA1BNWYocP5ZP0UoyIiFLJeLZxg&s=10', escudo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYR4VtFPTl1bAaBcg21gzTTQCD7hQ7yhM7wqPHuUoeX1hvOzPzl0zkcFk&s=10', bakakura: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPXAbUNl9S_St0XjUJ9TUWi60u7ByrbKebgRmQEMtjg&s=10', oz: 'https://static.wikia.nocookie.net/gensin-impact/images/1/13/Oz_Summon.png/revision/latest?cb=20221209140755', ventos: 'https://static.wikia.nocookie.net/gensin-impact/images/6/6f/Embrace_of_Winds_Equipment_Card.png/revision/latest?cb=20230519022031', salon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2MFRU-Nzj5yM237H-O35oR3vNSFyTfuX51lgUkMr-1Q&s=10', lamina: 'https://wikistatic.bittopup.com/assets/UI/gcg/UI_Gcg_CardFace_Modify_Talent_Eula.png', anel: 'https://wikistatic.bittopup.com/assets/UI/gcg/UI_Gcg_CardFace_Modify_Talent_Shinobu.png', zhongli: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnPyeFyA8wGNd5qWzvAQChPH4fzYieBmyH9eR_qiCrUw&s=10', ayaka: 'https://i.pinimg.com/1200x/00/59/9b/00599bd94deca124137f3f44e45b0b6e.jpg', lanyan: 'https://i.pinimg.com/736x/0b/eb/38/0beb38738374fa3b4cf6f9a33404ca88.jpg', varesa: 'https://i.pinimg.com/736x/71/05/1f/71051f068efd0d80dca8ae2a0cc3ede9.jpg', diona: 'https://i.pinimg.com/736x/cf/61/20/cf612016aa3e672707e659bff57a5e7b.jpg' };
let UP = {}; try { UP = JSON.parse(localStorage.getItem('gi_up') || '{}') } catch (e) { };
const photo = k => UP[k] || IMG[k] || '';
const saveUp = () => { try { localStorage.setItem('gi_up', JSON.stringify(UP)) } catch (e) { } };
function pick(k) { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.onchange = () => { const f = i.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = 320; c.height = 500; const x = c.getContext('2d'), s = Math.max(320 / im.width, 500 / im.height), w = im.width * s, h = im.height * s; x.drawImage(im, (320 - w) / 2, (500 - h) / 2, w, h); UP[k] = c.toDataURL('image/jpeg', .85); saveUp(); refresh() }; im.src = r.result }; r.readAsDataURL(f) }; i.click() }
const sl = ms => new Promise(r => setTimeout(r, ms));
const st = document.getElementById('st');
let G;
function init() {
    musica('batalha', true);
    const ids = Object.keys(T).sort(() => Math.random() - .5);
    SCR = 'game';
    G = {
        tg: null, r: 1, p: mk(SV.team), o: mk(ids.slice(0, 3)),
        turn: 'p', busy: 0, over: null, pops: [],
        opp: escolheOp(),
        log: 'Sua vez! Gaste energia em ações.'
    };
    render();
}

const say = t => G.log = t;
const tgi = () => G.tg != null && G.o.ch[G.tg] && G.o.ch[G.tg].hp > 0 ? G.tg : G.o.a;

const IA = { prep: 1500, pos: 1200 };

const IAW = {
    carga: 3,      // valor de uma explosão totalmente carregada
    matar: 6,      // bônus por derrubar um personagem (e prejuízo por perder um)
    aura: .7,      // vantagem de deixar o alvo com um elemento (prepara reação)
    ameaca: 1.15,  // quanto a IA valoriza tirar vida do seu time em relação a proteger a própria
    sobra: .7,     // só para ordenar ações incompletas (energia que ainda dá para gastar)
    largura: 8     // quantas sequências ela compara por etapa (maior = mais esperta e mais lenta)
};

function aiActs(o, p) {
    const L = [], vp = p.ch.map((_, i) => i).filter(i => p.ch[i].hp > 0);
    if (!vp.length) return L;
    const fraco = o.ch.map((_, i) => i).filter(i => o.ch[i].hp > 0).sort((a, b) => (o.ch[a].hp + (o.ch[a].sh || 0) * 2) - (o.ch[b].hp + (o.ch[b].sh || 0) * 2))[0];
    o.ch.forEach((c, ci) => {
        if (c.hp <= 0) return;
        const t = T[c.k], sw = ci == o.a ? 0 : 1;
        t.m.forEach((m, mi) => {
            if (o.pool - sw < m.c || (m.b && c.cg < t.mx)) return;
            (m.d > 0 ? vp : [p.a]).forEach(ti => L.push({ ci, mi, ti, al: fraco }));
        });
    });
    return L;
}

function simAct(o, p, a) {
    const sG = G, so = structuredClone(o), sp = structuredClone(p);
    G = { p: sp, o: so, pops: [], log: '', tg: null, over: null, pend: null };
    try { if (a.ci != so.a) { so.pool--; so.a = a.ci } use(so, sp, a.mi, a.ti, a.al) }
    finally { G = sG }
    return { o: so, p: sp };
}

function ev(o, p) {                       // placar do ponto de vista do oponente (IA)
    let s = 0;
    for (const c of o.ch) {
        const t = T[c.k]; if (c.hp <= 0) { s -= IAW.matar; continue }
        s += c.hp + (c.sh || 0) * .9 + c.cg / t.mx * IAW.carga - (c.au ? .5 : 0);
        if (c.im && o.pool >= 2) s += c.im.d * .8 + .5;
    }
    for (const c of p.ch) {
        const t = T[c.k]; if (c.hp <= 0) { s += IAW.matar; continue }
        s -= c.hp * IAW.ameaca + (c.sh || 0) * .9 + c.cg / t.mx * IAW.carga; if (c.au) s += IAW.aura;
    }
    for (const x of o.sm) s += x.u * (x.d * 1.1 + (x.cura || 0) * .9);
    for (const x of p.sm) s -= x.u * (x.d * 1.1 + (x.cura || 0) * .9);
    if (o.pool >= 2) s += (o.bf || 0) * .8;                 // buff só vale se ainda der para atacar
    if (!alive(p)) s += 1000;
    return s;
}

function est(f, ti, el) {                      // dano EXTRA de reação
    const t = f.ch[ti];
    if (el == 'phys' || !t.au || t.au == el) return 0;
    if (el == 'anemo') return 1;
    const R = RX[[t.au, el].sort().join()]; return R ? R[1] : 0;
}

function aiPlan(o, p) {
    let frontier = [{ o, p, first: null }], best = null;
    for (let depth = 0; depth < 7 && frontier.length; depth++) {
        const next = [];
        for (const n of frontier) {
            const acts = aiActs(n.o, n.p);
            if (!acts.length) {                              // fim do turno: não dá mais para agir
                if (n.first) { const v = ev(n.o, n.p); if (!best || v > best.v) best = { v, first: n.first } }
                continue;
            }
            for (const a of acts) {
                const r = simAct(n.o, n.p, a);
                next.push({ o: r.o, p: r.p, first: n.first || a, v: ev(r.o, r.p) + r.o.pool * IAW.sobra + Math.random() * .2 });
            }
        }
        next.sort((x, y) => y.v - x.v); frontier = next.slice(0, IAW.largura);
    }
    for (const n of frontier) { const v = ev(n.o, n.p); if (!best || v > best.v) best = { v, first: n.first } }
    return best && best.first;                               // { ci, mi, ti, al } — o endRound já usa esse formato
}


function alive(s) { return s.ch.some(c => c.hp > 0) }
function nextAlive(s) { for (let k = 1; k < 3; k++) { const j = (s.a + k) % 3; if (s.ch[j].hp > 0) return j } return s.a }
function autoSw(s) { if (s.ch[s.a].hp <= 0) { const n = s.ch.findIndex(c => c.hp > 0); if (n >= 0) s.a = n } }
function hit(f, el, d, ti) {
    let i = ti ?? f.a; if (!f.ch[i] || f.ch[i].hp <= 0) i = f.a;
    const t = f.ch[i]; let b = 0, r = '', spread = null;
    if (el != 'phys') {
        if (t.au && t.au != el) {
            if (el == 'anemo') {
                if (SWIRL.elementos.includes(t.au)) { b = SWIRL.direto; r = 'Redemoinho'; spread = t.au; t.au = null }
                // com Geo/Dendro no alvo: nada acontece (o elemento continua lá)
            } else {
                const R = RX[[t.au, el].sort().join()];
                if (R) { b = R[1]; r = R[0]; t.au = null; if (R[2] && i == f.a) f.fs = 1 }
            }
        } else if (!t.au && el != 'anemo') t.au = el;
    }
    let base = d;
    if (t.sh > 0 && base > 0) { const a = Math.min(t.sh, base); t.sh -= a; base -= a; if (!r) r = 'Escudo' }
    const tot = base + b;
    t.hp = Math.max(0, t.hp - tot);
    G.pops.push({ s: f === G.p ? 'p' : 'o', i, t: tot, r });
    if (t.hp <= 0) { t.au = null; t.sh = 0; f.sm = f.sm.filter(x => x.own !== i); if (i == f.a) autoSw(f) }
    else if (f.fs && i == f.a) { f.a = nextAlive(f) }
    f.fs = 0;
    if (spread) [i - 1, i + 1].forEach(j => { if (f.ch[j] && f.ch[j].hp > 0) hit(f, spread, SWIRL.indireto, j) });
}
function can(s, mi) { const c = s.ch[s.a], t = T[c.k], m = t.m[mi]; return c.hp > 0 && s.pool >= m.c && (!m.b || c.cg >= t.mx) }
function use(s, f, mi, ti, al) {
    const c = s.ch[s.a], t = T[c.k], m = t.m[mi]; s.pool -= m.c;
    if (m.b) c.cg = 0; else c.cg = Math.min(t.mx, c.cg + 1);
    const el = m.el == 'phys' && c.im ? c.im.el : m.el;                        // ataque físico imbuído vira elemental
    const d = m.d > 0 ? m.d + (c.im ? c.im.d : 0) + (s.bf || 0) : 0;          // bônus do imbuir + buff pendente
    say(`${t.n} usou ${m.n}${m.d > 0 ? ' em ' + T[f.ch[ti ?? f.a].k].n : ''}!`);
    if (m.cura) heal(s, m.cura, m.curaAlvo || 'self');
    if (m.esc) { const a = s.ch[al ?? s.a]; a.sh = (a.sh || 0) + m.esc; say(`${t.n} usou ${m.n}: escudo em ${T[a.k].n}!`) }
    if (m.sm) { const S = SM[m.sm], x = s.sm.find(y => y.n == S.n); x ? (x.u = S.u, x.own = s.a) : s.sm.push({ ...S, id: m.sm, own: s.a }) }
    if (m.sw) f.fs = 1;
    if (d > 0) { const ai = (ti != null && f.ch[ti] && f.ch[ti].hp > 0) ? ti : f.a; hit(f, el, d, ti); s.bf = 0; if (m.pierce) perf(f, m.pierce, ai) }
    if (m.buff) { s.bf = (s.bf || 0) + m.buff; say(`${t.n}: o próximo ataque causa +${m.buff} de dano!`) }
    if (m.imb) { c.im = { el: m.imb.el, d: m.imb.d, dur: m.imb.dur || 1 }; say(`${t.n} imbuiu os ataques com ${NM[m.imb.el]}!`) }
}
function chk() {
    if (!alive(G.o)) { G.over = 'Vitória!' } else if (!alive(G.p)) { G.over = 'Derrota...' }
    if (G.over) { if (!G.prize) { const w = G.over[0] == 'V', n = G.p.ch.filter(c => c.hp > 0).length, b = w ? MOEDAS.vitoria : MOEDAS.derrota; G.prize = { b, n, tot: b + n * MOEDAS.porVivo }; SV.coins += G.prize.tot; save() } render(); return true } return false
}
async function pact(mi, al) {
    if (G.turn != 'p' || G.busy || G.over || !can(G.p, mi)) return;
    const m = T[G.p.ch[G.p.a].k].m[mi];
    if (m.esc && al == null) {                       // 1º clique: escolher o aliado; clicar de novo na habilidade cancela
        if (G.pend == mi) { G.pend = null; say('Cancelado.') } else { G.pend = mi; say('Escolha o aliado que receberá o escudo (clique na carta dele).') }
        render(); return;
    }
    G.pend = null;
    use(G.p, G.o, mi, tgi(), al); render(); if (chk()) return;
    if (G.p.pool <= 0) { G.busy = 1; await sl(700); endRound() }
}
async function endRound() {
    if (G.over || G.dead || SCR != 'game' || G.turn == 'o') return;
    const g0 = G, off = () => G !== g0 || G.dead || SCR != 'game';
    G.pend = null; G.busy = 1; G.turn = 'o'; say('Turno do oponente...'); render();
    await sl(IA.prep); if (off()) return;
    const o = G.o;
    while (true) {
        const pl = aiPlan(o, G.p); if (!pl) break;
        if (pl.ci != o.a) {                                  // troca de personagem (custa 1 de energia)
            o.pool--; o.a = pl.ci; say(`Oponente trocou para ${T[o.ch[pl.ci].k].n}!`); render();
            await sl(IA.pos); if (off()) return;
        }
        const m = T[o.ch[o.a].k].m[pl.mi];
        say(`Oponente vai usar ${m.n}${m.d > 0 ? ' em ' + T[G.p.ch[pl.ti].k].n : ''}...`); render();
        await sl(IA.prep); if (off()) return;
        use(o, G.p, pl.mi, pl.ti, pl.al); render(); if (chk()) return;
        await sl(IA.pos); if (off()) return;
    }
    say('Fase final: invocações atacam!'); render(); await sl(IA.prep); if (off()) return;
    for (const [s, f] of [[G.p, G.o], [G.o, G.p]]) {
        for (const m of [...s.sm]) {
            if (!s.sm.includes(m)) continue;
            say(`${m.n} ataca!`); if (m.d) hit(f, m.el, m.d, s === G.p ? tgi() : undefined);
            if (m.cura) heal(s, m.cura, m.curaAlvo || 'fraco');
            m.u--; render(); if (chk()) return;
            await sl(IA.pos); if (off()) return;
        }
        s.sm = s.sm.filter(m => m.u > 0);
    }
    [G.p, G.o].forEach(s => { s.bf = 0; s.ch.forEach(c => { if (c.im && --c.im.dur <= 0) c.im = null }) });   // buffs e imbuir expiram
    G.r++; G.p.pool = G.o.pool = ENERGIA; G.turn = 'p'; G.busy = 0; say(`Rodada ${G.r} — sua vez!`); render();
}

function card(s, side, i) {
    const c = s.ch[i], t = T[c.k], E = EL[t.el], ph = photo(c.k), al = side == 'o' && i == tgi();
    let en = ''; for (let j = 0; j < t.mx; j++)en += `<i class="${j < c.cg ? 'on' : ''}"></i>`;
    return `<div class="cc ${i == s.a ? 'act' : ''} ${c.hp ? '' : 'dead'} ${ph ? 'hasph' : ''} ${al ? 'tgt' : ''} ${side == 'p' && G.pend != null && c.hp > 0 ? 'pick' : ''}" id="c${side}${i}" ${side == 'p' ? `data-sw="${i}"` : ''} ${side == 'o' ? `data-tg="${i}"` : ''} style="--c:${E[1]}">
 ${c.au ? `<div class="au" style="background:${EL[c.au][1]}">${EL[c.au][0]}</div>` : ''}
 ${c.sh > 0 ? `<div class="sh">🛡️ ${c.sh}</div>` : ''}
 ${s.bf && i == s.a ? `<div class="bf">⬆️ +${s.bf}</div>` : ''}
 ${c.im ? `<div class="im">${EL[c.im.el][0]}+${c.im.d}</div>` : ''}
 ${ph ? `<div class="ph" style="background-image:url('${ph}')"></div>` : ''}<div class="hp"><span>${c.hp}</span></div>${ph ? '' : `<div class="em">${t.e}</div>`}<div class="nm">${t.n}</div><button class="up" data-up="${c.k}" title="Enviar foto (botão direito remove)">📷</button>
 <div class="ty"><span>${EL[t.el]?.[0]}</span></div><div class="en">${en}</div></div>`
}

function sc(m, pos) { const ph = photo(m.id); return `<div class="sm ${ph ? 'hasph' : ''}" style="${pos};--c:${EL[m.el][1]}">${ph ? `<div class="ph" style="background-image:url('${ph}')"></div>` : `<div class="em">${m.e}</div>`}<b>${m.u}⏳</b><div class="n2">${m.n}</div><u>${m.d || m.esc || ''}</u><button class="up" data-up="${m.id}" title="Enviar foto (botão direito remove)">📷</button></div>` }
function summ(s, pos) { return s.sm.map((m, i) => sc(m, `${pos};margin-right:${i * 125}px`)).join('') }
function render() {
    const p = G.p, o = G.o, pc = p.ch[p.a], pt = T[pc.k], my = G.turn == 'p' && !G.busy && !G.over;
    const orbs = Array.from({ length: ENERGIA }, (_, i) => `<i class="${i < p.pool ? '' : 'off'}"></i>`).join('');
    const ic = [`<img class="ei atk-icon" src="assets/atk.png" alt="Ataque">`, EL[pt.el][0], `<img class="ei atk-icon" src="assets/ult.png" alt="Explosão">`];
    const sk = pt.m.map((m, i) => `<div class="w" data-t="${i}"><button class="sb ${m.b ? 'bu' : ''}" style="--g:conic-gradient(#ffd24a ${m.b ? pc.cg / pt.mx * 360 : 0}deg,#0000 0)" data-m="${i}" ${my && can(p, i) ? '' : 'disabled'}><span>${ic[i]}</span><div class="hex">${m.c}</div></button></div>`).join('');
    st.innerHTML = `
 <div class="bdg" id="ob"><i>${G.opp && G.opp.img ? `<img src="${G.opp.img}" alt="">` : '🧙'}</i><div>${(G.opp && G.opp.n) || 'Oponente'}<small>${G.turn == 'o' ? 'Agindo...' : 'Aguardando...'}</small></div></div>
 <div class="pile" style="top:250px"></div><div class="pile" style="bottom:250px"></div>
 <div class="row" id="orow">${o.ch.map((_, i) => card(o, 'o', i)).join('')}</div>
 ${summ(o, 'top:100px')}
 <div class="pool" id="po" title="Energia do oponente">${o.pool}</div>
 <div id="hg" title="Encerrar rodada">Rodada<b>${G.r}</b>Encerrar</div><div class="hex">${p.pool}</div>
 ${G.over ? '' : `<button class="btn" id="ab">${G.conf ? 'Confirmar abandono?' : '🏳️ Abandonar partida'}</button>`}
 <div id="lg">${G.log}</div>
 <div class="row" id="prow">${p.ch.map((_, i) => card(p, 'p', i)).join('')}</div>
 ${summ(p, 'bottom:100px')}
 <div class="bdg me" id="pb"><i><img src="assets/paimon.webp" alt="Nosso icon"></i><div>Viajante<small>${G.turn == 'p' ? 'Agindo...' : 'Aguardando...'}</small></div></div>
 <div id="orbs" title="Sua energia">${orbs}</div>
 <div id="sk">${sk}</div>
 ${G.over ? `<div id="ov"><div>${G.over}</div><div class="rp">Moedas: ${G.prize.b} 🪙 + ${G.prize.n} personagem(ns) vivo(s) = <b>${G.prize.tot} 🪙</b><br>Total: ${SV.coins} 🪙</div><div><button class="btn" id="rs">Duelar novamente</button><button class="btn" id="hm">Página inicial</button></div></div>` : ''}`;
    G.pops.forEach(q => { const e = document.getElementById('c' + q.s + q.i); if (e) { const d = document.createElement('div'); d.className = 'pop'; d.innerHTML = (q.h ? '+' : '-') + q.t + (q.r ? `<small>${q.r}</small>` : ''); e.appendChild(d) } });
    G.pops = []; showTip();
}
st.onclick = e => {
    const g = x => e.target.closest(x);
    if (g('#rs')) return init();
    const u = g('.up'); if (u) return pick(u.dataset.up);
    if (SCR == 'home') return hclick(g);
    if (g('#hm')) return home();
    if (g('#ab')) { if (G.conf) { G.dead = 1; return home() } G.conf = 1; return render() }
    if (G.conf) { G.conf = 0; render() }
    if (G.turn != 'p' || G.busy || G.over) return;
    const tg = g('[data-tg]');
    if (tg) { const i = +tg.dataset.tg; if (G.o.ch[i].hp > 0) { G.tg = i; say(`Alvo: ${T[G.o.ch[i].k].n}`); render() } return }
    if (g('#hg')) return endRound();
    const b = g('[data-m]'); if (b) return pact(+b.dataset.m);
    const c = g('[data-sw]');
    if (c && G.pend != null) { const i = +c.dataset.sw; if (G.p.ch[i].hp > 0) pact(G.pend, i); return }
    if (c) { const i = +c.dataset.sw; if (i != G.p.a && G.p.ch[i].hp > 0 && G.p.pool >= 1) { G.p.pool--; G.p.a = i; say(`Trocou para ${T[G.p.ch[i].k].n}.`); render(); if (G.p.pool <= 0) { G.busy = 1; sl(700).then(endRound) } } }
};

let hov = null;
const NM = { pyro: 'Pyro', hydro: 'Hydro', electro: 'Electro', cryo: 'Cryo', anemo: 'Anemo', dendro: 'Dendro', geo: 'Geo', phys: 'Físico' };
Object.values(SM).forEach(s => { s.d = s.d || 0 });

function showTip() {
    let t = document.getElementById('tip'); if (t) t.remove();
    if (hov == null || G.over) return;
    const c = G.p.ch[G.p.a], tt = T[c.k], m = tt.m[hov], E = EL[m.el];
    let h = `<h4>${E[0]} ${m.n}</h4><div class="t">${['Ataque Normal', 'Habilidade Elemental', 'Explosão Elemental'][hov]} · ${tt.n}</div>`;
    h += `<p>💠 Custo: <b>${m.c}</b> de energia</p>`;
    h += m.b ? `<p>✨ Requer carga completa (${c.cg}/${tt.mx}); zera a carga ao usar.</p>` : `<p>◆ Concede +1 de carga (${c.cg}/${tt.mx}).</p>`;
    h += `<p>💥 Dano: <b>${m.d}</b> ${NM[m.el]}</p>`;
    if (m.cura) h += `<p>💚 Cura ${m.cura} de vida do personagem ativo.</p>`;
    if (m.esc) h += `<p>🛡️ Dá ${m.esc} de escudo a um aliado à sua escolha. O escudo bloqueia dano, exceto o dano extra de reação.</p>`;
    if (m.buff) h += `<p>⬆️ O próximo ataque com dano do seu time (de qualquer personagem) causa +${m.buff}. Vale 1 vez e expira no fim da rodada.</p>`;
    if (m.imb) h += `<p>🌀 Imbuir: os ataques físicos deste personagem viram ${NM[m.imb.el]} e todas as habilidades dele causam +${m.imb.d} de dano por ${m.imb.dur || 1} rodada(s).</p>`;
    if (m.pierce) h += `<p>🎯 Causa ${m.pierce} de dano perfurante em todos os outros inimigos, em qualquer posição (sem elemento, sem reação).</p>`;
    if (m.sm) { const S = SM[m.sm]; h += `<p>${S.e} Invoca <b>${S.n}</b>: ${S.d} de dano ${NM[S.el]} na fase final, por ${S.u} uso(s).${S.cura ? ' Cura ' + S.cura + ' ao fim da rodada.' : ''} Usar de novo renova os usos.</p>` }
    if (m.sw) h += `<p>🔄 Força o oponente a trocar de personagem.</p>`;
    if (m.el == 'anemo') h += `<p>🌪️ Redemoinho: +1 de dano se o alvo tiver elemento; o elemento é removido e espalhado (1 de dano) nos personagens ao lado do alvo.</p>`;
    else if (m.el == 'phys') h += `<p>⚔️ Dano físico: não aplica elemento e não causa reações.</p>`;
    else { const rs = Object.entries(RX).filter(([k]) => k.split(',').includes(m.el)).map(([k, v]) => `${v[0]} (alvo ${NM[k.split(',').find(x => x != m.el)]}): +${v[1]}${v[2] ? ', força troca' : ''}`); h += `<p>⚗️ Aplica ${NM[m.el]} no alvo. Reações: ${rs.join('; ')}.</p>` }
    if (G.p.pool < m.c) h += `<p class="w">⚠ Energia insuficiente</p>`; else if (m.b && c.cg < tt.mx) h += `<p class="w">⚠ Carga insuficiente</p>`;
    t = document.createElement('div'); t.id = 'tip'; t.innerHTML = h; st.appendChild(t);
}

st.addEventListener('mouseover', e => { const w = e.target.closest('[data-t]'), n = w ? +w.dataset.t : null; if (n !== hov) { hov = n; showTip() } });
st.addEventListener('mouseleave', () => { hov = null; showTip() });
st.addEventListener('contextmenu', e => { const u = e.target.closest('.up'); if (u) { e.preventDefault(); delete UP[u.dataset.up]; saveUp(); refresh() } });

function mline(t, m, i) { const S = m.sm && SM[m.sm]; return `<div class="mv"><b>${EL[m.el][0]} ${m.n}</b> <i>(${['Ataque Normal', 'Habilidade Elemental', 'Explosão Elemental'][i]})</i><br>💠 Custo ${m.c}${m.b ? ` · ✨ precisa de carga ${t.mx}/${t.mx}` : ' · ◆ +1 de carga'} · 💥 Dano ${m.d} ${NM[m.el]}${m.cura ? ` · 💚 Cura ${m.cura}` : ''} ${m.esc ? ` · 🛡️ Escudo ${m.esc} em um aliado (bloqueia dano, não bloqueia dano de reação)` : ''} ${m.buff ? ` · ⬆️ Próximo ataque do time +${m.buff} de dano (1 uso, expira no fim da rodada)` : ''}${m.imb ? ` · 🌀 Ataques físicos viram ${NM[m.imb.el]} e +${m.imb.d} de dano (${m.imb.dur || 1} rodada)` : ''} ${m.pierce ? ` · 🎯 ${m.pierce} de dano perfurante em todos os outros inimigos` : ''} ${m.sw ? ' · 🔄 Força troca do oponente' : ''}${S ? `<br>${S.e} Invoca ${S.n}: ${S.d} de dano ${NM[S.el]} por rodada, ${S.u} uso(s)${S.cura ? `, cura ${S.cura}` : ''}` : ''}</div>` }

function applyBg() {
    st.style.backgroundImage = SV.bg ? `linear-gradient(#0003,#0003),url(${bgUrl(SV.bg)})` : '';
    st.style.backgroundSize = 'cover'; st.style.backgroundPosition = 'center';
}

const hdr = () => `<div id="hh"><span><img src="./assets/logo.png" class="logo-jogo" alt="Logo">Genius Invokation <small>Modo Energia</small></span><span class="moedas"><img src="assets/moeda.png" class="icone-moeda" alt="Moedas"> ${SV.coins}</span><span style="flex:1"></span><span style="font-size:20px">Time (${SV.team.length}/3): ${SV.team.map(i => T[i].n).join(' · ')}</span><button class="btn" id="go" ${SV.team.length == 3 ? '' : 'disabled'} title="Escolha 3 personagens">Começar uma partida</button></div>`;

const tabs = () => `<div id="tabs"><button class="tab ${TAB == 'chars' ? 'on' : ''}" data-tab="chars">🃏 Personagens</button><button class="tab ${TAB == 'bg' ? 'on' : ''}" data-tab="bg">🖼️ Planos de fundo</button></div>`;

const MUSICA = {
    menu: ['assets/musica/home/Blue Dream - Yu-Peng Chen.mp3', 'assets/musica/home/Forgotten Epic - Yu-Peng Chen.mp3', 'assets/musica/home/Ethereal Mildness - HOYO-MiX.mp3', 'assets/musica/home/Those Lucid Dreams - HOYO-MiX.mp3', 'assets/musica/home/Feelings Nested in a Seashell - HOYO-MiX.mp3', 'assets/musica/home/Inheritance of an Ancient Name - HOYO-MiX.mp3', 'assets/musica/home/Raven Gloss of Darkness - HOYO-MiX.mp3', 'assets/musica/home/Symposion of Spectacle - HOYO-MiX.mp3', 'assets/musica/home/The Realm Within - Yu-Peng Chen.mp3', ''],                                        // toca em sequência, em loop
    batalha: ['assets/musica/battle/Undersea Encounters - HOYO-MiX.mp3', 'assets/musica/battle/Lamentation et Triomphe - HOYO-MiX.mp3', 'assets/musica/battle/Overlord of the Thunderstorm - Yu-Peng Chen.mp3', 'assets/musica/battle/Photon of Fluctuation - Yu-Peng Chen.mp3', 'assets/musica/battle/Rapid as Wildfires - Yu-Peng Chen.mp3', 'assets/musica/battle/Rondeau des fleurs et des rapieres - HOYO-MiX.mp3', 'assets/musica/battle/Seething Animosity - HOYO-MiX.mp3', 'assets/musica/battle/Swirls of the Stream - HOYO-MiX.mp3', 'assets/musica/battle/To Light the Aeon Dark - HOYO-MiX.mp3', 'assets/musica/battle/Undersea Encounters - HOYO-MiX.mp3']  // sorteia uma; ao acabar, sorteia outra
};

const VOL_BASE = 0.3;      // volume máximo da música (0 a 1). O controle da tela abaixa a partir daqui até zero.
const MUS = {
    vol: 1, mudo: false, modo: null, on: false,
    s: { menu: { a: null, i: -1, fila: [] }, batalha: { a: null, i: -1, fila: [] } }   // cada lista guarda a sua música atual
};
try { Object.assign(MUS, JSON.parse(localStorage.getItem('gi_mus') || '{}')) } catch (e) { }
const volFinal = () => MUS.mudo ? 0 : VOL_BASE * MUS.vol;
const salvaMus = () => { try { localStorage.setItem('gi_mus', JSON.stringify({ vol: MUS.vol, mudo: MUS.mudo })) } catch (e) { } };

function proxIdx(S, n) {
    if (!S.fila.length) {
        const f = [...Array(n).keys()];
        for (let k = n - 1; k > 0; k--) { const j = Math.random() * (k + 1) | 0;[f[k], f[j]] = [f[j], f[k]] }
        if (n > 1 && f[0] == S.i) f.push(f.shift());
        S.fila = f;
    }
    return S.fila.shift();
}
function tocarProx(modo) {
    const S = MUS.s[modo], L = MUSICA[modo]; if (!L || !L.length) return;
    if (S.a) { S.a.onended = null; S.a.pause() }
    S.i = proxIdx(S, L.length);
    const a = new Audio(L[S.i]); a.volume = volFinal(); a.onended = () => { if (MUS.modo == modo) tocarProx(modo) }; S.a = a;
    a.play().catch(() => { });
}
// 'menu' ou 'batalha'. Trocar de modo PAUSA a música atual sem perder o ponto; voltar para o menu continua de onde parou.
// forcar = true começa uma música nova da lista (usado ao iniciar cada partida).
function musica(modo, forcar) {
    if (MUS.modo == modo && !forcar) return;
    const ant = MUS.s[MUS.modo]; if (ant && ant.a) ant.a.pause();
    MUS.modo = modo;
    if (!MUS.on) return;
    const S = MUS.s[modo];
    if (forcar || !S.a || S.a.ended) tocarProx(modo); else S.a.play().catch(() => { });
}

addEventListener('pointerdown', () => { if (!MUS.on) { MUS.on = true; if (MUS.modo && !MUS.s[MUS.modo].a) tocarProx(MUS.modo) } });
(function () {                                  // botãozinho de mutar + controle de volume (canto superior direito)
    const d = document.createElement('div'); d.id = 'mus';
    d.innerHTML = '<button id="mt" title="Mutar / ativar música">🔊</button><input id="mv" type="range" min="0" max="100" value="100" title="Volume da música">';
    document.body.appendChild(d);
    const mt = d.querySelector('#mt'), mv = d.querySelector('#mv');
    const ui = () => { mv.value = MUS.mudo ? 0 : Math.round(MUS.vol * 100); mt.textContent = MUS.mudo || MUS.vol == 0 ? '🔇' : MUS.vol < .5 ? '🔉' : '🔊' };
    const ap = () => { Object.values(MUS.s).forEach(S => { if (S.a) S.a.volume = volFinal() }); ui(); salvaMus() };
    mt.onclick = () => { MUS.mudo = !MUS.mudo; if (!MUS.mudo && MUS.vol == 0) MUS.vol = .5; ap() };
    mv.oninput = () => { MUS.vol = mv.value / 100; MUS.mudo = false; ap() };
    ui();
})();

function homeBg() {
    SELBG = SELBG || SV.bg || Object.keys(BGS)[0];
    const moeda = `<img src="assets/moeda.png" class="icone-moeda" alt="Moedas">`;
    const lst = Object.keys(BGS).map(id => {
        const o = SV.bgs.includes(id);
        return `<div class="bgc ${SELBG == id ? 'sel' : ''} ${SV.bg == id ? 'use' : ''}" data-bg="${id}"><img src="${bgUrl(id)}" alt="">${SV.bg == id ? '<div class="tg">EM USO</div>' : o ? '' : `<div class="pr">${moeda} ${PRECO_BG}</div>`}<div>${BGS[id]}</div></div>`;
    }).join('');
    const o = SV.bgs.includes(SELBG), sem = SV.coins < PRECO_BG;
    const btn = SV.bg == SELBG ? `<button class="btn" id="bgoff">Remover plano de fundo</button>`
        : o ? `<button class="btn" id="bgap">Aplicar</button>`
            : `<button class="btn" id="bgby" ${sem ? 'disabled' : ''}>Comprar por ${PRECO_BG} ${moeda}</button>${sem ? ' <small>Moedas insuficientes.</small>' : ''}`;
    st.innerHTML = `${hdr()}${tabs()}<div id="lst">${lst}</div><div id="dt"><h2>${BGS[SELBG]}</h2><img src="${bgUrl(SELBG)}" style="width:100%;border-radius:10px;border:3px solid #e9ddc3" alt=""><p>${o ? 'Você já tem este plano de fundo.' : 'Disponível para compra.'}</p><p>${btn}</p></div>`;
}

function home() {
    musica('menu');
    applyBg(); if (TAB == 'bg') { SCR = 'home'; return homeBg() }
    const y = (document.getElementById('lst') || {}).scrollTop || 0;
    SCR = 'home'; if (!SEL || !T[SEL]) SEL = SV.team[0] || 'diluc';
    const ids = Object.keys(T), own = ids.filter(i => SV.owned.includes(i)), shop = ids.filter(i => !SV.owned.includes(i));
    const co = id => { const o = SV.owned.includes(id), it = SV.team.includes(id); return `<div class="hc ${it ? 'in' : ''} ${SEL == id ? 'sel' : ''} ${o ? '' : 'lock'}" data-c="${id}">${card({ ch: [{ k: id, hp: T[id].hp || 10, cg: 0 }], a: -1 }, 'h', 0)}${o ? '' : `<div class="pr"><img src="assets/moeda.png" class="din" alt="Moedas"> <span>${preco(id)}</span></div>`}${it ? '<div class="tg">NO TIME</div>' : ''}</div>` };
    const t = T[SEL], o = SV.owned.includes(SEL), it = SV.team.includes(SEL), sid = [...new Set(t.m.filter(m => m.sm).map(m => m.sm))];
    const btn = o ? `<button class="btn" id="tg" ${!it && SV.team.length >= 3 ? 'disabled' : ''}>${it ? 'Remover do time' : 'Adicionar ao time'}</button>${!it && SV.team.length >= 3 ? ' <small>Time cheio: remova alguém antes.</small>' : ''}` : `<button class="btn" id="by" ${SV.coins < preco(SEL) ? 'disabled' : ''}>Comprar por ${preco(SEL)} <img src="assets/moeda.png" class="icone-moeda" alt="Moedas"></button>${SV.coins < preco(SEL) ? ' <small>Moedas insuficientes.</small>' : ''}`;
    st.innerHTML = `${hdr()}${tabs()}
 <div id="lst"><h3>Minhas cartas</h3>${own.map(co).join('')}<h3>Loja</h3>${shop.length ? shop.map(co).join('') : '<p style="margin:12px">Você já tem todas as cartas!</p>'}</div>
 <div id="dt"><h2>${EL[t.el]?.[0]} ${t.n}</h2><p>❤️ Vida: <b>${t.hp || 10}</b> · ✨ Carga da explosão: <b>${t.mx}</b> · Elemento: <b>${NM[t.el]}</b></p>${t.m.map((m, i) => mline(t, m, i)).join('')}${sid.length ? `<h3>Cartas de invocação</h3>${sid.map(id => sc({ ...SM[id], id }, 'position:relative;right:auto;display:inline-block;margin:8px 14px 14px 0')).join('')}` : ''}<p>${btn}</p></div>`;
    document.getElementById('lst').scrollTop = y;
}

function hclick(g) {
    const tb = g('[data-tab]'); if (tb) { TAB = tb.dataset.tab; return home() }
    const bc = g('[data-bg]'); if (bc) { SELBG = bc.dataset.bg; return home() }
    if (g('#bgby')) { if (SV.coins >= PRECO_BG && !SV.bgs.includes(SELBG)) { SV.coins -= PRECO_BG; SV.bgs.push(SELBG); save() } return home() }
    if (g('#bgap')) { SV.bg = SELBG; save(); return home() }
    if (g('#bgoff')) { SV.bg = null; save(); return home() }
    const c = g('[data-c]'); if (c) { SEL = c.dataset.c; return home() }
    if (g('#go')) { if (SV.team.length == 3) init(); return }
    if (g('#tg')) { const i = SV.team.indexOf(SEL); if (i >= 0) SV.team.splice(i, 1); else if (SV.team.length < 3) SV.team.push(SEL); save(); return home() }
    if (g('#by')) { const p = preco(SEL); if (SV.coins >= p) { SV.coins -= p; SV.owned.push(SEL); save() } return home() }
}
function fit() { document.getElementById('st').style.transform = `scale(${Math.min(innerWidth / 1600, innerHeight / 900)})` }
addEventListener('resize', fit); fit(); home();