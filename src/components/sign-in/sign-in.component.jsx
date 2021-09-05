import React from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import '../../css/sign-in.styles.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({
        email: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    //if name is email dynamically set name to email
    //if name is password dynamically set password
    //this is so we don't need two handler function for email and password
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className='sign-in' onSubmit={this.handleSubmit}>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form>
          <FormInput
            name='email'
            label='email'
            type='email'
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name='password'
            label='password'
            type='password'
            value={password}
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            {/* props isGoogleSignIn passes true if no value is assigned */}
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
