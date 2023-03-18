import React from "react";

import * as styles from "./Content.module.scss";

interface Props {
  title: string;
  body: string;
  subTitle?: string;
}

const Content: React.FC<Props> = ({ body, title, subTitle }: Props) => (
  <div className={styles.content}>
    <h1 className={styles.title}>{title}</h1>
    {subTitle && <h2 className={styles.subTitle}>{subTitle}</h2>}
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
