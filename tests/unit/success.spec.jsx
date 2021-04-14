import { render } from "@testing-library/vue";
import Success from "@/views/Success/Success.vue";

describe("Success.vue", () => {
  it("render message for success buy", () => {
    const msg = "Compra realizada con éxito";
    const { getByText } = render(Success, {
      propsData: { msg },
    });
    expect(getByText(msg)).toBeInTheDocument();
  });
});