import { Field, Formik } from 'formik';
import React from 'react';
import { Text, View } from '../components/Themed';
import { Button, Pressable, StyleSheet, TextInput } from 'react-native';
import { object, string } from 'yup';
import Input from './Input';

const CreateFarmForm = () => {
  const farmSchema = object({
    name: string().required(),
    about: string().required(),
    address: string().required(),
    phone: string(),
    website: string(),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        about: '',
        address: '',
        phone: '',
        website: '',
      }}
      validationSchema={farmSchema}
      onSubmit={(values) => {
        console.log(values);
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
        <View style={styles.container}>
          {/* {signInError.length > 0 && (
            <Text style={styles.error}>{signInError}</Text>
          )} */}
          {/* <View>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}
          </View> */}
          <Field name='name' component={Input} label='Name' />
          <View style={styles.inputStyle}>
            <Text style={styles.inputLabel}>About</Text>
            <TextInput
              multiline
              numberOfLines={4}
              style={styles.input}
              onChangeText={handleChange('about')}
              onBlur={handleBlur('about')}
              value={values.about}
            />
            {touched.about && errors.about && (
              <Text style={styles.error}>{errors.about}</Text>
            )}
          </View>
          <Field name='address' component={Input} label='Address' />
          <Field name='phone' component={Input} label='Phone' />
          <Field name='website' component={Input} label='Website' />
          {/* @ts-ignore */}
          <Button title='Submit' onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
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

export default CreateFarmForm;
