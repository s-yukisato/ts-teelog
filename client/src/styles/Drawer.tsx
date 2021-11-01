import { useState } from "react";
import type { VFC, ReactNode } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",

  "&::-webkit-scrollbar": {
    width: "12px",
    backgroundColor: "#2b2b2b",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#2b2b2b",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    backgroundColor: "#6b6b6b",
    borderLeft: "2px solid #2b2b2b",
    borderRight: "2px solid #2b2b2b",
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  },
  "&::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("tablet")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },

  "&::-webkit-scrollbar": {
    width: "12px",
    backgroundColor: "#2b2b2b",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#2b2b2b",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    backgroundColor: "#6b6b6b",
    borderLeft: "2px solid #2b2b2b",
    borderRight: "2px solid #2b2b2b",
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  },
  "&::-webkit-scrollbar-thumb:focus": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:active": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#959595",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "#2b2b2b",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Container = styled("div")({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

type Props = {
  title: string;
  children: ReactNode;
};

const MiniDrawer: VFC<Props> = ({ title, children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Inbox",
            "Starred",
            "Send email",
            "Drafts",
            "Inbox",
            "Starred",
            "Send email",
            "Drafts",
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container>
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
};

export default MiniDrawer;
