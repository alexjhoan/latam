import getConfig from 'next/config'
const NODE_ENV = getConfig().publicRuntimeConfig.NODE_ENV;
const canDebug = NODE_ENV !== "production";

class Console {

    log(x) {
        if(!canDebug) return;
        console.log(x);
    }

    info(x) {
        if(!canDebug) return;
        console.info(x);
    }

    warn(x) {
        if(!canDebug) return;
        console.warn(x)
    }

    error(x) {
        if(!canDebug) return;
        console.error(x)
    }

    groupCollapsed(x) {
        if(!canDebug) return;
        console.groupCollapsed(x);
    }

    group(x) {
        if(!canDebug) return;
        console.group(x);
    }

    groupEnd() {
        if(!canDebug) return;
        console.groupEnd();
    }
    time(x) {
        if(!canDebug) return;
        console.time(x);
    }
    timeEnd(x) {
        if(!canDebug) return;
        console.timeEnd(x);
    }
}

export default new Console();