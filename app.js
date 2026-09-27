const responses = {
  books: [
    "That sounds like a lovely reading moment. Do you have a favorite passage you return to when you want a little peace?",
    "Books can feel like quiet company. What sort of stories make you feel most at ease?",
    "That is a thoughtful bookish note. Would you like to share an author who always seems kind and wise?"
  ],
  cats: [
    "Cats do have a gift for calm. What is the most peaceful thing a cat has done near you?",
    "That sounds very sweet. Do you prefer the gentle purr of a sleepy cat or the soft stretch of a curious one?",
    "A cat conversation is always welcome. What is your favorite small habit that makes cats so charming?"
  ],
  plants: [
    "Plants make such patient companions. Which plant in your space feels happiest right now?",
    "That sounds wonderfully green. Do you enjoy caring for leafy plants, herbs, or flowers most?",
    "A quiet chat about plants is a lovely thing. What small sign of growth has delighted you lately?"
  ]
};

const form = document.getElementById("chat-form");
const messages = document.getElementById("messages");
const topic = document.getElementById("topic");
const input = document.getElementById("message");
const responseIndex = {
  books: 0,
  cats: 0,
  plants: 0
};
const prefersReducedMotion =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function addMessage(text, speaker) {
  const item = document.createElement("li");
  item.className = `message ${speaker}`;

  const paragraph = document.createElement("p");
  const speakerLabel = document.createElement("span");
  speakerLabel.className = "sr-only";
  speakerLabel.textContent =
    speaker === "assistant" ? "Assistant says: " : "You say: ";

  paragraph.appendChild(speakerLabel);
  paragraph.appendChild(document.createTextNode(text));
  item.appendChild(paragraph);

  messages.appendChild(item);
  if (!prefersReducedMotion && typeof messages.scrollTo === "function") {
    try {
      messages.scrollTo({
        top: messages.scrollHeight,
        behavior: "smooth"
      });
      return;
    } catch (error) {}
  }

  messages.scrollTop = messages.scrollHeight;
}

function nextReply(selectedTopic) {
  const topicKey = responses[selectedTopic] ? selectedTopic : "books";
  const topicReplies = responses[topicKey];
  const index = responseIndex[topicKey] ?? 0;
  responseIndex[topicKey] = (index + 1) % topicReplies.length;
  return topicReplies[index];
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  addMessage(text, "user");
  addMessage(nextReply(topic.value), "assistant");
  input.value = "";
  input.focus();
});
