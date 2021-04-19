import { render } from "@testing-library/vue";
import Login from "@/views/Login/Login";
import "@testing-library/jest-dom";

describe("Login", () => {
  it("Check if login mounted", () => {
    const { getByText } = render(Login);
    expect(getByText("Inicio de sesión")).toBeInTheDocument();
  });

  it("Check if button mounted", () => {
    const { getByText } = render(Login);
    expect(getByText("Iniciar Sesión")).toBeInTheDocument();
  });
});

describe("Logo YSC", () => {
  it("should render logo", () => {
    const { getByAltText } = render(Login);

    expect(getByAltText("Logo de Your Second Choso")).toBeDefined();
  });
});