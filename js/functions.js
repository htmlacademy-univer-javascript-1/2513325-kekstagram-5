let checkLength = function(string) {
  let normalizerString =  string.replaceAll(' ', '').toLowerCase();
  let voidString = "";
  for (let i = normalizerString.length - 1; i >= 0; i--) {
    voidString += normalizerString[i];
  }
  return normalizerString === voidString;
}
