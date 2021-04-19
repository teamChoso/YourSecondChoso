import { render } from "@testing-library/vue";
import Footer from "../Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  it("should render 'Inicio' button", () => {
    const { getByText } = render(Footer);

    expect(getByText("Inicio")).toBeDefined();
  });

  it("should render 'Nosotros' button", () => {
    const { getByText } = render(Footer);

    expect(getByText("Nosotros")).toBeDefined();
  });

  it("should render 'Foro' button", () => {
    const { getByText } = render(Footer);

    expect(getByText("Foro")).toBeDefined();
  });

  it("should render 'Contacto' button", () => {
    const { getByText } = render(Footer);

    expect(getByText("Contacto")).toBeDefined();
  });
});