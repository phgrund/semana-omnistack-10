const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const getGithubInfo = require('../utils/getGithubInfo');
const { findConnections, sendMessage } = require('../websocket');

const index = async (req, res) => {
  const devs = await Dev.find();

  return res.json(devs);
}

const store = async (req, res) => {
  const { github_username, techs, latitude, longitude } = req.body;

  let dev = await Dev.findOne({ github_username });

  if(!dev) {
    const { name = login, avatar_url, bio } = await getGithubInfo(github_username);

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
    });

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray
    )

    sendMessage(sendSocketMessageTo, 'new-dev', dev);
  }

  return res.json(dev);
}

const update = async (req, res) => {
  const { github_username } = req.headers;

  const dev = await Dev.findOne({ github_username });

  if(!dev) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  const { name = login, avatar_url, bio } = await getGithubInfo(github_username);

  dev.name = name;
  dev.avatar_url = avatar_url;
  dev.bio = bio;

  await dev.save();

  return res.json({ message: 'Usuário atualizado' })
}

const destroy = async (req, res) => {
  const { github_username } = req.headers;

  const dev = await Dev.findOne({ github_username });

  if(!dev) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  await dev.remove();

  return res.json({ message: 'Usuário deletado' });

}

module.exports = {
  index,
  store,
  update,
  destroy
}