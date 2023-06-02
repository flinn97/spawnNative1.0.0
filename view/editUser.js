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
import auth from '../services/auth';
import InputComponent from './inputComponent';
import SelectFileComponent from './selectFileComponent'
import Checkbox from './checkbox.js';

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';

export default class EditUser extends Component{
  constructor(props){
    super(props);
    this.setPic=this.setPic.bind(this);
    this.createUUID=this.createUUID.bind(this);
    this.handleSubmission=this.handleSubmission.bind(this);
        this.state={
          readEULA:false

    }
  }
  createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

  async setPic(pic, blob){
    let path= "images/" + this.createUUID();
    await this.setState({
      currentPic:pic,
      blob:blob,
      path:path
    })
  }
  
  async handleSubmission()  {
   


    let app=this.props.app;
  let state=app.state;
  let currentComponent = state.currentComponent;
  if(currentComponent.getJson().firstName===""||currentComponent.getJson().firstName===undefined){
    this.setState({
        message:"Please fill out your first name"
        
    })
    return;
}
if(currentComponent.getJson().lastName===""||currentComponent.getJson().lastName===undefined){
    this.setState({
        message:"Please fill out your last name"
        
    })
    return;
}
if(currentComponent.getJson().spawnerHandle===""||currentComponent.getJson().spawnerHandle===undefined){
    this.setState({
        message:"Please fill out a spawner handle"
        
    })
    return;
}


    if(this.state.currentPic && this.state.path){
      await auth.uploadPics(this.state.blob, this.state.path);
      state.currentComponent.setJson({...state.currentComponent.getJson(), picURL: this.state.currentPic});
      if(this.state.path){
        await state.currentComponent?.getPicSrc(this.state.path);
  
    }
    
    }
   
     
  await this.props.app.state.currentComponent?.getOperationsFactory().run();
  
    this.setState({registered:true, });
    await this.props.app.dispatch({popupSwitch:"", currentComponent:undefined})


  }


render(){
  let app=this.props.app;
  let state=app?.state;
  let formStyles= state.formStyles;
  let styles=state.styles;
  let dispatch=app.dispatch

  const backgroundStyle = {
    backgroundColor: "black",//isDarkMode ? Colors.darker : Colors.lighter,
    height:styles.height,
    width:styles.width,
    display:'flex',
    alignItems:"center",
    justifyContent:"center",
    zIndex:300,
    position:'absolute',
    
    
  };

  return (
    <View style={backgroundStyle}>
<TouchableOpacity style={{position:'absolute', top:40, right:0, width:50, height:50, zIndex:850}} onPress={()=>{
            dispatch({currentComponent:undefined, popupSwitch:""})}}><Text style={{color:"white", fontSize:20}}>X</Text></TouchableOpacity>
        <SafeAreaView style={{width:"100%", display:"flex", alignItems:'center', height:500}}>
        
        <ScrollView >
        <View style={{width:"100%", display:"flex", alignItems:'center'}}>
        {this.state.currentPic&&(<Image  source={{uri:this.state.currentPic}} style={{width:100, height:100, borderRadius:50}}/>)}
        <SelectFileComponent setPic={this.setPic} app={this.props.app} />
        <InputComponent obj={state.currentComponent} name="firstName" app={app} {...formStyles.textField} placeholder="  First Name *"/>
        <InputComponent obj={state.currentComponent} name="lastName" app={app}  {...formStyles.textField} placeholder="  Last Name *"/>
        <InputComponent obj={state.currentComponent} name="spawnerHandle" app={app} {...formStyles.textField} placeholder="  Spawner Handle *"/>
        <InputComponent obj={state.currentComponent} name="bio" app={app}  {...formStyles.textField} placeholder="  Bio"/>
        <InputComponent obj={state.currentComponent} name="website" app={app}  {...formStyles.textField} placeholder="  Website"/>
        <InputComponent setPosition={()=>{app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})}}
        setOnDefocus={()=>{app.dispatch({keyboardPosition:'auto', keyboardMargin:0})}}obj={state.currentComponent} name="socialHandle" app={app}  {...formStyles.textField} placeholder="  Social Link URL"/>

       </View>
       </ScrollView>
       
       </SafeAreaView>
       <Text style={{color:"red", fontFamily: "Regular"}}>{this.state.message}</Text>
        <TouchableOpacity onPress={this.handleSubmission}  style={{ alignSelf:"center", ...formStyles.buttonPositive, justifySelf:"center", fontSize:20,
          alignSelf:"center", marginTop:styles.margins.marginLg, width:102, border:"none", display:"flex", justifyContent:"center", alignItems:"center" }}>
          <Text  style={{ fontFamily: "Bold", color:"white",
                fontSize:18
          }}>Submit</Text>
        </TouchableOpacity>
        

        </View>
  );
}
  
};

