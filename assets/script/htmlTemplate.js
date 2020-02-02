'use strict';

const generateHTML = (answers) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
          />
          <script src="https://kit.fontawesome.com/53455dd245.js" crossorigin="anonymous"></script>
          <link rel="stylesheet" href="assets/css/style.css" />
          <link rel="stylesheet" href="assets/css/background.css" />
          <title>CLI Profile Generator</title>
        </head>
        <body>
          <div class="jumbotron jumbotron-fluid">
            <div class="container text-center">
              <h1 class="display-4">Hi! My name is <span class="font-weight-bold">${answers.name}<span></h1>
              <p class="lead"><em>${answers.bio}</em></p>
              <div class="row justify-content-center">
                <div class="col-4">
                  <img src="${answers.avatar_url}" class="img-fluid rounded-circle" alt="profile-pic">
                </div>
              </div>
              <div class="row justify-content-center pt-3">
                <div class="col-2">
                  <p class="lead"><i class="fas fa-map-pin"></i> <a href="https://www.google.com/maps/place/${answers.location}/" target="_blank">${answers.location}</a></p>
                </div>
                <div class="col-2">
                  <p class="lead"><i class="fab fa-github-square"></i> <a href="${answers.html_url}" target="_blank">GitHub</a></p>
                </div>
                <div class="col-2">
                  <p class="lead"><i class="fas fa-address-card"></i> <a href="${answers.blog}" target="_blank">Portfolio</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="container align-items-center text-center">
            <div class="jumbotron bg-dark">
              <div class="row py-2">
                <div class="col-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Public Repos</h5>
                      <p class="card-text">${answers.public_repos}</p>
                      <a href="${answers.html_url}?tab=repositories" class="btn btn-primary" target="_blank">My Work</a>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Followers</h5>
                      <p class="card-text">${answers.followers}</p>
                      <a href="${answers.html_url}?tab=followers" class="btn btn-primary" target="_blank">My Followers</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row py-2">
                <div class="col-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">GitHub Stars</h5>
                      <p class="card-text">${answers.stars}</p>
                      <a href="${answers.html_url}?tab=stars" class="btn btn-primary" target="_blank">Starred Repos</a>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Following</h5>
                      <p class="card-text">${answers.following}</p>
                      <a href="${answers.html_url}?tab=following" class="btn btn-primary" target="_blank">Following</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <script
            src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
            integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            crossorigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossorigin="anonymous"
          ></script>
        </body>
      </html>`;
}

module.exports = {
  generateHTML
};