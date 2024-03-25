import { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function Document({ locale }: DocumentContext) {
  let lang = locale || "en";
  if (typeof lang !== "string") lang = "en";

  return (
    <Html lang={lang} className="dark" >
      <Head>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
