import { JsonRequest } from "./request-builder";
import { ResponseValidator } from "./../response-openapi-validator/ResponseValidator";

const responseValidator = new ResponseValidator({
  openApiSpecPath: "http://localhost:8080/api/v3/openapi.json",
  apiPathPrefix: "/api/v3",
  ajvOptions: {
    allErrors: true,
    verbose: true,
    formats: {
      double: "[+-]?\\d*\\.?\\d+",
      int32:
        /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
      int64: /^\d+$/,
    },
    keywords: ["xml", "example"],
  },
});

export class JsonRequestValidation extends JsonRequest {
  async send<T>() {
    const response = await super.send<T>();
    if (response.request.options.method !== "DELETE") {
      await responseValidator.assertResponse({
        method: response.request.options.method,
        requestUrl: response.request.requestUrl,
        statusCode: response.statusCode,
        body: response.body,
      });
    }
    // console.log("HERE");
    // console.log(response);
    return response;
  }
}
