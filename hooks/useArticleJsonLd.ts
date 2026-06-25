import { useEffect } from "react";

export interface ArticleJsonLdProps {
  type: "Article" | "ItemList";
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
  authorUrl?: string;
  publisherName?: string;
  publisherLogo?: string;
  articleBody?: string;
  /** For ItemList type, provide array of article items */
  itemListElement?: Array<{
    headline: string;
    description: string;
    url: string;
    image?: string;
    authorName?: string;
    datePublished?: string;
    articleBody?: string;
  }>;
}

export const useArticleJsonLd = (props: ArticleJsonLdProps) => {
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const pubDate = props.datePublished || today;
    const modDate = props.dateModified || today;

    let jsonLd: any;

    if (props.type === "ItemList" && props.itemListElement) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: props.headline,
        description: props.description,
        url: props.url,
        numberOfItems: props.itemListElement.length,
        itemListElement: props.itemListElement.map((item, index) => ({
          "@type": "Article",
          headline: item.headline,
          description: item.description,
          url: item.url,
          image: item.image || props.image,
          author: {
            "@type": "Organization",
            name: item.authorName || props.authorName || "SugarLite",
            url: props.authorUrl || "https://sugarlite.top",
          },
          publisher: {
            "@type": "Organization",
            name: props.publisherName || "SugarLite",
            logo: {
              "@type": "ImageObject",
              url: props.publisherLogo || "https://sugarlite.top/icon.png",
            },
          },
          datePublished: item.datePublished || pubDate,
          dateModified: modDate,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": item.url,
          },
          ...(item.articleBody ? { articleBody: item.articleBody } : {}),
          position: index + 1,
        })),
      };
    } else {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.headline,
        description: props.description,
        url: props.url,
        image: props.image || "https://sugarlite.top/og-image.png",
        author: {
          "@type": "Organization",
          name: props.authorName || "SugarLite",
          url: props.authorUrl || "https://sugarlite.top",
        },
        publisher: {
          "@type": "Organization",
          name: props.publisherName || "SugarLite",
          logo: {
            "@type": "ImageObject",
            url: props.publisherLogo || "https://sugarlite.top/icon.png",
          },
        },
        datePublished: pubDate,
        dateModified: modDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.url,
        },
        ...(props.articleBody ? { articleBody: props.articleBody } : {}),
      };
    }

    // Remove any existing Article JSON-LD injected by this hook
    const existingId = "article-jsonld";
    const existing = document.getElementById(existingId);
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.id = existingId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd, null, 2);
    document.head.appendChild(script);
  }, [props]);
};
