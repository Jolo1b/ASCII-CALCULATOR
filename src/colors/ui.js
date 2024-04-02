const EventEmitter = require("events")
const { palette } = require("./colors.js")

class Button extends EventEmitter {
    constructor(text, x, y, width=text.length, height=1, bg=palette.WHITE) {
        super()

        this.text = text
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    set_position(x, y) {
        this.x = x
        this.y = y
        return this
    }

    set_size(width, height) {
        this.width = width
        this.height = height
        return this
    }

    set_text(text) {
        this.text = text
        return this
    }

    draw() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++)
                process.stdout.write(`\x1b[${this.y + i};${this.x + j}H `.hex(palette.WHITE))
        }

        let text_x_position = this.x + Math.floor(this.width / 2) - Math.floor(this.text.length / 2)
        let text_y_position = this.y + Math.floor(this.height / 2)
        process.stdout.write(`\x1b[${text_y_position};${text_x_position}H${this.text}`)
    }

    on_click(callback) {
        this.on("click", callback)
        return this
    }
}


function new_window() {
    process.stdout.write("\x1b[?25l")

    process.on("exit", () => {
        process.stdout.write("\x1b[?25h")
    })
}
const set_title = (title) => process.title = title
const clear_window = () => process.stdout.write("\x1bc")
const text_label = (text, x, y) => process.stdout.write(`\x1b[${x};${y}H${text}`)

module.exports = {
    new_window,
    set_title,
    clear_window,
    text_label,
    Button
}

