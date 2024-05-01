import axios from "axios";

const fileUpload = file => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dsd9qmdge/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-qwikz');
    formData.append('file', file);
       
    const request = axios.post(cloudUrl, formData);
    
    return request.then(response => response.data.secure_url);

}

export default fileUpload;