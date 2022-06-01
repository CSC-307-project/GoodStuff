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
      const avatar = await axios.get("http://localhost:5001/avatar", {
        params: { user_id: user_id },
      });
      setAvatar(avatar.data);
    }
    fetchData();
  }, []);

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