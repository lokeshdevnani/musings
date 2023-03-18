import { Node as GatsbyNode } from "gatsby";

interface Frontmatter {
  date?: string;
  template?: string;
  category?: string;
  description?: string;
  tags?: Array<string>;
  cover: {
    absolutePath: string
  }
}

interface Fields {
  slug?: string;
  categorySlug?: string;
  tagSlugs?: Array<string>;
}

interface Node extends GatsbyNode {
  fields?: Fields;
  frontmatter?: Frontmatter;
}

interface Edge {
  node: Node;
}

export default Edge;
