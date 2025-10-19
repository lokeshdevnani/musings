import React, { type FC } from "react";

import * as styles from "./post-content.module.scss";

interface PostContentProps {
  title: string;
  body: string;
  subTitle?: string;
}

const PostContent: FC<PostContentProps> = ({ body, title, subTitle }) => (
  <div className={styles.postContent}>
    <h1 className={styles.title}>{title}</h1>
    {subTitle ? <h2 className={styles.subTitle}>{subTitle}</h2> : null}
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export { PostContent };
