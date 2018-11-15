import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render () {
        let summary = <Redirect to='/'/>;
        if (this.props.ingredients) {
            const purchaseRedirect = this.props.purchased ?  <Redirect to='/' /> : null;
            summary =
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                    ingredients={this.props.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.orderBuilder.purchased
    }
};

export default connect(mapStateToProps)(Checkout);

