# 4 - Interaction Navigateur Web / Serveur Web, comment le navigateur interagit-il avec le serveur ?

Un site web est composé de plusieurs ressources : pages HTML, images, films, script JavaScript, feuilles CSS, etc.

Les ressources qui composent un site web sont demandées par le navigateur web auprès d'un serveur web.

Ces ressources sont parfois stockées sur le serveur web (comme des fichiers) et parfois elles sont construites dynamiquement.

Qu'elles soient générées ou construites, elles sont envoyées par le serveur web lorsque le navigateur web en fait la requête.

C'est le [protocole HTTP](https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol) qui définit la façon dont sont réalisés les requêtes et les réponses entre le navigateur et le serveur web. HTTP date de 1990 et la version 2.0 est sortie en 2015.

HTTP est un protocole **requête / réponse** : le client (le navigateur web) envoie une requête et le serveur web y répond.

Nous décrivons ici ce protocole et comment on peut coder les requêtes et les réponses du côté du navigateur web comme du côté du serveur web.

## La requête HTTP

Pour effectuer une requête, le navigateur web doit connaître l'adresse IP sur serveur et lui envoyer un message qui est constitué ainsi :
* Une ligne de commande qui contient
  * le verbe HTTP qui précise l'intention de la requête : 
    * `GET` : pour obtenir une ressource (lire une page web),
    * `POST` : pour ajouter une information concernant une ressource,
    * `PUT` : pour ajouter une ressource,
    * `DELETE` : pour supprimer une ressource (cette commande est souvent interdite),
    * `PATCH` : pour modifier une ressource existante.
  * l'URL qui cible la ressource 
  * la version du protocole.
