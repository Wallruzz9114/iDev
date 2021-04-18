import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/shared/Layout';
import { useChangePasswordMutation } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

const Container = styled.div`
  width: 400px;
  text-align: center;
  margin: 50px auto;
`;

const Input = styled.input`
  width: 100%;
  display: block;
  margin-bottom: 5px;
  padding: 6px;
`;

const Button = styled.button`
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

const ChangePassword: React.FC<{}> = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const submitForm = async ({ newPassword }) => {
    const { token } = router.query;
    const response = await changePassword({
      variables: {
        token: typeof token === 'string' ? token : '',
        newPassword,
      },
    });

    console.log(response);
  };

  return (
    <Layout>
      <Formik initialValues={{ newPassword: '' }} onSubmit={submitForm}>
        {({ values, handleChange }) => (
          <Form>
            <Container>
              <Input
                type="password"
                placeholder="New password"
                onChange={handleChange}
                value={values.newPassword}
                name="newPassword"
              />
              <Button type="submit">Submit</Button>
            </Container>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
