import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();
  let user_id = Cookies.get("user_id");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const avatar = await axios.get("http://localhost:5001/avatar", {
        params: { user_id: user_id },
      });
      setAvatar(avatar.data);
      // console.log(avatar.data);
    }
    fetchData();
  }, []);

  //console.log(response);gg
  return (
    <div className={classes.root}>
      {avatar && (
        <Avatar
          src={`https://res.cloudinary.com/dicchtih6/image/upload/${avatar}`}
        />
      )}
    </div>
  );
}

// https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/c_crop,g_custom/${photo}

/*
<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
*/
