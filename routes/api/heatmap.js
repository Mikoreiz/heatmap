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

router.get("/dropoffsAPC", async (request, response) => {
try {  
    const dropoffs = require('../../data/dataAPC.json')
    let vehicleNumber = ' '
    let vehNum = new Set()
    
    if (!dropoffs) {
        return response.status(400).json({ msg: "Nothing to show" })
    }

    for (var i = 0; i < dropoffs.length; i++) {
        vehNum.add(dropoffs[i]["vehicleNumber"])
    }

    response.render("heatmapDropoffsAPC", {
        dropoffs: dropoffs,
        vehicleNumber: vehicleNumber,
        vehNum: vehNum,
        mapBox: config.development.mapbox_token
    })
} catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
}
})

router.get("/dropoffsAPC/:_vehicleNumber", async (request, response) => {
try {  
    const info = require('../../data/dataAPC.json')
    let dropoffs = []
    let vehNum = new Set()
    let vehicleNumber

    if (request.params._vehicleNumber) {
        vehicleNumber = request.params._vehicleNumber
    } else {
        vehicleNumber = ' '
    }

    
    if (!info) {
        return response.status(400).json({ msg: "Nothing to show" })
    }

    for (var i = 0; i < info.length; i++) {
        if (vehicleNumber == info[i]["vehicleNumber"]) {
            dropoffs.push(info[i])
        }
        vehNum.add(info[i]["vehicleNumber"])
    }

    response.render("heatmapDropoffsAPC", {
        dropoffs: dropoffs,
        vehNum: vehNum,
        vehicleNumber: vehicleNumber,
        mapBox: config.development.mapbox_token
    })
} catch (err) {
    console.error(err.message)
    response.status(500).send("Server Error")
}
})

module.exports = router