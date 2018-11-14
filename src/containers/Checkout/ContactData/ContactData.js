import React, {Component} from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'

class ContactData extends Component {

    state = {
       orderForm: {
               name: {
                   elementType: 'input',
                   elementConfig: {
                        type: 'text',
                        placeholder: 'Name'
                   },
                   value: '',
                   validation: {
                       required: true
                   },
                   valid: false,
                   touched: false
               },
               street: {
                   elementType: 'input',
                   elementConfig: {
                       type: 'text',
                       placeholder: 'Address'
                   },
                   value: '',
                   validation: {
                       required: true
                   },
                   valid: false,
                   touched: false
               },
               postcode: {
                   elementType: 'input',
                   elementConfig: {
                       type: 'text',
                       placeholder: 'Postcode'
                   },
                   value: '',
                   validation: {
                       required: true,
                       minLength: 5,
                       maxLength: 8
                   },
                   valid: false,
                   touched: false
               },
               country: {
                   elementType: 'input',
                   elementConfig: {
                       type: 'text',
                       placeholder: 'Country'
                   },
                   value: '',
                   validation: {
                       required: true
                   },
                   valid: false,
                   touched: false
               },
               email: {
                   elementType: 'input',
                   elementConfig: {
                       type: 'email',
                       placeholder: 'Email address'
                   },
                   value: '',
                   validation: {},
                   valid: false,
                   touched: false
               },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [{
                            value: 'deliveroo',
                            displayValue: 'Deliverroo'
                        }, {
                            value: 'ubereats',
                            displayValue: 'Uber Eats'
                        },
                            {
                                value: 'localpickup',
                                displayValue: 'Pickup in Store'
                            }]
                    },
                    validation: {
                        required: false
                    },
                    value: 'localpickup',
                    valid: true
                }
        },
        loading: false,
        formIsValid: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
       const updatedFormElement = {
           ...updatedOrderForm[inputIdentifier]
       };
       updatedFormElement.value = event.target.value;
       updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
       updatedFormElement.touched = true;
       updatedOrderForm[inputIdentifier] = updatedFormElement;

       let formIsValid = true;
       for(let inputIdentifier in updatedOrderForm) {
           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
       }
       console.log(formIsValid);
       this.setState({
           orderForm: updatedOrderForm,
           formIsValid: formIsValid
       });
    };


    orderHandler = (event) => {
        // prevents <form> default to reload page to send a request
        event.preventDefault();
        this.setState({
                    loading: true
                });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
                // alert('You have chosen to continue!');
                const order = {
                    ingredients: this.props.ingredients,
                    price: this.props.totalPrice,
                    orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
                this.props.onCheckoutComplete('complete');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            })
    };

    render() {

        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });

        }

        let form =
            (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button disabled={!this.state.formIsValid} btnType='Success'>PLACE ORDER</Button>
            </form>
            );
        if(this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter delivery information</h4>
                {form}
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        totalPrice: state.totalPrice,
        ingredients: state.ingredients
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCheckoutComplete: (complete) => dispatch({type: actionTypes.FLUSH_PRICE, complete: complete})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
