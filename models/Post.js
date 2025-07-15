import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  content: {
    type: String,
    required: [true, "Please provide content"],
    maxlength: [5000, "Content cannot exceed 5000 characters"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, 
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for like count
PostSchema.virtual("likeCount").get(function() {
  return this.likes.length;
});

// Text search index
PostSchema.index({ title: "text", content: "text" });

// Update timestamp on save
PostSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

export default model("Post", PostSchema);