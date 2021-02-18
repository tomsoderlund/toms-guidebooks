# LeadPages

Custom fonts in Settings -> Analytics -> Head Section Tracking Code:

<link href="https://fonts.googleapis.com/css2?family=Droid+Serif:wght@400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;700&display=swap" rel="stylesheet">

Custom Styles in Styles -> Custom CSS:

h1, h2, h3, h4 {
  font-family: 'Droid Serif', serif !important;
  font-weight: bold !important;
}

html, body,
section, div,
p, li,
.lp-button-react-wrapper {
  font-family: Barlow, sans-serif !important;
  font-weight: 500 !important;
}


.page-background {
  background: linear-gradient(180deg, #E9F7FC 0%, #FFFFFF 100%) !important;
}


## Custom CSS:

.css-ej3e7n,
.css-11gfn7g,
.css-78j0nh {
  background: transparent !important;
}

/* Country-specific: Geo Targetly and LeadPages custom CSS */

/* Download buttons: hide */
section.css-13hpov6 .layout:nth-child(1),
section.css-dm2ig2  .layout:nth-child(1) {
  display: none;
}
/* Signup form: show */
section.css-13hpov6 .layout:nth-child(2),
section.css-dm2ig2  .layout:nth-child(2) {
  display: flex;
}
