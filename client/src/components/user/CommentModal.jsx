import {Modal,Box, Grid} from '@mui/material'
import {
    Card,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider
  } from "@mui/material"; 
import {setModalComment} from '../../redux/commentModelSlice'
// import { RiBookmarkFill } from "@react-icons/all-files/ri/RiBookmarkFill.esm"//when saved done


import { useDispatch, useSelector } from 'react-redux';

const CommentModal = () => {
  const dispatch=useDispatch()
  const posts = useSelector(state=>state.post?.value)
  //  const userId = useSelector((state) => state.user.value._id); remember !!!!!!!!!!!!!!!!!!!!
      var currentDate = new Date(); // Current date and time
var postDate = new Date(posts.Date); // Date and time of the post

// Calculate the time difference in milliseconds
var timeDiff = currentDate.getTime() - postDate.getTime();

// Convert the time difference to hours
var hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
// handling comment
    const BoxStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: {
          lg: "auto",
        },
        height: "auto",
        bgcolor: "background.paper",
        borderRadius: "15px",
        boxShadow: 24,
        p: 0,
      };
      const handleClose = ()=>{
        dispatch(setModalComment(false))
      }
      const modal = useSelector(state=>state.modal.value)
  return (
    <Modal disableAutoFocus={true} open={modal} onClose={handleClose}>
        <Box sx={BoxStyle} >
            <Grid container spacing={0}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
                overflow='scroll'
              >
                <Grid
    item
    xs={12}
    key={posts._id}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 2,
    }}
  >
    <Card elevation={0} sx={{ width: 400, height: 535 ,padding:1,borderRadius:"10px"}}>
      <CardActions sx={{ top: 0, left: 0, padding: 0 }}>
          <Avatar
          
            alt="user"
            src=""
            sx={{
              width: 40,
              height: 40,
              marginY:1
            }}
          />
        <Typography
          sx={{
            paddingLeft: 1,
            marginRight: 0,
            fontSize: "0.9em",
            fontWeight: "fontWeightMedium",
            color: "black",
            cursor: "default",
          }}
        >
          {posts.username}
        </Typography>
      </CardActions>
      <CardContent
        sx={{
          backgroundImage: `url(${posts.imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          width: 400,
          height: 400,
          padding: 0,
          borderRadius:'10px',
        }}
      >
      </CardContent>
      <CardActions>
        <Grid
          container
          direction={"column"}
          sx={{
            padding: 0,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Grid item sx={{display:'flex',justifyContent:'space-between',alignItems:"inherit"}}>
            <Typography
              variant="body1"
              color="secondary.darker"
              sx={{ cursor: "default" ,fontWeight:500}}
            >
              {posts.caption}
            </Typography>
            <Typography sx={{fontSize:'12px'}} color="#737373">{hoursDiff } hours ago</Typography>
          </Grid>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "space-between" ,alignItems:'center' }}
          >
           <Grid>
           <Typography variant="subtitle1" color="#747474">comments...</Typography>
           </Grid>
          </Grid>
        </Grid>
      </CardActions>
      <Grid>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt='' />
              </ListItemAvatar>
            </ListItem>
          </List>
      </Grid>
    </Card>
  </Grid>
              </Grid>
            </Grid>
        </Box>
    </Modal>
  )
}

export default CommentModal