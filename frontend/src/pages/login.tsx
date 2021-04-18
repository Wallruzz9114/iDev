import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import { useLoginMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

interface ILoginProps {
  email: string;
  password: string;
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

const LinkParagraph = styled.p`
  cursor: pointer;
  text-align: left;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginScreen: React.FC<{}> = () => {
  const [login] = useLoginMutation();

  const submitForm = async (values: ILoginProps, { setValues }: FormikHelpers<ILoginProps>) => {
    const response = await login({ variables: { input: { ...values } } });
    console.log(response);
    setValues({ email: '', password: '' });
  };

  return (
    <Layout>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={submitForm}>
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
              <InputDiv
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                name="password"
              />
              <ButtonDiv type="submit">Login</ButtonDiv>
              <NextLink href="forgot-password">
                <LinkParagraph>Forgot Password?</LinkParagraph>
              </NextLink>
            </ContainerDiv>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(LoginScreen);
