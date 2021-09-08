import React, { useState } from 'react';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import '../../css/sign-in.styles.css';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({ email: '', password: '' });

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    //if name is email dynamically set name to email
    //if name is password dynamically set password
    //this is so we don't need two handler function for email and password
    setCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  return (
    <div className='sign-in' onSubmit={handleSubmit}>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form>
        <FormInput
          name='email'
          label='email'
          type='email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name='password'
          label='password'
          type='password'
          value={password}
          handleChange={handleChange}
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          {/* props isGoogleSignIn passes true if no value is assigned */}
          <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
