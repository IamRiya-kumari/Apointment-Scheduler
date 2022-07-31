const mongoose = require("mongoose");

const AppointSchema = new mongoose.Schema(
    {
        guest:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        appointTitle: {
            type: String,
            required: true,
        },
        appointAgenda: {
            type: String,
            required: true,
        },
        appointTime: {
            type: String,
            required: true,
        },


    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Appoint", AppointSchema);