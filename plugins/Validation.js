function valLength(data, limit, req = false) {
  return req ? data.length > limit || data.length === 0 : data.length > limit;
}

function valNumber(data, limit, more, req) {
  if(req && String(data) === '') return true;
  if(!req && String(data) === '') return false;
  if(String(data).search(/(\D)/g) !== -1) return true;
  return more ? +data > limit : +data < limit || +data > new Date().getFullYear();
}

function valDate(data) {
  return new Date(data).getTime() < new Date('1800-01-01').getTime();
}

function generalCheckErrors(arr) {
  let result = true;
  arr.forEach(el => el.error ? result = false : null);
  return result;
}

export default { valLength, valNumber, valDate, generalCheckErrors };
