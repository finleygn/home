<script>
  import CrossArray from "./components/CrossArray.svelte";
  import Link from "./components/Link.svelte";
  import Header from "./components/Header.svelte";
  import WindowTitleShuffle from "./services/WindowTitleShuffle";

  let title = document.title;

  setTimeout(() => {
    const shuffler = new WindowTitleShuffle();

    shuffler
      .setDefaultText(document.title)
      .addMessage("mcleish")
      .addMessage("stream six impala")
      .addMessage("not sure what else to put here");

    shuffler.shuffle();
  }, 7000);
</script>

<style>
  main {
    height: 100%;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 80px;
    display: flex;
    align-items: center;
  }

  .content {
    min-width: 40%;
  }

  nav {
    display: flex;
    padding: 40px 0;
    flex-wrap: wrap;
  }

  @media (max-width: 800px) {
    main {
      padding: 20px;
    }
    .content {
      width: 100%;
    }
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<main>
  <div class="content">
    <Header />
    <nav>
      <Link target="_blank" to="https://www.linkedin.com/in/finleyg/">linkedin</Link>
      <Link target="_blank" to="https://github.com/finleygn">github</Link>
      <Link target="_blank" to="https://twitter.com/finley_gn">twitter</Link>
    </nav>
  </div>
  <CrossArray crossSize={6} crossGap={80} />
</main>
