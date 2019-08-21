# JavaScript - Principes de base

Je propose ici une courte description des principes de base de JavaScript. L'objectif n'est pas d'expliquer toutes les constructions de ce languge mais juste de préciser ses grandes caractéristiques en donnant quelques liens utiles (malheureusement je ne connais pas de bon livre présentant ce langage).

D'un point de vue historique, [JavaScript](https://fr.wikipedia.org/wiki/JavaScript) a été principalement défini pour être exécuté dans un navigateur web.

Pour autant, depuis quelques années, il a gagné en popularité et est aujourd'hui utilisé dans bien d'autres contextes (programmation côté serveur, scripts et macros dans des applications, etc.).

## Un langage interprété

JavaScript est un langage interprété. Cela veut dire qu'il est exécuté par un interpréteur sans qu'une phase de compilation soit nécessaire.
[NodeJS](https://nodejs.org/en/) est l'interpréteur le plus populaire de JavaScript.

Vous pouvez installer NodeJS sur n'importe quel ordinateur. Une fois installé, il suffit  d'exécuter la commande  `node` pour démarrer l'interpréteur. Celui-ci propose une invite de commande qui permet de saisir du code JavaScript qui sera automatiquement interprété.
Il est aussi possible de demander à l'interpréteur d'exécuter l'intégralité d'un fichier qui contient du code JavaScript. Les instructions seront interprétées de la première jusqu'à la dernière.

Tout navigateur web dispose d'un interpreteur JavaScript et peut ainsi exécuter du code JavaScript. Lorsqu'une page HTML référence du code JavaScript, celui-ci est téléchargé par le navigateur et interprété par un interpréteur. Il est important de noter que le navigateur va créer un interpréteur par page HTML. Tous les scripts référencé par cette page partagerons le même interpréteur et donc la même zone mémoire.

Notons enfin que JavaScript est un standard ECMA : [ECMA Script](https://developer.mozilla.org/fr/docs/Web/JavaScript/Language_Resources). On comprend alors qu'il y a des différences entre le standard et les interpréteurs (c.f. [compatibilité NodeJS / ECMA ](https://node.green/)).

## Typage dynamique

En JavaScript les variables sont typées mais le typage est dynamique, c'est à dire qu'il change lors de l'exécution.

De plus, le typage est implicite et calculé par l'interpréteur tout au long de l'exécution du programme. De fait, le code source ne mentionne pas les types car ceux-ci peuvent changer.

Le code suivant définit trois variables `a`, `b` et `c` (le mot clé `let` est utilisé pour définir une nouvelle variable). Dans ce code, les variables sont définies sans valeur (dans ce cas on dit que la valeur est `undefined` et que le type est lui aussi `undefined`). La suite du code affecte différentes valeurs de différents types (voir les commentaires).

```javascript
let a;
let b;
a = 5; // a est un nombre
b = '5'; // b est une chaîne de caractères
let c = (a === b); // a===b teste l'égalité (valeur et type) de a et b, le résultat est faux. c est donc un boolean.
b = 10; // maintenant b est un nombre
c = a + b; // c vaut 15
```

Notons que les variables peuvent avoir pour valeur :
* un litéral (nombre, chaîne de caractères, booléen), le type dépend alors de la valeur (`number`, `string` et `boolean`)
* un objet, le type est `Object`
* une fonction, le type est `Function`

L'opérateur binaire `===` teste l'égalité de type et de valeur entre deux variables.

## Fonctionnel (mais pas pur)

JavaScript est plutôt apparenté aux langages fonctionnels (il est en train d'evoluer pour être de plus en plus apparenté aux langages à objets). Cela veut dire que la fonction est l'élément premier qui permet de structurer le code.

La définition d'une fonction se fait avec le mot clé `function`. Classiquement une fonction a des paramètres et peut définr des variables. Le code suivant définit une fonction qui permet d'afficher un message si celui-ci est une chaîne de caractères (sinon une erreur est renvoyée).

```javascript
function saySomething(msg) {
    let errorMsg = 'message is not a String';
    if (msg !== undefined) {
        console.log(msg);
    } else {
        throw new Error(erroMsg);
    }
}
```

JavaScript **n'est pas un langage fonctionnel pur** car les fonctions peuvent avoir des effets de bord, c'est à dire qu'elles peuvent modifier des variables qui ne sont pas définies par la fonction mais par son entourage.

Par exemple, le code suivant définit une fonction qui modifie une variable qui est définie en dehors de la fonction.

```javascript
let a;

function f() {
    a = 5;
}

f();
```

## Fonctionnel quand même (les fonctions comme paramètres des fonctions)

Nous avons vu que la valeur d'une variable peut être une fonction. Il est donc possible de passer une fonction comme paramètre d'une fonction. Le code suivant définit la fonction `tranceAndCall` qui prend comme paramètre une fonction `f`. Dans le code de la fonction `tranceAndCall`, on voit que la fonction `f` est appelée à la fin : `f()`. 

```javascript
function traceAndCall(f) {
    console.log('function will be called');
    f();
}
```

Passer une fonction comme paramètre d'une fonction est souvent réalisé en JavaScript pour signifier que le traitement réalisé par la fonction est terminée. Classiquement, on appelle __callBack__ une telle fonction passée en paramètre (on pourrait traduire son nom en appelleMoiQuandToutEstTerminé).

```javascript
function traitementAExecuter(callBack) {
    //Code du traitement à exécuter
    //...
    //Le traitement est terminé
    callBack();
}
```

Lorsqu'on appelera la fonction `traitementAExecuter`, il faudra alors lui passer en paramètre une fonction callBack.
Dans l'exemple suivant, la fonction `maFonctionDeFin` joue ce rôle de fonction callBack.

```javascript
function maFonctionDeFin() {
    console.log('Génial le traitement est terminé');
}

traitementAExecuter(maFonctionDeFin);
```

On peut même passer le code de la fonction lors de l'appel en définissant une fonction anonyme (on appelle cela une fonction lambda) :

```javascript
traitementAExecuter( () => {
    console.log('Génial le traitement est terminé');
    });
```

## Objet (enfin plutôt dictionnaire)

JavaScript propose un concept d'objet qui est un dictionnaire : un ensemble de couples (nom, valeur).

Le code suivant définit la variable `johnSnow` qui est un objet. Cet objet possède trois propriétés : `first`, `last`, `isAlive`.
On peut accéder aux propriétés des objets (en lecture et écriture).

```javascript
let johnSnow = {
    first : 'John',
    last : 'Snow',
    isAlive : undefined
}

johnSnow.isAlive = true;
```

On dit que les objets possèdent les propriétés car celles-ci ne sont pas partageables entre les objets. Une propriété appartient à un et un seul objet.

Deux objets peuvent avoir des propriétés qui ont le même nom et il est même possible de s'échanger des valeurs. Dans le code suivant, `point1` et `point2` sont deux objets avec les mêmes propriétés. Chaque propriété a sa valeur.

```javascript
let point1 = {
    x : 1,
    y : 1
}
let point2 = {
    x = 1,
    y = 2
}
point1.x = point2.y; // poin1.x vaut 2
point2.y = 3;
point1.x; //vaut toujours 2
```

Lorsque la valeur d'une propriété d'un objet est un objet, c'est en fait une référence vers cet objet. On peut accéder aux propriétés de cet objet référencé en chaînant les noms des propriétées. Dans le code suivant on définit un nouvel objet `droite1` dont les propriétés sont `start` et `end`. Les valeurs de ces propriétés sont des références vers `point1` et `point2`. On peut accéder directement à la propriété `x` de `point1` en passant par `droite.start.x`. Si on change la valeur de cette propriété `x` en passant par `point1.x` alors on change `droite.start.x`. De fait, lorsque les valeurs des propriétés sont des objets, celles-ci ne sont pas réellement possédées.  

```javascript
let droite1 = {
    start : point1, //start est une référence vers point1
    end : point2 //end est une référence vers point2
}
droite1.start.x; //vaut 2 (cf code précédent)
point1.x = 5;
droite1.start.x; //vaut 5
```

## Objet et fonction

Un objet peut définir une propriété dont la valeur est une fonction. On appelle alors une telle propriété une _méthode_. Par exemple le code suivant définit l'objet `johnSnow` dont l'une de ses propriétés a comme valeur la fonction `resurrect`.

```javascript
let johnSnow = {
    first : 'John',
    last : 'Snow',
    isAlive : undefined,
    resurrect : function() {
        this.isAlive = true;
    }

}

johnSnow.resurrect();
```

Lorsqu'un objet définit une fonction, il est possible d'appeler la fonction à partir de l'objet. Ainsi fait, le mot clé **`this`** dans la fonction référence l'objet courant qui définit la fonction.

Ce mot clé `this` est à utiliser avec précaution car sa valeur dépend de la façon dont sera appeler la fonction. Dans le code suivant, la fonction est copiée puis est appelée sans mention de l'objet, `this` aura alors comme valeur le contexte d'appel de la fonction (ici le niveau global du script)

```javascript
let isAlive = false;
let f = johnSnow.resurrect;
f();
isAlive; //vaut true
johnSnow.isAlive;//vaut toujours false!!!
```

## Prototypage

En JavaScript les objets sont chaînés par une relation dite de prototypage. Chaque objet a exactement 1 prototype. Par contre, un objet peut être le prototype de zéro ou plusieurs objets.

C'est l'interpreteur qui fixe les chaînes de prototypage à la construction des objets.
Pour autant, le code suivant permet de construire un objet en lui donnant en paramètre son prototype.

```javascript
let o1 = {}; //on construit un objet de base vide
let o2 = new Object(o1); // on constuire un objet dont le prototype est o1
```

Lorsqu'on demande la valeur d'une propriété d'un objet, si l'objet n'a pas cette propriété, il transfert cette demande à son prototype. Si son prototype a la propriété, alors c'est la valeur de cette propriété détenue par le prototype qui est retournée.
Par exemple, le code suivant illustre ce propos:

```javascript
o1.a = 5;
o2.a; //o2 n'a pas cette propriété, il demande à o1, qui retourne 5.
```

Comme le prototypage marche avec toutes les propriétés des objets, il marche aussi avec celle dont les valeurs sont des fonctions (les méthodes) et permet ainsi de partager une fonction entre plusieurs objets :

```javascript
o1.f = function () {console.log(a);};
o2.f();
```

## Asynchrone

Un interpréteur JavaScript est _mono-thread_, c'est-à-dire qu'une seule instruction est exécutée à la fois.

De fait, pour maximiser les interactions, JavaScript supporte l'asynchronisme. Les fonctions asynchrones peuvent voir leur exécution temporairement suspendue.

Plusieurs mécanismes servent à gérer l'asynchronimse dans le code source. Le plus ancien étant le concept de _callBack_ que nous avons déjà présenté. Rappelons qu'une _callBack_ est une fonction qui sera appelée lorsque l'exécution d'une fonction (ici asynchrone) sera terminée (on passe alors la _callBack_ comme paramètre de la fonction asynchrone).

Le code suivant illustre ce principe à l'aide de la fonction `setTimeout` qui est asynchrone. Cette fonction suspend son exécution pendant un laps de temps puis exécute la _callBack_ passée en paramètre (ici la fonction `maCallBack`)

```javascript
function maCallBack() {
    console.log('fin du timer');
}
setTimeout(maCallBack, 2000);
```

D'autres mécanismes facilitant l'écriture de code asynchrone ont été proposés : _Promise_ et _async/await_. Ces mécanismes sont basés sur le principe de la __callBack__ et facilitent sont écriture dans le code.

## Evénementiel

JavaScript supporte de nombreux évènements. Un événement est déclenché par l'interpreteur (quand l'utilisateur clique sur un bouton, lorsqu'une requête a été envoyé, qu'une réponse arrive, qu'un traitement est terminé, etc.).
Chaque événement est caractérisé par un objet (l'événement). Cet objet a de nombreuses propriétés qui permettent d'obtenir plusieurs informations sur l'événement (quand il a eu lieux, quelle était la cible,etc.).

Pour réagir aux événements, JavaScript utilise les __callBack__ et l'asynchronisme. L'idée est d'enregistrer des _callBacks_ sur des type d'événements. Celles-ci seront appelées lors que les événements de ce type seront émis.

Le code suivant illustre ce propos avec l'ajout d'une __callBack__ anonyme sur l'événement de type `load` dont la cible est la fenêtre principale d'une page HTML (`window`). 

```javascript
window.addEventListener('load', function () {
    console.log('la page est chargée');
});
```

ou

```javascript
window.onload(function () {
    console.log('la page est chargée');
});
```
