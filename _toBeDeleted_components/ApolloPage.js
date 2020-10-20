import React from "react";
import { ApolloSingleton } from "../lib/apollo";

class ApolloPage extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        ApolloSingleton.getInstance().FIRST_LOAD_HAS_HAPPEN = true;
        ApolloSingleton.getInstance().COMMIT_NOT_YET_PERSISTED_CACHE_CHANGES();
    }
}


export default ApolloPage;
