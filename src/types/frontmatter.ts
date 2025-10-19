interface Frontmatter {
  date: string;
  title: string;
  slug?: string;
  category: string;
  template: string;
  description?: string;
  subTitle?: string;
  tags?: Array<string>;
  socialImage?: { publicURL: string };
  cover?: {
    absolutePath: string;
  };
}

export { type Frontmatter };
