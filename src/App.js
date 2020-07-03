import React, { useState } from "react";
import styles from "./App.module.scss";

import Layout from "./containers/Layout/Layout";
import Introduction from "./containers/Introduction/Introduction";
import Home from "./containers/Main/Home/Home";
import Profile from "./containers/Main/Profile/Profile";
import Messages from "./containers/Main/Messages/Messages";

import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [auth, setAuth] = useState(true);
  const authHandler = (choice) => {
    console.log(choice);

    setAuth(choice);
  };
  let routes = (
    <Switch>
      <Route path="/profile" component={Profile} />
      <Route path="/messages" component={Messages} />
      <Route path="/home" component={Home} />
      <Route path="/" component={Home} />
    </Switch>
  );

  if (!auth) {
    routes = (
      <Switch>
        <Route path="/" component={Introduction} />
      </Switch>
    );
  }

  return (
    <div className={styles.app}>
      {/* I will be handling the routing here */}
      <Layout auth={auth}>{routes}</Layout>
    </div>
  );
}

export default App;
