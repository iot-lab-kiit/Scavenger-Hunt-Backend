import UserModel from "../model/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "New user created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, isLead, team } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        isLead,
        team,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
