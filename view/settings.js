
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



export default class Settings extends Component {
  constructor(props){
    super(props);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }
render(){
  return (

    <View style={{width:"100%", height:"100%", background:"white", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Text></Text>
    </View>

);
}

};
