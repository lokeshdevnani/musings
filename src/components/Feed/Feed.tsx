import React from "react";

import { Link } from "gatsby";

import { Edge } from "@/types";
import { Image } from "@/components/Image";


import * as styles from "./Feed.module.scss";

type Props = {
  edges: Array<Edge>;
};

const Feed: React.FC<Props> = ({ edges }: Props) => (
  <div className={styles.feed}>
    {edges.map((edge) => (
      <div className={styles.item} key={edge.node.fields.slug}>
          <div className={styles.imgContainer}>
            <Image alt={edge.node.frontmatter.title} path={edge.node.frontmatter.cover?.absolutePath  || "nothing" } />
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.meta}>
              <time
                className={styles.time}
                dateTime={new Date(edge.node.fields.date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              > 
                {new Date(edge.node.fields.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </time>
              <span className={styles.divider} />
              <span className={styles.category}>
                <Link to={edge.node.fields.categorySlug} className={styles.link}>
                  {edge.node.frontmatter.category}
                </Link>
              </span>
            </div>
            <h2 className={styles.title}>
              <Link
                className={styles.link}
                to={edge.node.frontmatter?.slug || edge.node.fields.slug}
              >
                {edge.node.frontmatter.title}
              </Link>
            </h2>
            <h3 className={styles.subTitle}>
              {edge.node.frontmatter.subTitle}
            </h3>
        </div>
      </div>
    ))}
  </div>
);

export default Feed;
