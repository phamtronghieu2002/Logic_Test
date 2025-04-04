"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let progessElement = document.getElementById("myProgress");
let inner_myProgress = document.getElementById("inner_myProgress");
let btn_stop = document.getElementById("btn_stop");
let is_start = true;
// function to validate array input
const validateArrayInput = (numbers) => {
    if (!Array.isArray(numbers) || !numbers.length) {
        throw new Error("non-array or array is empty !");
    }
    const is_numeric_array = numbers.every((num) => typeof num == "number");
    if (!is_numeric_array) {
        throw new Error("required numeric array !");
    }
    return true;
};
//a promise handle one second return a number
const delayResult = (number, delayTime) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number == "number") {
                return resolve(number);
            }
            reject(new Error("required number input !"));
        }, delayTime);
    });
};
// function to cancel the process after 3 seconds
const cancellationProcess = (timeout) => {
    setTimeout(() => {
        is_start = false;
    }, timeout);
};
// function to process the numbers with a delay
function processWithDelay(numbers_1) {
    return __awaiter(this, arguments, void 0, function* (numbers, options = { delayTime: 1000 }) {
        try {
            if (validateArrayInput(numbers)) {
                const length = numbers.length;
                const step = 100 / length;
                let widthStep = 0;
                for (const num of numbers) {
                    if (is_start) {
                        widthStep += step;
                        if (progessElement && inner_myProgress) {
                            progessElement.style.width = `${widthStep}%`;
                            inner_myProgress.innerText = `${widthStep}%`;
                        }
                        const result = yield delayResult(num, options.delayTime);
                        console.log(result);
                    }
                    else {
                        break;
                    }
                }
            }
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw error.message;
            }
        }
    });
}
// main to run app
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // cancel the process after 3 seconds
        // cancellationProcess(3000)
        btn_stop === null || btn_stop === void 0 ? void 0 : btn_stop.addEventListener("click", () => {
            cancellationProcess(0);
        });
        yield processWithDelay([1, 2, 3, 4, 5], {
            delayTime: 1000,
        });
    }
    catch (error) {
        console.log("error >>", error);
    }
});
main();
