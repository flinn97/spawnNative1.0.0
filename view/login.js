import React, {Component} from 'react';
import Logo from '../assets/spawnLogo.png';
import auth from '../services/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';



import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
  Text, Dimensions,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';


export default class Login extends Component{
  constructor(props){
    super(props);
    
   this.handleSubmission=this.handleSubmission.bind(this);
        this.state={
          email: this.props.email,
          password: this.props.password
          

    }
  }

async handleSubmission(){
  if(!this.state.email){
    this.setState({message:"Please enter your email."});
    return
  }
  if(!this.state.password){
    this.setState({message:"Please enter your password."});
    return
  }
  let user= await auth.login(this.state.email, this.state.password, this.props.app.state.componentList, this.props.app.dispatch);
  if(user){
    
    auth.saveToken(this.state.email);
      auth.checkToken(this.state.email);
  }
  else{
    this.setState({message:"Email or password incorrect."});
  }
}



render(){
  let app=this.props.app;
  let state=app?.state;
  let styles=state.styles;
  let formStyles= state.formStyles;

  return (
    
    <View style={{ width: styles.width,}}>
      <Image
      source={Logo}
      resizeMode="contain"
      style={{width: styles.width,
       height: undefined, aspectRatio: 1.7, 
      backgroundColor:styles.colors.Color2, alignSelf:"center",
      
      }}
      />

    <>
      <>
        
        <TextInput placeholder='  Email'
        onFocus={()=>{app.dispatch({keyboardMargin:400})}}
        onBlur={()=>{app.dispatch({keyboardMargin:0})}}
      style={{
        ...formStyles.textField, alignSelf:"center",
         }}
         on
        onChangeText={(text)=>{
          this.setState({
            email:text
          });
        }}
      />
      </>
      <>
      
      <TextInput placeholder='  Password'
        onFocus={()=>{app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})}}
        onBlur={()=>{app.dispatch({keyboardPosition:'auto', keyboardMargin:0})}}
        secureTextEntry={true}
          style={{
            ...formStyles.textField,
            alignSelf:"center",}}
            onChangeText={(text)=>{
              this.setState({password:text})
            }}
            type="password"
          />
          </></>
          <Text style={{color:"red", fontFamily: "Regular", alignSelf:"center", marginTop:this.state.message!==undefined?10:0}}>{this.state.message}</Text>
          <TouchableOpacity onPress={this.handleSubmission} 
          style={{ alignSelf:"center", ...formStyles.buttonPositive, justifySelf:"center", fontSize:20,
          alignSelf:"center", marginTop:styles.margins.marginLg, width:102, border:"none", display:"flex", justifyContent:"center", alignItems:"center" }}>
            <Text style={{ fontFamily: "Bold", color:"white",
                fontSize:18
          }}>Login</Text>
            </TouchableOpacity>
      </View>
  );
}
  
};

