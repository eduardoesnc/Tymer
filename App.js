import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Contador from './Contador';


export default function App() {

  console.disableYellowBox = true;

  const [estado,setarEstado] = useState('selecionar')
  const [segundos, setarSegundos] = useState(1);
  const [minutos, setarMinutos] = useState(0);
  const [alarmeSound, setarAlarmeSound] = useState([
   {
     id: 1,
     selecionado: true,
     som: 'Alarme 1',
     file: require('./assets/aboyisagun.mp3'),
   },
   {
     id: 2,
    selecionado: false,
    som: 'Alarme 2',
    file: require('./assets/earfquake.mp3'),
   },
   {
    id: 3,
    selecionado: false,
    som: 'Alarme 3',
    file: require('./assets/runningoutoftime.mp3'),
   },
 ])

 var numeros = [];
 for(var i = 1; i<=60; i++){
   numeros.push(i);
 }

 function setarAlarme(id){
   let alarmesTemp = alarmeSound.map(function(val){
    if (id != val.id)
      val.selecionado = false;
    else 
      val.selecionado = true;
    return val;
   })

   setarAlarmeSound(alarmesTemp);
 }
 if(estado == 'selecionar'){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Tymer, the timer</Text>
        <Image style={styles.tymer} source={require('./assets/tymerthecounter.png')} />
        <Text style={{color: 'rgb(88, 87, 88)', fontSize: 30}}>Selecione o Tempo:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'rgb(88, 87, 88)'}}>Min:</Text>
        <Picker
          selectedValue={minutos}
          onValueChange={(itemValue, itemIndex) =>
            setarMinutos(itemValue)
          }
          style={{height: 50, width: 100, color:'rgb(88, 87, 88)'}}>
            <Picker.Item label= '0' value = '0'/>
          {
            numeros.map(function(val){
              return(<Picker.Item label={val.toString()} value={val.toString()} />);
            })
          } 
        </Picker>
        <Text style={{color: 'rgb(88, 87, 88)'}}>Seg:</Text>
        <Picker
          selectedValue={segundos}
          onValueChange={(itemValue, itemIndex) =>
            setarSegundos(itemValue)
          }
          style={{height: 50, width: 100, color:'rgb(88, 87, 88)'}}>
          {
          numeros.map(function(val){
            return(<Picker.Item label={val.toString()} value={val.toString()} />);
          })
          }
        </Picker>
        </View>
          
        <View style={{flexDirection: 'row'}}>
          {
            alarmeSound.map(function(val){
              if(val.selecionado){

              return(<TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolherSelecionado}>
                <Text style={{color: 'white'}}>{val.som}</Text>
                </TouchableOpacity>);

              }else{

                return(<TouchableOpacity onPress={()=>setarAlarme(val.id)} style={styles.btnEscolher}>
                  <Text style={{color: 'white'}}>{val.som}</Text>
                  </TouchableOpacity>);

              }
            })
          
          }
          </View>
              <TouchableOpacity onPress={()=>setarEstado('iniciar')} style={styles.btnIniciar}><Text style={{alignSelf: 'center', textAlign: 'center', paddingTop: 32, color: 'white', fontSize:20}}>iniciar</Text></TouchableOpacity>
      </View>
    );
      }else if(estado == 'iniciar'){
        return(
          <Contador alarmes={alarmeSound} setarMinutos={setarMinutos} setarSegundos={setarSegundos} setarEstado={setarEstado} minutos={minutos} segundos={segundos}></Contador>
        )

      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 180, 204)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEscolher:{
    margin:10,
    padding: 10,
    backgroundColor: 'rgb(88, 87, 88)',
    borderRadius: 10,
  },
  btnEscolherSelecionado:{
    margin:10,
    padding: 10,
    backgroundColor: 'rgba(88, 87, 88, 0.5)',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
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
    top: -40,
    },
  title: {
    color: 'rgb(88, 87, 88)',
    fontSize: 40,
    position: 'relative',
    top: -80,
  },
});