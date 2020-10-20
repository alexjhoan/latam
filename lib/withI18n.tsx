import { useTranslation } from "react-i18next"
import "../shared-components/i18n";

export const withI18n = (PageComponent) => {
    return ({ ...pageProps }) => {

        const {i18n} = useTranslation()
        
        if(pageProps.country_id == 40 && false) //@todo - change to brazil id and remove hardcoded false
            i18n.changeLanguage('pt')

        return <PageComponent {...pageProps} />;
    }
}