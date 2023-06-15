import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { loginValidation } from "../../helper/Validate";
import { userLogin } from "../../helper/helper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
const Loginform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const userLoginPromise = userLogin({
        email: values.email,
        password: values.password,
      });
      toast.promise(userLoginPromise, {
        loading: "Checking.....",
        success: <b>Login successful</b>,
        error: <b>Password does not Match</b>,
      });
      userLoginPromise.then((res) => {
        let token = res.token;
        localStorage.setItem("token", token);
        dispatch(setUser(res.user));
        navigate("/home");
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item marginY={4} xs={12}>
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
      <Grid item xs={12} marginY={4}>
        <TextField
          style={{
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          {...formik.getFieldProps("password")}
          variant="filled"
          name="password"
          label="Password"
          type="password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} marginY={4}>
        <Button
          variant="contained"
          sx={{ bgcolor: "primary.main", fontSize: 20, fontWeight: "600" }}
          disableElevation
          size="large"
          fullWidth
          type="submit"
        >
          Login
        </Button>
      </Grid>
      {/* google login options */}
    </form>
  );
};

export default Loginform;
