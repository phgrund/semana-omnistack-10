const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const maxDistance = 10000;

const index = async (req, res) => {
  const { latitude, longitude, techs } = req.query;

  const techsArray = parseStringAsArray(techs);

  const devs = await Dev.find({
    techs: {
      $in: techsArray
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance
      }
    }
  })

  return res.json(devs);
}

module.exports = {
  index
}