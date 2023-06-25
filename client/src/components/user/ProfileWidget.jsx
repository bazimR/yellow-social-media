import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProfileWidget = () => {
  const navigate = useNavigate();
  const style = {
    background:
      "linear-gradient(to bottom , rgba(255,255,255,0) 0%, rgba(255,255,255, 0.5) 35%)",
  };
  const styleBox = {
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(2.9px)",
    WebkitBackdropFilter: "blur(1.9px)",
    // border: "1px solid rgba(255, 255, 255, 0.1)",
  };
  const user = useSelector((state) => state.user.value);

  return (
    <Card
      style={styleBox}
      sx={{
        backgroundImage: `url(${user.coverImageUrl})`,
        height: "15vh",
        width: "25vw",
        display: "flex",
        justifyContent: "end",
        flexDirection: "column",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "15px",
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate("profile");
        }}
        style={style}
        sx={{ borderRadius: 0 }}
      >
        <CardContent
          sx={{ padding: 1.2, display: "flex", alignItems: "center" }}
        >
          <Avatar
            src={user.profileUrl}
            variant="circular"
            sx={{
              width: "75px",
              height: "75px",
              backgroundColor: "primary.main",
            }}
          />
          <Typography
            component={"span"}
            sx={{ fontSize: "16px", fontWeight: 500, ml: 1 }}
            color="#00000"
          >
            {user.username}
            <Typography
              sx={{ fontSize: "13px", fontWeight: 400 }}
              color="#004242"
            >
              @{user.email}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileWidget;
