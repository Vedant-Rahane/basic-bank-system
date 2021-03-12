import React, { useEffect } from "react";

function Clock() {
  useEffect(() => {
    initClock();
  }, []);

  Number.prototype.pad = function (n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
  };

  function updateClock() {
    var now = new Date();
    var sec = now.getSeconds(),
      min = now.getMinutes(),
      hou = now.getHours() % 12 ? now.getHours() % 12 : 12,
      mo = now.getMonth(),
      date = now.getDate(),
      day = now.getDay(),
      yr = now.getFullYear();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var ampm = now.getHours() >= 12 ? " PM" : " AM";

    document.getElementById(
      "first"
    ).innerHTML = `${days[day]}, ${date} ${months[mo]} ${yr}`;
    document.getElementById("second").innerHTML = `${hou.pad(2)} : ${min.pad(
      2
    )} : ${sec.pad(2)} ${ampm}`;
  }

  function initClock() {
    updateClock();
    window.setInterval(() => {
      updateClock();
    }, 1);
  }

  //   window.onload = initClock();

  return (
    <div id="timedate">
      <p id="first">Date</p>
      <p id="second">Time</p>
    </div>
  );
}

export default Clock;
