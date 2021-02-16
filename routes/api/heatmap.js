const express = require("express")
const router = express.Router()
const config = require("../../config.json")


router.get("/pickups", async (request, response) => {
    try {  
        const pickups = require('../../data/data.json')
        
        if (!pickups) {
            return response.status(400).json({ msg: "Nothing to show" })
        }

        response.render("heatmapPickups", {
            pickups: pickups,
            mapBox: config.development.mapbox_token
        })
    } catch (err) {
        console.error(err.message)
        response.status(500).send("Server Error")
    }
  })

  router.get("/dropoffs", async (request, response) => {
    try {  
        const dropoffs = require('../../data/data.json')
        
        if (!dropoffs) {
            return response.status(400).json({ msg: "Nothing to show" })
        }

        response.render("heatmapDropoffs", {
            dropoffs: dropoffs,
            mapBox: config.development.mapbox_token
        })
    } catch (err) {
        console.error(err.message)
        response.status(500).send("Server Error")
    }
  })
  
  module.exports = router