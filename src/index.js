const { text, set_title, straight_line, Widget } = require("./colors/ui.js")
const { palette } = require("./colors/colors.js")

process.new_window()
set_title("ASCII-CALCULATOR")

let width = process.stdout.columns
let height = process.stdout.rows
let center_x = Math.floor(width / 2)

straight_line("─", 1, 1, width)
let input_box = new Widget("", 1, 2, bg=null)
    .set_size(width - 2, 1)
    .draw()
straight_line("─", 1, 1, width)




process.stdin.on("data", (data) => {
    process.exit()
})
