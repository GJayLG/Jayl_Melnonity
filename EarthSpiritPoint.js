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

/***/ "./src/EarthSpirit.ts":
/*!****************************!*\
  !*** ./src/EarthSpirit.ts ***!
  \****************************/
/***/ (() => {

eval("const EarthSmash = {};\r\nlet localHero;\r\nlet localPlayer;\r\nlet previousParticle;\r\nlet kickAbility;\r\nlet driveAbility;\r\nlet pointPos;\r\nlet myPos;\r\nlet newPos;\r\nlet abilityList;\r\nlet working = true;\r\nconst path_ = ['Heroes', 'Strength', 'Earth Spirit', 'Boulder Smash'];\r\nlet kickBind = Menu.AddKeyBind(path_, 'Bind Kick', Enum.ButtonCode.BUTTON_CODE_NONE)\r\n    .SetNameLocale('ru', 'Бинд пинка');\r\nlet pointBind = Menu.AddKeyBind(path_, 'Bind point', Enum.ButtonCode.BUTTON_CODE_NONE)\r\n    .SetNameLocale('ru', 'Бинд точки');\r\nlet Accuracy = Menu.AddSlider(path_, \"Accuracy\", 1, 100, 100, 1)\r\n    .SetNameLocale('ru', 'Точность')\r\n    .OnChange(state => {\r\n    Accuracy = state.newValue;\r\n})\r\n    .GetValue();\r\nlet showTrajectory = Menu.AddToggle(path_, 'Show trajectory', true)\r\n    .SetNameLocale('ru', 'Показывать траекторию')\r\n    .OnChange(state => {\r\n    showTrajectory = state.newValue;\r\n})\r\n    .GetValue();\r\nMenu.GetFolder(path_)\r\n    .SetImage('panorama/images/spellicons/earth_spirit_boulder_smash_png.vtex_c')\r\n    .SetTipLocale('en', 'Auto boulder smash to a specified point')\r\n    .SetTipLocale('ru', 'Авто boulder smash в указанную точку');\r\nEarthSmash.OnScriptLoad = EarthSmash.OnGameStart = () => {\r\n    localHero = EntitySystem.GetLocalHero();\r\n    if (localHero.GetUnitName() !== 'npc_dota_hero_earth_spirit') {\r\n        working = false;\r\n        return;\r\n    }\r\n    ;\r\n    abilityList = localHero.GetAbilities();\r\n    localPlayer = EntitySystem.GetLocalPlayer();\r\n    kickAbility = abilityList[0];\r\n    driveAbility = abilityList[1];\r\n    pointPos = null;\r\n};\r\nEarthSmash.OnKeyEvent = (event) => {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (pointBind.IsKeyDown()) {\r\n        pointPos = Input.GetWorldCursorPos();\r\n        if (previousParticle != null) {\r\n            previousParticle.Destroy();\r\n        }\r\n        previousParticle = Particle.CreateCircle(null, pointPos, 10);\r\n    }\r\n};\r\nfunction calculateDirection(targetPos, pointPos) {\r\n    let dir = pointPos.sub(targetPos);\r\n    dir = dir.Normalized();\r\n    return dir;\r\n}\r\nfunction moveInDirection(direction, targetPos, myPos, target) {\r\n    newPos = targetPos.sub(direction.Scaled(200));\r\n    localHero.MoveTo(newPos);\r\n    const distance = myPos.Distance2D(newPos);\r\n    let intervalId = setInterval(() => {\r\n        myPos = localHero.GetAbsOrigin();\r\n        if (myPos.Distance2D(newPos) < Accuracy) {\r\n            clearInterval(intervalId);\r\n            if (kickAbility.CanCast() && distance < 180) {\r\n                kickAbility.CastTarget(target);\r\n            }\r\n        }\r\n    }, 100);\r\n}\r\nEarthSmash.OnUpdate = () => {\r\n    if (!working) {\r\n        return;\r\n    }\r\n    if (kickBind.IsKeyDown()) {\r\n        if (Engine.OnceAt(0.2)) {\r\n            let target = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);\r\n            let targetPos = target.GetAbsOrigin();\r\n            myPos = localHero.GetAbsOrigin();\r\n            let distance = targetPos.Distance2D(myPos);\r\n            let direction = calculateDirection(targetPos, pointPos);\r\n            if (distance <= driveAbility.GetLevelSpecialValueFor(\"distance\") && driveAbility.CanCast()) {\r\n                if (kickAbility.CanCast()) {\r\n                    driveAbility.CastPosition(targetPos);\r\n                }\r\n                moveInDirection(direction, targetPos, myPos, target);\r\n            }\r\n            else {\r\n                if (kickAbility.CanCast()) {\r\n                    moveInDirection(direction, targetPos, myPos, target);\r\n                }\r\n            }\r\n        }\r\n    }\r\n};\r\nEarthSmash.OnDraw = () => {\r\n    if (!working || !showTrajectory || myPos != undefined || newPos != undefined) {\r\n        return;\r\n    }\r\n    Renderer.SetDrawColor(255, 255, 255, 255);\r\n    Renderer.DrawWorldLine(myPos, newPos);\r\n};\r\nEarthSmash.OnGameEnd = () => {\r\n    localHero = null;\r\n    localPlayer = null;\r\n    kickAbility = null;\r\n    driveAbility = null;\r\n};\r\nRegisterScript(EarthSmash);\r\n\n\n//# sourceURL=webpack:///./src/EarthSpirit.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/EarthSpirit.ts"]();
/******/ 	
/******/ })()
;