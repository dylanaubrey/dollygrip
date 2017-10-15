/**
 *
 * @param {Object} obj
 * @param {number} obj.gender
 * @return {string}
 */
export default function resolveGender(obj) {
  let gender;

  switch (obj.gender) {
    case 0:
      gender = 'Not given';
      break;
    case 1:
      gender = 'Female';
      break;
    case 2:
      gender = 'Male';
      break;
    default:
      // no default
  }

  return gender;
}
