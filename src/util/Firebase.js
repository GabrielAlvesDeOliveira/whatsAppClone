const firebase = require('firebase')
require('firebase/firestore')

export class Firebase{

    constructor(){

        
        this._firebaseConfig = {
            apiKey: "AIzaSyC0feE5IACJgLAGJFJ5cK5iwVEe0vO8_v4",
            authDomain: "whatsapp-clone-6e434.firebaseapp.com",
            projectId: "whatsapp-clone-6e434",
            storageBucket: "whatsapp-clone-6e434.appspot.com",
            messagingSenderId: "979012342056",
            appId: "1:979012342056:web:1d534ed2b97b132b64801d"
        }
        this.init()

    }

    init(){

        if(!window._initializedFirebase){
            firebase.initializeApp(this._firebaseConfig)
            firebase.firestore().settings({
                timestampsInSnapshots: true
            })
            window._initializedFirebase = true        
        }
    }

    static db(){
        return firebase.firestore()
    }

    static hd(){

        return firebase.storage()

    }

    async initAuth(){

        return new Promise((s,f)=>{


            let provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(provider)
            .then(result =>{

                let token = result.credential.accessToken
                let user = result.user
                s({
                    user,
                    token
                })

            }).catch(err =>{
                f(err)
            })

        })

    }

}