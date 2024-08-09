import { JsonRequestValidation } from "../request";
import { components, operations } from "./../../temp/schema";

export class StoreController {
  static async getInventory() {
    return (
      await new JsonRequestValidation()
        .url("http://localhost:8080/api/v3/store/inventory")
        .send<
          operations["getInventory"]["responses"]["200"]["content"]["application/json"]
        >()
    ).body;
  }
  static async placeOrder(order: components["schemas"]["Order"]) {
    return (
      await new JsonRequestValidation()
        .url("http://localhost:8080/api/v3/store/order")
        .body(order)
        .method("POST")
        .send<
          operations["placeOrder"]["responses"]["200"]["content"]["application/json"]
        >()
    ).body;
  }
  static async getOrderById(id: number) {
    return (
      await new JsonRequestValidation()
        .url(`http://localhost:8080/api/v3/store/order/${id}`)
        .send<
          operations["getOrderById"]["responses"]["200"]["content"]["application/json"]
        >()
    ).body;
  }
  static async deleteOrder(id: number) {
    return await new JsonRequestValidation()
      .url(`http://localhost:8080/api/v3/store/order/${id}`)
      .method("DELETE")
      .send();
  }
}
