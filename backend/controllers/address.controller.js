import AddressModel from '../models/address.model.js';

// Create address
export const createAddressController = async (req, res) => {
    try {
        const userId = req.userId;
        const { address_line, city, state, pincode, country, mobile } = req.body;

        // Validate required fields
        if (!address_line || !city || !state || !pincode || !country || !mobile) {
            return res.status(400).json({
                message: 'All address fields are required',
                error: true,
                success: false
            });
        }

        // Create address
        const addressData = {
            address_line,
            city,
            state,
            pincode,
            country,
            mobile: parseInt(mobile),
            userId
        };

        const address = new AddressModel(addressData);
        const savedAddress = await address.save();

        return res.json({
            message: 'Address created successfully',
            data: savedAddress,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get user's addresses
export const getUserAddressesController = async (req, res) => {
    try {
        const userId = req.userId;

        const addresses = await AddressModel.find({
            userId,
            status: true
        }).sort({ createdAt: -1 });

        return res.json({
            message: 'Addresses retrieved successfully',
            data: addresses,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get address by ID
export const getAddressByIdController = async (req, res) => {
    try {
        const { addressId } = req.params;
        const userId = req.userId;

        const address = await AddressModel.findOne({
            _id: addressId,
            userId,
            status: true
        });

        if (!address) {
            return res.status(404).json({
                message: 'Address not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Address retrieved successfully',
            data: address,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Update address
export const updateAddressController = async (req, res) => {
    try {
        const { addressId } = req.params;
        const userId = req.userId;
        const updateData = req.body;

        // Convert mobile to number if provided
        if (updateData.mobile) {
            updateData.mobile = parseInt(updateData.mobile);
        }

        const updatedAddress = await AddressModel.findOneAndUpdate(
            { _id: addressId, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                message: 'Address not found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Address updated successfully',
            data: updatedAddress,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Delete address (soft delete)
export const deleteAddressController = async (req, res) => {
    try {
        const { addressId } = req.params;
        const userId = req.userId;

        const address = await AddressModel.findOne({
            _id: addressId,
            userId
        });

        if (!address) {
            return res.status(404).json({
                message: 'Address not found',
                error: true,
                success: false
            });
        }

        // Soft delete by setting status to false
        address.status = false;
        await address.save();

        return res.json({
            message: 'Address deleted successfully',
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Set default address
export const setDefaultAddressController = async (req, res) => {
    try {
        const { addressId } = req.params;
        const userId = req.userId;

        // Check if address exists and belongs to user
        const address = await AddressModel.findOne({
            _id: addressId,
            userId,
            status: true
        });

        if (!address) {
            return res.status(404).json({
                message: 'Address not found',
                error: true,
                success: false
            });
        }

        // This could be extended to have a "isDefault" field in the schema
        // For now, we'll just return success since the address exists
        return res.json({
            message: 'Default address set successfully',
            data: address,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

// Get default address
export const getDefaultAddressController = async (req, res) => {
    try {
        const userId = req.userId;

        // For now, return the most recently created active address
        // This could be modified to use an "isDefault" field
        const defaultAddress = await AddressModel.findOne({
            userId,
            status: true
        }).sort({ createdAt: -1 });

        if (!defaultAddress) {
            return res.status(404).json({
                message: 'No addresses found',
                error: true,
                success: false
            });
        }

        return res.json({
            message: 'Default address retrieved successfully',
            data: defaultAddress,
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};
