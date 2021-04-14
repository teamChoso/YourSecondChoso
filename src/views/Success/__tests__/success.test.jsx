import { render } from "@testing-library/vue";
import Success from "@/views/Success/Success.vue";

test("properly handles v-model", async () => {
  const { getByText } = render(Success);

  // Asserts initial state.
  getByText("Productos");
});