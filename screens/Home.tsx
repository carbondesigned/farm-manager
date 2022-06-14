import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect } from 'react';
import { useGetUser } from '../hooks/useGetUser';
import { FontAwesome } from '@expo/vector-icons';
import FarmCard from '../components/FarmCard';
import useGetFarms from '../hooks/useGetFarms';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const { farms } = useGetFarms()
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
        testID='create-farm-button'
        onPress={() => navigation.navigate('CreateFarm')}
      >
        <FontAwesome name='plus' color='#fff' size={10} />
      </Pressable>

      {/* if there are no farms. */}
      {farms.length < 1 && <Text>No farms yet</Text>}

      <ScrollView>
        {farms.length > 0 &&
          farms.map((farm, idx) => <FarmCard key={idx} farm={farm} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 20,
  },
  fab: {
    position: 'absolute',
    zIndex: 100,
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 15,
    backgroundColor: '#2196f3',
  },
});
