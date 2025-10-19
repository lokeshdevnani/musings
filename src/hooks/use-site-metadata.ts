import { graphql, useStaticQuery } from "gatsby";

import { type SiteMetadata } from "@/types/site-metadata";

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadata>(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          author {
            title
            photo
            description
            resumeUrl
            contacts {
              name
              contact
            }
          }
          menu {
            title
            url
          }
          url
          title
          copyright
          description
          subtitle
          facebookAppId
          feedLimit
        }
      }
    }
  `);

  return (site?.siteMetadata ?? {}) as SiteMetadata["site"]["siteMetadata"];
};

export { useSiteMetadata };
