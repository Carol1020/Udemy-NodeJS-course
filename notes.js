fs = require('fs');
const chalk = require('chalk');


const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter( (note) => note.title === title )
    
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })

    // if title is not duplicated, create a new note

    const duplicateNote = notes.find((note) => note.title === title)

    debugger 
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}


// 1.2
const removeNote = (title) => {
    // 1.4
    // console.log(title)
    // 2.1 this step is just reading data from the file, so no argument
    const notes = loadNotes()
    // 2.2
    // when title from the file !== title to be deleted, it will be returned (kept)
    const notesToKeep = notes.filter((note) => note.title !== title)
        
    // the note is removed, so notesToKeep become less.
    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
    // 2.3 save all titles that need to be kept
    saveNotes(notesToKeep);
}


const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteTitle = notes.find((note) => note.title === title)
    if (noteTitle) {
        console.log(chalk.inverse(noteTitle.title));
        console.log(noteTitle.body);
    } else {
        console.log('No note was found!')
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}


module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}