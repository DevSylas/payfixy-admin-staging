export const searchArrayOfObjects = (array = [], searchString) => {
  if (!searchString) return array;

  const lowerCaseSearchString = searchString.toLowerCase();

  const searchValue = (value) => {
    if (value == null) return false;

    switch (typeof value) {
      case "string":
      case "number":
      case "boolean":
        return value.toString().toLowerCase().includes(lowerCaseSearchString);

      case "object":
        if (Array.isArray(value)) {
          return value.some(searchValue);
        } else {
          return Object.values(value).some(searchValue);
        }
    }
  };

  return array.filter((obj) =>
    obj ? Object.values(obj).some(searchValue) : false
  );
};
