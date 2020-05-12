//Initialization
var Colors = ["\u00A79", "\u00A7c", "\u00A7d"]; //Would be in Variables section, but ScriptAPI doesn't parse properly (Top Down)
var scriptName = "\n \n \n \n \n"+Colors[Math.floor(Math.random() * Colors.length)]+"\u00A7lFlexAPI \u00A77("+Colors[Math.floor(Math.random() * Colors.length)]+"\u00A7l"+ Math.random() + "\u00A77)";
var scriptVersion = Math.random();
var scriptAuthor = Colors[Math.floor(Math.random() * Colors.length)]+"\u00A7lEtho \u00A77("+Colors[Math.floor(Math.random() * Colors.length)]+"\u00A7l"+Math.random() + "\u00A77) \n \n \n \n";

//Libraries
var LiquidBounce = Java.type("net.ccbluex.liquidbounce.LiquidBounce");
var HTTPUtils = Java.type("net.ccbluex.liquidbounce.utils.misc.HttpUtils");
var FileManager = Java.type("net.ccbluex.liquidbounce.file.FileManager");
var File = Java.type("java.io.File");
var Script = Java.type("net.ccbluex.liquidbounce.script.Script");

//Variables
var LoadedScripts = [];
var Version = "0.0.1";
var prefix = "\u00A78[\u00A7c\u00A7lFlexAPI\u00A78]";

//Instances
var FlexAPIInstance = new FlexAPI();
var FlexAPICommandInstance = new FlexAPICommand();
var Instance;

var Color = {
    DARK_RED: "\u00A74",
    RED: "\u00A7c",
    GOLD: "\u00A76",
    YELLOW: "\u00A7e",
    DARK_GREEN: "\u00A72",
    GREEN: "\u00A7a",
    AQUA: "\u00A7b",
    DARK_AUQA: "\u00A73",
    DARK_BLUE: "\u00A71",
    BLUE: "\u00A79",
    LIGHT_PURPLE: "\u00A7d",
    DARK_PURPLE: "\u00A75",
    WHITE: "\u00A7f",
    GRAY: "\u00A77",
    DARK_GRAY: "\u00A78",
    BLACK: "\u00A70",
    BOLD: "\u00A7l",
    RESET: "\u00A7r"
}

var ErrorType = {
    FILE_TYPE: "Invalid File Type Found!",
}

function FlexAPI() {
    this.getName = function () {
        return Colors[Math.floor(Math.random() * Colors.length)]+"FlexAPI";
    };
    this.getDescription = function () {
        return "Flex API is script manager built inside of ScriptAPI";
    };

    this.getCategory = function () {
        return "fun";
    };

    this.onEnable = function() {
        var APIVersion = HTTPUtils.get("https://pastebin.com/raw/jQ0WUQqL");
        if(APIVersion != Version) {
            chat.print("\n "+prefix+Color.GRAY+" there is currently a new update for FlexAPI! "+Color.DARK_GRAY+"("+Color.YELLOW+APIVersion+Color.DARK_GRAY+")"+"\n")
        }
        CheckFlexAPI();
    }
}



