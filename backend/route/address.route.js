import express from 'express';
import {
    createAddressController,
    getUserAddressesController,
    getAddressByIdController,
    updateAddressController,
    deleteAddressController,
    setDefaultAddressController,
    getDefaultAddressController
} from '../controllers/address.controller.js';
import { authMiddleware } from '../middlware/auth.middleware.js';

const addressRouter = express.Router();

// All address routes require authentication
addressRouter.use(authMiddleware);

// Address CRUD routes
addressRouter.post('/', createAddressController);
addressRouter.get('/', getUserAddressesController);
addressRouter.get('/:addressId', getAddressByIdController);
addressRouter.put('/:addressId', updateAddressController);
addressRouter.delete('/:addressId', deleteAddressController);

// Default address routes
addressRouter.put('/:addressId/default', setDefaultAddressController);
addressRouter.get('/default', getDefaultAddressController);

export default addressRouter;
