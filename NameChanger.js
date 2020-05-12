var scriptName = "DisplayChanger";
var scriptVersion = 1.0+Math.random();
var scriptAuthor = "Etho";
var Display = Java.type('org.lwjgl.opengl.Display')
var Command = new DisplayCommand();
var str = "";

var Color = {
    DARK_RED: "\u00A74",
    RED: "\u00A7c",
    ORANGE: "\u00A76",
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

function DisplayCommand() {
    this.getName = function() {
        return "DisplayName";
    };
    this.getAliases = function() {
        return ["D"];
    };

    this.execute = function(args) {
        if (args.length < 2) {
            chat.print(Color.DARK_GRAY+"["+Color.GRAY+"Display"+Color.DARK_GRAY+"] "+Color.RED+"Usage: .D "+Color.DARK_GRAY+"<"+Color.ORANGE+"Name"+Color.DARK_GRAY+">"+Color.GRAY+".")
        } else {
            str = "";
            for(var i = 0;i<args.length;i++) {
                if(i != 0)
                    str += args[i]+" ";
            }
            str = str.substring(" ",str.length-1)
            chat.print(Color.DARK_GRAY+"["+Color.GRAY+"Display"+Color.DARK_GRAY+"] "+Color.GRAY+"Name"+Color.DARK_GRAY+": "+Color.GRAY+str+".")
            Display.setTitle(str)
        }
    };
}

function onEnable() {
    commandManager.registerCommand(Command);
};

function onDisable() {
    commandManager.unregisterCommand(Command);
};
