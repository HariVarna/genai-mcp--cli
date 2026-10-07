const startBtn = document.getElementById("startBtn");
const userText = document.getElementById("userText");
const response = document.getElementById("response");
const voiceCircle = document.getElementById("voiceCircle");


/*
    Browser Speech Recognition
*/

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (!SpeechRecognition) {

    alert(
        "Speech recognition is not supported. Please use Google Chrome."
    );

} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.continuous = false;

    recognition.interimResults = false;


    /*
        Start listening
    */

    startBtn.addEventListener("click", () => {

        recognition.start();

        voiceCircle.classList.add("listening");

        startBtn.innerText = "🎙 Listening...";

    });


    /*
        Voice result
    */

    recognition.onresult = async (event) => {

        const text =
            event.results[0][0].transcript;

        console.log("User said:", text);

        userText.innerText = text;

        voiceCircle.classList.remove("listening");

        startBtn.innerText = "Start Speaking";


        await processRequest(text);

    };


    /*
        Voice recognition error
    */

    recognition.onerror = (event) => {

        console.log(
            "Speech recognition error:",
            event.error
        );

        voiceCircle.classList.remove("listening");

        startBtn.innerText = "Start Speaking";

    };

}


/*
    Understand the user's request
*/

async function processRequest(text) {

    response.innerText =
        "🔄 MCP is processing your request...";


    const lower =
        text.toLowerCase();


    /*
        COMPANY INFORMATION
    */

    if (
        lower.includes("company") ||
        lower.includes("apple") ||
        lower.includes("microsoft") ||
        lower.includes("google")
    ) {

        let company = "apple";


        if (lower.includes("microsoft")) {

            company = "microsoft";

        }


        if (lower.includes("google")) {

            company = "google";

        }


        const result =
            await callMCP(
                "get_company_info",
                {
                    company: company
                }
            );


        showResponse(result);

        return;
    }


    /*
        PRODUCT STOCK
    */

    if (
        lower.includes("stock") ||
        lower.includes("available") ||
        lower.includes("availability")
    ) {

        let product = "laptop";


        if (lower.includes("iphone")) {

            product = "iphone";

        } else if (lower.includes("keyboard")) {

            product = "keyboard";

        } else if (lower.includes("mouse")) {

            product = "mouse";

        } else if (lower.includes("headphones")) {

            product = "headphones";

        }


        const result =
            await callMCP(
                "check_stock",
                {
                    product: product
                }
            );


        showResponse(result);

        return;
    }


    /*
        PRODUCT PRICE
    */

    if (
        lower.includes("price") ||
        lower.includes("cost") ||
        lower.includes("how much")
    ) {

        let product = "laptop";


        if (lower.includes("iphone")) {

            product = "iphone";

        } else if (lower.includes("keyboard")) {

            product = "keyboard";

        } else if (lower.includes("mouse")) {

            product = "mouse";

        } else if (lower.includes("headphones")) {

            product = "headphones";

        }


        const result =
            await callMCP(
                "get_product_price",
                {
                    product: product
                }
            );


        showResponse(result);

        return;
    }


    /*
        Unknown request
    */

    showResponse({

        message:
            "I understood your voice, but I don't have an MCP tool for that request yet."

    });

}


/*
    Call FastAPI
*/

async function callMCP(tool, argumentsData) {

    try {

        const result =
            await fetch(
                "/mcp-call",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        tool: tool,

                        arguments:
                            argumentsData

                    })

                }
            );


        if (!result.ok) {

            throw new Error(
                "API request failed"
            );

        }


        return await result.json();

    } catch (error) {

        console.error(error);


        return {

            error:
                "Unable to connect to the MCP server."

        };

    }

}


/*
    Display MCP response
*/

function showResponse(data) {

    let text;


    if (
        typeof data === "object" &&
        data.result
    ) {

        text = data.result;

    } else {

        text =
            JSON.stringify(
                data,
                null,
                2
            );

    }


    response.innerText = text;


    /*
        Speak the MCP response
    */

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";

    window.speechSynthesis.speak(
        speech
    );

}