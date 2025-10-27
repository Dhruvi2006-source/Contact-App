const mongoose = require("mongoose")

const contact_Schema = mongoose.Schema({
    "first_name" :
    {
        type : String
    },

    "last_name" :
    {
        type : String
    },

    "city" :
    {
        type : String
    },

    "phone" :
    {
        type : String
    },

    "address" :
    {
        type : String
    }
})
const contact = mongoose.model("Contact" , contact_Schema)
module.exports = contact; 