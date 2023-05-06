import axios from 'axios';

const URL = 'http://localhost:8000'

export const uploadImage = async (data) => {
    try {
        let response = await axios.post(`${URL}/upload`, data);
        return response;
    } catch (error) {
        console.log('Error while uploading the image');
    }
}