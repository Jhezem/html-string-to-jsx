# HTML String to JSX

Convert HTML strings into JSX elements easily with this library, usefull for using content generated by ritch text tools.

## Installation

Install the package using Yarn or npm:

```bash
# Yarn
yarn add html-string-to-jsx

# npm
npm install html-string-to-jsx --save
```

## Usage

```typescript
const content = "<p>Hello, <span>World!</span></p>";

const mapper: JSXMapperType = {
  p: ({ content, children }) => (
    <p>
      {content.value} {children}
    </p>
  ),
  span: ({ content }) => <span>{content.value}</span>,
};

const App = () => {
  return <JSXMapper content={content} mapper={mapper} />;
};
```

## Advance usage

You can map different HTML elements to custom React components using the mapper object. For example:

```typescript
import { JSXMapperType } from "html-string-to-jsx";
import JSXMapper from "html-string-to-jsx";

const content = "<h1>Welcome to my Website!</h1><p>This is a paragraph.</p>";

const mapper: JSXMapperType = {
  h1: ({ content }) => <h1 className="heading">{content.value}</h1>,
  p: ({ content }) => <p className="paragraph">{content.value}</p>,
};

const App = () => {
  return <JSXMapper content={content} mapper={mapper} />;
};
```

### Working with links (nextjs example)

```typescript
import { JSXMapperType } from "html-string-to-jsx";
import JSXMapper from "html-string-to-jsx";
import Link from "next/link";

const content = `<a href="/blog" data-link-type="internal"> Google </a>`;

const mapper: JSXMapperType = {
  a: ({ content }) => {
    if (content["data-link-type"] === "internal") {
      return <Link href={content.href}>Link interno</Link>;
    }
    return (
      <a href={content.href} target="_blank">
        Link externo
      </a>
    );
  },
};

const App = () => {
  return <JSXMapper content={content} mapper={mapper} />;
};
```

## Rendering Results

When you use the JSXMapper component with the given content and mapper, the result will be:

```html
<!-- Basic Usage -->
<p>Hello, <span>World!</span></p>

<!-- Advanced Usage -->
<h1 class="heading">Welcome to my Website!</h1>
<p class="paragraph">This is a paragraph.</p>

<!-- Internal link -->
<a href="/blog">This is an internal link</a>
```