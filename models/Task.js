const mongoose = require('mongoose');

//a structure for documents in the db
const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'must provide name'], //2p is custom msg
        trim:true, //cut out empty space
        maxlength:[20, `name can't be more than 20 chars`],
    },
    completed:{
        type:Boolean,
        default:false,//don't need required if this default
    },
});
//any request sent through this route will be limited
//to the format of this schema, other values ignored

module.exports = mongoose.model('Task', TaskSchema);