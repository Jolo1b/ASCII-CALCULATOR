const { text, set_title, straight_line, Widget, clear_window } = require("./colors/ui.js")
const { palette } = require("./colors/colors.js")
const readline = require("readline")

let title = "ASCII-CALCULATOR"
let width = process.stdout.columns
let height = process.stdout.rows

process.new_window()
clear_window()
set_title(title)

// draw the UI
straight_line("─", 1, 1, width)
text(title, 2, 1)

const help_msg = "[PRESS CTRL+C TO QUIT]"
text(help_msg, width - help_msg.length, 1)

let calculator_display = new Widget("", 1, 2, bg=null)
calculator_display.set_size(width, 1)  
calculator_display.draw()
straight_line("─", 1, 3, width)

let buttons = [
    [
    new Widget("7"),
    new Widget("8"),
    new Widget("9"),
    new Widget("+"),
    ],
    [
    new Widget("4"),
    new Widget("5"),
    new Widget("6"),
    new Widget("-"),
    ],
    [
    new Widget("1"),
    new Widget("2"),
    new Widget("3"),
    new Widget("*"),
    ],
    [
    new Widget("C"),
    new Widget("0"),
    new Widget("="),
    new Widget("del"),
    ]
]

let x_pos = 1
for(let i = 0;i < buttons.length;i++){
    for(let j = 0;j < buttons[i].length;j++){
        if(!buttons[i][j]) break
        buttons[i][j].set_background(palette.GREEN)
            .set_size(3, 3)
            .set_text_color(palette.BLACK)
            .set_position(x_pos, (i + 1) * 4)
            .draw()

        buttons[i][j].on("click", (button, calculator_display) => {
            button.set_background(palette.ORANGE).draw()
            
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
        
            calculator_display.set_text(text + button_text).draw()
        })
        x_pos += 5
    }
    x_pos = 1
}
buttons[0][0].set_background(palette.RED).draw()

const rl = readline.createInterface({ 
    input: process.stdin,
    terminal: true 
})

let input_handler = {
    x: 0,
    y: 0,
    handle: (str, key, buttons) => {
        buttons[input_handler.y][input_handler.x].set_background(palette.GREEN).draw()

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

        buttons[input_handler.y][input_handler.x].set_background(palette.RED).draw()
    }
}

rl.input.on("keypress", (str, key) => {
    input_handler.handle(str, key, buttons)
})