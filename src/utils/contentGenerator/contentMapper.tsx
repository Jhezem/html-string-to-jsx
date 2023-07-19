import React from "react";
import { IElementProps } from "../../../global";

const ContentMapper = {
  p: ({ content, children }: IElementProps) => {
    return (
      <p>
        {content.value}
        {children}
      </p>
    );
  },
  br: () => <br />,
  span: ({ content }: IElementProps) => <span>{content.value}</span>,
  link: ({ content, children }: IElementProps) => {
    return (
      <a href={content.href}>
        {content.value}
        {children}
      </a>
    );
  },
  a: ({ content, children }: IElementProps) => {
    if (content.href)
      return ContentMapper.link({
        content,
      });
    return (
      <a>
        {content.value}
        {children}
      </a>
    );
  },
  h1: ({ content, children }: IElementProps) => {
    return (
      <h1>
        {content.value}
        {children}
      </h1>
    );
  },
  h2: ({ content, children }: IElementProps) => {
    return (
      <h2>
        {content.value}
        {children}
      </h2>
    );
  },
  h3: ({ content, children }: IElementProps) => {
    return (
      <h2>
        {content.value}
        {children}
      </h2>
    );
  },
  img: ({ content }: IElementProps) => {
    const { src, width, height, alt } = content;
    if (!src) return null;
    if (!width || !height)
      return (
        <img
          src={src}
          style={{
            objectFit: "contain",
          }}
          alt={content?.alt ?? ""}
        />
      );
    return <img src={src} height={height} width={width} alt={alt ?? ""} />;
  },
};

export default ContentMapper;
