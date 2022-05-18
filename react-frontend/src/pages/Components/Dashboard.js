import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import ButtonBase from "@mui/material/ButtonBase";

import Cookies from "js-cookie";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const handle_avatar = async(user_id, avatar_url) =>{ 
  console.log(user_id);
  console.log(avatar_url); 
  const res = await axios.patch("http://localhost:5001/profile", {
    "user_id": user_id, 
    "avatar_url": avatar_url
  }).catch((error) => console.log('Error: ' + error)); 
  
}
export default function Dashboard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dicchtih6",
        uploadPreset: "lehelgx4",
        sources: ["local", "url", "facebook", "dropbox", "instagram"],
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        //max_files: 5000000,
        client_allowed_formats: ["png", "bmp", "jpeg", "gif", "jpg"]
      },
      (err, info) => {
        if (info.event === "success") {
          //   setDelToken(info.info.delete_token);
          //   setPath(info.info.path);
          //   setFileName(info.info.original_filename);
          // console.log(Cookies.get('user_id')); 
          // console.log(info.info.path);
          handle_avatar(Cookies.get('user_id'), info.info.path); 
          // const res = await axios.patch("http://localhost:5001/profile", {
          //   "user_id": Cookies.get('user_id'), 
          //   "avatar_url": info.info.path
          // });
        }
      }
    );
  };
  return (
    <Card sx={{ maxWidth: 345, marginLeft: "" }}>
      <CardHeader
        sx={{ marginLeft: "15%" }}
        avatar={
          <ButtonBase sx={{ borderRadius: "50%" }}>
            <Avatar
              onClick={handleOpenWidget}
              sx={{ width: 200, height: 200 }}
              aria-label="recipe"
              src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg"
            />
          </ButtonBase>
        }
      />
      <CardContent>
        <TextField
          sx={{
            marginBottom: 2,
          }}
          fullWidth
          required
          id="standard-required"
          defaultValue="User Name"
          variant="standard"
        />
        <TextField
          fullWidth
          required
          type="email"
          id="standard-required"
          defaultValue="Email@gmail.com"
          variant="standard"
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
