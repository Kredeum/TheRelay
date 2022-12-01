const utilsResolveUrl = (urlFullOrPort: string, urlBase: string): { url: string; host: string; port: number; } => {
  // console.log("utilsResolveUrl", urlBase, urlFullOrPort);

  let url: string;
  let urlFull: boolean;
  try {
    new URL(urlFullOrPort || "");
    urlFull = true;
  } catch (err) {
    urlFull = false;
  }

  if (urlFull) {
    // urlFullOrPort is the full url
    url = urlFullOrPort || "";
  } else {
    // urlFullOrPort is port only to combine with urlBase
    const urlObject: URL = new URL(urlBase || "");
    urlObject.port = urlFullOrPort || "";
    url = urlObject.href;
  }
  url = url.replace(/\/$/, "");  // delete trailing slash if exists

  const urlObject2: URL = new URL(url || "");
  const host = urlObject2.host || "127.0.0.1";
  const port = Number(urlObject2.port) || 80;

  // console.log("utilsResolveUrl", url, host, port);
  return { url, host, port };
};

export { utilsResolveUrl };
