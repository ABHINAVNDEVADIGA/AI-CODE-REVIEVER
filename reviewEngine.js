function reviewCode(code, language) {
  if (!code || !language) return "❌ Code or language missing.";

  const review = [];
  const lines = code.split("\n");

  review.push(`📌 Language: ${language.toUpperCase()}`);
  review.push(`📏 Characters: ${code.length}`);
  review.push(`📄 Lines: ${lines.length}`);
  review.push("--------------------------------------------------");

  // -------------------- JavaScript --------------------
  if (language === "javascript") {
    const checks = [
      { condition: code.includes("var "), msg: "⚠️ Avoid 'var'. Use 'let' or 'const'." },
      { condition: code.includes("==") && !code.includes("==="), msg: "⚠️ Use '===' instead of '=='." },
      { condition: code.includes("console.log"), msg: "ℹ️ Debug statement: console.log found." },
      { condition: code.includes("alert"), msg: "⚠️ Avoid using alert for production code." },
      { condition: code.includes("eval"), msg: "❌ Using eval() is dangerous." },
      { condition: code.includes("document.write"), msg: "⚠️ document.write may overwrite page content." },
      { condition: code.includes("innerHTML"), msg: "⚠️ innerHTML can cause XSS if unsanitized." },
      { condition: code.includes("function") === false, msg: "⚠️ No function declarations found." },
      { condition: code.includes("=>"), msg: "✅ Arrow function detected." },
      { condition: code.includes("try") === false, msg: "⚠️ Consider using try/catch for error handling." },
      { condition: code.includes("for") || code.includes("while"), msg: "✅ Contains loops." },
      { condition: /setTimeout|setInterval/.test(code), msg: "ℹ️ Timers detected (setTimeout/setInterval)." },
      { condition: /Math\.random/.test(code), msg: "ℹ️ Random number generation detected." },
      { condition: code.includes("JSON.parse"), msg: "⚠️ Ensure input is sanitized for JSON.parse." },
      { condition: code.includes("JSON.stringify"), msg: "ℹ️ JSON.stringify used." },
      { condition: code.includes("Array") && !code.includes(".map"), msg: "⚠️ Consider using Array.map for functional iteration." },
      { condition: code.includes("==null"), msg: "⚠️ Use === null checks instead." },
      { condition: code.includes("typeof") && !code.includes("==="), msg: "⚠️ Use '===' with typeof checks." },
      { condition: code.includes("return") === false, msg: "⚠️ Function may not return any value." },
      { condition: code.includes("console.error"), msg: "ℹ️ Error logging detected." },
      { condition: code.includes("const") === false && code.includes("let") === false, msg: "⚠️ No modern variable declaration found." },
      { condition: code.includes(";") === false, msg: "⚠️ Semicolons missing (may cause errors)." },
      { condition: code.includes("document.getElementById") && !code.includes("if"), msg: "⚠️ DOM manipulation may lack null checks." },
      { condition: code.includes("async") && !code.includes("await"), msg: "⚠️ Async function missing await." },
      { condition: code.includes("Promise") && !code.includes(".then"), msg: "⚠️ Promise detected without then/catch." },
      { condition: /while\s*\(true\)/.test(code), msg: "❌ Infinite loop detected." },
      { condition: code.includes("switch") && !code.includes("default"), msg: "⚠️ Switch statement missing default case." },
      { condition: code.includes("break") === false && code.includes("switch"), msg: "⚠️ Switch case may not break." },
      { condition: code.includes("RegExp") && !code.includes(".test"), msg: "⚠️ RegExp created but not tested." },
      { condition: /if\s*\(.*==.*\)/.test(code), msg: "⚠️ Use '===' in if conditions." },
    ];

    checks.forEach(c => { if (c.condition) review.push(c.msg); });

    // Basic syntax check
    try { new Function(code); review.push("✅ Syntax appears valid."); } 
    catch (e) { review.push(`❌ Syntax error: ${e.message}`); }
  }

  // -------------------- Python --------------------
  if (language === "python") {
    const pyChecks = [
      { condition: !code.includes("def "), msg: "⚠️ No function definitions found." },
      { condition: code.includes("== None"), msg: "⚠️ Use 'is None' instead of '== None'." },
      { condition: code.includes("print"), msg: "ℹ️ Debug print statement found." },
      { condition: code.includes("import") === false, msg: "⚠️ No imports detected (check dependencies)." },
      { condition: code.includes("for") || code.includes("while"), msg: "✅ Contains loops." },
      { condition: code.includes("try") === false, msg: "⚠️ Consider using try/except for error handling." },
      { condition: code.includes("if") === false, msg: "⚠️ No conditional statements detected." },
      { condition: code.includes("=") && code.includes("==") === false, msg: "⚠️ Check equality operations." },
      { condition: code.includes("class") === false, msg: "⚠️ No classes detected." },
      { condition: code.includes("list") && !code.includes("append"), msg: "⚠️ List may not be modified." },
      { condition: code.includes("dict") && !code.includes("get"), msg: "⚠️ Consider using dict.get for safe access." },
      { condition: /while\s+True/.test(code), msg: "❌ Infinite loop detected." },
      { condition: /import\s+\*/.test(code), msg: "⚠️ Avoid 'import *', use explicit imports." },
      { condition: code.includes("lambda") && !code.includes("return"), msg: "⚠️ Lambda may not return a value." },
      { condition: code.includes("global"), msg: "⚠️ Global variable usage detected." },
      { condition: code.includes("pass") && !code.includes("else"), msg: "⚠️ pass used; check logic." },
      { condition: code.includes("try") && !code.includes("except"), msg: "⚠️ try without except detected." },
      { condition: code.includes("with"), msg: "✅ Context manager detected." },
      { condition: code.includes("set") && !code.includes("len"), msg: "⚠️ Set detected; ensure correct usage." },
      { condition: code.includes("open") && !code.includes("close"), msg: "⚠️ File opened but not closed." },
      { condition: code.includes("return") === false, msg: "⚠️ Functions may not return value." },
      { condition: code.includes("int(") && code.includes("float(") === false, msg: "⚠️ Type conversions may be incomplete." },
      { condition: code.includes("Exception") && !code.includes("raise"), msg: "⚠️ Exception defined but not raised." },
      { condition: code.includes("try") && code.includes("finally") === false, msg: "⚠️ Consider finally block." },
      { condition: code.includes("break") && !code.includes("while"), msg: "⚠️ break used outside loop?" },
      { condition: code.includes("continue") && !code.includes("while") && !code.includes("for"), msg: "⚠️ continue used outside loop?" },
      { condition: code.includes("import os") && !code.includes("os.path"), msg: "⚠️ os module imported but path not used." },
    ];
    pyChecks.forEach(c => { if (c.condition) review.push(c.msg); });
  }

  // -------------------- C/C++ --------------------
  if (language === "c" || language === "cpp") {
    const cChecks = [
      { condition: !code.includes("main"), msg: "⚠️ No main function detected." },
      { condition: code.includes("malloc") && !code.includes("free"), msg: "⚠️ malloc without free detected." },
      { condition: code.includes("printf"), msg: "ℹ️ printf statement detected." },
      { condition: code.includes("#include") === false, msg: "⚠️ No header files included." },
      { condition: code.includes("for") || code.includes("while"), msg: "✅ Loops detected." },
      { condition: code.includes("==") && !code.includes("==="), msg: "⚠️ Check equality operators." },
      { condition: code.includes("return") === false, msg: "⚠️ Function may not return value." },
      { condition: code.includes("scanf") && !code.includes("&"), msg: "⚠️ scanf arguments may be wrong." },
      { condition: code.includes("goto"), msg: "⚠️ Avoid using goto." },
      { condition: /\/\//.test(code) === false, msg: "⚠️ No comments found." },
      { condition: code.includes("const") && code.includes("*") === false, msg: "⚠️ Check const pointer usage." },
      { condition: code.includes("while(1)"), msg: "❌ Infinite loop detected." },
      { condition: code.includes("switch") && !code.includes("default"), msg: "⚠️ Switch missing default case." },
      { condition: code.includes("break") === false && code.includes("switch"), msg: "⚠️ Switch case may not break." },
      { condition: code.includes("NULL") && !code.includes("nullptr"), msg: "⚠️ Prefer nullptr in C++." },
      { condition: code.includes("new") && !code.includes("delete"), msg: "⚠️ Memory allocation without deallocation." },
      { condition: code.includes("printf") && !code.includes("\\n"), msg: "⚠️ printf without newline." },
      { condition: code.includes("sizeof") && !code.includes("*"), msg: "⚠️ sizeof may be incorrect." },
      { condition: code.includes("struct") && !code.includes(";"), msg: "⚠️ Struct definition may be incomplete." },
      { condition: code.includes("typedef"), msg: "ℹ️ typedef used." },
    ];
    cChecks.forEach(c => { if (c.condition) review.push(c.msg); });
  }

  // -------------------- Java --------------------
  if (language === "java") {
    const javaChecks = [
      { condition: !code.includes("class"), msg: "⚠️ No class detected." },
      { condition: !code.includes("public static void main"), msg: "⚠️ Main method missing." },
      { condition: code.includes("System.out.println"), msg: "ℹ️ Debug print detected." },
      { condition: code.includes("==") && code.includes(".equals") === false, msg: "⚠️ Use .equals for string comparison." },
      { condition: code.includes("for") || code.includes("while"), msg: "✅ Loops detected." },
      { condition: code.includes("try") && !code.includes("catch"), msg: "⚠️ try without catch." },
      { condition: code.includes("import") === false, msg: "⚠️ No imports found." },
      { condition: code.includes("public") === false, msg: "⚠️ Missing public access specifier." },
      { condition: code.includes("private") === false, msg: "⚠️ No private access specifier detected." },
      { condition: code.includes("static") === false, msg: "⚠️ No static methods detected." },
      { condition: code.includes("new") && !code.includes("null"), msg: "⚠️ Object creation may not be null-checked." },
      { condition: code.includes("final"), msg: "ℹ️ final keyword used." },
      { condition: code.includes("String") && code.includes("=="), msg: "⚠️ Strings compared with '=='." },
      { condition: code.includes("return") === false, msg: "⚠️ Function may not return value." },
      { condition: code.includes("System.exit"), msg: "⚠️ System.exit usage detected." },
    ];
    javaChecks.forEach(c => { if (c.condition) review.push(c.msg); });
  }

  // -------------------- HTML --------------------
  if (language === "html") {
    if (!code.toLowerCase().includes("<!doctype html>")) review.push("⚠️ Missing <!DOCTYPE html>.");
    if (!code.includes("<title>")) review.push("⚠️ Missing <title> tag.");
    if (code.includes("<img") && !code.includes("alt=")) review.push("⚠️ Image missing alt attribute.");
    if (code.includes("<a") && !code.includes("href=")) review.push("⚠️ Anchor missing href.");
    if (!code.includes("<head>")) review.push("⚠️ Missing <head> section.");
    if (!code.includes("<body>")) review.push("⚠️ Missing <body> section.");
    if (code.includes("<script") && !code.includes("type=")) review.push("⚠️ Script tag missing type attribute.");
    if (code.includes("<link") && !code.includes("rel=")) review.push("⚠️ Link tag missing rel attribute.");
  }

  // -------------------- CSS --------------------
  if (language === "css") {
    if (!code.includes("{") || !code.includes("}")) review.push("⚠️ Possible syntax error: missing braces.");
    if (code.includes("!important")) review.push("⚠️ Avoid using !important.");
    if (code.includes("px") === false && code.includes("%") === false) review.push("⚠️ Check units (px/%/em).");
    if (code.includes("color") && !code.includes("#") && !code.includes("rgb")) review.push("⚠️ Color values may be invalid.");
    if (code.includes("font-family") === false) review.push("⚠️ No font-family defined.");
    if (code.includes("display") === false) review.push("⚠️ Display property not set.");
  }

  // -------------------- Common checks --------------------
  lines.forEach((line, i) => {
    if (line.length > 120) review.push(`⚠️ Line ${i + 1} exceeds 120 characters.`);
    if (line.includes("TODO") || line.includes("FIXME")) review.push(`ℹ️ Line ${i + 1} contains TODO/FIXME.`);
  });

  review.push("--------------------------------------------------");
  review.push("✅ Review complete.");
  return review.join("\n");
}

module.exports = { reviewCode };
