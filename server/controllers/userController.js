import {getAllUsers,getUserByEmail,createNewUser} from "../services/userService.js";

export async function getAll(req,res) {
    try {
        const users = await getAllUsers();
        res.status(200).json({ok:true,users});
    } catch (error) {
        res.status(500).json({ok:false,message:error.message});
    }
}

export async function createUser(req,res){
    try {
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

