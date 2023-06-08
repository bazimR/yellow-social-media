import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Modal, TextField, Button } from "@mui/material";
import imageVector from "../../assets/post6.png";
import PropTypes from "prop-types";
import { newPost } from "../../helper/helper";
import { useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
const PostModal = ({ modal, setModal }) => {
  const user = useSelector((state) => state.user.value);
  const formik = useFormik({
    initialValues: {
      caption: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("caption", values.caption);
      formData.append("userId", user.userId);

      newPost(formData);
    },
  });
  const [file, setFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setSelectedImg(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };
  const BoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: "auto",
    },
    height: "auto",
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
  };

  const handleClose = () => {
    setModal(false);
  };
  // const clearFile = () => {
  //   setFile(null);
  //   setSelectedImg(null)
  // };

  return (
    <Modal disableAutoFocus={true} open={modal} onClose={handleClose}>
      <Box sx={BoxStyle}>
        <Grid
          container
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Set the height of the container to fill the modal
          }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Typography
              sx={{
                fontSize: "2em",
                fontWeight: 600,
                color: "#004242",
                padding: 1,
                display: "flex",
                justifyContent: "center", // Center the text horizontally
                alignItems: "center",
              }}
            >
              create
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              {...formik.getFieldProps("caption")}
              id="caption"
              name="caption"
              size="small"
              variant="standard"
              sx={{ width: { lg: "20em", xs: "20em" }, padding: { xs: 1 } }}
              type="text"
              placeholder="caption..."
            />
          </Grid>
          <Grid
            item
            sx={{
              width: `20em`,
              height: `20em`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label htmlFor="post">
              <img
                style={{
                  width: `${file ? "20em" : "8em"}`,
                  height: `${file ? "20em" : "8em"}`,
                  cursor: "pointer",
                }}
                src={selectedImg ? selectedImg : imageVector}
                alt="image"
              />
            </label>
            {/* {file && (
                  <button onClick={clearFile} style={{ marginLeft: "1rem" }}>
                    Clear
                  </button>
                )} */}
            <input
              onChange={onUpload}
              type="file"
              name="post"
              id="post"
              hidden
            />
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={formik.handleSubmit}
              disabled={file ? false : true}
              type="button"
              sx={{ width: "23em", margin: 1 }}
              disableElevation
              variant="contained"
            >
              Share
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

PostModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default PostModal;
