import User from '../models/User.js';

async function getAllUsers(){
    try {
        const users = await User.find({deleteAt: null});
        return users;
    } catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
    }
}

async function getUsersByState(state) {
    try {
        const users = await User.find({state:state});
        return users;
    } catch (error) {
        throw new Error(`Error getting users by state: ${error.message}`)
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

async function updateUserServ(user,userData) {
    try {
        const {
            firstName,
            lastName,
            idNumber,
            email,
            role,
            password,
            state
        } = userData;
        
        user.firstName = firstName;
        user.lastName = lastName;
        user.idNumber = idNumber;
        user.email = email;
        user.role = role;
        user.password = password;
        user.state = state;
        await user.save();
        return {message:`User updated`,ok:true};
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

async function deleteUser(user) {
    try {
        user.deleteAt = new Date();
        user.state = "Eliminado";
        await user.save();
        return {message:`User Deleted`,ok:true};
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`)
    }
}


export {getAllUsers, getUserByEmail, getUsersByState, createNewUser, updateUserServ,deleteUser};