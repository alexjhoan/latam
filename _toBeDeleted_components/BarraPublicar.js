import BarraPublicarStyles from "../styles/components/BarraPublicar.js";
import ImagenOptimizada from "./ImagenOptimizada";

export default function BarraPublicar() {
  return (
    <React.Fragment>
      <div className="publicarAqui">
        <div className="publicarAquiIn">
          <ImagenOptimizada
            src="https://cdn2.infocasas.com.uy/web/595ff0e2e1784_infocdn__icon-casa.png"
            alt="publicar"
            minWidth={150}
          />
          <div className="publicaLeft">
            <div className="textPublicar">
              <span className="title">Publicá tu propiedad aquí</span> y llegá a
              miles de interesados
            </div>
            <a href="/publicar">
              <div className="verMasInfoPublicar">
                <span>Ver más</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{BarraPublicarStyles}</style>
    </React.Fragment>
  );
}
