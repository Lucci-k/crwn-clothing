import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './css/App.styles.css';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { getDoc } from '@firebase/firestore';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubsribeFromAuth = null;

  componentDidMount() {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userReference = await createUserProfileDocument(userAuth);
        const snapShot = await getDoc(userReference);
        const user = snapShot.data();

        this.setState({
          currentUser: {
            id: snapShot.id,
            ...user,
          },
        });
        console.log('Current State: ', this.state);
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubsribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
