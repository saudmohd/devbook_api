import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import validator from "validator"; // Changed to default import

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
    maxlength: [30, "Username cannot exceed 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"], // Access isEmail via validator
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  passwordChangedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Password hashing middleware
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    this.password = await hash(this.password, 12);
    this.passwordChangedAt = Date.now() - 1000;
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await compare(enteredPassword, this.password);
};

// Check if password was changed after token was issued
UserSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export default model("User", UserSchema);