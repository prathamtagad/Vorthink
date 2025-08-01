function submit(){
    let user_prompt = document.getElementById('input-text').value;

    if(user_prompt.trim() !== ''){
        add_user_chat(user_prompt);
    }
}

function add_user_chat(prompt){
    const chat_area = document.getElementById('chat-area');

    let new_div = document.createElement("div");
    new_div.textContent = prompt;
    new_div.classList.add("user-chat");
    chat_area.appendChild(new_div);

    document.getElementById('input-text').value = '';
    add_ai_chat(prompt);
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

async function add_ai_chat(prompt){
    const fetch_url = await fetch(`https://text.pollinations.ai/${prompt}`);
    const response = await fetch_url.text();

    const chat_area = document.getElementById('chat-area');

    let new_div = document.createElement("div");
    new_div.classList.add("ai-chat");

    const formatted = response.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
        const escapedCode = escapeHTML(code);
        const rawCode = encodeURIComponent(code);
        return `
            <pre>
                <code class="language-${lang || ''}">${escapedCode}</code>
                <button class="copy-code" data-code="${rawCode}">Copy Code</button>
            </pre>
        `;
    });

    new_div.innerHTML = formatted;
    chat_area.appendChild(new_div);
}

document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('copy-code')) {
        const code = decodeURIComponent(e.target.getAttribute('data-code'));
        navigator.clipboard.writeText(code).then(() => {
            e.target.textContent = 'Copied!';
            setTimeout(() => {
                e.target.textContent = 'Copy Code';
            }, 1500);
        });
    }
});

document.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        submit();
    }
});