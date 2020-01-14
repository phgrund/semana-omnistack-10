const axios = require('axios');

module.exports = async function getGithubInfo(github_username) {
  return new Promise(async (resolve) => {
    const githubRes = await axios.get(`https://api.github.com/users/${github_username}`);

    resolve(githubRes.data);
  })
}

