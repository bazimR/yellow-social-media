import { Modal, Box, Grid } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import { setViewStoryModal } from "../../redux/viewStoryModalSlice";
// import { RiBookmarkFill } from "@react-icons/all-files/ri/RiBookmarkFill.esm"//when saved done

import { useDispatch, useSelector } from "react-redux";

const StoryModal = () => {
  const dispatch = useDispatch();

  const BoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: "auto",
    },
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
  };
  const modal = useSelector((state) => state.viewstory.value);
  const handleClose = () => {
    dispatch(setViewStoryModal(false));
  };
  const story = useSelector((state) => state.viewstory.data);

  return (
    <Modal
      sx={{ display: { xs: "none", lg: "flex" } }}
      disableAutoFocus={true}
      open={modal}
      onClose={handleClose}
    >
      <Box sx={BoxStyle}>
        <Grid container direction="row" spacing={0} columns={16}>
          <Card
            elevation={0}
            sx={{
              padding: 1,
              borderRadius: "10px",
            }}
          >
            <CardContent
              sx={{
                backgroundImage: `url(${story.imageUrl})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                width: "30em",
                height: "41em",
                padding: 0,
                borderRadius: "10px",
              }}
            ></CardContent>
          </Card>
        </Grid>
      </Box>
    </Modal>
  );
};

export default StoryModal;
