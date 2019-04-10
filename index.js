const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') 
const Note = require('./models/note')

app.use(bodyParser.json())
app.use(cors())


//logger funktio printtaa infoa saapuvasta requestista
const logger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}

app.use(logger)

//Formatoidaan note kätevämpään muotoon frontendille
//(meillä ei nyt ole frontendiä, siitä huolimatta tämä on kätevä olla)
const formatNote = (note) => {
    return {
        content: note.content,
        date: note.date,
        id: note._id
    }
}


//ROUTE HANDLERS

app.get('/', (req, res) => {
    res.send('<h1>Tietokanta löytyy /api/notes</h1>')
})

//Printataan Notes-tietokannan sisältö sivulle /notes
app.get('/api/notes', (req, res) => {
    Note   
        .find({})
        .then(notes => {
            res.json(notes.map(formatNote))
        })
})


//Printataan /notes/[id] sivulle yhden noten tiedot
app.get('/api/notes/:id', (req, res) => {
    Note    
        .findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(formatNote(note))
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

//Poistetaan haluttu note
app.delete('/api/notes/:id', (req, res) => {
    Note
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => {
            res.status(400).send({ error: 'malformatted id' })
        })
})



//Lisätään note tietokantaan
app.post('/api/notes', (req, res) => {
    const body = req.body
    
    if (body.content === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const note = new Note({
        content: body.content,
        date: new Date()
    })

    note
        .save()
        .then(formatNote)
        .then(savedAndFormattedNote => {
            res.json(savedAndFormattedNote)
        })
})

//Jos tulee vastaan error jota mikään route handler ei käsittele, heitetään 404 
const error = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)

//ÄLÄ POISTA!
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
