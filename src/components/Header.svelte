<script>
  import Dango from "../icons/Dango.svelte";
</script>

<style>
  header {
    display: flex;
    align-items: center;
  }

  div {
    margin-left: 12px;
  }

  h1 {
    font-size: 48px;
    line-height: 1;
    color: var(--fg);
  }

  h2 {
    font-size: 20px;
    line-height: 1;
    color: var(--fgalt);
    opacity: 0.6;
  }

  @media(max-width: 800px) {
		h1 {
			font-size: 36px;
		}
    h2 {
      font-size: 18px;
    }
	}
</style>

<header>
  <Dango />
  <div>
    <h1>finley garton</h1>
    <h2>software engineer</h2>
  </div>
</header>
