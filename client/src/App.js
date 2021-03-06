import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Highlight from "./pages/Highlight";
import Category from "./pages/Category";
import Member from "./pages/Member";
import Custom from "./pages/Custom";
import Standings from "./pages/Standings";
import { CssBaseline } from "@material-ui/core";
import Footer from "./components/Footer";
import MemberPreferences from "./pages/MemberPreferences";

const App = () => {

  return (
    <Fragment>
        <CssBaseline />

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/highlight/:homeTeam/:awayTeam/date/:date" component={Highlight} />
            <Route exact path="/member/:type" component={Member} />
            <Route exact path="/member/:type/:email" component={MemberPreferences} />
            <Route exact path="/multiple/:category/:table/:identifier/:days/:location/:outcome/:rival/:ot/:sort" component={Category} />
            <Route exact path="/member/:type/:email/:table/:days/:sort" component={Custom} />
            <Route exact path="/standings/:order" component={Standings} />
            <Route component={Home} />
          </Switch>
        </Router>

        <Footer />
    </Fragment>
  );
}

export default App;