* L'en-tête de requête qui est composée de plusieurs champs (clé / valeur) tels que :
  * `host` : le nom du site web, ce qui est nécessaire quand le serveur web héberge plusieurs sites web (ce qui n'est pas rare),
  * `User-Agent` : le nom du navigateur web (ce qui permet d'envoyer du contenu adapté au navigateur)
  * `Referer` : l'URL précédente d'où vient le client,
  * `Content-Type` : le [type MIME](https://fr.wikipedia.org/wiki/Type_de_médias) de la ressource contenue dans le message ,
  * `Content-Length` : la taille du corps de la requête
* Une ligne vide
* Corps de requête qui contient des données envoyées avec la requête

### GET ou POST

L'utilisation d'un verbe `GET` ou `POST` est souvent discuté et fait même parfois débat. Il est donc important de bien comprendre les différences et les enjeux.

D'abbord, la seule différence est qu'une requête `GET` doit avoir un corps de requête vide alors que cela n'est pas le cas pour une requête `POST`.

Le corps de la requête est le seul endroit où l'on peut ajouter de l'information :
* non textuelle
* en grande quantité (plus que 2083 caractères)

De fait, si votre requête doit contenir de l'information non textuelle (image, fichier zip, etc.) ou si elle doit contenir une information qui ne rentre pas dans 2083 caractères, alors il faudra envoyer une requête `POST`.

Après, on considère qu'une requête `GET` est idempotente, ce qui veut dire qu'envoyer une fois ou plusieurs fois la requête a le même effet. Cela n'est en principe pas le cas pour les requête `POST`.
Du coup, si votre requête est idempotente, il vaut mieux privilégier la requête `GET`.

### Coder l'envoi d'une requête par le navigateur - Le Front

L'envoi d'une requête peut se faire :
* En HTML grâce à la balise `<a>`
* En HTML grâce à la balise `<form>`
* En JavaScript grâce à la fonction `fetch`

#### En HTML avec la balise `<a>`

Si votre page HTML contient une balise `<a>` dont le `href` est une ressource externe à la page (elle n'est donc pas une ancre), alors un click sur le lien fera emettre une requête `GET` par votre navigateur avec `href` comme `URL`.

Par exemple :
```html
<a href='https://www.google.com'>Google Search</a>
```

Un click sur `Google Search` lancera une requête `GET` vers `https://www.google.com`.

#### En HTML avec un formulaire `<form>`

Si votre page HTML contient un formulaire (une balise `<form>`) alors, la soumission du formulaire fera envoyer une requête par votre navigateur.

Le verbe de la requête correspondra à l'attribut `method` du formulaire. L'URL de la requête correpondra à l'attribut `action`.

Par exemple :
```html
<form method='GET' action='./login'>
    <input name='user' type='text' required>
    <input name='password' type='password' required>
    <button type='submit'>login</button>
</form>
```

Remplir ce formulaire et le soumettre fera envoyer une requête `GET` vers l'URL `./login`. 
Notons que si le verbe est `GET`, alors les données du formulaire seront encodés dans l'URL. Dans le cas d'un `POST` ils seront alors encodés dans le corps de la requête.

#### En JavaScript

Depuis peu, c'est la fonction [fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) qui permet d'envoyer des requêtes et de recevoir des réponses.

Cette méthode prend comme argument l'URL de la requête et, optionnellement, un objet qui permet de préciser les options de la requêtes (son verbe, son en-tête, etc.)

Cette méthode est asynchrone et exploite les promesses plutot que les CallBack. La [documentation](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) présente plusieurs exemples d'utilisation de cette fonction.

### Coder la reception d'une requête par le serveur web - Le Back

Un serveur web est un programme qui s'exécute sur une machine connectée à Internet et qui est en attente de requêtes pour pouvoir y répondre.

Un tel programme peut être écrit dans différents langages de programmation. Les plus connus sont PHP, Java, C#, Ruby et même JavaScript.

Afin de ne pas avoir à présenter un nouveau langage de programmation, je fais le choix de présenter un serveur web écrit en JavaScript en utilisant [ExpressJS](https://expressjs.com). L'objet est simplement d'illustrer le code d'un serveur web sans pour autant entrer dans les détails.

Le code suivant représente un serveur web très minimaliste qui ne sait répondre à aucune requête.

```javascript
const PORT = 80;
const express = require('express');
const app = express();

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}!`)
})
```

Dans ce code, `app` représente le serveur web.
La ligne suivante permet de préciser que le serveur web va répondre à toutes les requêtes `GET` dont l'URL cible des fichiers qui se trouvent dans le repertoire `public`. Le serveur web se contentera alors de renvoyer ces fichiers dans la réponse.

```javascript
app.use(express.static('public'));
```

Pour faire en sorte que notre serveur web réponde à d'autres requêtes, il faut alors utiliser les méthode `get()` et `post()` de `app` qui permettent de décrire ce que fait le serveur quand il reçoit une requête `GET` ou `POST`.

Par exemple, le code suivant précise que le serveur web sait traiter les requêtes `POST` vers l'URL `/login`.
Lorsqu'il reçoit une telle requête, la fonction `(request, response) => {}` est exécutée.

```javascript
app.post('/login', (request, response) => {
    let login = req.body.login;
    let password = req.body.password;
    //check login and password
})
```

## La réponse HTTP

La réponse est envoyée par le serveur vers le client et est constituée ainsi :
* La ligne de statut (Version HTTP, Code, message explicatif)
* En-tête de la réponse
* [Ligne vide]
* Corps de la réponse

De plus HTTP définit plusieurs [codes pour la réponse](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) dont le fameux code **404** qui signifie que la ressource ciblée n'a pas été trouvée :
* 1xx : la requête est en cours de traitement.
* 2xx : la requête est traitée : succès (200), créée (201), etc.
* 3xx : la requête a été transférée vers un autre serveur : (301) déplacée définitivement sur un autre serveur, (304) pas modifiée donc le cache est à jours, etc.
* 4xx : il y a une erreur qui vient du client : (401) pas autorisé, (403) interdit, (404) pas trouvé, etc.
* 5xx : il y a une erreur qui vient du serveur : (501) pas implanté, (503) service down, etc.

### Coder la réponse par le serveur

En reprenant note façon de coder le serveur web (avec JavaScrip et ExpressJS), envoyer une réponse se fait grâce à la méthode `send()` du paramère `response`.

Avec notre exemple du traitement d'une requête `POST` sur l'URL `/login`, la ligne `response.status(200).send('ok')` permet de renvoyer une réponse textuelle (`ok`) avec un code de retour `200` précisant que tout s'est bien déroulé.

```javascript
app.post('/login', (request, response) => {
    let login = req.body.login;
    let password = req.body.password;
    //check login and password
    response.status(200).send('ok');
})
```

### Coder la réception de la réponse par le navigateur

Si l'envoie de la requête a été fait en HTML (avec la balise `<a>` ou `<form>`), le navigateur s'attend à recevoir comme réponse une nouvelle page HTML. Si tel est le cas, il affichera cette nouvelle page HTML. Si cela n'est pas le cas, il fera ce qu'il pourra faire en fonction de ce qu'il recevra.

Si l'envoie de la requête a été fait en JavaScript, alors la réception de la réponse par le navigateur se fait en exploitant les promesses de la fonction `fetch()`.