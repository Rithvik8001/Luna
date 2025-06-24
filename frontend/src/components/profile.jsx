import React from "react";

const Profile = () => {
  return (
    <>
      <div className="mt-18 w-full max-w-sm  mx-auto flex flex-col gap-4">
        <h1 className="text-4xl tracking-tighter text-center">
          Update your profile
        </h1>
        <form className="w-full flex flex-col gap-2 mt-2">
          <label htmlFor="firstName" className="text-sm text-gray-500">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="border border-gray-300 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500"
            placeholder="you can change your first name"
          />
          <label htmlFor="lastName" className="text-sm text-gray-500">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="border border-gray-300 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500"
            placeholder="you can change your last name"
          />
          <label htmlFor="about" className="text-sm text-gray-500">
            About
          </label>
          <textarea
            id="about"
            className="border border-gray-300 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500"
            placeholder="Enter your about yourself"
          ></textarea>
          <label htmlFor="age" className="text-sm text-gray-500">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="border border-gray-300 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500"
            placeholder="Enter your age"
          />
          <label htmlFor="gender" className="text-sm text-gray-500">
            Gender
          </label>
          <select
            id="gender"
            className="border border-gray-300 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500"
          >
            <option
              className="text-gray-200 text-sm"
              disabled
              selected
              placeholder="Select your gender"
            >
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Prefer not to say</option>
          </select>
          <label htmlFor="skills" className="text-sm text-gray-500">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            className="border border-gray-300 rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500"
            placeholder="Enter your skills"
          />
          <button className="bg-black mt-2 text-white rounded-md p-2">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
