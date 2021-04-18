import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import { useHandleForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

interface IForgotPasswordProps {
  email: string;
}

const ContainerDiv = styled.div`
  width: 400px;
  text-align: center;
  margin: 50px auto;
`;

const InputDiv = styled.input`
  width: 100%;
  display: block;
  margin-bottom: 5px;
  padding: 6px;
`;

const ButtonDiv = styled.button`
  width: 50%;
  font-size: 20px;
  background: green;
  cursor: pointer;
  color: white;
  padding: 15px;
  outline: none;
  border: none;
  &:hover {
    background: teal;
  }
`;

const ForgotPasswordScreen: React.FC<{}> = () => {
  const [handleForgotPassword] = useHandleForgotPasswordMutation();

  const submitForm = async (
    { email }: IForgotPasswordProps,
    { setValues }: FormikHelpers<IForgotPasswordProps>
  ) => {
    await handleForgotPassword({ variables: { email } });
    setValues({ email: '' });
  };

  return (
    <Layout>
      <Formik initialValues={{ email: '' }} onSubmit={submitForm}>
        {({ values, handleChange }) => (
          <Form>
            <ContainerDiv>
              <InputDiv
                type="text"
                placeholder="Email"
                onChange={handleChange}
                value={values.email}
                name="email"
              />
              <ButtonDiv type="submit">Submit</ButtonDiv>
            </ContainerDiv>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ForgotPasswordScreen);
