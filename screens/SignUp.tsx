import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import SignupForm from '../components/SignupForm';
import { useEffect } from 'react';
import { useGetUser } from '../hooks/useGetUser';

export default function SignUp({ navigation }: RootTabScreenProps<'SignUp'>) {
  const user = useGetUser();
  /* This is a React Hook that is checking if the user is logged in. If the user is logged in, it will
navigate to the Home screen. */
  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user]);

  /**
   * NavigateToSignIn() is a function that navigates to the SignIn screen
   */
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
});
