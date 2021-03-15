class Peca {
	constructor(ctx) {
		this.ctx = ctx;
		this.color = 'blue';
		this.shape = [
		    [2, 0, 0],
			[2, 2, 2],
			[0, 0, 0]
		];
		
		//Posição inicial no painel.
		this.x = 3;
		this.y = 0;
	}
	desenho() {
	  //define a cor de preenchimento
this.ctx.fillStyle = this.color;
this.shape.forEach((row, y) => {
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
mover(p) {
	this.x = p.x;
	this.y = p.y;
}
}

