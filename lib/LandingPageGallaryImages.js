//here make landing page gallary image structure data

export const LandingPageGallaryImages = (pages) => {


    // products = [], galleryImages = []
    const { products, galleryImages } = pages
    let images = [...galleryImages]


    console.log("on funciton", pages?.products)

    pages?.products?.forEach(product => {

        console.log("all product", product)

        if (product?.image) {
            images.push(product.image);
        }
        if (product?.imageUrls?.length > 1) {
            images = images.concat(product?.imageUrls.slice(2));
        }

    });


    return images;

};
