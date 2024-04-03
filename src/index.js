const { text, set_title, straight_line, Widget, clear_window } = require("./colors/ui.js")
const { palette } = require("./colors/colors.js")
const readline = require("readline")
const os = require("os")

let title = "ASCII-CALCULATOR"
let width = process.stdout.columns
let height = process.stdout.rows

const button_color = "646464"
const button_text_color = "ffffff"
const button_hover_color = "0015ff" 
const button_click_color = palette.ORANGE
const display_base_color = "000000"
const display_error_color = "ff0000"
const display_result_color = "009900"
const display_background_color = "00d5ff"

if(os.platform == "win32") clear_window()
process.new_window()
set_title(title)

// draw the UI
straight_line("─", 1, 1, width)
text(title, 2, 1)

const help_msg = "[PRESS CTRL+C TO QUIT]"
text(help_msg, width - help_msg.length, 1)

let calculator_display = new Widget("", 1, 2, bg=null)
calculator_display
    .set_size(width, 1)
    .set_text_color(display_base_color)
    .set_background(display_background_color)
    .draw()
straight_line("─", 1, 3, width)

let buttons = [
    [
        new Widget("("),
        new Widget(")"),
        new Widget("C"),
        new Widget("/"),
    ],
    [
        new Widget("7"),
        new Widget("8"),
        new Widget("9"),
        new Widget("*"),
    ],
    [
        new Widget("4"),
        new Widget("5"),
        new Widget("6"),
        new Widget("+"),
    ],
    [
        new Widget("1"),
        new Widget("2"),
        new Widget("3"),
        new Widget("-"),
    ],
    [
        new Widget("del"),
        new Widget("0"),
        new Widget("."),
        new Widget("="),
    ]
]

let default_x_pos = Math.floor(width / 2) - 8
let x_pos = default_x_pos
for(let i = 0;i < buttons.length;i++){
    for(let j = 0;j < buttons[i].length;j++){
        if(!buttons[i][j]) break
        buttons[i][j].set_background(button_color)
            .set_size(3, 3)
            .set_text_color(button_text_color)
            .set_position(x_pos, (i + 1) * 4)
            .draw()

        buttons[i][j].on("click", (button, calculator_display) => {
            button.set_background(button_click_color).draw()
            
            let text = calculator_display.text
            let button_text = button.text
            
            if(button_text == "C") {
                calculator_display.set_text("").draw() 
                return
            }
                
            if(button_text == "del") {
                if(text == "") return
                calculator_display.set_text(text.slice(0, -1)).draw()
                return
            }

            if(button_text == "=") {
                if(text == "") return
                try {
                    calculator_display
                        .set_text_color(display_result_color)
                        .set_text(String(eval(text)))
                        .draw()
                } catch (error) {
                    calculator_display
                        .set_text_color(display_error_color)
                        .set_text("ERROR")
                        .draw()
                        .set_text("")
                }
                
                calculator_display.set_text_color(display_base_color)
                return
            }
        
            if(text.length >= Math.floor(width - 6)) return
            calculator_display.set_text(text + button_text).draw()
        })
        x_pos += 5
    }
    x_pos = default_x_pos
}
buttons[0][0].set_background(button_hover_color).draw()

const rl = readline.createInterface({ 
    input: process.stdin,
    terminal: true 
})

let input_handler = {
    x: 0,
    y: 0,
    handle: (str, key, buttons) => {
        buttons[input_handler.y][input_handler.x].set_background(button_color).draw()

        if(key.name === "return") {
            buttons[input_handler.y][input_handler.x]
                .emit("click", buttons[input_handler.y][input_handler.x], calculator_display)
            return
        }

        if(key.name === "up") input_handler.y--
        if(key.name === "down") input_handler.y++
        if(key.name === "left") input_handler.x--
        if(key.name === "right") input_handler.x++

        if(input_handler.y < 0) input_handler.y++ 
        if(input_handler.x < 0) input_handler.x++ 
        if(input_handler.y >= buttons.length - 1) 
        input_handler.y = buttons.length - 1
        if(input_handler.x >= buttons[input_handler.y].length) 
            input_handler.x = buttons[input_handler.y].length - 1 

        buttons[input_handler.y][input_handler.x].set_background(button_hover_color).draw()
    }
}

rl.input.on("keypress", (str, key) => {
    input_handler.handle(str, key, buttons)
})