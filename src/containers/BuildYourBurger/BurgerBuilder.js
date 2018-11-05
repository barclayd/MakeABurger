import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
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
        ingredients: null,
        totalPrice: 3.75,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
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
        });
        this.updatePurchasableState(updatedIngredients);
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
        // this.setState({
        //         //     loading: true
        //         // });
        //         // // alert('You have chosen to continue!');
        //         // const order = {
        //         //     ingredients: this.state.ingredients,
        //         //     price: this.state.totalPrice,
        //         //     customer: {
        //         //         name: 'Daniel Barclay',
        //         //         address: {
        //         //             street: 'Salisbury Road',
        //         //             postcode: 'CF24 4AD',
        //         //             country: 'United Kingdom'
        //         //         },
        //         //         email: 'test@test.com'
        //         //     },
        //         //     deliveryMethod: 'deliveroo'
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        let queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0

        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                        increaseIngredient={this.addIngredientsHandler}
                        decreaseIngredient={this.removeIngredientsHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}/>
                </Aux>);
                orderSummary = <OrderSummary
                    ingredients={this.state.ingredients}
                    continueBtn={this.purchaseContinueHandler}
                    cancelBtn={this.purchaseCancelHandler}
                    price={this.state.totalPrice}/>;
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
export default withErrorHandler(BurgerBuilder, axios);
