const chalk = require('chalk');
const getNotes = require('./notes.js')

const msg = getNotes()
console.log(msg)

const greenMsg = chalk.red.bold('Error!')


console.log(chalk.green('success!'))
console.log(greenMsg)