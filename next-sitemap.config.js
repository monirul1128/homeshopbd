/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.homeshopbd.com', 
    generateRobotsTxt: true,
    exclude: ['/admin/*', '/dashboard/*'], 
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }],
    },
  };