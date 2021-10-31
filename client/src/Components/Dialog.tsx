import React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/system";
import { CustomButton } from "./Button";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: JSX.Element;
  action: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  children: React.ReactNode;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const CustomTypography = styled(Typography)({
  fontFamily: "Zen Kurenaido",
  fontSize: "20px",
});

const Title: React.VFC<Props> = ({ children }) => {
  return <CustomTypography>{children}</CustomTypography>;
};

const Action: React.VFC<ButtonProps> = ({ children, onClick }) => {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
};

const FullScreenDialog: React.VFC<DialogProps> = (props: DialogProps) => {
  const { open, handleClose, title, content, action } = props;
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Title>{title}</Title>
          <Action onClick={handleClose}>{action}</Action>
        </Toolbar>
      </AppBar>
      {content}
    </Dialog>
  );
};

export default FullScreenDialog;
