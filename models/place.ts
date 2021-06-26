export {}
const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const Place = mongoose.model('place', PlaceSchema)
module.exports = Place
