
import React, {Component} from 'react';
import SwipeRender from "react-native-swipe-render";
import auth from '../services/auth';
import ViewMedia from './viewMedia';
import LikeHeart from '../assets/like_grey.png';
import Keep from '../assets/keep_grey.png';
import Keep1 from '../assets/keep2.png';
import LikeHeart1 from '../assets/hrt2.png';
import Swipe from './swipe';

import double from '../assets/moreimg_gs3.webp'
const { width } = Dimensions.get('window')
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,Dimensions,
  TouchableWithoutFeedback,
  View,
  TouchableHighlight,
  
  
} from 'react-native';
import MappedPics from './mappedPics';
import Comments from './commentMap';
import CommentInput from './commentInput';



export default class Feed extends Component {
  constructor(props){
    super(props);
    this.getPic=this.getPic.bind(this);
    this.state={
      load: 20,
      center:{
        display:"flex", justifyContent:"center", alignItems:"center",
        
      },
      marginRight:0

    };
  }
  componentDidMount(){
    
    let app = this.props.app;
    let state= app.state;
    let list = state.componentList;
    let components = list.getComponents();
    let newList = [];
    let user = state.user
    newList = components.filter(obj => {
      return !Object.keys(user.getJson().blocked).includes(obj.getJson().owner)
    })
    newList = newList.filter(obj => {
      return !Object.keys(user.getJson().hidden).includes(obj.getJson()._id)
    })
    list.setComponents(newList);
    app.dispatch({});
  }
  async componentDidUpdate(props, state){
    if(this.props.app.state.componentsAdded){
      await this.props.app.dispatch({componentsAdded:false});
      this.componentDidMount()

    }
    if(props.app.state.switchCase!==this.props.app.state.switchCase){
      
      this.setState({load:20});
    }
  }

