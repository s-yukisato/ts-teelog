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

const CListItemText = styled(ListItemText) (({ theme }) => ({
  fontSize: '12px',
  fontFamily: 'Zen Kurenaido',
  paddingLeft: theme.spacing(2),
}))

const ExternalLink: React.VFC<LinkProps> = ({ content }) => {
  return (
    <ListItemButton
      target="_blank"
      component={"a"}
      href={content.link}
      key={content.title}
    >
      <CListItemText primary={content.title} />
    </ListItemButton>
  );
};

const ContainerGrid = styled(Grid)(({ theme }) => ({
  marginTop: "auto",
  width: "100%",
  justifyContent: "space-evenly",
  alignItems: "start",
}));

const ItemGrid = styled(Grid)(({ theme }) => ({
  alignItems: "center",
  textAlign: "center",
  [theme.breakpoints.between('mobile', 'tablet')]: {
    width: "100%",
  },
  [theme.breakpoints.between('tablet', 'laptop')]: {
    width: "50%",
    padding: theme.spacing(2)
  },
  [theme.breakpoints.up('laptop')]: {
   width: "25%",
   padding: theme.spacing(1)
  }
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
        
          <ItemGrid item p={2}>
            <img src={Logo} width="150px" height="150px" alt="Logo" />
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
            pb: {mobile: 3, tablet: 0}
          }}
          component="nav"
        >
          {listItems.map((listItem, index: number) => (
            <>
              <ListItemButton
                onClick={handleClick(index)}
                sx={{ borderBottom: "1px solid #aaa" }}
              >
                <CListItemText primary={listItem.title} />
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
