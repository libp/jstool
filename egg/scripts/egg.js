var Egg = {
    name: "EggTimer",
    defaultText: "",
    expiredMessage: "",
    title: "",
    label: "",
    progress: 0,
    startTime: 0,
    endTime: 0,
    totalTime: 0,
    parseError: "",
    progressBar: null,
    progressText: null,
    staticArea: null,
    beep: null,
    currDate: null,
    endDate: null,
    ticker: null,
    startButton: null,
    volume: 1,
    canAlert: true,
    start: function() {
        if (Egg.parseError !== "" && Egg.parseError !== "none") {
            Egg.progressText.html(Egg.defaultText);
            Egg.updateText(Egg.defaultText);
            return;
        }
        Egg.initializeTimer(Egg.startTime, Egg.endTime, Egg.label);
    },
    initializeTimer : function(startTime, endTime, label) {
        console.log(new Date())
        Egg.endTime = endTime;
        Egg.startTime = startTime;
        Egg.label = label;
        Egg.totalTime = Egg.endTime - Egg.startTime;
        console.log(Egg.totalTime)
        Egg.endDate = new Date(new Date().getTime() + Egg.totalTime);
        console.log((Egg.endDate).getTime())
        Egg.currDate = new Date();
        Egg.expiredMessage = Egg.expiredMessage || "Time Expired" + (label ? ": " : "!") + label;
        Egg.update();
        if (!Egg.ticker) {
            Egg.ticker = setInterval(Egg.update, 1000 / 4);
        }
    },
    update: function(){
        Time.calcTime(Egg.currDate.getTime(), Egg.endDate.getTime());
        Egg.updateParts(Time);
    },
    updateParts: function(Time) {
        if (Time.totalSeconds < 0) {
            Egg.onTimeComplete();
            return;
        }
        var clockTime = [];
        var yearText,
        monthText,
        dayText,
        hourText,
        minText,
        secText;

        yearText = 
        monthText = 
        dayText = 
        hourText = 
        minText = 
        secText = "";

        if (Time.remainingYears > 0) {
            clockTime.push(padTimeText(Time.remainingYears) + "y");
            yearText = getTimeText(Time.remainingYears, "year");
        }

        if (Time.remainingMonths > 0) {
            clockTime.push(padTimeText(Time.remainingMonths) + "m");
            monthText = getTimeText(Time.remainingMonths, "month");
        }

        if (Time.remainingDays > 0) {
            clockTime.push(padTimeText(Time.remainingDays) + "d");
            dayText = getTimeText(Time.remainingDays, "day");
        }

        if (Time.remainingHours > 0) {
            clockTime.push(padTimeText(Time.remainingHours) + "h");
            hourText = getTimeText(Time.remainingHours, "hour");
        }

        if (Time.remainingMinutes > 0) {
            clockTime.push(padTimeText(Time.remainingMinutes));
            minText = getTimeText(Time.remainingMinutes, "minute");
        } else {
            clockTime.push(padTimeText(0));
        }

        if (Time.remainingSeconds > 0) {
            clockTime.push(padTimeText(Time.remainingSeconds));
            secText = getTimeText(Time.remainingSeconds, "second");
        } else {
            clockTime.push(padTimeText(0));
        }

        var slabel = (Egg.label && Egg.label != "") ? Egg.label + "<br />" : "";
        var timeText = slabel + yearText + monthText + 
            dayText + hourText + minText + secText;

        Egg.updateTitle(clockTime.join(":") + (Egg.label && Egg.label !== "" ? " : " + Egg.label : ""));
        Egg.updateText(timeText);

        Egg.progress = ((Egg.totalTime - Time.totalMilliseconds) / Egg.totalTime);
        Egg.updateProgressBar();

        Egg.currDate = new Date();
    },
    updateTitle : function (title) {
        document.title = title + " - E.ggtimer";
    },
    updateProgressBar : function () {
        var wWidth = $(window).width();
        var wHeight = $(window).height();
        if (Egg.progressBar) {
            Egg.progressBar.width(wWidth * Egg.progress);
        }
    },
    updateText : function (text) {
        if (text) Egg.progressText.html(text)
    },
    onTimeComplete: function () {
        var beepFinishedPromise = null;
        Egg.progress = 1;
        Egg.updateProgressBar();

        if (Egg.beep && Egg.beep.play) {
            Egg.beep.volume = Egg.volume;
            beepFinishedPromise = Egg.beep.play();
        }
        console.log(beepFinishedPromise)
        clearInterval(Egg.ticker);
        Egg.updateTitle(Egg.expiredMessage);
        Egg.updateText(Egg.expiredMessage);
        if (beepFinishedPromise && (typeof beepFinishedPromise.then === 'function')) {
            beepFinishedPromise.then(Egg.showAlert);
        } else {
            Egg.showAlert();
        }
    },
    showAlert:function () {
        if (Egg.canAlert) {
            alert(Egg.expiredMessage);
        }
    }

};
function getSModifier(value) {
    var mod;
    if (value == 0) {
        mod = "";
    }
    else if (value == 1) {
        mod = " ";
    }
    else {
        mod = "s ";
    }

    return mod;
}

function padTimeText(value) {
    return value < 10 ? '0' + value : '' + value;
}

function getTimeText(time, label) {
    var timeText = "";
    if (time > 0) {
        timeText = time + " " + label + getSModifier(time);
    }
    return timeText;
}

// Dom is ready
$(function(){
    Egg.progressBar = $("#progress");
	Egg.progress = $("#progress");
    Egg.staticArea = $('#static');
    Egg.staticArea.width($(window).width() - 20);
    Egg.staticArea.height($(window).height() - 20);
    Egg.progressText = $("#progressText");
    Egg.startButton = $("#progressText");
    Egg.updateText("");
    Egg.beep = document.getElementById("beepbeep");
    $(window).bind("resize", window_RESIZE)
    if (Egg.beep && Egg.beep.load) {
        Egg.beep.load();
    }
    $("button").click(function(){
        Egg.startTime = (new Date()).getTime();
        var duration = $("#start_a_timer").val() * 1000
        Egg.endTime = Egg.startTime + duration
        $('#timer').hide();
        Egg.start();
    });

})

//Window Resize
function window_RESIZE(e){
    //Move stuff around
    Egg.staticArea.width($(window).width() - 20);
    Egg.staticArea.height($(window).height() - 20);
    Egg.updateText();
    Egg.updateProgressBar();
}