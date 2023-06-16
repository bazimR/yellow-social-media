import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Modal, TextField } from "@mui/material";
import UseAnimations from "react-useanimations";
import LoadingButton from "@mui/lab/LoadingButton";
import imageVector from "../../assets/post6.png";
import PropTypes from "prop-types";
import loading from "react-useanimations/lib/loading";

const AddStory = () => {
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
