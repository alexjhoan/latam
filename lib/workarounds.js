/**
 * en modo production, al ir para atras/adelante no hace SSR ni tampoco carga lo que está en el cache
 * haciendo que el sitio ande inconsistente (EJ: no recuerda la últiam oepracion del buscador que puse,
 * o a veces no me deja hacer click en las banderitas de abajo).
 *
 * el fix es para forzar un recargue de pagina si se llego "yendo" a la pagina de atras/adelante.
 * @returns {*}
 */
export const workaround_001_BackForward = () => {

    const script =`
    if (typeof window !== "undefined" && typeof performance !== "undefined" && typeof performance.getEntriesByType !== "undefined") {
        const _a = performance.getEntriesByType("navigation");
        if (typeof _a !== "undefined" && typeof _a[0] !== "undefined" && typeof _a[0]["type"] !== "undefined") {
            const _b = _a[0]["type"];
            if (_b === "back_forward") {
                console.warn("FIRING workaround: 001_BackForward");
                location.reload();
            }
        } else if (typeof performance.navigation !== "undefined" && typeof performance.navigation.type !== "undefined" && performance.navigation.type == 2) {
            console.warn("FIRING workaround: 001_BackForward");
            location.reload();
        }
    }
    `;
    return (<script
        id={"workaround_001_BackForward"}
        dangerouslySetInnerHTML={{__html:script}}
    />)

};