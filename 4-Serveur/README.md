# 4 - Interaction Navigateur Web / Serveur Web, comment le navigateur interagit-il avec le serveur ?

Un site web est composé de plusieurs types de fichiers : pages HTML, images, films, script JavaScript, feuilles CSS, etc.

Les fichiers qui composent un site web sont demandés par le navigateur web auprès d'un serveur web.

Ces fichiers sont parfois stockés sur le serveur web et parfois ils sont construits dynamiquement.

Qu'ils soient générés ou construits, ils sont envoyés par le serveur web lorsque le navigateur web en fait la requête.

C'est le [protocole HTTP](https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol) qui définit la façon dont sont réalisés les requêtes et les réponses entre le navigateur et le serveur web. HTTP date de 1990 et la version 2.0 est sortie en 2015.

HTTP est un protocole **requête / réponse** : le client (le navigateur web) demande une requête et le serveur web y répond.

Nous décrivons ici ce protocole et comment on peut coder les requêtes et les réponses du côté du navigateur web comme du côté du serveur web.

## La requête HTTP

Pour effectuer une requête, le navigateur wzb doit connaître l'adresse IP sur serveur et lui envoyer un message qui est constitué ainsi :
* Une ligne de commande qui contient
  * le verbe HTTP qui précise l'intention de la requête : 
    * `GET` : le navigateur veut obtenir une ressource (lire une page web),
    * `POST` : le navigateur veut ajouter une information concernant une ressource (poster un formulaire).
    * `PUT` : le navigateur veut ajouter une ressource (déposer un fichier),
    * `DELETE` : le navigateur veut supprimer une ressource (cette commande est souvent interdite),
    * `PATCH` : le navigateur veut modifier une ressource existante.
  * l'URL cible 
  * la version du protocole.
* L'en-tête de requête qui est composée de plusieurs champs (clé / valeur) tels que :
  * `host` : le nom du site web, ce qui est nécessaire quand le serveur web héberge plusieurs sites web (ce qui n'est pas rare),
  * `User-Agent` : le nom du navigateur web (ce qui permet d'envoyer du contenu adapté au navigateur)
  * `Referer` : l'URL d'où vient le client,
  * `Content-Type` : le [type MIME](https://fr.wikipedia.org/wiki/Type_de_médias) de la ressource contenue dans le message ,
  * `Content-Length` : la taille de la ressource contenue d
* Une ligne vide
* Corps de requête qui contient les données propres à la requête que l'on veut transmettre au serveur web

## GET ou POST

L'utilisation d'un verbe `GET` ou `POST` est souvent discuté. Il est donc important de bien comprendre les différences et les enjeux.

D'abbord, la seule différence est qu'une requête `GET` doit avoir un corps de requête vide alors que cela n'est pas le cas pour une requête `POST`.

Le corps de la requête est le seul endroit où l'on peut ajouter de l'information :
* non textuelle
* en grande quantité (plus que 2083 caractères)

De fait, si votre requête doit contenir de l'information non textuelle (image, fichier zip, etc.) ou si elle doit contenir une information qui ne rentre pas dans 2083 caractères, alors il faudra envoyer une requête `POST`.

Après, on considère qu'une requête `GET` est idempotente, ce qui veut dire qu'envoyer une fois ou plusieurs fois la requête a le même effet. Cela n'est en principe pas le cas pour les requête `POST`.
Du coup, si votre requête est idempotente, il vaut mieux privilégier la requête `GET`.

## Coder l'envoi d'une requête par le navigateur

### En HTML avec la balise `<a>`

Si votre page HTML contient une balise `<a>` dont la `target` est une ressource externe à la page (elle n'est donc pas une ancre), alors un click sur le lien fera emettre une requête `GET` par votre navigateur avec `target` comme `URL`.

Par exemple :
```html
<a href='https://www.google.com'>Google Search</a>
```

Un click sur `Google Search` lancera une requête `GET` vers `https://www.google.com`.

### En HTML avec un formulaire `<form>`

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

### En JavaScript


## Coder la reception d'une requête par le serveur web

## La réponse

La réponse est envoyée par le serveur vers le client et est constituée ainsi :
* La ligne de statut (Version HTTP, Code, message explicatif)
* En-tête de la réponse
* [Ligne vide]
* Corps de la réponse

HTTP défini plusieurs [codes pour la réponse](https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP) dont le fameux code **404** qui signifie que la ressource ciblée n'a pas été trouvée :
* 1xx : la requête est en cours de traitement.
* 2xx : la requête est traitée : succès (200), créée (201), etc.
* 3xx : la requête a été transférée vers un autre serveur : (301) déplacée définitivement sur un autre serveur, (304) pas modifiée donc le cache est à jours, etc.
* 4xx : il y a une erreur qui vient du client : (401) pas autorisé, (403) interdit, (404) pas trouvé, etc.
* 5xx : il y a une erreur qui vient du serveur : (501) pas implanté, (503) service down, etc.


