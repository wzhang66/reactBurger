import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter } from 'react-router-dom';
import CheckOut from './containers/CheckOut/CheckOut';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder />
          <CheckOut />
        </Layout>
      </div>
    );
  }
}

export default App;
