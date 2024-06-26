import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Input, Icon } from '@rneui/themed';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://kutaiba123.bsite.net/api/Users/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
          FirstName: firstName,
          LastName: lastName
        }),
      });

      const data = await response.json();

      console.log('Response Status:', response.status);
      console.log('Response Data:', data);

      if (response.ok) {
        Alert.alert('Login Successful', `Hello, ${data.FirstName} ${data.LastName}!`);
        setConnectedUser(data);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'One or more details are wrong');
      }
    } catch (error) {
      console.error('Login Error:', error);
     
    }
  };

  return (
    <View style={styles.container}>
      <Input
        leftIcon={<Icon name='email' size={24} color='white' />}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
        inputStyle={{ color: 'white' }}
      />
      <Input
        leftIcon={<Icon name='lock' size={24} color='white' />}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        inputStyle={{ color: 'white' }}
      />
      <Input
        leftIcon={<Icon name='user' size={24} color='white' />}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        inputStyle={{ color: 'white' }}
      />
      <Input
        leftIcon={<Icon name='user' size={24} color='white' />}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        inputStyle={{ color: 'white' }}
      />
      <Button
        title="Login"
        onPress={handleSignIn}
        loading={false}
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
          borderRadius: 5,
        }}
        titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
        containerStyle={{
          marginHorizontal: 50,
          height: 50,
          width: 200,
          marginVertical: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
