import { load, CheerioAPI, Element } from "cheerio";
import { HtmlString, ParsedHtml } from "../../../global";

export function parseHTML(htmlString: HtmlString): Array<ParsedHtml<string>> {
  const $: CheerioAPI = load(htmlString);
  const result: Array<ParsedHtml<string>> = [];

  const traverse = (element: Element): ParsedHtml<string> => {
    const tag: string = element.tagName; // Get the tag name
    const obj: ParsedHtml<string> = { tag }; // Create an object with tag name as property

    // If the element has text content, add it as "value" property to the object
    const text: string = $(element)
      .contents()
      .filter(function () {
        return this.nodeType === 3; // Filter out non-text nodes
      })
      .text()
      .trim();
    if (text.length > 0) {
      obj.value = text;
    }

    Object.keys(element.attribs).forEach((attr) => {
      obj[attr] = element.attribs[attr];
    });

    // Recursively traverse the children of the element
    const children: ParsedHtml<string>[] = [];
    element.children.forEach((childElement) => {
      if (childElement.type === "tag") {
        children.push(traverse(childElement));
      }
    });

    // If the element has children, add them as "childrens" property to the object
    if (children.length > 0) {
      obj.childrens = children;
    }

    return obj;
  };

  // Start traversing from the body tag
  $("body")
    .children()
    .each((_: number, element: Element) => {
      result.push(traverse(element));
    });

  return result;
}
