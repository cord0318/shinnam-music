const mongoose = require("mongoose");

// mongoose를 이용한 Schema 생성
var UserSchema = mongoose.Schema(
  {
    song: { // song
      type: String,
      maxLength: 40,
      requie: true,
    },
    name: { // updater name
      type: String,
      maxLength: 40,
      requie: true,
    },
    url: {
      type: String,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Create new user document
UserSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload);
  // return Promise
  return user.save();
};

// Find All
UserSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by Userid
UserSchema.statics.findOneByUserid = function (Userid) {
  return this.findOne({ Userid });
};

// Update by Userid
UserSchema.statics.updateByUserid = function (Userid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ Userid }, payload, { new: true });
};

// Delete by Userid
UserSchema.statics.deleteByUserid = function (Userid) {
  return this.remove({ Userid });
};

// Create Model & Export
module.exports = mongoose.model("Song", UserSchema);