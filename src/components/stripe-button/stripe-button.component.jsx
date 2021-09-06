import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IWvmnHKcDyHKe8bR601LT78LmDZolX1dBHk6awY9glZGk3GLZJzzIXud5PYoZ4tm87snhxJqLAeYtzVhYgBImuE00yyuZXGrF';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful');
  };
  return (
    <StripeCheckout
      label='Pay Now'
      stripeKey={publishableKey}
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
    />
  );
};

export default StripeCheckoutButton;
