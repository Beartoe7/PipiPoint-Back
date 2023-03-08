const {Schema, model} = require("mongoose");

const toiletSchema = new Schema({
    title: String,
    description: String,
    // rating: {
    //       type: Number,
    //       required: true,
    //       min: 1,
    //       max: 10
    //     },
    // imageUrl: String,
    // Location: String
            
        
    
      
});

module.exports = model("Toilet", toiletSchema);