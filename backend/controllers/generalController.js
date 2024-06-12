import User from '../models/UserSchema.js';

export const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id)

        res.status(200).json({
            success: true,
            message: "User data",
            data: user
        })
    }catch(error){
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}