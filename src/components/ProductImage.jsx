import React from 'react';

export const ProductImage = ({ name, size = '100%' }) => {
  const style = {
    width: size,
    height: size,
    maxWidth: '300px',
    maxHeight: '300px',
    objectFit: 'contain',
    borderRadius: '8px'
  };

  // Map product names/categories to sample images
  const getImageUrl = () => {
    const lowerName = (name || '').toLowerCase();
    if (lowerName.includes('baby') || lowerName.includes('rattle') || lowerName.includes('walker') || lowerName.includes('teether')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=colorful%20baby%20toys%20rattles%20teethers%20soft%20pastel%20colors%20safe%20for%20baby&image_size=square';
    } else if (lowerName.includes('car') || lowerName.includes('truck')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=bright%20colorful%20kids%20toy%20cars%20trucks%20racing%20red%20blue%20green%20yellow&image_size=square';
    } else if (lowerName.includes('bike') || lowerName.includes('tricycle')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=kids%20balance%20bike%20tricycle%20colorful%20toys&image_size=square';
    } else if (lowerName.includes('plush') || lowerName.includes('soft') || lowerName.includes('stuffed')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=cute%20soft%20plush%20stuffed%20animal%20teddy%20bunny%20colorful&image_size=square';
    } else if (lowerName.includes('puzzle') || lowerName.includes('brain')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=kids%20educational%203d%20puzzle%20brain%20games%20wooden%20toys&image_size=square';
    } else if (lowerName.includes('card') || lowerName.includes('trivia')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=colorful%20kids%20memory%20playing%20trivia%20cards&image_size=square';
    } else if (lowerName.includes('purse') || lowerName.includes('fancy')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=fancy%20kids%20purse%20handbag%20colorful%20sparkly%20for%20girls%20toy&image_size=square';
    } else if (lowerName.includes('keychain') || lowerName.includes('key')) {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=cute%20colorful%20keychains%20kids%20toy%20keychain&image_size=square';
    } else {
      return 'https://coresg-normal.trae.ai/api/v1/text-to-image?prompt=premium%20kids%20colorful%20toy%20shop%20golden%20toys&image_size=square';
    }
  };

  return <img src={getImageUrl()} alt={name} style={style} />;
};
