import { icons } from "@/constants/icons";

type SiteMetadataAuthor = {
  title: string;
  photo: string;
  description: string;
  resumeUrl?: string;
  contacts: {
    name: keyof typeof icons;
    contact: string;
  }[];
};

type SiteMetadataMenu = {
  title: string;
  url: string;
}[];

interface SiteMetadata {
  site: {
    siteMetadata: {
      author: SiteMetadataAuthor;
      menu: SiteMetadataMenu;
      description: string;
      subtitle?: string;
      copyright: string;
      title: string;
      url: string;
      facebookAppId?: string;
      feedLimit?: number;
    };
  };
}

export type { SiteMetadata };
