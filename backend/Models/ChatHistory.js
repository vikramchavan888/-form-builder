
const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
// Define the schema for chat history
const chatHistorySchema = new mongoose.Schema({
  formId: { type: String, required: true }, // The form ID
  history: [{ type: Schema.Types.Mixed }],
  started: { type: Number, default: 0 },
});
module.exports = mongoose.model("ChatHistory", chatHistorySchema);
// Create the model using the schema
