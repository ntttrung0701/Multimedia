const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soundSchema = new Schema({
    idSound:{
        type: ObjectId,
        req: 'sound',
        required: true
    },
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  format:{
    type: String,
    required: true
  },
  path:{
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
  idVideo:{
    type: String,
    required: true,
    req:'video'
  }
});

const Sound = mongoose.model('sound', soundSchema);
