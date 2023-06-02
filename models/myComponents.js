import BaseClass from "../npm/baseClass";
import auth from "../services/auth";
class BaseObject extends BaseClass{
    constructor(operationsFactory){
        super(operationsFactory);
        this.createUUID=this.createUUID.bind(this);
    }
    json;
    starting={
        name:"",
        type: "",
        _id: "",
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
}


class Pic extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.keep=this.keep.bind(this);
        this.like=this.like.bind(this);
    }
    json={
        ...this.starting,
        pics: "", 
        keep: 0,
        picURL: "",
        pic:true,
        ogref:"",
        description: "",
        note: "",
        keepers: {},
        like: 0,
        picURLS: {},
        likers: {},
        type:"monsters",
        destinationURL: ""
        
    }

    async getPicSrc(path){
        let obj={}
        for(const key in path){
            let pic = await auth.downloadPics(path[key]);
            obj["media"+this.createUUID(3)]= pic;
        }
        obj = {...obj, ...this.json.picURLs}

        
        this.json.picURLs = obj
        
    }
   async keep(user, _id){
        if(!Object.keys(this.json.keepers).includes(user.getJson()._id) && this.json.owner.toString()!==user.getJson()._id.toString()){
            this.json.keep= this.json.keep+1;
            let userjson = user.getJson();
            let id = (Math.random(Date.now())+Date.now()+performance.now()).toString();
            let picobj = {...this.json, owner: userjson._id, ogref: this.json._id,type: "keep" + this.json.type, pic: false, _id: id, ogOwner:_id}
            this.json.keepers[user.getJson()._id] = user.getJson().name
            
            await this.operationsFactory.jsonPrepareRun({["add" + picobj.type]: picobj}) 
            await this.operationsFactory.cleanPrepareRun({"update" : this});
        }
        
    }
    async like(user){
        if(!Object.keys(this.json.likers).includes(user.getJson()._id) && this.json.owner.toString()!==user.getJson()._id.toString()){
        this.json.like= this.json.like+1;
        this.json.likers[user.getJson()._id] = user.getJson().name
        await this.operationsFactory.cleanPrepareRun({"update" : this}) 
        }
    }
}

class User extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.follow=this.follow.bind(this);
        this.report=this.report.bind(this);
        this.block=this.block.bind(this);
        this.hide=this.hide.bind(this);
        this.getPicSrc=this.getPicSrc.bind(this);
    }
    json={
        ...this.starting,
        email:"",
        type: "user",
        owner: "",
        keeps:[],
        EULA:false,
        firstName:"",
        lastName:"",
        spawnerHandle:"",
        bio:"",
        website:"",
        socialHandle:"",
        flagged:false,
        eula:false,
        blocked:{},
        hidden:{},
        blockCount:0
        

    }
    report(){
        this.json.flagged=true;
        this.operationsFactory.cleanPrepareRun({update:this});
    }
    block(userInfo){
        this.json.blocked[userInfo.userID] = userInfo.contentID;
        this.json.blockCount++;
        this.operationsFactory.cleanPrepareRun({update:this});
    }
    hide(contentInfo){
        this.json.hidden[contentInfo.contentID] = contentInfo.content;
        this.operationsFactory.cleanPrepareRun({update:this});
    }
    async getPicSrc(path){
        let pic = await auth.downloadPics(path);
        this.json.picURL=pic;
        return pic;
    }
    async follow(picOwner){
        // if(picOwner.getJson()._id===this.json._id){
        //     return;
        // }
        let userFJson = {owner: this.json._id, following: true, name: picOwner.getJson().name, spawnerHandle:picOwner.getJson().name, followID:picOwner.getJson()._id };
        let picOwnerFJson = {owner: picOwner.getJson()._id , name:this.json.name, followID: this.json._id, spawnerHandle:this.json._id, picURL: picOwner.getJson().picURL };
        
        this.operationsFactory.cleanJsonPrepareRun({addfollow:[userFJson, picOwnerFJson]});

    }
}

class Follow extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.unFollow=this.unFollow.bind(this);
    }
    json={
        ...this.starting,
        following: false,
        type: "follow",
        owner: "",
        followID: "",
        website: "",
        picURL: ""
        
    }
    async unFollow(componentList){
        
        let follow = await auth.getFollower(componentList, this.json.owner);

        follow = follow.filter(obj=>{return obj.getJson().owner===this.json.followID})
        follow = follow[0];
        this.operationsFactory.cleanPrepareRun({del: [this, follow]})
    }
}

class Comment extends BaseObject{
    json={
        ...this.starting,
        picOwner: "",
        type: "comment",
        owner: "",
       note: ""
        
    }
}

// class Factory {
//     factory ={
//         pic: new Pic(),
//         user: new User(),
//     }

//     getComponent(component, json){
//         let comp = this.factory[component];
//         comp = Object.assign(Object.create(Object.getPrototypeOf(comp)), comp);
//         comp.setJson({...comp.getJson(), ...json,});
//         return comp;
//     }
// }
export {User, Pic, Comment, Follow};
