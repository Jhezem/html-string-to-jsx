export type HtmlString = string;

export interface HtmlElement {
  tag?: string;
  value?: string;
  href?: string;
  width?: number;
  height?: number;
  alt?: string;
  classNames?: string;
  src?: string;
}

export interface ParsedHtml<T> {
  [key: string]: T | HtmlElement[];
}

export interface IElementProps {
  content: HtmlElement;
  children?: React.ReactNode | React.ReactNode[];
}

export interface JSXMapperType {
  p?: React.FC<IElementProps>;
  br?: React.FC<IElementProps>;
  span?: React.FC<IElementProps>;
  a?: React.FC<IElementProps>;
  link?: React.FC<IElementProps>;
  h1?: React.FC<IElementProps>;
  h2?: React.FC<IElementProps>;
  h3?: React.FC<IElementProps>;
  h4?: React.FC<IElementProps>;
  h5?: React.FC<IElementProps>;
  h6?: React.FC<IElementProps>;
  img?: React.FC<IElementProps>;
  [key: string]: React.FC<IElementProps> | undefined;
}

export type JSXMapperElements = keyof JSXMapperType;
