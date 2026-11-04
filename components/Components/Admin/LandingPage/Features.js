import { Icon } from '@iconify/react';
import React from 'react';

const Features = ({ data, loading }) => {

    return (
        <div className=''>
            <div>
                <div className='border-2 border-dashed border-primary px-4 py-2 md:px-8 md:py-4 rounded-lg'>
                    <h1 className='text-[18px] md:text-[28px] font-bold text-center text-primary'>
                        {data?.featureTitle}
                    </h1>
                </div>
                <div className='mt-10 landing-page-feature' dangerouslySetInnerHTML={{ __html: data?.features }}>
                </div>


            </div>

        </div>
    );
};

export default Features;