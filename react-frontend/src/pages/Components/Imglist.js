import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Typography from "../CustomMUI/Typography";

const theme = createTheme({
  components: {
    // Name of the component
    MuiImageListItemBar: {
      styleOverrides: {
        // Name of the slot
        title: {
          // Some CSS
          fontSize: "1.4rem",
        },
        subtitle: {
          fontSize: "1.2rem",
        },
      },
    },
  },
});

export default function Imglist(props) {
  let navigate = useNavigate();
  const user_id = Cookies.get("user_id");

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For Sale
      </Typography>
      <ImageList sx={{ flexGrow: 1 }} cols={3}>
        <ImageListItem key="Subheader">
          <ListSubheader component="div">May</ListSubheader>
        </ImageListItem>
        {props.product_list.map((item) => (
          <ImageListItem key={item.image}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={"$" + item.price}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (user_id === item.sellerId) {
                        alert("This is your own listing");
                      } else {
                        navigate("/product", { state: { product_info: item } });
                      }
                    }}
                  >
                    purchase
                  </Button>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </ThemeProvider>
  );
}
