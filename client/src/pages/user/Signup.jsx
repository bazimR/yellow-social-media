import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signupform from "../../components/user/Signupform";
import Logo from "../../components/user/Logo";
const Signup = () => {
  return (
    <>
      <Grid
        container
        marginBottom={2}
        marginTop={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Toaster position="top-center"></Toaster>
        <Grid item xs={12}>
          <Logo />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            width: {
              xs: "80%",
              md: "30%",
              lg: "30%",
              xl: "20%",
            },
          }}
        >
          <Signupform />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Link to={"/"}>
            <Typography
              sx={{ fontSize: "1em" }}
              color="Highlight"
              p={3}
              align="right"
            >
              Have an account?
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <footer style={{ textAlign: "center", marginBottom: "4em" }}>
        <Typography variant="body2" color="#747474">
          © 2023 Yellow. All rights reserved
        </Typography>
      </footer>
    </>
  );
};

export default Signup;
