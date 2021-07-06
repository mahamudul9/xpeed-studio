import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import TableList from './Components/TableList/TableList';
import GetForm from './Components/GetForm/GetForm';
import UpdateForm from './Components/UpdateForm/UpdateForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <TableList />
        </Route>
        <Route path="/table-list">
          <TableList />
        </Route>
        <Route path="/get-form">
          <GetForm />
        </Route>
        <Route path="/update-form/:id">
          <UpdateForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
