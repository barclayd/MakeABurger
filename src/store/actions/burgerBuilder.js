import * as actionTypes from '../actions/actionTypes';

export const addIngredient = (ingredientsData, updatedPrice) => {
    return {
        type: actionTypes.ADD_INGREDINETS,
        ingredientsData: ingredientsData,
        updatedPrice: updatedPrice
    };
};

export const removeIngredient = (ingredientsData, updatedPrice) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientsData: ingredientsData,
        updatedPrice: updatedPrice
    };
};
