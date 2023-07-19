import { parseHTML } from "./utils/helpers/index";
import ContentMapper from "./utils/contentGenerator/contentMapper";
import { HtmlElement, JSXMapperType, JSXMapperElements } from "../global";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const JSXMapper = ({
  content,
  mapper = ContentMapper,
}: {
  content: string;
  mapper?: JSXMapperType;
}) => {
  const tagsMap = parseHTML(content);

  const mapChildrens = (childrens: HtmlElement[]) => {
    return childrens.map((children) => {
      const childrenResolver = mapper[children.tag as JSXMapperElements];
      if (typeof childrenResolver === "function") {
        const childJsx = childrenResolver({
          content: children,
        });

        return React.cloneElement(childJsx as React.ReactElement<any>, {
          key: uuidv4(),
        });
      }

      return null;
    });
  };

  return tagsMap.map((element) => {
    const jsxResolver = mapper[element?.tag as JSXMapperElements];

    if (typeof jsxResolver === "function") {
      if (element.childrens) {
        const childs = mapChildrens(element.childrens as HtmlElement[]);
        const componentWithChildren = jsxResolver({
          content: element,
          children: childs,
        });

        return React.cloneElement(
          componentWithChildren as React.ReactElement<any>,
          {
            key: uuidv4(),
          },
        );
      } else {
        const component = jsxResolver({
          content: element,
        });

        return React.cloneElement(component as React.ReactElement<any>, {
          key: uuidv4(),
        });
      }
    }
  });
};

export default JSXMapper;
