import * as React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

export default function Search() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container sx={{ flexGrow: 1 }}>
        <Paper variant="outlined" sx={{ width: 1 }}></Paper>
      </Container>
    </React.Fragment>
  );
}
