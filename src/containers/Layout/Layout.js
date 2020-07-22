import React, { useContext } from "react";

import { AuthContext } from "../../helper/Auth";
import DesktopMenu from "../../components/Main/Menu/DesktopMenu/DesktopMenu";
import Footer from "../../components/UI/Footer/Footer";
import Header from "../../components/UI/Header/HeaderMain/HeaderMain";
import MobileMenu from "../../components/Main/Menu/MobileMenu/MobileMenu";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  let desktopMenu = props.auth ? <DesktopMenu /> : null;
  let header = props.auth ? <Header /> : null;
  let menu = props.auth ? <MobileMenu /> : null;
  const { currentUser } = useContext(AuthContext);

  React.useEffect(() => {
    console.log("[Layout.js] useEffect");
  });

  return (
    <div className={props.auth ? styles.layout : null}>
      {desktopMenu}
      <div style={{ position: "relative" }}>
        {header}
        {props.children}
        {menu}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
