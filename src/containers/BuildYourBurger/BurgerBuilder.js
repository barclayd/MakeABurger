import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES  = {
    salad: 0.50,
    cheese: 0.75,
    meat: 1,
    bacon: 1.25
};


const burgerBuilder = props => {


    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        setPurchasable(sum > 0);
    };

    const addIngredientsHandler = (type) => {
        const oldCount = props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = props.totalPrice;
        const updatedPrice = priceAddition + oldPrice;
        props.onAddIngredients(updatedIngredients, updatedPrice);
        updatePurchasableState(updatedIngredients);
    };


    const removeIngredientsHandler = (type) => {
        const oldCount = props.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = props.totalPrice;
        let updatedPrice = priceAddition - oldPrice;
        if(updatedPrice < 0) {
            updatedPrice = updatedPrice*-1;
        }
        props.onRemoveIngredients(updatedIngredients, updatedPrice);
        updatePurchasableState(updatedIngredients);
    };

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/login');
        }

    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push({
            pathname: '/checkout'
        });
    };

    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0

    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if(props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                    isAuth={props.isAuthenticated}
                    price={props.totalPrice.toFixed(2)}
                    ordered={purchaseHandler}
                    increaseIngredient={addIngredientsHandler}
                    decreaseIngredient={removeIngredientsHandler}
                    disabled={disabledInfo}
                    purchasable={purchasable}/>
            </Aux>);
            orderSummary = <OrderSummary
                ingredients={props.ingredients}
                continueBtn={purchaseContinueHandler}
                cancelBtn={purchaseCancelHandler}
                price={props.totalPrice}/>;
        }



        return (
            <Aux>
                <Modal
                    show={purchasing}
                    modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onAddIngredients: (updatedIngredients, updatedPrice) => dispatch(actions.addIngredient(updatedIngredients, updatedPrice)),
        onRemoveIngredients: (updatedIngredients, updatedPrice) => dispatch(actions.removeIngredient(updatedIngredients, updatedPrice)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
