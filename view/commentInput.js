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

export default class CommentInput extends Component{
  constructor(props){
    super(props);
        this.state={
          

    }
  }

render(){
  let app = this.props.app;
  let state= app.state;
  let componentList=state.componentList
  let obj = this.props.obj? this.props.obj: state.currentComponent
  return (
  <View style = {{display:"flex", flexDirection:'row', justifyContent:"center", alignItems:"center", marginLeft:10}}>
    <InputComponent multiline={true}
        numberOfLines={4} height={100} app={app}  obj={obj} name="note" color="white" borderColor="white" width={220} borderRadius={10} paddingLeft={5} placeholder="Please Add a Comment" setPosition={()=>{app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})}}
        setOnDefocus={()=>{app.dispatch({keyboardPosition:'auto', keyboardMargin:0})}}/>
    <TouchableOpacity onPress={()=>{
      state.opps.run();
      app.dispatch({currentComponent:undefined})
    }}><Text style={{color:"white", marginLeft:20, fontFamily: "Regular"}}>{this.props.text? (this.props.text):("Send")}</Text></TouchableOpacity>
  </View>
    
  );
}
  
};

