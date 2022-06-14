import { FieldProps } from 'formik';
import React, { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { View, Text } from './Themed';

type Props = {
  label: string;
};
const Input: FC<Props & FieldProps> = ({
  field,
  form: { errors, touched, handleChange, handleBlur },
  label,
  ...props
}) => {
  console.log(field);
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleChange(field.name)}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <Text style={styles.error}>{errors[field.name]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    gap: 10,
  },
  input: {
    backgroundColor: '#eee',
    padding: 5,
    fontSize: 15,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});
export default Input;
