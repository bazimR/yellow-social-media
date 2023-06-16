import {
  Avatar,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import { deleteComment } from "../../helper/helper";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { RiMoreFill } from "@react-icons/all-files/ri/RiMoreFill.esm";
const Comment = ({ doc }) => {
  const userId = useSelector((state) => state.user.value._id);
  const postId = useSelector((state) => state.post?.value._id);
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (commentId) => {
    confirm({
      title: "Are you sure you want to delete comment?",
      confirmationButtonProps: { autoFocus: true },
    })
      .then(() => {
        deleteComment(commentId).then(() => {
          setAnchorEl(null);
          queryClient.refetchQueries({ queryKey: ["comments", postId] });
        });
      })
      .catch(() => {
        console.log("canceled");
      });
  };
  return (
    <div key={doc._id}>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar
            alt="user"
            src={doc.profileUrl}
            sx={{
              bgcolor:'primary.light',
              width: 35,
              height: 35,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ display: "inline" }}
          primary={
            <Typography
              component={"span"}
              variant="body1"
              color="initial"
              sx={{
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              {doc.username}
            </Typography>
          }
          secondary={
            <>
              <Typography
                component={"span"}
                sx={{
                  overflowWrap: "break-word", // Set the overflowWrap property
                  wordBreak: "break-word", // Add wordBreak property for better support
                  fontSize: "16px",
                }}
                color="initial"
              >
                {doc.body}
              </Typography>
            </>
          }
        />
        {doc.userId === userId && (
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <RiMoreFill />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem sx={{color:'red'}}
                onClick={() => {
                  handleDelete(doc._id);
                }}
              >
                delete
              </MenuItem>
            </Menu>
          </>
        )}
      </ListItem>
      <Divider />
    </div>
  );
};

Comment.propTypes = {
  doc: PropTypes.object.isRequired,
};

export default Comment;
