class Painel {
	
	//Reinicia o painel ao iniciar o jogo//
	reset() {
		this.grid = this.getPainelVazio();
	}
	
	//retorna a matriz preenchida com zeros
	getPainelVazio(){
		return Array.from(
		    {length: LINHA}, () => Array(COLUNA).fill(0)
		);
	}
	validar(p){
	return p.shape.every((row, dy) => {
		return row.every((value, dx) => {
			let x = p.x + dx;
			let y = p.y + dy;
			return (
				//retorna se a posição não está ocupada(está vazia)
				this.grid[y] && this.grid[y][x] === 0 ||
				//ou se está nos limites do painel e está acima do chão
				(x >= 0 && x < COLUNA &&
				 y <= LINHA)
		    );
}
