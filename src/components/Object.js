import React from 'react';
import { View } from 'react-native';

const Obj = () => {
  const { objStyle } = styles;
  
  return (
    <View style={objStyle}/>
  );
}

const styles = {
  objStyle: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: 'red',
  },
}

export default Obj;
