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
    if (hour < 23) {
        hour += 1
    } else {
        hour = 0
    }
    basic.showIcon(IconNames.Yes)
})
input.onSound(DetectedSound.Loud, function () {
    basic.showNumber(input.temperature())
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
    if (minute < 59) {
        minute += 1
    } else {
        minute = 0
    }
    basic.showIcon(IconNames.No)
})
input.onGesture(Gesture.Shake, function () {
    music.ringTone(262)
})
input.onSound(DetectedSound.Quiet, function () {
    time = "" + hour + (":" + minute)
    basic.showString(time)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(input.magneticForce(Dimension.X))
})
let hour = 0
let minute = 0
let time = ""
let Logging = false
Logging = false
let ampm = false
time = ""
let adjust = 0
minute = 0
hour = 0
datalogger.setColumnTitles(
"Temperature",
"Light"
)
time = "" + time + ":"
if (minute < 10) {
    time = "" + time + "0"
}
time = "" + time + minute
basic.showString(time)
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
    basic.pause(60000)
    if (minute < 59) {
        minute += 1
    } else {
        minute = 0
        if (hour < 23) {
            hour += 1
        } else {
            hour = 0
        }
    }
    if (input.magneticForce(Dimension.X) < 100) {
        music.play(music.stringPlayable("- - - - - - - - ", 120), music.PlaybackMode.UntilDone)
    }
})
