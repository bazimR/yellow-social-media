import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Grid,
  IconButton,
} from "@mui/material";
import { TiPlus } from "@react-icons/all-files/ti/TiPlus.esm";
const Story = () => {
  const style = {
    background: " rgba( 255, 255, 255, 0.1 )",
    boxShadow: "0 8px 10px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  const story = [
    "robin",
    "rishal",
    "alen",
    "jackson",
    "szz",
    "fe",
    "fq",
    "fs",
    "szw2",
    "sff",
    "faq",
    "qesd",
    "caa",
    "fag",
  ];
  return (
    <Grid
      p={1}
      sx={{
        width: "100%",
        height: { xs: "25", md: "20vh", lg: "25vh" },
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "auto",
        borderBottom: { xs: 0, lg: 3 },
        borderBottomColor: { xs: "none", lg: "white" },
        paddingBottom: 0,
        position: "inherit",
      }}
    >
      <Grid item sx={{ mr: 1 }}>
        <Card style={style} elevation={10}>
          <CardActionArea
            sx={{
              minWidth: 110,
              minHeight: 170,
              backgroundColor: "#fffff",
            }}
          >
            <CardContent sx={{ position: "relative" ,display:'flex',justifyContent:'center',alignItems:'center'}}>
              <IconButton aria-label="addstory" sx={{fontSize:'3em',color:'primary.main'}}>
                <TiPlus />
              </IconButton>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {story.map((name) => {
        return (
          <Grid sx={{ mr: 1 }} item key={name}>
            <Card style={style} elevation={10}>
              <CardActionArea
                sx={{
                  minWidth: 110,
                  minHeight: 170,
                  maxHeight: 240,
                  maxWidth: 140,
                  backgroundColor: "#fffff",
                }}
              >
                <CardContent sx={{ position: "relative" }}>
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
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Story;
