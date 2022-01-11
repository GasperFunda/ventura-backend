function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

function string2Bin(str) {
  var result = [];
  for (var i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i).toString(2));
  }
  return result;
}

function stringBinary2String(data) {
  const splitted = data.match(/.{1,8}/g);
  console.log(splitted);
  const output = splitted
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join("");
  return output;
}

function dec2bin(dec) {
  return ("00000000" + dec.toString(2)).substring(-8);
}

function compress(data: string) {
  let binaryData = dec2bin(data.charCodeAt(0));
  let numberOfSame = 0;
  for (let i = 1; i < data.length; i++) {
    const diff = data.charCodeAt(i) - data.charCodeAt(i - 1);
    // absolutno kodiranje
    if (diff > 30) {
      binaryData += "100";
      binaryData += dec2bin(diff);
    } else if (diff < -30) {
      binaryData += "101";
      binaryData += dec2bin(Math.abs(diff));
    } else {
      let numberChanged = true;
      if (diff === 0) {
        numberOfSame++;
        numberChanged = false;
      }
      if (numberChanged) {
        if (numberOfSame === 0) {
          // kodiramo razliko
          if (Math.abs(diff) >= 1 && Math.abs(diff) <= 2) {
            if (diff === -2) binaryData += "00";
            else if (diff === -1) binaryData += "01";
            else if (diff === 1) binaryData += "10";
            else binaryData += "11";
          } else if (Math.abs(diff) >= 3 && Math.abs(diff) <= 6) {
            if (diff === -6) binaryData += "000";
            else if (diff === -5) binaryData += "001";
            else if (diff === -4) binaryData += "010";
            else if (diff === -3) binaryData += "011";
            else if (diff === 3) binaryData += "100";
            else if (diff === 4) binaryData += "101";
            else if (diff === 5) binaryData += "110";
            else binaryData += "111";
          } else if (Math.abs(diff) >= 7 && Math.abs(diff) <= 14) {
            if (diff === -14) binaryData += "0000";
            else if (diff === -13) binaryData += "0001";
            else if (diff === -12) binaryData += "0010";
            else if (diff === -11) binaryData += "0011";
            else if (diff === -10) binaryData += "0100";
            else if (diff === -9) binaryData += "0101";
            else if (diff === -8) binaryData += "0110";
            else if (diff === -7) binaryData += "0111";
            else if (diff === 7) binaryData += "1000";
            else if (diff === 8) binaryData += "1001";
            else if (diff === 9) binaryData += "1010";
            else if (diff === 10) binaryData += "1011";
            else if (diff === 11) binaryData += "1100";
            else if (diff === 12) binaryData += "1101";
            else if (diff === 13) binaryData += "1110";
            else binaryData += "1111";
          } else if (Math.abs(diff) >= 15 && Math.abs(diff) <= 30) {
            if (diff === -30) binaryData += "00000";
            else if (diff === -29) binaryData += "00001";
            else if (diff === -28) binaryData += "00010";
            else if (diff === -27) binaryData += "00011";
            else if (diff === -26) binaryData += "00100";
            else if (diff === -25) binaryData += "00101";
            else if (diff === -24) binaryData += "00110";
            else if (diff === -23) binaryData += "00111";
            else if (diff === -22) binaryData += "01000";
            else if (diff === -21) binaryData += "01001";
            else if (diff === -20) binaryData += "01010";
            else if (diff === -19) binaryData += "01011";
            else if (diff === -18) binaryData += "01100";
            else if (diff === -17) binaryData += "01101";
            else if (diff === -16) binaryData += "01110";
            else if (diff === -15) binaryData += "01111";
            else if (diff === 15) binaryData += "10000";
            else if (diff === 16) binaryData += "10001";
            else if (diff === 17) binaryData += "10010";
            else if (diff === 18) binaryData += "10011";
            else if (diff === 19) binaryData += "10100";
            else if (diff === 20) binaryData += "10101";
            else if (diff === 21) binaryData += "10110";
            else if (diff === 22) binaryData += "10111";
            else if (diff === 23) binaryData += "11000";
            else if (diff === 24) binaryData += "11001";
            else if (diff === 25) binaryData += "11010";
            else if (diff === 26) binaryData += "11011";
            else if (diff === 27) binaryData += "11100";
            else if (diff === 28) binaryData += "11101";
            else if (diff === 29) binaryData += "11110";
            else binaryData += "11111";
          }
        } else {
          // kodiramo ponovitve
          binaryData += "01";
          for (let n = 3; n > 0; n--) {
            const bit = (numberOfSame >> n) & 0x1;
            binaryData += bit;
          }
          numberOfSame = 0;
        }
      }
    }
  }
  binaryData += "11";
  while (binaryData.length % 8 !== 0) binaryData += "0";
  return data;
}

function decompress(data: string) {}
