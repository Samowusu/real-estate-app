import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
