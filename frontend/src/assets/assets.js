import c from "./c.png";
import python from "./python.png";
import spiro from "./spiro_.png";
import java from "./java.png";
import web from "./web.png";
import genAI from "./genAI.png";
import online_learning from "./online_learning_gif.gif";
import spiro_edu from "./spiro_.png";

export const assets = {
  c,
  python,
  spiro,
  spiro_edu,
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
    price: "₹1599",
    rating: 4.0,
  },
  {
    _id: "Java",
    name: "Java",
    description:
      "Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a high-level programming language developed by Sun Microsystems.",
    image: [java],
    price: "₹1999",
    rating: 4.5,
  },
  {
    _id: "Web",
    name: "Web Development",
    description:
      "Web development is the work involved in developing a website for the Internet or an intranet. It can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.",
    image: [web],
    price: "₹1899",
    rating: 4.5,
  },
  {
    _id: "GenAI",
    name: "Generative AI",
    description:
      "Generative AI refers to algorithms that can generate new content, including text, images, audio, and video, based on training data. It encompasses various techniques such as deep learning and neural networks.",
    image: [genAI],
    price: "₹1799",
    rating: 4.7,
  },
  
];
