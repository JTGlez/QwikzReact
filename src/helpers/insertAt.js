const insertAt = (array, index, element) => {

    const leftSlice = array.slice(0, index);
    const rightSlice = array.slice(index + 1, array.length);

    return [...leftSlice, element, ...rightSlice];

} 

export default insertAt;