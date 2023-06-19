import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";
import UseAnimations from "react-useanimations";
import LoadingButton from "@mui/lab/LoadingButton";
import imageVector from "../../assets/post6.png";
import loading from "react-useanimations/lib/loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalStory } from "../../redux/storyModalSlice";
import { addStory } from "../../helper/helper";

const AddStory = () => {
  const storyModal = useSelector((state) => state.story.value);
  const userId = useSelector((state) => state.user.value._id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
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
  const formData = new FormData();
  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setSelectedImg(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };
  //
  const createPostMn = useMutation({
    mutationFn: addStory,
    onSuccess: () => {
      setFile(null);
      setSelectedImg(null);
      dispatch(setModalStory(false));
      queryClient.refetchQueries({ queryKey: ["story"] });
    },
  });
  //
  const handleSubmit = (e) => {
    formData.append("image", file);
    formData.append("userId", userId);
    e.preventDefault();
    createPostMn.mutate(formData);
  };
  const handleClose = () => {
    dispatch(setModalStory(false));
  };
  return (
    <Modal disableAutoFocus={true} open={storyModal} onClose={handleClose}>
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
              color={"primary.main"}
              sx={{
                fontSize: "1.5em",
                fontWeight: 400,
                padding: 1,
                display: "flex",
                justifyContent: "center", // Center the text horizontally
                alignItems: "center",
              }}
            >
              story
            </Typography>
            <Typography
              sx={{
                paddingY: 2,
                fontSize: "0.9em",
                fontWeight: 200,
                display: "flex",
                justifyContent: "center", // Center the text horizontally
                alignItems: "center",
              }}
              color="primary.dark"
            >
              remember story will be only seen for a day
            </Typography>
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
                  width: `${file ? "15em" : "8em"}`,
                  height: `${file ? "20em" : "8em"}`,
                  cursor: "pointer",
                }}
                src={selectedImg ? selectedImg : imageVector}
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
                  strokeColor="#4aa0e7"
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

export default AddStory;
