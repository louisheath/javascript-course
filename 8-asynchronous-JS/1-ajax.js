/*

AJAX
Asynchronous Javascript And Xml
- allow us to asynchronously communicate with remote servers
- i.e make HTTP request to remote server's API

API
Application Programming Interface
- used to handle and response to communication requests
- e.g. use Google Maps API as a gateway to its features

*/

// FETCH

/*

same origin policy prevents requests to other domains

if Cross Origin Resource Sharing CORS is implemented on
  the foreign domain, same origin policy is avoided
also if the request is made by the backend, the problem is
  also bypassed

(https://code-maven.com/cors)

*/

function getGitHubProfilePromise(username) {

  fetch
  (`https://api.github.com/users/${username}`)
  .then(result => {
    return result.json();
  })
  .then(data => {
    console.log(`Github user ${data.login} has ${data.followers} followers and ${data.public_repos} public repositories`);
  })
  .catch(error => {
    console.log(error)
  });

}

async function getGitHubProfileAW(username) {

  try {
    // retrieve from Github API
    const result = await fetch
    (`https://api.github.com/users/${username}`);
    // get json content from response
    const data = await result.json();
    // operate on useful data
    console.log(`Github user ${data.login} has ${data.followers} followers and ${data.public_repos} public repositories`);
  } catch(error) {
    console.log(error);
  }

}

getGitHubProfilePromise('louisheath');
getGitHubProfileAW('louisheath');
