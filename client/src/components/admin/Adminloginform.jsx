import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { adminloginValidation } from "../../helper/Validate";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../helper/helper";

const Loginform = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: adminloginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const adminLoginPromise = adminLogin ({
        email: values.email,
        password: values.password,
      });
      toast.promise(adminLoginPromise, {
        loading: "Checking.....",
        success: <b>Login successful</b>,
        error: <b>Password does not Match</b>,
      });
      adminLoginPromise.then((res) => {
        console.log(res);
        let ADMINTOKEN = res;
        localStorage.setItem("ADMINTOKEN", ADMINTOKEN);
        navigate("/admin");
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item mb={2} xs={12}>
        <TextField
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          {...formik.getFieldProps("email")}
          variant="filled"
          name="email"
          label="Email"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} mb={2}>
        <TextField
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
          }}
          {...formik.getFieldProps("password")}
          variant="filled"
          name="password"
          label="Password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
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
