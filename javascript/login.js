const input = document.querySelectorAll(".number-otp");
const inputField = document.querySelector(".otp-code");
const submitButton = document.getElementById("submit");
const hamburger = document.querySelector('.hamburger-menue');

let inputCount = 0,
    finalInput = "";
hamburger.addEventListener("click", function () {
    if (document.querySelector('.navigation').style.display == "none")
        document.querySelector('.navigation').style.display = "flex";
    else
        document.querySelector('.navigation').style.display = "none";
});

document.querySelector('.login').addEventListener("click", function () {
    document.querySelector('.popup').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});

document.querySelector('.createuser').addEventListener("click", function () {
    document.querySelector('.password-input').style.display = "none";
    document.querySelector('.btn-login').innerHTML = "دریافت کد فعالسازی";
    document.getElementById("creatlink").style.display = "none";
    document.getElementById("loginORcreat").innerHTML = "ثبت نام کاربران";
    document.getElementById("loginUser").style.display = "flex";
    document.querySelector('.checkbox1').style.display = "flex";
});

document.querySelector('.btn-login').addEventListener("click", function startTimer() {
    minutes = 1;
    seconds = 59;
    document.getElementById('seconds').innerHTML = seconds;
    document.getElementById('minutes').innerHTML = minutes;
    set_inteval = setInterval('timer()', 1000);
    document.querySelector('.timer').style.display = "flex";
    document.querySelector('.btn-login').innerHTML = "ارسال مجدد کد فعالسازی";
});

var minutes;
var seconds;
var set_inteval;
function timer() {
    seconds -= 1;
    document.getElementById('seconds').innerHTML = seconds;
    document.getElementById('minutes').innerHTML = minutes;
    if (seconds == 0) {
        if (minutes > 0) {
            seconds = 59;
            minutes -= 1;
        } else {
            minutes = 0;
            document.getElementById('minutes').innerHTML = minutes;
            clearInterval(set_inteval);
            minutes = 0;
            seconds = 0;
            document.getElementById('seconds').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '0';
        }
    }
}


//Update input
const updateInputConfig = (element, disabledStatus) => {
    element.disabled = disabledStatus;
    if (!disabledStatus) {
        element.focus();
    } else {
        element.blur();
    }
};

input.forEach((element) => {
    element.addEventListener("keyup", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        let { value } = e.target;

        if (value.length == 1) {
            updateInputConfig(e.target, true);
            if (inputCount <= 4 && e.key != "Backspace") {
                finalInput += value;
                if (inputCount < 4) {
                    updateInputConfig(e.target.nextElementSibling, false);
                }
            }
            inputCount += 1;
        } else if (value.length == 0 && e.key == "Backspace") {
            finalInput = finalInput.substring(0, finalInput.length - 1);
            if (inputCount == 0) {
                updateInputConfig(e.target, false);
                return false;
            }
            updateInputConfig(e.target, true);
            e.target.previousElementSibling.value = "";
            updateInputConfig(e.target.previousElementSibling, false);
            inputCount -= 1;
        } else if (value.length > 1) {
            e.target.value = value.split("")[0];
        }
        submitButton.classList.add("hide");
    });
});

window.addEventListener("keyup", (e) => {
    if (inputCount > 4) {
        submitButton.classList.remove("hide");
        submitButton.classList.add("show");
        if (e.key == "Backspace") {
            finalInput = finalInput.substring(0, finalInput.length - 1);
            updateInputConfig(inputField.lastElementChild, false);
            inputField.lastElementChild.value = "";
            inputCount -= 1;
            submitButton.classList.add("hide");
        }
    }
});