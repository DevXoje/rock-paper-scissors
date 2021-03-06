class Arma {
	static types = ["paper", "scissors", "rock"];
	type: string;
	container: string;
	constructor(type: string) {
		this.type = type;
		this.container = `
			<figure class="arma ${this.type}">
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
}

function configChosing() {
	const wrapper = document.querySelector(".chosing") as HTMLDivElement;
	wrapper.innerHTML = Arma.getAllTypes();
}
configChosing();