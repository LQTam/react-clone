import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <CTA>
        <CTALogoOne src="images/cta-logo-one.svg" />
        <SignUp href="/">GET ALL THERE</SignUp>
        <Description>
          Stream Marvel Studios' Black Widow with Premier Access the same day
          it’s in theaters.
        </Description>
        <CTALogoTwo src="images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  display: flex;
  align-items: top;
  justify-content: center;

  &:before {
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("/images/login-background.jpg");
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    z-index: -1;
    opacity: 0.7;
  }
`;

const CTA = styled.div`
  max-width: 650px;
  padding: 80px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
`;

const CTALogoOne = styled.img``;

const SignUp = styled.a`
  width: 100%;
  text-align: center;
  background-color: #0063e5;
  font-weight: bold;
  padding: 17px 0;
  color: #f9f9f9;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: all 250ms;
  letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  line-height: 1.5;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
`;

const CTALogoTwo = styled.img`
  width: 90%;
`;
