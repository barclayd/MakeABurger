import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 1.25,
    error: false,
    building: false
};

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredientsData.salad,
            bacon: action.ingredientsData.bacon,
            cheese: action.ingredientsData.cheese,
            meat: action.ingredientsData.meat
        },
        error: false,
        totalPrice: initialState.totalPrice,
        building: false
    });
};

const modifyIngredients = (state, action) => {
    return updateObject(state, {
        totalPrice: action.updatedPrice,
        ingredients: action.ingredientsData,
        building: true
        });
};

const burgerBuilder = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.SET_INGREDIENTS): return setIngredient(state, action);
        case(actionTypes.ADD_INGREDIENTS): return modifyIngredients(state, action);
        case(actionTypes.REMOVE_INGREDIENTS): return modifyIngredients(state, action);
        case(actionTypes.SET_INGREDIENTS_FAILED): return updateObject(state, ({error: true}));
        default: return state;
    }
};

export default burgerBuilder;
