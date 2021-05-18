class Painel {
	ctx;
	ctxNext;
	grid;
	peca;
	next;
	idRequisicao;
	tempo;
  
	//definir o construtor
  
	constructor(ctx, ctxNext) {
		this.ctx = ctx;
		this.ctxNext = ctxNext;
		this.init();
	}
  
	//definir método de inicialização
	init() {
		// calcula o tamanho do canvas.
		this.ctx.canvas.width = COLUNA * TAM_BLOCO;
		this.ctx.canvas.height = LINHA * TAM_BLOCO;

		// escala para não precisar recalcular
		this.ctx.scale(TAM_BLOCO, TAM_BLOCO);
	}
  
	//define o método reset
	reset() {
		this.grid = this.getPainelVazio();
		this.peca = new Peca(this.ctx);
		this.peca.setPosicaoInicial();
		this.getNovaPeca();
	}
 
	getNovaPeca() {
		this.next = new Peca(this.ctxNext);
		this.ctxNext.clearRect(
			0,
			0, 
			this.ctxNext.canvas.width, 
			this.ctxNext.canvas.height
		);
		this.next.desenho();
	}
  
  
	desenho() {
		this.peca.desenho();
		this.desenhoPainel();
	}
  
	desenhoPainel() {
		this.grid.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value > 0) {
					this.ctx.fillStyle = CORES[value];
					this.ctx.fillRect(x, y, 1, 1);
				}
			});
		});
	}
  
	derruba() {
		let p = movimento[KEY.DOWN](this.peca);
		if (this.valida(p)) {
			this.peca.mover(p);
		} else {
			this.freeze();
			this.limparLinhas();
			if (this.peca.y === 0) {
				// fim de jogo
				return false;
			}
			this.peca = this.next;
			this.peca.ctx = this.ctx;
			this.peca.setPosicaoInicial();
			this.getNovaPeca();
		}
		return true;
	}

	limparLinhas() {
		let linhas = 0;

		this.grid.forEach((row, y) => {

			// se todo valor for acima de 0
			if (row.every(value => value > 0)) {
				linhas++;
	
				// Remove a linha.
				this.grid.splice(y, 1);

				// preenche a linha do topo com zeros.
				this.grid.unshift(Array(COLUNA).fill(0));
			}
		});
    
		if (linhas > 0) {
		// calcula pontuação.

			conta.pontos += this.getLinhasLimpas(linhas);
			conta.linhas += linhas;

			// se atingiu a linhas para o próximo nivel
			if (conta.linhas >= LINHAS_POR_NIVEL) {
				// Goto next level
				conta.nivel++;  
        
				// Remove lines so we start working for the next level
				conta.linhas -= LINHAS_POR_NIVEL;

				// Increase speed of game
				tempo.nivel = NIVEL[conta.nivel];
			}
		}
	}
  
	getLinhasLimpas(linhas, nivel) {
		const linhas_Limpa_Pontos =
		linhas === 1
        ? PONTOS.SIMPLES
        : linhas === 2
        ? PONTOS.DUPLO
        : linhas === 3
        ? PONTOS.TRIPLO
        : linhas === 4
        ? PONTOS.TETRIS
        : 0;

		return (conta.nivel + 1) * linhas_Limpa_Pontos;
	}
  
	freeze() {
		this.peca.forma.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value > 0) {
				this.grid[y + this.peca.y][x + this.peca.x] = value;
				}
			});
		});
	}
  
	// retorna a matriz preenchida com zeros
	getPainelVazio() {
		return Array.from(
			{length: LINHA}, () => Array(COLUNA).fill(0)
		);
	}
  
	valida(p) {
		return p.forma.every((row, dy) => {
			return row.every((value, dx) => {
				let x = p.x + dx;
				let y = p.y + dy;
				return (
					value === 0 ||
					(this.parede(x) && this.base(y) && this.naoOcupado(x, y))
				);
			});
		});
	}
  
	parede(x) {
		return x >= 0 && x < COLUNA;
	}

	base(y) {
		return y <= LINHA;
	}

	naoOcupado(x, y) {
		return this.grid[y] && this.grid[y][x] === 0;
	}

	rotate(peca) {
		console.table("ok");
		// Clone with JSON for immutability.
		let p = JSON.parse(JSON.stringify(peca));

		// Transpose matrix
		for (let y = 0; y < p.forma.length; ++y) {
			for (let x = 0; x < y; ++x) {
				[p.forma[x][y], p.forma[y][x]] = [p.forma[y][x], p.forma[x][y]];
				console.table(p.forma);
			}
		}

		// Reverse the order of the columns.
		p.forma.forEach(row => row.reverse());

		return p;
	}
  
}