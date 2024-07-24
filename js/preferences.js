import { loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs"
import { displayPreferences } from "./prefer.mjs";

loadHeaderFooter();
checkLogin();
displayPreferences("like");
displayPreferences("dislike");

