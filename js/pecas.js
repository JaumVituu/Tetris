class Peca {
	x;
	y;
	cor;
	forma;
	ctx;
	idTipo;
	
	constructor(ctx) {
		this.ctx = ctx;
		this.spawn();
	}
	
	
	spawn () {
		this.idTipo = this.randomizePeca(CORES.length - 1);
		this.forma = FORMAS[this.idTipo];
		this.color = CORES[this.idTipo];
		this.x = 0;
		this.y = 0;
	}
	
	desenho() {
	//define a cor de preenchimento
    this.ctx.fillStyle = this.color;
    this.forma.forEach((row, y) => {
	row.forEach((value, x) => {
		     //this.x, this.y determinam a posição esquerda
		     //x, y determina a posição do bloco na forma
		     //this.x + x é a posição do bloco no painel
		     if (value > 0) {
			     //preenche a forma
			     this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
		    }
	    });
    });
}
	
	setPosicaoInicial() {
		this.x = this.typeId === 4 ? 4 : 3;
	}
	

mover(p) {
	this.x = p.x;
	this.y = p.y;
	this.forma = p.forma
}

randomizePeca(noDeTipos){
	return Math.floor(Math.random() * noDeTipos + 1);
  }
  
}