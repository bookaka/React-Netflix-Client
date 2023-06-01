import mongoose from "mongoose";

const UserSchame = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        likedMovies: Array,
    }
)
const User = mongoose.model('User',UserSchame);
export default User;
