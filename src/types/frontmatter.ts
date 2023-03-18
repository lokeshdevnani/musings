interface Frontmatter {
  date: string;
  title: string;
  subTitle?: string;
  slug?: string;
  cover?: {
    absolutePath: string
  };
  category: string;
  template: string;
  description?: string;
  tags?: Array<string>;
}

export default Frontmatter;
