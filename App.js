import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, TextInput,
  TouchableOpacity, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import Clipboard from "@react-native-community/clipboard";



export default function App() {

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [urlFinal, setUrlFinal] = useState('');

  const short = async () => {
    Keyboard.dismiss();
    if (url.includes('http://') || url.includes('https://')) {

      await fetch(`https://cutt.ly/api/api.php?key=297b058e4549b4f9c5811c51a39d18c2ab712&short=${url}&name=${name}`)
        .then(async response => {
          const data = await response.json();

          if (data.url.status === 3) {
            alert('Esse nome já está em uso');
            return;
          }
          if (data.url.status === 2) {
            alert('url é inválida')
            return;
          }

          setUrlFinal(data.url.shortLink);
        });
      return;
    }

    alert('Url inválida');
  }

  function copyUrl() {
    Clipboard.setString(urlFinal);
    alert('Url copiada com sucesso!');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>url
        <Text style={{ color: '#1076F7' }}>Sujeito</Text>
        </Text>
        <TextInput
          style={styles.urlInput}
          onChangeText={(text) => setUrl(text)}
          value={url}
          placeholder='Digite a url'
        />
        <TextInput
          style={styles.urlInput}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder='Nome personalizado'
        />
        <TouchableOpacity onPress={() => short()} style={styles.shortBtn}>
          <Text style={{ color: '#fff' }}>ENCURTAR</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback onPress={urlFinal ? copyUrl : () => { }}>
          <Text style={styles.finalUrl}>{urlFinal}</Text>
        </TouchableWithoutFeedback>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#21243d',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20
  },
  urlInput: {
    height: 50,
    width: '80%',
    borderColor: '#eeeeee',
    color: '#616161',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#eeeeee',
    marginBottom: 20,
    fontSize: 14,
  },
  shortBtn: {
    backgroundColor: '#ff7c7c',
    borderRadius: 10,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalUrl: {
    height: 40,
    width: '80%',
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center'
  }
})