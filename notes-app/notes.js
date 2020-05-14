const fs=  require('fs')
const chalk = require('chalk')
const getNotes  = () => {
    return 'Your notes...'
}

const listNotes = () => {
    const notes = LoadNotes()

    console.log(chalk.white.inverse.bold('Your notes are : '))

    notes.forEach( (note) => {
        console.log(note.title)
        
    });


}

const readNotes = (title) =>{
    const notes = LoadNotes()

    const note = notes.find((note) => note.title ===title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
        
    }else{
         console.log(chalk.red.inverse('body not found.'))

    }

}

const addNotes = (title, body) =>{
    const notes = LoadNotes();
    const DuplicateNote = notes.find((note) => note.title === title)
    // const DuplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })
    
    if(!DuplicateNote){
        notes.push({
            title : title,
            body : body
        })
    
        SaveNotes(notes);
        console.log(chalk.green.inverse(("New note added !")))

    }else {
        console.log(chalk.red.inverse(('the notes are taken!')))
    }
    
}

const SaveNotes = (notes) => {
    const Databufferr = JSON.stringify(notes)
    fs.writeFileSync('notes.json', Databufferr) 
}

const LoadNotes = () =>{
    try{
        const Databuffer = fs.readFileSync('notes.json')
        const datastringify = Databuffer.toString()
        return JSON.parse(datastringify)

    }catch(e){
        return []
    }
}

const removeNotes = (title) =>{
    const notes = LoadNotes()
    const NotesToKeep = notes.filter((note) => note.title !== title)
    
    if(notes.length > NotesToKeep.length){
        console.log(chalk.green.inverse('The note is deleted. '))
    }else{
        console.log(chalk.red.inverse('the note not found.'))
    }
    
    
    SaveNotes(NotesToKeep)

    }


module.exports = {
    'getNotes' : getNotes,
    'addNotes' : addNotes,
    'removeNotes' : removeNotes,
    'listNotes' : listNotes,
    'readNotes' : readNotes

}
