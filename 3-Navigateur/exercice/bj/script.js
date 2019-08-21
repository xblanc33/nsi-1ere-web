let cartes = new Array();
let score = 0;

function initialization() {
    nouvellePartie();

    //TODO-1: ajouter 1 carte dès le début
    
    //TODO-2: ajouter le listener sur le bouton (voir fonction addButtonListener)
    
}

function nouvellePartie() {
	for (let i = 1; i < 53; i++) { 
	    cartes[i] = 0;
	}
}

function nouvelleCarte() {
	let i = Math.floor((Math.random()*52)+1);
    while (cartes[i] != 0) {
        i = Math.floor((Math.random()*52)+1);
    }
    cartes[i] = 1;
    return i;
}

function majScore(carte) {
    let modulo13 = carte % 13;
    let valeur = modulo13 <=1 || modulo13 >= 10 ? 10 : modulo13;
    score = score + valeur;
    document.getElementById("score").innerHTML = score;
}

function ajouterCarte(src) {
    let img = document.createElement('img');
    img.src = src;
    document.getElementById("mes-cartes").appendChild(img);
}

function imageCarte(i) {
    if (i < 10) {
        return `./img/0${i}.BMP`;
    } else {
        return `./img/${i}.BMP`;
    }
}

function clickOnAjouterCarte() {
    //TODO-2: alert
    //TODO-3: ajouter une carte
}

function addButtonListener() {
    let ajouterCarteButton = document.getElementById("boutton-ajout-carte");
    ajouterCarteButton.onclick = clickOnAjouterCarte;
}

window.onload = initialization;