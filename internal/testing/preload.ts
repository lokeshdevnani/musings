import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, expect, mock } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
import { GlobalRegistrator } from "@happy-dom/global-registrator";

import { localStorageMock, gatsby } from "@/mocks";

expect.extend(matchers);
GlobalRegistrator.register();
mock.module("gatsby", () => gatsby);
mock.module("react-facebook", () => ({
  FacebookProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Comments: () => null,
}));

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, "localStorage", {
  value: localStorageMock(),
});
