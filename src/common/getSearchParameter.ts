export const getSearchParameter = (paramName: string): string | null => {
  const searchString = window.location.search.substring(1);
  let parameter: string | null = null;
  const params = searchString.split('&');

  params.forEach(item => {
    const itemArray = item.split('=');

    if (itemArray[0] === paramName) {
      parameter = itemArray[1]; // eslint-disable-line
    }
  });

  return parameter;
};
