const express = require("express");
const cors = require("cors");
const fs = require("fs");
const xml2js = require("xml2js");

const app = express();

const PORT = 5000;

// Allow the React frontend to communicate with this backend
app.use(cors());

app.use(express.json());

// Read parking data from JSON file
app.get("/api/parking", (req, res) => {
    try {
        const data = fs.readFileSync("./data/parking.json", "utf8");

        const parkingData = JSON.parse(data);

        res.json(parkingData);
    } catch (error) {
        res.status(500).json({
            message: "Unable to read parking data"
        });
    }
});

// Read parking information from XML file
app.get("/api/parking/xml", (req, res) => {
    try {
        const xmlData = fs.readFileSync("./data/parking.xml", "utf8");

        xml2js.parseString(xmlData, (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: "Unable to process XML data"
                });
            }

            res.json(result);
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to read XML file"
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Parking backend running on http://localhost:${PORT}`);
});