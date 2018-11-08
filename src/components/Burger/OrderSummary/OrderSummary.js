import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This could be changed back to a stateless function

    componentWillUpdate() {
        console.log('[Order Summary] willUpdated() was called');
    }


    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                    <span
                        style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                        : {this.props.ingredients[igKey]}
                    </li>
                )
            });

        return (

            <Aux>
                <h3>Your Order</h3>
                <p>Your delicious burger has the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price: <strong>£{this.props.totalPrice}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.cancelBtn} btnType='Danger'>CANCEL</Button>
                <Button clicked={this.props.continueBtn} btnType='Success'>CONTINUE</Button>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(OrderSummary);
