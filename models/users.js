const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: 50,
      // https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
      // match: /.+\@.+\..+/,
    },
    thoughts: [
     { type: Schema.Types.ObjectId,
      ref: 'thought'}
    ],
    friends: [
      {type: Schema.Types.ObjectId,
       ref: 'user'}
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    //activity 21
  }
);
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;
