// api/loader.js
export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    
    // BLOCK all browsers
    if (userAgent.includes('Mozilla') && !userAgent.includes('Roblox')) {
        res.writeHead(302, { 'Location': 'https://greatnessloader.vercel.app' });
        return res.end();
    }
    
    // Your actual script (hidden from everyone)
    const hiddenScript = `-- Greatness Hub Universal Loader
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local GameConfigs = {
    [112757576021097] = {
        name = "Defuse Division",
        script = "https://raw.githubusercontent.com/Sandro2222/GHscripts/refs/heads/main/DefuseDivision",
        color = Color3.fromRGB(0, 170, 255)
    },
    [79393329652220] = {
        name = "Defusal FPS", 
        script = "https://raw.githubusercontent.com/Sandro2222/GHscripts/refs/heads/main/DefusalFPS",
        color = Color3.fromRGB(255, 85, 0)
    },
    [301549746] = {
        name = "CB Greatness",
        script = "https://raw.githubusercontent.com/Sandro2222/GHscripts/refs/heads/main/CounterBloxGH",
        color = Color3.fromRGB(255, 0, 127)
    },
    [79546208627805] = {
        name = "99 Nights Greatness",
        script = "https://raw.githubusercontent.com/Sandro2222/GHscripts/refs/heads/main/99NightsGH",
        color = Color3.fromRGB(170, 0, 255)
    },
    [17625359962] = {
        name = "Rivals Greatness",
        script = "https://raw.githubusercontent.com/Sandro2222/GHscripts/refs/heads/main/RivalsGH",
        color = Color3.fromRGB(0, 255, 127)
    },
    [99567941238278] = {
        name = "Greatness Hub & Horizon Hub",
        script = "https://raw.githubusercontent.com/Sandro2222/GHscripts/refs/heads/main/InkGameGH",
        color = Color3.fromRGB(255, 0, 0)
    }
}

-- Your notification function and everything else here...
function notify(title, message, color, duration)
    -- Your existing notification code
end

function loadGameScript()
    local currentPlaceId = game.PlaceId
    local config = GameConfigs[currentPlaceId]
    
    if config then
        notify("🎮 Game Detected", config.name, config.color, 3)
        task.wait(1)
        notify("📥 Loading Script", "Executing " .. config.name .. "...", config.color, 2)
        
        local success, errorMsg = pcall(function()
            local scriptSource = game:HttpGet(config.script, true)
            loadstring(scriptSource)()
        end)
        
        if success then
            notify("✅ Success", config.name .. " loaded successfully!", Color3.fromRGB(0, 255, 0), 4)
        else
            notify("❌ Error", "Failed to load " .. config.name .. "\\n" .. errorMsg, Color3.fromRGB(255, 0, 0), 6)
        end
    else
        local supportedGames = ""
        for placeId, gameConfig in pairs(GameConfigs) do
            supportedGames = supportedGames .. "• " .. gameConfig.name .. "\\n"
        end
        
        notify("❌ Game Not Supported", 
            "This game is not in our database!\\n\\nSupported Games:\\n" .. supportedGames, 
            Color3.fromRGB(255, 100, 0), 8)
    end
end

notify("🚀 Greatness Loader", "Initializing game detection...", Color3.fromRGB(0, 170, 255), 2)
task.wait(2)
loadGameScript()`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(hiddenScript);
}
