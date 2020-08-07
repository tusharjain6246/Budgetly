const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
  username:{
    type: String,
    trim: true,
    required: true,
    default: ''
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: '',
    validate:{
      validator: validator.isEmail
    }
  },
  i:{
    type: Number,
    default:0
  },
  password:{
    type: String,
    required: true,
    trim: true,
    defualt:'',
    minLength: 5
  },
  totalBudget:{
    type:String,
    default:"0",
    trim:true
  },
  totalIncome:{
    type:String,
    default:"0",
    trim:true
  },
  totalExpense:{
    type:String,
    default:"0",
    trim:true
  },
  incomeItems:[{
    type:{
      type: String,
      // required: true,
    },
    id:{
      type: Number
    },
    description:{
      type: String,
      // required: true,
      trim: true
    },
    value:{
      type: Number,
      // required: true,
    }
  }],
  expenseItems:[{
    type:{
      type: String,
      // required: true,
    },
    id:{
      type: Number
    },

    description:{
      type: String,
      // required: true,
      trim: true
    },
    value:{
      type: Number,
      // required: true,
    }
  }]
});

// userSchema.methods.generate = ()=>{
//   var user = this;
//
// }

var User =  mongoose.model('User', userSchema);
module.exports = {User};
