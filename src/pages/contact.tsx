import React, { type FC } from "react";

import { Layout } from "@/components/layout";
import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Sidebar } from "@/components/sidebar";
import { useSiteMetadata } from "@/hooks/use-site-metadata";
import { getContactHref } from "@/utils/get-contact-href";

type LinkProps = {
  title: string;
  href: string;
};

const LinkTo: FC<LinkProps> = ({ title, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
);

const resolveContactHref = (
  contacts: { name: string; contact: string }[],
  name: string,
) => {
  const entry = contacts.find((contact) => contact.name === name);

  return entry ? getContactHref(entry.name, entry.contact) : undefined;
};

const ContactPage: FC = () => {
  const { author } = useSiteMetadata();
  const contacts = author?.contacts ?? [];

  const linkedin = resolveContactHref(contacts, "linkedin");
  const x = resolveContactHref(contacts, "x");
  const instagram = resolveContactHref(contacts, "instagram");
  const rss = resolveContactHref(contacts, "rss") ?? "/rss.xml";
  const resumeUrl = author?.resumeUrl;

  return (
    <Layout>
      <Sidebar />
      <Page title="Contact">
        <p>
          If you've landed here, it's likely that you're interested in knowing
          more about me & my creative endeavors.
        </p>
        {(linkedin || x) && (
          <p>
            {linkedin && (
              <>
                You can find me on <LinkTo href={linkedin} title="LinkedIn" />
              </>
            )}
            {linkedin && x && " and "}
            {x && <LinkTo href={x} title="X (Twitter)" />}
            . You can now subscribe to my blog via <LinkTo href={rss} title="RSS Feed" /> and never
            miss a post from me again.
          </p>
        )}
        {instagram && (
          <p>
            And if you want to follow my contemporary movement journey or stalk
            my travel photos, follow me on{" "}
            <LinkTo href={instagram} title="Instagram" />.
          </p>
        )}
        {resumeUrl && (
          <p>
            If you're looking for my resume,{" "}
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" title="Resume">
              here
            </a>{" "}
            it is.
          </p>
        )}
        <p>
          Feel free to shoot me an email at <em>lokeshdevnani [at] gmail [dot] com</em>
        </p>
      </Page>
    </Layout>
  );
};

export const Head: FC = () => {
  const { title, description } = useSiteMetadata();

  const pageTitle = "Contact";
  const pageDescription = `Contact Lokesh Devnani | ${description ?? ""}`;

  return <Meta title={`${pageTitle} - ${title}`} description={pageDescription} />;
};

export default ContactPage;
