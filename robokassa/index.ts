import crypto from 'crypto'
import {UniqueId} from '@apiModels/common'


type Options = {
    pictureData: {
        promoPictureId: UniqueId
        pictureDescription: string
        price: number
    },
    userData: {
        firstName: string
        lastName?: string
        middleName?: string
        phoneNumber: string
        email: string
    }
}

export default function getRobokassaLink(options: Options): string {

    const {pictureData, userData} = options
    const {promoPictureId, price, pictureDescription} = pictureData
    const {
        email,
        phoneNumber,
        firstName,
        lastName,
        middleName,
    } = userData

    const mainParams = {
        MrchLogin: process.env.ROBOKASSA_MERCHANT_LOGIN,
        OutSum: price,
        InvId: 123456
    }

    // ROBOKASSA_INVOICE_ID=123456

    let additionalParamsObject = {
        shp_email: email,
        shp_phoneNumber: phoneNumber,
        shp_firstName: firstName,
        shp_lastName: lastName || null,
        shp_middleName: middleName || null,
        shp_promoPictureId: promoPictureId
    }

    // if (userId) {
    //     // additionalParamsObject['shp_userId'] = userId
    // }

    const makePairs = (obj: Record<string, string | number | null>) => {
        const keys = Object.keys(obj).sort()
        return keys.map(key => `${key}=${obj[key]}`)
    }

    const additionalParamsCRC = ':' + makePairs(additionalParamsObject).join(':')

    const signatureObject = {
        ...mainParams,
        password: process.env.ROBOKASSA_CRC_PASSWORD_1
    }

    // const receipt = {
    //     items: [
    //         {
    //             name: courseTitle,
    //             quantity: 1,
    //             sum: coursePrice,
    //             payment_method: 'full_payment',
    //             payment_object: 'payment',
    //             tax: 'none'
    //         }
    //     ]
    // }

    const SignatureValue = crypto
        .createHash('md5')
        .update(
            Object
                .keys(signatureObject)
                //@ts-ignore
                .map(key => `${signatureObject[key]}`)
                .join(':') + additionalParamsCRC
        )
        .digest('hex')


    let robokassaData = {
        Email: email,
        Description: encodeURI(pictureDescription),
        ...mainParams,
        Encoding: 'utf-8',
        IncCurrLabel: 'BankCard',
        ...additionalParamsObject,
        Culture: 'ru',
        // Receipt: encodeURI(JSON.stringify(receipt)),
        SignatureValue
    }

    if (!!process.env.ROBOKASSA_IS_TEST) {
        //@ts-ignore
        robokassaData['IsTest'] = 1
    }

    const query = Object
        .keys(robokassaData)
        //@ts-ignore
        .map(key => `${key}=${robokassaData[key]}`)
        .join('&')

    return `${process.env.ROBOKASSA_BASE_URL}?${query}`
}
