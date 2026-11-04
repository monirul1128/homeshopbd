import { Icon } from '@iconify/react';
import React from 'react';

const WhatsAppButton = ({
    productQuantity,
    productUrl,
    productName,
    productPrice
}) => {


    const productDetails = {
        name: productName,
        price: productPrice,
        url: productUrl,
    };

    const whatsappMessage = `  Hi, I want to talk about this :
     
    ${productDetails.url} 

    - ${productDetails.name}
    - ${productDetails.price}৳ 
    --
    `;

    const whatsappLink = `https://wa.me/+8801910903717/?text=${encodeURIComponent(whatsappMessage)}`;


    return (
        <>
            <a href={productQuantity<1?"#":whatsappLink} target="_blank" rel="noopener noreferrer">
                <button
                    title={
                        productQuantity < 1 ? "Out of Stock" : "WhatsApp Order"
                    }
                    className='flex gap-1 items-center btn btn-primary w-full rounded  text-base-100 font-medium '
                    disabled={productQuantity < 1}

                >
                    <Icon icon="logos:whatsapp-icon" className=' text-white text-[18px]' />WhatsApp Now
                </button>
            </a>

        </>
    );
};

export default WhatsAppButton;