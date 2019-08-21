const PORT = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.post('/cartes',function(req, res) {
    res.status(200).send(generateHTML(req.body.nom));
});



app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}!`)
})
  

function generateHTML(nom) {
    return `<!doctype html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title> BlackJack </title>
            <link rel="stylesheet" href="styles.css"/>
            <script src="./script.js"></script>
        </head>
    
        <body>
            <h2>${nom}</h2>
            Score : <span id="score">0</span>
            
            <h2>Vos cartes</h2>
            <div id="mes-cartes">
            </div>
            <button id="boutton-ajout-carte">Nouvelle carte !</button>
        </body>
    
    </html>`;
}