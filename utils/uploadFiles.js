import multer from 'multer';

//Funcion para cargar archivo de foto con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage})

export default {upload};