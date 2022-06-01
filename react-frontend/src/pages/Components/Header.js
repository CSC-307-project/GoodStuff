import { Link } from "react-router-dom";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ImageAvatars from "./ImageAvatars.js";
import { useState } from "react";

import Cookies from "js-cookie";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const [header, setHeader] = useState("");
  const [login, setLogin] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            GoodStuff
          </Typography>

          <Link to="/profile">
            {" "}
            <ImageAvatars />{" "}
          </Link>

          {Cookies.get("user_id") == null && (
            <Button component={Link} to={"/login"} color="inherit">
              {" "}
              Login
            </Button>
          )}

          {login && Cookies.get("user_id") != null && (
            <Button
              component={Link}
              to={"/"}
              color="inherit"
              onClick={() => {
                Cookies.remove("user_id");
                setHeader("");
                setLogin(false);
                this.forceUpdate();
              }}
            >
              Logout
            </Button>
          )}

          <Search>
            <StyledInputBase
              onChange={(event) => {
                setSearch(event.target.value);
                console.log(search);
                if (event.target.value.length == 1) {
                  props.searchByTag("");
                }
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon
                onClick={() => {
                  props.searchByTag(search);
                }}
              />
            </IconButton>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
