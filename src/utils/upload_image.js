const fs = require('fs');
const path = require('path');
var Buffer = require('buffer/').Buffer
const port = process.env.PORT
const { v4: uuidv4 } = require('uuid');
const http11 = process.env.CONNECT_BACKEND




function getExtensionFromBase64Content(base64String) {
    // Bỏ phần Data URI nếu có
    const pureBase64 = base64String.replace(/^data:image\/\w+;base64,/, '');

    // Lấy 20 byte đầu tiên để kiểm tra
    const header = Buffer.from(pureBase64.substring(0, 20), 'base64').toString('hex');

    // Kiểm tra magic number
    if (header.startsWith('ffd8')) return 'jpeg';
    if (header.startsWith('89504e47')) return 'png';
    if (header.startsWith('47494638')) return 'gif';
    if (header.startsWith('52494646') && header.includes('57454250')) return 'webp';

    return 'unknown';
}

export const uploadFile = async (base64Image) => {
    try {

        let filename = uuidv4();



        // code chuyển base64 sang dạng nhị phân
        const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
        // const buffer = new Buffer(base64Image, 'base64').toString('binary')
        console.log('buffer', buffer)
        // Tạo file tạm
        let tailname = await getExtensionFromBase64Content(base64Image)

        console.log(' getExtensionFromBase64Content   ', getExtensionFromBase64Content(base64Image))
        const tempFilePath = `./public/images/${filename}.${tailname}`;

        //lưu ảnh vào code
        fs.writeFileSync(tempFilePath, buffer);

        return `https://tiki-backend.onrender.com/images/${filename}.${tailname}`


    } catch (error) {
        console.error(error);
    }
}