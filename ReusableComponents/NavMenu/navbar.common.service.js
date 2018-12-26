var storedActiveMenuParam = undefined;

const checkService = () => {
    console.log('hello world navbar service works');
}
const setActiveMenuParam = (title) => {
    storedActiveMenuParam = title;
}
const getActiveMenuParams = () => {
    return storedActiveMenuParam;
}
export const navCommonService = {
    checkService: checkService,
    setActiveMenuParam: setActiveMenuParam,
    getActiveMenuParams: getActiveMenuParams
}