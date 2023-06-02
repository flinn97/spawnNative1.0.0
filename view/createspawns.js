import React, {Component} from 'react';
import ViewMedia from './viewMedia';
import auth from '../services/auth';
// import Slider from 'react-native-slider';
import {
  SafeAreaView,
  ScrollView,
  Linking,
  StatusBar,
  Image,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Switch
} from 'react-native';

// import Animated, {
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
//   Easing,
// } from 'react-native-reanimated';
// import CircularProgress from 'react-native-circular-progress-indicator';

// import SelectFileComponent from './selectFileComponent';
import DropDownComponent from './dropdownComponent';
import InputComponent from './inputComponent';
import styleService from '../services/styleService';
import styleForms from '../services/spawnForms';
import SelectFileComponent from './selectFileComponent';
export default class Createspawns extends Component{
  
  constructor(props){
    super(props);
    this.setPic=this.setPic.bind(this);
    this.handleSubmission=this.handleSubmission.bind(this);
    this.handleChange = this.handleChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state={
          percent: "",
          currentPic: undefined,
          blob: undefined,
          loading:this.props.app.state.updateSpawn?"Update Spawn": "Create Spawn",
          paths: [],
          newPics:[],
          list:[],
          delList:[],
          
          loaded: "",
          name: "",
          type: "",
          picMessage:""
          

    }
  }

  async setPic(pic, blob){
    if(pic ===false){
      this.setState({picMessage:"Your image needs to be smaller than 2000kb or you need to upload this image on the "})
      return
    }
    else{
      this.setState({picMessage:""})

    }
    await this.setState({
      currentPic:pic,
      blob:blob,
    })
    this.changeHandler();
  }

  changeHandler = async () => {
    if(this.state.list.length<5){
    
    let list = [...this.state.newPics];
    let paths = [...this.state.paths];
    let oldList=[...this.state.list, this.state.currentPic];

    
                var fileOfBlob = this.state.blob;
                let path= "media/" + this.createUUID();
              
                list.push(fileOfBlob);
                paths.push(path);
                this.setState({newPics:list, paths:paths, list:oldList, showPics:true});
        
    }
  
};
async handleSubmission()  {
    
    await this.setState({loading:"loading..."});
    let list = [...this.state.newPics];
    for(const key in list){
        await auth.uploadPics(list[key], this.state.paths[key]);

    }
   

    
    let component = this.props.app.state.currentComponent
    component.setJson({...component.getJson(), owner:this.props.app.state.user.getJson()._id})
    if(this.state.paths.length>0){
      await component.getPicSrc([...this.state.paths]);
    }

    if(this.props.app.state.updateSpawn){
        let li = Object.values(component.getJson().picURLs);
        let obj={}
        for(const key in li){
            if(!this.state.delList.includes(li[key])){
                obj["media"+component.createUUID(3)]= li[key];

            }
        }
        component.setJson({...component.getJson(), picURLs:obj})
    }
    


    if(component.getJson().type===""){
      component.setJson({...component.getJson(), type:"monsters"})
    }
    await component.getOperationsFactory().run();
    await this.setState({loading:"loading..."});


    this.props.app.dispatch({ myswitch: "feed", pic: component, newSpawn: false, switchcase:component.getJson().type })
    
    
    

};
handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
        [name]: value,
    })
}

componentDidMount() {
    if(this.props.app.state.updateSpawn){

    
    let name=Object.keys(this.props.app.state.currentComponent?.getJson().picURLs).length!==0? "picURLs": "picURL";
    let obj = this.props.app.state?.currentComponent;
    let uploads = obj.getJson()[name];
    if(uploads!==""){
    let items = Object.prototype.toString.call(uploads) === "[object String]"? [uploads]: Object.values(uploads);;
    let list = []
    for(const key in items){
        list.push(items[key]);
    }
    this.setState({list:list});
  }
}
}

  createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdefhklmnopqrstvwxyz";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

async handleSubmission()  {
  let component = this.props.app.state.currentComponent
  if(this.state.newPics.length===0 && this.state.list.length===0){
      this.setState({message:"You still need to Spawn something! Upload an image."})
      return
  }

  if(component.getJson().type==="" || component.getJson().type===undefined) {
      this.setState({message:"You need a type for your Spawn."})
      return
  }

  
  await this.setState({loading:"...loading"});
  let list = [...this.state.newPics];
  for(const key in list){
      await auth.uploadPics(list[key], this.state.paths[key]);

  }
 

  
  component.setJson({...component.getJson(), owner:this.props.app.state.user.getJson()._id})
  if(this.state.paths.length>0){
    await component.getPicSrc([...this.state.paths]);

  }

  if(this.props.app.state.updateSpawn){
   
      let li = Object.values(component.getJson().picURLs);
      let obj={}
      for(const key in li){
        
          if(!this.state.delList.includes(li[key])){
              obj["media"+component.createUUID(3)]= li[key];

          }
      }
      component.setJson({...component.getJson(), picURLs:obj})
  }
  



  await component.getOperationsFactory().run();
  this.props.app.dispatch({myswitch:"myspawns", updateSpawn:false })
  await this.setState({loading:"loading..."});


  // this.props.app.dispatch({ myswitch: "feed", pic: componentSea , newSpawn: false, switchcase:component.getJson().type })
  
  
  

};

