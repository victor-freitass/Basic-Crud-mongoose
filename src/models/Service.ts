import { Schema, model } from "mongoose";

export const ServiceSchema = new Schema({  //type = Document
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true //createdAt / updatedAt
});

ServiceSchema.post('findOneAndUpdate', function () {
    console.log('New Update');
})

export default model('Service', ServiceSchema)

