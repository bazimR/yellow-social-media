import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Modal,

} from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { TiHome } from "@react-icons/all-files/ti/TiHome.esm";
import { TiMessages } from "@react-icons/all-files/ti/TiMessages.esm";
import { TiBookmark } from "@react-icons/all-files/ti/TiBookmark.esm";
import { TiCog } from "@react-icons/all-files/ti/TiCog.esm";
import { TiPlus } from "@react-icons/all-files/ti/TiPlus.esm";
import { TiPower } from "@react-icons/all-files/ti/TiPower.esm";

import { useState } from "react";
import MobileNav from "../../components/user/MobileNav";

const Layoutuser = () => {
  const confirm = useConfirm();
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const BoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      lg: "60vh",
      xs: "70vh",
    },
    height: "60vh",
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 0,
    display: "flex",
    justifyContent: "center",
  };
  const handleClick = (index, href) => {
    setSelected(index);
    if (href) {
      navigate(href);
      setOpen(false);
    } else if (index === 4) {
      setOpen(!open);
    } else if (index === 2) {
      setModal(true);
    }
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleSignout = () => {
    confirm({
      title: "Are you sure you want to signout?",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch(() => {
        console.log("signout canceled");
      });
  };
  return (
    <main>
      <Modal open={modal} onClose={handleClose}>
        <Box sx={BoxStyle}>
          <Grid
            container
            direction="column"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item sx={{top:0}}>
              <Typography
                sx={{ fontSize: "2em", color: "#004242", padding: 1 }}
              >
                create
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ fontSize: "2em", color: "#004242", padding: 1 }}
              >
                create
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* large devices */}
      <Grid
        container
        direction={"row"}
        columns={24}
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        <Grid
          item
          xs={4}
          sx={{
            height: "100vh",
            top: 0,
            left: 0,
          }}
        >
          <Grid
            sx={{
              marginTop: {
                lg: 4,
                xl: 6,
              },
              marginBottom: {
                lg: 2,
                xl: 3,
              },
            }}
            item
            display={"flex"}
            justifyContent="center"
            alignItems="flex-start"
          >
            <svg
              display={"flex"}
              width="10em"
              height="10em"
              viewBox="0 0 241 87"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8906 83.1543C15.8867 83.1543 17.7461 82.6211 19.4688 81.5547C21.2188 80.5156 22.8594 79.0664 24.3906 77.207C25.9492 75.375 27.4121 73.1875 28.7793 70.6445C30.1738 68.1016 31.4863 65.3535 32.7168 62.4004C29.7363 52.5566 26.7148 43.7383 23.6523 35.9453C20.5898 28.1523 17.6094 21.5488 14.7109 16.1348C13.207 13.2363 11.6348 11.0625 9.99414 9.61328C8.38086 8.13672 6.84961 7.39844 5.40039 7.39844C4.52539 7.39844 3.74609 7.58984 3.0625 7.97266C2.37891 8.32813 1.79102 8.72461 1.29883 9.16211L0.273438 7.89062C0.847656 7.31641 1.55859 6.72852 2.40625 6.12695C3.25391 5.52539 4.23828 4.96484 5.35938 4.44531C6.48047 3.92578 7.73828 3.50195 9.13281 3.17383C10.5547 2.8457 12.1133 2.68164 13.8086 2.68164C14.6562 2.68164 15.5996 2.76367 16.6387 2.92773C17.6777 3.06445 18.7305 3.36523 19.7969 3.83008C20.8906 4.26758 21.9707 4.89648 23.0371 5.7168C24.1035 6.50977 25.1152 7.57617 26.0723 8.91602C28.1777 11.8691 30.4062 16.0391 32.7578 21.4258C35.1094 26.7852 37.6113 33.3066 40.2637 40.9902C41.1113 38.4473 41.9453 35.918 42.7656 33.4023C43.5859 30.8594 44.4199 28.3984 45.2676 26.0195C46.1152 23.6133 46.9629 21.3027 47.8105 19.0879C48.6855 16.873 49.5879 14.7949 50.5176 12.8535C51.4746 10.8027 52.4453 8.99805 53.4297 7.43945C54.4414 5.85352 55.5352 4.52734 56.7109 3.46094C57.9141 2.39453 59.2539 1.58789 60.7305 1.04102C62.207 0.466797 63.9023 0.179688 65.8164 0.179688C67.2383 0.179688 68.4004 0.494141 69.3027 1.12305C70.2051 1.72461 70.6562 2.64062 70.6562 3.87109C70.6562 4.96484 70.4785 5.86719 70.123 6.57812C69.7676 7.28906 69.2754 7.64453 68.6465 7.64453C68.127 7.64453 67.7168 7.45312 67.416 7.07031C67.1426 6.66016 66.8555 6.22266 66.5547 5.75781C66.2812 5.29297 65.9395 4.86914 65.5293 4.48633C65.1465 4.07617 64.5859 3.87109 63.8477 3.87109C62.1797 3.87109 60.6348 4.63672 59.2129 6.16797C57.8184 7.69922 56.4922 9.77734 55.2344 12.4023C54.0039 15.0273 52.8008 18.1035 51.625 21.6309C50.4766 25.1309 49.3145 28.8496 48.1387 32.7871C46.9629 36.7246 45.7324 40.7852 44.4473 44.9688C43.1621 49.125 41.7812 53.1719 40.3047 57.1094C38.8281 61.0469 37.2012 64.7656 35.4238 68.2656C33.6738 71.793 31.7188 74.8691 29.5586 77.4941C27.3984 80.1191 25.0059 82.1973 22.3809 83.7285C19.7559 85.2598 16.8438 86.0254 13.6445 86.0254C12.25 86.0254 10.8965 85.9023 9.58398 85.6562C8.29883 85.4375 7.15039 85.123 6.13867 84.7129C5.09961 84.3027 4.25195 83.8105 3.5957 83.2363C2.91211 82.6621 2.5293 82.0469 2.44727 81.3906C2.39258 80.8984 2.41992 80.3926 2.5293 79.873C2.61133 79.3809 2.76172 78.9297 2.98047 78.5195C3.19922 78.1094 3.5 77.7676 3.88281 77.4941C4.23828 77.2207 4.66211 77.084 5.1543 77.084C5.45508 77.084 5.74219 77.2344 6.01562 77.5352C6.26172 77.8359 6.53516 78.2051 6.83594 78.6426C7.13672 79.1074 7.46484 79.5996 7.82031 80.1191C8.20312 80.6387 8.66797 81.1172 9.21484 81.5547C9.76172 82.0195 10.4043 82.4023 11.1426 82.7031C11.9082 83.0039 12.8242 83.1543 13.8906 83.1543ZM68.8105 45.1738C68.8105 46.0488 68.9336 47.0059 69.1797 48.0449C69.4531 49.0566 69.8359 50.082 70.3281 51.1211C70.8203 52.1602 71.4219 53.1582 72.1328 54.1152C72.8711 55.0449 73.7051 55.8789 74.6348 56.6172C75.5918 57.3555 76.6445 57.9434 77.793 58.3809C78.9414 58.8184 80.1992 59.0371 81.5664 59.0371C82.5234 59.0371 83.4121 58.9277 84.2324 58.709C85.0527 58.4902 85.8184 58.1895 86.5293 57.8066C87.2402 57.4238 87.9238 56.9863 88.5801 56.4941C89.2363 55.9746 89.8926 55.4277 90.5488 54.8535L91.5742 55.8379C90.9453 56.6855 90.1387 57.6152 89.1543 58.627C88.1699 59.6387 86.9805 60.5957 85.5859 61.498C84.1914 62.373 82.5645 63.1113 80.7051 63.7129C78.8457 64.2871 76.7266 64.5742 74.3477 64.5742C71.9688 64.5742 69.6445 64.1504 67.375 63.3027C65.1328 62.4277 63.1367 61.1289 61.3867 59.4062C59.6367 57.6836 58.2285 55.5371 57.1621 52.9668C56.123 50.3965 55.6035 47.3887 55.6035 43.9434C55.6035 41.4551 55.918 39.1719 56.5469 37.0938C57.1758 35.0156 58.0234 33.1426 59.0898 31.4746C60.1836 29.8066 61.4414 28.3438 62.8633 27.0859C64.3125 25.8281 65.8301 24.7891 67.416 23.9688C69.002 23.1211 70.6152 22.4922 72.2559 22.082C73.9238 21.6445 75.5234 21.4258 77.0547 21.4258C79.0781 21.4258 80.8418 21.6445 82.3457 22.082C83.8496 22.5195 85.0938 23.1074 86.0781 23.8457C87.0898 24.584 87.8418 25.4453 88.334 26.4297C88.8262 27.3867 89.0723 28.3984 89.0723 29.4648C89.0723 30.75 88.7031 31.9121 87.9648 32.9512C87.2266 33.9629 86.2422 34.8516 85.0117 35.6172L68.8105 45.1738ZM77.0547 36.8477C77.4102 36.6289 77.6973 36.4238 77.916 36.2324C78.1621 36.0137 78.3535 35.7676 78.4902 35.4941C78.627 35.1934 78.7227 34.8379 78.7773 34.4277C78.8594 33.9902 78.9004 33.457 78.9004 32.8281C78.9004 32.1445 78.8184 31.3926 78.6543 30.5723C78.5176 29.7246 78.2715 28.9316 77.916 28.1934C77.5605 27.4551 77.1094 26.8398 76.5625 26.3477C76.0156 25.8555 75.3594 25.6094 74.5938 25.6094C73.6094 25.6094 72.7617 25.9102 72.0508 26.5117C71.3672 27.0859 70.793 27.8379 70.3281 28.7676C69.8906 29.6973 69.5352 30.7637 69.2617 31.9668C69.0156 33.1426 68.8242 34.332 68.6875 35.5352C68.5508 36.7383 68.4688 37.9004 68.4414 39.0215C68.4141 40.1152 68.4004 41.0449 68.4004 41.8105L77.0547 36.8477ZM108.965 60.3906C108.965 60.7461 108.896 61.1699 108.76 61.6621C108.65 62.1543 108.363 62.6191 107.898 63.0566C107.461 63.4941 106.805 63.8633 105.93 64.1641C105.082 64.4922 103.934 64.6562 102.484 64.6562C101.035 64.6562 99.9004 64.4785 99.0801 64.123C98.2598 63.7949 97.6445 63.3984 97.2344 62.9336C96.8516 62.4688 96.6055 61.9902 96.4961 61.498C96.4141 61.0059 96.373 60.6094 96.373 60.3086V7.39844C96.373 6.60547 96.1816 5.92188 95.7988 5.34766C95.4434 4.74609 94.8281 4.44531 93.9531 4.44531C93.4883 4.44531 93.0781 4.52734 92.7227 4.69141C92.3945 4.82812 92.0391 5.04688 91.6562 5.34766L90.8359 4.36328C91.4648 3.84375 92.1621 3.33789 92.9277 2.8457C93.6934 2.32617 94.5273 1.875 95.4297 1.49219C96.3594 1.10938 97.3438 0.794922 98.3828 0.548828C99.4219 0.302734 100.516 0.179688 101.664 0.179688C103.441 0.179688 104.822 0.425781 105.807 0.917969C106.791 1.38281 107.516 1.9707 107.98 2.68164C108.445 3.36523 108.719 4.10352 108.801 4.89648C108.91 5.66211 108.965 6.3457 108.965 6.94727V60.3906ZM132.016 60.3906C132.016 60.7461 131.947 61.1699 131.811 61.6621C131.701 62.1543 131.414 62.6191 130.949 63.0566C130.512 63.4941 129.855 63.8633 128.98 64.1641C128.133 64.4922 126.984 64.6562 125.535 64.6562C124.086 64.6562 122.951 64.4785 122.131 64.123C121.311 63.7949 120.695 63.3984 120.285 62.9336C119.902 62.4688 119.656 61.9902 119.547 61.498C119.465 61.0059 119.424 60.6094 119.424 60.3086V7.39844C119.424 6.60547 119.232 5.92188 118.85 5.34766C118.494 4.74609 117.879 4.44531 117.004 4.44531C116.539 4.44531 116.129 4.52734 115.773 4.69141C115.445 4.82812 115.09 5.04688 114.707 5.34766L113.887 4.36328C114.516 3.84375 115.213 3.33789 115.979 2.8457C116.744 2.32617 117.578 1.875 118.48 1.49219C119.41 1.10938 120.395 0.794922 121.434 0.548828C122.473 0.302734 123.566 0.179688 124.715 0.179688C126.492 0.179688 127.873 0.425781 128.857 0.917969C129.842 1.38281 130.566 1.9707 131.031 2.68164C131.496 3.36523 131.77 4.10352 131.852 4.89648C131.961 5.66211 132.016 6.3457 132.016 6.94727V60.3906ZM139.768 43C139.768 39.418 140.287 36.2871 141.326 33.6074C142.365 30.9004 143.746 28.6445 145.469 26.8398C147.219 25.0352 149.242 23.6816 151.539 22.7793C153.836 21.877 156.242 21.4258 158.758 21.4258C161.273 21.4258 163.68 21.8496 165.977 22.6973C168.273 23.5176 170.283 24.7891 172.006 26.5117C173.756 28.2344 175.15 30.4219 176.189 33.0742C177.229 35.6992 177.748 38.8164 177.748 42.4258C177.748 46.0078 177.229 49.1797 176.189 51.9414C175.15 54.7031 173.756 57.0273 172.006 58.9141C170.283 60.8008 168.273 62.2363 165.977 63.2207C163.68 64.1777 161.273 64.6562 158.758 64.6562C156.242 64.6562 153.836 64.2051 151.539 63.3027C149.242 62.373 147.219 61.0059 145.469 59.2012C143.746 57.3965 142.365 55.1406 141.326 52.4336C140.287 49.7266 139.768 46.582 139.768 43ZM164.992 42.5898C164.992 40.4023 164.91 38.2969 164.746 36.2734C164.609 34.2227 164.322 32.4043 163.885 30.8184C163.447 29.2324 162.818 27.9746 161.998 27.0449C161.178 26.0879 160.098 25.6094 158.758 25.6094C157.418 25.6094 156.338 26.1152 155.518 27.127C154.697 28.1113 154.068 29.4238 153.631 31.0645C153.193 32.6777 152.906 34.5234 152.77 36.6016C152.633 38.6797 152.564 40.8125 152.564 43C152.564 45.1875 152.633 47.334 152.77 49.4395C152.906 51.5176 153.193 53.377 153.631 55.0176C154.068 56.6582 154.697 57.9844 155.518 58.9961C156.338 59.9805 157.418 60.4727 158.758 60.4727C160.098 60.4727 161.178 59.9531 161.998 58.9141C162.818 57.875 163.447 56.5078 163.885 54.8125C164.322 53.1172 164.609 51.2031 164.746 49.0703C164.91 46.9375 164.992 44.7773 164.992 42.5898ZM235.416 34.4277C235.416 32.623 235.293 31.1328 235.047 29.957C234.801 28.7812 234.527 27.8105 234.227 27.0449C233.953 26.252 233.693 25.6094 233.447 25.1172C233.201 24.5977 233.078 24.1191 233.078 23.6816C233.078 23.2715 233.242 22.9297 233.57 22.6562C233.898 22.3828 234.281 22.1504 234.719 21.959C235.184 21.7676 235.648 21.6309 236.113 21.5488C236.605 21.4668 237.002 21.4258 237.303 21.4258C238.096 21.4258 238.67 21.5352 239.025 21.7539C239.381 21.9727 239.668 22.3965 239.887 23.0254C240.133 23.8184 240.297 24.8711 240.379 26.1836C240.488 27.4688 240.543 28.8496 240.543 30.3262C240.543 32.4316 240.42 34.7422 240.174 37.2578C239.928 39.7734 239.531 42.3027 238.984 44.8457C238.465 47.3887 237.781 49.8496 236.934 52.2285C236.113 54.6074 235.115 56.7266 233.939 58.5859C232.764 60.418 231.41 61.8945 229.879 63.0156C228.348 64.1094 226.611 64.6562 224.67 64.6562C223.139 64.6562 221.758 64.3555 220.527 63.7539C219.324 63.125 218.244 62.2773 217.287 61.2109C216.33 60.1445 215.482 58.9004 214.744 57.4785C214.033 56.0293 213.404 54.4844 212.857 52.8438C212.229 54.5117 211.504 56.0703 210.684 57.5195C209.863 58.9414 208.947 60.1855 207.936 61.252C206.951 62.3184 205.857 63.1523 204.654 63.7539C203.451 64.3555 202.152 64.6562 200.758 64.6562C199.035 64.6562 197.504 64.2871 196.164 63.5488C194.852 62.7832 193.689 61.7578 192.678 60.4727C191.666 59.1602 190.791 57.6426 190.053 55.9199C189.314 54.1973 188.672 52.3789 188.125 50.4648C187.605 48.5508 187.168 46.582 186.812 44.5586C186.457 42.5352 186.156 40.5801 185.91 38.6934C185.664 36.8066 185.459 35.043 185.295 33.4023C185.131 31.7617 184.967 30.3398 184.803 29.1367C184.611 28.043 184.324 27.1953 183.941 26.5938C183.586 25.9922 182.971 25.6914 182.096 25.6914C181.631 25.6914 181.234 25.7734 180.906 25.9375C180.578 26.1016 180.223 26.334 179.84 26.6348L178.979 25.6094C179.607 25.0898 180.305 24.584 181.07 24.0918C181.863 23.5723 182.711 23.1211 183.613 22.7383C184.516 22.3555 185.486 22.041 186.525 21.7949C187.564 21.5488 188.658 21.4258 189.807 21.4258C191.447 21.4258 192.773 21.7129 193.785 22.2871C194.797 22.834 195.59 23.5312 196.164 24.3789C196.766 25.1992 197.189 26.0879 197.436 27.0449C197.682 28.002 197.859 28.8633 197.969 29.6289C198.461 33.7578 198.939 37.3945 199.404 40.5391C199.896 43.6836 200.416 46.3223 200.963 48.4551C201.51 50.5605 202.098 52.1602 202.727 53.2539C203.383 54.3203 204.148 54.8535 205.023 54.8535C205.598 54.8535 206.158 54.6074 206.705 54.1152C207.252 53.623 207.771 52.9395 208.264 52.0645C208.756 51.1895 209.221 50.1367 209.658 48.9062C210.096 47.6484 210.479 46.2676 210.807 44.7637C210.533 43.2598 210.301 41.7695 210.109 40.293C209.918 38.8164 209.74 37.4082 209.576 36.0684C209.439 34.7012 209.303 33.4297 209.166 32.2539C209.029 31.0781 208.879 30.0391 208.715 29.1367C208.305 26.5664 208.537 24.6387 209.412 23.3535C210.314 22.0684 212.105 21.4258 214.785 21.4258C215.961 21.4258 216.945 21.5352 217.738 21.7539C218.559 21.9453 219.229 22.3281 219.748 22.9023C220.295 23.4492 220.732 24.2148 221.061 25.1992C221.389 26.1562 221.648 27.3867 221.84 28.8906C222.359 32.9922 222.865 36.6562 223.357 39.8828C223.85 43.1094 224.369 45.8301 224.916 48.0449C225.463 50.2598 226.051 51.9551 226.68 53.1309C227.336 54.2793 228.102 54.8535 228.977 54.8535C229.906 54.8535 230.768 54.2793 231.561 53.1309C232.354 51.9824 233.037 50.4648 233.611 48.5781C234.186 46.6914 234.623 44.5176 234.924 42.0566C235.252 39.5957 235.416 37.0527 235.416 34.4277Z"
                fill="#5658D4"
              />
            </svg>
          </Grid>
          <Grid
            m={2}
            item
            display={"flex"}
            justifyContent="left"
            alignItems="flex-start"
          >
            <Typography
              sx={{ fontWeight: 500, fontSize: "1.4rem" }}
              color="initial"
            >
              Menu
            </Typography>
          </Grid>
          <Grid m={2} item>
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "secondary.light",
                borderRadius: "1em",
              }}
            >
              <List sx={{ width: "100%" }}>
                <ListItemButton
                  selected={selected === 0}
                  onClick={() => handleClick(0, "/home")}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "2em",
                      color: `${selected === 0 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                  >
                    <TiHome />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: `${selected === 0 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                    primary="Home"
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selected === 1}
                  onClick={() => handleClick(1, "/home/messages")}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "2em",
                      color: `${selected === 1 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                  >
                    <TiMessages />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: `${selected === 1 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                    primary="Messages"
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selected === 2}
                  onClick={() => handleClick(2)}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "2em",
                      color: `${selected === 2 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                  >
                    <TiPlus />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: `${selected === 2 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                    primary="Create"
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selected === 3}
                  onClick={() => handleClick(3, "/home/saved")}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "2em",
                      color: `${selected === 3 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                  >
                    <TiBookmark />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: `${selected === 3 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                    primary="Saved"
                  />
                </ListItemButton>
                <Divider />
                <ListItemButton
                  selected={selected === 4}
                  onClick={() => handleClick(4)}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "2em",
                      color: `${selected === 4 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                  >
                    <TiCog />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: `${selected === 4 ? "primary.dark" : "#5658D4"}`,
                      ml: 0,
                      mb: 0,
                    }}
                    primary="Settings"
                  />
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleSignout();
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon
                        sx={{
                          fontSize: "2em",
                          color: "#5658D4",
                        }}
                      >
                        <TiPower />
                      </ListItemIcon>
                      <ListItemText
                        primary="Signout"
                        sx={{
                          color: "#5658D4",
                        }}
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Box>
          </Grid>
          <Grid
            m={2}
            item
            display={"flex"}
            justifyContent="left"
            alignItems="flex-start"
          >
            <Typography
              sx={{ fontWeight: 500, fontSize: "1.4rem" }}
              color="initial"
            >
              ADS
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={20} justifyContent={"center"}>
          <Outlet />
        </Grid>
      </Grid>
      {/* mobile devices */}
      <Grid
        container
        direction={"column"}
        sx={{ display: { xs: "flex", lg: "none" } }}
        justifyContent="flex-start"
      >
        <Grid
          item
          xs={9}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Outlet />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
         <MobileNav/>
        </Grid>
      </Grid>
    </main>
  );
};

export default Layoutuser;
