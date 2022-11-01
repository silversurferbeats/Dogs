import React, { useState } from "react";
import Nav from './Nav';
import {
  Drawer,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div sx={{ background: "#063970" }}>
          <Nav />
        </div>
      </Drawer>
      
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;