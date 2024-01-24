import axios from "axios";

const getAllUsers = async () => {
  try {
    const users = {};
    await axios.get("/api/users/").then((res) => {
      res.data.users.map((user) => (users[user._id] = user));
    });
    return users;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export default getAllUsers;
