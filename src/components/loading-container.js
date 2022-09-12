import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Grid } from "@mui/material";

export default function LoadingContainer() {
  return (
    <>
      <div className="center-loading">
        <div className="loading-container">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ display: "flex" }}>
              <CircularProgress color="secondary" />
            </Box>
          </Grid>
        </div>
      </div>
    </>
  );
}
