import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            houseName: '',
            street: '',
            postcode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        // prevents <form> default to reload page to send a request
        event.preventDefault();
        this.setState({
                    loading: true
                });
                // alert('You have chosen to continue!');
                const order = {
                    ingredients: this.props.ingredients,
                    price: this.props.price,
                    customer: {
                        name: 'Daniel Barclay',
                        address: {
                            street: 'Salisbury Road',
                            postcode: 'CF24 4AD',
                            country: 'United Kingdom'
                        },
                        email: 'test@test.com'
                    },
                    deliveryMethod: 'deliveroo'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            })
    };

    render() {
        let form =
            (
            <form>
                <Input inputtype='input' type='text' name='name' placeholder='Your name' />
                <Input inputtype='input' type='email' name='email' placeholder='Your email' />
                <Input inputtype='input' type='text' name='street' placeholder='Street Address' />
                <Input inputtype='input' type='text' name='postal' placeholder='Post Code' />
                <Button btnType='Success' clicked={this.orderHandler}>PLACE ORDER</Button>
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
export default ContactData;
