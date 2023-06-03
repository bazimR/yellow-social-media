import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { TiHome } from "@react-icons/all-files/ti/TiHome.esm";
import { TiMessages } from "@react-icons/all-files/ti/TiMessages.esm";
import { TiBookmark } from "@react-icons/all-files/ti/TiBookmark.esm";
import { TiCog } from "@react-icons/all-files/ti/TiCog.esm";
import { TiPlus } from "@react-icons/all-files/ti/TiPlus.esm";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MobileNav = () => {
  const location = useLocation();
  const urlString = location.pathname
  const endPoint = urlString.slice(urlString.lastIndexOf('/') + 1)
  useEffect(()=>{
    setValue(endPoint)
  },[endPoint])
  const navigate = useNavigate();
  const iconStyle = {
    fontSize: { xs: "2em", md: "3em" },
  };
  const [value, setValue] = useState("home");
  const handleClick = (href) => {
    navigate(href);
  };
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid
    item
      xs={12}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          onClick={() => handleClick("/home")}
          sx={iconStyle}
          label="Home"
          value="home"
          icon={<TiHome />}
        />
        <BottomNavigationAction
          onClick={() => handleClick("/home/messages")}
          sx={iconStyle}
          label="Messages"
          value="messages"
          icon={<TiMessages />}
        />
        <BottomNavigationAction
          sx={iconStyle}
          label="Create"
          value="create"
          icon={<TiPlus />}
        />
        <BottomNavigationAction
          onClick={() => handleClick("/home/saved")}
          sx={iconStyle}
          label="Saved"
          value="saved"
          icon={<TiBookmark />}
        />
        <BottomNavigationAction
          sx={iconStyle}
          label="Settings"
          value="settings"
          icon={<TiCog />}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default MobileNav;
