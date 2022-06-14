import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useEffect } from 'react';
import { auth } from '../utils/firbaseUtils';
import { useGetUser } from '../hooks/useGetUser';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const user = useGetUser();
  console.log(user);
  useEffect(() => {
    if (!user) {
      navigation.navigate('SignIn');
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
