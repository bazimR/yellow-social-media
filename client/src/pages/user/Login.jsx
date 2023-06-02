import { Grid, Typography, Divider, Button } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loginform from "../../components/user/Loginform";
import Logo from "../../components/user/Logo";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle.esm";
const Login = () => {
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
          <Loginform />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            textAlign: "center",
            width: {
              xs: "80%",
              md: "30%",
              lg: "30%",
              xl: "20%",
            },
          }}
        >
          <Divider orientation="horizontal"><Typography variant="body1" color="primary.dark">OR</Typography></Divider>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            textAlign: "center",
            width: {
              xs: "80%",
              md: "30%",
              lg: "30%",
              xl: "20%",
            },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%" }}
            startIcon={<FcGoogle />}
          >
            <Typography
              sx={{ fontSize: "1em", fontWeight: 600 }}
              color="Highlight"
            >
              Sign in with Google account?
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="Highlight" p={1}>
            New to yellow?,{" "}
            <Link to={"/signup"} style={{ color: "Highlight" }}>
              {" "}
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <footer style={{ textAlign: "center" }}>
        <Typography variant="body2" color="#747474">
          © 2023 Yellow. All rights reserved
        </Typography>
      </footer>
    </>
  );
};

export default Login;
