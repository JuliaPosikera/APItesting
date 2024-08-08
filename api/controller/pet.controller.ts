import { JsonRequest } from "./../request";
interface Pet {
  id?: number;
  category: { id: number; name: string };
  name: string;
  photoUrls: string[];
  tags: Array<{ id: number; name: string }>;
  status: string;
}

export class PetController {
  static async getById(id: number | string) {
    try {
      return (
        await new JsonRequest()
          .url(`http://localhost:8080/api/v3/pet/${id}`)
          .send()
      ).body;
    } catch (error: any) {
      console.error(error?.response?.body || "error by getting pets by id");
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
        await new JsonRequest()
          .url(`http://localhost:8080/api/v3/pet/findByTags`)
          .searchParams(searchParams)
          .send()
      ).body;
    } catch (error: any) {
      console.error(error?.response?.body || "error by getting pets by tags");
    }
  }

  static async getByIdStatus(status: "available" | "sold" | "pending") {
    try {
      return (
        await new JsonRequest()
          .url(`http://localhost:8080/api/v3/pet/findByStatus?status=${status}`)
          .send()
      ).body;
    } catch (error: any) {
      console.error(error?.response?.body || "error by getting pets by status");
    }
  }

  static async addNew(pet: Pet) {
    try {
      return (
        await new JsonRequest()
          .url("http://localhost:8080/api/v3/pet")
          .method("POST")
          .body(pet)
          .send()
      ).body;
    } catch (error: any) {
      console.error(error?.response?.body || "Error by adding new pet");
    }
  }

  static async updatePet(pet: Pet) {
    try {
      return (
        await new JsonRequest()
          .url("http://localhost:8080/api/v3/pet")
          .method("PUT")
          .body(pet)
          .send()
      ).body;
    } catch (error: any) {
      console.error(
        error?.response?.body || "Error by updating pet with id=10"
      );
    }
  }
  static async deletePet(id: number) {
    return (
      await new JsonRequest()
        .url(`http://localhost:8080/api/v3/pet/${id}`)
        .method("DELETE")
        .send()
    ).body;
  }
}
