import { render } from "@testing-library/vue";
import Failed from "../Failed.vue";
import "@testing-library/jest-dom";

describe("Failed", () => {
  it("render message for success buy", () => {
    const msg = "Compra fallida";
    const { getByText } = render(Failed);
    expect(getByText(msg)).toBeInTheDocument();
  });
});