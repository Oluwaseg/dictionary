const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.textContent = `Searching the meaning of  "${word}"`;
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=c6344c6a-eb48-4d1c-9eeb-1189471b3a9c`;

    const result = await fetch(url).then((res) => res.json());

    if (result[0] && result[0].shortdef[0]) {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";
      titleEl.textContent = result[0].meta.id;
      meaningEl.innerText = result[0].shortdef[0];
      audioEl.src = `https://media.merriam-webster.com/soundc11/${word.charAt(
        0
      )}/${
        result[0].hwi.prs[0].sound.audio
      }.wav?key=c6344c6a-eb48-4d1c-9eeb-1189471b3a9c`;
    } else {
      meaningContainerEl.style.display = "block";
      titleEl.textContent = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    }
  } catch (error) {
    console.log(error);
    infoTextEl.textContent = `an error happened, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});

document.getElementById("clear-button").addEventListener("click", () => {
  inputEl.value = "";
  infoTextEl.style.display = "block";
  meaningContainerEl.style.display = "none";
});
