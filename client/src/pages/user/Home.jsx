import { Grid } from "@mui/material";
import Story from "../../components/user/Story";
import Post from "../../components/user/Post";
import MobileHome from "../../components/user/MobileHome";

const Home = () => {
  return (
    <>
    <Grid container sx={{ display: { xs: "none", lg: "flex" } }}>
      <Grid xs={8} container direction={"column"} sx={{display:"flex",justifyContent:'flex-start'}}>
        <Story />
        <Post/>
      </Grid>
      <Grid xs={4} sx={{ height: "100vh" }}>
        left
      </Grid>
    </Grid>
    <MobileHome/>
    </>
  );
};

export default Home;
