import { Formik } from 'formik';
import React from 'react';
import { Text, View } from './Themed';
import { TextInput, Button, StyleSheet } from 'react-native';
import { object, string } from 'yup';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firbaseUtils';

type Props = {
  navigateToHome: () => void;
};
const SignInForm = ({ navigateToHome }: Props) => {
  const [signInError, setSignInError] = React.useState<string>('');
  const signinSchema = object({
    email: string().email().required(),
    password: string().required(),
  });
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
            <Text style={styles.error}>{signInError}</Text>
          )}
          <View style={styles.inputStyle}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
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
            {/* @ts-ignore */}
            <Button onPress={handleSubmit} title='Sign Up' />
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
    backgroundColor: '#eee',
    padding: 5,
    fontSize: 15,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginVertical: 10,
  },
});
export default SignInForm;
