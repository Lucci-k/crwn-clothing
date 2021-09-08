import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './css/App.styles.css';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { getDoc } from '@firebase/firestore';
import CurrentUserContext from './contexts/current-user/current-user.context';

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
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            path='/signin'
            render={() => {
              if (this.state.currentUser) {
                return <Redirect to='/' />;
              } else {
                return <SignInAndSignUpPage />;
              }
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
