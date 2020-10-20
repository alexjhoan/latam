import NuestrasOficinasStyles from "../styles/components/NuestrasOficinas.js";
import {gql} from "@apollo/client";
import { useQuery } from "react-apollo";
import Loader from "./Loader";
import { handleApolloError } from "../lib/apollo";
import ImagenOptimizada from "./ImagenOptimizada";

const OFICINAS_QUERY = gql`
  query Oficinas {
    countries {
      id
      name
      data {
        information_email
        phone
        country_office_img
      }
    }
  }
`;
const acceptedCountries = [1, 2, 4, 5]; // array de ids de los paises que se muestra la info

export default function NuestrasOficinas() {
  const { data, loading, error } = useQuery(OFICINAS_QUERY);

  if (error) {
    if (handleApolloError(error)) return null;
  }
  if (loading)
    return (
      <div style={{ padding: "40px 0px" }}>
        <Loader height="30px" width="30px" />
      </div>
    );

  return (
    <React.Fragment>
      <div className="NuestrasOficinas">
        <div className="layout-container">
          <h2>Oficinas</h2>
          <div className="office-container">
            {data.countries.map(function(item, i) {
              if (acceptedCountries.indexOf(Number(item.id)) >= 0) {
                return (
                  <div
                    className={"office " + item.name.toLowerCase()}
                    key={"oficina_" + item.name}
                  >
                    <div className="text">
                      <h3>{item.name}</h3>
                      {typeof item.data.phone != "undefind" &&
                        item.data.phone != null && (
                          <div className="dato phone">
                            <i className="icon-phone"></i>
                            <span>Tel: {item.data.phone}</span>
                          </div>
                        )}
                      {typeof item.data.information_email != "undefind" &&
                        item.data.information_email != null && (
                          <div className="dato email">
                            <i className="icon-mail-alt"></i>
                            <span>{item.data.information_email}</span>
                          </div>
                        )}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
      <style jsx>{NuestrasOficinasStyles}</style>
    </React.Fragment>
  );
}
