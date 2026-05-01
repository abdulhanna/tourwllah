/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.swantour.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.trvl-media.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's7ap1.scene7.com',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'tripguides.in',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'c4.wallpaperflare.com',
        pathname: '/**',
      },{
         protocol: 'https',
        hostname:"imgmediagumlet.lbb.in",
         pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
         pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.easemytrip.com',
        pathname: '/**',
      },
      {
        protocol:'https',
        hostname:'www.tripsavvy.com',
        pathname:'/**'
      },
      {
        protocol:"https",
        hostname:"i.ytimg.com",
        pathname:"/**"
      },
      {
        protocol:"https",
        hostname:'images.moneycontrol.com',
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:'www.hillsandwills.com',
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:'www.thestatesman.com'
      },
      {
        protocol:"https",
        hostname:'s7ap1.scene7.com',
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:'www.exploreourindia.com',
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:"discoverkullumanali.in",
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:'dynamic-media-cdn.tripadvisor.com',
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:'www.indiatourismpackage.com',
         pathname:"/**"
      },
      {
        protocol:"https",
        hostname:"static.toiimg.com",
         pathname:"/**"
      }
    ],
  },
}

export default nextConfig
