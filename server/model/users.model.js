import { model, Schema } from "mongoose";

const user = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSchema = model("Users", user);

export default User;
