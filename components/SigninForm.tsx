import { Formik } from 'formik';
import React from 'react';
import { Text, View } from './Themed';
import { TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firbaseUtils';
import { signinSchema } from '../schemas/signinSchema';

type Props = {
  navigateToHome: () => void;
  navigateToSignUp: () => void;
};
const SignInForm = ({ navigateToHome, navigateToSignUp }: Props) => {
  const [signInError, setSignInError] = React.useState<string>('');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signinSchema}
      onSubmit={(values) => {
        console.log(values);
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then(() => {
            localStorage.setItem('email', values.email);
            navigateToHome();
          })
          .catch((error) => {
            console.log(error);
            setSignInError(error.message);
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
          {signInError.length > 0 && (
            <Text testID='signin-error' style={styles.error}>
              Error: {signInError}
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
              title='Sign In'
              testID='signin-button'
            />
            <Button
              testID='return-to-signup'
              title='Sign Up'
              onPress={() => navigateToSignUp()}
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
export default SignInForm;
