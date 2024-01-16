function handleclick(){
    alert("button clicked!")};
// user message array
const userMessage = [
    ["hi", "hey", "hello"],
    ["sure", "yes", "no"],
    ["are you genious", "are you nerd", "are you intelligent"],
    ["i hate you", "i dont like you"],
    ["how are you", "how is life", "how are things", "how are you doing"],
    ["how is corona", "how is covid 19", "how is covid19 situation"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you", "who is your creator"],
    [
        "your name please",
        "your name",
        "may i know your name",
        "what is your name",
        "what call yourself"
      ],
      ["i love you"],
      ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
      ["bad", "bored", "tired"],
      ["help me", "tell me story", "tell me joke"],
      ["ah", "ok", "okay", "nice", "welcome"],
      ["thanks", "thank you"],
      ["what should i eat today"],
      ["bro"],
      ["what", "why", "how", "where", "when"],
      ["corona", "covid19", "coronavirus"],
      ["you are funny"],
      ["i dont know"],
      ["boring"],
      ["im tired"]


];

// bot potential response array

const botReply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    ["Okay"],
    ["Yes I am! "],
    ["I'm sorry about that. But I like you dude."],
    [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
    ],
    ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
    [
        "Nothing much",
        "About to go to sleep",
        "Can you guess?",
        "I don't know actually"
      ],
      ["I am always young."],
      ["I am just a bot", "I am a bot. What are you?"],
      ["Sabitha Kuppusamy"],
      ["I am nameless", "I don't have a name"],
      ["I love you too", "Me too"],
      ["Have you ever felt bad?", "Glad to hear it"],
      ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
      ["What about?", "Once upon a time..."],
      ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
      ["You're welcome"],
      ["Briyani", "Burger", "Sushi", "Pizza"],
      ["Dude!"],
      ["Yes?"],
      ["Please stay home"],
      ["Glad to hear it"],
      ["Say something interesting"],
      ["Sorry for that. Let's chat!"],
      ["Take some rest, Dude!"]

];


// fallback array 

const alternative =[
    "Same here, dude.",
    "That's cool! Go on...",
    "Dude...",
    "Ask something else...",
    "Hey, I'm listening..."

];

//creating a voice synthesis

const synth = window.speechSynthesis;

// create voice control funuction

function voiceControl(input){
    let thisUtter= new SpeechSynthesisUtterance(input);
    thisUtter.text= input;
    thisUtter.lang= 'en-aus';
    thisUtter.volume= 1;
    thisUtter.pitch= 1;
    thisUtter.rate = 1;
    synth.speak(thisUtter);
};


// send user message

function sendMessage(){
    const inputField = document.querySelector('#text-input');
    const input = inputField.value.trim();
    
    input !="" && output(input);
    inputField.value="";

};

// event listener

document.addEventListener("DOMContentLoaded",()=>{
    const inputField = document.querySelector('#text-input');
    inputField.addEventListener("keydown",(e)=>{
        if(e.code === "Enter"){
            const input = inputField.value.trim();
            input !="" && output(input);
            inputField.value="";

        };

    });





});

//provide chat response based on input
function output(input){
    let product;
  

    let text = input.toLowerCase().replace(/[^\w\s\d]/gi,"");
    text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();
    

    // find response
    // let comparedText = compare(userMessage,botReply,text);
    

    // product= comparedText? 
    //         comparedText : 
    //         alternative[Math.floor(Math.random() * alternative.length)];
     
    
    addChat(input);
    sendData(text);
};



// find appropriate response helper function

function compare(startArray=userMessage,respArray=botReply,input="hi"){
    
    let item;
    for ( let x=0; x < startArray.length; x++ ){
        for(let y=0; y< respArray.length;y++){
            if(startArray[x][y]=== input){
                let items= respArray[x];
                item = items[Math.floor(Math.random()*items.length)];



            }



        }
    
    
    }
    
    if (item) {return item }
    else {return containMessageCheck(input)};


};





// check for partial match
function containMessageCheck(input){
    let expectedReply = [
        [
          "Good Bye, dude",
          "Bye, See you!",
          "Dude, Bye. Take care of your health in this situation."
        ],
        ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
        ["Have a pleasant evening!", "Good evening too", "Evening!"],
        ["Good morning, Have a great day!", "Morning, dude!"],
        ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
      ];

    let expectedMessage = [
        ["bye", "tc", "take care"],
        ["night", "good night"],
        ["evening", "good evening"],
        ["morning", "good morning"],
        ["noon"]
      ]  ;

    let item;
    for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(input)) {
        let items = expectedReply[x];
        item = items[Math.floor(Math.random() * items.length)];
    }
    }
    return item;


};

// display user input and output on the chat application

function addChat(input){
   
    // add user chat
    const messageBoxDiv = document.querySelector(".chat-box");
    
    let userChatDiv = document.createElement('div');
    userChatDiv.classList.add("chat");   
    userChatDiv.innerHTML=`<span>${input}</span>`;
    // alert(`chat-box:${messageBoxDiv.innerHTML}  user-chat: ${userChatDiv.innerHTML}`);
    messageBoxDiv.appendChild(userChatDiv);

    

    //add bot response
   

    // scroll up
    let scroll = document.querySelector(".chat-box");
    scroll.scrollTop = scroll.scrollHeight;
    
    
};

//send data to server 
function sendData(userInput){
    let botAns;
    $.ajax(
        {
        url: '/get',
        type: 'POST',
        data: {
            msg: userInput,	
        } 
        }
    ).done((data)=>{
        console.log('i am in the done function');
        botAns =data;
        console.log(botAns);
        createChatElement(botAns)

        let scroll = document.querySelector(".chat-box");
        scroll.scrollTop = scroll.scrollHeight;

    });

    return botAns;
};


function createChatElement(botAns){
    const messageBoxDiv = document.querySelector(".chat-box");
    let botChatDiv = document.createElement('div');
    botChatDiv.classList.add("chat");
    botChatDiv.classList.add("bot");
    botChatDiv.innerHTML= `<span>${botAns}</span>`;
    messageBoxDiv.appendChild(botChatDiv);
    voiceControl(botAns);

};