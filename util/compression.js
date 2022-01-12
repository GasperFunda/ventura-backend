function bin2String(array) {
  let result = "";
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

function string2Bin(str) {
  var result = "";
  for (var i = 0; i < str.length; i++) {
    let newStr = str.charCodeAt(i).toString(2);
    while (newStr.length < 8) newStr = "0" + newStr;
    result += newStr;
  }
  return result;
}

function stringBinary2String(data) {
  const splitted = data.match(/.{1,8}/g);
  return splitted;
}

function dec2bin(dec) {
  let bin = dec.toString(2);
  while (bin.length < 8) bin = "0" + bin;
  return bin;
}

module.exports = {
  compress: function compress(data) {
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
            binaryData += "00";
            if (Math.abs(diff) >= 1 && Math.abs(diff) <= 2) {
              binaryData += "00";
              if (diff === -2) binaryData += "00";
              else if (diff === -1) binaryData += "01";
              else if (diff === 1) binaryData += "10";
              else binaryData += "11";
            } else if (Math.abs(diff) >= 3 && Math.abs(diff) <= 6) {
              binaryData += "01";

              if (diff === -6) binaryData += "000";
              else if (diff === -5) binaryData += "001";
              else if (diff === -4) binaryData += "010";
              else if (diff === -3) binaryData += "011";
              else if (diff === 3) binaryData += "100";
              else if (diff === 4) binaryData += "101";
              else if (diff === 5) binaryData += "110";
              else binaryData += "111";
            } else if (Math.abs(diff) >= 7 && Math.abs(diff) <= 14) {
              binaryData += "10";

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
              binaryData += "11";
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
            binNum = numberOfSame.toString(2);
            while (binNum.length < 3) binNum = "0" + binNum;
            binaryData += binNum;
            numberOfSame = 0;
            i--;
          }
        }
      }
    }
    binaryData += "11";
    while (binaryData.length % 8 !== 0) binaryData += "0";
    const stringed = stringBinary2String(binaryData);
    const stringed2 = bin2String(stringed);
    return stringed2;
  },

  decompress: function decompress(data) {
    let result = data[0];
    let previous = data.charCodeAt(0);
    data = data.substring(1);
    const binData = string2Bin(data);
    let i = 0;
    while (true) {
      const controlBits = binData[i] + binData[i + 1];
      if (controlBits === "00") {
        let value;
        const numBits = binData[i + 2] + binData[i + 3];
        if (numBits === "00") {
          const diff = binData[i + 4] + binData[i + 5];
          if (diff === "00") value = String.fromCharCode(previous - 2);
          else if (diff === "01") value = String.fromCharCode(previous - 1);
          else if (diff === "10") value = String.fromCharCode(previous + 1);
          else if (diff === "11") value = String.fromCharCode(previous + 2);
          i += 6;
        } else if (numBits === "01") {
          const diff = binData[i + 4] + binData[i + 5] + binData[i + 6];
          if (diff === "000") value = String.fromCharCode(previous - 6);
          else if (diff === "001") value = String.fromCharCode(previous - 5);
          else if (diff === "010") value = String.fromCharCode(previous - 4);
          else if (diff === "011") value = String.fromCharCode(previous - 3);
          else if (diff === "100") value = String.fromCharCode(previous + 3);
          else if (diff === "101") value = String.fromCharCode(previous + 4);
          else if (diff === "110") value = String.fromCharCode(previous + 5);
          else if (diff === "111") value = String.fromCharCode(previous + 6);
          i += 7;
        } else if (numBits === "10") {
          const diff =
            binData[i + 4] + binData[i + 5] + binData[i + 6] + binData[i + 7];
          if (diff === "0000") value = String.fromCharCode(previous - 14);
          else if (diff === "0001") value = String.fromCharCode(previous - 13);
          else if (diff === "0010") value = String.fromCharCode(previous - 12);
          else if (diff === "0011") value = String.fromCharCode(previous - 11);
          else if (diff === "0100") value = String.fromCharCode(previous - 10);
          else if (diff === "0101") value = String.fromCharCode(previous - 9);
          else if (diff === "0110") value = String.fromCharCode(previous - 8);
          else if (diff === "0111") value = String.fromCharCode(previous - 7);
          else if (diff === "1000") value = String.fromCharCode(previous + 7);
          else if (diff === "1001") value = String.fromCharCode(previous + 8);
          else if (diff === "1010") value = String.fromCharCode(previous + 9);
          else if (diff === "1011") value = String.fromCharCode(previous + 10);
          else if (diff === "1100") value = String.fromCharCode(previous + 11);
          else if (diff === "1101") value = String.fromCharCode(previous + 12);
          else if (diff === "1110") value = String.fromCharCode(previous + 13);
          else if (diff === "1111") value = String.fromCharCode(previous + 14);
          i += 8;
        } else if (numBits === "11") {
          const diff =
            binData[i + 4] +
            binData[i + 5] +
            binData[i + 6] +
            binData[i + 7] +
            binData[i + 8];
          if (diff === "00000") value = String.fromCharCode(previous - 30);
          else if (diff === "00001") value = String.fromCharCode(previous - 29);
          else if (diff === "00010") value = String.fromCharCode(previous - 28);
          else if (diff === "00011") value = String.fromCharCode(previous - 27);
          else if (diff === "00100") value = String.fromCharCode(previous - 26);
          else if (diff === "00101") value = String.fromCharCode(previous - 25);
          else if (diff === "00110") value = String.fromCharCode(previous - 24);
          else if (diff === "00111") value = String.fromCharCode(previous - 23);
          else if (diff === "01000") value = String.fromCharCode(previous - 22);
          else if (diff === "01001") value = String.fromCharCode(previous - 21);
          else if (diff === "01010") value = String.fromCharCode(previous - 20);
          else if (diff === "01011") value = String.fromCharCode(previous - 19);
          else if (diff === "01100") value = String.fromCharCode(previous - 18);
          else if (diff === "01101") value = String.fromCharCode(previous - 17);
          else if (diff === "01110") value = String.fromCharCode(previous - 16);
          else if (diff === "01111") value = String.fromCharCode(previous - 15);
          else if (diff === "10000") value = String.fromCharCode(previous + 15);
          else if (diff === "10001") value = String.fromCharCode(previous + 16);
          else if (diff === "10010") value = String.fromCharCode(previous + 17);
          else if (diff === "10011") value = String.fromCharCode(previous + 18);
          else if (diff === "10100") value = String.fromCharCode(previous + 19);
          else if (diff === "10101") value = String.fromCharCode(previous + 20);
          else if (diff === "10110") value = String.fromCharCode(previous + 21);
          else if (diff === "10111") value = String.fromCharCode(previous + 22);
          else if (diff === "11000") value = String.fromCharCode(previous + 23);
          else if (diff === "11001") value = String.fromCharCode(previous + 24);
          else if (diff === "11010") value = String.fromCharCode(previous + 25);
          else if (diff === "11011") value = String.fromCharCode(previous + 26);
          else if (diff === "11100") value = String.fromCharCode(previous + 27);
          else if (diff === "11101") value = String.fromCharCode(previous + 28);
          else if (diff === "11110") value = String.fromCharCode(previous + 29);
          else if (diff === "11111") value = String.fromCharCode(previous + 30);
          i += 9;
        }
        result += value;
        previous = value.charCodeAt(0);
      } else if (controlBits === "01") {
        const diff = binData[i + 2] + binData[i + 3] + binData[i + 4];
        const numberOfReps = parseInt(diff, 2);
        for (let i = 0; i < numberOfReps; i++) {
          result += String.fromCharCode(previous);
        }
        i += 5;
      } else if (controlBits === "10") {
        const sig = binData[i + 2];
        const diff =
          binData[i + 3] +
          binData[i + 4] +
          binData[i + 5] +
          binData[i + 6] +
          binData[i + 7] +
          binData[i + 8] +
          binData[i + 9] +
          binData[i + 10];
        let value;
        if (sig === "1") {
          value = previous - parseInt(diff, 2);
        } else {
          value = previous + parseInt(diff, 2);
        }
        result += String.fromCharCode(value);
        previous = value;
        i += 11;
      } else if (controlBits === "11") {
        break;
      }
    }
    return result;
  },
};
