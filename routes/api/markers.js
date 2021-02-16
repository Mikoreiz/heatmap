const express = require("express")
const router = express.Router()
const config = require("../../config.json")


router.get("/pickupMarkers", async (request, response) => {
    try {  
        const markers = require('../../data/data.json')
        
        if (!markers) {
            return response.status(400).json({ msg: "Nothing to show" })
        }

        response.render("pickupMarkers", {
            markers: markers,
            mapBox: config.development.mapbox_token
        })
    } catch (err) {
        console.error(err.message)
        response.status(500).send("Server Error")
    }
})

router.get("/dropoffMarkers", async (request, response) => {
    try {  
        const markers = require('../../data/data.json')
        
        if (!markers) {
            return response.status(400).json({ msg: "Nothing to show" })
        }

        response.render("dropoffMarkers", {
            markers: markers,
            mapBox: config.development.mapbox_token
        })
    } catch (err) {
        console.error(err.message)
        response.status(500).send("Server Error")
    }
})

router.get("/passenger/:_customerId", async (request, response) => {
    try {
        const markers = require('../../data/data.json')
        const customerId = request.params._customerId
        let info = []

        for (var i = 0; i < markers.length; i++) {
            if (String(customerId) == markers[i]["customerId"]) {
                info.push(markers[i])
            }
        }

        console.log(info)

        response.render("passenger", {
            info: info,
            mapBox: config.development.mapbox_token
        })

    } catch (err) {
        console.error(err.message)
        response.status(500).send("Server Error")
    }
})

module.exports = router