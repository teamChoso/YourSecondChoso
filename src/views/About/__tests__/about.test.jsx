import { render } from "@testing-library/vue";
import About from "@/views/About/About";

describe("About", () => {
  it("Check if about mounted", () => {
    const { getByText } = render(About);
    expect(getByText("Sobre nosotros")).toBeInTheDocument();
  });
});

describe("Member's pictures", () => {
  it("should render Bruno's picture", () => {
    const { getByAltText } = render(About);
    expect(getByAltText("Foto de perfil de Bruno")).toBeDefined();
  });
  it("should render Juampi's picture", () => {
    const { getByAltText } = render(About);
    expect(getByAltText("Foto de perfil de Juampi")).toBeDefined();
  });
  it("should render Carmen's picture", () => {
    const { getByAltText } = render(About);
    expect(getByAltText("Foto de perfil de Carmen")).toBeDefined();
  });
});