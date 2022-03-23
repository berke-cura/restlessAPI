const express = require('express');

const router = express.Router();

const multer = require('multer');

const checkAuth = require('../middleware/checkauth');

const ProductsController = require('../controllers/orders');

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename : function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }

});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(new Error('File type is not supported.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', ProductsController.product_get_all);

router.post('/', checkAuth, ProductsController.product_post_product);

router.get('/:productId', ProductsController.product_get_product);

router.patch('/:productId', checkAuth, ProductsController.product_update_product);

router.delete('/:productId', checkAuth, ProductsController.product_delete_product);


module.exports = router;