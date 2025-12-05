import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { getWeather } from "./weatherService.js"


dotenv.config();

const app = express();

app.use(cors());
app.get("/", (req, res) => {
    res.send("Weather API server running");
});

app.get("/weather", async (req, res) => {

    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }
    try {
        const weatherData = await getWeather(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
