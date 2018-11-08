import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import * as actionTypes from '../../store/actions';
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


class BurgerBuilder extends Component {
    // constructor() {
    //     super();
    //     this.purchaseHandler = this.purchaseHandler.bind(this);
    // }
    state = {
        // ingredients: null,
        // totalPrice: 1.25,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
        errorMessage: null
    };

    componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json')
            // .then(response => {
            //     this.setState({
            //         ingredients: response.data
            //     })
            // })
            .then(response => {
                this.props.onRetrieveIngredientsFromDB(response.data);
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMessage: error
                })
            })
    }

    updatePurchasableState (ingredients) {
        let sum = Object.keys(ingredients);
        console.log(sum);
        sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        const updatedPrice = priceAddition + oldPrice;
        // this.setState({
        //     totalPrice: updatedPrice,
        //     ingredients: updatedIngredients
        // });
        this.props.onAddIngredients(updatedIngredients, updatedPrice);
        this.updatePurchasableState(updatedIngredients);
    };


    removeIngredientsHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.props.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.totalPrice;
        let updatedPrice = priceAddition - oldPrice;
        if(updatedPrice < 0) {
            updatedPrice = updatedPrice*-1;
        }
        // this.setState({
        //     totalPrice: updatedPrice,
        //     ingredients: updatedIngredients
        // });
        this.props.onRemoveIngredients(updatedIngredients, updatedPrice);
        this.updatePurchasableState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        // let queryParams = [];
        // for(let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
        // }
        // queryParams.push('price='+this.props.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render () {

        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.totalPrice}
                        ordered={this.purchaseHandler}
                        increaseIngredient={this.addIngredientsHandler}
                        decreaseIngredient={this.removeIngredientsHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}/>
                </Aux>);
                orderSummary = <OrderSummary
                    ingredients={this.props.ingredients}
                    continueBtn={this.purchaseContinueHandler}
                    cancelBtn={this.purchaseCancelHandler}
                    price={this.props.totalPrice}/>;
            }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }



        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRetrieveIngredientsFromDB: (ingredientsData) => dispatch({type: actionTypes.INGREDIENTS_DB, ingredientsData: ingredientsData}),
        onAddIngredients: (updatedIngredients, updatedPrice) => dispatch({type: actionTypes.ADD_INGREDINETS, updatedIngredients: updatedIngredients, updatedPrice: updatedPrice}),
        onRemoveIngredients: (updatedIngredients, updatedPrice) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, updatedIngredients: updatedIngredients, updatedPrice: updatedPrice})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
