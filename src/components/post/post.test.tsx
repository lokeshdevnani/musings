import React from "react";
import { StaticQuery, useStaticQuery } from "gatsby";
import { test, describe, expect, beforeEach, mock } from "bun:test";

import * as mocks from "@/mocks";
import { Post } from "@/components/post";
import { renderWithCoilProvider } from "@/utils/render-with-coil-provider";

const mockedUseStaticQuery = useStaticQuery as ReturnType<typeof mock>;
const mockedStaticQuery = StaticQuery as unknown as ReturnType<typeof mock>;

describe("Post", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) => render(mocks.siteMetadata));
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders post content with subtitle", () => {
    const props = { post: mocks.markdownRemark };
    const screen = renderWithCoilProvider(<Post {...props} />);

    expect(screen.getByText("Perfecting the Art of Perfection")).toBeInTheDocument();
    expect(screen.getByText("Beginner motivation for version control")).toBeInTheDocument();
    expect(screen.getByText("Published Sep 1, 2016")).toBeInTheDocument();
  });

  test("renders navigation buttons", () => {
    const props = { post: mocks.markdownRemark };
    const screen = renderWithCoilProvider(<Post {...props} />);
    expect(screen.getByText("All Articles")).toBeInTheDocument();
  });
});
