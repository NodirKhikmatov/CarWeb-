document.addEventListener("DOMContentLoaded", function () {
  const triggers = document.querySelectorAll(".trigger");
  const camX = document.querySelector(".camera.o-x");
  const camY = document.querySelector(".camera.o-y");

  triggers.forEach((trigger, index) => {
    const i = Math.floor(index / 20);
    const j = index % 20;

    trigger.addEventListener("mouseenter", () => {
      camX.style.transform = `rotateX(${(i - 10) * 8}deg)`;
      camY.style.transform = `rotateY(${(j - 10) * -8}deg)`;
    });

    trigger.addEventListener("mouseleave", () => {
      camX.style.transform = "";
      camY.style.transform = "rotateY(-30deg)";
    });
  });
});
