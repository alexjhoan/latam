import ImagenOptimizada from "./ImagenOptimizada";

export default function BannerSubhome({ image, link, pos }) {
  return (
    <React.Fragment>
      <div className="destacado">
        <a
          href={link}
          target="_blank"
          className="image_container"
          onFocus={e => {
            // esto quedo asi porque habia un bug que al tappear en mobile
            // no iba al link. referencia https://github.com/akiran/react-slick/issues/1298
            e.preventDefault();
            window.open(link, "_blank");
          }}
          onClick={e => {
            e.preventDefault();
          }}
        >
          <ImagenOptimizada src={image} alt={image} minWidth={200} />
        </a>
        <a href={link} target="_blank" className="ver">
          <span>Conocé más</span>
          <i className="icon-plus"></i>
        </a>
      </div>
      <style jsx>{`
        @keyframes slideFromRight {
          0% {
            transform: translateX(75%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .destacado {
          height: 0;
          width: calc(100% - 30px);
          padding-bottom: 100%;
          opacity: 1;
          position: relative;
          left: 0px;
          display: inline-block;
          cursor: pointer;
          margin-left: 15px;
          margin-right: 15px;
          overflow: hidden;
          opacity: 0;
          animation: slideFromRight 900ms ease ${400 * pos}ms 1 forwards;
        }
        .destacado .image_container {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .destacado .image_container :global(img) {
          transition: transform ease 250ms;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .ver {
          display: block;
          position: absolute;
          right: 10px;
          bottom: 15px;
          padding: 10px 15px;
          color: #fff;
          text-decoration: none;
          font-size: 17px;
          cursor: pointer;
          border: solid 1px #fff;
          transition: all 0.05s linear;
          border-radius: 4px;
        }
        .ver i {
          display: none;
        }
        .destacado span {
        }
        .destacado:hover :global(img) {
          transform: scale(1.05);
        }
        .destacado:hover .ver {
          background: white;
          color: #4d4d4d;
        }
        :global(.SubHome .slick-list) {
          margin: 0px -15px;
        }
        @media screen and (max-width: 1180px) {
          .destacado {
            margin: 0px 8px;
            width: calc(100% - 16px);
          }
          :global(.SubHome .slick-list) {
            margin: 0px -7px;
          }
          :global(.SubHome .slick-dots) {
            bottom: -30px;
          }
          :global(.SubHome .slick-dots li) {
            width: 13px;
          }
          :global(.SubHome .slick-dots li button:before) {
            font-size: 13px;
          }
        }
        @media screen and (max-width: 980px) {
          .ver {
            padding: 2px;
            bottom: 10px;
          }
          .ver span {
            display: none;
          }
          .ver i {
            display: block;
          }
        }
      `}</style>
    </React.Fragment>
  );
}
