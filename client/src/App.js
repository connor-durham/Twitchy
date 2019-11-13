import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"
import Header from "./components/Header"
import Games from "./components/Games"
import Streams from "./components/Streams"
import GameStreams from "./components/GameStreams"
import Homepage from "./components/Homepage"
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';


Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/homepage" component={Homepage}></Route>
        <Route exact path="/game/:id" component={GameStreams}></Route>
        <Route exact path="/top-streams" component={Streams}></Route>
        <Route exact path="/" component={Games}></Route>
        <div className="footer"></div>
    </Router>
    );

  }
}


export default withAuthenticator(App, false);
