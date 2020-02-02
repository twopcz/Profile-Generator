'use strict';

const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const { BrowserWindow } = require('electron');
const open = require('open');
const prompts = require('./prompts');
const htmlTemplate = require('./htmlTemplate');

let win;

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt(prompts);
}

async function gitSearch(gitQuery, user) {
  try {
    const response = await axios.get(gitQuery);

    if (response.data.total_count === 1) {
      return 'https://api.github.com/users/' + user;

      // const userStars = await axios.get(url + '/starred');
      // console.log(userStars);
      // console.log(url + '/starred');

      // error handle null
    } else {
      console.log('Username not found.');
    }
  } catch (err) {
    console.error(err);
  }
}

async function userSearch(userQuery) {
  try {
    const user = await axios.get(userQuery);
    return user.data;

    // error handle null
  } catch (err) {
    console.error(err);
  }
}

async function setBackground(userColor) {
  const color = userColor.color;

  const cssColor = `
  body {
    background-color: ${color};
  }
  `;

  writeFileAsync('../css/background.css', cssColor);
}

async function createWindow() {
  win = new BrowserWindow({ show: false });

  win.loadFile('../../index.html');

  win.webContents.on('did-finish-load', () => {
    win.webContents
      .printToPDF({ printBackground: true })
      .then(data => {
        writeFileAsync('./index.pdf', data, 'utf8', err => {
          if (err) throw err;
          console.log('Successfully created PDF.');

          openPDF();
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

async function openPDF() {
  await open('./index.pdf', { wait: true });
  console.log('The PDF viewer was closed.');
  await win.close();
}

async function init() {
  console.log('initializing...');
  try {
    const answers = await promptUser();
    const username = answers.github;
    const search = 'https://api.github.com/search/users?q=' + username;
    const userQuery = await gitSearch(search, username, answers);
    const info = await userSearch(userQuery);
    await writeFileAsync('userInfo.json', JSON.stringify(info));
    console.log('Successfully wrote to userInfo.json');
    const htmlInfo = htmlTemplate.generateHTML(info);
    setBackground(answers);
    await writeFileAsync('../../index.html', htmlInfo);
    console.log('Successfully wrote to index.html');
    await createWindow();
  } catch (err) {
    console.error(err);
  }
}

init();
