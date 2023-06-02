import React, {Component} from 'react';
import topbar from "../assets/spawnLogo.png"

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
import Topbar from './topbar';

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';

export default class Register extends Component{
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



if(currentComponent.getJson().email===""||currentComponent.getJson().email===undefined){
    this.setState({
        message:"Please fill out your email"
        
    })
    return;
}
else{
  await currentComponent.setJson({...currentComponent.getJson(), email: currentComponent.getJson().email.toLowerCase()})
}
if(this.state.password===""||this.state.password===undefined){
    this.setState({
        message:"Please enter a password"
        
    })
    return;
}


     ///If they havent checked box return error message
     if(!this.state.readEULA){
        this.setState({
            message:"You need to read and agree to the End User License Agreement to proceed."
            
        })
        return;
    }


  let user= await auth.register(currentComponent.getJson().email, this.state.password);
  if(user){
    if(this.state.currentPic && this.state.path){
      await auth.uploadPics(this.state.blob, this.state.path);
    
    }
    state.currentComponent.setJson({...state.currentComponent.getJson(), picURL: this.state.currentPic, addhash:this.state.spawnerHandle + Math.floor(Math.random() * 10000)});
    if(this.state.path){
      await state.currentComponent?.getPicSrc(this.state.path);

  }
     
  await this.props.app.state.currentComponent?.getOperationsFactory().run();
  this.props.app.dispatch({setRegister:true,  email: this.state.email});
    this.setState({registered:true, });
    await this.props.app.dispatch({})


  }
  else{
    this.setState({
        message:"Either this email is already in use. The email does not exist or your password is not secure enough."
    })
}
  
};


render(){
  let app=this.props.app;
  let state=app?.state;
  let formStyles= state.formStyles;
  let styles=state.styles;

  return (
    <View style={{width:"100%", display:"flex", alignItems:'center'}}>
      <Image resizeMode="contain" 
      style={{width:"100%" , height:50, 
      backgroundColor:styles.colors.Color2, alignSelf:"center"
      
      }} source={topbar}></Image>
      <View style={{width:"100%", height:40, color:"white", backgroundColor:"#A80303", display:"flex",justifyContent:"center"}}>
        <Text style={{ color:"white", alignSelf:"center", fontFamily: "Bold", color:"white",
                fontSize:18}}>Register</Text>
        </View>
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
        <InputComponent setPosition={()=>{app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})}}
        setOnDefocus={()=>{app.dispatch({keyboardPosition:'auto', keyboardMargin:0})}}obj={state.currentComponent} name="email" app={app}  {...formStyles.textField} placeholder="  Email *"/>
        <InputComponent handleChange={(val)=>{this.setState({password:val})}}
        setPosition={()=>{app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})}}
        setOnDefocus={()=>{app.dispatch({keyboardPosition:'auto', keyboardMargin:0})}}obj={state.currentComponent} name="password" type="password" app={app}  {...formStyles.textField} placeholder="  Password *"/>
       <View style={{width:"100%", display:"flex", flexDirection:'row', marginTop:25, paddingLeft:25}} ><Checkbox checked={this.state.readEULA} check={()=>{
        state.currentComponent.setJson({...state.currentComponent.getJson(), EULA:!state.currentComponent.getJson().EULA});
        this.setState({readEULA:!this.state.readEULA});

       }} labelColor="#56ba8e" color="#56ba8e" />
       <TouchableOpacity onPress={()=>{app.dispatch({readEULA:true})}} style={{width:"70%", marginLeft:20}}><Text style={{color:"black", fontFamily: "Regular",}}>I have read and agree to the terms and conditions.</Text></TouchableOpacity>

</View>
       </View>
       </ScrollView>
       
       </SafeAreaView>
       <Text style={{fontFamily: "Regular",color:"red"}}>{this.state.message}</Text>
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

