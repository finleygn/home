<script lang="ts">
  import { spring } from "svelte/motion";

  export let to: string;

  const coords = spring(
    { x: 0, y: 0 },
    {
      damping: 0.6,
      stiffness: 0.1,
    }
  );

  function handleMousemove(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    const { x, y } = target.getBoundingClientRect();

    coords.set({
      x: event.clientX - x,
      y: event.clientY - y,
    });
  }
</script>

<style>
  a {
    overflow: hidden;
    border-radius: 100px;
    position: relative;
    display: inline-block;
    text-decoration: none;
    border: 1px solid transparent;
    margin-right: 12px;
  }

  a:focus {
    border: 1px solid var(--border);
    outline: none;
  }

  .inner {
    z-index: 1;
    position: relative;
    padding: 20px 32px;
    color: var(--fg);
  }

  .shine {
    background: radial-gradient(
      circle,
      #df60a425 0%,
      rgba(255, 255, 255, 0) 60%
    );
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0;
    width: 160px;
    height: 160px;
    pointer-events: none;
    transition: opacity 0.4s;
  }

  a:hover .shine {
    opacity: 1;
  }

  @media (max-width: 800px) {
    a {
      width: 100%;
    }
  }
</style>

<a href={to} on:mousemove={handleMousemove}>
  <div class="inner">
    <slot />
  </div>
  <div
    class="shine"
    style="transform: translate(calc(-50% + {$coords.x}px), calc(-50% + {$coords.y}px));" />
</a>
