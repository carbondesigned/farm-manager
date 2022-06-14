import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import SignupForm from '../components/SignupForm';
import { useEffect } from 'react';
import { auth } from '../utils/firbaseUtils';
import { useGetUser } from '../hooks/useGetUser';

export default function SignUp({ navigation }: RootTabScreenProps<'SignUp'>) {
  const user = useGetUser();
  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user]);
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <SignupForm navigateToSignIn={navigateToSignIn} />
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
