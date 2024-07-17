import { loadHeaderFooter,getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

loadHeaderFooter();

let redirect = getParam("redirect");

const form = document.forms[0];

if (form != null) {
  // listen for submit on the form
  form.loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) {
      const email = form.email.value;
      const password = form.password.value;
      if (redirect == null) {
        redirect = "/";
      }
      login(email, password, redirect);
    }
  });
}