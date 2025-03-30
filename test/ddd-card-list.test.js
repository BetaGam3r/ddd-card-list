import { html, fixture, expect } from '@open-wc/testing';
import "../ddd-card-list.js";

describe("DddCardList test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ddd-card-list
        title="title"
      ></ddd-card-list>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
