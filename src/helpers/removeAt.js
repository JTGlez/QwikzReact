const removeAt = (array, index) => {

    const leftSlice = array.slice(0, index);
    const rightSlice = array.slice(index + 1, array.length);

    return [...leftSlice, ...rightSlice];

} 

export default removeAt;