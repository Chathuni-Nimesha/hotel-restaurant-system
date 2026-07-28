import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",

        },

        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Menu", menuSchema);
