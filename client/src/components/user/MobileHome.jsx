import { Grid } from "@mui/material";
import Story from "./Story";
import Post from "./Post";

const MobileHome = () => {
  return (
    <Grid container direction={"column"} sx={{ display: { xs: "flex", lg: "none" ,height:'100vh'} }}>
      <Grid item xs={2} md={2} container direction={"column"} sx={{display:"flex",justifyContent:'flex-start'}}>
       <Story/>
      </Grid>
      <Grid item xs={10} md={10} style={{ backgroundColor: "lightgray" }}>
        <Post/>
      </Grid>
    </Grid>
  );
};

export default MobileHome;