  getPic(c){
    let app = this.props.app;
    let state=app?.state;
    
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
    return [arr[0]]
  }
  
render(){
  let app = this.props.app;
  let state=app.state;
  let styles=state.styles;
    let formStyles= state.formStyles;
  let dispatch=app.dispatch

  
  return (
    <View style={{width:"100%", height:"80%", padding: 8,
    background:styles.colors.White1, display:"flex", justifyContent:"center", 
    alignItems:"center", marginTop:30,}}>
     
        <View style={{width:500, height:600, display:"flex", justifyContent:"center", alignItems:"center", }}>
        
        <Swipe style={{ backgroundColor:'#00000000', display:"flex", justifyContent:"center", alignItems:"center", }} 
      onIndexChanged={(index)=>{
        let num = this.state.load;
        if(index%10===0){
          
          num+=10;
          this.setState({load:num});
        }
      }}
      index={state.index}
      
      enableAndroidViewPager={false}
      
      horizontal={true}
        >

          
            {state.componentList.getList(state.switchCase).reverse().slice(0, this.state.load).map((c, index)=>

            <View key={"SwipeRender-slide#" + index} style={ {backgroundColor: "#00000000", width:500, display:"flex", justifyContent:"center", alignItems:"center"}}>
              
              {!Object.keys(state.user.getJson().blocked).includes(c.getJson().owner) && !Object.keys(state.user.getJson().hidden).includes(c.getJson()._id)&&(
              <SafeAreaView style={{width:"100%",display:"flex", justifyContent:"center", alignItems:"center" }}>
                <ScrollView>
                <TouchableOpacity style={{width:"100%", display:'flex', justifyContent:"center", alignItems:"center", color:"black", marginBottom:20}} onLongPress={async ()=>{
                let reportUser = await state.componentList.getComponent("user", c.getJson().owner);

                app.dispatch({contextContent:c, reportUser: reportUser, context: true});

              }}><Text style={{color:"black", maxWidth:300, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, fontFamily: "Regular"}}>{c.getJson().name}</Text></TouchableOpacity>
              <TouchableOpacity activeOpacity={100} onPress={()=>{
                app.dispatch({currentPic:c, popupSwitch:"viewMedia"});
              }} resizeMode="contain" style = {{height:400, width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }} >
                 <ViewMedia  resizeMode="contain" scale={10} media={this.getPic(c)} />
            {/* <Image style={{ width:"100%", height:450 }} source={{uri:c?.getJson().picURL}}/> */}
            {Object.keys(c.getJson().picURLs).length>1&&(<Image source = {double} style={{position:"absolute", top:20, right:45, width:20, height:20}}  />)}
           
            </TouchableOpacity>
            {state.componentList.getComponent("user", c.getJson().owner, "_id") &&(
            <View style={{alignSelf:"flex-end", marginRight:50, marginTop:5, display:"flex", flexDirection:"row"}}>
               
            <Text style ={{color:"black", fontFamily: "Regular"}}>By: </Text>
            <TouchableOpacity onPress={()=>{
              let user = state.componentList.getComponent("user", c.getJson().owner, "_id");
              dispatch({currentFollowing:user, myswitch:"following"})
            }}>
            <Text style={{textDecorationLine:"underline", fontFamily: "Regular", color:"black"}}>{state.componentList.getComponent("user", c.getJson().owner, "_id", true)?.getJson().spawnerHandle}</Text>
            </TouchableOpacity>
            </View>
           )}
            <View style={{marginTop:20}}>
              {(c.getJson().description.length<120||this.state.showAll)?(
                
                <TouchableOpacity onPress={()=>{this.setState({showAll:false})}}>
                <Text style={{maxWidth:300, alignSelf:"center", fontFamily: "Regular"}}>{c.getJson().description}</Text>
                </TouchableOpacity>
):(<TouchableOpacity onPress={()=>{this.setState({showAll:true})}}>
<Text style={{maxWidth:300, alignSelf:"center", fontFamily: "Regular", color:"black"}}>{c.getJson().description.slice(0,120)}...</Text>
</TouchableOpacity>)}
            </View>
<View style={{height:20}}></View>

             <View style={{backgroundColor:styles.colors.Grey1, borderTopWidth:2,
              borderColor:styles.colors.Color2, flexDirection:"row", width:300, alignSelf:"center", 
              padding:11, borderLeft:'#00000000', borderRadius:6, borderRightColor:'#00000000'
               }}>
              

      <TouchableOpacity onPress={c.keep.bind(this, state.user, c.getJson().owner)} style={{display: "flex", flexDirection:"row", height: 52,}}>
       <Text style={{
       fontFamily: styles.fonts.fontBold, fontSize:20,
                       marginRight: -5, 
          }}>{c.getJson().keep} </Text>
       <Image source={!Object.keys(c.getJson().keepers).includes(state.user.getJson()._id) && c.getJson().owner.toString()!==state.user.getJson()._id.toString()?Keep:Keep1}  resizeMode="contain" style={{...styles.icon2, }} />
       </TouchableOpacity>


       <TouchableOpacity onPress={c.like.bind(this, state.user)} style={{display: "flex", flexDirection:"row", height: 52,}}>
           <Text style={{fontFamily: styles.fonts.fontBold,
                          fontSize:20,
          }}>{c.getJson().like} </Text>
           <Image source={!Object.keys(c.getJson().likers).includes(state.user.getJson()._id) && c.getJson().owner.toString()!==state.user.getJson()._id.toString()?LikeHeart: LikeHeart1} resizeMode="contain" style={{...styles.icon2}} />
           </TouchableOpacity>

           <TouchableOpacity
           style={{marginLeft:64, alignSelf:"center", borderRadius:7,...formStyles.buttonPositive, display:"flex", alignItems:"center", justifyContent:"center",width:100, }}
              onPress={async() => {
                if(state.componentList.getComponent('follow', c.getJson().owner, "followID")!==undefined)
                {
                  return;
                }
                let complist = app.state.componentList.getList("follow");
              let arr = [];
               for(const key in complist){
                arr.push(complist[key]?.getJson().followID);
               }
               if(!arr.includes(app.state.picOwner?.getJson()._id)){
                let picOwner= await auth.getPicOwner(state.componentList, c.getJson().owner);

                app.state.user?.follow(picOwner)
               }
               }}
              ><Text 
              style={{ fontFamily: "Bold",
              fontSize:18, borderRadius:7, color:"white"}}
              >{state.componentList.getComponent('follow', c.getJson().owner, "followID")!==undefined?("Following"): ("Follow")}</Text>
              </TouchableOpacity>


           </View>
           <View style = {{marginLeft:40}}>
            <TouchableOpacity onPress={()=>{
                app.dispatch({currentPic:c, popupSwitch:"viewMedia"});
              }}>
           <Text style={{color:"black", fontSize:13, marginLeft:50, fontFamily: "Regular"}}>Comments: {state.componentList.getList("comment", c.getJson()._id, "picOwner").length} </Text>
           </TouchableOpacity>
           </View>
           <View style={{height:50}}></View>
           </ScrollView>
           </SafeAreaView>)}
        </View>
    
            )}
            
        </Swipe>
        </View>

    
    
    </View>

);
}

};

const styles = {
  wrapper: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:270,
     height:500
  },
  slide: {
    flex: 1,
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width,
    flex: 1
  },
  paginationStyle: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    // position: 'absolute',
    
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  }
}