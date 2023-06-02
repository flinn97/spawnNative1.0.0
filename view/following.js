
import React, {Component} from 'react';
import ViewMedia from './viewMedia';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Image,
  Touchable
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PicMap from './picMap.js';



export default class Following extends Component {
  constructor(props){
    super(props);
    this.getPic=this.getPic.bind(this);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      }

    };
  }
  getPic(c){
    let app = this.props.app;
    let state = app.state;
    let pic = c;
    let arr =[]
    if(pic.getJson().picURLs!==undefined){

    
    if(Object.keys(pic.getJson().picURLs)[0]){
      
      for (const key in pic?.getJson().picURLs){
        arr.push(pic?.getJson().picURLs[key]);
      }
    }
    else{
      arr=[pic.getJson().picURL]
    }
  }
    else{
      arr=[pic.getJson().picURL]
    }
    return arr
  }
  componentDidMount(){
    let list = this.props.app.state.componentList
    let user = this.props.app.state.currentFollowing;
    if(!user){
      return
    }
    let pics = [...list.getList("monsters", user.getJson()._id), ...list.getList("heroes", user.getJson()._id), ...list.getList("statblocks", user.getJson()._id), 
  ...list.getList("worlds", user.getJson()._id), ...list.getList('maps', user.getJson()._id)];
  this.setState({pics:pics})
  }
render(){
  let app = this.props.app
  let pics = app.state.componentList?.getComponents();
  let switchcase = app.state.switchcase;
  let dispatch = app.dispatch;
  let state = app.state;
  let styles =state.styles;
  let formStyles= state.formStyles;
return (

  <SafeAreaView style={{width:styles.width, height:"65%", background:"white", display:"flex", justifyContent:"center", alignItems:"center", marginTop:0}}>
    <ScrollView>
    <View style={{width:styles.width, display:"flex", flexDirection:"row", position:"relative",}}>
    <View style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginLeft:20}}>      
    <Image style={{
                  width: 90,
                  height: 90,
                  marginLeft:15,
                  // objectFit: "scale-down", 
                  borderRadius: 45,
                  }}
                   source={{uri:state.currentFollowing?.getJson().picURL}}  />
                  
                   <Text style={{color:"black", fontFamily: "Regular", }}>{state.currentFollowing?.getJson().firstName} {state.currentFollowing?.getJson().lastName}</Text>
                   
</View>
<View style={{display:"flex", justifyContent:'center', alignItems:"center", marginLeft:20}}><Text style={{fontFamily: "Regular", color:"black"}}>{this.state.pics?.length}</Text>
<Text style={{fontFamily: "Regular", color:"black"}}>Spawns</Text></View>
<View style={{position:"absolute", right:30, }}>
<TouchableOpacity
           style={{ alignSelf:"center", borderRadius:7,...formStyles.buttonPositive, width:100, display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}
              onPress={async() => {
                let followComp =state.componentList.getList('follow', state.currentFollowing.getJson()._id, "followID");
                followComp = followComp.filter(obj=>{return obj.getJson().owner= state.user?.getJson()._id})

                
                if(followComp.length>=1){
                  followComp = followComp[0];

                  followComp.unFollow(state.componentList)

                }
                else{
                  
                  app.state.user?.follow(state.currentFollowing)
                }
               
               }}
              ><Text 
              style={{ fontFamily: "Bold",
              fontSize:18, borderRadius:7, color:"white"}}
              >{state.componentList.getComponent('follow', state.currentFollowing.getJson().owner, "followID")!==undefined?("Unfollow"): ("Follow")}</Text>
              </TouchableOpacity>
              </View>       
</View>
<View style={{marginTop:10, marginLeft:20, width:300}}>
      <View style={{display:'flex', flexDirection:'row', marginBottom:5}}><Text  style={{fontFamily: "Regular",color:"black", fontWeight:"bold"}}>About:</Text><Text style={{fontFamily: "Regular",color:"black", }}> {state.currentFollowing.getJson().about} </Text></View>
      <View style={{display:'flex', flexDirection:'row', marginBottom:5}}>
        <TouchableOpacity onPress={ async ()=>{
          let url = state.currentFollowing.getJson().website
          if(!url.includes("https")){
            url = "https://" +url;
          }
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          }
        }}><Text style={{fontFamily: "Regular",color:"black", fontWeight:"bold"}}>Website: </Text><Text style={{fontFamily: "Regular",color:"black", textDecorationLine:"underline"}}>{state.currentFollowing.getJson().website}</Text></TouchableOpacity></View>
      <View style={{display:'flex', flexDirection:'row', marginBottom:5}}><Text style={{fontFamily: "Regular",color:"black", fontWeight:"bold"}}>Social: </Text><Text style={{fontFamily: "Regular",color:"black", }}>{state.currentFollowing.getJson().socialHandle}</Text></View>
      <Text style={{fontFamily: "Regular", marginTop:20, fontSize:20, marginBottom:20}}>Spawns:</Text>
      </View>

      
      <PicMap app={app} pics = {this.state.pics} />
        </ScrollView>
  </SafeAreaView>

);
}

};