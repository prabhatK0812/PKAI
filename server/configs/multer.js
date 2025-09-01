// importing multer package
import multer from 'multer'

const storage = multer.diskStorage({});

export const upload = multer({storage})

// now we will add this as a middleware in a route

