import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { Audio } from 'expo-av';

export default function Contador(props) {

  var done = false;

  useEffect(()=>{

    const timer = setInterval(()=>{

      props.setarSegundos(props.segundos-1);

      if(props.segundos <= 0){
        if (props.minutos >0){
          props.setarMinutos(minutos-1);
          props.setarSegundos(59);
        }else{
          if(!done){
            done = true;
            props.setarEstado('selecionar');
            props.setarMinutos(0);
            props.setarSegundos(1);
            playSound();
          }
        }

      }



    }, 1000)

    return () => clearInterval(timer);

  })

  async function playSound(){
    const sound = new Audio.Sound();
    try {
      var alarme;
      props.alarmes.map(function(val){
        if(val.selecionado){
          alarme = val.file;
        }
      })
      await sound.loadAsync(alarme);
      await sound.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      //await sound.unloadAsync();
    } catch (error) {
      alert('Erro1')
    }

  }

  function resetar(){

    props.setarEstado('selecionar');
    props.setarMinutos(0);
    props.setarSegundos(0);

  }

  function formatarNumero(number){
    var finalNumber = "";
    if(number < 10){
      finalNumber = "0" + number;
    }else{
      finalNumber = number;
    }
    return finalNumber;
  }

  var segundos= formatarNumero(props.segundos);
  var minutos = formatarNumero(props.minutos);
  
  return(
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Tymer, the timer</Text>
      <Image style={styles.tymer} source={require('./assets/tymerthecounter.png')} />
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textContador}>{minutos} : </Text>
        <Text style={styles.textContador}>{segundos}</Text>
      </View>
      <TouchableOpacity onPress={()=>resetar()} style={styles.btnIniciar}><Text style={{alignSelf: 'center', textAlign: 'center', paddingTop: 32, color: 'white', fontSize:20}}>Resetar</Text></TouchableOpacity>
    </View>
        )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 180, 204)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContador:{
    color: 'white',
    fontSize: 40,
  },
  btnIniciar:{
    backgroundColor: 'rgb(88, 87, 88)',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    borderColor: 'white',
    borderWidth: 2,
  },
  tymer:{
    width: 200,
    height: 200,
    position: 'relative',
    top: -50,
    },
  title: {
    color: 'rgb(88, 87, 88)',
    fontSize: 40,
    position: 'relative',
    top: -100,
  },
});
