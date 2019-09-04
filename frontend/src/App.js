import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';

import Home from './ui/Home';
import AuthPage from './ui/components/Forms/AuthForm';
import AllServicesPage from './ui/components/Services/AllServicesPage';
import AllEventsPage from './ui/components/Events/AllEventsPage';
import SingleCategoryPage from './ui/components/Categories/SingleCategoryPage';
import DetailsPage from './ui/components/Details/DetailsPage';
import SupplierDashboard from './ui/suppliers/Dashboard/Dashboard';
import SupplierRevervation from './ui/components/Supplier/SupplierRegistration';

import {autoSignIn} from './store/actions';

/* Admin Pages */
import Admin from './ui/admin/Admin';
import AdminLogin from './ui/admin/AdminLogin/AdminLogin';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSiginIn()
  }
  render() {
      return (
        <BrowserRouter>
            <Route path="/" exact component={Home}  />
            <Route path="/auth" exact component={AuthPage}  />
            <Route path="/annonces" exact component={AllEventsPage}  />
            <Route path="/services" exact component={AllServicesPage}  />
            <Route path="/supplier" exact component={SupplierRevervation}  />
            <Route path="/category/:id" component={SingleCategoryPage}  />
            <Route path="/service/details/:id" component={DetailsPage}  />
            <Route path="/dashboard/reservations" component={SupplierDashboard}  />
    
            {/* Admin Routes */}
            <Route path="/auth/admin" exact component={AdminLogin} />
            <Route path="/admin" component={Admin} />
        </BrowserRouter>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSiginIn: () => dispatch(autoSignIn())
  }
}

export default connect(null, mapDispatchToProps)(App);
