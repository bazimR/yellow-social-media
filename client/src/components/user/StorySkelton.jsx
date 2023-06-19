import { Card, Grid, Skeleton } from "@mui/material";

const StorySkelton = () => {
  const loads = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const style = {
    background: " rgba( 255, 255, 255, 0.1 )",
    boxShadow: "4px 4px 15px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.18)",
  };
  return loads.map((load) => (
    <Grid sx={{ mr: 1 }} key={load} item>
      <Card style={style} elevation={10}>
        <Skeleton
          animation='wave'
          sx={{
            backgroundBlendMode:'lighten',
            margin: 0,
            padding: 0,
            width: "6.6em",
            color:'white',
            height: "10.5em",
          }}
          variant="rectangular"
        />
      </Card>
    </Grid>
  ));
};
export default StorySkelton;
