import React from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

        const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                    <span
                        style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>
                        : {props.ingredients[igKey]}
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
                <p>Total Price: <strong>£{Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={props.cancelBtn} btnType='Danger'>CANCEL</Button>
                <Button clicked={props.continueBtn} btnType='Success'>CONTINUE</Button>
            </Aux>
        )
};

const mapStateToProps = state => {
    return {
        totalPrice: state.burgerBuilder.totalPrice
    }
};

export default connect(mapStateToProps)(orderSummary);
