"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mainPlayer;
var combate;
//Player
var Player = /** @class */ (function () {
    function Player(arma) {
        if (arma === void 0) { arma = ""; }
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
    return Player;
}());
//Arma
var Arma = /** @class */ (function () {
    function Arma(type) {
        this.beats = "";
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
        var output = new Player(Arma.types[rng]);
        return output;
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
var Rock = /** @class */ (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var _this = _super.call(this, "rock") || this;
        _this.beats = "scissors";
        return _this;
    }
    return Rock;
}(Arma));
var Scissors = /** @class */ (function (_super) {
    __extends(Scissors, _super);
    function Scissors() {
        var _this = _super.call(this, "scissors") || this;
        _this.beats = "paper";
        return _this;
    }
    return Scissors;
}(Arma));
var Paper = /** @class */ (function (_super) {
    __extends(Paper, _super);
    function Paper() {
        var _this = _super.call(this, "paper") || this;
        _this.beats = "rock";
        return _this;
    }
    return Paper;
}(Arma));
//Combate
var Combate = /** @class */ (function () {
    function Combate(player) {
        this.player = player;
        this.rival = Arma.getRandomType();
        this.playerWrapper = document.querySelector(".player");
        this.rivalWrapper = document.querySelector(".rival");
        this.playerWrapper.innerHTML = this.player.arma.container;
    }
    Combate.prototype.fight = function () {
        var output;
        if (this.player.arma.beats == this.rival.arma.type) {
            output = true;
        }
        else if (this.rival.arma.beats == this.player.arma.type) {
            output = false;
        }
        return output;
    };
    return Combate;
}());
//Escenas
var chosingWrapper = document.querySelector(".chosing");
var combateWrapper = document.querySelector(".combate");
function configChosing() {
    var data = Arma.getAllTypes();
    var data2 = data.split("<figure");
    var data3 = new Array();
    for (var i = 1; i < data2.length; i++) {
        var dataBruto = data2[i];
        data3.push("<figure" + dataBruto);
    }
    chosingWrapper.innerHTML = "\n\t\t<div class=\"items-top\">" + data3[0] + data3[1] + "</div>\n\t\t<div class=\"item-bottom\">" + data3[2] + "</div>\n\t";
}
function configCombate() {
    combate = new Combate(mainPlayer);
    var outputRival = combate.rival.arma.container;
    var resultWrapper = combateWrapper.querySelector(".result");
    var resultText = resultWrapper.querySelector("h2");
    var textOutput = "";
    combateWrapper.style.display = "flex";
    chosingWrapper.style.display = "none";
    resultWrapper.style.display = "none";
    combate.playerWrapper.innerHTML = "\n\t\t\t<h2>YOU PICKED</h2>\n\t\t\t" + mainPlayer.arma.container + "\n\t";
    combate.rivalWrapper.innerHTML = "\n\t\t<h2>THE HOUSE PICKED</h2>\n\t\t<div class=\"arma\"></div>\n\t";
    setTimeout(function () {
        combate.rivalWrapper.innerHTML = "\n\t\t\t<h2>THE HOUSE PICKED</h2>\n\t\t\t" + outputRival + "\n\t";
        resultWrapper.style.display = "flex";
        if (combate.fight() == undefined) {
            textOutput = "EMPATE";
        }
        else if (combate.fight()) {
            textOutput = "WINS";
        }
        else {
            textOutput = "LOSE";
        }
        resultText.innerHTML = "YOU " + textOutput;
    }, 2000);
}
configChosing();
//Popup Rules
var btn_popupRules = document.getElementById("btn_showRules");
var rulesWrapper = document.getElementById("rules");
btn_popupRules.onclick = function () {
    rulesWrapper.style.display = "block";
};
