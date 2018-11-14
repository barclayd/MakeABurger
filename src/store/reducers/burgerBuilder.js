import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {},
    totalPrice: 1.25
};

const burgerBuilder = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.INGREDIENTS_DB):
            return {
                ...state,
                ingredients: action.ingredientsData
            };
        case(actionTypes.ADD_INGREDINETS):
            return {
                ...state,
                totalPrice: action.updatedPrice,
                ingredients: action.updatedIngredients
            };
        case(actionTypes.REMOVE_INGREDIENTS):
            return {
                ...state,
                totalPrice: action.updatedPrice,
                ingredients: action.updatedIngredients
            };
        case(actionTypes.FLUSH_PRICE):
            return {
                ...state,
                totalPrice: initialState.totalPrice
            };
        default:
            return state;
    }
};

export default burgerBuilder;
