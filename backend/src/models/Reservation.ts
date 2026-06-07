import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        guests: {
            type: Number,
            required: true,
        },

        diningArea: {
            type: String,
            required: true,
        },

        specialRequest: {
            type: String,
        },  

    },
    {
        timestamps: true,
    }

);

export default mongoose.model(
    "Reservation",
    reservationSchema
);