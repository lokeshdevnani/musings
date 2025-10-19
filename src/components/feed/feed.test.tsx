import React from "react";
import { describe, expect, test } from "bun:test";
import { screen } from "@testing-library/react";

import * as mocks from "@/mocks";
import { Feed } from "@/components/feed";
import { renderWithCoilProvider } from "@/utils/render-with-coil-provider";

describe("Feed", () => {
  test("renders posts with metadata", () => {
    renderWithCoilProvider(<Feed edges={mocks.edges} />);

    expect(screen.getByText("Perfecting the Art of Perfection")).toBeInTheDocument();
    expect(screen.getByText("Typography")).toBeInTheDocument();
    expect(screen.getByText("Beginner motivation for version control")).toBeInTheDocument();
  });
});
