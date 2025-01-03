const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new mongoose.Schema({
  identifier:{type: String, required: true},
  type: { type: String, required: true }, 
  content: { type: String},
});


const OUTFormSchema = new Schema(
  {
    name: { type: String, required: true },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    formdata: [DataSchema],
    view: { type: Number, default: 0 },
    started: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Outsideform", OUTFormSchema);
