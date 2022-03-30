$(document).contextmenu((e) => e.preventDefault());
// -------------------------------------
$(document).ready(function () {
  localStorage.removeItem("lastColor");
  // -------------------------------------
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const canvasHeight = canvas.offsetHeight;
  const canvasWidth = canvas.offsetWidth;
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  // -------------------------------------
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 15;

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  ////////////// COLOR FUNCTION  --- /////
  $("#color").change((e) => {
    ctx.strokeStyle = e.target.value;
    localStorage.setItem("lastColor", e.target.value);
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  //////////////  INCREASE SIZE  --- /////
  $("#increase").click(() => {
    infoBoxFunc();
    ctx.lineWidth = ctx.lineWidth + 3;
    $("#infoBox").text("Brush size: " + ctx.lineWidth + "px");

    $("#cursor").css({
      width: ctx.lineWidth,
      height: ctx.lineWidth,
    });
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  //////////////  DECREASE SIZE  --- /////
  $("#decrease").click(() => {
    infoBoxFunc();
    ctx.lineWidth = ctx.lineWidth - 3;
    $("#infoBox").text("Brush size: " + ctx.lineWidth + "px");

    $("#cursor").css({
      width: ctx.lineWidth,
      height: ctx.lineWidth,
    });
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  ////////////// DRAW FUNCTION  --- /////
  $("#draw").click(() => {
    infoBoxFunc();
    $("#infoBox").text("drawing..");

    ctx.strokeStyle = localStorage.getItem("lastColor");
    //
    function draw(e) {
      if (!isDrawing) return;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      lastX = e.offsetX;
      lastY = e.offsetY;
    }
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;

      lastX = e.offsetX;
      lastY = e.offsetY;
    });
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  ////////////// ERASE FUNCTION  --- /////
  $("#erase").click(() => {
    infoBoxFunc();
    $("#infoBox").text("erase..");
    let bgd_color = $(canvas).css("background-color");
    ctx.strokeStyle = bgd_color;
    //
    function erase(e) {
      if (!isDrawing) return;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      lastX = e.offsetX;
      lastY = e.offsetY;
    }
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;

      lastX = e.offsetX;
      lastY = e.offsetY;
    });
    canvas.addEventListener("mousemove", erase);
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  //////////////   CLEAR CANVAS  --- /////
  $("#clear").click(() => {
    infoBoxFunc();
    $("#infoBox").text("canvas cleared");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  //////////////    SAVE CANVAS  --- /////
  $("#save").click(() => {
    infoBoxFunc();
    $("#infoBox").text("saving..");
    const link = document.createElement("a");
    link.download = "download.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  /////////// INFO-BOX FUNCTION  --- /////
  function infoBoxFunc() {
    $("#infoBox").css("visibility", "visible");
    setTimeout(() => {
      $("#infoBox").css("visibility", "hidden");
    }, 1000);
  }

  // -------------------------------------
  // -------------------------------------
  // -------------------------------------
  //////////////    PAGE CURSOR  --- /////
  $(window).mousemove(function (e) {
    $("#cursor").css({
      background: ctx.strokeStyle,
      width: ctx.lineWidth,
      height: ctx.lineWidth,
      top: e.clientY - $("#cursor").height() / 2,
      left: e.clientX - $("#cursor").width() / 2,
    });
  });
});
