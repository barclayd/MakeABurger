import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 1.25,
    error: false
};

const burgerBuilder = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.SET_INGREDIENTS):
            return {
                ...state,
                // ingredients: action.ingredientsData
                ingredients: {
                    salad: action.ingredientsData.salad,
                    bacon: action.ingredientsData.bacon,
                    cheese: action.ingredientsData.cheese,
                    meat: action.ingredientsData.meat
                },
                error: false,
                totalPrice: initialState.totalPrice
            };
        case(actionTypes.ADD_INGREDIENTS):
            return {
                ...state,
                totalPrice: action.updatedPrice,
                ingredients: action.ingredientsData
            };
        case(actionTypes.REMOVE_INGREDIENTS):
            return {
                ...state,
                totalPrice: action.updatedPrice,
                ingredients: action.ingredientsData,
            };
        case(actionTypes.SET_INGREDIENTS_FAILED):
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default burgerBuilder;
