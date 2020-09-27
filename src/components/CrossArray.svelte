<script lang="ts">
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const crossSize = 6;
  const crossGap = 80;
  const moveSize = 50;

  function draw() {
    const rows = Math.ceil((canvas.width + moveSize) / (crossSize + crossGap));
    const columns = Math.ceil(
      (canvas.height + moveSize) / (crossSize + crossGap)
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#3f2637";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;

    for (let row = -1; row <= rows; row++) {
      for (let column = -1; column <= columns; column++) {
        const startingX = row * (crossSize + crossGap);
        const startingY = column * (crossSize + crossGap);

        ctx.beginPath();
        ctx.moveTo(startingX, startingY);
        ctx.lineTo(startingX + crossSize, startingY + crossSize);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(startingX + crossSize, startingY);
        ctx.lineTo(startingX, startingY + crossSize);
        ctx.stroke();
      }
    }
  }

  function setScale() {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width + moveSize;
    canvas.height = height + moveSize;
  }

  function resize() {
    setScale();
    draw();
  }

  function updateParalax(event: MouseEvent) {
    const x = (((event.clientX - window.innerWidth / 2) / window.innerWidth) * 2 * moveSize) / 2;
    const y = (((event.clientY - window.innerHeight / 2) / window.innerHeight) * 2 * moveSize) / 2;
    canvas.style.transform = `translate(${x}px, ${y}px)`;
  }

  onMount(() => {
    ctx = canvas.getContext("2d");

    setScale();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", updateParalax);
    window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", updateParalax);
    };
  });
</script>

<style>
  .container {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 1;
    bottom: 0;
    z-index: -1;
  }

  canvas {
    width: 100%;
    height: 100%;
    transition: transform 0.1s;
  }
</style>

<div class="container"><canvas bind:this={canvas} /></div>
