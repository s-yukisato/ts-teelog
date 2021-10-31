import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { styled, ThemeProvider } from "@mui/system";
import theme from "../theme";

import Logo from "../Assets/logo_transparent.png";

// import Copyright from "./Copyright";

type IListItem = {
  title: string;
  contents: IItemContent[];
};

type IItemContent = {
  title: string;
  link: string;
  external: boolean;
};

const listItems: IListItem[] = [
  {
    title: "コンテンツ",
    contents: [
      {
        title: "ホーム",
        link: "/",
        external: false,
      },
      {
        title: "ダッシュボード",
        link: "/dashboard",
        external: false,
      },
      {
        title: "プロジェクト",
        link: "/projects",
        external: false,
      },
    ],
  },
  {
    title: "コンタクト",
    contents: [
      {
        title: "お問い合わせ",
        link: "/support",
        external: false,
      },
      {
        title: "ヘルプ",
        link: "/help",
        external: false,
      },
    ],
  },
  {
    title: "管理者情報",
    contents: [
      {
        title: "Github",
        link: "https://github.com/s-yukisato",
        external: true,
      },
      {
        title: "Twitter",
        link: "https://twitter.com/",
        external: true,
      },
    ],
  },
];

type LinkProps = {
  content: IItemContent;
};

const InternalLink: React.VFC<LinkProps> = ({ content }) => {
  return (
    <ListItemButton
      component={RouterLink}
      to={content.link}
      key={content.title}
    >
      <ListItemText primary={content.title} />
    </ListItemButton>
  );
};

const ExternalLink: React.VFC<LinkProps> = ({ content }) => {
  return (
    <ListItemButton
      target="_blank"
      component={"a"}
      href={content.link}
      key={content.title}
    >
      <ListItemText primary={content.title} />
    </ListItemButton>
  );
};

const ContainerGrid = styled(Grid)(({ theme }) => ({
  position: "absolute",
  bottom: "0",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  background: theme.palette.primary.dark,
}));

const ItemGrid = styled(Grid)(({ theme }) => ({
  alignItem: "start",
  textAlign: "center",
}));


const Footer = React.memo(() => {
  const [open, setOpen] = useState([false, false, false]);

  const handleClick = (prop: number) => () => {
    setOpen(
      open.map((_, index) => (index === prop ? !open[index] : open[index]))
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <ContainerGrid container>
        
          <ItemGrid item xs={12} sm={6} md={3}>
            <img src={Logo} width="200px" height="200px" alt="Logo" />
          </ItemGrid>
          {listItems.map((listItem: IListItem) => (
            <ItemGrid item xs={12} sm={6} md={3}>
              <List sx={{ display: { xs: "none", sm: "inline-block" } }}>
                <ListItem key={listItem.title}>
                  <Typography variant="h6">{listItem.title}</Typography>
                </ListItem>
                {listItem.contents.map((item) =>
                  item.external ? (
                    <ExternalLink content={item} />
                  ) : (
                    <InternalLink content={item} />
                  )
                )}
              </List>
            </ItemGrid>
          ))}

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            display: { xs: "block", sm: "none" },
          }}
          component="nav"
        >
          {listItems.map((listItem, index: number) => (
            <>
              <ListItemButton
                onClick={handleClick(index)}
                sx={{ borderBottom: "1px solid" }}
              >
                <ListItemText primary={listItem.title} />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                {listItem.contents.map((item) =>
                  item.external ? (
                    // <ListItemButton
                    //   component={RouterLink}
                    //   to={item.link}
                    //   key={item.title}
                    //   sx={{ pl: 4 }}
                    // >
                    //   <ListItemText primary={item.title} />
                    // </ListItemButton>
                    <p>{item.title}</p>
                  ) : (
                    <ListItemButton
                      target="_blank"
                      component={"a"}
                      href={item.link}
                      key={item.title}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  )
                )}
              </Collapse>
            </>
          ))}
        </List>
        {/* <Copyright /> */}
      </ContainerGrid>
    </ThemeProvider>
  );
});

export default Footer;
