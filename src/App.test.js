import { screen } from "@testing-library/react";
describe("item", () => {
  it("render the user-list-item", () => {
    const listItemElement = screen.queryAllByTestId("listitem");
    expect(listItemElement).toHaveLength(3);
  });
});
