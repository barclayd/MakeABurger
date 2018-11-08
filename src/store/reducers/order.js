import * as actionTypes from '../actions';

const initialState = {
    ingredients: {},
    totalPrice: 1.75
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.INGREDIENTS_DB):
            return {
                ...state,
                ingredients: action.ingredientsData
            };
        case(actionTypes.REMOVE_INGREDIENTS):
            return {
                ...state,
                totalPrice: action.updatedPrice,
                ingredients: action.updatedIngredients
            };
        case(actionTypes.ADD_INGREDINETS):
            return {
                ...state,
                totalPrice: action.updatedPrice,
                ingredients: action.updatedIngredients
            };
        default:
            return state;
    }
};

export default reducer;
