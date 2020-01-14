const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const index = async (req, res) => {
  const devs = await Dev.find();

  return res.json(devs);
}

const store = async (req, res) => {
  const { github_username, techs, latitude, longitude } = req.body;

  let dev = await Dev.findOne({ github_username });

  if(!dev) {
    const githubRes = await axios.get(`https://api.github.com/users/${github_username}`);

    const { name = login, avatar_url, bio } = githubRes.data;
  
    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  
    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techsArray,
      location
    })
  }

  return res.json(dev);
}

module.exports = {
  index,
  store
}