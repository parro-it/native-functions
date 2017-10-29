import test from "ava";
import { replace, trim, toUpperCase, startsWith } from "./strings";

test("replace - is curried", t => {
  const unBlank = replace(/\s/g);
  const unBlankWithStars = unBlank("*");
  t.is(unBlankWithStars("a b\nc"), "a*b*c");
});

test("replace - with a function", t => {
  const unBlank = replace(/\s/g);
  let seq = 0;
  const unBlankWithSeq = unBlank(item => ++seq + item);
  t.is(unBlankWithSeq("a b\nc d"), "a1 b2\nc3 d");
});

test("replace - complete call", t => {
  const res = replace(/^.{2}/, "*", "abcd");
  t.is(res, "*cd");
});

test("trim - complete call", t => {
  const res = trim(" pp ");
  t.is(res, "pp");
});

test("replace - work with multiple types", t => {
  const supportType = (value, expected, t) => {
    const res = replace(/^./, "*", value);
    t.is(res, expected);
  };
  supportType(422, "*22", t);
  supportType(true, "*rue", t);
  supportType(["a", 42, 43], "*,42,43", t);
  supportType({ toString: () => "ciao" }, "*iao", t);
});

test("trim - work with multiple types", t => {
  const supportType = (value, expected, t) => {
    const res = trim(value);
    t.is(res, expected);
  };
  supportType(" p ", "p", t);
  supportType(422, "422", t);
  supportType(true, "true", t);
  supportType([" a", 42, 43], "a,42,43", t);
  supportType({ toString: () => " ciao" }, "ciao", t);
});

test("toUpperCase - work with multiple types", t => {
  const supportType = (value, expected, t) => {
    const res = toUpperCase(value);
    t.is(res, expected);
  };
  supportType(" p ", " P ", t);
  supportType(422, "422", t);
  supportType(true, "TRUE", t);
  supportType([" a", 42, 43], " A,42,43", t);
  supportType({ toString: () => " ciao" }, " CIAO", t);
});

test("startsWith", t => {
  const supportType = (value, expected, t) => {
    const res = startsWith("t", value);
    t.is(res, expected);
  };
  supportType("t", true, t);
  supportType(422, false, t);
  supportType(true, true, t);
  supportType(["t", 42, 43], true, t);
  supportType({ toString: () => "t" }, true, t);
});
