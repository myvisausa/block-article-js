
const simpleImage = ({ block }) => {
    console.log('block', block)
    const { url, caption, withBorder, withBackground, stretched } = block;

    // Style based on the image properties
    const imageStyles = {
        border: withBorder ? '2px solid black' : 'none',
        backgroundColor: withBackground ? '#f7f7f7' : 'transparent',
        width: stretched ? '100%' : 'auto',
        margin: stretched ? '0' : 'auto'
    };

    return `<img src="${
        url
      }" alt="${caption}" />`;
};

export default simpleImage;
