import React from "react";
import "./index.css";
import Typography from "@mui/material/Typography";
import FullScreenDialog from "./Dialog";

const Index: React.VFC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)}
    const props = {
        open: open,
        handleClose: handleClose,
        title: "TEST",
        content: (
            <>
                <div>Hello</div>
            </>
        ),
        action: "Close"
    }
  return (
    <div className="container">
      <div className="card">
        <i />
      </div>
      <Typography color="primary">Hello World</Typography>
      <button onClick={handleOpen}>Open</button>
      <FullScreenDialog {...props} />
    </div>
  );
};

export default Index;
