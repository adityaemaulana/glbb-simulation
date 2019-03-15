import React from 'react';
import { View } from 'react-native';

const Field = (props) => {
  const { fieldStyle } = styles;

  return (
    <View style={fieldStyle}>
      {props.children}
    </View>
  );
}

const styles = {
  fieldStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
}

export default Field;
