var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
    created: {
        type:       Date,
        default:    Date.now
    },
    roomName: {
        type:       String,
        default:    "",
        trim:       true,
        required:   "Room name is required"
    },
    creator: {
        type:       Schema.ObjectId,
        ref:        "User"
    }
});

mongoose.model("Room", RoomSchema);