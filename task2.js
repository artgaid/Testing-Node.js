//Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате             «час-минута-секунда-день-месяц-год».

// Задача программы — создавать для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось). По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы. Важно, чтобы работа программы основывалась на событиях.

const EventEmitter = require("events");
const emitter = new EventEmitter();
const moment = require("moment");
const colors = require("colors");

const number = process.argv[2];
const time = moment(number, "kk-mm-ss-DD-MM-YYYY").format("kk:mm:ss");
const date = moment(number, "kk-mm-ss-DD-MM-YYYY").format("DD-MM-YYYY");

const RequestTypes = [
  {
    type: "timer",
    payload: time,
  },
  {
    type: "days",
    payload: date,
  },
];

class newNumber {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

const countdown = ({ type, payload }) => {
  if (type === "timer") {
    if (payload === "01:00:00") {
      return new newNumber("error", "Times is over");
    } else {
      const newTime = moment(payload, "kk:mm:ss")
        .subtract(1, "hour")
        .format("kk:mm:ss");
      return new newNumber(type, newTime);
    }
  } else if (type === "days") {
    if (payload === "01-01-0000") {
      return new newNumber("error", "Days is over");
    } else {
      const newDate = moment(payload, "DD-MM-YYYY")
        .subtract(1, "days")
        .format("DD-MM-YYYY");
      return new newNumber(type, newDate);
    }
  } else {
    return new newNumber(type, payload);
  }
};

const run = async (obj) => {
  const { type, payload } = countdown(obj);

  emitter.emit(type, payload);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await run({ type: type, payload: payload });
};

class Handlers {
  static timer(payload) {
    console.log(colors.yellow("Remaining time:", payload));
  }
  static days(payload) {
    console.log(colors.green("Remaining days:", payload));
  }
  static error(payload) {
    console.log(colors.red("Error :", payload));
  }
}

emitter.on("timer", Handlers.timer);
emitter.on("days", Handlers.days);
emitter.on("error", Handlers.error);

run(RequestTypes[0]);
run(RequestTypes[1]);
