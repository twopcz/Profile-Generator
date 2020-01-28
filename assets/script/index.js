'use strict'

const inquirer = require('inquirer');
// import { prompt } from 'inquirer';
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const prompts = require('./prompts');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt(prompts);
}

async function getUser(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        const gitHubData = response.data.items[0];

        const { avatar_url, html_url, repos_url, followers_url, following_url } = gitHubData;

        const getRepos = await axios.get(repos_url);
        const getFollowers = await axios.get(followers_url);
        const getFollowing = await axios.get(following_url);

        const totalRepos = getRepos.data.length;
        const totalFollowers = getFollowers.data.length;
        const totalFollowing = getFollowing.data.length;

        console.log(totalRepos);
        console.log(totalFollowers);
        console.log(totalFollowing);
    } catch (err){
        console.error(err);
    }
}

// function generateHTML(answers) {
// let color = answers.color;
//     return `
//     `;
// }

// function toPDF() {

// }

async function init() {
    console.log('initializing...');
    try {
        const answers = await promptUser();

        let username = answers.github;

        let queryURL = 'https://api.github.com/search/users?q=' + username;

        getUser(queryURL);


        // const token = ' ac71eae05d780cecf7bcf599250317fa5c67668d';

        // const html = generateHTML(answers);

        // await writeFileAsync('index.html', html);
        console.log('Successfully wrote to index.html');
    } catch (err) {
        console.error(err);
    }
}

init();