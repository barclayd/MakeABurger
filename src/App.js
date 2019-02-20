import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BuildYourBurger/BurgerBuilder";
import Logout from './containers/Auth/Logout/Logout'
import asyncComponent from './hoc/asynComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncLogin = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

const app = props => {

    useEffect(() => {
        props.onTryAutoSignIn();
    }, []);

        let routes = (
            <Switch>
                <Route path='/login' exact  component={asyncLogin}/>
                <Route path='/' exact  component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/login' exact  component={asyncLogin}/>
                    <Route path='/logout' exact  component={Logout}/>
                    <Route path='/' exact  component={BurgerBuilder}/>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/orders' exact  component={asyncOrders}/>
                    <Redirect to='/'/>
                </Switch>
            )
        }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !==null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
