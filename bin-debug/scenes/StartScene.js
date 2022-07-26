var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
// TypeScript file
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.bottomNames = ["关卡", "排行", "商店", "分享"];
        _this.bottomRess = ["menu_png", "rank_png", "shop_png", "share_png"];
        _this.bottomBtn = [];
        _this.bottomFunc = [];
        return _this;
        //指定开始场景对应的皮肤文件StartScene.exml
        // this.skinName = "resource/game/StartScene.exml";
    }
    //实现父类的onComplete方法
    StartScene.prototype.onComplete = function () {
        this.gameType = GameType.Normal;
        if (this.bg == null) {
            this.bg = this.createBitmapByName("bg_1_png");
            this.bg.width = SceneManager.ScreenWidth;
            this.bg.height = SceneManager.ScreenHeight;
            this.addChild(this.bg);
        }
        if (this.icon == null) {
            this.icon = this.createBitmapByName("icon_png");
            this.icon.fillMode = egret.BitmapFillMode.SCALE;
            this.icon.width = 500;
            this.icon.height = 370;
            this.icon.anchorOffsetX = this.icon.width / 2;
            this.icon.anchorOffsetY = this.icon.height / 2;
            this.icon.x = SceneManager.ScreenWidth / 2;
            this.icon.y = SceneManager.ScreenHeight / 2 - SceneManager.ScreenHeight / 4;
            this.addChild(this.icon);
        }
        if (this.textfield == null) {
            this.textfield = new egret.TextField();
            this.textfield.text = "WaterPuzzle";
            this.textfield.fontFamily = "myFirstFont";
            this.textfield.textColor = 0x00FFFF;
            this.textfield.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
            this.textfield.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.textfield.width = SceneManager.ScreenWidth;
            this.textfield.height = 400;
            this.textfield.anchorOffsetX = this.textfield.width / 2;
            this.textfield.anchorOffsetY = this.textfield.height / 2;
            this.textfield.x = SceneManager.ScreenWidth / 2;
            this.textfield.y = SceneManager.ScreenHeight / 2;
            this.textfield.size = 100;
            this.addChild(this.textfield);
        }
        this.level = PlayerData.Instance.GetCurLevel(this.gameType);
        var text = "LEVEL " + String(this.level);
        if (this.levelTxt == null) {
            this.levelTxt = this.createTextField(400, 200, 0xFFFFFF, 30, text);
            this.levelTxt.textAlign = egret.HorizontalAlign.CENTER; //水平右对齐，相对于 textField 控件自身的 width 与 height
            this.levelTxt.anchorOffsetX = this.levelTxt.width / 2;
            this.levelTxt.anchorOffsetY = this.levelTxt.height / 2;
            this.levelTxt.x = SceneManager.ScreenWidth / 2;
            this.levelTxt.y = SceneManager.ScreenHeight / 2 + 100;
            this.levelTxt.size = 30;
            this.addChild(this.levelTxt);
        }
        else {
            this.levelTxt.text = text;
        }
        if (this.startBtn == null) {
            this.startBtn = this.createButton("start_btn_png", 230, 120);
            this.startBtn.anchorOffsetX = this.startBtn.width / 2;
            this.startBtn.anchorOffsetY = this.startBtn.height / 2;
            this.startBtn.x = SceneManager.ScreenWidth / 2;
            this.startBtn.y = SceneManager.ScreenHeight / 2 + 230;
            this.addChild(this.startBtn);
        }
        this.InitBottom();
    };
    StartScene.prototype.InitBottom = function () {
        var len = this.bottomNames.length;
        for (var i = 0; i < len; i++) {
            this.InitBottomButton(i, len);
        }
    };
    StartScene.prototype.InitBottomButton = function (index, length) {
        if (this.bottomBtn[index] == null) {
            var resName = this.bottomRess[index];
            var txt = this.bottomNames[index];
            var btn = this.createButton(resName, 100, 100);
            btn.anchorOffsetX = btn.width / 2;
            btn.anchorOffsetY = btn.height / 2;
            btn.x = SceneManager.ScreenWidth / (length + 1) * (index + 1);
            btn.y = SceneManager.ScreenHeight - 240;
            var txtField = this.createTextField(200, 100, 0xFFFFFF, 30, txt);
            txtField.textAlign = egret.HorizontalAlign.CENTER;
            txtField.x = -btn.width / 2;
            txtField.y = btn.height / 2;
            btn.addChild(txtField);
            this.addChild(btn);
            this.bottomBtn[index] = btn;
        }
    };
    StartScene.prototype.Update = function () {
        // this.textfield.text = "WaterPuzzle";
    };
    StartScene.prototype.OnTouch = function () {
        AudioManager.Instance.PlaySound("mainBtn_wav");
        //切换场景
        SceneManager.Instance.changeScene("GameScene");
    };
    StartScene.prototype.onClickBottom = function (index, evt) {
        console.log(index);
        if (index == 0) {
            SceneManager.Instance.pushScene("SelectLevelScene", this.gameType);
        }
        else if (index == 1) {
            SceneManager.Instance.pushScene("RankScene");
        }
        else if (index == 2) {
            SceneManager.Instance.pushScene("ShopScene", 0);
        }
        else if (index == 3) {
            //TODO：调用微信
        }
    };
    StartScene.prototype.addListener = function () {
        Utility.ButtonActive(this.startBtn, true);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouch, this);
        var len = this.bottomBtn.length;
        for (var i = 0; i < len; i++) {
            var func = this.onClickBottom.bind(this, i);
            this.bottomFunc[i] = func;
            Utility.ButtonActive(this.bottomBtn[i], true);
            this.bottomBtn[i].addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
        }
    };
    StartScene.prototype.removeListener = function () {
        Utility.ButtonActive(this.startBtn, false);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouch, this);
        var len = this.bottomBtn.length;
        for (var i = 0; i < len; i++) {
            var func = this.bottomFunc[i];
            Utility.ButtonActive(this.bottomBtn[i], false);
            this.bottomBtn[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
        }
        // egret.Tween.removeAllTweens();
    };
    return StartScene;
}(Scene));
__reflect(StartScene.prototype, "StartScene");
//# sourceMappingURL=StartScene.js.map