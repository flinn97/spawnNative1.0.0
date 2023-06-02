import React, {Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default class Eula extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }




render(){
  let app = this.props.app;
  let state = app.state;
  let styles =state.styles;
  let dispatch = app.dispatch;
  const backgroundStyle = {
    backgroundColor: "white",//isDarkMode ? Colors.darker : Colors.lighter,
    height:"100%",
    width:'100%',
    display:'flex',
    alignItems:"center",
    position:'absolute',
    top:60,
    zIndex:1000
  };
  
        return(
          <View style={backgroundStyle}>
             
        <View style={{zIndex:1002, marginTop:5,  background:"white",
        width:"90%",
        display:'flex',
        height:"80%",
        alignItems:"center",
        marginTop:20 }}>
            <Text style={{fontFamily: "Regular", color:"black"}}>You have been sent</Text>
<TouchableOpacity onPress={()=>{app.dispatch({readEULA:false})}} style={{width:70, borderRadius:7, backgroundColor:"#A80303", display:"flex", justifyContent:"center", alignItems:"center", marginTop:20}}><Text style={{fontFamily: "Regular",fontSize:20, color:"white"}}>OK</Text></TouchableOpacity>
 
 
 </View>  
 </View>
 );
}
  
};

