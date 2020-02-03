# Profile Generator
This is a Node.js application that creates a `.pdf` based on information collected from the user's GitHub profile. The document highlights important information from that user's profile that can be supplemented with other hiring documents for potential employers/recruiters.

## Getting Started
### Installation
Run:

```bash
npm i
```

### Usage
After installation, remain in the terminal and run:

```bash
npm start
```

This will start the script. The user will be prompted for a GitHub username followed by a list of colors for them to choose from. The application will try to find the GitHub profile associated with the inputted username and if successful, will populate an `.html` file. The `.html` file will contain that user's:

* Name
* Picture
* Location
* GitHub Profile Link
* Bio
* Number of Public Repositories
* Number of Followers
* Number of Following
* Number of Starred Repos

These are all `<a>` elements that open to their corresponding web page. The `.html` file will be saved and converted into a `.pdf` file that is then saved in `root` and opened up for the user to view with the default reader. Once the reader is closed, the application will exit.

### Demo
![](assets/images/profilegen.gif)

# Technologies

This application was built with:

* HTML
* CSS
* [Bootstrap](https://getbootstrap.com/)
* JavaScript
* [Node.js](https://nodejs.org/en/)

The dependencies required:

```
  "dependencies": {
    "axios": "^0.19.2",
    "electron": "^7.1.10",
    "inquirer": "^7.0.4",
    "jest": "^25.1.0",
    "open": "^7.0.1"
  }
  ```

Documentation on dependencies:

* [Axios](https://github.com/axios/axios) - to make promise based http requests
* [Electron](https://www.electronjs.org/docs) - to convert the .html file to a .pdf
* [Inquirer](https://www.npmjs.com/package/inquirer#documentation) - used to prompt the user and store their answers
* [Jest](https://jestjs.io/docs/en/getting-started) - unit testing framework
* [open](https://www.npmjs.com/package/open) - used to open the .pdf file

The API used:

* [GitHub API](https://developer.github.com/v3/)

# Enhancements
I would like to extract more information from the queried username, such as a list of all of the user's repositories. Also, currently if the user profile does not have anything saved under a category like 'Bio,' the API call returns `null` for that field. That is then passed into the `.html` file and I would like to handle that better.

# License
This project is licensed under the MIT License - see the LICENSE.md file for details