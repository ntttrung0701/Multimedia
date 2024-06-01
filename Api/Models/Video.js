const { duration } = require("@material-ui/core");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    idVideo:{
        type: ObjectId,
        req: 'video',
        required: true
    },
  title: { //tên của video trên google drive
    type: String,
    required: true
  },
  duration:{//thời lượng video trên google drive
    type: String,
    required: true
  },
  format:{//định dạng của video đó 
    type: String,
    required: true
  },
  path:{// đường dẫn đến google drive của video đó 
    type: String,
    required: true
  },
  size:{ // kích thước của video
    type: String,
    required: true
  }
});

const Video = mongoose.model('video', videoSchema);
