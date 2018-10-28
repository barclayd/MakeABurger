import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import MakeABurger from "./containers/MakeABurger/MakeABurger";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <MakeABurger />
        </Layout>
      </div>
    );
  }
}

export default App;
