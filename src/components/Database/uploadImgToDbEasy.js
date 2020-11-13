import {FIREBASE_STORAGE} from "../../App";

const upload = async (file,path)=>{
    let filename = file.name;
    let ref = FIREBASE_STORAGE.ref(path).child(filename);
    let fileData = await ref.put(file);
    return await fileData.ref.getDownloadURL();
};

const  uploadImgToDbEasy =async (path, ...files) => {
    // Upload to fire storage
    return Promise.all(files.map( (file) =>  upload(file, path)));
};

export default uploadImgToDbEasy;