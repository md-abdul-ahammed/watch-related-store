import './App.css';
import Home from './Pages/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Explore from './Pages/Explore/Explore';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import ProductBuy from './Pages/ProductBuy/ProductBuy';
import Login from './Pages/Login/Login/Login';
import Register from './Pages/Login/Register/Register';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/explore'>
            <Explore></Explore>
          </Route>
          <PrivateRoute exact path='/productBuy/:id'>
            <ProductBuy></ProductBuy>
          </PrivateRoute>
          <Route exact path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/register'>
            <Register></Register>
          </Route>
          <Route exact path='/aboutUS'>
            <AboutUs></AboutUs>
          </Route>
          <Route exact path='/contactUs'>
            <ContactUs></ContactUs>
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
