import { Grid, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { signUpValidation } from "../../helper/Validate";
import { userSignup } from "../../helper/helper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Signupform = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirm: "",
    },
    validate: signUpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const userSignupPromise = userSignup(values);
      toast.promise(userSignupPromise, {
        loading: "Creating...!",
        success: <b>Signup successful...!</b>,
        error: <b> Could not sign up</b>,
      });
      userSignupPromise.then(() => {
        navigate('/')
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item mb={2} xs={12}>
        <TextField
          {...formik.getFieldProps("email")}
          style={{
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          variant="filled"
          name="email"
          label="Email"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          {...formik.getFieldProps("username")}
          style={{
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          variant="filled"
          name="username"
          label="Username"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          {...formik.getFieldProps("password")}
          style={{
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          variant="filled"
          name="password"
          label="Password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          {...formik.getFieldProps("confirm")}
          style={{
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          variant="filled"
          name="confirm"
          label="Confirm Password"
          fullWidth
        />
      </Grid>
      <Grid item mb={2} xs={12}>
        <Typography variant="body2" color="primary.dark" py={3}>
          By signing up, you agree to our Terms , Privacy Policy and Cookies
          Policy.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{ bgcolor: "primary.main", fontSize: 20, fontWeight: "600" ,color:'white'}}
          disableElevation
          size="large"
          fullWidth
          type="submit"
        >
          Signup
        </Button>
      </Grid>
    </form>
  );
};

export default Signupform;
