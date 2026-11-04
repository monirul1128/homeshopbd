const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-hermes.pathao.com/:path*',
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },

  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    unoptimized: true,
    domains: [
      "icms-image.slatic.net",
      "i.ibb.co",
      "cdn.shopify.com",
      "static-01.daraz.com.bd",
      "rukminim1.flixcart.com",
      "cdn-images.farfetch-contents.com",
      "4.imimg.com",
      "images.prismic.io",
      "i.etsystatic.com",
      "www.realmenrealstyle.com",
      "placeimg.com",
      "i.postimg.cc",
      "kachabazar-store.vercel.app",
      "picsum.photos",
      "api.lorem.space",
      "ibb.co",
      "res.cloudinary.com",
      "www.homeshopbd.com",
      "img.garagepotti.xyz",
    ],
  },
};

module.exports = nextConfig;
