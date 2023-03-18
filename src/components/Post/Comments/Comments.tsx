import React from "react";

import { FacebookProvider, Comments as FacebookComments } from "react-facebook";


import { useSiteMetadata, useTheme } from "@/hooks";

interface Props {
  postTitle: string;
  postSlug: string;
}

const Comments: React.FC<Props> = ({ postTitle, postSlug }: Props) => {
  const { url, facebookAppId } = useSiteMetadata();
  const [{ mode }] = useTheme();

  return (
    <FacebookProvider appId={facebookAppId}>
        <FacebookComments
          href={`${url}${postSlug}`}
          width="100%"
          colorScheme={mode}
        />
      </FacebookProvider>
  )
};

export default Comments;
