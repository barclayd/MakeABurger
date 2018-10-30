import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerToggleHandler = () => {

      this.setState( ( prevState ) => {
          return {showSideDrawer: !prevState.showSideDrawer};
      });
    };

    render() {
        return (
            <Aux>
                <Toolbar toggleSideBar={this.sideDrawerToggleHandler} openSideDrawer={this.state.showSideDrawer}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerToggleHandler}/>
                <main className={classes.Content}> {this.props.children} </main>
            </Aux>

        )
    }
}

export default Layout;
