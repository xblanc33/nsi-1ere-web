# Exercices

## Serveur de pages statiques

Nous avons codé un serveur qui gère uniquement les pages statiques.

Lancez ce serveur en allant dans répertoire `static` et en exécutant les trois commandes suivantes :

```javascript
    npm install
    node index.js
```

Vous devriez pouvoir cibler ce serveur depuis votre navigateur en allant sur l'URL : [http://localhost:3000](http://localhost:3000)

Copiez / Collez les pages HTML du BlackJack dans le répertoire `public` du serveur et chargez-les avec votre navigateur.

Le serveur qui s'exécute sur votre machine est accessible à travers le réseau grâce à l'adresse IP de la machine ou à son nom.

## Serveur de pages dynamiques

Nous avons codé un serveur de page dynamique.

Lancez ce serveur en allant dans le répertoire `dynamic` et en exécutant les deux commandes suivantes:

```javascript
    npm install
    node index.js
```

Modifiez la page `index.html` afin que le formulaire envoie une requête POST vers l'URL **/cartes** avec une donnée `nom` contenant le nom saisie par le joueur.
