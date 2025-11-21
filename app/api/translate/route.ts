import { NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION;

export async function POST(request: Request) {
  try {
    const { text, from, to } = await request.json();

    const params = {
      "api-version": "3.0",
      from: from,
      to: to,
    };

    const headers = {
      "Ocp-Apim-Subscription-Key": AZURE_KEY,
      "Ocp-Apim-Subscription-Region": AZURE_REGION,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString(),
    };

    const response = await axios({
      baseURL: AZURE_ENDPOINT,
      url: "/translate",
      method: "post",
      headers: headers,
      params: params,
      data: [
        {
          text: text,
        },
      ],
      responseType: "json",
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "LỖI KHI GỌI AXIOS (HARD-CODED):",
      error.response ? error.response.data : error.message,
    );
    return NextResponse.json({ error: "Lỗi khi gọi Azure" }, { status: 500 }); // (App Router)
  }
}
