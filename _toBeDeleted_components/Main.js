import { useEffect, useState } from "react";

const Main = ({ children, refInmo }) => {
  const [heightMain, setHeightMain] = useState(null);
  const setBannerHeight = () => {
    const inmoHeight =
      refInmo.current != null ? refInmo.current.clientHeight : 0;
    const windowHeight = document.documentElement.clientHeight;
    let height;
    let minHeightMain;
    if (window.innerWidth < 980) {
      minHeightMain = window.innerWidth < 680 ? 520 : 580;
      if (
        windowHeight < inmoHeight + minHeightMain + 50 &&
        windowHeight > minHeightMain
      ) {
        height = windowHeight;
      } else {
        height = windowHeight - inmoHeight;
      }
      if (height < minHeightMain + 50) height = minHeightMain + 50;
    } else {
      minHeightMain = 520;
      let heightRest = inmoHeight + 50;
      if (
        windowHeight < minHeightMain + heightRest &&
        windowHeight > minHeightMain
      ) {
        height = windowHeight - 50;
      } else {
        height = "calc(100vh - " + heightRest + "px)";
      }
    }
    setHeightMain(height);
  };
  useEffect(() => setBannerHeight(), []);

  return (
    <React.Fragment>
      <main style={{ minHeight: heightMain }}>{children}</main>
      <style jsx>{`
        main {
          width: 100%;
          background-color: #848382;
          height: 520px;
          position: relative;
          box-sizing: border-box;
          font-family: Roboto;
          transition: min-height 0.4s ease;
        }
        @media screen and (max-width: 980px) {
          main {
            height: 580px;
            display: flex;
            align-items: center;
          }
        }
        @media screen and (max-width: 680px) {
          main {
            height: 520px;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default Main;
