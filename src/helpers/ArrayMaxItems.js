import { ArrayOfPrimitivesFunctions } from 'sanity'

function ArrayFunctions(props) {
  const valRules = props?.schemaType?.validation?.[0]?._rules || []
  const max = valRules.find((r) => r.flag === 'max')?.constraint
  const total = props?.value?.length || 0
  if (!isNaN(max) && total >= max) return null
  return <ArrayOfPrimitivesFunctions {...props} />
}

export const getTotalTextLength = (textData) => {
  return textData?.reduce((total, block) => {
    return total + block.children.reduce((blockTotal, child) => {
      return blockTotal + (child.text ? child.text.length : 0);
    }, 0);
  }, 0);
};

// Utility function to truncate text
export const flattenText = (textData) => {
  return textData?.reduce((flatText, block) => {
    return flatText + block.children.reduce((blockText, child) => {
      return blockText + (child.text ? child.text : '');
    }, '');
  }, '');
};

export const truncateText = (textData, limit) => {
  let totalLength = 0;
  const truncatedData = [];

  for (let i = 0; i < textData?.length; i++) {
    const block = textData[i];
    const truncatedBlock = { ...block, children: [] };

    for (let j = 0; j < block.children.length; j++) {
      const child = block.children[j];
      const remainingLength = limit - totalLength;

      if (child.text.length > remainingLength) {
        truncatedBlock.children.push({
          ...child,
          text: child.text.slice(0, remainingLength) + '...',
        });
        totalLength += remainingLength;
        break;
      } else {
        truncatedBlock.children.push(child);
        totalLength += child.text.length;
      }

      if (totalLength >= limit) {
        break;
      }
    }

    truncatedData.push(truncatedBlock);

    if (totalLength >= limit) {
      break;
    }
  }

  return truncatedData;
};

export default function ArrayMaxItems(props) {
  return props.renderDefault({ ...props, arrayFunctions: ArrayFunctions })
}