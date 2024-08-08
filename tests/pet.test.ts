import { strict as assert } from "assert";
import { PetController as pet } from "../api/controller/pet.controller";
import { components } from "./../temp/schema";
import _ from "lodash";

describe("User can ", () => {
  it("receive pet by id", async function () {
    const body = await pet.getById(2);
    assert(
      body,
      "Expected API to return array of pets but have no body in responce"
    );
    assert(
      body?.id === 2,
      `Expected API to return pet with id=1, but got ${body.id}`
    );
  });
  it("receive pet by status", async function () {
    let body = await pet.getByStatus("available");
    assert(
      body,
      "Expected API to return array of pets but have no body in responce"
    );
    assert(
      body.length > 0,
      `Expected API to return array of pets with status avaliable, but got nothing`
    );

    body = await pet.getByStatus("pending");
    assert(
      body,
      "Expected API to return array of pets but have no body in responce"
    );
    assert(
      body.length > 0,
      `Expected API to return array of pets with status pending, but got nothing`
    );

    body = await pet.getByStatus("sold");
    assert(
      body,
      "Expected API to return array of pets but have no body in responce"
    );
    assert(
      body.length > 0,
      `Expected API to return array of pets with status sold, but got nothing`
    );

    assert(
      !body.some((pet) => pet.status === "pending"),
      "Expectes API to return array of pets with status sold but have records with status sold"
    );
  });
  it("receive pet by tag", async function () {
    const body = await pet.getByTags(["tag2", "tag3"]);
    assert(
      body,
      "Expected API to return array of pets but have no body in responce"
    );
    assert(
      body.length > 0,
      `Expected API to return array of pets with tags "tag2", "tag3", but got nothing`
    );
    assert(
      body.every(
        (pet) =>
          pet.tags?.some((tag) => tag.name === "tag2") ||
          pet.tags?.some((tag) => tag.name === "tag3")
      ),
      "Every returned pet must containes tag2 or tag3"
    );
  });
  it("user can add/update and delete pet ", async function () {
    const newPet: components["schemas"]["Pet"] = {
      id: 199,
      name: "doggie",
      category: {
        id: 1,
        name: "Dogs",
      },
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    let responce = await pet.addNewPet(newPet);

    assert.deepEqual(
      newPet,
      responce,
      "The returned pet object does not match the sent pet object"
    );
    const addedPet = await pet.getById(199);

    assert.deepEqual(
      newPet,
      addedPet,
      "The returned by getting pet object does not match the sent pet object"
    );
    const petToUpdate: components["schemas"]["Pet"] = {
      ...newPet,
      name: "Marie",
    };
    responce = await pet.updatePet(petToUpdate);

    assert.deepEqual(
      petToUpdate,
      responce,
      "The returned pet object does not match the sent pet object"
    );

    pet.deletePet(199);
  });
});
