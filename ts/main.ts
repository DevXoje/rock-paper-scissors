let mainPlayer: Player;
let combate: Combate;
//Player
class Player {
	arma: Arma;
	constructor(arma = "") {
		this.arma = new Arma(arma);
	}
}
//Arma
class Arma {
	static types = ["paper", "scissors", "rock"];
	type: string;
	container: string;
	constructor(type: string) {
		this.type = type;
		this.container = `
			<figure class="arma ${this.type}" onclick="Arma.selected(event)">
                <img src="./images/icon-${this.type}.svg" alt="logo_game" height="50px" width="50px" />
            </figure>`;
	}
	static getAllTypes(): string {
		const output = document.createElement("div");
		for (let i = 0; i < this.types.length; i++) {
			const type = this.types[i];
			const arma = new Arma(type);
			output.innerHTML += arma.container;
		}
		return output.innerHTML;

	}
	static getRandomType(): string {
		const rng = Math.floor(Math.random() * Arma.types.length);

		const output: Arma = new Arma(Arma.types[rng]);

		console.log(rng);
		console.log(output);
		return output.container;
	}
	static selected(e: Event) {
		let padre: HTMLElement = e.target as HTMLElement;
		if (!padre.querySelector("img")) {
			padre = padre.parentElement as HTMLElement;
		}
		for (let i = 0; i < this.types.length; i++) {
			const type = this.types[i];
			for (let j = 0; j < padre.classList.length; j++) {
				const styleClass = padre.classList[j];
				if (styleClass == type) {
					mainPlayer = new Player(type);
					configCombate();

				}
			}
		}
	}
}
//Combate
class Combate {
	playerWrapper: HTMLDivElement;
	rivalWrapper: HTMLDivElement;
	player: Player;
	//rival: Arma;
	constructor(player: Player) {
		this.player = player;
		this.playerWrapper = document.querySelector(".player") as HTMLDivElement;
		this.rivalWrapper = document.querySelector(".rival") as HTMLDivElement;
		this.playerWrapper.innerHTML = this.player.arma.container;

	}
}
const chosingWrapper = document.querySelector(".chosing") as HTMLDivElement;
const combateWrapper = document.querySelector(".combate") as HTMLDivElement;
function configChosing() {
	chosingWrapper.innerHTML = Arma.getAllTypes();
}
function configCombate() {
	chosingWrapper.style.display = "none";
	combate = new Combate(mainPlayer);
	combate.playerWrapper.innerHTML = mainPlayer.arma.container;
	combate.rivalWrapper.innerHTML = Arma.getRandomType();

}
configChosing();