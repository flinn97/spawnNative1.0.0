import React, {Component} from 'react';
import downArrow from '../assets/right.webp' 
// import Slider from 'react-native-slider';
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
  Switch,
  Keyboard
} from 'react-native';
import styleService from '../services/styleService';

export default class DropDownComponent extends Component{
  constructor(props){
    super(props);
        this.state={
          list: this.props.list,
          currentItem: undefined,
          placeHolder: this.props.placeHolder,
          showList: false,
          obj: undefined,
          value: "",
          

    }
  }
  async componentDidMount(){
    if(this.props.obj){
      await this.setState({obj:this.props.obj, value: this.props.obj.getJson()[this.props.name], currentItem:this.props.obj.getJson()[this.props.name]})
    }
  }



render(){
  let app = this.props.app;
  let state=app.state;
  let styles=state.styles;
    let formStyles= state.formStyles;
 
  return (
    <View style={{ 
      zIndex:100, width:"100%"
      }}>
      <TouchableOpacity  onPress={()=>{
        app.dispatch({})
        Keyboard.dismiss();
        this.setState({showList:!this.state.showList})}} 
      style={{borderWidth:0, width:"100%", borderRadius: 14, height:35, display:'flex', flexDirection:'row', alignItems:"center"}} >
        <Text style={{fontSize:20, marginLeft:10, fontFamily: "Regular"}}>{this.state.currentItem===undefined?this.props.placeHolder:this.state.currentItem}</Text>
      <Image source={downArrow} resizeMode="contain"
      style={{...formStyles.buttonClose, transform: [{ rotate: '90deg' }],}}/>
      </TouchableOpacity>
      <View style={{position:"absolute", shadowColor: '#171717', top:15, backgroundColor:styles.colors.White1, width:200, marginLeft:20, zIndex:200,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,}}>
      {this.state.showList&&(
        <View style={{backgroundColor:styles.colors.White1, width:"100%",  zIndex:500,}}>
          {this.state.list.map((item, index)=>
          <TouchableOpacity onPress={()=>{
            this.setState({currentItem:item, showList:false});
            if(this.state.obj){
              
              this.props.obj.setJson({...this.state.obj.getJson(), [this.props.name]: item})
              console.log(this.state.obj.getJson())
            }
            if(this.props.handleChange){
              console.log("handle")
              this.props.handleChange(item)
            }
          }} key={index}><Text style={{fontSize:20, fontFamily:styles.fonts.fontNormal, color:"black" }}>{item}</Text></TouchableOpacity>
          )}
        </View>
      )}
      </View>
 </View>
  );
}
  
};

