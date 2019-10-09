import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';

import Home from './ui/Home';
import SignupPage from './ui/components/Forms/SignupPage';
import LoginPage from './ui/components/Forms/LoginPage';
import AllServicesPage from './ui/components/Services/AllServicesPage';
import AllEventsPage from './ui/components/Events/AllEventsPage';
import SingleCategoryPage from './ui/components/Categories/SingleCategoryPage';
import DetailsPage from './ui/components/Details/DetailsPage';
import SupplierDashboard from './ui/suppliers/Dashboard/Dashboard';
import SupplierRegistration from './ui/components/Supplier/SupplierRegistration';
import SupplierConfirmationForm from './ui/components/Supplier/SupplierConfirmationForm';
import Gallery from './ui/users/Gallery/GalleryPage';
import UserGallery from './ui/users/Gallery/UserGallery';
import Profile from './ui/users/Profile/Profile';
import Notifications from './ui/users/Notifications/NotificationsPage';
import UserReservations from './ui/users/Reservations/Reservations';
import FilterResults from './ui/components/Filter/FilterResults';

import {autoSignIn} from './store/actions';

/* Admin Pages */
import Admin from './ui/admin/Admin';
import {PrivateRoute} from './ui/utils/PrivateRoute';

class App extends Component {
  componentDidMount() {
    if(!this.props.user) {
      this.props.onAutoSiginIn();
    }
  }

  render() {
      return (
        <BrowserRouter>
            <Route path="/" exact component={Home}  />
            <Route path="/auth/login" exact component={LoginPage}  />
            <Route path="/auth/signup" exact component={SignupPage}  />
            <Route path="/events" exact component={AllEventsPage}  />
            <Route path="/services" exact component={AllServicesPage}  />
            <Route path="/supplier" exact component={SupplierRegistration}  />
            <Route path="/supplier/:id/account/confirmation" exact component={SupplierConfirmationForm}  />
            <Route path="/:AnounceType/category/:id" exact component={SingleCategoryPage}  />
            <Route path="/category/:id" exact component={SingleCategoryPage}  />
            <Route path="/annonce/:anounceType/:id" exact component={DetailsPage}  />
            <Route path="/gallery" exact component={Gallery}  />
            <Route path="/filter" exact component={() => <FilterResults filter={localStorage.getItem("searchParams")} />}  />

            {/* Supplier Routes */}
            <PrivateRoute path="/dashboard/reservations" exact component={SupplierDashboard}  />

            {/* User Routes */}
            <PrivateRoute path="/user/profile" exact component={Profile}  />
            <PrivateRoute path="/user/notifications" exact component={Notifications}  />
            <PrivateRoute path="/user/reservations" exact component={UserReservations}  />
            <PrivateRoute path="/user/gallery" exact component={UserGallery}  />
    
            {/* Admin Routes */}
            <PrivateRoute path="/admin" component={Admin} />
        </BrowserRouter>
      );
  }
}

const mapPropsToState = state => {
  return {
    user: state.auth.user,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSiginIn: () => dispatch(autoSignIn())
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App);
