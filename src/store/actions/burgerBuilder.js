import * as actionTypes from '../actions/actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (ingredientsData, updatedPrice) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
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

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredientsData: ingredients
    }
};

export const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED,
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
               dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(setIngredientsFailed());
            })
    };
};
