import React from "react";
import styled from "styled-components";
import StripeButton from './BillingView.js';

const SettingsViewStyle = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  padding-bottom: 100px;
  position: absolute;
  top: 74px;
`;

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelDivStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputStyle = styled.input`
  height: 20px;
`;

const FormStyle = styled.form`
  width: 40%;
  margin-left: 5%;
`;

class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  render() {
    return (
      <SettingsViewStyle>
        <FormStyle>
          <LabelStyle>
            <LabelDivStyle>
              <p>Email:</p>
              <InputStyle
                type="text"
                name="email"
                placeholder="user@example.com"
              />
            </LabelDivStyle>
            <LabelDivStyle>
              <p>Phone:</p>
              <InputStyle type="text" name="phone" />
            </LabelDivStyle>
            <LabelDivStyle>
              <input type="checkbox" />
              <p>Emails?</p>
              <input type="checkbox" />
              <p>Texts?</p>
            </LabelDivStyle>
            <LabelDivStyle>
              <p>Old Password:</p>
              <InputStyle type="password" name="oldpassword" />
            </LabelDivStyle>
            <LabelDivStyle>
              <p>New Password:</p>
              <InputStyle type="password" name="newpassword" />
            </LabelDivStyle>
          </LabelStyle>
          <input type="submit" value="Save" />
        </FormStyle>
        <StripeButton />
      </SettingsViewStyle>
    );
  }
}

export default SettingsView;
