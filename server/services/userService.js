import User from '../models/User.js';

async function getAllUsers(){
    try {
        const users = await User.find({deleteAt: null});
        return users;
    } catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
    }
}

async function getUserByEmail(email){
    try {
        const user = await User.findOne({email: email})
        return user;
    } catch (error) {
        throw new Error(`Error getting user by email: ${error.message}`);
    }
}

async function createNewUser(userData) {
    try{
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
}

export {getAllUsers, getUserByEmail, createNewUser};