import Image from 'next/image';

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
    return (
        <div style={imageStyles}>
            {/* Using Next.js Image component for better performance and automatic resizing */}
            <Image src={url} alt={caption} layout="responsive" width={700} height={394} />
            <p>{caption}</p>
        </div>
    );
};

export default simpleImage;
