import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import React from 'react';
import { db } from '../utils/firbaseUtils';
const useGetFarms = () => {
  const [farms, setFarms] = React.useState([] as DocumentData[]);

  const q = query(collection(db, 'farms'));
  const querySnapshot = getDocs(q);
  /* Getting the data from the database and setting it to the state. */
  querySnapshot
    .then((snapshot) => {
      const f = snapshot.docs.map((doc) => doc.data());
      setFarms(f);
    })
    .catch((error) => {
      console.log(error);
    });
  return { farms, setFarms }
}

export default useGetFarms
