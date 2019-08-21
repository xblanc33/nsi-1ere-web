const PORT = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.post('/cartes',
    // Validate that the name field is not empty.
    body('nom', 'requis').isLength({ min: 1 }).trim(),
    // Sanitize (escape) the name field.
    sanitizeBody('name').escape(),
     // Process request after validation and sanitization.
    function (req, res) {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.status(400).send(generateErrorHTML(errors.array()[0].msg));
        }
        else {
            res.status(200).send(generateHTML(req.body.nom));
        }
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

function generateErrorHTML(error) {
    return `<!doctype html>
    <html>
        <head>
            <title>Mes Cartes</title>
            <link rel="stylesheet" href="styles.css"/>
        </head>
        <body>
            Saisissez votre nom
            <form action="/cartes" method="post">
                <div>
                    <label for="name">Nom :</label>
                    <input type="text" name="nom">             
                    <span class="alert">${error}</span>
                </div>
            </form>
        </body>
    </html>`
}