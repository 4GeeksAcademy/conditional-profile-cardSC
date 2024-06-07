import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // imprimir en la consola

  // Construimos la cobertura condicionalmente
  let cover = variables.includeCover
    ? `<div class="cover"><img src="${variables.background}" /></div>`
    : "<div class='cover'></div>";

  // Construimos el nombre completo si está disponible
  let fullName =
    variables.name || variables.lastName
      ? `${variables.name || ""} ${variables.lastName || ""}`
      : "Anonymous";

  // Construimos el título del trabajo si está disponible
  let jobRole = variables.role ? `<h2>${variables.role}</h2>` : "";

  // Construimos la ubicación si está disponible
  let location =
    variables.city || variables.country
      ? `<h3>${variables.city || ""}${
          variables.city && variables.country ? ", " : ""
        }${variables.country || ""}</h3>`
      : "";

  // Construimos los enlaces de redes sociales condicionalmente
  let socialMediaLinks = "";
  if (variables.twitter) {
    socialMediaLinks += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
  }
  if (variables.github) {
    socialMediaLinks += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
  }
  if (variables.linkedin) {
    socialMediaLinks += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
  }
  if (variables.instagram) {
    socialMediaLinks += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;
  }

  // Determinamos la posición de la barra de redes sociales
  let socialMediaClass =
    variables.socialMediaPosition === "left"
      ? "position-left"
      : "position-right";

  // Resetear el contenido del sitio web con el nuevo HTML generado
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL}" class="photo" />
      <h1>${fullName}</h1>
      ${jobRole}
      ${location}
      <ul class="${socialMediaClass}">
        ${socialMediaLinks}
      </ul>
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
