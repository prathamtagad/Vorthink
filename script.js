function submit(){
    let user_prompt = document.getElementById('input-text').value;
    console.log(user_prompt);
    add_user_chat(user_prompt);
}

function add_user_chat(prompt){
    chat_area = document.getElementById('chat-area');

    let new_div = document.createElement("div");
    new_div.textContent = prompt;
    new_div.classList.add("user-chat");
    chat_area.appendChild(new_div);

    document.getElementById('input-text').value = '';
    add_ai_chat(prompt);
}

async function add_ai_chat(prompt){
    const fetch_url = await fetch(`https://text.pollinations.ai/${prompt}`);
    const response = await fetch_url.text();

    chat_area = document.getElementById('chat-area');

    let new_div = document.createElement("div");
    new_div.textContent = response;

    new_div.classList.add("ai-chat");
    chat_area.appendChild(new_div);
}

document.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        submit();
    }
});