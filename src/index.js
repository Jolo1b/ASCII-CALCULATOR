const { text, set_title, new_window, Widget } = require("./colors/ui.js")
const { palette } = require("./colors/colors.js")

set_title("ASCII-CALCULATOR")
text("Hello There", 1, 1)


const button = new Widget("Click Me", 1, 3, bg=palette.BLUE)
button.set_size(20, 3)
button.draw()
button.on("click", () => {
    button.set_text("Clicked")
    button.draw()
})


process.stdin.on("data", (data) => {
    button.emit("click")
    process.exit()
})
