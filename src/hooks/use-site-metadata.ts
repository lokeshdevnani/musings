import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              bio
              name
              photo
              resumeUrl
              contacts {
                rss
                line
                email
                weibo
                gitlab
                medium
                github
                twitter
                codepen
                youtube
                facebook
                linkedin
                telegram
                instagram
                soundcloud
                mastodon
              }
            }
            menu {
              path
              label
            }
            url
            title
            subtitle
            copyright
            facebookAppId
          }
        }
      }
    `,
  );

  return site.siteMetadata;
};

export default useSiteMetadata;
