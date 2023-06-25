import CityModel from '../models/cityModel.js';

// Function to get all cities
// Queries are search and country
export const getCities = async (req, res) => {
    const { search, country } = req.query;

    let cities = [];

    try {
        if (country) {
            cities = await CityModel.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { altName: { $regex: search, $options: 'i' } }
                ],
                country: country
            });
        } else {
            cities = await CityModel.find({
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { altName: { $regex: search, $options: 'i' } }
                ]
            });
        }

        // Only send name, country, population, and loc
        cities = cities.map((city) => {
            return {
                cityId: city.cityId,
                name: city.name,
                country: city.country,
                population: city.population,
                loc: city.loc
            };
        });

        // Sort by descending population
        cities.sort((a, b) => {
            return b.population - a.population;
        });

        res.status(200).json({
            success: true,
            result: cities,
            message: 'Cities fetched'
        })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cities' });
    }
};

// Function to get a city by id
export const getCityById = async (req, res) => {
    const { cityId } = req.params;

    try {
        const city = await CityModel.findOne({ cityId: cityId });

        if (!city) {
            res.status(404).json({ message: 'City not found' });
        }

        res.status(200).json({
            success: true,
            result: city,
            message: 'City fetched'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving city' });
    }
};

