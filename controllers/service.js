const Service = require('../models/ServicesModel')

// Add a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price, stylists } = req.body;
    const newService = new Service({
      name,
      description,
      duration,
      price,
      stylists
    });

    await newService.save();
    res.status(201).json({ message: "Service successfully created", service: newService });
  } catch (error) {
    console.error("Error creating service", error);
    res.status(500).json({ message: "Error creating service", error });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services", error);
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching the service by ID", error);
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// Update a service by ID
exports.updateServiceById = async (req, res) => {
  try {
    const { name, description, duration, price, stylists } = req.body;
    const updatedService = await Service.findByIdAndUpdate(req.params.id, {
      name,
      description,
      duration,
      price,
      stylists
    }, { new: true }); 

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: "Service successfully updated", service: updatedService });
  } catch (error) {
    console.error("Error updating service", error);
    res.status(500).json({ message: "Error updating service", error });
  }
};

// Delete a service by ID
exports.deleteServiceById = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error("Error deleting service", error);
    res.status(500).json({ message: "Error deleting service", error });
  }
};
