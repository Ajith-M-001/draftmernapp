import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    username: {
      type: String,
      minlength: [3, "Username must be 3 letters long"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Author", "Subscriber", "Guest"],
      default: "Subscriber",
    },
    bio: { type: String },
    profilePicture: { type: String }, // URL of the profile picture
    isVerified: { type: Boolean, default: false },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followingCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    drafts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    publishedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followingTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    googleId: { type: String }, // For OAuth with Google
    token: {
      code: { type: String },
      type: { type: String, enum: ["email", "password"] },
      expiresAt: { type: Date },
      used: { type: Boolean, default: false }, // Mark token as used or unused
      createdAt: { type: Date, default: Date.now },
    },
    social_links: {
      youtube: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      facebook: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      website: {
        type: String,
        default: "",
      },
    },
    account_info: {
      total_posts: { type: Number, default: 0 },
      total_reads: { type: Number, default: 0 },
      total_likes: { type: Number, default: 0 },
      total_comments: { type: Number, default: 0 },
      post_engagement_rate: { type: Number, default: 0 },
      views_this_month: { type: Number, default: 0 },
      last_post_date: { type: Date },
    },
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
