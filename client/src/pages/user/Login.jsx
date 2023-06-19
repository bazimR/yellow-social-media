import { Grid, Typography, Divider, Button } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loginform from "../../components/user/Loginform";
import Logo from "../../components/user/Logo";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle.esm";
import { signInwithGoogle } from "../../firebase/config";
import { googleSignIn } from "../../helper/helper";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignin = () => {
    signInwithGoogle()
      .then((result) => {
        const username = result.user.displayName;
        const email = result.user.email;
        const profileUrl = result.user.photoURL;
        const googleSignInPromise = googleSignIn({
          username,
          email,
          profileUrl,
        });
        toast.promise(googleSignInPromise, {
          loading: "Checking.....",
          success: <b>Login successful</b>,
          error: <b>Password does not Match</b>,
        });
        googleSignInPromise.then((res) => {
          let token = res.token;
          localStorage.setItem("token", token);
          dispatch(setUser(res.user));
          navigate("/home");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ height: "100vh", padding: 0 }}>
      <Toaster position="top-center"></Toaster>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
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
          <Divider orientation="horizontal">
            <Typography variant="body1" color="primary.dark">
              OR
            </Typography>
          </Divider>
        </Grid>
        <Grid
          marginY={4}
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
            onClick={handleGoogleSignin}
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "ButtonHighlight",
              },
            }}
            startIcon={<FcGoogle />}
          >
            <Typography sx={{ fontSize: "1em", fontWeight: 600 }}>
              Sign in with Google account?
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ textAlign: "center" }}>
          <Typography variant="body1" color="InfoText" p={1}>
            New to yellow?,{" "}
            <Link to={"/signup"} style={{ color: "HighlightText" }}>
              Sign up
            </Link>
          </Typography>
          <footer style={{ textAlign: "center" }}>
            <Typography variant="body2" color="ActiveCaption">
              © 2023 Yellow. All rights reserved
            </Typography>
          </footer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
