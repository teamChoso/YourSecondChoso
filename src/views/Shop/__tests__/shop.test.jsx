import { render } from "@testing-library/vue";
import Shop from "@/views/Shop/Shop.vue";
import "@testing-library/jest-dom";
import Vue from "vue";
import Vuetify from "vuetify";

const app = document.createElement("div");
app.setAttribute("data-app", true);
document.body.appendChild(app);
Vue.use(Vuetify);

describe("Shop", () => {
  it("should create a lorem", () => {
    const { getByText } = render(Shop);
    expect(getByText("Añadir")).toBeInTheDocument();
  });
});