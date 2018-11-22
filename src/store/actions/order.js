import * as actionTypes from './actionTypes';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.INIT_PURCHASE_BURGER,
        orderData: orderData,
        token: token
    }
};

export const fetchOrdersSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orderData: orderData
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.INIT_FETCH_ORDERS,
        token: token,
        userId: userId
    }
};
