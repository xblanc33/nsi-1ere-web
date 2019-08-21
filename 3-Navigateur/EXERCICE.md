---
layout: article
title: Mise en pratique JavaScript
sidebar:
  nav: web
---

Téléchargez et décompressez l'archive [js.zip](js.zip). 

Les modifications sont à apporter dans le fichier `script.js` du repertoire `bj`.

## Changer le DOM dès le chargement de la page

Complétez le **TODO-1** pour faire en sorte qu'une carte soit ajoutée dès le chargement de la page.


## Réagir aux évènements

Complétez le **TODO-2** pour faire en sorte qu'un message soit affiché (fonction `alert`) à chaque fois qu'on clique sur le bouton.


## Changer le DOM après un évènement

Complétez le **TODO-3** pour faire en sorte qu'une carte soit ajoutée à chaque fois qu'on clique sur le bouton.


## Ajouter du hasard (optionnel)

Modifiez le script pour que les cartes soient choisies au hasard. L'objet natif `Math` ([doc](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math)) et la fonction `String.padStrat()` ([doc](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/padStart)) vous seront utiles.

## Échanger deux cartes à la souris (optionnel)

Modifier le script pour permettre à l'utilisateur d'échanger la position de deux cartes par un glisser-déposer. En pratique, intervertissez l'attribut `src` des deux images concernées par le _Drag and Drop_.

### Correction

Dans `script.js` modifiez la fonction `ajouterCarte` comme suit :

```javascript 
function ajouterCarte(src) {
    let img = document.createElement('img');
    img.src = src;
    img.id = Math.random().toString(36).substring(2, 15);
    img.draggable = true;
    img.ondragstart = drag;
    img.ondragover = allowDrop;
    img.ondrop = drop;
    document.getElementById("mes-cartes").appendChild(img);
}
```
Et ajoutez les fonctions :

```javascript 
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let srcElt = document.getElementById(data);
    let filename = ev.target.src;
    ev.target.src = srcElt.src;
    srcElt.src = filename;
}
```