import React from "react";

import { graphql, useStaticQuery } from "gatsby";

import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { Node } from "@/types";
import { useSiteMetadata } from "@/hooks";

interface Props {
  data: {
    markdownRemark: Node;
  };
}


const PageTemplate: React.FC<Props> = () => {
  const data = useSiteMetadata()
  const personal = data.author
  return (
    <Layout>
      <Sidebar />
      <Page title={`Contact`}>
        <p>
          If you've landed here, it's likely that you're interested in knowing more about me & my creative endeavors.
        </p>
        <p>
          You can find me on <LinkTo href={personal.contacts.linkedin} title="Linkedin" /> and <LinkTo href={personal.contacts.twitter} title="Twitter" />.
          You can now subscribe to my blog via <LinkTo href={`/rss.xml`} title="RSS Feed" /> and never miss a post from me again.
        </p>
        <p>
          And if you want to follow my contemporary movement journey or stalk my travel photos, follow me on <LinkTo href={personal.contacts.instagram} title="Instagram" />.
        </p>
        <p>
          If you're looking for my resume, <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" title="Resume"> here</a> it is.<br/> 
          Feel free to shoot me an email at <em>contact [at] lokeshd [dot] com</em>
        </p>
      </Page>
    </Layout>
  );
};

const LinkTo: React.FC<any> = ({title, href}) => <a href={href} target="_blank" rel={`noopener noreferrer`}>{title}</a>


export const Head: React.FC<Props> = () => {
  const { title, subtitle } = useSiteMetadata();

  const pageTitle = "Contact"
  const description = "Contact Lokesh Devnani | " + subtitle

  return (
    <Meta
      title={`${pageTitle} - ${title}`}
      description={description}
      // image={image}
    />
  );
};



export default PageTemplate;
