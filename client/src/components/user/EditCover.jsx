import { Box, Modal, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../assets/image.png";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import { setCoverModal } from "../../redux/editProfileSlice";
import { setUser } from "../../redux/userSlice";
import { useMutation } from "@tanstack/react-query";
import { editCover } from "../../helper/helper";
import { toast } from "react-hot-toast";

const EditCover = () => {
  const user = useSelector((state) => state.user.value);
  const modal = useSelector((state) => state.editprofile.coverModal);
  const dispatch = useDispatch();
  const [selectedImg, setSelectedImg] = useState(null);
  const [file, setFile] = useState(null);
  const coverMn = useMutation({
    mutationFn: editCover,
    onSuccess: (data) => {
      toast.success("cover image edited");
      dispatch(setUser(data));
      setSelectedImg(null);
      setFile(null);
      dispatch(setCoverModal(false));
    },
  });
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
  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setSelectedImg(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };
  const handleClose = () => {
    setFile(null);
    setSelectedImg(null);
    dispatch(setCoverModal(false));
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", user._id);
    coverMn.mutate(formData);
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
            height: 610,
            width: 660,
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
              Edit cover
            </Typography>
            <Typography
              sx={{
                fontSize: "0.675em",
                fontWeight: 400,
                color: "primary.dark",
              }}
            >
              edit and save cover image
            </Typography>
          </Grid>
          <Grid item my={2}>
            <Grid item>
              <label htmlFor="post">
                <img
                  style={{
                    width: `${
                      selectedImg || user.coverImageUrl ? "39em" : "20em"
                    }`,
                    height: 360,
                    borderRadius: "15px",
                    cursor: "pointer",
                  }}
                  src={selectedImg || user.coverImageUrl || profile}
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
          <Grid item>
            <LoadingButton
              disabled={file || coverMn.isLoading ? false : true}
              onClick={handleSubmit}
              type="button"
              sx={{ margin: 1, fontSize: 25, width: 400 }}
              disableTouchRipple
              variant="text"
              loadingIndicator={
                <UseAnimations
                  animation={loading}
                  strokeColor="#4aa0e7"
                  size={55}
                />
              }
              loading={coverMn.isLoading}
            >
              edit
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditCover;
