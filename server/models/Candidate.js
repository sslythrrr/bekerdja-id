import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["new", "contacted", "interested", "rejected"],
            default: "new",
        },
    }
);

export default mongoose.model("Candidate", CandidateSchema);