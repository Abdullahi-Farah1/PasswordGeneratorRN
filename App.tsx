import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const App: React.FC = () => {
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<number>(15);
  const [password, setPassword] = useState<string>('');

  const successBox = useRef<View>(null);

  const passwordGenerator = () => {
    const lowercase: string = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase: string = lowercase.toUpperCase();
    const numbers: string = '0123456789';
    const specialChars: string = '!@#$%^&*()_-+=|}]{[":><?,.~';

    const chars: string =
      lowercase +
      (includeUppercase ? uppercase : '') +
      (includeNumbers ? numbers : '') +
      (includeSpecialChars ? specialChars : '');

    let pw: string = '';

    for (let i = 0; i < passwordLength; i++) {
      pw += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pw);
  };

  const copyThePassword = () => {
    if (password.length === 0) return;
    Clipboard.setString(password);
    Alert.alert('Success', 'Password Copied to Clipboard!');
  };

  const handlePasswordLengthChange = (text: string) => {
    const parsedValue = parseInt(text);
    if (!isNaN(parsedValue)) {
      setPasswordLength(parsedValue);
    } else if (text === '') {
      setPasswordLength(0); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pwGenerator}>
        <Text style={styles.title}>Password Generator</Text>
        <View style={styles.options}>
          <View style={styles.option}>
            <Text>Include Uppercase Letters:</Text>
            <Switch
              value={includeUppercase}
              onValueChange={() => setIncludeUppercase(!includeUppercase)}
            />
          </View>
          <View style={styles.option}>
            <Text>Include Special Characters:</Text>
            <Switch
              value={includeSpecialChars}
              onValueChange={() => setIncludeSpecialChars(!includeSpecialChars)}
            />
          </View>
          <View style={styles.option}>
            <Text>Include Numbers:</Text>
            <Switch
              value={includeNumbers}
              onValueChange={() => setIncludeNumbers(!includeNumbers)}
            />
          </View>
          <View style={styles.option}>
            <Text>Password Length: {passwordLength}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={passwordLength.toString()}
              onChangeText={handlePasswordLengthChange}
            />
          </View>
        </View>
        <Text style={styles.pwOutput}>{password}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={passwordGenerator}>
            <Text style={styles.buttonText}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={copyThePassword}>
            <Text style={styles.buttonText}>Copy Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.successMessage} ref={successBox}>
          <Text>Password Copied to Clipboard!</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 20, 
  },
  pwGenerator: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    maxWidth: 600,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  options: {
    width: '100%',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    width: 50,
    textAlign: 'center',
  },
  pwOutput: {
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    width: '90%',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#e54aee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  successMessage: {
    backgroundColor: '#d0ffb3',
    color: '#4a7044',
    fontSize: 14,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    textAlign: 'center',
    display: 'none',
  },
});

export default App;
