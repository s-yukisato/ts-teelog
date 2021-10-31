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
    // <ListItemButton
    //   component={RouterLink}
    //   to={content.link}
    //   key={content.title}
    // >
    //   <ListItemText primary={content.title} />
    // </ListItemButton>
    <p>{content.title}</p>
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
  marginTop: "auto",
  width: "100%",
  justifyContent: "space-evenly",
  alignItems: "start",
  background: theme.palette.primary.dark,
  [theme.breakpoints.between('mobile', 'tablet')]: {
    gap: 12,
    background: theme.palette.primary.main
  },
  [theme.breakpoints.between('tablet', 'laptop')]: {
    gap: 6,
    background: theme.palette.secondary.light,
  },
  [theme.breakpoints.up('laptop')]: {
    gap: 3
  }
}));

const ItemGrid = styled(Grid)(({ theme }) => ({
  alignItems: "center",
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
        
          <ItemGrid item>
            <img src={Logo} width="200px" height="200px" alt="Logo" />
          </ItemGrid>
          {listItems.map((listItem: IListItem) => (
            <ItemGrid item>
              <List sx={{ display: { mobile: "none", tablet: "block" } }}>
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
            display: { mobile: "block", tablet: "none" },
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
                    <ExternalLink content={item} />
                  ) : (
                    <InternalLink content={item} />
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
