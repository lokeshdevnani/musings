import React, { type FC } from "react";
import { Link } from "gatsby";

import { Layout } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Sidebar } from "@/components/sidebar";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

const NotFoundPage: FC = () => (
  <Layout>
    <Sidebar />
    <Page title="Page not found">
      <p>Looks like you hit a route that does not exist.</p>
      <p>
        You can head back <Link to="/">home</Link> or explore the navigation links.
      </p>
    </Page>
  </Layout>
);

export const Head: FC = () => {
  const { title, description } = useSiteMetadata();

  const pageTitle = "404";
  const pageDescription = description ?? "Page not found";

  return <Meta title={`${pageTitle} - ${title}`} description={pageDescription} />;
};

export default NotFoundPage;
