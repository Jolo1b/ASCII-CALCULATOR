const { text, set_title, straight_line, Widget, clear_window } = require("./colors/ui.js")
const { palette } = require("./colors/colors.js")
const readline = require("readline")

clear_window()
set_title("ASCII─CALCULATOR")

let width = process.stdout.columns
let height = process.stdout.rows

// draw the UI
straight_line("─", 1, 1, width)
text("ASCII-CALCULATOR", 2, 1)
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
            .set_position(x_pos, (i + 1) * 4)
            .draw()

        buttons[i][j].on("click", (button, calculator_display) => {
            button.set_background(palette.ORANGE).draw()
            setTimeout(() => button.set_background(palette.GREEN).draw(), 100)
            
            let text = calculator_display.text
            let button_text = button.text
            if(text.length >= width - 2 && button_text != "del" | "=" ) return
            
            if(button_text == "C") {
                calculator_display.set_text("").draw() 
                return
            }
                
            if(button_text == "del") {
                calculator_display.set_text(text.pop()).draw()
                return
            }
        })
        x_pos += 5
    }
    x_pos = 1
}

const rl = readline.createInterface({ 
    input: process.stdin,
    terminal: true 
})

rl.input.on("keypress", (str, key) => {
    buttons[0][3].emit("click", buttons[0][3], calculator_display)
})