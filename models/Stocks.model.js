const { Schema, model } = require("mongoose");

const stockSchema = new Schema({

stock: {
    type: String,
      trim: true,
      required: true 
},
quantity:{
    type: String,
    required: true 
}    

},
{
  // this second object adds extra properties: `createdAt` and `updatedAt`
  timestamps: true,
}
);

const Stock = model("Stock", stockSchema);

module.exports = Stock;



Y5CrgLnIxiIJpDdmaG0LizqxaTDhJGGv