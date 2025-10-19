import React, { type FC } from "react";

import type { Node } from "@/types/node";
import { Button } from "@/components/button";
import { PostTags } from "@/components/post-tags";
import { PostAuthor } from "@/components/post-author";
import { PostFooter } from "@/components/post-footer";
import { PostContent } from "@/components/post-content";
import { PostComments } from "@/components/post-comments";
import { ThemeSwitcher } from "@/components/theme-switcher";

import * as styles from "./post.module.scss";

interface PostProps {
  post: Node;
}

const Post: FC<PostProps> = ({ post }) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date, subTitle } = post.frontmatter;

  return (
    <div className={styles.post}>
      <div className={styles.buttons}>
        <Button className={styles.buttonArticles} title="All Articles" to="/" />
        <ThemeSwitcher />
      </div>
      <div className={styles.content}>
        <PostContent body={html} title={title} subTitle={subTitle} />
      </div>
      <div className={styles.footer}>
        <PostFooter date={date} />
        {tags && tagSlugs && <PostTags tags={tags} tagSlugs={tagSlugs} />}
        <PostAuthor />
      </div>
      {slug ? (
        <div className={styles.comments}>
          <PostComments postSlug={slug} />
        </div>
      ) : null}
    </div>
  );
};

export { Post };
