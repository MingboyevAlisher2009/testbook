import { Typography } from "@mui/material";
import axios from "axios";

const Home = () => {
  axios
    .get("https://openlibrary.org/search.json?isbn=9781118464465")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });

  return <Typography color="white">Home</Typography>;
};

export default Home;
