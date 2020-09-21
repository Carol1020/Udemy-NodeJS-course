const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js')


// Challenge 1: Setup command option and function
// 1. Setup the remove command to take a required "--title" option
// 2. Create and export a removeNote function from notes.js
// 3. Call removeNote in remove command handler
// 4. Have removeNote log the title of the note to be removed
// 5. Test your work using: node app.js remove --title="some title"


// Challenge 2: Wire up removeNote
// 1. Load existing notes
// 2. Use array filter method to remove the mataching note (if any)
// 3. Save the newly created array
// 4. Test your work with a title that exists and a title that doesn't exist


// Challenge 3: Use chalk to provide useful logs for remove
// 1. If a note is removed, print 'Note removed!" with a green background 
// 2. If no note is removed, print 'No note found!' with a red background

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        // 1.1
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    // 1.3
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})


yargs.parse()