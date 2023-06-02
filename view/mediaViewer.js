
import React, {Component} from 'react';
import SwipeRender from "react-native-swipe-render";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import auth from '../services/auth';
import ViewMedia from './viewMedia';
import LikeHeart from '../assets/like_grey.png';
import Keep from '../assets/keep_grey.png';
import Comments from './commentMap';
import CommentInput from './commentInput';
import Trash from '../assets/trash-can.png'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const { width } = Dimensions.get('window')
import {
  Image,
  Linking,
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
import CarouselDots from './carousel';
import Swipe from './swipe';


export default class MediaViewer extends Component{
  constructor(props){
    super(props);
    this.state={
      center:{
        display:"flex", justifyContent:"center", alignItems:"center"
      },
      marginRight:0

    };
  }

  

render(){
  let app=this.props.app;
  let state=app?.state;
  let styles=state.styles;

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

  let dispatch= app.dispatch;
  
  return (
    <View style={backgroundStyle}>
      <TouchableOpacity style={{position:'absolute', top:40, right:0, width:50, height:50, zIndex:850}} onPress={()=>{
            dispatch({currentPic:undefined, popupSwitch:"",viewMediaKeep:false})}}><Text style={{color:"white", fontSize:20}}>X</Text></TouchableOpacity>
            {(state.currentPic?.getJson().owner===state.user.getJson()._id &&!state.viewMediaKeep )&&(<TouchableOpacity style={{position:'absolute', top:40, left:20, width:50, height:50, zIndex:850}} onPress={async ()=>{
              await this.props.app.state.componentList.getOperationsFactory().cleanPrepare({update:state.currentPic});
            await app.dispatch({currentComponent:undefined});
            let cp= state.currentPic
            this.props.app.dispatch({myswitch: "createspawns", currentComponent:cp,currentPic:undefined, popupSwitch:"",viewMediaKeep:false, updateSpawn:true})
            }}><Text style={{color:"white", fontSize:20}}>Edit</Text></TouchableOpacity>)}
{state.currentPic&&(
        <View style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", zIndex:700,}}>
 
                            <Text style={{fontFamily: "Regular", color:"white", marginTop:50, alignSelf:'center', fontSize:30, marginBottom:20}}>{state.currentPic.getJson().name}</Text>
                            

        <Swipe onIndexChanged={(index)=>{
          this.setState({index:index})
        }}  style={{ backgroundColor:'#00000000', display:"flex", justifyContent:"center", alignItems:"center", zIndex:750, height:330 }} 

      index={state.index}
      
      enableAndroidViewPager={false}
      
      horizontal={true}
        >
          

          
            {Object.values(state.currentPic.getJson().picURLs).map((c, index)=>

            <View key={"SwipeRender-slide#" + index} style={ {backgroundColor: "#00000000",  width:"100%", height:"100%", display:"flex",  alignItems:"center" }}>
        
        <ReactNativeZoomableView
   maxZoom={1.5}
   minZoom={0.5}
   zoomStep={0.5}
   initialZoom={1}
   bindToBorders={true}
   onZoomAfter={this.logOutZoomState}
   style={{height:350, width:350, zIndex:751,  }}
>
<Image style={{height:350, width:350, zIndex:751,  }} source={{uri:c}} resizeMode="contain"/>
</ReactNativeZoomableView>
    
      
          
           </View>)}
    
            
            
        </Swipe>
        {Object.keys(state.currentPic.getJson().picURLs).length!==1 &&(
        <CarouselDots data={state.currentPic.getJson().picURLs} activeIndex={this.state.index? this.state.index:0} />
        )}
        <View style={{marginRight:25,  marginTop:15, display:"flex", flexDirection:"row", alignSelf:"center"}}>
               
               <Text style={{fontFamily: "Regular", color:"white",}}>By: </Text>
               <TouchableOpacity onPress={()=>{
                 let user = state.componentList.getComponent("user", state.viewMediaKeep? state.currentPic.getJson().ogOwner: state.currentPic.getJson().owner, "_id");
                 dispatch({currentFollowing:user, myswitch:"following", currentPic:undefined, popupSwitch:"", oldState:{...state, popupSwitch:"", currentPic:undefined,}})
               }}>
               <Text style={{fontFamily: "Regular", textDecorationLine:"underline", color:"white"}}>
                {state.componentList.getComponent("user", state.viewMediaKeep? state.currentPic.getJson().ogOwner: state.currentPic.getJson().owner, "_id")?.getJson().spawnerHandle}
                
                </Text>
               </TouchableOpacity>
               </View>

               <TouchableOpacity style={{alignSelf:'center', marginTop:5}} onPress={async ()=>{
                let user = state.componentList.getComponent("user", state.currentPic.getJson().owner, "_id");
                let url = user.getJson().website;
                if(!url.includes("https")){
                  url = "https://" +url;
                }
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
               }}>
                <Text style={{fontFamily: "Regular", color:"white", textDecorationLine:"underline"}}>{state.componentList.getComponent("user",state.viewMediaKeep? state.currentPic.getJson().ogOwner: state.currentPic.getJson().owner, "_id", true)?.getJson().website}</Text>
               </TouchableOpacity>
               <SafeAreaView style={{width:"100%", height:"40%",display:"flex"}}>
                <ScrollView>
        <Text style={{fontFamily: "Regular",color:"white", alignSelf:'center', padding:40, paddingTop:20 }}>{state.currentPic.getJson().description}</Text>
        {state.viewMediaKeep===true?(<View>
          <Text style={{fontFamily: "Regular", color:"white", marginLeft:50, fontSize:24, marginBottom:state.currentPic.getJson().note!==""?10:0}}>Notes:</Text>
          {state.viewMediaKeep&&(
                            <TouchableOpacity style={{position:"absolute", right:30, top:0}} onPress={async ()=>{
                              await state.opps.cleanPrepareRun({del: state.currentPic});
                              dispatch({currentPic:undefined, popupSwitch:'', keepDeleted:true})
                            }}>
                              <Image source={Trash} style={{width:25, height:25}}></Image>
                            </TouchableOpacity>
                            )}
                            
                           
        <Text style={{fontFamily: "Regular", color:"white", marginLeft:55, marginTop:state.currentPic.getJson().note!==""?10:0}}>{state.currentPic.getJson().note}</Text>
        
          <TouchableOpacity style={{marginTop:10}} onPress={async()=>{
            await dispatch({currentComponent:undefined})
    this.setState({comment:true});

    await dispatch({object:state.currentPic, operate:"update", operation:"cleanPrepare"});
  }}
   ><Text style={{fontFamily: "Regular", color:"white", marginLeft:65, marginBottom:15}}>{state.currentPic.getJson().note!==""?("Edit Note"):("Add Note")}</Text></TouchableOpacity>
   {(this.state.comment &&state.currentComponent!==undefined) &&(<View style={{display:"flex", flexDirection:'row', marginLeft:60, }}>
   
      <CommentInput app={app} obj ={state.currentComponent} text="save"/>
   </View>)}
        </View>):(

<View>
<Text style={{fontFamily: "Regular", color:"white", fontSize:25, marginLeft:50}}>Comments:</Text>
{(state.user.getJson()._id===state.currentPic.getJson().owner)&&(
                            <TouchableOpacity style={{position:"absolute", right:30, top:0}} onPress={async ()=>{
                              await state.opps.cleanPrepareRun({del: state.currentPic});
                              dispatch({currentPic:undefined, popupSwitch:'', spawnDeleted:true})
                            }}>
                              <Image source={Trash} style={{width:25, height:25}}></Image>
                            </TouchableOpacity>
                            )}
   <TouchableOpacity onPress={async()=>{
    this.setState({comment:true});
    await dispatch({currentComponent:undefined});
    dispatch({operate:"addcomment", operation:"cleanJsonPrepare", object:{picOwner:state.currentPic.getJson()._id, commentOwner:state.user.getJson().spawnerHandle, picURL: state.user.getJson().picURL }})
  }}
   ><Text style={{fontFamily: "Regular", color:"white", marginLeft:65, marginTop:5}}>+ Add a Comment</Text></TouchableOpacity>
   {(this.state.comment &&state.currentComponent!==undefined) &&(<View style={{display:"flex", flexDirection:'row'}}>
   <Image style={{width:50, height:50, borderRadius:25}} source={{
uri:(state.user.getJson().picURL===""||state.user.getJson().picURL===undefined)? Keep: state.user.getJson().picURL
}} />
      {state.currentComponent.getJson().type==="comment" &&(<CommentInput app={app} />)}
   </View>)}
   <View style={{marginTop:10}}>
   <Comments app={app} pic={state.currentPic} textColor="white"/>
   </View>
   </View>
        )}
        <View style={{marginTop:200}}></View>
        
        </ScrollView>
           </SafeAreaView>
        </View>
)}
    </View>
    
  );
}
  
};

