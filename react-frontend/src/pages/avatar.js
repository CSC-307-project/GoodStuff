import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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

  return (
    <div className={classes.root}>
      <Avatar src="https://res.cloudinary.com/dicchtih6/image/upload/v1652716035/yynsno17xatmuag7nitr.jpg" />
    </div>
  );
}

// https://res.cloudinary.com/${process.env.REACT_APP_CLOUD_NAME}/image/upload/c_crop,g_custom/${photo}

/*
<Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
<Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
*/
