import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import styled from "styled-components";
import {Store} from '../../index'



const StripeButton = () => {
  const publishableKey = "pk_test_UoZqVOHUhJfAEAvXBPJyzYNZ";

  const {state, dispatch} = useContext(Store);

  const onToken = token => {
    const body = {
      amount: 500,
      token: token
    };
    axios
      .post("https://fitmetrix.herokuapp.com/api/settings/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
        dispatch({type: 'USER_MODEL', payload:{premium: true}})
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  return (
    <StyleCheckout
      label="Upgrade" //Component button text
      name="fitmetrix" //Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Upgrade" //Submit button in modal
      amount={500} //Amount in cents $5.00
      token={onToken}
      stripeKey={publishableKey}
      image="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" //Pop-in header image
      billingAddress={false} //asks for less info. Delete to ask for billing address
    >
      <StripeStyle>Upgrade to Premium</StripeStyle>
    </StyleCheckout>
  );
};
export default StripeButton;

const StripeStyle = styled.button`
  background-color: ${props => props.theme.accent}
  font-size: 1.4rem;

  position: relative;
  display: block;
  height: 40px;
  color: white;
  font-weight: bold;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  border-radius: 5px;
  text-align:center;
  width: 180px;
  padding 5px 50 px;
  justify-content:center;
`;

const StyleCheckout = styled(StripeCheckout)`

`;
