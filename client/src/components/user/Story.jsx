import { Card, CardContent, Avatar, Grid, IconButton } from "@mui/material";
import { TiPlus } from "@react-icons/all-files/ti/TiPlus.esm";
const Story = () => {
  const style = {
    background: " rgba( 255, 255, 255, 0.1 )",
    boxShadow: "4px 4px 15px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  const story = ["2",4,5,5,6,7,8,9,0,31,];
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
        paddingBottom: 0,
        marginBottom:3,
        top: 0,
        position: "inherit",
      }}
    >
      <Grid item sx={{ mr: 1,my:2 }}>
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
              aria-label="addstory"
              sx={{ fontSize: "3em", color: "primary.main" }}
            >
              <TiPlus />
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
      {story.map((name) => {
        return (
          <Grid sx={{ mr: 1 }} item key={name}>
            <Card style={style} elevation={10}>
              <CardContent
                sx={{
                  position: "relative",
                  width: "5em",
                  height: "8em",
                  backgroundColor: "#fffff",
                }}
              >
                <Avatar
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 35,
                    height: 35,
                    marginTop: -7.5,
                    marginLeft: 1,
                    border: 1,
                    borderColor: "white",
                  }}
                  alt={name}
                  src=""
                  variant="rounded"
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Story;
