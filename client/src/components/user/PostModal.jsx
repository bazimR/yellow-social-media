import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Modal, TextField } from "@mui/material";
import UseAnimations from "react-useanimations";
import LoadingButton from "@mui/lab/LoadingButton";
import imageVector from "../../assets/post6.png";
import PropTypes from "prop-types";
import { newPost } from "../../helper/helper";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import loading from "react-useanimations/lib/loading";
const PostModal = ({ modal, setModal }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const user = useSelector((state) => state.user.value);
  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", caption);
  formData.append("userId", user._id);
  formData.append("username", user.username);
  const [selectedImg, setSelectedImg] = useState(null);
  // mutation
  const createPostMn = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      setFile(null);
      setSelectedImg(null);
      setCaption("");
      setModal(!modal);
    },
  });
  // handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMn.mutate(formData);
  };
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
      lg: "30%",
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
                fontSize: "1.5em",
                fontWeight: 400,
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
              onChange={(e) => {
                setCaption(e.target.value);
              }}
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
              borderBottom: 1,
              borderBottomColor: "#c9c9c9",
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
            <LoadingButton
              onClick={handleSubmit}
              disabled={file || createPostMn.isLoading ? false : true}
              type="button"
              sx={{ margin: 1, fontSize: 20 }}
              variant="text"
              loadingIndicator={
                <UseAnimations
                  animation={loading}
                  strokeColor="#5658d4"
                  size={40}
                />
              }
              loading={createPostMn.isLoading}
            >
              Share
            </LoadingButton>
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
