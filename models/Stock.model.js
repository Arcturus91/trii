const { Schema, model } = require("mongoose");

const stockSchema = new Schema({

stock: {
    type: String,
      trim: true,
      required: true 
},
quantity:{
    type: Number,
    required: true 
},
price:{
  type:Number,
  required:true
}    

},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
}
);

const Stock = model("Stock", stockSchema);

module.exports = Stock;



