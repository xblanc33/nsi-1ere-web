const PORT = 3000;
const express = require('express');
const app = express();

app.use(express.static('public'));


app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}!`)
})
  