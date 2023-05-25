import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { loginValidation } from "../../helper/Validate";
const Loginform = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
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
