import axios from "axios";

const getMessagesById = async (userId) => {
  try {
    const response = await axios.get("/api/messages/" + userId);
    const messages = response.data.map((message) => ({
      ...message,
      moi: message.sender === userId ? false : true,
    }));
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export default getMessagesById;
