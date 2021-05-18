'use strict';
const COLUNA = 10;
const LINHA = 20;
const TAM_BLOCO = 30;
//Quantidade de linhas por nivel
const LINHAS_POR_NIVEL = 10;

const KEY = {
	ESC: 27,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	p: 80
}
Object.freeze(KEY);

const CORES = [
'cyan',
'blue',
'orange',
'yellow',
'green',
'purple',
'red'
];
Object.freeze(CORES);

const FORMAS = [ 
 [],
 [ [0, 0, 0, 0],
   [1, 1, 1, 1],
   [0, 0, 0, 0],
   [0, 0, 0, 0]],
 [ [2, 0, 0],
   [2, 2, 2],
   [0, 0, 0]],
 [ [0, 0, 3],
   [3, 3, 3],
   [0, 0, 0]],
 [ [4, 4],
   [4, 4]],
 [ [0, 5, 5],
   [5, 5, 0],
   [0, 0, 0]],
 [ [0, 6, 0],
   [6, 6, 6],
   [0, 0, 0]],
 [ [7, 7, 0],
   [0, 7, 7],
   [0, 0, 0]]
 ];
 Object.freeze(FORMAS);
 
 //relação das pecas e o intervalo de cada uma
 const NIVEL = {
	 0: 800,
	 1: 720,
	 2: 630,
	 3: 550,
	 4: 470,
	 5: 380,
	 6: 300,
	 7: 220,
	 8: 130,
	 9: 100,
	 10: 80,
	 11: 80,
	 12: 80,
	 13: 70,
	 14: 70,
	 15: 70,
	 16: 50,
	 17: 50,
	 18: 50,
	 19: 30,
	 20: 30,
	 //29+ será 20 ms
 }
 Object.freeze(NIVEL);
 
 //Pontuação
 const PONTOS = {
	 SIMPLES: 100,
	 DUPLO: 300,
	 TRIPLO: 500,
	 TETRIS: 800,
	 SOFT: 1,
	 DESPENCA: 2,
 }
 Object.freeze(PONTOS);