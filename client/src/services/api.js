import { serverUrl } from "../App";
import axios from "axios";
import { setUserData, setAuthLoading  } from "../redux/userSlice.js";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(
      serverUrl + "/api/user/currentuser",
      {
        withCredentials: true,
      }
    );

    dispatch(setUserData(result.data));
  } catch (error) {
    console.log(error);
    dispatch(setUserData(null));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      { withCredentials: true },
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      },
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "NotesGenixAI.pdf";
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
      throw new error("PDF download failed");
  }
};
