import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "../Article/Article";
import ArticleList from "../ArticleList/ArticleList";
import Editor from "../Editor/Editor";
import LoginRegister from "../Login/LoginRegister";
import Logout from "../Logout/Logout";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import Layout from "../../components/Layout/Layout";
import {AuthProvider} from "../../context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route path="/editor" exact component={Editor} />
            <Route path="/editor/:slug" exact component={Editor} />
            <Route path="/login" exact component={LoginRegister} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/profile/:username" exact component={Profile} />
            <Route path="/profile/:username/favorites" exact component={Profile} />
            <Route path="/register" exact component={LoginRegister} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/:slug" exact component={Article} />
            <Route path="/" component={ArticleList} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
