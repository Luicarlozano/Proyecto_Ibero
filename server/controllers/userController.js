import {getAllUsers,getUsersByState,getUserByEmail,createNewUser,updateUserServ,deleteUser} from "../services/userService.js";

export async function getAll(req,res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ok:false,message:error.message});
    }
}

export async function getByState(req,res) {
    try {
        const {state} = req.params;
        const users = await getUsersByState(state);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ok:false,message:error.message});
    }
}

export async function createUser(req,res){
    try {
        if(!req.body){
            return res.status(400).json({ok:false,message:'No hay datos'});
        }
        const data = req.body;
        const {email} = data;
        const emailLower = email.toLowerCase();
        data.email = emailLower;

        const userExist = await getUserByEmail(emailLower);


        if(userExist){
            return res.status(400).json({ok:false,message:'Usuario ya existe'});
        }
        const user = await createNewUser(data);
        res.status(200).json({ok:true,message:'Usuario creado'})

    } catch (error) {
        res.status(500).json({ok:false,message:error.message});
    }
}

export async function updatedUser(req,res){
    try {
        const data = req.body;
        const {email} = data;
        const emailLower = email.toLowerCase();
        data.email = emailLower;

        const userExist = await getUserByEmail(emailLower);
        if(!userExist){
            return res.status(400).json({ok:false,message:'Usuario no existe'});
        }
        const message = await updateUserServ(userExist,data);
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ok:false,message:error.message});
    }
}

export async function deleteUserByEmail(req,res) {
 try {
    const email = req.body.email;
    const user = await getUserByEmail(email);
    if(!user){
        return res.status(400).json({ok:false,message:'Usuario no existe'});
    }
    const message = await deleteUser(user);
    res.status(200).json(message);
 } catch (error) {
    res.status(500).json({ok:false,message:error.message})
 }   
}
