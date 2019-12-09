import React from 'react';
import './App.css';
import './Form.css';
import Home from './LandingPage/Home';
import GettingStarted from './LandingPage/GettingStarted';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Buyer Pages
import LandingPage from './LandingPage/LandingPage'
import BuyerSignIn from './SignIn/BuyerSignIn';
import BuyerSignUp from './SignUp/BuyerSignUpForm';
import BuyerHomePage from './BuyerPages/BuyerHomePage';
import BuyerProfilePage from './Profiles/BuyerProfilePage'
import BuyerSearchPage from './BuyerPages/BuyerSearchPage';
import BuyerRestaurantDetailsPage from './BuyerPages/BuyerRestaurantDetailsPage';
import BuyerOrderPage from './BuyerPages/BuyerOrdersPage';

// Import Owner Pages
import OwnerSignUp from './SignUp/OwnerSignUpForm';
import OwnerSignIn from './SignIn/OwnerSignIn';
import CompOwnerPage from './OwnerPages/CompOwnerPage';


class Main extends Component {
    

    render(){
        return(
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/BuyerSignUp" component={BuyerSignUp} />
        <Route path="/BuyerSignIn" component={BuyerSignIn} />
        <Route path='/BuyerHomePage' component={BuyerHomePage}/>
        <Route path="/BuyerProfilePage" component={BuyerProfilePage} />
        <Route path="/BuyerSearchPage" component={BuyerSearchPage}/>
        <Route path='/BuyerRestaurantDetailsPage' component={BuyerRestaurantDetailsPage}/>
        <Route path='/BuyerOrderPage' component={BuyerOrderPage}/>
        {/* Owner Components */}
        <Route path="/OwnerSignUp" component={OwnerSignUp} />
        <Route path="/OwnerSignIn" component={OwnerSignIn} />
        <Route path='/OwnerHomePage' component={CompOwnerPage}/>
        {/* <Route path='/buyerOrdersPage' component={BuyerOrdersPage}/> */}
      </div>
    </Router>
  );
}
}
export default Main;
