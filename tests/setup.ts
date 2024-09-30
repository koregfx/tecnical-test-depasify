/* eslint-disable @typescript-eslint/no-explicit-any */
// test/setup.ts
import { JSDOM } from "jsdom";
import { expect } from "chai";
import "@testing-library/jest-dom";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src: any, target: any) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
  userAgent: "node.js",
};
copyProps(window, global);

(global as any).expect = expect;
