import { JsonRequestValidation } from "../request";
import { components, operations } from "./../../temp/schema";

export class PetController {
  static async getById(id: number | string) {
    try {
      const body = (
        await new JsonRequestValidation()
          .url(`http://localhost:8080/api/v3/pet/${id}`)
          .send<
            operations["getPetById"]["responses"]["200"]["content"]["application/json"]
          >()
      ).body;

      // const apiSpeck = (await loadAPISpeck()) as any;

      // const schema =
      //   apiSpeck.paths["/pet/{petId}"]["get"]["responses"]["200"]["content"][
      //     "application/xml"
      //   ]["schema"];

      // // validate(schema, { id: "Wrong ID", status: 122 });
      // validate(schema, body);
      return body;
    } catch (error: any) {
      console.error(error?.message || "error by getting pets by id");
    }
  }

  static async getByTags(tags: string | string[]) {
    let searchParams = new URLSearchParams();

    if (typeof tags === "string") {
      searchParams.append("tags", tags);
    } else if (Array.isArray(tags)) {
      tags.forEach((tag) => {
        searchParams.append("tags", tag);
      });
    }
    try {
      return (
        await new JsonRequestValidation()
          .url(`http://localhost:8080/api/v3/pet/findByTags`)
          .searchParams(searchParams)
          .send<
            operations["findPetsByTags"]["responses"]["200"]["content"]["application/json"]
          >()
      ).body;
    } catch (error: any) {
      console.error(error?.message || "error by getting pets by tags");
    }
  }

  static async getByStatus(status: components["schemas"]["Pet"]["status"]) {
    try {
      return (
        await new JsonRequestValidation()
          .url(`http://localhost:8080/api/v3/pet/findByStatus?status=${status}`)
          .send<
            operations["findPetsByStatus"]["responses"]["200"]["content"]["application/json"]
          >()
      ).body;
    } catch (error: any) {
      console.error(error?.message || "error by getting pets by status");
    }
  }

  static async addNewPet(pet: components["schemas"]["Pet"]) {
    try {
      return (
        await new JsonRequestValidation()
          .url("http://localhost:8080/api/v3/pet")
          .method("POST")
          .body(pet)
          .send<
            operations["addPet"]["responses"]["200"]["content"]["application/json"]
          >()
      ).body;
    } catch (error: any) {
      console.error(error?.message || "Error by adding new pet");
    }
  }

  static async updatePet(pet: components["schemas"]["Pet"]) {
    try {
      return (
        await new JsonRequestValidation()
          .url("http://localhost:8080/api/v3/pet")
          .method("PUT")
          .body(pet)
          .send<
            operations["updatePet"]["responses"]["200"]["content"]["application/json"]
          >()
      ).body;
    } catch (error: any) {
      console.error(error?.message || "Error by updating pet with id=10");
    }
  }
  static async deletePet(id: number) {
    return await new JsonRequestValidation()
      .url(`http://localhost:8080/api/v3/pet/${id}`)
      .method("DELETE")
      .send();
  }
}
