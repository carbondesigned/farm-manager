import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { Farm } from '../types/Farm';
import { View, Text } from './Themed';
import { Image, StyleSheet } from 'react-native';

type Props = {
  farm: DocumentData;
};

function FarmCard({ farm }: Props) {
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={{ uri: farm.image }} />
      <View style={styles.content}>
        <Text style={styles.name}>{farm.name}</Text>
        <Text>{farm.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B1B1B',
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  content: {
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FarmCard;
