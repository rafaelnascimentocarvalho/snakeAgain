export const filterRepeat = (array: Array<any>) => {
  return array.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};
