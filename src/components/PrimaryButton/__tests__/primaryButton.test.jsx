import PrimaryButton from "../PrimaryButton.vue";
import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";

describe("PrimaryButton", () => {
  it("An instance of PrimaryButton on 'Inicio de sesión' view should be mounted", () => {
    const { getByText } = render(PrimaryButton, {
      props: {
        name: "Inicio de sesión",
      },
    });

    const button = getByText("Inicio de sesión");
    expect(button).toBeInTheDocument();
  });

  it("An instance of PrimaryButton on 'Registro' view should be mounted", () => {
    const { getByText } = render(PrimaryButton, {
      props: {
        name: "Registrarse",
      },
    });

    const button = getByText("Registrarse");
    expect(button).toBeInTheDocument();
  });

  it("An instance of PrimaryButton on 'Perfil' view should be mounted", () => {
    const { getByText } = render(PrimaryButton, {
      props: {
        name: "Cambiar username",
      },
    });

    const button = getByText("Cambiar username");
    expect(button).toBeInTheDocument();
  });
});