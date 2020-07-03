import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import styles from "./Layout.module.scss";
import DesktopMenu from "../../components/UI/DesktopMenu/DesktopMenu";
import Footer from "../../components/UI/Footer/Footer";
import MobileMenu from "../../components/UI/MobileMenu/MobileMenu";

const Layout = (props) => {
  const [selectedTab, setSelectedTab] = useState("home");
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch("/:section");

  // - If page is refreshed, then we need to keep the path
  useEffect(() => {
    if (match) {
      setSelectedTab(match.params.section);
    }
  }, []);

  const selectTabHandler = (event, choice) => {
    event.preventDefault();

    history.push("/" + choice);

    setSelectedTab(choice);
  };

  let desktopMenu = props.auth ? (
    <DesktopMenu handler={selectTabHandler} choice={selectedTab} />
  ) : null;
  let footer = props.auth ? <Footer /> : null;
  let menu = props.auth ? (
    <MobileMenu handler={selectTabHandler} choice={selectedTab} />
  ) : null;

  return (
    <div className={props.auth ? styles.layout : null}>
      {desktopMenu}
      <div style={{ position: "relative" }}>
        {props.children}
        {menu}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
