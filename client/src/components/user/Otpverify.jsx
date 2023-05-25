import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { otpValidation } from "../../helper/Validate";
import { useState } from "react";

const Otpverify = () => {
  const [values, setValues] = useState("");

  const handleNumber = (e) => {
    const { value } = e.target;
    setValues(value.slice(0, 6));
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: otpValidation,
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
          value={values}
          onChange={handleNumber}
          style={{
        
           
          }}
          {...formik.getFieldProps("otp")}
          variant="standard"
          name="otp"
          label="otp"
          type="text"
          helperText="Enter the OTP recieved via email."
          inputProps={{
            maxLength: 6,
            style: { fontSize: "2rem", textAlign: "center",letterSpacing:'10px' },
          }}
          InputLabelProps={{ style: { fontSize: "24px" } }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} mt={5}>
        <Button
          variant="contained"
          sx={{ bgcolor: "primary.main", fontSize: 20, fontWeight: "600" }}
          disableElevation
          size="large"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </Grid>
      {/* google login options */}
    </form>
  );
};

export default Otpverify;
