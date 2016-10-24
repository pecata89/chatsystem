var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
    created: {
        type:       Date,
        default:    Date.now
    },
    message: {
        type:       String,
        default:    "",
        trim:       true,
        required:   "Please write down your message"
    },
    userId: {
        type:       Schema.ObjectId,
        ref:        "User"
    },
    roomId: {
        type:       Schema.ObjectId,
        ref:        "Room"
    }
});

mongoose.model("Message", MessageSchema);