render(){
  let app = this.props.app;
  let state=app.state;
  let dispatch= app.dispatch;
   let styles= state.styles;
   let formStyles= state.formStyles;


  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: styles.colors.White1,//isDarkMode ? Colors.darker : Colors.lighter,
    height:"100%",
    borderRadius: 22,
    borderWidth:1,
    width:'100%',
    display:'flex',
    alignItems:"center",
    
    position:'absolute',
    top:120,
    zIndex:1000
    
    
  };
  let obj = state.currentComponent
  return (
    
    <View style={backgroundStyle}>
      
      <TouchableOpacity onPress={()=>{this.props.app.dispatch({myswitch:"myspawns", updateSpawn:false})}} style={{position:'absolute', top:30, right:30, zIndex:1003}}><Text style={{...formStyles.buttonClose, fontFamily: styles.fonts.fontBold, top:-14, right:-11, fontSize:26, color:styles.colors.Color2}}>X</Text></TouchableOpacity>
    
    <View  style={{ position:'absolute', borderRadius: 22, width:'100%', height:'100%', backgroundColor:styles.colors.White1, padding:2, opacity:.7, zIndex:1001 }}>
 </View>
 <View style={{ alignItems: "center", width:'100%', height:'87%', marginTop:20, backgroundColor:"white", zIndex:1002, display:'flex', alignItems:'center', paddingTop:7, borderRadius:22}}>
 <ViewMedia scale={3} removeMedia={(obj)=>{
  let list= [...this.state.list];
  let delList=[...this.state.delList];
  delList.push(obj.content);
  list.splice(obj.index, 1);
  this.setState({list:list, delList:delList});
 }} editable={true} media={[...this.state.list]} />
  <SelectFileComponent setPic={this.setPic} app={this.props.app} />
  {this.state.picMessage!=="" &&(<View style={{display:'flex', flexDirection:"row", width:350, alignSelf:'center'}}>
    <Text style={{color:'red', fontFamily: "Regular"}}>{this.state.picMessage} <TouchableOpacity style={{margin:0, marginBottom:-3}} onPress={async ()=>{
                let url = "https://app.spawnrpg.com";
                
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
               }}>
                <Text style={{color:"red", textDecorationLine:"underline", fontFamily: "Regular"}}>browser.</Text>
               </TouchableOpacity></Text>
    
               </View>)}
  <View style={{display:"flex",direction:"row",  alignItems:"flex-start", marginBottom:20}}>
      <InputComponent placeholder="Title"  obj={obj} name="name" app={app} {...formStyles.textField}/></View>
  <View style={{display:"flex",direction:"row", alignItems:"flex-start", marginBottom:20}}>
      <InputComponent multiline={true} setPosition={()=>{
        if(state.keyboardMargin===0){
          app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})
        }
        }}
        setOnDefocus={()=>{
          if(state.keyboardMargin===400){
            app.dispatch({keyboardPosition:'auto', keyboardMargin:0})          }
          }} 
        numberOfLines={4}  returnKeyType="Done" obj={obj} name="description" placeholder="Description"  app={app} width={270} height={100} fontFamily= "Regular" fontSize={16} paddingLeft={5}/></View>
      <View style={{display:"flex",direction:"row", alignItems:"flex-start", zIndex:190}}>
      <Text style={{fontFamily: styles.fonts.fontBold, fontSize:15, marginBottom:5, fontFamily: "Regular"}}>Type</Text>
      <View style={{borderWidth:1, width:270, borderRadius:7, marginBottom:20}}>
  <DropDownComponent list={['monsters', 'heroes', 'worlds', 'maps', 'statblocks']} obj={obj} name="type" app={app} />
  </View>
  </View>
   
    <View style={{display:"flex",direction:"row", alignItems:"flex-start"}}>
      <InputComponent setPosition={()=>{
        if(state.keyboardMargin===0){
          app.dispatch({keyboardPosition:'absolute', keyboardMargin:400})
        }
        }}
        setOnDefocus={()=>{
          if(state.keyboardMargin===400){
            app.dispatch({keyboardPosition:'auto', keyboardMargin:0})          }
          }} obj={obj} name="destinationURL" app={app} {...formStyles.textField} placeholder="Link"/></View>

<TouchableOpacity onPress={this.handleSubmission} style={{padding:2, position:"absolute", bottom:70, width:225, height:40,backgroundColor:'#A80303', borderRadius:7, display:"flex", justifyContent:'center', alignItems:'center'}}>
    <Text style={{color:styles.colors.White1, fontSize:20, fontFamily: "Regular"}}>{this.state.loading}</Text></TouchableOpacity>
 </View>
 </View>

  );
}
  
};

