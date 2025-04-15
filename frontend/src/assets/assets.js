import c from "./c.png";
import python from "./python.png";
import spiro from "./spiro.png";
import java from "./java.png";
import web from "./web.png";
import genAI from "./genAI.png";
import online_learning from "./online_learning_gif.gif";

export const assets = {
  c,
  python,
  spiro,
  java,
  web,
  genAI,
  online_learning
};

export const courses = [
  {
    _id: "c",
    name: "C Progarmming",
    description:
      "C is a general-purpose, procedural computer programming language that supports structured programming, lexical variable scope, and recursion, while a static type system prevents unintended operations.",
    image: [c],
  },
  {
    _id: "Python",
    name: "Python Programming",
    description:
      "Python is a high-level, interpreted, general-purpose programming language. It was created by Guido van Rossum and first released in 1991.",
    image: [python],
  },
  {
    _id: "Java",
    name: "Java",
    description:
      "Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a high-level programming language developed by Sun Microsystems.",
    image: [java],
  },
  
];
