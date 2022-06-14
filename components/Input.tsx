import { FieldProps } from 'formik';
import React, { FC } from 'react';
import { TextInput, StyleSheet, useColorScheme } from 'react-native';
import { View, Text } from './Themed';

type Props = {
  label: string;
  testID?: string;
};
const Input: FC<Props & FieldProps> = ({
  field,
  testID,
  form: { errors, touched, handleChange, handleBlur },
  label,
  ...props
}) => {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.inputStyle}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        testID={testID}
        style={[styles.input, { backgroundColor: colorScheme === "light" ? "#eee" : "#1B1B1B", color: colorScheme === "light" ? "#B1B1B" : "#eee" }]}
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
    gap: 5,
  },
  input: {
    color: '#fff',
    backgroundColor: '#1B1B1B',
    padding: 10,
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
