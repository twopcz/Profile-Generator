'use strict';

const inquirer = require('inquirer');
const axios = require('axios');
const index = require('../index.js');

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
      it("gets data successfully from GitHub's api", async () => {
        const input = 'https://api.github.com/search/users?q=twopcz';
        const output = `https://api.github.com/users/twopcz`;

        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        expect(index.gitSearch(input)).resolves.toEqual(output);
      });

      it("does not successfully get data from GitHub's api", async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage))
        );

        expect(index.gitSearch('')).rejects.toThrow(errorMessage);
      });
    });

    describe('userSearch', () => {
      it('gets data based on the user', async () => {
        const data = {};

        const input = `https://api.github.com/users/twopcz`;

        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(index.userSearch(input)).resolves.toEqual(data);
      });
    });

    describe('starSearch', () => {
      it('gets starred repos from the user', async () => {
        const data = {};

        const input = 'https://api.github.com/users/twopcz/starred';
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(index.starSearch(input)).resolves.toThrow(errorMessage);
      });
    });
  });
});
