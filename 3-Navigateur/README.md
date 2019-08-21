# 3 - Navigateur

## HTML et JS

Tous les navigateurs web exécutent du code JavaScript ([vous trouverez ici une description courte des concepts de base de ce langage](./JavaScript.md)).

JavaScript gère les intéractions avec l'utilisateur et permet de rendre la page dynamique. Il est aussi utilisé pour envoyer des requêtes vers le serveur et recevoir les réponses.

## Un interpreteur par page web (chargement du DOM)

D'un point de vue technique, on considère que tout navigateur démarre un nouvel interpréteur dès qu'il commence à recevoir une nouvelle page web.

Au fur et à mesure qu'il reçoit les balises de la page web, il construit les objets JavaScript du DOM qui correspondent à ces balises HTML.

A la fin du chargement de la page web, la mémoire de l'interpréteur contient donc tous les objets JavaScript qui correspondent à toutes les balises de la page. Ces objets sont structurés sous forme d'un arbre, c'est ce qu'on appelle le DOM.

## Exécution des scripts

Si du code JavaScrip est intégré à la page HTML ou s'il est référencé, l'interpréteur va exécuter ce code lors du chargement du DOM.

Pour ajouter du code JavaScript dans une page HTML, on peut le faire à l'intérieur d'une balise `<script>`:

```html
<script>
console.log('Ce code a été exécuté');
</script>
```

On peut aussi mettre le code JavaScript dans un fichier externe (.js) et pointer ce fichier depuis le HTML là encore grâce à une balise `<script>`. Le navigateur se chargera de télécharger le fichier de script.

```html
<script src="./script.js"></script>
```

avec `script.js` :

```javascript
console.log('Ce code a été exécuté');
```

En utilisant la console dans les outils de développement de Chrome, il est possible d'accéder à l'interpréteur de la page HTML. C'est là qu'on verra les messages écrits sur la console (`console.log`).

Il est aussi possible de saisir du code JavaScript dans la console et de l'exécuter. Cela est fortement utile pour tester un bout de code lors de la phase de développement de la page web.

Comme le code JavaScript est exécuté dès que le navigateur peut lire le script (ou peu de temps après), il se peut que le code soit exécuté avant que le navigateur n'ait chargé toute la page HTML. Si on veut que toute la page soit chargée avant d'exécuter le code, il faut alors exploiter les [événements DOM](#DOM-Event) et plus particulièrement l'événement de type `load`.

```javascript
window.onload(function() {
    //ce code sera exécuté lorsque le DOM sera complètement chargé
})
```

ou


```javascript
window.addEventListener('load', function () {
    console.log('la page est chargée');
});
```

Enfin, notons qu'on peut ajouter l'attribue `defer` à la balise `<script>` (`<script defer>`) pour dire au navigateur d'exécuter après le chargement du DOM mais juste avant que l'événement `load` ne soit émit (déféré).

## DOM Element

Grâce à JavaScript il est possible de manipuler dynamiquement les éléments du DOM.

Les éléments DOM sont des objets JavaScript qui proposent des propriétés décrites par leur [API](https://www.w3schools.com/jsref/dom_obj_all.asp).

L'élément racine du DOM est le `document` qui est un éléments DOM mais qui dispose de [propriétés supplémentaires](https://www.w3schools.com/jsref/dom_obj_document.asp).

Les API des éléments DOM et du document offrent de nombreuses méthodes pour parcourir l'arbre DOM et pour effectuer des modifications. 

Par exemple, les méthodes suivantes permettent de retrouver un ou plusieurs éléments de la page web :
* getElementById(_id_) : pour retrouver un élément à partir de son identifiant.
* getElementsByTagName(_tagName_) : pour retrouver tous les éléments à partir d'un nom de balise.
* querySelector(_cssSelector_) : pour retrouver un élément qui correspond à un [selecteur CSS](https://www.w3schools.com/cssref/css_selectors.asp)
* querySelectorAll(_cssSelector_) : pour retrouver tous les éléments qui correspondent à un [selecteur CSS](https://www.w3schools.com/cssref/css_selectors.asp).

Les méthodes suivantes quant à elles permettent d'accéder aux valeurs des éléments et même de les remplacer:
* getAttributeNames() : pour retrouver tous les noms des attributs portés par un élément
* getAttribute(_name_) : pour retrouver la valeur d'un attribut à partir du nom de l'attribut
* value : pour retrouver ou écrire la valeur d'un éléments (lorsque l'élément est un champ de texte par exemple)
* innerHTML : pour retrouver ou écrire le contenu HTML
d'un élement.

Enfin, il est possible de construire de nouveaux éléments et de les ajouter au DOM, ou même de supprimer des éléments existant. L'objectif étant de changer le DOM et donc de modifier dynamiquement l'affichage :
* document.createElement(_tagName_) : pour construire un nouvel élément
* appendChild(_element_) : pour ajouter un élément fils

Ainsi  le code suivant illustre cette API en retrouvant dans la page web l'élement HTML dont l'id est `"mondId"` et en y ajoutant une balise `<img>` contenant l'image "02.BMP".

```javascript
let target = document.getElementById("monId");
let img= document.createElement('img');
img.src= './img/02.BMP';
target.appendChild(img);
```

Notez qu'en utilisant la console dans les outils de développement de Chrome, il est possible d'accéder aux éléments. La complétion automatique vous permettra de tester l'API. Vous pourrez alors manipuler le DOM dynamiquement et observer le résultat dans le navigateur.

Par exemple, si on écrit ``document.body.innerHTML = "VIDE";`` dans la console, le _body_ de la page web sera dynamiquement modifié et contiendra la chaîne de caractères : "VIDE".
La page web affichée par le navigateur deviendra alors toute blanche et affichera cette chaîne de caractères.

## DOM Event

Le DOM émet des événements (DOM Event) lorsque ses éléments (DOM Element) subissent des interactions.

Par exemple, un évènement de type `click` est émis à chaque fois que l'utilisateur clique sur un élément.

Grâce à JavaScript, on peut ajouter des traitements (fonctions _callbacks_) qui seront exécutés lorsqu'un événement sera émis.

Il existe deux façons similaires pour ajouter une _callBack_ à un élément _cible_ pour un _type_ d'événement donné :
* _cible_.on_type_ = _callBack_ : Par exemple, `window.onload = () => {console.log('page chargée')}`)
* _cible.addEventListener('_type', _callBack) : Par exemple, `window.addEventListener('load', () => {console.log('page chargée')}`)

Le code suivant ajoute par exemple la carte "01.BMP" dans l'élément d'id `"mes-cartes"` à chaque fois que l'on clique sur le bouton dont l'id est `"ajout-carte"`.

```javascript
clickAjoutCarte() {
    let img = document.createElement('img');
    img.src = './img/01.BMP';
    document.getElementById("mes-cartes").appendChild(img)
}

document.getElementById("ajout-carte").onclick(clickAjoutCarte);
```

