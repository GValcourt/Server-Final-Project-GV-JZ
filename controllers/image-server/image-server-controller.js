import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDxoLO3BhvoTLFBRixCD667w31Wy8qyI_4",
    authDomain: "web-dev-final-project-382218.firebaseapp.com",
    projectId: "web-dev-final-project-382218",
    storageBucket: "web-dev-final-project-382218.appspot.com",
    messagingSenderId: "656963336648",
    appId: "1:656963336648:web:56318122c2e0fb513f28fd",
    measurementId: "G-ZJYMQQW6WY"
}
const app = initializeApp(firebaseConfig);
// Create a reference with an initial file path and name
const storage = getStorage(app);

const ImageController = (app) => {
    app.get('/api/images/get/:imageid', getImage)
}



const getImage = async (req, res) => {
    const imageid = req.params.imageid;
    let response = await getDownloadURL(ref(storage, `images/${imageid}`))
    res.json(response)
}

  

export default ImageController