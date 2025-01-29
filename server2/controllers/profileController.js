const User = require("../models/User");
const Profile = require("../models/Profile");

// Update user profile details
const updateProfileController = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from JWT token middleware

    const {
      fullname,
      aboutme,
      education,
      work,
      height,
      hobbies,
      income,
      livesin,
      hometown,
      maritalStatus,
      familyDetails,
      partnerExpectations,
    } = req.body;

    // ✅ Validate user existence
    const user = await User.findById(userId).populate("profile");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // ✅ Secure update: Prevent overwriting with empty strings
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId },
      {
        fullname: fullname !== undefined ? fullname : profile.fullname,
        aboutme: aboutme !== undefined ? aboutme : profile.aboutme,
        education: education !== undefined ? education : profile.education,
        work: work !== undefined ? work : profile.work,
        height: height !== undefined ? height : profile.height,
        hobbies: hobbies !== undefined ? hobbies : profile.hobbies,
        income: income !== undefined ? income : profile.income,
        livesin: livesin !== undefined ? livesin : profile.livesin,
        hometown: hometown !== undefined ? hometown : profile.hometown,
        maritalStatus:
          maritalStatus !== undefined ? maritalStatus : profile.maritalStatus,
        familyDetails:
          familyDetails !== undefined ? familyDetails : profile.familyDetails,
        partnerExpectations:
          partnerExpectations !== undefined
            ? partnerExpectations
            : profile.partnerExpectations,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

module.exports = {
  requireSingIn,
  updateProfileController,
};
