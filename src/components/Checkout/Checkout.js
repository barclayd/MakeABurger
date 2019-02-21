import React from 'react';
import CheckoutSummary from '../Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from "../../containers/ContactData/ContactData";

const checkout = props => {

    const onCheckoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

        let summary = <Redirect to='/'/>;
        if (props.ingredients) {
            const purchaseRedirect = props.purchased ?  <Redirect to='/' /> : null;
            summary =
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                    ingredients={props.ingredients}
                    onCheckoutCancelled={onCheckoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                    <Route path={props.match.path + '/contact-data'}
                           component={ContactData}/>
                </div>
        }
        return summary;
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);

