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

/***/ "./src/CreepBlock.ts":
/*!***************************!*\
  !*** ./src/CreepBlock.ts ***!
  \***************************/
/***/ (() => {

eval("const CreepBlock = {};\r\nconst path_ = ['CreepBlocker by JayL'];\r\nconst general_path = [...path_, 'General'];\r\nconst advanced_path = [...path_, 'Advanced'];\r\nconst order_path = [...advanced_path, 'Orders'];\r\nlet myHero;\r\nlet myPlayer;\r\nlet distanceToTarget;\r\nlet isUiEnabled = Menu.AddToggle(path_, 'Toggle', true)\r\n    .OnChange(state => {\r\n    isUiEnabled = state.newValue;\r\n})\r\n    .SetNameLocale('ru', 'Включить')\r\n    .GetValue();\r\nlet bindKey = Menu.AddKeyBind(path_, 'Hotkey', Enum.ButtonCode.KEY_TAB)\r\n    .SetNameLocale('ru', 'Горячая клавиша');\r\nlet isBar = Menu.AddToggle(general_path, 'Progress Bar', true)\r\n    .SetNameLocale('ru', 'Прогресс бар')\r\n    .GetValue();\r\nlet maxDistance = Menu.AddSlider(advanced_path, 'Max distance', 0, 2000, 1000)\r\n    .SetNameLocale('ru', 'Максимальная дистанция')\r\n    .SetTipLocale('ru', 'Максимальная дистанция для поиска крипов.')\r\n    .SetTipLocale('en', 'Maximum distance for the creep search.')\r\n    .OnChange(state => {\r\n    maxDistance = state.newValue;\r\n})\r\n    .GetValue();\r\nlet minDistance = Menu.AddSlider(advanced_path, 'Min distance', 0, 200, 50)\r\n    .SetNameLocale('ru', 'Минимальная дистанция')\r\n    .SetTipLocale('ru', 'Минимальная дистанция для поиска крипов.')\r\n    .SetTipLocale('en', 'Minimum distance for the creep search.')\r\n    .OnChange(state => {\r\n    minDistance = state.newValue;\r\n})\r\n    .GetValue();\r\nlet maxTargetDistance = Menu.AddSlider(advanced_path, 'Max target distance', 0, 800, 500)\r\n    .SetNameLocale('ru', 'Максимальная дистанция до цели')\r\n    .SetTipLocale('ru', 'Максимальная дистанция до цели.')\r\n    .SetTipLocale('en', 'Maximum distance for the target.')\r\n    .OnChange(state => {\r\n    maxTargetDistance = state.newValue;\r\n})\r\n    .GetValue();\r\nlet stopDelay = Menu.AddSlider(advanced_path, 'Stop Delay', 0.01, 0.1, 0.06, 0.01)\r\n    .SetNameLocale('ru', 'Задержка между стопом')\r\n    .SetTipLocale('ru', 'Задержка между командами \"Stop\".')\r\n    .SetTipLocale('en', 'Delay between \"Stop\" commands.')\r\n    .OnChange(state => {\r\n    stopDelay = state.newValue;\r\n})\r\n    .GetValue();\r\nlet orderInterval = Menu.AddSlider(order_path, 'Order Interval', 0.1, 1, 0.2, 0.1)\r\n    .SetNameLocale('ru', 'Интервал между ордерами')\r\n    .SetTipLocale('ru', 'Интервал между выдачей ордеров.')\r\n    .SetTipLocale('en', 'Interval between issuing orders.')\r\n    .OnChange(state => {\r\n    orderInterval = state.newValue;\r\n})\r\n    .GetValue();\r\nlet positionChangeThreshold = Menu.AddSlider(order_path, 'Position Change Threshold', 10, 200, 20, 10)\r\n    .SetNameLocale('ru', 'Порог изменения позиции')\r\n    .SetTipLocale('ru', 'Минимальное изменение позиции для выдачи нового ордера.')\r\n    .SetTipLocale('en', 'Minimum position change for issuing a new order.')\r\n    .OnChange(state => {\r\n    positionChangeThreshold = state.newValue;\r\n})\r\n    .GetValue();\r\nlet orderTimer = 0;\r\nlet ordersCount = 0;\r\nlet lastOrderPosition = null;\r\nlet font = Renderer.LoadFont('Arial', 18, Enum.FontWeight.BOLD);\r\nfunction getCreepSpeed(creeps) {\r\n    let totalSpeed = 0;\r\n    let count = 0;\r\n    for (const creep of creeps) {\r\n        if (creep.IsCreep() && !creep.IsDormant() && creep.IsAlive()) {\r\n            totalSpeed += creep.GetMoveSpeed();\r\n            count++;\r\n        }\r\n    }\r\n    return totalSpeed / count;\r\n}\r\nfunction getCreepPriority(creep, target) {\r\n    const distance = target.sub(creep.GetAbsOrigin()).Length2D();\r\n    const speed = creep.GetMoveSpeed();\r\n    const health = creep.GetHealth();\r\n    const distanceWeight = 1;\r\n    const speedWeight = 1;\r\n    const healthWeight = 1;\r\n    return distanceWeight / distance + speedWeight * speed + healthWeight / health;\r\n}\r\nfunction getClosestCreep(creeps, target) {\r\n    let highestPriority = -Infinity;\r\n    let closestCreep = null;\r\n    for (const creep of creeps) {\r\n        if (creep.IsCreep() && !creep.IsDormant() && creep.IsAlive()) {\r\n            const priority = getCreepPriority(creep, target);\r\n            if (priority > highestPriority) {\r\n                highestPriority = priority;\r\n                closestCreep = creep;\r\n            }\r\n        }\r\n    }\r\n    return closestCreep;\r\n}\r\nfunction stopCreepers() {\r\n    const creeps = myHero.GetUnitsInRadius(maxDistance, Enum.TeamType.TEAM_FRIEND);\r\n    if (!creeps || creeps.length <= 0) {\r\n        return;\r\n    }\r\n    const averageCreepSpeed = Math.max(getCreepSpeed(creeps), myHero.GetMoveSpeed());\r\n    const target = myHero.GetAbsOrigin();\r\n    const closestCreep = getClosestCreep(creeps, target);\r\n    if (closestCreep) {\r\n        const target = predictCreepPosition(closestCreep, 0.5, averageCreepSpeed);\r\n        const heroPos = myHero.GetAbsOrigin();\r\n        distanceToTarget = heroPos.sub(target).Length2D();\r\n        if (distanceToTarget > maxTargetDistance) {\r\n            move(target);\r\n        }\r\n        else if (distanceToTarget > minDistance) {\r\n            const direction = closestCreep.GetRotation().GetForward();\r\n            const offset = new Vector(direction.x * (distanceToTarget - minDistance), direction.y * (distanceToTarget - minDistance), 0);\r\n            const finalTarget = target.add(offset);\r\n            let t = Humanizer.CalculateTimeForOrder(finalTarget);\r\n            if (Engine.OnceAt(t) && canIssueOrder(target)) {\r\n                move(finalTarget);\r\n            }\r\n        }\r\n        else {\r\n            const direction = closestCreep.GetRotation().GetForward();\r\n            const offset = new Vector(direction.x * 50 - 25, direction.y * 50 - 25, 0);\r\n            const finalTarget = target.add(offset);\r\n            stop(finalTarget);\r\n        }\r\n    }\r\n}\r\nfunction predictCreepPosition(creep, t, speed) {\r\n    const totalLatency = (NetChannel.GetAvgLatency(Enum.Flow.FLOW_INCOMING) + NetChannel.GetAvgLatency(Enum.Flow.FLOW_OUTGOING)) * 2;\r\n    const delay = t + totalLatency / 1000;\r\n    const creepPos = creep.GetAbsOrigin();\r\n    const direction = creep.GetRotation().GetForward();\r\n    let dx = direction.x * speed * delay;\r\n    let dy = direction.y * speed * delay;\r\n    let dz = direction.z * speed * delay;\r\n    const range = 50;\r\n    dx += Math.random() * range - range / 2;\r\n    dy += Math.random() * range - range / 2;\r\n    return creepPos.add(new Vector(dx, dy, dz));\r\n}\r\nfunction canIssueOrder(target) {\r\n    const currentTime = GameRules.GetGameTime();\r\n    if (currentTime - orderTimer >= orderInterval) {\r\n        orderTimer = currentTime;\r\n        ordersCount = 0;\r\n    }\r\n    ordersCount++;\r\n    if (lastOrderPosition === null || target.sub(lastOrderPosition).Length2D() > positionChangeThreshold) {\r\n        lastOrderPosition = target;\r\n        return ordersCount <= 10;\r\n    }\r\n    return false;\r\n}\r\nfunction addRandomOffset(target) {\r\n    const offset = new Vector((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, 0);\r\n    return target.add(offset);\r\n}\r\nfunction move(target) {\r\n    target = addRandomOffset(target);\r\n    let t = Humanizer.CalculateTimeForOrder(target);\r\n    if (Engine.OnceAt(t) && canIssueOrder(target)) {\r\n        Humanizer.MoveCursorTo(target, (state) => {\r\n            if (state.result) {\r\n                myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_POSITION, null, target, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, myHero, false, true);\r\n            }\r\n        });\r\n    }\r\n}\r\nfunction stop(target) {\r\n    target = addRandomOffset(target);\r\n    let t = Humanizer.CalculateTimeForOrder(target) + stopDelay;\r\n    if (Engine.OnceAt(t) && canIssueOrder(target)) {\r\n        Humanizer.MoveCursorTo(target, (state) => {\r\n            if (state.result) {\r\n                myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_STOP, null, null, null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, myHero, false, true);\r\n            }\r\n        });\r\n    }\r\n}\r\nfunction renderBar(distanceToTarget) {\r\n    const heroPos = myHero.GetAbsOrigin();\r\n    const barHeight = 8;\r\n    const barWidth = Math.max(20, 100 * (distanceToTarget / 300));\r\n    const startColor = [94, 207, 91, 255];\r\n    const endColor = [255, 216, 80, 255];\r\n    const gradient = Math.min(1, distanceToTarget / 300);\r\n    const barColor = [\r\n        Math.round(startColor[0] + (endColor[0] - startColor[0]) * gradient),\r\n        Math.round(startColor[1] + (endColor[1] - startColor[1]) * gradient),\r\n        Math.round(startColor[2] + (endColor[2] - startColor[2]) * gradient),\r\n        Math.round(startColor[3] + (endColor[3] - startColor[3]) * gradient),\r\n    ];\r\n    const barOffset = new Vector(-barWidth / 2, 0, 330);\r\n    const barPos = heroPos.add(barOffset);\r\n    const shadowOffset = new Vector(0, -2, -2);\r\n    const shadowColor = [70, 70, 70, 150];\r\n    const shadowPos = barPos.add(shadowOffset);\r\n    Renderer.SetDrawColor(shadowColor[0], shadowColor[1], shadowColor[2], shadowColor[3]);\r\n    Renderer.DrawWorldFilledRect(shadowPos, barWidth, barHeight, 0, 0);\r\n    Renderer.SetDrawColor(barColor[0], barColor[1], barColor[2], barColor[3]);\r\n    Renderer.DrawWorldFilledRect(barPos, barWidth, barHeight, 0, 0);\r\n    const textOffset = new Vector(0, 0, 370);\r\n    const textPos = heroPos.add(textOffset);\r\n    const text = \"[CreepBlocker ON]\";\r\n    Renderer.SetDrawColor(255, 255, 255, 255);\r\n    Renderer.DrawWorldText(font, textPos.sub(new Vector(Renderer.GetTextSize(font, text)[0] / 2, 0, 0)), text, 0, 0);\r\n}\r\nCreepBlock.OnScriptLoad = function () {\r\n    myHero = EntitySystem.GetLocalHero();\r\n    myPlayer = EntitySystem.GetLocalPlayer();\r\n};\r\nCreepBlock.OnGameStart = function () {\r\n    myHero = EntitySystem.GetLocalHero();\r\n    myPlayer = EntitySystem.GetLocalPlayer();\r\n};\r\nCreepBlock.OnGameEnd = function () {\r\n    myHero = null;\r\n    myPlayer = null;\r\n    distanceToTarget = null;\r\n};\r\nCreepBlock.OnUpdate = function () {\r\n    if (!isUiEnabled)\r\n        return;\r\n    if (bindKey.IsKeyDown()) {\r\n        stopCreepers();\r\n    }\r\n};\r\nCreepBlock.OnDraw = function () {\r\n    if (bindKey.IsKeyDown()) {\r\n        renderBar(distanceToTarget);\r\n    }\r\n};\r\nRegisterScript(CreepBlock);\r\n\n\n//# sourceURL=webpack:///./src/CreepBlock.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/CreepBlock.ts"]();
/******/ 	
/******/ })()
;