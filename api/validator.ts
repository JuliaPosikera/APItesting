import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv from "ajv";

export async function loadAPISpeck() {
  console.log("loadAPISpeck");
  return SwaggerParser.dereference("http://localhost:8080/api/v3/openapi.json");
}

export function validate(schema: any, body: any) {
  console.log(schema);
  console.log(body);

  const ajv = new Ajv({
    strict: false,
    allErrors: true,
    verbose: true,
    formats: {
      double: "[+-]?\\d*\\.?\\d+",
      int32:
        /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
      int64: /^\d+$/,
    },
  });
  const validate = ajv.compile(schema);
  const valid = validate(body);
  console.log(valid);
  if (!valid) {
    throw new Error(
      `Schema validation error: ${JSON.stringify(
        { validationErrors: validate.errors },
        null,
        2
      )}`
    );
  }
}
