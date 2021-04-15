import { render } from "@testing-library/vue";
import Login from "@/views/Login/Login";
import "@testing-library/jest-dom";

describe("Login", () => {
  it("Check if login munted", () => {
    const { getByText } = render(Login);
    expect(getByText("Inicio de sesión")).toBeInTheDocument();
  });

  it("Check if button munted", () => {
    const { getByText } = render(Login);
    expect(getByText("Iniciar Sesión")).toBeInTheDocument();
  });
});