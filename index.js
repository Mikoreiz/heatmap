const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "pug")

app.use(express.json({ extended: false }))

// Heatmap route
app.use("/", require("./routes/api/heatmap"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server listening on port 3000"))