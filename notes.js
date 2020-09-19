fs = require('fs');
const chalk = require('chalk');


const getNotes = function () {
    return "Your notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    // if title is not duplicated, create a new note
    if (duplicateNotes.length === 0) {
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

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

// 1.2
const removeNote = function (title) {
    // 1.4
    // console.log(title)
    // 2.1 this step is just reading data from the file, so no argument
    const notes = loadNotes()
    // 2.2
    const notesToKeep = notes.filter(function (note) {
        // when title from the file !== title to be deleted, it will be returned (kept)
        return note.title !== title
    })
    // the note is removed, so notesToKeep become less.
    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('Note removed!'));
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
    // 2.3 save all titles that need to be kept
    saveNotes(notesToKeep);
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}