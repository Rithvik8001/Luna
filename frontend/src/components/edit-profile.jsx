import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../constants/url";
import { addUser } from "../utils/userSlice";
import { toast } from "sonner";

const EditProfile = ({ userData, onProfileUpdate }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");

  // Initialize form with current user data
  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setAbout(userData.about || "");
      setAge(userData.age || "");
      setGender(userData.gender || "");
      setSkills(userData.skills ? userData.skills.join(", ") : "");
    }
  }, [userData]);

  const handleUpdateProfile = async () => {
    try {
      // Build update object with only changed fields
      const updateData = {};

      // Only include fields that have actually changed from the original data
      if (firstName !== (userData?.firstName || "")) {
        updateData.firstName = firstName;
      }

      if (lastName !== (userData?.lastName || "")) {
        updateData.lastName = lastName;
      }

      if (about !== (userData?.about || "")) {
        updateData.about = about;
      }

      if (age !== (userData?.age || "")) {
        updateData.age = parseInt(age);
      }

      if (gender !== (userData?.gender || "")) {
        updateData.gender = gender;
      }

      // Handle skills comparison
      const currentSkills = userData?.skills ? userData.skills.join(", ") : "";
      if (skills !== currentSkills) {
        const skillsArray = skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
        updateData.skills = skillsArray;
      }

      // Only make API call if there are changes
      if (Object.keys(updateData).length === 0) {
        toast.info("No changes to update");
        return;
      }

      console.log("Sending update data:", updateData); // Debug log

      await axios.patch(`${BASE_API_URL}/profile`, updateData, {
        withCredentials: true,
      });

      // Update Redux state with new data
      const updatedUserData = {
        ...userData,
        ...updateData,
      };

      dispatch(addUser(updatedUserData));

      // Call parent callback to trigger re-render
      if (onProfileUpdate) {
        onProfileUpdate(updatedUserData);
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Profile
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              About
            </label>
            <textarea
              id="about"
              rows="3"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Tell us about yourself"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="JavaScript, React, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
          </div>

          <button
            type="button"
            onClick={handleUpdateProfile}
            className="w-full bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
