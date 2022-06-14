import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View } from '../components/Themed';
import { Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { object, string } from 'yup';
import Input from './Input';
import { doc, collection, setDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firbaseUtils';
import * as DocumentPicker from 'expo-document-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type Props = {
  navigateToHome: () => void;
};
const CreateFarmForm = ({ navigateToHome }: Props) => {
  const [image, setImage] = useState<File | Blob>({} as File | Blob);

  const farmRef = doc(collection(db, 'farms'));
  const storageRef = ref(storage, `farms/${farmRef.id}`);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const farmSchema = object({
    name: string().required(),
    about: string().required(),
    address: string().required(),
    phone: string().matches(phoneRegExp),
    website: string(),
    image: string(),
  });
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // @ts-ignore
    setImage(result.file);
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
        await uploadBytes(storageRef, image).catch((err) => {
          console.log(err);
        });
        await getDownloadURL(ref(storage, `farms/${farmRef.id}`))
          .then((url) => {
            values.image = url;
          })
          .catch((error) => {
            console.log(error);
          });
        await setDoc(farmRef, values).then(() => {
          console.log('success');
          navigateToHome();
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
        <View style={styles.container}>
          <Field
            name='name'
            component={Input}
            label='Name'
            testID='farm-name'
          />
          <View style={styles.inputStyle}>
            <Text style={styles.inputLabel}>About</Text>
            <TextInput
              testID='farm-about'
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
          <Field
            name='address'
            testID='farm-address'
            component={Input}
            label='Address'
          />
          <Field
            name='phone'
            testID='farm-phone'
            component={Input}
            label='Phone'
          />
          <Field
            name='website'
            component={Input}
            testID='farm-website'
            label='Website'
          />
          <TouchableOpacity>
            <Button onPress={pickDocument} title='Upload Image' />
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              title='Submit'
              testID='create-farm-button'
              onPress={handleSubmit}
            />
          </TouchableOpacity>
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
