import { type Node, type GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

import { routes } from "./constants/routes";
import { concat } from "../../src/utils/concat";
import { type Edge } from "../../src/types/edge";
import { toKebabCase } from "../../src/utils/to-kebab-case";

const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { frontmatter, parent } = node as Node & Edge["node"];
    const { tags, category, slug } = frontmatter || {};

    if (slug) {
      const dirname = parent && getNode(parent)?.relativeDirectory;
      const normalizedSlug = slug.startsWith("/") ? slug : concat("/", slug);
      const value =
        typeof dirname === "string" && dirname.length > 0
          ? concat("/", dirname.replace(/\/$/, ""), normalizedSlug)
          : normalizedSlug;

      createNodeField({ node, name: "slug", value });
    } else {
      const filePath = createFilePath({ node, getNode });
      const trimmed = filePath.endsWith("/") ? filePath.slice(0, -1) : filePath;
      const parts = trimmed.split("--");

      if (parts.length > 1) {
        const titleSlug = parts.slice(1).join("--");
        const cleaned = titleSlug.replace(/\/$/, "");
        createNodeField({ node, name: "slug", value: concat("/", cleaned) });

        const dateSegments = parts[0].split("/");
        const date = dateSegments[dateSegments.length - 1];
        if (date) {
          createNodeField({ node, name: "date", value: date });
        }
      } else {
        const segments = trimmed.split("/");
        const titleSlug = segments[segments.length - 1] || "";
        const cleaned =
          titleSlug === ""
            ? "/"
            : titleSlug.startsWith("/")
            ? titleSlug
            : concat("/", titleSlug);
        createNodeField({ node, name: "slug", value: cleaned });
      }
    }

    if (tags) {
      const value = tags.map((tag) => concat(routes.tagRoute, "/", toKebabCase(tag), "/"));

      createNodeField({ node, name: "tagSlugs", value });
    }

    if (category) {
      const value = concat(routes.categoryRoute, "/", toKebabCase(category), "/");

      createNodeField({ node, name: "categorySlug", value });
    }
  }
};

export { onCreateNode };
