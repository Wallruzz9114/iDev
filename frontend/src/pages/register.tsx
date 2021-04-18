import { Form, Formik, FormikHelpers } from 'formik';
import styled from 'styled-components';
import Layout from '../components/shared/Layout';
import { useRegisterMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

interface IRegisterProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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

const RegisterScreen: React.FC<{}> = () => {
  const [register] = useRegisterMutation();

  const submitForm = async (
    values: IRegisterProps,
    { setValues }: FormikHelpers<IRegisterProps>
  ) => {
    const response = await register({ variables: { input: { ...values } } });
    console.log(response);
    setValues({ email: '', password: '', firstName: '', lastName: '' });
  };

  return (
    <Layout>
      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
        onSubmit={submitForm}
      >
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
              <InputDiv
                type="text"
                placeholder="First name"
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
              />
              <InputDiv
                type="text"
                placeholder="Last name"
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
              />
              <ButtonDiv type="submit">Register</ButtonDiv>
            </ContainerDiv>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(RegisterScreen);
