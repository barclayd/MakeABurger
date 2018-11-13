import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {

    const onCheckoutCancelledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };
        return (
            <div>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    onCheckoutCancelled={onCheckoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}/>
                <Route path={props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        )
    };

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);

