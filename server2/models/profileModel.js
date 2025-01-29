const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Link to User
    fullname: { type: String, default: "" },
    aboutme: { type: String, default: "Not Specified" },
    education: { type: String, default: "Not Specified" },
    work: { type: String, default: "Not Specified" },
    height: { type: String, default: "Not Specified" },
    hobbies: [{ type: String, default: ["Not Specified"] }],
    income: { type: String, default: "Not Specified" },
    livesin: { type: String, default: "Not Specified" },
    hometown: { type: String, default: "Not Specified" },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      default: "Not Specified",
    },
    familyDetails: { type: String, default: "Not Specified" },
    partnerExpectations: { type: String, default: "Not Specified" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
