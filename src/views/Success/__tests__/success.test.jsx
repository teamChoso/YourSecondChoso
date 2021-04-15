import { render } from "@testing-library/vue";
import Success from "@/views/Success/Success.vue";
import "@testing-library/jest-dom";

describe("Success", () => {
  it("render message for success buy", () => {
    const msg = "Compra realizada con éxito";
    const { getByText } = render(Success);
    expect(getByText(msg)).toBeInTheDocument();
  });
});