const mongoose = require("../config/mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    idImage:{
        type: ObjectId,
        req: 'Image',
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
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', ImageSchema);
