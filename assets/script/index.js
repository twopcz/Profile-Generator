'use strict';

const inquirer = require('inquirer');
// import { prompt } from 'inquirer';
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const prompts = require('./prompts');
const userInfo = require('./userInfo');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

function promptUser() {
  return inquirer.prompt(prompts);
}

async function getUser(query, user) {
  try {
    const response = await axios.get(query);

    if (response.data.total_count === 1) {
      let userQuery = 'https://api.github.com/users/' + user;
      const userSearch = await axios.get(userQuery);

      const {
        avatar_url,
        url,
        html_url,
        name,
        blog,
        location,
        email,
        bio,
        public_repos,
        followers,
        following
      } = userSearch.data;

      const userStars = await axios.get(url + '/starred');

      const userData = [
        {
          repos: public_repos,
          followers: followers,
          following: following,
          stars: userStars.data.length,
          picture: avatar_url,
          link: html_url,
          name: name,
          blog: blog,
          location: location,
          email: email,
          bio: bio
        }
      ];

      await writeFileAsync('userInfo.json', JSON.stringify(userData));
      console.log('Successfully wrote userInfo.json');
    } else {
      console.log('Username not found.');
    }
  } catch (err) {
    console.error(err);
  }
}

async function generateHTML(answers) {
  try {
    let color = answers.color;

    readFileAsync('userInfo.json', 'utf8', (err, data) => {
      if (err) throw err;
      const fileData = JSON.parse(data);

      console.log(fileData.data);
    });
  } catch (err) {
    console.error(err);
  }

  //   return `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  //     <link
  //       rel="stylesheet"
  //       href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
  //       integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
  //       crossorigin="anonymous"
  //     />
  //     <link rel="stylesheet" href="assets/css/style.css" />
  //     <title>CLI Profile Generator</title>
  //   </head>
  //   <body>
  //     <div class="jumbotron jumbotron-fluid">
  //       <div class="container">
  //         <h1 class="display-4">Hi! My name is ${userInfo.name}</h1>
  //         <div class="row justify-content-center">
  //           <div class="col-4">
  //             <p class="lead">I am from ${userInfo.location}.</p>
  //           </div>
  //           <div class="col-4">
  //             <p class="lead">GitHub: ${userInfo.html_url}.</p>
  //           </div>
  //           <div class="col-4">
  //             <p class="lead">Blog: ${userInfo.blog}.</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div class="container align-items-center text-center">
  //       <div class="row">
  //         <div class="col-6">Repositories: ${userInfo.repos}</div>
  //         <div class="col-6">Followers: ${userInfo.followers}</div>
  //       </div>
  //       <div class="row">
  //         <div class="col-6">Stars</div>
  //         <div class="col-6">Following: ${userInfo.following}</div>
  //       </div>
  //     </div>

  //     <script
  //       src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
  //       integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  //       integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
  //       crossorigin="anonymous"
  //     ></script>
  //     <script
  //       src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
  //       integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
  //       crossorigin="anonymous"
  //     ></script>
  //   </body>
  // </html>`;
}

// function toPDF() {

// }

async function init() {
  console.log('initializing...');
  try {
    const answers = await promptUser();

    let username = answers.github;

    let searchQuery = 'https://api.github.com/search/users?q=' + username;

    await getUser(searchQuery, username);

    const html = await generateHTML(answers);

    await writeFileAsync('index.html', html);
    console.log('Successfully wrote to index.html');
  } catch (err) {
    console.error(err);
  }
}

init();
