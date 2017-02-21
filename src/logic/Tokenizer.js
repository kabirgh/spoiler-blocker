"use strict";

const TokenType = {
	OPEN_PAREN: "OPEN_PAREN",
	CLOSE_PAREN: "CLOSE_PAREN",
	BINARY_OP: "BINARY_OP",
	EXPR: "EXPR"
};

const tokenDict = {
	"(": [TokenType.OPEN_PAREN, "("],
	")": [TokenType.CLOSE_PAREN, ")"],
	"&": [TokenType.BINARY_OP, "AND"],
	",": [TokenType.BINARY_OP, "OR"],
	"|": [TokenType.BINARY_OP, "OR"]
};

function tokenize(string) {
	let tokenArr = [];
	let i = 0;
	let char = "", expr = "";

	while (i < string.length) {
		char = string.charAt(i);

		if (char in tokenDict) {
			tokenArr.push(tokenDict[char]);
			i += 1;
		}
		else {
			expr = "";

			while (!(char in tokenDict) && i < string.length) {
				expr += char;
				
				i += 1;
				char = string.charAt(i);
			}

			tokenArr.push([TokenType.EXPR, expr.trim()]);
		}
	}

	return tokenArr;
}

