
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, orderBy, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { db, storage,auth } from '../firebase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, getAuth, sendEmailVerification, applyActionCode, reload } from "firebase/auth";


import firestore from '@react-native-firebase/app';
import messaging from '@react-native-firebase/app';


class Auth {

    async getCurrentUser() {
        // return localStorage.getItem("user");
    }

    // async saveTokenToDatabase(email, token) {

    //     await firestore()
    //       .collection('users')
    //       .doc(email)
    //       .update({
    //         tokens: firestore.FieldValue.arrayUnion(token),
    //       });
    //       return token
    //   }

    // async saveToken(email){
    //    let token = await messaging()
    //   .getToken()
    //   .then(token => {
    //     return this.saveTokenToDatabase(email, token);
    //   });
      
    // }
    // async checkToken(email){
    //     await messaging().onTokenRefresh (token => {
    //         return this.saveTokenToDatabase(email, token);
    //       });
    // }

    // async requestUserPermission() {
    //     const authorizationStatus = await messaging().requestPermission();
      
    //     if (authorizationStatus) {
    //       console.log('Permission status:', authorizationStatus);
    //     }
    //   }

    async getuser(email, componentList) {
        
        let list= componentList.getComponents();
        let IDlist = [];
        for(const key in list){
            if(list[key]){
                IDlist.push(list[key]?.getJson()._id)

            }
        }
        let rawData = [];
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('owner', '==', email), orderBy("date"));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if(!IDlist.includes(data._id)){
            rawData.push(data);
            }
        }
        
        await componentList.addComponents(rawData, false);
        
    }
    async getAllTheDataForTheUser(email, componentList, dispatch) {

        let rawData = [];
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('owner', '==', email), orderBy("date"))

        let comps = await onSnapshot(components, async (querySnapshot) => {


            rawData = [];

            for (const key in querySnapshot.docs) {
                let data = querySnapshot.docs[key].data()

                rawData.push(data);
            }
            
            await componentList.addComponents(rawData, false);
            let user = await componentList.getComponent('user');
            await AsyncStorage.setItem('@userKey', JSON.stringify(user.getJson()));
            
            dispatch({ login: true, register: false, loginPage: false, registerPage: false, user: user, email: email, verified:true,start:true, keyboardMargin:0, componentsAdded:true, });
        })
        dispatch({ myswitch:"myspawns" });


    };
    async getAllComments(componentList) {

        let rawData = [];
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('type', '==', "comment"), orderBy("date"))

        let comps = await onSnapshot(components, async (querySnapshot) => {


            rawData = [];

            for (const key in querySnapshot.docs) {
                let data = querySnapshot.docs[key].data()
                rawData.push(data);
            }
            await componentList.addComponents(rawData, false);
           

        })

    };

    async getAllUsers(componentList) {

        let rawData = [];
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('type', '==', "user"))
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
                rawData.push(data);

            
        }
        await componentList.addComponents(rawData, false);

    };

    async getPics( componentList) {
        let rawData = [];

        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('pic', '==', true), orderBy("date"));
        let comps = await onSnapshot(components, async (querySnapshot) => {


            rawData = [];

            for (const key in querySnapshot.docs) {
                let data = querySnapshot.docs[key].data()
                rawData.push(data);
            }
            await componentList.addComponents(rawData, false);
           

        })
    }
    async getComments( componentList, id) {
        
        let rawData = [];
        let IDlist = []
        let comments = componentList.getList("comment");
        for(const key in comments){
            IDlist.push(comments[key].getJson()._id)
        }
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('picOwner', '==', id));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
                if(!IDlist.includes(data._id)){
                    rawData.push(data);
                }
        }

        await componentList.addComponents(rawData, false);
    }
    async getPicOwner(componentList, id, getHandle) {
        
        let rawData = [];
        let IDlist = [];
        let users = componentList.getList("user");
        for(const key in users){
            IDlist.push(users[key].getJson()._id)
        }
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('_id', '==', id));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            if(!IDlist.includes(data._id)){
                    rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        let picOwner = componentList.getComponent("user", id, "_id", false);
        return getHandle? picOwner.getJson().spawnerHandle : picOwner
    }
    async getFollower(componentList, id) {
        
        let rawData = [];
        let IDlist = [];
        let follow = componentList.getList("follow");
        for(const key in follow){
            IDlist.push(follow[key].getJson()._id);
        }
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('followID', '==', id));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            if(!IDlist.includes(data._id)){
                    rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        let following = componentList.getList("follow", id, "followID");
        return following
    }
    async getAllFollowers(componentList, id) {
        
        let rawData = [];
        let IDlist = [];
        let follow = componentList.getList("follow");
        for(const key in follow){
            IDlist.push(follow[key].getJson()._id);
        }
        const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('followID', '==', id));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            if(!IDlist.includes(data._id)){
                    rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        let following = componentList.getList("follow", id, "followID");
        return following
    }

    async login(email, password, componentList, dispatch) {
        
        let user;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)

            });
            if(user){
               
                if (user.emailVerified) {
                    let saveUser = user
                    // this.requestUserPermission();
                    await this.getAllTheDataForTheUser(email, componentList, dispatch);
                    await this.getAllComments(componentList);
                    await this.getPics(componentList);
            await this.getAllUsers(componentList)
                    user = await componentList.getComponent('user');

                }
                else {
                    user = false;
                    var verifyUser = auth.currentUser;
                    await sendEmailVerification(verifyUser).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        console.log(errorCode)
                    })
                }
    
                
            }
            return user;
    }
   



    // async getComponentsAndUpdata(componentList) {
    //     // debugger
    //     debugger

    //     let rawData = [];
    //     const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('collection', '!=', ""));
    //     let comps = await getDocs(components);
    //     for (const key in comps.docs) {
    //         let data = comps.docs[key].data()

    //         rawData.push(data);

    //     }


    //     await componentList.addComponents(rawData, false);
    //     let comps1 = componentList.getComponents();
    //     let obj = {update:comps1}
    //     this.dispatch(obj)
    // }

    async register(email, password) {

        let user;
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        })
            if(user){
                console.log(user);
                var verifyUser = auth.currentUser;
                await sendEmailVerification(verifyUser).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    console.log(errorCode)
                })

            }

        return user;
    }

    async verifyUser(oob,) {
        await applyActionCode(auth, oob)
            .then(() => {
                console.log("success");
                // handle success here
            }).catch(err => {
                console.log(err);
                //handle failure here 
            });
        reload(auth.currentUser).then(() => {
            console.log(auth.currentUser.emailVerified)
        })


    }
    async logout() {
        // await localStorage.clear();
        let logouser;
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                logouser = user.uid;
                // ...
            }
        })
        if (logouser) {
            await signOut(auth);

        }
        window.location.reload();
    }
    async uploadPics(pic, name) {
        const storageRef = ref(storage, name);
        await uploadBytes(storageRef, pic).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    async downloadPics(name) {
        let src;
        await getDownloadURL(ref(storage, name)).then((url) => {

            src = url;
        })
        return src;
    }
    sendForgotPasswordChange(email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }

    deletePics(name) {
        
        const delRef = ref(storage, name);
        // Delete the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }
/**
     * 
     * @param {*} role 
     * @param {*} id 
     * @param {*} changeData 
     * @returns change any data I want.
     */
    async dispatch(obj, email) {

        
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? operate[i].getJson() : operate[i];
                component.date = await serverTimestamp();
                switch (key) {
                    case "add":
                        component.collection = email;
                        await setDoc(doc(db, 'DNDusers', "DNDAPP", 'components', component._id), component);
                        break;
                    case "del":
                        await deleteDoc(doc(db, 'DNDusers', "DNDAPP", 'components', component));
                        break;
                    case "update":
                        await updateDoc(doc(db, 'DNDusers', "DNDAPP", 'components', component._id), component);
                        break;
                }

            }
        }
    }


    // user(){
        
    // }
    // async getuser(componentList){
    //     let user = {};
    //     let components = [
    //         {name:"jared", email:"jared@gmail.com", type:"user", _id: "1"}, 
    //         {name: "mummy", pic: Mummy, type:"monsters",_id: "2"}, 
    //         {name: "bongobongo", pic: Bongobongo, type:"monsters",_id: "3"},
    //         {name: "celestial", pic: Celestial, type:"heroes", _id: "4"},
    //         {name: "dragon", pic: Dragon, type:"statblocks",_id: "5"}
    //     ];
    //     await componentList.addComponents(components);
    //     user.components=componentList.getComponents();
    //     return user;
    // }
}
export default new Auth();