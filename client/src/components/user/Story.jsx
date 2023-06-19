import {
  Card,
  CardContent,
  Avatar,
  CardActionArea,
  Grid,
  IconButton,
} from "@mui/material";
import { TiPlus } from "@react-icons/all-files/ti/TiPlus.esm";
import { useDispatch, useSelector } from "react-redux";
import { setModalStory } from "../../redux/storyModalSlice";
import { useQuery } from "@tanstack/react-query";
import { homeStory } from "../../helper/helper";
import StorySkelton from "./StorySkelton";
import { setDataViewStory, setViewStoryModal } from "../../redux/viewStoryModalSlice";
const Story = () => {
  const style = {
    background: " rgba( 255, 255, 255, 0.1 )",
    boxShadow: "4px 4px 15px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  const userId = useSelector((state) => state.user.value._id);

  const dispatch = useDispatch();
  const { isLoading, data } = useQuery({
    queryKey: ["story", userId],
    queryFn: () => {
      return homeStory(userId);
    },
    refetchOnWindowFocus: false,
  });
  const openAddStory = () => {
    dispatch(setModalStory(true));
  };
  const handleViewStory = (doc) => {
    dispatch(setDataViewStory(doc))
    dispatch(setViewStoryModal(true))
  };
  return (
    <Grid
      p={1}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "auto",
        paddingBottom: 3,
        top: 0,
        marginBottom: "auto",
      }}
    >
      <Grid item sx={{ mr: 1, my: 2 }}>
        <Card style={style} elevation={10}>
          <CardContent
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "5em",
              height: "8em",
              backgroundColor: "#fffff",
            }}
          >
            <IconButton
              onClick={openAddStory}
              aria-label="addstory"
              sx={{ fontSize: "3em", color: "primary.main" }}
            >
              <TiPlus />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
      {isLoading ? (
        <StorySkelton />
      ) : (
        data.map((doc) => {
          return (
            <Grid sx={{ mr: 1 }} item key={doc._id}>
              <Card style={style} elevation={10}>
                <CardContent
                  sx={{
                    position: "relative",
                    width: "5em",
                    height: "8em",
                    background: `url(${doc.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "primary.light",
                      position: "absolute",
                      width: 35,
                      height: 35,
                      mx: -1,
                      my: -1,
                      border: 2,
                      borderColor: "white",
                    }}
                    alt="user profile"
                    src={doc.profileUrl}
                    variant="rounded"
                  />
                  <CardActionArea
                    onClick={()=>handleViewStory(doc)}
                    sx={{
                      margin: -10,
                      width: "20em",
                      height: "20em",
                    }}
                  ></CardActionArea>
                </CardContent>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default Story;
