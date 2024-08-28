const mongoose = require("mongoose");

const ItemImage = new mongoose.Schema({
//   itemFor: {
//     type: mongoose.Types.ObjectId,
//     // required: true,
//     ref: "Items",
//   },
  itemOf: {
    type: String,
    required: true,
    ref: "Items",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const itemImage = mongoose.model("itemImage", ItemImage);

module.exports = { itemImage };
