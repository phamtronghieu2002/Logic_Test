interface OptionsType {
  delayTime: number;
}

let progessElement = document.getElementById("myProgress");

let inner_myProgress = document.getElementById("inner_myProgress");
let btn_stop = document.getElementById("btn_stop");
let is_start = true;

// function to validate array input
const validateArrayInput = (numbers: number[]) => {
  if (!Array.isArray(numbers) || !numbers.length) {
    throw new Error("non-array or array is empty !");
  }
  const is_numeric_array = numbers.every((num: any) => typeof num == "number");

  if (!is_numeric_array) {
    throw new Error("required numeric array !");
  }

  return true;
};

//a promise handle one second return a number
const delayResult = (number: number, delayTime: number) => {
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
const cancellationProcess = (timeout: number) => {
  setTimeout(() => {
    is_start = false;
  }, timeout);
};

// function to process the numbers with a delay
async function processWithDelay(
  numbers: number[],
  options: OptionsType = { delayTime: 1000 }
): Promise<void> {
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
          const result = await delayResult(num, options.delayTime);
          console.log(result);
        } else {
          break;
        }
      }
    }
    return new Promise((resolve, reject) => {
      resolve();
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
}

// main to run app
const main = async () => {
  try {
    
    // cancel the process after 3 seconds
    // cancellationProcess(3000)



    btn_stop?.addEventListener("click", () => {
      cancellationProcess(0);
    });

    await processWithDelay([1, 2, 3, 4, 5], {
      delayTime: 1000,
    });
  } catch (error) {
    console.log("error >>", error);
  }
};

main();
