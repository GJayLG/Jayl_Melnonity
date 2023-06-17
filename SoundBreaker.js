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

/***/ "./src/SoundBreaker.ts":
/*!*****************************!*\
  !*** ./src/SoundBreaker.ts ***!
  \*****************************/
/***/ (() => {

eval("const SoundBreaker = {};\r\nlet run = false;\r\nlet working = true;\r\nlet intervalId;\r\nlet localHero;\r\nlet audioFile = \"C:\\\\Melonity\\\\sounds\\\\SpiritBreaker\\\\run.wav\";\r\nconst path_ = ['Heroes', 'Strength', 'Spirit Breaker', 'Sound'];\r\nlet isUiEnabled = Menu.AddToggle(path_, 'Enable', true)\r\n    .OnChange(state => {\r\n    isUiEnabled = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Включить')\r\n    .GetValue();\r\nlet volume = Menu.AddSlider(path_, \"Volume\", 1, 100, 50)\r\n    .OnChange(state => {\r\n    volume = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Громкость')\r\n    .GetValue();\r\nSoundBreaker.OnScriptLoad = SoundBreaker.OnGameStart = () => {\r\n    localHero = EntitySystem.GetLocalHero();\r\n    if (localHero.GetUnitName() !== 'npc_dota_hero_spirit_breaker') {\r\n        working = false;\r\n        return;\r\n    }\r\n    ;\r\n    console.log(working);\r\n    console.log(isUiEnabled);\r\n};\r\nSoundBreaker.OnModifierCreate = (entity, modifier) => {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (!isUiEnabled) {\r\n        return;\r\n    }\r\n    if (modifier.GetName() === \"modifier_spirit_breaker_charge_of_darkness_target\") {\r\n        run = true;\r\n        play();\r\n    }\r\n};\r\nSoundBreaker.OnModifierDestroy = (entity, modifier) => {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (!isUiEnabled) {\r\n        return;\r\n    }\r\n    if (modifier.GetName() === \"modifier_spirit_breaker_charge_of_darkness_target\") {\r\n        run = false;\r\n        if (intervalId) {\r\n            clearInterval(intervalId);\r\n            intervalId = null;\r\n        }\r\n    }\r\n};\r\nfunction play() {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (!isUiEnabled) {\r\n        return;\r\n    }\r\n    Audio.PlaySound(audioFile, volume);\r\n    if (run && !intervalId) {\r\n        intervalId = setInterval(() => {\r\n            Audio.PlaySound(audioFile, volume);\r\n        }, 4000);\r\n    }\r\n}\r\nRegisterScript(SoundBreaker);\r\n\n\n//# sourceURL=webpack:///./src/SoundBreaker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/SoundBreaker.ts"]();
/******/ 	
/******/ })()
;