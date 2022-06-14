import { Formik } from 'formik';
import React from 'react';
import { Text, View } from '../components/Themed';
import { TextInput, Button, StyleSheet } from 'react-native';
import { object, string } from 'yup';
import { auth, signUp } from '../utils/firbaseUtils';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type Props = {
  navigateToSignIn: () => void;
};
const SignupForm = ({ navigateToSignIn }: Props) => {
  const [signUpError, setSignUpError] = React.useState<string>('');
  const signupSchema = object({
    email: string().email().required(),
    password: string().required(),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signupSchema}
      onSubmit={(values) => {
        console.log(values);
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(() => {
            navigateToSignIn();
          })
          .catch((error) => {
            console.log(error);
            setSignUpError(error.message);
          });
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          {signUpError.length > 0 && (
            <Text testID='signin-error' style={styles.error}>
              {signUpError}
            </Text>
          )}
          <View style={styles.inputStyle}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              testID='email'
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.inputStyle}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              testID='password'
              secureTextEntry
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={handleSubmit}
              title='Sign Up'
              testID='signup-button'
            />
            <Button
              title='Sign In'
              onPress={() => navigateToSignIn()}
              color='transparent'
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    gap: 10,
  },
  buttons: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    gap: 10,
  },
  signInBtn: {
    backgroundColor: 'transparent',
  },
  input: {
    backgroundColor: '#1B1B1B',
    color: '#fff',
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
export default SignupForm;
