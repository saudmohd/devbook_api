const mongoose = require('mongoose');
const bcrypt = require('becryptjs');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String, enum: ['user', 'admin'], default: 'user'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

UserSchema.pre('save', async (next) => {
    if(!this.idModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', UserSchema);