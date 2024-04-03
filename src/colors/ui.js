const EventEmitter = require("events")
const { palette } = require("./colors.js")

class Widget extends EventEmitter {
    constructor(text, x, y, 
        width=text.length, height=1, 
        bg=palette.BLUE, tc=palette.WHITE
    ) 
    {
        super()

        this.text = text
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.bg = bg
        this.tc = tc
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
        if(typeof(text) != "string") throw new Error(
            "'set_text' text must be a string")
        this.text = text
        return this
    }

    set_text_color(tc) {
        this.tc = tc
        return this
    }

    set_background(bg) {
        this.bg = bg
        return this
    }

    add_event_listener(event, callback) {
        this.on(event, callback)
        return this
    }

    draw() {
        const str_length = this.text.length

        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++)
                process.stdout.write(`\x1b[${this.y + i};${this.x + j}H `.hex(this.bg, bg=true))
        }

        let text_x_position = this.x + Math.floor(this.width / 2) - Math.floor(str_length / 2)
        let text_y_position = this.y + Math.floor(this.height / 2)
        process.stdout.write(`\x1b[${text_y_position};${text_x_position}H${this.text}`
            .hex(this.bg, bg=true)
            .hex(this.tc))

        return this
    }
}

process.new_window = () => {
    process.stdout.write("\x1b[?25l")
    process.stdout.write("\x1b[?47h")

    process.on("exit", () => {
        process.stdout.write("\x1b[?25h")
        process.stdout.write("\x1b[?47l")
    })
}

const set_title = (title) => process.title = title
const clear_window = () => process.stdout.write("\x1bc")
const text = (text, x, y) => process.stdout.write(`\x1b[${y};${x}H${text}`)
const straight_line = (ch ,x, y, length) => process.stdout.write(`\x1b[${y};${x}H${ch.repeat(length)}`)
const cursor_to = (x, y) => process.stdout.write(`\x1b[${y};${x}H`)

module.exports = {
    set_title,
    clear_window,
    text,
    straight_line,
    cursor_to,
    Widget
}

