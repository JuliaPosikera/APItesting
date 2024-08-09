import got, { Response } from "got";
import { Options, Method } from "got";

export class JsonRequest {
  protected options: any = { responseType: "json" };

  public url(url: string | URL): this {
    this.options.url = url;
    return this;
  }

  public method(method: Method): this {
    this.options.method = method;
    return this;
  }
  public searchParams(searchParams: Options["searchParams"]): this {
    this.options.searchParams = searchParams;
    return this;
  }
  public body(body: any): this {
    this.options.json = body;
    return this;
  }
  // public send() {
  //   return got(this.options);
  // }
  public async send<T = any>(): Promise<Response<T>> {
    // Patching async stacktrace that leads to nowhere
    const stack = new Error().stack;
    try {
      return await got<T>(this.options as any);
    } catch (err: any) {
      if (err instanceof got.HTTPError) {
        err.message = `
            [${err?.options?.method}]: ${err?.options?.url} => ${
          err?.response?.statusCode
        } 
            ${err.message} 
            ${err?.response?.rawBody?.toString()}
            `;
      }
      err.stack = `${err.message} \n${stack}`;
      throw err;
    }
  }
}
