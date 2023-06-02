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

export default class Fog extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }

render(){

  const backgroundStyle = {
    backgroundColor: "gray",//isDarkMode ? Colors.darker : Colors.lighter,
    height:'100%',
    width:'100%',
    display:'flex',
    alignItems:"center",
    opacity: 0.5,
    zIndex:300,
    position:'absolute',
    
    
  };
  return (
    <TouchableOpacity onPress={this.props.menuSlide} style={backgroundStyle}>
    
    </TouchableOpacity>
    
  );
}
  
};

