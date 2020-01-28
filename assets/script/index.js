'use strict'

const inquirer = require('inquirer');
// import { prompt } from 'inquirer';
const fs = require('fs');
const util = require('util');

const prompts = require('./prompts');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt(prompts);
}

// function generateHTML(answers) {
//     return `
//     `;
// }

// function toPDF() {

// }

async function init() {
    console.log('initializing...');
    try {
        const answers = await promptUser();
    } catch (err) {
        console.error(err);
    }
}

init();