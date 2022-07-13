const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHashed: String,
    // blogs:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Blog'
    // }]
});


const User = mongoose.model('User',userSchema);

userSchema.set('toJSON',{
    transform: (document,returnObj)=>{
        returnObj.id = returnObj._id.toString(),
        delete returnObj._id;
        delete returnObj.__v;
        delete returnObj.passwordHashed;
    }
});

module.exports = User;
