import * as React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

export default function Search() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{ flexGrow: 1 }}>
        <Paper variant="outlined" sx={{ width: 1 }}>
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            alt="nice"
          />
        </Paper>
      </Container>
    </React.Fragment>
  );
}
