import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
export const createPaymentIntent = async (amount, currency = 'usd', metadata = {}) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency.toLowerCase(),
            metadata: metadata,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create payment intent',
            success: false
        };
    }
};

// Confirm payment intent
export const confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });

        return {
            paymentIntent,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to confirm payment',
            success: false
        };
    }
};

// Retrieve payment intent
export const retrievePaymentIntent = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return {
            paymentIntent,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to retrieve payment intent',
            success: false
        };
    }
};

// Create customer
export const createCustomer = async (email, name, metadata = {}) => {
    try {
        const customer = await stripe.customers.create({
            email,
            name,
            metadata,
        });

        return {
            customerId: customer.id,
            customer,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create customer',
            success: false
        };
    }
};

// Retrieve customer
export const retrieveCustomer = async (customerId) => {
    try {
        const customer = await stripe.customers.retrieve(customerId);
        return {
            customer,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to retrieve customer',
            success: false
        };
    }
};

// Update customer
export const updateCustomer = async (customerId, updates) => {
    try {
        const customer = await stripe.customers.update(customerId, updates);
        return {
            customer,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to update customer',
            success: false
        };
    }
};

// Create refund
export const createRefund = async (paymentIntentId, amount = null, reason = 'requested_by_customer') => {
    try {
        const refundData = {
            payment_intent: paymentIntentId,
            reason,
        };

        if (amount) {
            refundData.amount = Math.round(amount * 100); // Convert to cents
        }

        const refund = await stripe.refunds.create(refundData);

        return {
            refund,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create refund',
            success: false
        };
    }
};

// List refunds
export const listRefunds = async (paymentIntentId = null, limit = 10) => {
    try {
        const params = { limit };

        if (paymentIntentId) {
            params.payment_intent = paymentIntentId;
        }

        const refunds = await stripe.refunds.list(params);

        return {
            refunds: refunds.data,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to list refunds',
            success: false
        };
    }
};

// Create payment method
export const createPaymentMethod = async (type, cardDetails) => {
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type,
            card: cardDetails,
        });

        return {
            paymentMethod,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create payment method',
            success: false
        };
    }
};

// Attach payment method to customer
export const attachPaymentMethod = async (paymentMethodId, customerId) => {
    try {
        const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerId,
        });

        return {
            paymentMethod,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to attach payment method',
            success: false
        };
    }
};

// Detach payment method from customer
export const detachPaymentMethod = async (paymentMethodId) => {
    try {
        const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId);

        return {
            paymentMethod,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to detach payment method',
            success: false
        };
    }
};

// List customer's payment methods
export const listCustomerPaymentMethods = async (customerId, type = 'card') => {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customerId,
            type,
        });

        return {
            paymentMethods: paymentMethods.data,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to list payment methods',
            success: false
        };
    }
};

// Create checkout session
export const createCheckoutSession = async (lineItems, successUrl, cancelUrl, customerEmail = null, metadata = {}) => {
    try {
        const sessionData = {
            payment_method_types: ['card'],
            line_items: lineItems.map(item => ({
                price_data: {
                    currency: item.currency || 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                        images: item.images || [],
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata,
        };

        if (customerEmail) {
            sessionData.customer_email = customerEmail;
        }

        const session = await stripe.checkout.sessions.create(sessionData);

        return {
            sessionId: session.id,
            sessionUrl: session.url,
            session,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create checkout session',
            success: false
        };
    }
};

// Retrieve checkout session
export const retrieveCheckoutSession = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        return {
            session,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to retrieve checkout session',
            success: false
        };
    }
};

// Handle webhook
export const constructEvent = (payload, signature, webhookSecret) => {
    try {
        const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        return {
            event,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Webhook signature verification failed',
            success: false
        };
    }
};

// Create product
export const createProduct = async (name, description = '', images = [], metadata = {}) => {
    try {
        const product = await stripe.products.create({
            name,
            description,
            images,
            metadata,
        });

        return {
            product,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create product',
            success: false
        };
    }
};

// Create price
export const createPrice = async (productId, unitAmount, currency = 'usd', metadata = {}) => {
    try {
        const price = await stripe.prices.create({
            product: productId,
            unit_amount: Math.round(unitAmount * 100), // Convert to cents
            currency,
            metadata,
        });

        return {
            price,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create price',
            success: false
        };
    }
};

// List prices
export const listPrices = async (productId = null, limit = 10) => {
    try {
        const params = { limit };

        if (productId) {
            params.product = productId;
        }

        const prices = await stripe.prices.list(params);

        return {
            prices: prices.data,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to list prices',
            success: false
        };
    }
};

// Calculate application fee for connected accounts
export const calculateApplicationFee = (amount, feePercentage = 0.029) => {
    return Math.round(amount * feePercentage * 100); // Convert to cents
};

// Transfer to connected account
export const createTransfer = async (amount, destination, sourceTransaction = null, metadata = {}) => {
    try {
        const transferData = {
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            destination,
            metadata,
        };

        if (sourceTransaction) {
            transferData.source_transaction = sourceTransaction;
        }

        const transfer = await stripe.transfers.create(transferData);

        return {
            transfer,
            success: true
        };
    } catch (error) {
        return {
            error: error.message || 'Failed to create transfer',
            success: false
        };
    }
};

export default stripe;
