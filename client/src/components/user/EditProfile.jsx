import { Box, Modal, Grid, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/profile.png";
import { useFormik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { profileValidation } from "../../helper/Validate";
import { setProfileModal } from "../../redux/editProfileSlice";
import { editProfile } from "../../helper/helper";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/userSlice";
const EditProfile = () => {
  const user = useSelector((state) => state.user.value);
  const modal = useSelector((state) => state.editprofile.profileModal);
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState(null);
  const [file, setFile] = useState(null);

  const BoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
    margin: 0,
  };
  const formik = useFormik({
    initialValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      biography: user.biography,
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("biography", values.biography);
      if (selectedImg) {
        console.log(selectedImg);
        formData.append("image", file);
      }
      const editProfilePromise = editProfile(formData);
      toast.promise(editProfilePromise, {
        loading: "Checking.....",
        success: <b>profile edited</b>,
        error: <b>failed to edit</b>,
      });
      editProfilePromise.then((res) => {
        dispatch(setUser(res.user));
        setSelectedImg(null);
        dispatch(setProfileModal(false));
      });
      resetForm();
    },
  });
  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setSelectedImg(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };
  const handleClose = () => {
    setFile(null)
    setSelectedImg(null);
    dispatch(setProfileModal(false));
  };
  return (
    <Modal
      sx={{ display: { xs: "none", lg: "flex" } }}
      disableAutoFocus={true}
      open={modal}
      onClose={handleClose}
    >
      <Box sx={BoxStyle}>
        <Grid
          container
          direction={"column"}
          sx={{
            height: 640,
            width: 500,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Grid item mt={4} sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "1.775em",
                fontWeight: 540,
                color: "primary.dark",
              }}
            >
              Edit profile
            </Typography>
            <Typography
              sx={{
                fontSize: "0.675em",
                fontWeight: 400,
                color: "primary.dark",
              }}
            >
              edit and save profile
            </Typography>
          </Grid>
          <Grid item my={2}>
            <Grid item>
              <label htmlFor="post">
                <img
                  style={{
                    width: "10em",
                    height: "10em",
                    borderRadius: "100vh",
                    cursor: "pointer",
                  }}
                  src={selectedImg || user.profileUrl || profile}
                  alt="image"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                name="post"
                id="post"
                hidden
              />
            </Grid>
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              {...formik.getFieldProps("firstname")}
              sx={{ width: 200, marginRight: 3.4 }}
              id="firstname"
              label="firstname"
              variant="standard"
              value={formik.values.firstname}
            />
            <TextField
              {...formik.getFieldProps("lastname")}
              sx={{ width: 200 }}
              id="lastname"
              label="lastname"
              variant="standard"
              value={formik.values.lastname}
            />
          </Grid>
          <Grid item marginBottom={1}>
            <TextField
              {...formik.getFieldProps("biography")}
              id="biography"
              label="bio"
              sx={{ width: 430 }}
              multiline
              variant="standard"
              rows={4}
              value={formik.values.biography}
            />
          </Grid>
          <Grid item>
            <LoadingButton
              onClick={formik.handleSubmit}
              // disabled={file || createPostMn.isLoading ? false : true}
              type="button"
              sx={{ margin: 1, fontSize: 25, width: 440, color: "white" }}
              disableTouchRipple
              variant="contained"
              loadingIndicator={
                <UseAnimations
                  animation={loading}
                  strokeColor="#4aa0e7"
                  size={55}
                />
              }
              loading={formik.isSubmitting}
            >
              edit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditProfile;
