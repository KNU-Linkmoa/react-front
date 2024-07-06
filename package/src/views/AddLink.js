import axios from "axios";
import { API_BASE_URL } from "../config.js";

const token = localStorage.getItem("Accesstoken");

export const AddLink = async (LinkName, LinkUrl, index) => {
  console.log("index", index);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/sites/${index}`,
      {
        name: LinkName,
        url: LinkUrl,
      },
      {
        headers: {
          Accesstoken: token,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      console.log("보냈음 ");
    }
  } catch (error) {
    console.error("Error adding directory:", error);
  }
};
