const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const { GA_ID } = process.env

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: `/pediatric`,
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`autoprefixer`)(),
        ],
      },
    },
    GA_ID && {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          GA_ID,
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.join(__dirname, `src`, `pages`),
      },
    },
  ].filter(Boolean), // Filter out falsy values
}
