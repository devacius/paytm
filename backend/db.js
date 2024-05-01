const mongoose = require('mongoose');



async function main() {
  await mongoose.connect('mongodb+srv://devacius:klu5A6FzRBiRWZyq@cluster0.b8dekyo.mongodb.net/');

}
main().catch(err => console.log(err));
const paytmSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
   

  });
  const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //! reference to user model
        ref:'User',
        required:true
    },

    balance:{
        type:Number,
        required:true
    }
  });
  const Account=mongoose.model('Account',accountSchema);



const User = mongoose.model('User', paytmSchema );

module.exports={
    User,
    Account
};

