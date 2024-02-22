const Appointment = require('../models/AppointmentsModel');
const User = require('../models/UsersModel');
const Service = require('../models/ServicesModel');
const Stylist = require('../models/StylistModel');


async function isStylistAvailable(stylistId, requestedDate, requestedTime) {
    const stylist = await Stylist.findById(stylistId);
    if (!stylist) {
        return { available: false, stylist: null }; 
    }

    const isAvailable = stylist.availability.some(slot => {
        return slot.date.toISOString().split('T')[0] === requestedDate &&
               slot.startTime <= requestedTime &&
               slot.endTime >= requestedTime;
    });

    return { available: isAvailable, stylist }; 
}

exports.createAppointment = async (req, res) => {
    try {
        const { client, service, date, time } = req.body;

        const clientExists = await User.findById(client);
        if (!clientExists) {
            return res.status(404).send({ message: 'Client not found' });
        }

        console.log("Querying for service with ID:", service);

        const serviceDetails = await Service.findById(service);
        console.log("Service details:", serviceDetails);
        if (!serviceDetails || serviceDetails.stylists.length === 0) {
            return res.status(404).send({ message: 'Service not found or no stylists assigned' });
        }

        const { available, stylist } = await isStylistAvailable(serviceDetails.stylists[0], date, time);
        if (!available) {
            return res.status(400).send({ message: 'Stylist not available at the requested time' });
        }
        if (!stylist) {
            return res.status(404).send({ message: 'Stylist not found' });
        }

        const newAppointment = new Appointment({
            client,
            service,
            stylist: stylist._id, 
            date,
            time,
            status: 'booked',
        });

        await newAppointment.save();

        // Populate in a single await to streamline code
        await newAppointment.populate(['service', 'stylist']);

        res.status(201).json({
            message: "Appointment successfully booked",
            appointmentDetails: {
                date,
                time,
                service: newAppointment.service.name,
                stylist: newAppointment.stylist.name,
                price: newAppointment.service.price,
                status: newAppointment.status,
            }
        });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Failed to create appointment", error: error.message });
    }
};
