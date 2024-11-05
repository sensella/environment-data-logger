datalogger.onLogFull(function on_log_full() {
    
    Logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    Logging = true
    if (hour < 23) {
        hour += 1
    } else {
        hour = 0
    }
    
    basic.showIcon(IconNames.Yes)
})
input.onSound(DetectedSound.Loud, function on_sound_loud() {
    basic.showNumber(input.magneticForce(Dimension.X))
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    Logging = false
    basic.showIcon(IconNames.Skull)
    datalogger.deleteLog()
    datalogger.setColumnTitles("Temperature", "Light")
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    Logging = false
    if (minute < 59) {
        minute += 1
    } else {
        minute = 0
    }
    
    basic.showIcon(IconNames.No)
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    
})
input.onLogoEvent(TouchButtonEvent.Pressed, function on_logo_pressed() {
    basic.showNumber(input.temperature())
})
let hour = 0
let minute = 0
let Logging = false
Logging = false
let ampm = false
let time = ""
let adjust = 0
minute = 0
hour = 0
datalogger.setColumnTitles("Temperature", "Light")
time = "" + time + ":"
if (minute < 10) {
    time = "" + time + "0"
}

time = "" + time + ("" + minute)
basic.showString(time)
loops.everyInterval(60000, function on_every_interval() {
    if (Logging) {
        basic.showIcon(IconNames.Heart)
        datalogger.log(datalogger.createCV("Temperature", input.temperature()), datalogger.createCV("Light", input.lightLevel()))
        basic.clearScreen()
    }
    
})
basic.forever(function on_forever() {
    
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
