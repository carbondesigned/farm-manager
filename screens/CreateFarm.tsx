import React from 'react';
import CreateFarmForm from '../components/CreateFarmForm';
import { RootTabScreenProps } from '../types';

const CreateFarm = ({ navigation }: RootTabScreenProps<'CreateFarm'>) => {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };
  return <CreateFarmForm navigateToHome={navigateToHome} />;
};

export default CreateFarm;
