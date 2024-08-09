import { strict as assert } from "assert";
import { StoreController as store } from "../api/controller/store.controller";
import { components, operations } from "./../temp/schema";

describe("Store", () => {
  let initialOrdersInTheStore: operations["getInventory"]["responses"]["200"]["content"]["application/json"];

  before(async () => {
    initialOrdersInTheStore = await store.getInventory();
    assert(
      Object.keys(initialOrdersInTheStore).length > 0,
      "API should return a current quantity of every status store orders"
    );
    assert(
      initialOrdersInTheStore.placed &&
        initialOrdersInTheStore.delivered &&
        initialOrdersInTheStore.approved,
      "API should return orders for placed, delivered, and approved statuses"
    );
  });

  it("should correctly add and delete an order with 'placed' status", async function () {
    await testOrderStatus("placed");
  });

  it("should correctly add and delete an order with 'approved' status", async function () {
    await testOrderStatus("approved");
  });

  it("should correctly add and delete an order with 'delivered' status", async function () {
    await testOrderStatus("delivered");
  });

  async function testOrderStatus(
    status: components["schemas"]["Order"]["status"]
  ) {
    const orderToAdd = newOrderWithStatus(status);

    const addedOrder = await store.placeOrder(orderToAdd);

    assert(status);
    assert.deepEqual(
      addedOrder,
      orderToAdd,
      `API should return the same order that was placed with status '${status}'`
    );
    async function wait(timeout: number) {
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
    await wait(400);
    const newOrdersInTheStore = await store.getInventory();

    assert.equal(
      initialOrdersInTheStore[status]! + orderToAdd.quantity,
      newOrdersInTheStore[status],
      `Quantity of ${status} orders must increase after adding a new order`
    );

    await store.deleteOrder(orderToAdd.id);
    const finalOrdersInTheStore = await store.getInventory();

    assert.equal(
      finalOrdersInTheStore[status],
      initialOrdersInTheStore[status],
      `Quantity of ${status} orders must be the same as it was initially after deleting the order`
    );
  }

  function newOrderWithStatus(
    status: components["schemas"]["Order"]["status"]
  ) {
    return {
      id: Math.round(Math.random() * 100),
      petId: Math.round(Math.random() * 1000),
      //   id: 1223,
      //   petId: 31,
      quantity: 7,
      shipDate: new Date().toISOString().replace("Z", "+00:00"),
      status,
      complete: true,
    };
  }
});
