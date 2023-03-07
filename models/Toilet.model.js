const {Schema, model} = require("mongoose");

const toiletSchema = new Schema({
    title: String,
    description: String,
    // tasks: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Task"
    // }]
});

module.exports = model("Toilet", toiletSchema);