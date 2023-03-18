import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

import * as constants from "./constants";
import * as types from "./types";
import * as utils from "./utils";

const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { frontmatter, parent }: types.Edge["node"] = node;
    const { tags, category } = frontmatter || {};

    const fileSlug = createFilePath({ node, getNode });
    const fileSlugWithoutTrailingSlash = fileSlug.endsWith('/') ? fileSlug.slice(0, -1) : fileSlug;
    const parts = fileSlug.split("--")
    if (parts.length > 1) {
      const titleSlug = parts[1]
      const date = parts[0].split('/')[parts[0].split('/').length - 1]
      createNodeField({ node, name: 'slug', value: "/" + titleSlug })
      createNodeField({ node, name: 'date', value: date })
    } else {
      const titleSlug = fileSlugWithoutTrailingSlash.split('/')[fileSlugWithoutTrailingSlash.split('/').length - 1]
      createNodeField({ node, name: "slug", value: titleSlug });
    }

    if (tags) {
      const value = tags.map((tag) =>
        utils.concat(
          constants.routes.tagRoute,
          "/",
          utils.toKebabCase(tag),
          "/",
        ),
      );

      createNodeField({ node, name: "tagSlugs", value });
    }

    if (category) {
      const value = utils.concat(
        constants.routes.categoryRoute,
        "/",
        utils.toKebabCase(category),
        "/",
      );

      createNodeField({ node, name: "categorySlug", value });
    }
  }
};

export { onCreateNode };
