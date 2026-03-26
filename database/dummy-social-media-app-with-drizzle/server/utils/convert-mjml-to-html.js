import path from "path";
import ejs from "ejs";
import fs from "fs/promises";
import mjml2html from "mjml";

export const convertMjmlToHtml = async (file, payload) => {
  try {
    const mjmlTemplate = await fs.readFile(
      path.join(import.meta.dirname, "..", "emails", `${file}.mjml`),
      "utf-8"
    );

    const filledTemplate = ejs.render(mjmlTemplate, payload);

    return mjml2html(filledTemplate).html;
  } catch (err) {
    return null;
  }
};
