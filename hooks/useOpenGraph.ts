import { useEffect } from "react";

export interface OpenGraphMeta {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
}

export const useOpenGraph = (meta: OpenGraphMeta) => {
  useEffect(() => {
    // Set page title
    document.title = meta.title;

    // Helper to set or update meta tag by name
    const setMetaName = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to set or update meta tag by property (OpenGraph)
    const setMetaProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Set OpenGraph meta tags
    setMetaProperty("og:title", meta.title);
    setMetaProperty("og:description", meta.description);
    setMetaProperty("og:url", meta.url);
    setMetaProperty("og:type", meta.type || "website");

    if (meta.image) {
      setMetaProperty("og:image", meta.image);
    }

    // Set Twitter Card meta tags (must use name, not property)
    setMetaName("twitter:card", meta.twitterCard || "summary_large_image");
    setMetaName("twitter:title", meta.title);
    setMetaName("twitter:description", meta.description);

    if (meta.image) {
      setMetaName("twitter:image", meta.image);
    }

    // Set basic meta description
    setMetaName("description", meta.description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", meta.url);
  }, [meta]);
};
