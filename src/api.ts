import axios from "axios";

interface PostMailType {
  graph?: any;
  from?: string;
  mailTo: string;
  mailCc: string;
  replyTo?: string;
  origin: string;
  subject: string;
  message: string;
}

class Api {
  constructor() {}

  async call(
    requestType: "post" | "get",
    url: string,
    data: any = {},
    opts: any = {}
  ) {
    return new Promise((resolve, reject) => {
      axios[requestType](
        process.env.API_REST + url,
        { graph: data, token: process.env.TOKEN },
        opts
      )
        .then((response: any) => {
          resolve(response);
        })
        .catch((response: any) => {
          if ([400, 401, 418].indexOf(response.status) > -1) {
            //// //// console.log('error:', response);
            return false;
          }

          resolve(response);
        });
    });
  }

  async bridge(data: any = {}, opts: any = {}) {
    return new Promise((resolve, reject) => {
      axios["post"](
        process.env.API_REST ?? "",
        { graph: data, token: process.env.TOKEN },
        opts
      )
        .then(({ data }: any) => {
          //// //// console.log('log:', data);
          resolve(data);
        })
        .catch((response: any) => {
          if ([400, 401, 418].indexOf(response.status) > -1) {
            //// //// console.log('error:', response);
            return false;
          }

          resolve(response);
        });
    });
  }

  async submit(data: PostMailType) {
    return await fetch("/api/mail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  }
}

export default Api;
