

export class Personagem {
    nome: string;
    nivel: number;
    vida: number;
    ataque: number;
    defesa: number;
    
    constructor(nome: string, nivel: number, vida: number, ataque: number, defesa: number) {
        this.nome = nome;
        this.nivel = nivel;
        this.vida = vida;
        this.ataque = ataque;
        this.defesa = defesa;
    }
}