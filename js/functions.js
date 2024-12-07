var checkLength = function(string) {
  var normalizerString =  string.replaceAll(' ', '').toLowerCase();
  var voidString = "";
  for (let i = normalizerString.length - 1; i >= 0; i--) {
    voidString += normalizerString[i];
  };
  return normalizerString === voidString;
};
