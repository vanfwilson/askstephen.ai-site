let preventFlashStop = false;

(function () {
  let scriptTag = document.currentScript;
  if (!scriptTag) {
    const scripts = document.getElementsByTagName('script');
    scriptTag = scripts[scripts.length - 1];
  }

  const pluginBaseURL = new URL(scriptTag.src).origin;
  const clientName = scriptTag.dataset.client;

  if (!clientName) {
    console.error("❌ No data-client specified in <script> tag.");
    return;
  }
  
  const style = document.createElement("style");
style.innerHTML = `
  @keyframes avatarFlash {
    0% { opacity: 1; }
    50% { opacity: 0.1; }
    100% { opacity: 1; }
  }

  #chatbot-avatar.flashing {
    animation: avatarFlash 1s infinite ease-in-out;
  }
`;

style.innerHTML += `
  .chatbot-message.user {
    background-color: #0073aa;
    color: white;
    padding: 10px;
    border-radius: 10px;
    max-width: 90%;
    margin-left: auto;
    margin-right: 0;
    white-space: pre-wrap;
  }

  .chatbot-message.ai {
    background-color: #f1f1f1;
    color: black;
    padding: 10px;
    border-radius: 10px;
    max-width: 90%;
    margin-right: auto;
    margin-left: 0;
    white-space: pre-wrap;
  }
`;




document.head.appendChild(style);
/* teaser speech bubble styling */
style.innerHTML += `
  .chatbot-teaser-bubble {
    position: fixed;
    bottom: 105px;           /* sits above the 64px avatar (bottom:30 + height) */
    right: 30px;
    max-width: 240px;
    background: #fff;
    color: #222;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    padding: 10px 12px;
    font-size: 14px;
    line-height: 1.4;
    z-index: 9999;
    border: 1px solid rgba(0,0,0,0.06);
    display: none;           /* shown via JS */
  }
  .chatbot-teaser-bubble::after {
    content: "";
    position: absolute;
    bottom: -8px;
    right: 18px;
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
    filter: drop-shadow(0 -1px 0 rgba(0,0,0,0.05));
  }
  .chatbot-teaser-bubble .teaser-label {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .chatbot-teaser-bubble .teaser-cta {
    display: inline-block;
    margin-top: 6px;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid rgba(0,0,0,0.08);
    cursor: pointer;
    user-select: none;
  }
`;



  // Step 1: Fetch settings for client
  fetch(`${pluginBaseURL}/wp-json/wp-chatbot/v1/client-settings?client=${clientName}`)
    .then(res => res.json())
    .then(config => {
      if (!config || !config.api_key || !config.assistant_id || !config.settings) {
        console.error("❌ Invalid chatbot config:", config);
        return;
      }

      const assistantId = config.assistant_id;
      const apiKeyId = config.api_key;
      const settings = config.settings;
      const title = settings.title || "Chat with us";
      const assistantName = settings.name || "AI Assistant";
      const placeholder = settings.placeholder || "Type your question...";
      const defaultQuestion = settings.default_question || "";
      const colors = {
        bg: settings.bg_color || "#0073aa",
        text: settings.text_color || "#ffffff"
      };
      
      
      const avatar = settings.avatar_url || "https://via.placeholder.com/40";;



      // ✅ Paste your existing chatbot UI creation/rendering code below this point...
		

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function setCookie(name, value, minutes) {
    let expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + expires.toUTCString() + "; path=/";
  }

  const container = document.createElement("div");
  container.id = "chatbot-container";
  container.style.position = "fixed";
  container.style.bottom = "40px";
  container.style.right = "20px";
  container.style.width = "320px";
  container.style.background = "#fff";
  container.style.borderRadius = "10px";
  container.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";
  container.style.overflow = "hidden";
  container.style.fontFamily = "Arial, sans-serif";
  container.style.zIndex = "9999";
  container.style.fontSize = "14px"; 


  const header = document.createElement("div");
  header.style.background = colors.bg;
  header.style.color = colors.text;
  header.style.padding = "10px";
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between";

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.alignItems = "center";

  const avatarImg = document.createElement("img");
  avatarImg.id = "chatbot-avatar"; // This is the avatar in the header
  avatarImg.src = avatar;
  avatarImg.alt = "Avatar";
  avatarImg.style.width = "32px";
  avatarImg.style.height = "32px";
  avatarImg.style.borderRadius = "50%";
  avatarImg.style.marginRight = "10px";

  const nameSpan = document.createElement("span");
  nameSpan.innerText = assistantName;

  left.appendChild(avatarImg);
  left.appendChild(nameSpan);

  const right = document.createElement("div");

  
const fullscreenBtn = document.createElement("button");
fullscreenBtn.innerText = "⛶";
fullscreenBtn.title = "Fullscreen";
fullscreenBtn.style.marginRight = "5px";
fullscreenBtn.style.background = "transparent";

const refreshBtn = document.createElement("button");

  refreshBtn.innerText = "↻";
  refreshBtn.title = "New Chat";
  refreshBtn.style.marginRight = "5px";

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "X";
  closeBtn.title = "Close";

const buttonStyles = {
  background: "transparent",
  border: "none",
  color: colors.text,
  cursor: "pointer",
  fontSize: "16px"
};

Object.assign(refreshBtn.style, buttonStyles);
Object.assign(closeBtn.style, buttonStyles);
Object.assign(fullscreenBtn.style, buttonStyles);


  right.appendChild(fullscreenBtn);
  right.appendChild(refreshBtn);
  right.appendChild(closeBtn);

  header.appendChild(left);
  header.appendChild(right);
  container.appendChild(header);

  const messages = document.createElement("div");
  messages.id = "chatbot-messages";
  messages.style.height = "260px";
  messages.style.overflowY = "auto";
  messages.style.padding = "10px";
  messages.style.background = "#f9f9f9";

  container.appendChild(messages);

  const loader = document.createElement("div");
  loader.id = "chatbot-loader";
  loader.style.display = "none";

  loader.innerHTML = "<em>Assistant is thinking...</em>";
  loader.style.padding = "10px";
  messages.appendChild(loader);

  const inputWrap = document.createElement("div");
  inputWrap.style.display = "flex";
  inputWrap.style.padding = "10px";
  inputWrap.style.background = "#eee";
  inputWrap.style.flexDirection = "column"; // ✅ stack input + default button


	const inputRow = document.createElement("div");
	inputRow.style.display = "flex";


  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.style.flex = "1";
  input.style.padding = "8px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "5px";

  const sendBtn = document.createElement("button");
  sendBtn.innerText = "Send";
  sendBtn.style.marginLeft = "10px";
  sendBtn.style.padding = "8px";
  sendBtn.style.background = colors.bg;
  sendBtn.style.color = colors.text;
  sendBtn.style.border = "none";
  sendBtn.style.borderRadius = "5px";
  sendBtn.style.cursor = "pointer";

  inputRow.appendChild(input);
inputRow.appendChild(sendBtn);
inputWrap.appendChild(inputRow);

// ✅ Add default question button *inside* inputWrap
let triggerDefaultQuestion = null;

if (defaultQuestion) {
  const defaultBtn = document.createElement("button");
  defaultBtn.innerText = defaultQuestion;
  defaultBtn.style.marginTop = "10px";
  defaultBtn.style.padding = "8px";
  defaultBtn.style.background = colors.bg;
  defaultBtn.style.color = colors.text;
  defaultBtn.style.border = "none";
  defaultBtn.style.borderRadius = "5px";
  defaultBtn.style.cursor = "pointer";

  // 👉 Make the function reusable
  triggerDefaultQuestion = () => {
    input.value = defaultQuestion;
    sendBtn.click();
  };

  defaultBtn.addEventListener("click", triggerDefaultQuestion);
  inputWrap.appendChild(defaultBtn);
}


container.appendChild(inputWrap);


  closeBtn.addEventListener("click", () => container.style.display = "none");
  refreshBtn.addEventListener("click", () => {
    document.cookie = "chatbot_thread_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    messages.innerHTML = "<p><em>🔄 Starting new conversation...</em></p>";
    loader.style.display = "none";
    document.getElementById("chatbot-avatar").classList.remove("flashing");

  });

  function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
  if (!preventFlashStop) {
    document.getElementById("chatbot-avatar").classList.remove("flashing");
  }
  preventFlashStop = false; // reset after use
}

  
  function scrollToUserMessage() {
  const chatbox = document.getElementById("chatbot-messages");
  const userMessages = chatbox.querySelectorAll(".chatbot-message.user");

  if (userMessages.length === 0) return;

  const lastUserMsg = userMessages[userMessages.length - 1];
  const offset = lastUserMsg.offsetTop - (chatbox.clientHeight / 2);
  chatbox.scrollTop = offset > 0 ? offset : 0;
}


function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `chatbot-message ${role}`;
  msg.style.marginBottom = "10px";

  // ✅ Convert Markdown-style links: [text](url)
  let linkedText = text.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1 🔗</a>'
  );

  // ✅ Convert plain URLs (avoids trailing punctuation like ) or .)
  linkedText = linkedText.replace(
    /(?<!["'\]])(https?:\/\/[^\s<)]+)(?=[\s)<]|$)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1 🔗</a>'
  );

  msg.innerHTML = `<strong>${role === 'user' ? 'You' : assistantName}:</strong> ${linkedText}`;
  messages.appendChild(msg);
    setTimeout(scrollToUserMessage, 100); // Position user message halfway
  }

  function sendMessage() {
    const userMsg = input.value.trim();
    if (!userMsg) return;

    const existingThreadId = getCookie("chatbot_thread_id");
    appendMessage("user", userMsg);
    setTimeout(scrollToUserMessage, 100); // Position user message halfway
    input.value = "";
    loader.style.display = "block";
    document.getElementById("chatbot-avatar").classList.add("flashing");


    fetch(`${pluginBaseURL}/wp-json/wp-chatbot/v1/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMsg,
        assistant_id: assistantId,
        api_key_id: apiKeyId,
        thread_id: existingThreadId || null
      })
    })
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      document.getElementById("chatbot-avatar").classList.remove("flashing");
      if (data.thread_id) {
        setCookie("chatbot_thread_id", data.thread_id, 30);
      }
      appendMessage("ai", data.reply || "No response.");
    })
    .catch(err => {
      loader.style.display = "none";
      document.getElementById("chatbot-avatar").classList.remove("flashing");
      appendMessage("ai", "⚠️ Error getting response.");
    });
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  
// Create avatar-only toggle button
const avatarContainer = document.createElement("div");
avatarContainer.style.position = "fixed";
avatarContainer.style.bottom = "30px";
avatarContainer.style.right = "30px";
avatarContainer.style.zIndex = "9998";
avatarContainer.style.cursor = "pointer";
avatarContainer.style.borderRadius = "50%";
avatarContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
avatarContainer.style.overflow = "hidden";
avatarContainer.style.width = "64px";
avatarContainer.style.height = "64px";
avatarContainer.style.background = colors.bg;

const avatarIcon = document.createElement("img");
avatarIcon.src = avatar;
avatarIcon.style.width = "100%";
avatarIcon.style.height = "100%";
avatarIcon.style.borderRadius = "50%";
avatarIcon.alt = "Chatbot Avatar";

avatarContainer.appendChild(avatarIcon);
document.body.appendChild(avatarContainer);

container.style.display = "none"; // Hide chatbox initially

// ---- Teaser speech bubble (shows once per page view after 15s) ----
const teaserBubble = document.createElement('div');
teaserBubble.className = 'chatbot-teaser-bubble';

// Decide the line to show
const teaserText = defaultQuestion || placeholder || "How can I help?";
teaserBubble.innerHTML = `
  <span class="teaser-label">${title}</span>
  <span>${teaserText}</span>
  <div class="teaser-cta">Ask now</div>
`;
document.body.appendChild(teaserBubble);

// Show once per page load unless user already opened the chat
let teaserTimer = null;
const TEASER_SEEN_KEY = 'hcm_teaser_seen';

function showTeaser() {
  if (sessionStorage.getItem(TEASER_SEEN_KEY) === '1') return;
  // Only show if chat is not open
  if (container.style.display === 'none') {
    teaserBubble.style.display = 'block';
  }
}

function hideTeaser() {
  teaserBubble.style.display = 'none';
  sessionStorage.setItem(TEASER_SEEN_KEY, '1');
  if (teaserTimer) {
    clearTimeout(teaserTimer);
    teaserTimer = null;
  }
}

// 15s idle timer
teaserTimer = setTimeout(showTeaser, 15000);

// Clicking the bubble opens chat and (optionally) sends the default question
teaserBubble.addEventListener('click', () => {
  hideTeaser();
  avatarContainer.click();
 preventFlashStop = true;        // 👈 tell scrollToBottom not to stop flashing
  // Instead of duplicating, just call the same function
  if (triggerDefaultQuestion) {
    setTimeout(triggerDefaultQuestion, 250);
  }
});


// If user clicks the avatar manually, hide teaser
avatarContainer.addEventListener('click', hideTeaser);

// If user types or sends anything, hide teaser (defensive)
input.addEventListener('input', hideTeaser);
sendBtn.addEventListener('click', hideTeaser);


let isFullScreen = false;
fullscreenBtn.addEventListener("click", () => {
  if (!isFullScreen) {
    container.style.width = "90vw";
    container.style.height = "75vh";
    messages.style.height = "calc(100% - 200px)";  // ✅ Increased from 150px
    fullscreenBtn.innerText = "❐";
  } else {
    container.style.width = "320px";
    container.style.height = "";
    messages.style.height = "260px";
    fullscreenBtn.innerText = "⛶";
  }
  isFullScreen = !isFullScreen;
  //scrollToBottom();
});


document.body.appendChild(container);

// Open chatbot when avatar is clicked
avatarContainer.addEventListener("click", () => {
  container.style.display = "block";
  
  // ✅ Inject welcome message
  messages.innerHTML = `<div class='chatbot-message ai'><strong>${assistantName}:</strong> Welcome to <strong>${title}</strong>. How can I help you today?</div>`;
  
  const threadId = getCookie("chatbot_thread_id");
if (threadId) {
  fetch(`${pluginBaseURL}/wp-json/wp-chatbot/v1/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      thread_id: threadId,
      api_key_id: apiKeyId
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.messages && Array.isArray(data.messages)) {
        data.messages.forEach(msg => {
          appendMessage(msg.role === "user" ? "user" : "ai", msg.text);
        });
      }
    })
    .catch(err => {
      console.warn("⚠️ Failed to load chat history:", err);
    });
}

  
  
  avatarContainer.style.display = "none";
  document.getElementById("chatbot-avatar").classList.add("flashing");
  setTimeout(() => {
  scrollToBottom();
}, 3000);
});

// Close chatbot when close button clicked
closeBtn.addEventListener("click", () => {
  container.style.display = "none";
  avatarContainer.style.display = "block";
});

 }); // ← closes the .then(config => { ... })

})();
