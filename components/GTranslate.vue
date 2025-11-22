<template>
    <div class="gtranslate_wrapper custom-gtranslate-style"></div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Ajoutez le script GTranslate une fois que le composant est monté
      const script1 = document.createElement('script');
      script1.innerHTML = `
        window.gtranslateSettings = {
          "default_language": "fr",
          "native_language_names": true,
          "detect_browser_language": true,
          "languages": ["fr", "de", "it", "en", "ja"],
          "wrapper_selector": ".gtranslate_wrapper",
          "switcher_vertical_position": "bottom"
        };
      `;
      document.body.appendChild(script1);
  
      const script2 = document.createElement('script');
      script2.src = "https://cdn.gtranslate.net/widgets/latest/dwf.js";
      script2.defer = true;
      document.body.appendChild(script2);
    }
  }
  </script>
  
  <style scoped>

  </style>
  