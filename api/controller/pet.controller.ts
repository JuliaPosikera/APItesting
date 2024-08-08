import got from "got";

interface Pet {
  id: number;
  category: { id: number; name: string };
  name: string;
  photoUrls: string[];
  tags: Array<{ [key: string]: any }>;
  status: string;
}

export class PetController {
  static async getById(id: number | string) {
    const responce = await got(`http://localhost:8080/api/v3/pet/${id}`);
    const body: Pet = JSON.parse(responce.body);
    return body;
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

    const responce = await got(`http://localhost:8080/api/v3/pet/findByTags`, {
      searchParams: searchParams,
    });
    const body: Pet[] = JSON.parse(responce.body);
    return body;
  }

  static async getByIdStatus(status: "available" | "sold" | "pending") {
    const responce = await got(
      `http://localhost:8080/api/v3/pet/findByStatus?status=${status}`
    );
    const body: Pet[] = JSON.parse(responce.body);

    return body;
  }
}
