datalogger.onLogFull(function () {
    Logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    Logging = true
    basic.showIcon(IconNames.Yes)
})
input.onSound(DetectedSound.Loud, function () {
    basic.showNumber(input.magneticForce(Dimension.X))
})
input.onButtonPressed(Button.AB, function () {
    Logging = false
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "Temperature",
    "Light"
    )
})
input.onButtonPressed(Button.B, function () {
    Logging = false
    basic.showIcon(IconNames.No)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(input.temperature())
})
let Logging = false
Logging = false
basic.showIcon(IconNames.No)
datalogger.setColumnTitles(
"Temperature",
"Light"
)
loops.everyInterval(60000, function () {
    if (Logging) {
        basic.showIcon(IconNames.Heart)
        datalogger.log(
        datalogger.createCV("Temperature", input.temperature()),
        datalogger.createCV("Light", input.lightLevel())
        )
        basic.clearScreen()
    }
})
basic.forever(function () {
    if (input.magneticForce(Dimension.X) < 100) {
        basic.showIcon(IconNames.Surprised)
        music.play(music.stringPlayable("- - - - - - - - ", 120), music.PlaybackMode.UntilDone)
    }
})
