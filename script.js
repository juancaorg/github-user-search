// NOTE: Unauthorized users (user is determined by his IP)
// can make up to 60 requests per hour, give or take.
// Keep this in mind when fetching data from the GH API.
// Credit to @adamstafa's answer in this GH issue:
// https://github.com/Cloud-CV/EvalAI/issues/1373

const API_URL = "https://api.github.com/users/octocat";
const devName = document.querySelector(".main__result--name");
const devUsername = document.querySelector(".main__result--username");
const devJoinDate = document.querySelector(".main__result--date");
const devDescription = document.querySelector(".main__result--description");
const devLocation = document.querySelector(".main__result--data-location>span");
const devUrl = document.querySelector(".main__result--data-website>a");
const devTwitter = document.querySelector(".main__result--data-twitter>span");
const devCompany = document.querySelector(".main__result--data-company>span");

// Render user's data in the result card.
function renderUserData(userDataObj) {
  devName.textContent = userDataObj.name;
  devUsername.textContent = "@" + userDataObj.login;
  devJoinDate.textContent = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(userDataObj.created_at));
  devDescription.textContent = userDataObj.bio;
  console.log("Repos: " + userDataObj.public_repos);
  console.log("Followers: " + userDataObj.followers);
  console.log("Following: " + userDataObj.following);
  devLocation.textContent = userDataObj.location;
  devUrl.textContent = userDataObj.blog;
  devTwitter.textContent = userDataObj.twitter_username;
  devCompany.textContent = userDataObj.company;
}

// Fetch a user from the GitHub API.
async function fetchUser() {
  try {
    // The GitHub API may require the headers option
    // for a successful request.
    // Right now it doesn't need, but just in case.
    // Credit:
    // https://stackoverflow.com/questions/39907742/github-api-is-responding-with-a-403-when-using-requests-request-function
    const response = await fetch(API_URL, {
      headers: {
        "User-Agent": "request",
      },
    });
    const userDataObj = await response.json();
    renderUserData(userDataObj);
  } catch (error) {
    console.log(error);
  }
}

// On load, fetch a user.
fetchUser();
