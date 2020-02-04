'use strict';

const inquirer = require('inquirer');
const axios = require('axios');
const index = require('../index.js');
const fs = require('fs');

jest.mock('inquirer');
jest.mock('axios');

describe('Index', () => {
  describe('promptUser', () => {
    it('should validate user inputs from the terminal and store information', async () => {
      expect.assertions(1);
      inquirer.prompt = jest.fn().mockResolvedValue({ username: 'test' });

      await expect(index.promptUser()).resolves.toEqual({ username: 'test' });
    });

    describe('gitSearch', () => {
      it("gets data successfully from GitHub's api with correct input, otherwise undefined", async () => {
        const input = '';
        const output = undefined;

        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(index.gitSearch(input)).resolves.toEqual(output);
      });
    });

    describe('userSearch', () => {
      it('gets data based on the user', async () => {
        const user = [{login: 'test'}];
        const resp = { data: user };

        axios.get.mockImplementationOnce(() => Promise.resolve(resp));

        return index.userSearch().then(data => expect(data).toEqual(user));
      });
    });

    describe('starSearch', () => {
      it('gets starred repo from users if they exist, if not, undefined', async () => {
        const stars = undefined;
        const resp = [{ data: stars }];

        axios.get.mockImplementationOnce(() => Promise.resolve(resp));

        return index.starSearch().then(data => expect(data).toEqual(stars));
      });
    });

    describe('setBackground', () => {
      it('sets the background color and saves it', () => {
        const input = [{ color: 'test' }];
        const output = 'idk';

        expect(index.setBackground(input)).toEqual(output);
      });
    });
  });
});
