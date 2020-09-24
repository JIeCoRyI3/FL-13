export const rate = (stars, index) => ({
    type: 'RATE',
    payload: {
        index,
        stars
    }
});
