import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { TiPlus } from "@react-icons/all-files/ti/TiPlus.esm";
const Story = () => {
  const {value} = useSelector(state=>state.user)
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
        backgroundColor: "",
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
        <Card elevation={0}>
          <CardActionArea
            sx={{
              minWidth: 110,
              minHeight: 170,
              backgroundColor: "#D9D9D9",
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
                  marginTop: -5,
                  marginLeft: 1,
                  border: 1,
                  borderColor: "white",
                }}
                alt="Remy Sharp"
                src={value.profile?value.profile:""}
                variant="rounded"
              />
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#747474",
                  fontSize: "3em",
                }}
              >
                <TiPlus />
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {story.map((name) => {
        return (
          <Grid sx={{ mr: 1 }} item key={name}>
            <Card elevation={0}>
              <CardActionArea
                sx={{
                  minWidth: 110,
                  minHeight: 170,
                  maxHeight: 240,
                  maxWidth: 140,
                  backgroundColor: "#D9D9D9",
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
