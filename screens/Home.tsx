import { Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect } from 'react';
import { useGetUser } from '../hooks/useGetUser';
import { FontAwesome } from '@expo/vector-icons';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from '../utils/firbaseUtils';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const user = useGetUser();
  const [farms, setFarms] = React.useState([] as DocumentData[]);
  const q = query(collection(db, 'farms'));
  const querySnapshot = getDocs(q);
  querySnapshot
    .then((snapshot) => {
      const f = snapshot.docs.map((doc) => doc.data());
      setFarms(f);
    })
    .catch((error) => {
      console.log(error);
    });
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
      <View>
        {farms.length < 1 && <Text>No farms yet</Text>}
        {farms.length > 0 &&
          farms.map((farm, idx) => (
            <View key={idx} style={styles.farm}>
              <Text>{farm.name}</Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  farm: {},
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
