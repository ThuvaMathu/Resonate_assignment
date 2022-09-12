// import React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
// import AppProvider from "../context/provider";
// import SearchContact from "./search-contact";
// export default function Main() {
//   return (
//     <>
//       <AppProvider>
//         <Grid container justifyContent="center" alignContent="center">
//           <Grid item>
//             <Box
//               sx={{
//                 padding: 3,
//                 flexGrow: 1,
//                 justifyContent: "center",
//                 alignContent: "center",
//               }}
//             >
//               <SearchContact />
//             </Box>
//           </Grid>
//           <Grid item>
//             <Box
//               sx={{
//                 padding: 3,
//                 // flexGrow: 1,
//                 justifyContent: "center",
//                 alignContent: "center",
//               }}
//             >
//               <SearchContact />
//             </Box>
//           </Grid>
        
//         </Grid>
//       </AppProvider>
//     </>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SearchContact from "./search-contact";
import AppProvider from "../context/provider";
import { Container } from "@mui/system";

export default function Main() {
    return (
      <AppProvider>
        <Box sx={{ flexGrow: 1, p: 3, marginY:5 }}>
          <Grid
            container
            spacing={2}
            sx={{
              "--Grid-borderWidth": "1px",
              borderTop: "var(--Grid-borderWidth) solid",
              borderLeft: "var(--Grid-borderWidth) solid",
              borderColor: "divider",
              "& > div": {
                borderRight: "var(--Grid-borderWidth) solid",
                borderBottom: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
                },
            }}
          >
            <Grid {...{ xs: 12, sm: 12, md: 6, lg: 6 }} minHeight={160}>
              <Grid
                container
                justifyContent="center"
                align="center"
                sx={{ overflow: "hidden" }}
              >
                <SearchContact />
              </Grid>
            </Grid>
            <Grid {...{ xs: 12, sm: 12, md: 6, lg: 6 }} minHeight={160}>
              <Grid
                container
                justifyContent="center"
                align="center"
                sx={{ overflow: "hidden" }}
              >
                <SearchContact />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </AppProvider>
    );
}
