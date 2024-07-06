import axios from "axios";
import { API_BASE_URL } from "../config.js";

const token = localStorage.getItem("Accesstoken");

const AddRootDirectory = async (directoryName) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/dir/0`,
      {
        directoryName: directoryName,
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
export default AddRootDirectory;
