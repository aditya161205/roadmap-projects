import axios from "axios";
import client from "./redisClient.js"


export async function getWeather(city) {
    const key = `weather:${city.toLowerCase()}`;
    const ttl = parseInt(process.env.CACHE_TTL);

    const cache = await client.get(key);
    if (cache) {
        return { source: "cache", data: JSON.parse(cache) };
    }

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.WEATHER_API_KEY}`;

    const response = await axios.get(url);
    const data = response.data;

    await client.set(key, JSON.stringify(data), { EX: ttl });
    return { source: "api", data };

}