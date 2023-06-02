import React, {Component} from 'react';
import Logo from '../assets/spawnLogo.png';

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
import Login from './login';
import Register from './register';
import auth from '../services/auth';

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';

export default class SignInUp extends Component{
  constructor(props){
    super(props);

        this.state={
          register: false,
          forgotPassword:false,
          email:""
          

    }
  }


render(){
  let app=this.props.app;
  let state=app?.state;
  let styles=state.styles;
  let formStyles= state.formStyles;
  return (
        <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width:"100%"
        }}>
          {this.state.forgotPassword&&(
            <View style={{...styles.width}}>
               <Image
      source={Logo}
      resizeMode="contain"
      style={{width: styles.width,
       height: undefined, aspectRatio: 1.7, 
      backgroundColor:styles.colors.Color2, alignSelf:"center",
      
      }}
      />
            <TextInput placeholder=' Enter Email'
            onFocus={()=>{app.dispatch({keyboardMargin:400})}}
            onBlur={()=>{app.dispatch({keyboardMargin:0})}}
          style={{
            ...formStyles.textField, alignSelf:"center",
             }}
            onChangeText={(text)=>{
              this.setState({
                email:text
              });
            }}
          />
          </View>
          )}
          {!this.state.forgotPassword&&(<>
          {this.state.register?(<>{state?.currentComponent?.getJson()?.type==="user"&&(<Register app={app}/>)}</>):(<Login app={app}/>)}
          
          <TouchableOpacity
          onPress={async ()=>{
            if(!this.state.register){
              await state.opps.cleanPrepare({adduser:1});
              let user = state.opps.getUpdater("add")[0];
              this.setState({register:true, })
              app.dispatch({currentComponent:user})
            }
            else{
              this.setState({
                register:false
              })
            }
            
          }}
          ><Text style={{...formStyles.buttonPositive, marginTop: styles.margins.marginSm, alignSelf:"center", 
          backgroundColor:styles.colors.White1, color:styles.colors.Color2, width:102, fontSize:16
          }}>{this.state.register?"Login":"Register"}</Text></TouchableOpacity></>)}
          <TouchableOpacity onPress={()=>{
            
              this.setState({forgotPassword:!this.state.forgotPassword})

            
          }}>
            <Text style={{fontSize:16, color:"blue", textDecorationLine:"underline", marginTop:10, fontFamily:"Regular"}}>{this.state.forgotPassword?"back":"Forgot Password"}</Text>
          </TouchableOpacity>
          {this.state.forgotPassword&&(
          <TouchableOpacity onPress={()=>{
            if(this.state.email!==""){
              auth.sendForgotPasswordChange(this.state.email)
              this.setState({message:"An email was sent to your account", forgotPassword:false})

            }
          }}>
            <Text style={{...formStyles.buttonPositive, marginTop: styles.margins.marginSm, alignSelf:"center", 
          backgroundColor:styles.colors.White1, color:styles.colors.Color2, width:102, fontSize:16
          }}>Submit</Text>
          </TouchableOpacity>
          )}
          <Text style={{fontSize:16, color:"red",  marginTop:10, fontFamily:"Regular"}}>{this.state.message}</Text>
        </View>
  );
}
  
};

