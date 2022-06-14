import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import { object, string } from 'yup';
import Input from './Input';
import { doc, collection, setDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firbaseUtils';
import * as DocumentPicker from 'expo-document-picker';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';

const CreateFarmForm = () => {
  const [image, setImage] = useState<File | Blob>({} as File | Blob);
  const farmRef = doc(collection(db, 'farms'));
  const storageRef = ref(storage, `farms/${farmRef.id}`);
  const listRef = ref(storage, `farms`);
  const farmSchema = object({
    name: string().required(),
    about: string().required(),
    address: string().required(),
    phone: string(),
    website: string(),
    image: string(),
  });
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    // @ts-ignore
    setImage(result.file);
    console.log(result);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        about: '',
        address: '',
        phone: '',
        website: '',
        image: '',
      }}
      validationSchema={farmSchema}
      onSubmit={async (values) => {
        console.log(values);
        await uploadBytes(storageRef, image)
          .then(() => {
            console.log('uploaded');
          })
          .catch((err) => {
            console.log(err);
          });
        await getDownloadURL(ref(storage, `farms/${farmRef.id}`))
          .then((url) => {
            console.log(url);
            values.image = url;
          })
          .catch((error) => {
            console.log(error);
          });
        await setDoc(farmRef, values);
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
              numberOfLines={6}
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
          <TouchableOpacity>
            <Button onPress={pickDocument} title='Upload Image' />
          </TouchableOpacity>
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
    gap: 10,
  },
  inputStyle: {
    flex: 1,
    gap: 5,
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

export default CreateFarmForm;
