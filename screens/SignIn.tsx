import { Button, StyleSheet, TextInput } from 'react-native';
import { Formik, useFormik } from 'formik';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { object, string } from 'yup';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import SignupForm from '../components/SignupForm';

export default function SignIn({ navigation }: RootTabScreenProps<'SignIn'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <SignupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
