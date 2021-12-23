///////////////////////////////////////////////////////////////////////////////////MODULES
const mongoose = require('mongoose');
//////////////////////////////////////////////////////////////////////////////////////////

// Schema
const thingSchema = new mongoose.Schema(
  {
    thingName: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Functions
thingSchema.methods.toJSON = function () {
  const thing = this;
  const thingObject = thing.toObject();

  delete thingObject.__v;

  return thingObject;
};

// Model
const Thing = mongoose.model('Thing', thingSchema);

module.exports = Thing;
