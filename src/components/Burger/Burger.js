import React from 'react';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredents";
import classes from './Burger.css';

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredients key={ingKey + i} type={ingKey}/>
                });
        });

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredients type='bread-bottom'/>
        </div>
    );
};

export default burger;
