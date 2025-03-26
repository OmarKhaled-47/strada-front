/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { JSX } from "react/jsx-runtime";

interface RichTextRendererProps {
  content: any;
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          // Map the level to the correct HTML tag (h1, h2, etc.)
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;

          // Add dynamic classes based on the heading level
          const headingClasses = {
            1: "text-4xl font-bold mb-6", // h1
            2: "text-3xl font-bold mb-5", // h2
            3: "text-2xl font-bold mb-4", // h3
            4: "text-xl font-bold mb-3", // h4
            5: "text-lg font-bold mb-2", // h5
            6: "text-base font-bold mb-1", // h6
          };

          return (
            <Tag className={headingClasses[level] || "text-xl font-bold mb-4"}>
              {children}
            </Tag>
          );
        },

        list: ({ children, format }) => {
          const ListTag = format === "ordered" ? "ol" : "ul";
          const listStyle = format === "ordered" ? "list-decimal" : "list-disc";

          return (
            <ListTag className={`${listStyle} pl-6 mb-4`}>{children}</ListTag>
          );
        },

        paragraph: ({ children }) => (
          <p className="text-lg text-gray-600 mb-4">{children}</p>
        ),

        "list-item": ({ children }) => (
          <li className="text-lg text-gray-600 mb-2">{children}</li>
        ),
        link: ({ children, url }) => (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {children}
          </a>
        ),
      }}
    />
  );
}
