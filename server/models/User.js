import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    idNumber:{
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['administrador','empleado'],
        default: 'empleado',
    },
    password:{
        type: String,
        required: true,
    },
    deleteAt:{
        type: Date,
        default: null,
    }
},{
    timestamps:true,
});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

const User = model('User', userSchema);

export default User;

