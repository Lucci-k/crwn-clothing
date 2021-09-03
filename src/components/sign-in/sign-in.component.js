import React from 'react';
import FormInput from '../form-input/form-input.component';
import '../../css/sign-in.styles.css'
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      email: '',
      password: '',
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      email: '',
      password: ''
    })
  };

  handleChange = event => {
    const { value, name } = event.target;

    //if name is email dynamically set name to email 
    //if name is password dynamically set password
    //this is so we don't need two handler function for email and password
    this.setState({
      [name]: value
    })
  }

  render() {
    return(
      <div className='sign-in' onSubmit={this.handleSubmit}>
        <h2>I already have and account</h2>
        <span>Sign in with your email and password</span>
        <form>
          <FormInput name='email' label='email' type='email' value={this.state.email} handleChange={this.handleChange} required />
          <FormInput name='password' label='password' type='password' value={this.state.password} handleChange={this.handleChange} required />
          <CustomButton type='submit' value='Submit Form'>Sign In</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn