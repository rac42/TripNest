const Flight = require('../models/Flight');

exports.addFlight = async(req,res)=> {
    try {
        const flight = new Flight(req.body); // Assuming the data comes in request body
        await flight.save();
        res.status(201).json({message:"Flight details inserted successfully"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.searchFlights = async(req,res)=> {
    console.log(req.query)
    try{
        const {departureCity, arrivalCity, departureDate} = req.query;

        if(!departureCity || !arrivalCity || !departureDate) {
            return res.status(400).json({message:"please provide all the details to search flight"});
        }

        // const formattedDate = new Date(departureDate).toISOString().split('T')[0];

        const flights = await Flight.find({
            departureCity: { $regex: new RegExp(departureCity, 'i') }, // Case-insensitive match
            arrivalCity: { $regex: new RegExp(arrivalCity, 'i') },
            departureTime: {
                $gte: new Date(`${departureDate}T00:00:00.000Z`), // Start of the day
                $lt: new Date(`${departureDate}T23:59:59.999Z`)
            }
        })

        if (flights.length === 0) {
            return res.status(404).json({ message: 'No flights available for this timeframe' });
        }
        console.log(flights)

        res.status(200).json({flights});

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};