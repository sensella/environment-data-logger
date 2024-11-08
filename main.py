def on_log_full():
    global Logging
    Logging = False
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
datalogger.on_log_full(on_log_full)

def on_button_pressed_a():
    global Logging, hour
    Logging = True
    if hour < 23:
        hour += 1
    else:
        hour = 0
    basic.show_icon(IconNames.YES)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_sound_loud():
    global time
    time = "" + str(hour) + (":" + str(minute))
    basic.show_string(time)
input.on_sound(DetectedSound.LOUD, on_sound_loud)

def on_button_pressed_ab():
    global Logging
    Logging = False
    basic.show_icon(IconNames.SKULL)
    datalogger.delete_log()
    datalogger.set_column_titles("Temperature", "Light")
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global Logging, minute
    Logging = False
    if minute < 59:
        minute += 1
    else:
        minute = 0
    basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_shake():
    basic.show_number(input.magnetic_force(Dimension.X))
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def on_logo_pressed():
    basic.show_number(input.temperature())
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

hour = 0
minute = 0
time = ""
Logging = False
Logging = False
ampm = False
time = ""
adjust = 0
minute = 0
hour = 0
datalogger.set_column_titles("Temperature", "Light")
time = "" + time + ":"
if minute < 10:
    time = "" + time + "0"
time = "" + time + str(minute)
basic.show_string(time)

def on_every_interval():
    if Logging:
        basic.show_icon(IconNames.HEART)
        datalogger.log(datalogger.create_cv("Temperature", input.temperature()),
            datalogger.create_cv("Light", input.light_level()))
        basic.clear_screen()
loops.every_interval(60000, on_every_interval)

def on_forever():
    global minute, hour
    basic.pause(60000)
    if minute < 59:
        minute += 1
    else:
        minute = 0
        if hour < 23:
            hour += 1
        else:
            hour = 0
    if input.magnetic_force(Dimension.X) < 100:
        music.play(music.string_playable("- - - - - - - - ", 120),
            music.PlaybackMode.UNTIL_DONE)
basic.forever(on_forever)
