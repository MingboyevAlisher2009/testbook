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

const UserModel = model("Users", user);

export default UserModel;
