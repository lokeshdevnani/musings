import React, { type FC, type ReactNode, useEffect, useRef } from "react";

import { type Nullable } from "@/types/nullable";

import * as styles from "./page.module.scss";

interface PageProps {
  title?: string;
  children: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }) => {
  const pageRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={styles.inner}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export { Page };
