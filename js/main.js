"use strict";
var Arma = /** @class */ (function () {
    function Arma(type) {
        this.type = type;
        this.container = "\n\t\t\t<figure class=\"arma " + this.type + "\">\n                <img src=\"./images/icon-" + this.type + ".svg\" alt=\"logo_game\" height=\"50px\" width=\"50px\" />\n            </figure>";
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
    Arma.types = ["paper", "scissors", "rock"];
    return Arma;
}());
function configChosing() {
    var wrapper = document.querySelector(".chosing");
    wrapper.innerHTML = Arma.getAllTypes();
}
configChosing();
