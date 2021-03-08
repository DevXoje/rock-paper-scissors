let mainPlayer: Player;
let combate: Combate;
//Player
class Player {
	arma: Arma;

	constructor(arma = "") {
		switch (arma) {
			case "paper":
				this.arma = new Paper();
				break;
			case "scissors":
				this.arma = new Scissors();
				break;
			case "rock":
				this.arma = new Rock();
				break;
			default:
				this.arma = new Arma(arma);
				break;
		}

		this.arma.container = this.arma.container.replace("Arma.selected(event)", "");
	}
}
//Arma
class Arma {
	static types = ["paper", "scissors", "rock"];
	type: string;
	container: string;
	beats: string;

	constructor(type: string) {
		this.beats = "";
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
	static getRandomType(): Player {
		const rng = Math.floor(Math.random() * Arma.types.length);
		const output: Player = new Player(Arma.types[rng]);
		return output;
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
class Rock extends Arma {
	constructor() {
		super("rock");
		this.beats = "scissors";
	}
}
class Scissors extends Arma {
	constructor() {
		super("scissors");
		this.beats = "paper";
	}
}
class Paper extends Arma {
	constructor() {
		super("paper");
		this.beats = "rock";
	}
}
//Combate
class Combate {
	playerWrapper: HTMLDivElement;
	rivalWrapper: HTMLDivElement;
	player: Player;
	rival: Player;
	constructor(player: Player) {
		this.player = player;
		this.rival = Arma.getRandomType();
		this.playerWrapper = document.querySelector(".player") as HTMLDivElement;
		this.rivalWrapper = document.querySelector(".rival") as HTMLDivElement;
		this.playerWrapper.innerHTML = this.player.arma.container;

	}
	fight() {
		let output;
		if (this.player.arma.beats == this.rival.arma.type) {
			output = true;
		}
		else if (this.rival.arma.beats == this.player.arma.type) {
			output = false;
		}
		return output;
	}
}
//Escenas
const chosingWrapper = document.querySelector(".chosing") as HTMLDivElement;
const combateWrapper = document.querySelector(".combate") as HTMLDivElement;
function configChosing() {
	const data = Arma.getAllTypes();
	const data2 = data.split("<figure");
	let data3 = new Array();
	for (let i = 1; i < data2.length; i++) {
		const dataBruto = data2[i];
		data3.push("<figure" + dataBruto);
	}

	chosingWrapper.innerHTML = `
		<div class="items-top">${data3[0]}${data3[1]}</div>
		<div class="item-bottom">${data3[2]}</div>
	`;
}
function configCombate() {
	combate = new Combate(mainPlayer);

	const outputRival = combate.rival.arma.container;
	const resultWrapper = combateWrapper.querySelector(".result") as HTMLDivElement;
	const resultText = resultWrapper.querySelector("h2") as HTMLElement;
	let textOutput = "";
	combateWrapper.style.display = "flex";
	chosingWrapper.style.display = "none";
	resultWrapper.style.display = "none";
	combate.playerWrapper.innerHTML = `
			<h2>YOU PICKED</h2>
			${mainPlayer.arma.container}
	`;
	combate.rivalWrapper.innerHTML = `
		<h2>THE HOUSE PICKED</h2>
		<div class="arma"></div>
	`;
	setTimeout(() => {
		combate.rivalWrapper.innerHTML = `
			<h2>THE HOUSE PICKED</h2>
			${outputRival}
	`;
		resultWrapper.style.display = "flex";
		if (combate.fight() == undefined) {
			textOutput = "EMPATE";
		} else if (combate.fight()) {
			textOutput = "WINS";

		} else {
			textOutput = "LOSE";
		}
		resultText.innerHTML = `YOU ${textOutput}`;
	}, 2000);




}
configChosing();
//Popup Rules
const btn_popupRules = document.getElementById("btn_showRules") as HTMLButtonElement;
const rulesWrapper = document.getElementById("rules") as HTMLDivElement;

btn_popupRules.onclick = () => {
	rulesWrapper.style.display = "block";
}