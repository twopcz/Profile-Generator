'use strict';

const index = require('../index.js');
const html = require('../htmlTemplate.js');

describe('Index', () => {
    describe('promptUser', () => {
        it('should take the users input and save it to be used', async () => {
            const actual = await promptUser();

            expect(answers.github).toEqual('test');
        });
    });
});


// describe("Describe Inquirer function", () => {
//     it("should validate user inputs from the terminal and store information", () => {
//       const input = 'GitHub1'
//       const output = 'GitHub1'
//       expect(input).toEqual(output);
//     });
//     it("should validate user inputs from the terminal and store information", () => {
//         const input = '';
  
//         const err = new Error (
//             `Invalid input something something something`
//         )
//         expect(input).toThrowError(err);
//       });
// });
