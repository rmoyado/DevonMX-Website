const { createApp } = Vue;

window.onscroll = function (event) {
  let dY = window.scrollY;
  let app = document.getElementById("app");
  console.log(dY);
};

let app = createApp({
  data() {
    return {
      seccion: [
        {
          titulo: "",
          contenido: "",
        },
        {
          titulo: "",
          contenido: "",
        },
        {
          titulo: "",
          contenido: "",
        },
      ],
      pageY: 0,
      scale: 10,
      t: 0,
      abc: "",
      words: [
        "Devon.",
        "Web 2.5",
        "eCommerce",
        "UX-UI",
        "Block Chain",
        "Web 3.0",
        "ChatBot-GPT",
        "Software",
        "DataScience",
        "AR-VR",
      ],
      word: "",
      letters: [],
      frame: 0,
      wordIndex: -1,
    };
  },
  computed: {
    wordIndexes() {
      const firstIndex = this.abc.indexOf(this.words[this.wordIndex]);
      let indexes = [];

      for (i = 0; i <= this.words.length; i++) {
        indexes.push(firstIndex + i);
      }
      return indexes;
    },
  },
  methods: {
    tick() {
      requestAnimationFrame(() => {
        this.frame++;
        this.t = Date.now() / 1000;
        this.draw();
        this.tick();

        const frames = 500;
        if (this.frame % frames == frames / 4) {
          this.wordIndex = (this.wordIndex + 1) % this.words.length;
          this.word = this.words[this.wordIndex];
          let c = this.wordIndexes;
          this.showWord();
        } else if (this.frame % frames == 0) {
          this.shoffleWords();
        }
      });
    },
    draw() {
      if (this.letters.length < this.abc.length) {
        let profundidad = Math.random();
        let bright = Math.floor(255 * profundidad);
        let temp = {
          x: (2 * Math.random() - 1) ** 3,
          y: (2 * Math.random() - 1) ** 3,
          z: (2 * profundidad - 1) ** 3,
          color: {
            r: bright,
            g: bright,
            b: bright,
          },
        };

        this.letters.push({
          x: temp.x / 2,
          y: temp.y / 2,
          z: temp.z / 2,
          color: temp.color,
          rx: temp.x,
          ry: temp.y,
          rz: temp.z,
          rcolor: {
            r: bright,
            g: bright,
            b: bright,
          },
        });
      }
      this.letters.forEach((leter) => {
        let z = leter.z + (leter.rz - leter.z) / 40;
        leter.x += (leter.rx - leter.x) / 5;
        leter.y += (leter.ry - leter.y) / 15;
        leter.z = z;
        let bright = Math.floor(200 * ((z + 1) / 2));
        leter.color.r = Math.floor(
          leter.color.r + (leter.rcolor.r - leter.color.r) / 5
        );
        leter.color.g = Math.floor(
          leter.color.g + (leter.rcolor.g - leter.color.g) / 5
        );
        leter.color.b = Math.floor(
          leter.color.b + (leter.rcolor.b - leter.color.b) / 5
        );
      });
    },
    showWord() {
      this.word.split("").forEach((char, i) => {
        const letter = this.letters[this.wordIndexes[i]];
        if (typeof letter === "undefined") return;
        letter.rz = 1.2;
        // letter.rx = ((i / this.word.length) - 0.5 ) * (1 / this.word.length)
        letter.rx = 0.02 * (i - this.word.length * 0.5); // ((i / this.word.length) - 0.5 ) * (1 / this.word.length)
        letter.ry = -0.1;
        letter.rcolor.r = 203;
        letter.rcolor.g = 12;
        letter.rcolor.b = 217;
      });
    },
    shoffleWords() {
      this.letters.forEach((letter, i) => {
        let r = 0.5;
        let phi = Math.random() * Math.PI * 2;
        letter.rz = (2 * Math.random() - 1) / 2 + 0.5;
        letter.rx = (2 * Math.random() - 1) ** 3;
        letter.ry = (2 * Math.random() - 1) ** 3;
        //letter.rx = r * Math.cos(phi) // (2 * Math.random() - 1) ** 3
        //letter.ry = r * Math.sin(phi) // (2 * Math.random() - 1) ** 3
        const bright = Math.floor(200 * ((letter.rz + 1) / 2));
        letter.rcolor = {
          r: bright,
          g: bright,
          b: bright,
        };
      });
    },
  },
  mounted() {
    this.abc = this.words.reduce((result, item) => item + result, "");
    this.tick();

    window.addEventListener("wheel", (event) => {
      event.preventDefault();
      this.pageY = Math.min(900, this.pageY + event.deltaY * -0.2);
      console.log(this.pageY);
    });
  },
}).mount("#app");
