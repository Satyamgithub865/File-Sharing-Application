// sample file object that comes as request is
// file: {
//     fieldname: 'file',
//     originalname: 'Ai.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: 'uploads',
//     filename: '746cfef71b73f00f5157630b8cdac794',
//     path: 'uploads\\746cfef71b73f00f5157630b8cdac794',
//     size: 256653
// }

import File from '../model/file.js';

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname
    }

    try {
        const file = await new File(fileObj);
        await file.save();
  
        return response.status(200).json({ path: `http://localhost:8000/file/${file._id}` });
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.id);
        file.downloadContent++;
        await file.save();

        return response.download(file.path, file.name);
    } catch (error) {
        return response.status(500).json({ msg: error.message })
    }
}