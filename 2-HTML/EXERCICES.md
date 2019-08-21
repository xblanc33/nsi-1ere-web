# EXERCICES

## Visualisation et édition simple HTML

L'objectif est de visualiser une page HTML dans un navigateur et de la modifier.

1. À l'aide de Chrome, ouvrez la page `./html/index.html` dans un navigateur.
2. À l'aide d'un éditeur de code ([vscode](https://code.visualstudio.com) par exemple), ouvrez la page `index.html` et modifiez le titre et le `<body>`de la page, puis sauvegardez pour voir les effets de vos modifications dans le navigateur web.
3. Toujours dans le navigateur, supprimez la balise `html` (ouvrante et fermante) puis sauvegardez. Constatez que Chrome est encore capable de visualiser la page web.
4. Enfin, vous pouvez essayer de ne pas fermer certaines balises ; vous verrez que Chrome est relativement indulgent.
5. Valider votre document HTML pour détecter d'éventuelles erreurs avec le [W3C validator](https://validator.w3.org/)

## Outils de développement de Chrome

L'objectif est de manipuler les outils de développement de Chrome.

1. Ouvrez les outils de développement de Chrome. Dans l'onglet _Elements_ vous pouvez visualiser le DOM.
1. Toujours avec les outils de développement de Chrome, changez le DOM par exemple en modifiant le _body_. Vous constaterez que le navigateur effectue les modification mais que le fichier `index.html` n'est pas modifié (c'est très pratique pour tester en _live_).

## Édition HTML, lien entre deux pages HTML

L'objectif est de créer un lien entre deux pages HTML.

1. Avec votre éditeur de code, ouvrez la page `blackjack.html` du répertoire `./html/bj` puis modifiez-la ajouter une image représentant le roi de coeur.
2. Toujours avec votre éditeur de code, ajoutez dans la page `index.html` un lien qui pointe vers la page `blackjack.html`

Le répertoire correction contient la correction de cet exercice.
