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

/***/ "./src/Custom Buy.ts":
/*!***************************!*\
  !*** ./src/Custom Buy.ts ***!
  \***************************/
/***/ (() => {

eval("let CustomBuy = {};\r\nconst path_ = ['Custom Buy'];\r\nlet CasterButton = Menu.AddButton(path_, \"Caster Rapier\", CasterRapier);\r\nlet BananaButton = Menu.AddButton(path_, \"Banana\", BuyBanana);\r\nlet myhero = EntitySystem.GetLocalHero();\r\nlet myplayer = EntitySystem.GetLocalPlayer();\r\nfunction CasterRapier() {\r\n    if (!myplayer || !myhero)\r\n        return;\r\n    myplayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, myhero, new Vector(0, 0, 0), 1801, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, myhero);\r\n}\r\nfunction BuyBanana() {\r\n    if (!myplayer || !myhero)\r\n        return;\r\n    myplayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, myhero, new Vector(0, 0, 0), 1164, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, myhero);\r\n}\r\nCustomBuy.OnGameStart = CustomBuy.OnScriptLoad = () => {\r\n    myhero = EntitySystem.GetLocalHero();\r\n    myplayer = EntitySystem.GetLocalPlayer();\r\n};\r\nRegisterScript(CustomBuy);\r\n\n\n//# sourceURL=webpack:///./src/Custom_Buy.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/Custom Buy.ts"]();
/******/ 	
/******/ })()
;