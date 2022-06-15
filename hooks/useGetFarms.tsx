import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../utils/firbaseUtils';
const useGetFarms = () => {
  const [farms, setFarms] = React.useState([] as DocumentData[]);
  useEffect(() => {
    const documents = collection(db, 'farms');
    const q = query(documents, orderBy('name'));

    onSnapshot(q, (querySnapshot) => {
      const f = querySnapshot.docs.map((doc) => doc.data());
      setFarms(f);
    });
    return;
  }, []);
  return { farms, setFarms };
};

export default useGetFarms;
