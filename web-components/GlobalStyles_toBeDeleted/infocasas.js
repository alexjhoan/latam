// Icons StyleSheet

import css from "styled-jsx/css";

export default css.global`
  @font-face {
    font-family: "infocasas";
    src: url("https://cdn1.infocasas.com.uy/web/59831ca11f2b6_infocdn__infocasas.eot?45807134");
    src: url("https://cdn1.infocasas.com.uy/web/59831ca11f2b6_infocdn__infocasas.eot?45807134#iefix")
        format("embedded-opentype"),
      url("https://cdn1.infocasas.com.uy/web/59831d23a300e_infocdn__infocasas.woff2?45807134")
        format("woff2"),
      url("https://cdn1.infocasas.com.uy/web/59831d02468dc_infocdn__infocasas.woff?45807134")
        format("woff"),
      url("https://cdn1.infocasas.com.uy/web/59831cdd5a023_infocdn__infocasas.ttf?45807134")
        format("truetype"),
      url("https://cdn1.infocasas.com.uy/web/59831cc159c38_infocdn__infocasas.svg?45807134#infocasas")
        format("svg");
    font-weight: normal;
    font-style: normal;
  }
  /* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */
  /* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */
  /*
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    @font-face {
      font-family: 'infocasas';
      src: url('/59831cc159c38_infocdn__infocasas.svg?45807134#infocasas') format('svg');
    }
  }
  */

  [class^="icon-"]:before,
  [class*=" icon-"]:before {
    font-family: "infocasas";
    font-style: normal;
    font-weight: normal;
    speak: none;

    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    /* opacity: .8; */

    /* For safety - reset parent styles, that can break glyph codes*/
    font-variant: normal;
    text-transform: none;

    /* fix buttons height, for twitter bootstrap */
    line-height: 1em;

    /* Animation center compensation - margins should be symmetric */
    /* remove if not needed */
    margin-left: 0.2em;

    /* you can be more comfortable with increased icons size */
    /* font-size: 120%; */

    /* Font smoothing. That was taken from TWBS */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Uncomment for 3D effect */
    /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
  }

  .icon-comment-inv-alt2:before {
    content: "\e800";
  } /* '' */
  .icon-left-circle:before {
    content: "\e801";
  } /* '' */
  .icon-right-circle:before {
    content: "\e802";
  } /* '' */
  .icon-cancel-circle:before {
    content: "\e803";
  } /* '' */
  .icon-minus-circled:before {
    content: "\e804";
  } /* '' */
  .icon-heart:before {
    content: "\e805";
  } /* '' */
  .icon-call:before {
    content: "\e806";
  } /* '' */
  .icon-mail:before {
    content: "\e807";
  } /* '' */
  .icon-right-open:before {
    content: "\e808";
  } /* '' */
  .icon-left-open:before {
    content: "\e809";
  } /* '' */
  .icon-plus-circle:before {
    content: "\e80a";
  } /* '' */
  .icon-camera:before {
    content: "\e80b";
  } /* '' */
  .icon-users:before {
    content: "\e80c";
  } /* '' */
  .icon-heart-circled:before {
    content: "\e80d";
  } /* '' */
  .icon-facebook-1:before {
    content: "\e80e";
  } /* '' */
  .icon-print:before {
    content: "\e80f";
  } /* '' */
  .icon-ok:before {
    content: "\e810";
  } /* '' */
  .icon-lodging:before {
    content: "\e811";
  } /* '' */
  .icon-warehouse:before {
    content: "\e812";
  } /* '' */
  .icon-paper-plane-1:before {
    content: "\e813";
  } /* '' */
  .icon-search-1:before {
    content: "\e814";
  } /* '' */
  .icon-pencil:before {
    content: "\e815";
  } /* '' */
  .icon-twitter:before {
    content: "\e816";
  } /* '' */
  .icon-home:before {
    content: "\e817";
  } /* '' */
  .icon-cab:before {
    content: "\e818";
  } /* '' */
  .icon-comment:before {
    content: "\e819";
  } /* '' */
  .icon-location:before {
    content: "\e81a";
  } /* '' */
  .icon-angle-down:before {
    content: "\e81b";
  } /* '' */
  .icon-menu:before {
    content: "\e81c";
  } /* '' */
  .icon-briefcase:before {
    content: "\e81d";
  } /* '' */
  .icon-commerical-building:before {
    content: "\e81e";
  } /* '' */
  .icon-building:before {
    content: "\e81f";
  } /* '' */
  .icon-hospital:before {
    content: "\e820";
  } /* '' */
  .icon-building-filled:before {
    content: "\e821";
  } /* '' */
  .icon-coffee:before {
    content: "\e822";
  } /* '' */
  .icon-m2ter:before {
    content: "\e823";
  } /* '' */
  .icon-industrial-building:before {
    content: "\e824";
  } /* '' */
  .icon-shop:before {
    content: "\e825";
  } /* '' */
  .icon-garden:before {
    content: "\e826";
  } /* '' */
  .icon-tree-1:before {
    content: "\e827";
  } /* '' */
  .icon-trash:before {
    content: "\e828";
  } /* '' */
  .icon-lock:before {
    content: "\e829";
  } /* '' */
  .icon-lock-open:before {
    content: "\e82a";
  } /* '' */
  .icon-info-circled:before {
    content: "\e82b";
  } /* '' */
  .icon-pencil-1:before {
    content: "\e82c";
  } /* '' */
  .icon-angle-up:before {
    content: "\e82d";
  } /* '' */
  .icon-map-1:before {
    content: "\e82e";
  } /* '' */
  .icon-angle-right:before {
    content: "\e82f";
  } /* '' */
  .icon-angle-left:before {
    content: "\e830";
  } /* '' */
  .icon-comment-alt:before {
    content: "\e831";
  } /* '' */
  .icon-chart-area:before {
    content: "\e832";
  } /* '' */
  .icon-chart-pie:before {
    content: "\e833";
  } /* '' */
  .icon-inver:before {
    content: "\e834";
  } /* '' */
  .icon-key:before {
    content: "\e835";
  } /* '' */
  .icon-megaphone:before {
    content: "\e836";
  } /* '' */
  .icon-newspaper:before {
    content: "\e837";
  } /* '' */
  .icon-chart-pie-1:before {
    content: "\e838";
  } /* '' */
  .icon-child:before {
    content: "\e839";
  } /* '' */
  .icon-thumbs-down:before {
    content: "\e83a";
  } /* '' */
  .icon-mail-alt:before {
    content: "\e83b";
  } /* '' */
  .icon-mail-squared:before {
    content: "\e83c";
  } /* '' */
  .icon-picture:before {
    content: "\e83d";
  } /* '' */
  .icon-star:before {
    content: "\e83e";
  } /* '' */
  .icon-briefcase-1:before {
    content: "\e83f";
  } /* '' */
  .icon-attach:before {
    content: "\e840";
  } /* '' */
  .icon-bath-01:before {
    content: "\e841";
  } /* '' */
  .icon-paper-plane-2:before {
    content: "\e842";
  } /* '' */
  .icon-cancel:before {
    content: "\e843";
  } /* '' */
  .icon-m2:before {
    content: "\e844";
  } /* '' */
  .icon-bell-alt:before {
    content: "\e845";
  } /* '' */
  .icon-calendar-empty:before {
    content: "\e846";
  } /* '' */
  .icon-gmail:before {
    content: "\e847";
  } /* '' */
  .icon-google:before {
    content: "\e848";
  } /* '' */
  .icon-linkedin:before {
    content: "\e849";
  } /* '' */
  .icon-facebook:before {
    content: "\e84a";
  } /* '' */
  .icon-phone:before {
    content: "\e84b";
  } /* '' */
  .icon-chrome:before {
    content: "\e84c";
  } /* '' */
  .icon-spin6:before {
    content: "\e84d";
  } /* '' */
  .icon-thumbs-up:before {
    content: "\e84e";
  } /* '' */
  .icon-flag:before {
    content: "\e84f";
  } /* '' */
  .icon-help-circled:before {
    content: "\e850";
  } /* '' */
  .icon-info-circled-1:before {
    content: "\e851";
  } /* '' */
  .icon-unlink:before {
    content: "\e852";
  } /* '' */
  .icon-pin:before {
    content: "\e853";
  } /* '' */
  .icon-eye:before {
    content: "\e854";
  } /* '' */
  .icon-eye-off:before {
    content: "\e855";
  } /* '' */
  .icon-lock-1:before {
    content: "\e856";
  } /* '' */
  .icon-lock-open-1:before {
    content: "\e857";
  } /* '' */
  .icon-lock-open-alt:before {
    content: "\e858";
  } /* '' */
  .icon-user-add:before {
    content: "\e859";
  } /* '' */
  .icon-chart-pie-2:before {
    content: "\e85a";
  } /* '' */
  .icon-camera-1:before {
    content: "\e85b";
  } /* '' */
  .icon-clock-alt:before {
    content: "\e85c";
  } /* '' */
  .icon-play-circle2:before {
    content: "\e85d";
  } /* '' */
  .icon-mobile:before {
    content: "\e85e";
  } /* '' */
  .icon-heart-broken:before {
    content: "\e85f";
  } /* '' */
  .icon-police:before {
    content: "\e860";
  } /* '' */
  .icon-restaurant:before {
    content: "\e861";
  } /* '' */
  .icon-school:before {
    content: "\e862";
  } /* '' */
  .icon-swimming:before {
    content: "\e863";
  } /* '' */
  .icon-tennis:before {
    content: "\e864";
  } /* '' */
  .icon-golf:before {
    content: "\e865";
  } /* '' */
  .icon-fire-station:before {
    content: "\e866";
  } /* '' */
  .icon-prison:before {
    content: "\e867";
  } /* '' */
  .icon-tint:before {
    content: "\e868";
  } /* '' */
  .icon-leaf:before {
    content: "\e869";
  } /* '' */
  .icon-align-left:before {
    content: "\e86a";
  } /* '' */
  .icon-align-center:before {
    content: "\e86b";
  } /* '' */
  .icon-align-right:before {
    content: "\e86c";
  } /* '' */
  .icon-align-justify:before {
    content: "\e86d";
  } /* '' */
  .icon-list:before {
    content: "\e86e";
  } /* '' */
  .icon-indent-left:before {
    content: "\e86f";
  } /* '' */
  .icon-indent-right:before {
    content: "\e870";
  } /* '' */
  .icon-map:before {
    content: "\e871";
  } /* '' */
  .icon-linkedin-1:before {
    content: "\e872";
  } /* '' */
  .icon-videocam:before {
    content: "\e873";
  } /* '' */
  .icon-female:before {
    content: "\e874";
  } /* '' */
  .icon-male:before {
    content: "\e875";
  } /* '' */
  .icon-users-1:before {
    content: "\e876";
  } /* '' */
  .icon-glass:before {
    content: "\e877";
  } /* '' */
  .icon-music:before {
    content: "\e878";
  } /* '' */
  .icon-camera-2:before {
    content: "\e879";
  } /* '' */
  .icon-th-large:before {
    content: "\e87a";
  } /* '' */
  .icon-th-list:before {
    content: "\e87b";
  } /* '' */
  .icon-plus-squared:before {
    content: "\e87c";
  } /* '' */
  .icon-tag:before {
    content: "\e87d";
  } /* '' */
  .icon-info:before {
    content: "\e87e";
  } /* '' */
  .icon-folder-open:before {
    content: "\e87f";
  } /* '' */
  .icon-doc-text-inv:before {
    content: "\e880";
  } /* '' */
  .icon-doc-text:before {
    content: "\e881";
  } /* '' */
  .icon-cog-alt:before {
    content: "\e882";
  } /* '' */
  .icon-cog:before {
    content: "\e883";
  } /* '' */
  .icon-wrench:before {
    content: "\e884";
  } /* '' */
  .icon-move:before {
    content: "\e885";
  } /* '' */
  .icon-lightbulb:before {
    content: "\e886";
  } /* '' */
  .icon-clock:before {
    content: "\e887";
  } /* '' */
  .icon-volume-up:before {
    content: "\e888";
  } /* '' */
  .icon-volume-down:before {
    content: "\e889";
  } /* '' */
  .icon-volume-off:before {
    content: "\e88a";
  } /* '' */
  .icon-angle-double-left:before {
    content: "\e88b";
  } /* '' */
  .icon-angle-double-right:before {
    content: "\e88c";
  } /* '' */
  .icon-angle-double-up:before {
    content: "\e88d";
  } /* '' */
  .icon-angle-double-down:before {
    content: "\e88e";
  } /* '' */
  .icon-ccw:before {
    content: "\e88f";
  } /* '' */
  .icon-cw:before {
    content: "\e890";
  } /* '' */
  .icon-play-circled:before {
    content: "\e891";
  } /* '' */
  .icon-play:before {
    content: "\e892";
  } /* '' */
  .icon-sun:before {
    content: "\e893";
  } /* '' */
  .icon-globe:before {
    content: "\e894";
  } /* '' */
  .icon-desktop:before {
    content: "\e895";
  } /* '' */
  .icon-laptop:before {
    content: "\e896";
  } /* '' */
  .icon-tablet:before {
    content: "\e897";
  } /* '' */
  .icon-mobile-1:before {
    content: "\e898";
  } /* '' */
  .icon-network:before {
    content: "\e899";
  } /* '' */
  .icon-scissors:before {
    content: "\e89a";
  } /* '' */
  .icon-paste:before {
    content: "\e89b";
  } /* '' */
  .icon-crop:before {
    content: "\e89c";
  } /* '' */
  .icon-gift:before {
    content: "\e89d";
  } /* '' */
  .icon-align-left-1:before {
    content: "\e89e";
  } /* '' */
  .icon-align-right-1:before {
    content: "\e89f";
  } /* '' */
  .icon-align-center-1:before {
    content: "\e8a0";
  } /* '' */
  .icon-align-justify-1:before {
    content: "\e8a1";
  } /* '' */
  .icon-list-1:before {
    content: "\e8a2";
  } /* '' */
  .icon-indent-left-1:before {
    content: "\e8a3";
  } /* '' */
  .icon-indent-right-1:before {
    content: "\e8a4";
  } /* '' */
  .icon-list-bullet:before {
    content: "\e8a5";
  } /* '' */
  .icon-tint-1:before {
    content: "\e8a6";
  } /* '' */
  .icon-key-1:before {
    content: "\e8a7";
  } /* '' */
  .icon-money:before {
    content: "\e8a8";
  } /* '' */
  .icon-bicycle:before {
    content: "\e8a9";
  } /* '' */
  .icon-bus:before {
    content: "\e8aa";
  } /* '' */
  .icon-truck:before {
    content: "\e8ab";
  } /* '' */
  .icon-paw:before {
    content: "\e8ac";
  } /* '' */
  .icon-spoon:before {
    content: "\e8ad";
  } /* '' */
  .icon-medkit:before {
    content: "\e8ae";
  } /* '' */
  .icon-ambulance:before {
    content: "\e8af";
  } /* '' */
  .icon-stethoscope:before {
    content: "\e8b0";
  } /* '' */
  .icon-user-md:before {
    content: "\e8b1";
  } /* '' */
  .icon-food:before {
    content: "\e8b2";
  } /* '' */
  .icon-coffee-1:before {
    content: "\e8b3";
  } /* '' */
  .icon-beer:before {
    content: "\e8b4";
  } /* '' */
  .icon-plug:before {
    content: "\e8b5";
  } /* '' */
  .icon-binoculars:before {
    content: "\e8b6";
  } /* '' */
  .icon-angellist:before {
    content: "\e8b7";
  } /* '' */
  .icon-lifebuoy:before {
    content: "\e8b8";
  } /* '' */
  .icon-brush:before {
    content: "\e8b9";
  } /* '' */
  .icon-pagelines:before {
    content: "\e8ba";
  } /* '' */
  .icon-note:before {
    content: "\e8bb";
  } /* '' */
  .icon-flashlight:before {
    content: "\e8bc";
  } /* '' */
  .icon-flag-1:before {
    content: "\e8bd";
  } /* '' */
  .icon-address:before {
    content: "\e8be";
  } /* '' */
  .icon-tools:before {
    content: "\e8bf";
  } /* '' */
  .icon-share:before {
    content: "\e8c0";
  } /* '' */
  .icon-docs:before {
    content: "\e8c1";
  } /* '' */
  .icon-bell:before {
    content: "\e8c2";
  } /* '' */
  .icon-mic:before {
    content: "\e8c3";
  } /* '' */
  .icon-hourglass:before {
    content: "\e8c4";
  } /* '' */
  .icon-light-up:before {
    content: "\e8c5";
  } /* '' */
  .icon-trophy:before {
    content: "\e8c6";
  } /* '' */
  .icon-battery:before {
    content: "\e8c7";
  } /* '' */
  .icon-key-2:before {
    content: "\e8c8";
  } /* '' */
  .icon-graduation-cap:before {
    content: "\e8c9";
  } /* '' */
  .icon-traffic-cone:before {
    content: "\e8ca";
  } /* '' */
  .icon-rocket:before {
    content: "\e8cb";
  } /* '' */
  .icon-gplus:before {
    content: "\e8cc";
  } /* '' */
  .icon-dropbox:before {
    content: "\e8cd";
  } /* '' */
  .icon-share-1:before {
    content: "\e8ce";
  } /* '' */
  .icon-bicycle-1:before {
    content: "\e8cf";
  } /* '' */
  .icon-fast-food:before {
    content: "\e8d0";
  } /* '' */
  .icon-accessibility:before {
    content: "\e8d1";
  } /* '' */
  .icon-clipboard:before {
    content: "\e8d2";
  } /* '' */
  .icon-guidedog:before {
    content: "\e8d3";
  } /* '' */
  .icon-blind:before {
    content: "\e8d4";
  } /* '' */
  .icon-wrench-circled:before {
    content: "\e8d5";
  } /* '' */
  .icon-eye-1:before {
    content: "\e8d6";
  } /* '' */
  .icon-eye-off-1:before {
    content: "\e8d7";
  } /* '' */
  .icon-fuel:before {
    content: "\e8d8";
  } /* '' */
  .icon-ferry:before {
    content: "\e8d9";
  } /* '' */
  .icon-airport:before {
    content: "\e8da";
  } /* '' */
  .icon-bar:before {
    content: "\e8db";
  } /* '' */
  .icon-baseball:before {
    content: "\e8dc";
  } /* '' */
  .icon-basketball:before {
    content: "\e8dd";
  } /* '' */
  .icon-cafe:before {
    content: "\e8de";
  } /* '' */
  .icon-cinema:before {
    content: "\e8df";
  } /* '' */
  .icon-cricket:before {
    content: "\e8e0";
  } /* '' */
  .icon-monument:before {
    content: "\e8e1";
  } /* '' */
  .icon-town-hall:before {
    content: "\e8e2";
  } /* '' */
  .icon-toilet:before {
    content: "\e8e3";
  } /* '' */
  .icon-theatre:before {
    content: "\e8e4";
  } /* '' */
  .icon-skiing:before {
    content: "\e8e5";
  } /* '' */
  .icon-link:before {
    content: "\e8e6";
  } /* '' */
  .icon-upload:before {
    content: "\e8e7";
  } /* '' */
  .icon-download:before {
    content: "\e8e8";
  } /* '' */
  .icon-quote-right:before {
    content: "\e8e9";
  } /* '' */
  .icon-quote-left:before {
    content: "\e8ea";
  } /* '' */
  .icon-keyboard:before {
    content: "\e8eb";
  } /* '' */
  .icon-moon:before {
    content: "\e8ec";
  } /* '' */
  .icon-umbrella:before {
    content: "\e8ed";
  } /* '' */
  .icon-wifi:before {
    content: "\e8ee";
  } /* '' */
  .icon-book:before {
    content: "\e8ef";
  } /* '' */
  .icon-ticket:before {
    content: "\e8f0";
  } /* '' */
  .icon-fire:before {
    content: "\e8f1";
  } /* '' */
  .icon-hammer:before {
    content: "\e8f2";
  } /* '' */
  .icon-anchor:before {
    content: "\e8f3";
  } /* '' */
  .icon-ok-1:before {
    content: "\e8f4";
  } /* '' */
  .icon-spin5:before {
    content: "\e8f5";
  } /* '' */
  .icon-th:before {
    content: "\e8f6";
  } /* '' */
  .icon-smile:before {
    content: "\e8f7";
  } /* '' */
  .icon-frown:before {
    content: "\e8f8";
  } /* '' */
  .icon-extinguisher:before {
    content: "\e8f9";
  } /* '' */
  .icon-signal:before {
    content: "\e8fa";
  } /* '' */
  .icon-money-1:before {
    content: "\e8fb";
  } /* '' */
  .icon-gplus-1:before {
    content: "\e8fc";
  } /* '' */
  .icon-heliport:before {
    content: "\e8fd";
  } /* '' */
  .icon-food-1:before {
    content: "\e8fe";
  } /* '' */
  .icon-money-2:before {
    content: "\e8ff";
  } /* '' */
  .icon-t-shirt:before {
    content: "\e900";
  } /* '' */
  .icon-font:before {
    content: "\e901";
  } /* '' */
  .icon-fontsize:before {
    content: "\e902";
  } /* '' */
  .icon-bold:before {
    content: "\e903";
  } /* '' */
  .icon-beer-1:before {
    content: "\e904";
  } /* '' */
  .icon-leaf-1:before {
    content: "\e905";
  } /* '' */
  .icon-rain:before {
    content: "\e906";
  } /* '' */
  .icon-cloud-sun:before {
    content: "\e907";
  } /* '' */
  .icon-drizzle:before {
    content: "\e908";
  } /* '' */
  .icon-waves:before {
    content: "\e909";
  } /* '' */
  .icon-news:before {
    content: "\e90a";
  } /* '' */
  .icon-doc-add:before {
    content: "\e90b";
  } /* '' */
  .icon-doc-remove:before {
    content: "\e90c";
  } /* '' */
  .icon-dot-3:before {
    content: "\e90d";
  } /* '' */
  .icon-recycle:before {
    content: "\e90e";
  } /* '' */
  .icon-cc-visa:before {
    content: "\e90f";
  } /* '' */
  .icon-cc-mastercard:before {
    content: "\e910";
  } /* '' */
  .icon-birthday:before {
    content: "\e911";
  } /* '' */
  .icon-android:before {
    content: "\e912";
  } /* '' */
  .icon-apple:before {
    content: "\e913";
  } /* '' */
  .icon-chart-line:before {
    content: "\e914";
  } /* '' */
  .icon-euro:before {
    content: "\e915";
  } /* '' */
  .icon-dollar:before {
    content: "\e916";
  } /* '' */
  .icon-award:before {
    content: "\e917";
  } /* '' */
  .icon-glasses:before {
    content: "\e918";
  } /* '' */
  .icon-logout:before {
    content: "\e919";
  } /* '' */
  .icon-docs-1:before {
    content: "\e91a";
  } /* '' */
  .icon-block:before {
    content: "\e91b";
  } /* '' */
  .icon-attention:before {
    content: "\e91c";
  } /* '' */
  .icon-box:before {
    content: "\e91d";
  } /* '' */
  .icon-clock-1:before {
    content: "\e91e";
  } /* '' */
  .icon-resize-full:before {
    content: "\e91f";
  } /* '' */
  .icon-resize-small:before {
    content: "\e920";
  } /* '' */
  .icon-attention-alt:before {
    content: "\e921";
  } /* '' */
  .icon-attention-circled:before {
    content: "\e922";
  } /* '' */
  .icon-attention-1:before {
    content: "\e923";
  } /* '' */
  .icon-ellipsis:before {
    content: "\e924";
  } /* '' */
  .icon-ellipsis-vert:before {
    content: "\e925";
  } /* '' */
  .icon-toggle-off:before {
    content: "\e926";
  } /* '' */
  .icon-toggle-on:before {
    content: "\e927";
  } /* '' */
  .icon-taxi:before {
    content: "\e928";
  } /* '' */
  .icon-puzzle:before {
    content: "\e929";
  } /* '' */
  .icon-calc:before {
    content: "\e92a";
  } /* '' */
  .icon-copyright:before {
    content: "\e92b";
  } /* '' */
  .icon-windows:before {
    content: "\e92c";
  } /* '' */
  .icon-doc-text-inv-1:before {
    content: "\e92d";
  } /* '' */
  .icon-list-add:before {
    content: "\e92e";
  } /* '' */
  .icon-right:before {
    content: "\e92f";
  } /* '' */
  .icon-left:before {
    content: "\e930";
  } /* '' */
  .icon-down:before {
    content: "\e931";
  } /* '' */
  .icon-up:before {
    content: "\e932";
  } /* '' */
  .icon-ascendor:before {
    content: "\e933";
  } /* '' */
  .icon-silla:before {
    content: "\e934";
  } /* '' */
  .icon-tv:before {
    content: "\e935";
  } /* '' */
  .icon-balcon:before {
    content: "\e936";
  } /* '' */
  .icon-lav:before {
    content: "\e937";
  } /* '' */
  .icon-gym:before {
    content: "\e938";
  } /* '' */
  .icon-calef:before {
    content: "\e939";
  } /* '' */
  .icon-trato-20:before {
    content: "\e93a";
  } /* '' */
  .icon-cancel-circled:before {
    content: "\e93b";
  } /* '' */
  .icon-user:before {
    content: "\e93c";
  } /* '' */
  .icon-deco:before {
    content: "\e93d";
  } /* '' */
  .icon-whatsapp:before {
    content: "\e93e";
  } /* '' */
  .icon-arrows-ccw:before {
    content: "\e93f";
  } /* '' */
  .icon-retweet:before {
    content: "\e940";
  } /* '' */
  .icon-chart-pie-3:before {
    content: "\e941";
  } /* '' */
  .icon-right-hand:before {
    content: "\e942";
  } /* '' */
  .icon-left-hand:before {
    content: "\e943";
  } /* '' */
  .icon-up-hand:before {
    content: "\e944";
  } /* '' */
  .icon-down-hand:before {
    content: "\e945";
  } /* '' */
  .icon-wine:before {
    content: "\e946";
  } /* '' */
  .icon-youtube:before {
    content: "\e947";
  } /* '' */
  .icon-visa:before {
    content: "\e948";
  } /* '' */
  .icon-mastercard:before {
    content: "\e949";
  } /* '' */
  .icon-gift-1:before {
    content: "\e94a";
  } /* '' */
  .icon-equalizer:before {
    content: "\e94b";
  } /* '' */
  .icon-bookmark:before {
    content: "\e94c";
  } /* '' */
  .icon-calendar-inv:before {
    content: "\e94d";
  } /* '' */
  .icon-hash:before {
    content: "\e94e";
  } /* '' */
  .icon-compass-circled:before {
    content: "\e94f";
  } /* '' */
  .icon-icon-mar-01:before {
    content: "\e950";
  } /* '' */
  .icon-piso:before {
    content: "\e951";
  } /* '' */
  .icon-plus:before {
    content: "\e952";
  } /* '' */
  .icon-ok-2:before {
    content: "\e953";
  } /* '' */
  .icon-parrillero:before {
    content: "\e954";
  } /* '' */
  .icon-aire:before {
    content: "\e955";
  } /* '' */
  .icon-barbacoa:before {
    content: "\e956";
  } /* '' */
  .icon-huespedes:before {
    content: "\e957";
  } /* '' */
  .icon-cucheta:before {
    content: "\e958";
  } /* '' */
  .icon-colchon:before {
    content: "\e959";
  } /* '' */
  .icon-banos:before {
    content: "\e95a";
  } /* '' */
  .icon-2-plazas:before {
    content: "\e95b";
  } /* '' */
  .icon-dormitorios:before {
    content: "\e95c";
  } /* '' */
  .icon-sofa:before {
    content: "\e95d";
  } /* '' */
  .icon-1-plaza:before {
    content: "\e95e";
  } /* '' */
  .icon-mail-1:before {
    content: "\e95f";
  } /* '' */
  .icon-mobile-2:before {
    content: "\e960";
  } /* '' */
  .icon-beaker:before {
    content: "\f0c3";
  } /* '' */
  .icon-gplus-2:before {
    content: "\f0d5";
  } /* '' */
  .icon-circle-empty:before {
    content: "\f10c";
  } /* '' */
  .icon-circle:before {
    content: "\f111";
  } /* '' */
  .icon-gamepad:before {
    content: "\f11b";
  } /* '' */
  .icon-instagram:before {
    content: "\f16d";
  } /* '' */
  .icon-skype:before {
    content: "\f17e";
  } /* '' */
  .icon-dot-circled:before {
    content: "\f192";
  } /* '' */
  .icon-wheelchair:before {
    content: "\f193";
  } /* '' */
  .icon-database:before {
    content: "\f1c0";
  } /* '' */
  .icon-soccer-ball:before {
    content: "\f1e3";
  } /* '' */
  .icon-ship:before {
    content: "\f21a";
  } /* '' */
  .icon-user-secret:before {
    content: "\f21b";
  } /* '' */
  .icon-pinterest:before {
    content: "\f231";
  } /* '' */
  .icon-bed:before {
    content: "\f236";
  } /* '' */
  .icon-map-o:before {
    content: "\f278";
  } /* '' */
  .icon-map-2:before {
    content: "\f279";
  } /* '' */
  .icon-hashtag:before {
    content: "\f292";
  } /* '' */
  .icon-id-card-o:before {
    content: "\f2c3";
  } /* '' */
  .icon-snowflake-o:before {
    content: "\f2dc";
  } /* '' */
  .icon-flickr-circled:before {
    content: "\f304";
  } /* '' */
`;
