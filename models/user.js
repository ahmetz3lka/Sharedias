import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username is invalid, ti shoudl contain 8-20 alphanumeric letters and be unique",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema); // this is for regular backend server --- if "User" model exists we gonna assign it as User else we create new model. If we don't do that the model will be created every call.

export default User;

// The "models" object is provided by the mongoose library and stores all the registered models
// If a model named "User" already exists in the "models" object it assigns that existing model to the "User" variable
// this prevents redifining the model and ensures that the existing model is reused
// if model named "User" doesn't exist in "models" model function in mongoose creates new model called "User" and assigns it to the User variable
