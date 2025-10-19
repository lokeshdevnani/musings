import React, { type FC } from "react";

import { FacebookProvider, Comments as FacebookComments } from "react-facebook";

import { useTheme } from "@/hooks/use-theme";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

type PostCommentsProps = {
  postSlug: string;
};

const PostComments: FC<PostCommentsProps> = ({ postSlug }) => {
  const [{ mode }] = useTheme();
  const { url, facebookAppId } = useSiteMetadata();

  if (!facebookAppId || !url || typeof window === "undefined") {
    return null;
  }

  return (
    <FacebookProvider appId={facebookAppId}>
      <FacebookComments
        href={`${url}${postSlug}`}
        width="100%"
        colorScheme={mode}
      />
    </FacebookProvider>
  );
};

export { PostComments };
