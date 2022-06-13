import { Formik } from 'formik';
import React from 'react';
import { Text, View } from '../components/Themed';
import { TextInput, Button, StyleSheet } from 'react-native';
import { object, string } from 'yup';
import { signUp } from '../utils/initializeFirebase';

const SignupForm = () => {
  const signinSchema = object({
    email: string().email().required(),
    password: string().required(),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        signUp,
      }}
      validationSchema={signinSchema}
      onSubmit={(values) => {
        console.log(values);
        signUp(values.email, values.password);
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
            <Button title='Sign In' color='transparent' />
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
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
export default SignupForm;
