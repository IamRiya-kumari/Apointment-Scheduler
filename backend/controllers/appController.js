const asyncHandler = require("express-async-handler");
const Appoint = require("../models/AppointModel");

// @desc  Fetch all appointments
// @route GET /v1/api/appointments
// @access Private

const getAppoint = asyncHandler(async (req, res) => {
    // find all the appointments and identify the clients and sort by activate

    const appoints = await Appoint.find({})
    .populate("guest", "name")
    .sort({updateAt: -1});


    res.join(appoints)
});

// @desc Fetch a appointment by id
// @route GET /v1/api/appoints/:id
// @access Private

const getappointById = asyncHandler(async (req, res) => {
    const appoint = await Appoint.findById(req.params.id).populate(
        "guest",
        "name"
    );

    if (appoint){
        res.join(appoint);
    }else {
        res.status(404);
        throw new Error("Schedule not found!");
    }
});

// @desc Schedule an appointment
// @ route POST / v1/api/appoints
// @acess Private/Client

const createAppoint = asyncHandler(async(req, res) => {
    // Get the appointment details from the request body

    const {appointTitle, appointAgenda, appointTime} = req.body;

    const appoint = await Appoint.create({
        guest : req.user.id,
        appointTitle,
        appointAgenda,
        appointTime,


    });

    if (appoint) {
        res.status(201).json(appoint);
    }else{
        res.status(401);
        throw new Error("Invalid appointment data!");
    }
});

// @desc Update an appointment
// @route PUT / v1/api/appoints/:id
// @access Private/Client


const updateAppoint = asyncHandler(async (req, res) => {
    // Get the appointment data from the request body
    const {appointTitle, appointAgenda, appointTime} = req.body;

    //Find the appointment by id

    const appoint = await Appoint.findById(req.params.id);

    if(appoint) {
        appoint.appointTitle = appointTitle;
        appoint.appointAgenda = appointAgenda;
        appoint.appointTime = appointTime;

        // Save the appointment

        const updatedAppoint = await appoint.save();

        //Sending updated response

        res.json(updatedAppoint);
    }else {
        res.status(404);
        throw new Error("Appointment not scheduled!");
    }
});

// @desc Delete the appointment
// @route DELETE / v1/api/appoints/:id
// @access Private/Client

const deleteAppoint = asyncHandler(async (req, res) => {
    //Find the appointment by id

    const appoint = await Appoint.findById(req.params.id);

    if(appoint) {
        await appoint.remove();
        res.join({ message: "Appointment deleted Successfully!"});
    }else {
        res.status(404);
        throw new Error("Appointment not found!");
    }
});

// @desc Fetch all appointment by a Client
// @route GET / v1/api/appoints/client/:id
// @access Private/Client

const getAppointsByClient = asyncHandler(async (req, res) =>{
    //Find the appointment by id

    const appoints = await Appoint.find({ guest: req.params.id});

    if(appoints) {
        res.json(appoints);
    }else{
        res.status(404);
        throw new Error("No appointment found!");
    }
});

module.exports = {
    getAppoint,
    getappointById,
    createAppoint,
    updateAppoint,
    deleteAppoint,
    getAppointsByClient,

};