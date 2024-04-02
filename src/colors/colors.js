const palette = {
    BLACK: "000000",
    WHITE: "ffffff",
    RED: "ff0000",
    GREEN: "00ff00",
    BLUE: "0000ff",
    YELLOW: "ffff00",
    MAGENTA: "ff00ff",
    CYAN: "00ffff",
    ORANGE: "ffa500",
    PURPLE: "800080",
    PINK: "ffc0cb",
    BROWN: "a52a2a",
    GRAY: "808080",
    LIGHT_GRAY: "d3d3d3",
    DARK_GRAY: "a9a9a9",
    LIGHT_BLUE: "add8e6",
    LIGHT_GREEN: "90ee90",
    LIGHT_CYAN: "e0ffff",
    LIGHT_RED: "ffa07a",
    LIGHT_MAGENTA: "ffa0ea",
    LIGHT_PURPLE: "dda0dd",
    LIGHT_BROWN: "cdba96",
    LIGHT_ORANGE: "ffdead",
    LIGHT_YELLOW: "ffffe0",
    LIGHT_PINK: "ffc0cb",
    LIGHT_GRAY: "e0e0e0",
    DARK_BLUE: "0000a0",
    DARK_GREEN: "006400",
    DARK_CYAN: "008b8b",
    DARK_RED: "8b0000",
    DARK_MAGENTA: "8b008b",
    DARK_PURPLE: "8b008b",
    DARK_BROWN: "a9a9a9",
    DARK_ORANGE: "a9a9a9",
    DARK_YELLOW: "a9a9a9",
    DARK_PINK: "a9a9a9",
    DARK_GRAY: "a9a9a9"
}


String.prototype.rgb = function(r, g, b, bg=false) { 
    let id
 
    if (bg) id = "48"
    else id = "38"

    if(this.substring(this.length - 4) === "\x1b[0m") 
        return `\x1b[${id};2;${r};${g};${b}m${this}`
    return `\x1b[${id};2;${r};${g};${b}m${this}\x1b[0m`
}

String.prototype.hex = function(hex, bg=false) {
    if(hex === null) return
    let split_hex = hex.match(/.{1,2}/g)
    let r = parseInt(split_hex[0], 16)
    let g = parseInt(split_hex[1], 16)
    let b = parseInt(split_hex[2], 16)

    return this.rgb(r, g, b, bg=bg)
}

String.prototype._underline = function() {
    return `\x1b[4m${this}\x1b[0m`
}

String.prototype._bold = function() {
    return `\x1b[1m${this}\x1b[0m`
}

String.prototype._italic = function() {
    return `\x1b[3m${this}\x1b[0m`
}

module.exports = { palette }
