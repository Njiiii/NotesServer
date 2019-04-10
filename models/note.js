//Tämä tiedosto määrittää yhteyden tietokantaan ja tietokantaan laitettavan Noten mallin

const mongoose = require('mongoose')

//dbUrl on mongoDB tietokannan url
const dbUrl = 'mongodb+srv://Niko:<password>@web-ohjelmointi-part3-k4fkx.mongodb.net/Notes'

//Otetaan yhteys tietokantaan
mongoose.connect(dbUrl)

//Tämä malli määrittelee minkälainen note on
const Note = mongoose.model('Note', {
    content: String,
    date: Date
})

module.exports = Note