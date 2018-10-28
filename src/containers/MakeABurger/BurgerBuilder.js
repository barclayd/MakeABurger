import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES  = {
    salad: 0.75,
    cheese: 1,
    meat: 1.5,
    bacon: 2
};


class BurgerBuilder extends Component {

    state ={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5
    };

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = priceAddition + oldPrice;
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        })
        };


    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let updatedPrice = priceAddition - oldPrice;
        if(updatedPrice < 0) {
            updatedPrice = updatedPrice*-1;
        }
        this.setState({
            totalPrice: updatedPrice,
            ingredients: updatedIngredients
        });
    };


    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }


        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    increaseIngredient={this.addIngredientsHandler}
                    decreaseIngredient={this.removeIngredientsHandler}
                    disabled={disabledInfo}/>
            </Aux>
        )
    }

}
export default BurgerBuilder;
