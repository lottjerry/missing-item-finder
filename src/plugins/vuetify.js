/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VFileUpload } from "vuetify/labs/VFileUpload";

const customDarkTheme = {
  dark: true,
  colors: {
    primary: "#3F51B5",
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "customDarkTheme",
    themes: {
      customDarkTheme,
    },
  },
  components: {
    VFileUpload,
  },
});
