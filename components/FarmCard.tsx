import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { View, Text } from './Themed';
import { Image, StyleSheet, useColorScheme } from 'react-native';

type Props = {
  farm: DocumentData;
};

function FarmCard({ farm }: Props) {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.card, { backgroundColor: colorScheme === "light" ? "#eee" : "#1B1B1B" }]}>
      <Image style={styles.img} source={{ uri: farm.image }} />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colorScheme === "light" ? "#1B1B1B" : "#eee" }]}>{farm.name}</Text>
        <Text style={[styles.address, { color: colorScheme === "light" ? "#1B1B1B" : "#eee" }]}>{farm.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
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
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold',
  },
  address: {
    color: "#fff",
  }
});

export default FarmCard;
