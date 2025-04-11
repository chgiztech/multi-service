import express from 'express';
import recordsController from '../controllers/records.controller.js';
import { protect } from '../middlewares/authVerifyToken.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validationHandler } from '../middlewares/validatorHandler.js';
import {
  createRecordValidator,
  updateRecordValidator,
} from '../middlewares/validators/recordsValidator.js';

const router = express.Router();

router
  .route('/')
  .get(asyncHandler(protect), asyncHandler(recordsController.getRecords))
  .post(
    asyncHandler(protect),
    createRecordValidator,
    validationHandler,
    asyncHandler(recordsController.createRecord)
  );
router
  .route('/:id')
  .get(asyncHandler(protect), asyncHandler(recordsController.getRecord))
  .put(
    asyncHandler(protect),
    updateRecordValidator,
    validationHandler,
    asyncHandler(recordsController.updateRecord)
  )
  .delete(asyncHandler(protect), asyncHandler(recordsController.deleteRecord));

export default router;