function FlexAPICommand() {
    this.getName = function() {
        return "FlexAPI";
    };
    this.getAliases = function() {
        return ["f", "F","Flex"];
    };

    this.execute = function(args) {
        if (args.length < 2) {
            for(var i = 0;i < 256;i++) {
                chat.print("\n")
            }
            chat.print("\n "+prefix + Color.DARK_GRAY+" ["+ Color.AQUA+Color.BOLD+"Version"+Color.GRAY+": " + Color.YELLOW + Version + Color.DARK_GRAY+"] " + Color.DARK_GRAY+"["+ Color.DARK_PURPLE+Color.BOLD+"Author"+ Color.GRAY+": "+Color.AQUA+Color.BOLD+ "Etho"+Color.DARK_GRAY+"]"+Color.RESET+"\n")
            chat.print(Color.GOLD+"  ---"+Color.DARK_GRAY+" ["+Color.AQUA+"Scripting"+Color.DARK_GRAY+"]"+Color.GOLD+" --- \n")
            chat.print(Color.DARK_GRAY+Color.BOLD+"  ."+Color.RED+Color.BOLD+"Flex"+Color.GOLD+Color.BOLD+" scripts "+Color.DARK_GRAY+"- "+Color.GRAY+"Current loaded FlexAPI scripts")
            chat.print(Color.DARK_GRAY+Color.BOLD+"  ."+Color.RED+Color.BOLD+"Flex"+Color.GOLD+Color.BOLD+" scripts reload "+Color.DARK_GRAY+"- "+Color.GRAY+"Reloads FlexAPI's scripts"+"\n")
            chat.print(Color.GOLD+"  ---"+Color.DARK_GRAY+" ["+Color.AQUA+"Misc"+Color.DARK_GRAY+"]"+Color.GOLD+" --- \n")
            chat.print(Color.DARK_GRAY+Color.BOLD+"  ."+Color.RED+Color.BOLD+"Flex"+Color.GOLD+Color.BOLD+" version "+Color.DARK_GRAY+"- "+Color.GRAY+"Gets the current version of FlexAPI")
            chat.print(Color.DARK_GRAY+Color.BOLD+"  ."+Color.RED+Color.BOLD+"Flex"+Color.GOLD+Color.BOLD+" reload "+Color.DARK_GRAY+"- "+Color.GRAY+"Reloads FlexAPI/Liquidbounce"+"\n")
        } else {
            switch (args[1].toLowerCase()) {
                case "scripts":
                    CheckFlexAPI();
                    if(args.length < 3) {
                        if(LoadedScripts.length < 1) {
                            chat.print("\n "+prefix+ Color.RED+" There are currently no scripts loaded!")
                        } else {
                            chat.print("")
                            for(var b = 0;b< LoadedScripts.length;b++) {
                                chat.print(""+prefix+Color.YELLOW+" Loaded "+ Color.DARK_GRAY+"("+Color.GRAY + LoadedScripts[b].getName()+Color.DARK_GRAY+")")
                            }
                        }
                    } else {
                        switch (args[2].toLowerCase()) {
                            case "reload":
                                var FlexAPIScripts = new File(mc.mcDataDir, LiquidBounce.CLIENT_NAME + "-1.8"+"/FlexAPI/Scripts");
                                LoadedScripts.length = 0;
                                for(var i = 0;i< FlexAPIScripts.list().length;i++) {
                                    var FlexAPIScript = FlexAPIScripts.listFiles()[i];
                                    if(FlexAPIScript.getName().substring(FlexAPIScript.getName().lastIndexOf(".")+1).toLowerCase().equals("js")){
                                        LiquidBounce.scriptManager.loadScript(FlexAPIScript)
                                        LoadedScripts.push(FlexAPIScript);
                                    } else {
                                        chat.print("\n "+prefix+ Color.RED+" Error! "+Color.DARK_GRAY+"("+Color.GRAY+FlexAPIScript.getName()+Color.DARK_GRAY+")"+Color.RED+" couldn't be loaded. "+ Color.DARK_GRAY+"("+Color.GRAY+ErrorType.FILE_TYPE+Color.DARK_GRAY+")")
                                    }
                                }
                                LiquidBounce.scriptManager.enableScripts();
                                LiquidBounce.fileManager.loadConfig(LiquidBounce.fileManager.clickGuiConfig);
                                chat.print("\n "+prefix+ Color.GREEN+" reloaded Scripts successfully!")
                                break;
                            default:
                                chat.print("\n " +prefix+ Color.RED+ " Command not found! "+Color.DARK_GRAY+"("+Color.GRAY+"Argument: "+args[2]+Color.DARK_GRAY+")")   
                        }
                    }
                    break;
                case "version":
                    var APIVersion = HTTPUtils.get("https://pastebin.com/raw/jQ0WUQqL");
                    if(APIVersion != Version) {
                        chat.print("\n "+prefix+Color.GRAY+" Version "+Color.DARK_GRAY+"("+Color.YELLOW+Version+Color.DARK_GRAY+")"+Color.GRAY+" loaded, Update Found "+Color.DARK_GRAY+"("+Color.YELLOW+APIVersion+Color.DARK_GRAY+")"+"\n")
                    } else {
                        chat.print("\n "+prefix+Color.GRAY+" Version "+Color.DARK_GRAY+"("+Color.YELLOW+Version+Color.DARK_GRAY+")"+Color.GRAY+" loaded, No Updates Found \n")
                    }
                    break;
                case "reload":
                    var Scripts = new File(mc.mcDataDir, LiquidBounce.CLIENT_NAME + "-1.8"+"/scripts");
                    chat.print("\n " +prefix+ Color.RED+" Reloading! "+ Color.DARK_GRAY +"("+Color.GRAY+Scripts+Color.DARK_GRAY+")"+Color.RESET);
                    LiquidBounce.scriptManager.reloadScripts()
                    break;
                default:
                    chat.print("\n " +prefix+ Color.RED+ " Command not found! "+Color.DARK_GRAY+"("+Color.GRAY+"Argument: "+args[1]+Color.DARK_GRAY+")")
            }
        }
    };
}

function CheckFlexAPI() {
    var FlexAPI = new File(mc.mcDataDir, LiquidBounce.CLIENT_NAME + "-1.8"+"/FlexAPI");
    var FlexAPIScripts = new File(mc.mcDataDir, LiquidBounce.CLIENT_NAME + "-1.8"+"/FlexAPI/Scripts");
    if(!FlexAPI.exists()) {
        chat.print("\n "+prefix+Color.GRAY+" Creating FlexAPI directories! " + Color.DARK_GRAY+"("+Color.GRAY+FlexAPI+Color.DARK_GRAY+")")
        FlexAPI.mkdir();
        FlexAPIScripts.mkdir();
    }
    if(!FlexAPIScripts.exists()) {
        chat.print("\n "+prefix+Color.GRAY+" Creating FlexAPI Scripts directory! " + Color.DARK_GRAY+"("+Color.GRAY+FlexAPI+Color.DARK_GRAY+")")
        FlexAPIScripts.mkdir();
    }
}


function onEnable() {
    commandManager.registerCommand(FlexAPICommandInstance);
    Instance = moduleManager.registerModule(FlexAPIInstance);
};

function onDisable() {
    commandManager.unregisterCommand(FlexAPICommandInstance);
    moduleManager.unregisterModule(Instance);
};
