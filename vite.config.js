import { defineConfig } from "vite";

const YM = "99073800";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      {
        name: "html-transform",
        transformIndexHtml(html) {
          if (isProduction) {
            // Inject Google Analytics code only in production
            return html.replace(
              "</head>",
              `<script type="text/javascript" >
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
           
              ym(${YM}, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   webvisor:true
              });
           </script>
           <noscript><div><img src="https://mc.yandex.ru/watch/${YM}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
            </head>`
            );
          }
          return html;
        },
      },
    ],
  };
});
