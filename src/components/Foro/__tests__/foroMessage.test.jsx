import { render } from "@testing-library/vue";
import ForoMessage from "../ForoMessage";
import "@testing-library/jest-dom";

describe("Foro message", () => {
  it("Check if message render", () => {
    const { getByText } = render(ForoMessage, {
      props: {
        msg: "Muy buena página",
      },
    });
    expect(getByText("Muy buena página")).toBeInTheDocument();
  });

  it("Check if text Logo render", () => {
    const { getByText } = render(ForoMessage, {
      props: {
        date: "27/09/1997",
      },
    });
    expect(getByText("27/09/1997")).toBeInTheDocument();
  });
});

describe("Logo YSC Foro Message", () => {
  it("should render component", () => {
    const { getByAltText } = render(ForoMessage, {
      props: {
        img: "../../../../public/logo_transparent.png",
        name: "Logo",
      },
    });

    expect(getByAltText("Logo")).toBeDefined();
  });
});