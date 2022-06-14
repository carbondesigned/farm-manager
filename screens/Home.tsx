import { Pressable, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect } from 'react';
import { useGetUser } from '../hooks/useGetUser';
import { FontAwesome } from '@expo/vector-icons';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const user = useGetUser();
  useEffect(() => {
    if (!user) {
      navigation.navigate('SignIn');
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('CreateFarm')}
      >
        <FontAwesome name='plus' color='#fff' size={10} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#2196f3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});
