import React, {Component} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';

export default class InputComponent extends Component{
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.prepareOnPress=this.prepareOnPress.bind(this);
    this.onBlurEvent=this.onBlurEvent.bind(this);
        this.state={
          value: this.props.value
          

    }
  }
   async componentDidMount(){
    if(!this.props.prepareOnPress){
      await this.setState({obj:this.props.obj, value: this.props.obj?.getJson()[this.props.name]})

    }
  }

  componentDidUpdate(){
    if(this.props.app.state.sent){
      this.props.app.dispatch({sent: false});
      this.setState({pressed:false, value: ""})
    }
    
  }

async prepareOnPress(){
  if(this.props.prepareOnPress && !this.state.pressed){
    this.setState({pressed:true});
    let obj = this.props.obj? this.props.obj: 1;
    obj = await this.props.app?.state.componentList.getOperationsFactory()[this.props.prepareOnPress.operation]({[this.props.prepareOnPress.operate]:obj});
    obj = obj[this.getSplice(this.props.prepareOnPress.operate)][0];
    this.setState(
      {obj:obj}
    );
  }
  if(this.props.setPosition){
    this.props.setPosition()
  }
}

getSplice(word){
  word = word.includes("add")? "add" : word.includes("update")? "update": "del"
  return word;
}

handleChange(value){
  this.setState({
    value:value
  });
  if(this.props.handleChange!==undefined){
    this.props.handleChange(value)
  }
  else{
    if(this.state.obj){
      this.state.obj.setJson({...this.state.obj.getJson(), [this.props.name]:value})
    }
  }
  
}
onBlurEvent(){
  if(this.props.setOnDefocus){
    this.props.setOnDefocus();
  }
}


render(){
  let app=this.props.app;
  let state=app?.state;

  return (
        <TextInput
        multiline={this.props.numberOfLines?true:false}
        placeholder={this.props.placeholder}
        onFocus={this.prepareOnPress}
        onBlur={this.onBlurEvent}
        numberOfLines= {this.props.numberOfLines?this.props.numberOfLines:1}
        returnKeyType={this.props.returnKeyType?this.props.returnKeyType:"done"}

      style={{        

       
        width:this.props.width? this.props.width:200, height:this.props.height?this.props.height:30, 
        backgroundColor:this.props.backgroundColor, 
        paddingTop:this.props.paddingTop,
        paddingLeft:this.props.paddingLeft,
        borderWidth: this.props.borderWidth?this.props.borderWidth:!this.props.border?1:0, 
        borderRadius:this.props.borderRadius?this.props.borderRadius:7, 
         marginLeft:this.props.center?10:0, fontSize:this.props.fontSize, fontFamily:this.props.fontFamily, 
         marginTop:this.props.marginTop, textAlignVertical:this.props.textAlignVertical, 
         borderColor: this.props.borderColor,
         borderTopColor:this.props.borderTopColor, borderRightColor:this.props.borderRightColor, 
         borderLeftColor:this.props.borderLeftColor,
         fontFamily:this.props.fontFamily?this.props.fontFamily: "Regular", 
         color:this.props.color?this.props.color:"black"}}
        onChangeText={(text)=>{
          this.handleChange(text)
        }}
        secureTextEntry={this.props.type==="password"&&true}

        value={this.state.value}
        type={this.props.type&&(this.props.type)}
        name={this.props.name? this.props.name: "value"}
      />
  );
}
  
};

