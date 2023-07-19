import React from "react";
import { render } from "@testing-library/react";
import JSXMapper from "./index";

describe("JSXMapper with valid html tags", () => {
  const testData = [
    {
      content: "<p>Hello,<span>World!</span></p>",
      expectedOutput: "<p>Hello,<span>World!</span></p>",
    },
    {
      content: `<h1>Comer saludable, es esencial</h1>
      <h2>Toma nota de estos tips</h2>
      <p>Both rest of know draw fond post as. It agreement defective to excellent. Feebly do engage of narrow. Extensive repulsive belonging depending if promotion be zealously as. Preference inquietude ask now are dispatched led appearance. Small meant in so doubt hopes. Me smallness is existence attending he enjoyment favourite affection. Delivered is to ye belonging enjoyment preferred. Astonished and acceptance men two discretion. Law education recommend did objection how old.</p>
      <p>Both rest of know draw fond post as. It agreement defective to excellent. Feebly do engage of narrow. Extensive repulsive belonging depending if promotion be zealously as. Preference inquietude ask now are dispatched led appearance. Small meant in so doubt hopes. Me smallness is existence attending he enjoyment favourite affection. Delivered is to ye belonging enjoyment preferred. Astonished and acceptance men two discretion. Law education recommend did objection how old.</p>
      <a href="beber-saludable">Ejemplo de link interno</a>
      <img src="https://fastly.picsum.photos/id/937/600/600.jpg?hmac=2FnsDUVJKpS_Q2vrUQzXT4y2JJ34EZTmNXPJcpeMuaw" width="400" height="400" alt="blog image"/>`,
      expectedOutput: `<h1>Comer saludable, es esencial</h1><h2>Toma nota de estos tips</h2><p>Both rest of know draw fond post as. It agreement defective to excellent. Feebly do engage of narrow. Extensive repulsive belonging depending if promotion be zealously as. Preference inquietude ask now are dispatched led appearance. Small meant in so doubt hopes. Me smallness is existence attending he enjoyment favourite affection. Delivered is to ye belonging enjoyment preferred. Astonished and acceptance men two discretion. Law education recommend did objection how old.</p><p>Both rest of know draw fond post as. It agreement defective to excellent. Feebly do engage of narrow. Extensive repulsive belonging depending if promotion be zealously as. Preference inquietude ask now are dispatched led appearance. Small meant in so doubt hopes. Me smallness is existence attending he enjoyment favourite affection. Delivered is to ye belonging enjoyment preferred. Astonished and acceptance men two discretion. Law education recommend did objection how old.</p><a href="beber-saludable">Ejemplo de link interno</a><img src="https://fastly.picsum.photos/id/937/600/600.jpg?hmac=2FnsDUVJKpS_Q2vrUQzXT4y2JJ34EZTmNXPJcpeMuaw" height="400" width="400" alt="blog image">`,
    },
    {
      content: "<p><span>Hello world</span>",
      expectedOutput: `<p><span>Hello world</span></p>`,
    },
  ];

  const testJSXMapper = ({
    content,
    expectedOutput,
  }: {
    content: string;
    expectedOutput: string;
  }) => {
    const { container } = render(<JSXMapper content={content} />);

    expect(container.innerHTML).toBe(expectedOutput);
  };

  test.each(testData)(
    "should render correctly with content: %p",
    testJSXMapper,
  );
});

describe("Invalid html tag is passed to JSXMapper", () => {
  it("should not render the wrong tag", () => {
    const wrongTag = "Hola mundo </h1>";

    const { container } = render(<JSXMapper content={wrongTag} />);

    expect(container.innerHTML).toBe("");
  });
});

describe("No html tag is passed to JSXMapper", () => {
  it("should not render anything", () => {
    const wrongTag = "Hola mundo lorem ipsum";

    const { container } = render(<JSXMapper content={wrongTag} />);

    expect(container.innerHTML).toBe("");
  });
});
