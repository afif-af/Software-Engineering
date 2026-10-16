import axios from "axios";
import "dotenv/config"

const bkashConfig = {
    baseURL: process.env.BKASH_BASE_URL,
    username: process.env.BKASH_USERNAME,
    password: process.env.BKASH_PASSWORD,
    appKey: process.env.BKASH_APP_KEY,
    appSecret: process.env.BKASH_APP_SECRET
};
const getToken = async () => {
    try {
        const response = await axios.post(
            `${bkashConfig.baseURL}/tokenized/checkout/token/grant`,
            {
                app_key: bkashConfig.appKey,
                app_secret: bkashConfig.appSecret
            },
            {
                headers: {
                    username: bkashConfig.username,
                    password: bkashConfig.password,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        );
        return response.data.id_token;

    } catch (error) {
        console.log(
            "bKash Token Error:",
            error.response?.data || error.message
        );
        throw error;
    }
};

const createPayment = async ({
    amount,
    invoiceNumber,
    payerReference
}) => {
    try {
        const token = await getToken();
        const response = await axios.post(
            `${bkashConfig.baseURL}/tokenized/checkout/create`,
            {
                mode: "0011",
                payerReference:
                    payerReference || "customer",
                callbackURL:
                    process.env.BKASH_CALLBACK_URL,
                amount:
                    Number(amount).toFixed(2),
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber:
                    invoiceNumber
            },
            {
                headers: {
                    Authorization: token,
                    "x-app-key":
                        bkashConfig.appKey,
                    "Content-Type":
                        "application/json",
                    Accept:
                        "application/json"
                }
            }
        );
        console.log(
            "bKash Create Response:",
            response.data
        );
        return response.data;
    } catch (error) {
        console.log(
            "bKash Create Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};

const executePayment = async (
    paymentID
) => {

    try {
        const token = await getToken();
        const response =
            await axios.post(

                `${bkashConfig.baseURL}/tokenized/checkout/execute`,
                {
                    paymentID
                },
                {
                    headers: {
                        Authorization:token,
                        "x-app-key":bkashConfig.appKey,
                        "Content-Type":"application/json",
                        Accept:"application/json"
                    }
                }
            );

        console.log(
            "bKash Execute Response:",
            response.data
        );
        return response.data;
    } catch (error) {
        console.log(
            "bKash Execute Error:",
            error.response?.data ||
            error.message
        );

        throw error;
    }
};


export {getToken,createPayment,executePayment};