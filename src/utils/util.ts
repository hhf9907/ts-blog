export function randomCode(length: number) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var result = ""; //统一改名: alt + shift + R
  for (var i = 0; i < length; i++) {
    var index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }
  return result;
}