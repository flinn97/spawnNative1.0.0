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
import InputComponent from './inputComponent';

export default class PicScale extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }

  async componentDidMount(){
    console.log(this.props.name)
    console.log(this.props.picURL)
      let uri = this.props.picURL
      try{
        Image.getSize(uri, (width, height)=>{
          console.log(width, height)
        }, (e)=>{console.log(e)})
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function (e) {
    //     console.log(e);
    //     reject(new TypeError("Network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", uri, true);
    //   xhr.send(null);
    // });
   
    // const fileReaderInstance = new FileReader();
    // fileReaderInstance.readAsDataURL(blob); 
    // fileReaderInstance.onload = async () => {
    //     let base64data = fileReaderInstance.result;   
    //     console.log("blob", blob)
    //     // console.log("base64data", base64data)  

    // }
  }
  catch(e){
    console.log(e);
  }

    
    
    
  }

render(){
  let app = this.props.app;
  let state= app.state;
  let componentList=state.componentList
  let obj = this.props.obj? this.props.obj: state.currentComponent
  return (
  <View style = {{display:"flex", flexDirection:'row', justifyContent:"center", alignItems:"center", marginLeft:10}}>
  
  </View>
    
  );
}
  
};

