import { Formik } from 'formik';
import React from 'react';
import { Text, View } from '../components/Themed';
import { TextInput, Button, StyleSheet } from 'react-native';
import { object, string } from 'yup';
import { signUp } from '../utils/firbaseUtils';

type Props = {
  navigateToSignIn: () => void;
};
const SignupForm = ({ navigateToSignIn }: Props) => {
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
        signUp(values.email, values.password)
          .then(() => {
            navigateToSignIn();
          })
          .catch((error) => {
            console.log(error);
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
        resetForm,
      }) => (
        <View>
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
              onPress={() => {
                handleSubmit();
                resetForm();
              }}
              title='Sign Up'
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
