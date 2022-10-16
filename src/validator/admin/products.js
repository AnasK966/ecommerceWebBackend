const { check, validationResult } = require('express-validator');


exports.productValidation = [
    check('name').notEmpty().withMessage('name required'),
    check('category').notEmpty().withMessage('required'),
    check('desc').notEmpty().withMessage('desc required'),
    check('price').notEmpty().withMessage('required'),
    check('stock').notEmpty().withMessage('required')
    
]


exports.isProductValidate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        res.status(400).json({ error:errors.array()[0].msg })
    };
    next();
}
