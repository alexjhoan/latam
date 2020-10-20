import {gql} from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client";
import { MUTATION_LOCAL_STORE, Queries } from "../shared-components/ApolloResolvers";
import React from "react";
import {
  QUERY_BUSCADOR_PROPIEDADES,
  TYPENAME_BUSCADOR_PROPIEDADES
} from "../shared-components/ApolloResolvers/BuscadorPropiedades";

const DebugLocalCache = props => {
  const toggleAppTheme = gql`
    mutation mimutacion($newAppState: AppState!) {
      updateAppState(newAppState: $newAppState) @client
    }
  `;

  const [enfermin] = useMutation(MUTATION_LOCAL_STORE);

  const pijota = useQuery(QUERY_BUSCADOR_PROPIEDADES);
  if (pijota.loading) {
    return <span>Loading</span>;
  } else {
    return (
      <div>
        <button
          onClick={() =>
            enfermin({
              variables: {
                new_state: {
                  search:
                    pijota.data[TYPENAME_BUSCADOR_PROPIEDADES].search +
                    "oh yessss"
                },
                query: QUERY_BUSCADOR_PROPIEDADES
              }
            })
          }
        >
          ToFEFEF F SF Theme
        </button>
        JSON: {JSON.stringify(pijota.data)}
      </div>
    );
  }

  const xrxr = useQuery(getAppState);
  const [toggleTheme] = useMutation(toggleAppTheme);

  const handleToggle = () => {
    const { isDarkModeEnabled } = xrxr.data.state.appState;
    const newAppState = {
      isDarkModeEnabled: !isDarkModeEnabled,
      __typename: "AppState"
    };
    toggleTheme({ variables: { newAppState: newAppState } });
  };

  if (xrxr.loading) {
    return <span>Loading 2</span>;
  } else if (xrxr.error) {
    return <span>Error 2</span>;
  } else {
    return (
      <div>
        <button onClick={handleToggle}>Toggle Theme</button>
        {JSON.stringify(xrxr.data)}
      </div>
    );
  }
};
export default DebugLocalCache;
