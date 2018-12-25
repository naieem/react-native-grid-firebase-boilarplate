var storedActiveTitle = undefined;

export const checkService = () => {
    console.log('hell world service works');
}
export const setActiveTitle = (title) => {
    storedActiveTitle = title;
}
export const getActiveTitle = () => {
    return storedActiveTitle;
}
export default CommonService = {
    checkService: checkService,
    setActiveTitle: setActiveTitle,
    getActiveTitle: getActiveTitle
}