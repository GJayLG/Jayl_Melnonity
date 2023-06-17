/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SoundEnigma.ts":
/*!****************************!*\
  !*** ./src/SoundEnigma.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst SoundEnigma = {};\r\nlet run = false;\r\nlet working = true;\r\nlet intervalId;\r\nlet localHero;\r\nlet songNum;\r\nconst path_ = ['Heroes', 'Intelligence', 'Enigma', 'DJ Enigma'];\r\nlet listSongs = [\"KSB\", \"bangarang\", \"pesik\", \"serega\", \"tolpi\", \"fight\", \"kalim\", \"wings\", \"zakat\", \"trysi\", \"ilya\"];\r\nlet isUiEnabled = Menu.AddToggle(path_, 'Enable', true)\r\n    .OnChange(state => {\r\n    isUiEnabled = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Включить')\r\n    .GetValue();\r\nlet volume = Menu.AddSlider(path_, \"Volume\", 1, 100, 50)\r\n    .OnChange(state => {\r\n    volume = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Громкость')\r\n    .GetValue();\r\nlet songIndex = Menu.AddComboBox(path_, \"Song\", listSongs, 0)\r\n    .OnChange(state => (songIndex = state.newValue))\r\n    .SetNameLocale('ru', 'Песня')\r\n    .GetValue();\r\nlet randomSong = Menu.AddToggle(path_, 'Random song', true)\r\n    .OnChange(state => {\r\n    randomSong = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Рандомная песня')\r\n    .GetValue();\r\nSoundEnigma.OnScriptLoad = SoundEnigma.OnGameStart = () => {\r\n    localHero = EntitySystem.GetLocalHero();\r\n    if (localHero.GetUnitName() !== 'npc_dota_hero_enigma') {\r\n        working = false;\r\n        return;\r\n    }\r\n    ;\r\n};\r\nSoundEnigma.OnModifierCreate = (entity, modifier) => {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (!isUiEnabled)\r\n        return;\r\n    if (modifier.GetName() === \"modifier_enigma_black_hole_thinker\") {\r\n        run = true;\r\n        play();\r\n    }\r\n};\r\nSoundEnigma.OnModifierDestroy = (entity, modifier) => {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (!isUiEnabled)\r\n        return;\r\n    if (modifier.GetName() === \"modifier_enigma_black_hole_thinker\") {\r\n        run = false;\r\n        if (intervalId) {\r\n            clearInterval(intervalId);\r\n            intervalId = null;\r\n        }\r\n    }\r\n};\r\nfunction play() {\r\n    if (randomSong) {\r\n        songNum = Math.floor(Math.random() * listSongs.length);\r\n    }\r\n    else {\r\n        songNum = songIndex;\r\n    }\r\n    let audioFile = `C:\\\\Melonity\\\\sounds\\\\Enigma\\\\${listSongs[songNum]}.wav`;\r\n    console.log(volume);\r\n    Audio.PlaySound(audioFile, volume);\r\n    if (run && !intervalId) {\r\n        intervalId = setInterval(() => {\r\n            Audio.PlaySound(audioFile, volume);\r\n        }, 5000);\r\n    }\r\n}\r\nRegisterScript(SoundEnigma);\r\n\n\n//# sourceURL=webpack:///./src/SoundEnigma.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/SoundEnigma.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;