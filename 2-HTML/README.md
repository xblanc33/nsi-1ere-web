# HTML ou comment structurer l'information contenue dans un site web

Tous les sites web sont composés de pages HTML.

Le langage HTML est le langage qui permet d'éditer (fond et forme) les pages web.

[Exercices](./EXERCICE.md)

## Contenu d'une page HTML minimaliste

Une page HTML minimaliste contient le texte suivant :

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Ma page HTML</title>
    </head>
    <body>
        Ceci est ma premiere page HTML !
    </body>
</html>
```

La première ligne est le prologue. Il précise que le reste du texte est du HTML.

Le texte contient ensuite des balises ouvrantes et fermantes (`<html>` et `</html>`) ou encore (`</title>` et `</title>`.

L'imbrication des balises ouvrantes et fermantes constitue un arbre (qui est marqué ici par l'indentation du texte mais ce n'est pas obligatoire).

Chaque balise a une signification. Notre exemple contient les balises suivantes : 
* `<html>` : Représente la racine de l'arbre HTML.
* `<head>` : Cette balise contient les informations (méta-données) de la page HTML.
* `<title>` : Cette balise permet de donner un titre à la page. Ce titre sera affiché par le navigateur dans l'onglet.
* `<body>` : Cette balise représente le contenu de la page. Ce contenu sera affiché par le navigateur.


## Quelques balises HTML intéressantes

### Les balises `h1`, `h2`, `h3`, `h4`, `h5`

Les balises `<h1></h1>`, `<h2></h2>`, `<h3></h3>`, `<h4></h4>` et `<h5></h5>` représentent des titres de section à différents niveau (1 à 5).

### La balise `a`

La balise `<a href='autrePage.hml'> lien vers une autre page </a>` permet de créer un lien entre deux pages HTML.

L'utilisateur pourra alors cliquer sur ce lien et le navigateur affichera la page ciblé par l'attribut `href`.
En fait, en cliquant ce ce lien, le navigateur emet un Event et par défaut il va chercher la cible du lien sur le serveur web pour l'afficher.

Cette balise peut également être utilisée pour créer un lien interne à la page, à l'aide d'une ancre nommée. 
Sa création s'effectue en deux temps. Tout d'abord l'ancre nommée est ajoutée à une balise existante via son attribut `id`, par exemple : `<h2 id="monAncre">Titre</h2>`. Celle-ci peut alors être la cible d'un lien en préfixant son nom par le caractère `#` : `<a href="#monAncre">lien vers le titre</a>`.

### Les balises `ul` et `li`
Les balises `<ul></ul>` et `<ll></li>` permettent de faire des listes d'items.

Par exemple:

```html
<ul>
    <li>item1 </li>
    <li>item2 </li>
    <li>item3 </li>
</ul>
```

### La balise `img`

La balise `img` permet d'insérer une image dans la page : `<img src="monImage.jpg" alt="Mon image"/>`. L'attribut `src` premier permet d'indiquer le chemin du fichier image à insérer. L'attribut `alt` sert à afficher un texte alternatif au cas où l'image ne s'afficherait pas (problème de connexion) ou ne pourrait pas être vue (par les robots d'indexation et les logiciels lecteur d'écran pour les personnes mal-voyantes notamment).

### Les balises `div` et `span`

Ces balises sont extrêmement utiles car elles délimitent des parties de la page HTML qui pourront être identifiées par CSS et JS.

Pour ce faire, on pourra leur attacher une ancre (attribut `id`) ou une classe (attribut `clas`) qui pourra être la cible de CSS ou JS.

### Les balises `form`, `input`, `button`

Ces balises sont extrêmement utiles car elles servent à créer des formulaires. 

```html
<form action="/cartes" method="post">
    <div>
        <label for="name">Nom :</label>
        <input type="text" name="nom">
    </div>
</form>
```

Le formulaire présenté contient un champ de saisie de texte et spécifie que la soumission du formulaire (touche entrée) va envoyer une requête POST vers le serveur web (nous expliquerons les détails des formulaires dans la partie 4-Serveur).

## Page HTML et arbre DOM

Un navigateur web (Chrome, par exemple) affiche une page HTML.
 
Tous les navigateurs ont la même représentation interne en mémoire d'une page HTML : c'est ce qu'on appelle le DOM (Document Object Model).

Cette structure est arborescente. Chaque balise HTML est représentée par un élément (DOM Element).

C'est cette structure qui pourra être manipulée en JavaScript et c'est sur cette structure que les Event seront définis.
