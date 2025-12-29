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

    // Helper function to set or update meta tag
    const setMetaTag = (name: string, content: string) => {
      let element = document.querySelector(
        `meta[property="${name}"], meta[name="${name}"]`
      );
      if (!element) {
        element = document.createElement("meta");
        if (name.startsWith("og:") || name.startsWith("twitter:")) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Set OpenGraph meta tags
    setMetaTag("og:title", meta.title);
    setMetaTag("og:description", meta.description);
    setMetaTag("og:url", meta.url);
    setMetaTag("og:type", meta.type || "website");

    if (meta.image) {
      setMetaTag("og:image", meta.image);
    }

    // Set Twitter Card meta tags
    setMetaTag("twitter:card", meta.twitterCard || "summary_large_image");
    setMetaTag("twitter:title", meta.title);
    setMetaTag("twitter:description", meta.description);

    if (meta.image) {
      setMetaTag("twitter:image", meta.image);
    }

    // Set basic meta description
    setMetaTag("description", meta.description);

    return () => {
      // Cleanup is optional - you might want to keep meta tags
      // or reset them to defaults on unmount
    };
  }, [meta]);
};
