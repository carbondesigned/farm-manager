import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import SignInForm from '../components/SigninForm';
import { Text, View } from '../components/Themed';
import { useGetUser } from '../hooks/useGetUser';
import { RootTabScreenProps } from '../types';
import { auth } from '../utils/firbaseUtils';

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<'SignIn'>) {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };
  const user = useGetUser();
  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <SignInForm navigateToHome={navigateToHome} />
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
