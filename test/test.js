'use strict';

const index = require('../index.js');
const html = require('../htmlTemplate.js');

describe('Index', () => {
    describe('promptUser', () => {
        it('should ask the user for their username and favoite color, then save them', async () => {
            const answers = await index.promptUser();

            expect(answers.github).toEqual('twopcz');
        });
    });
});

// describe('generateHTML function', () => {
//     it('populates the template with the GitHub user\'s information', () => {

//     })
// })