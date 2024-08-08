import { strict as assert } from "assert";
import { PetController as pet } from "../api/controller/pet.controller";

describe("User can ", () => {
  it("receive pet by id", async function () {
    const body = await pet.getById(1);
    assert(
      body.id === 1,
      `Expected API to return pet with id=1, but got ${body.id}`
    );
  });
  it("receive pet by status", async function () {
    let body = await pet.getByIdStatus("available");
    assert(
      body.length > 0,
      `Expected API to return array of pets with status avaliable, but got nothing`
    );

    body = await pet.getByIdStatus("pending");
    assert(
      body.length > 0,
      `Expected API to return array of pets with status pending, but got nothing`
    );

    body = await pet.getByIdStatus("sold");

    assert(
      body.length > 0,
      `Expected API to return array of pets with status sold, but got nothing`
    );

    assert(
      !body.some((pet: any) => pet.status === "pending"),
      "Expectes API to return array of pets with status sold but have records with status sold"
    );
  });
  it("receive pet by tag", async function () {
    const body = await pet.getByTags(["tag2", "tag3"]);
    assert(body.length > 0);
    assert(
      body.some((pet) => pet.tags.some((tag: any) => tag.name === "tag2")) &&
        body.some((pet) => pet.tags.some((tag: any) => tag.name === "tag3"))
    );
  });
});
