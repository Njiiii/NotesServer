//DATABASE TEST FILE

const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitHub!
const url = 'mongodb+srv://Niko:<password>@web-ohjelmointi-part3-k4fkx.mongodb.net/Notes'

mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })