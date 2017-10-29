import test from "ava";
import nativeFunctions from ".";

test("exports a function", t => {
  t.is(typeof nativeFunctions, "function");
});
