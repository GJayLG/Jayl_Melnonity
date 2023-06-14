/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DrunkingGPT.ts":
/*!****************************!*\
  !*** ./src/DrunkingGPT.ts ***!
  \****************************/
/***/ (() => {

eval("const DrunkingGPT = {};\r\nconst url = \"api.pawan.krd\";\r\nconst path = \"/v1/chat/completions\";\r\nconst method = \"POST\";\r\nconst localPlayer = EntitySystem.GetLocalPlayer();\r\nlet optInfo = {\r\n    headers: {\r\n        \"Content-Type\": \"application/json\",\r\n        \"Authorization\": \"Bearer pk-EdfAJJaWfQQbjKJfheNpHrUFWIRGyWcqgXCepnUgxkojThNA\"\r\n    },\r\n    data: \"\"\r\n};\r\nconst path_ = ['AI', 'DrunkingGPT'];\r\nlet isUiEnabled = Menu.AddToggle(path_, 'Enable', true)\r\n    .OnChange(state => {\r\n    isUiEnabled = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Включить')\r\n    .GetValue();\r\nfunction splitLongMessage(message, maxLength) {\r\n    return message.match(new RegExp('.{1,' + maxLength + '}', 'g'));\r\n}\r\nfunction cleanText(input) {\r\n    return input.replace(/[^\\x00-\\x7F]|[\\n]/g, \"\");\r\n}\r\nDrunkingGPT.OnChatMessage = (msg) => {\r\n    if (!isUiEnabled)\r\n        return;\r\n    optInfo.data = JSON.stringify({\r\n        \"model\": \"gpt-3.5-turbo\",\r\n        \"max_tokens\": 256,\r\n        \"messages\": [{ \"role\": \"user\", \"content\": `I want you to act as a drunk person. You will only answer like a very drunk person texting and nothing else. Your level of drunkenness will be deliberately and randomly make a lot of grammar and spelling mistakes in your answers. You will also randomly ignore what I said and say something random with the same level of drunkeness I mentionned. Do not write explanations on replies. My first sentence is: ${msg.messageText}` }]\r\n    });\r\n    const connection = HTTP.Request(url, path, method, optInfo);\r\n    const intervalId = setInterval(() => {\r\n        if (connection.IsResolved()) {\r\n            clearInterval(intervalId);\r\n            try {\r\n                let responseBody = JSON.parse(connection.GetBody());\r\n                if (responseBody.choices && responseBody.choices[0] && responseBody.choices[0].message) {\r\n                    let cleanedMessage = cleanText(responseBody.choices[0].message.content);\r\n                    let messageParts = splitLongMessage(cleanedMessage, 200);\r\n                    messageParts.forEach((part, index) => {\r\n                        setTimeout(() => {\r\n                            Engine.ExecuteCommand(`say ${part}`);\r\n                        }, index * 2000);\r\n                    });\r\n                }\r\n            }\r\n            catch (err) {\r\n                console.error('Failed to parse response:', err);\r\n            }\r\n        }\r\n    }, 1000);\r\n};\r\nRegisterScript(DrunkingGPT);\r\n\n\n//# sourceURL=webpack:///./src/DrunkingGPT.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/DrunkingGPT.ts"]();
/******/ 	
/******/ })()
;