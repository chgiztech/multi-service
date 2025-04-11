import { validationResult } from 'express-validator';

export const validationHandler = (req, res, next) => {
    let errors = validationResult(req);

    let result = [];

    if (!errors.isEmpty()) {
        for (let key in errors.array()) {
            const { msg } = errors.array()[key];

            let error = {
                error: msg
            };

            result.push(error);
        }

        return res.status(400).json({ success: false, errors: result });
    }

    next();
};