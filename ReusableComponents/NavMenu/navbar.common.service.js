var storedActiveTitle = undefined;

const checkService = () => {
    console.log('hell world service works');
}
const setActiveTitle = (title) => {
    storedActiveTitle = title;
}
const getActiveTitle = () => {
    return storedActiveTitle;
}
export const navBarBottomCommonService = {
    checkService: checkService,
    setActiveTitle: setActiveTitle,
    getActiveTitle: getActiveTitle
}