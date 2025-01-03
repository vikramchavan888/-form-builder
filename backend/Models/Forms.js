const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new mongoose.Schema({
  identifier:{type: String, required: true},
  type: { type: String, required: true }, 
  content: { type: String},
});


const FormSchema = new Schema(
  {
    name: { type: String, required: true },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
    formdata: [DataSchema],
    view: { type: Number, default: 0 },
    started: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Form", FormSchema);
