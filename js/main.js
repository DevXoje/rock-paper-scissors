"use strict";
var mainPlayer;
var combate;
//Player
var Player = /** @class */ (function () {
    function Player(arma) {
        if (arma === void 0) { arma = ""; }
        this.arma = new Arma(arma);
    }
    return Player;
}());
//Arma
var Arma = /** @class */ (function () {
    function Arma(type) {
        this.type = type;
        this.container = "\n\t\t\t<figure class=\"arma " + this.type + "\" onclick=\"Arma.selected(event)\">\n                <img src=\"./images/icon-" + this.type + ".svg\" alt=\"logo_game\" height=\"50px\" width=\"50px\" />\n            </figure>";
    }
    Arma.getAllTypes = function () {
        var output = document.createElement("div");
        for (var i = 0; i < this.types.length; i++) {
            var type = this.types[i];
            var arma = new Arma(type);
            output.innerHTML += arma.container;
        }
        return output.innerHTML;
    };
    Arma.getRandomType = function () {
        var rng = Math.floor(Math.random() * Arma.types.length);
        var output = new Arma(Arma.types[rng]);
        console.log(rng);
        console.log(output);
        return output.container;
    };
    Arma.selected = function (e) {
        var padre = e.target;
        if (!padre.querySelector("img")) {
            padre = padre.parentElement;
        }
        for (var i = 0; i < this.types.length; i++) {
            var type = this.types[i];
            for (var j = 0; j < padre.classList.length; j++) {
                var styleClass = padre.classList[j];
                if (styleClass == type) {
                    mainPlayer = new Player(type);
                    configCombate();
                }
            }
        }
    };
    Arma.types = ["paper", "scissors", "rock"];
    return Arma;
}());
//Combate
var Combate = /** @class */ (function () {
    //rival: Arma;
    function Combate(player) {
        this.player = player;
        this.playerWrapper = document.querySelector(".player");
        this.rivalWrapper = document.querySelector(".rival");
        this.playerWrapper.innerHTML = this.player.arma.container;
    }
    return Combate;
}());
var chosingWrapper = document.querySelector(".chosing");
var combateWrapper = document.querySelector(".combate");
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
