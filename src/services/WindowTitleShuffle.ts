class WindowTitleShuffle {
  private defaultText: string;
  private messages: string[] = [];
  private currentMessageIndex: number;

  public constructor(defaultText: string) {
    this.defaultText = defaultText;
  }

  public shuffle = async (): Promise<void> => {
    await this.phaseOut(this.defaultText);

    const loop = async () => {
      const message = this.newMessage();

      await this.wait(500);
      await this.phaseIn(message);
      await this.wait(2000);
      await this.phaseOut(message);

      await loop();
    }

    await loop();
  }

  public setDefaultText(message: string): WindowTitleShuffle {
    this.defaultText = message;
    return this;
  }

  public addMessage(message: string): WindowTitleShuffle {
    this.messages.push(message);
    return this;
  }

  private phaseOut = async (text: string): Promise<void> => {
    return new Promise((res) => {
      let currentText = text;

      let interval = setInterval(() => {
        currentText = currentText.slice(0, -1);
        this.setTitle(currentText);

        if (currentText.length === 0) {
          res();
          clearInterval(interval);
        }
      }, 200);
    })
  }

  private phaseIn = async (text: string): Promise<void> => {
    return new Promise((res) => {
      let position = 0;
      let currentText = "";

      let interval = setInterval(() => {
        position++;

        currentText = text.slice(0, position);
        this.setTitle(currentText);

        if (currentText.length === text.length) {
          res();
          clearInterval(interval);
        }
      }, 200);
    })
  }

  private wait = async (length: number): Promise<void> => {
    return new Promise((res) => {
      setTimeout(res, length);
    });
  }

  private newMessage = () => {
    const getRandomIndex = () => {
      const index = Math.floor(Math.random() * this.messages.length);

      // ew
      if (index === this.currentMessageIndex) {
        return getRandomIndex();
      }

      this.currentMessageIndex = index;
      return this.messages[index];
    }

    return getRandomIndex();
  }

  private setTitle(text: string) {
    if (!text) {
      window.document.title = "⠀";
    } else {
      window.document.title = text;
    }
  }
}

export default WindowTitleShuffle;