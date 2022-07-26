// TypeScript file
abstract class Scene extends eui.Component {
    public constructor() {
        super();
        // 监听组件创建完毕 也就是场景的外观创建完毕
        // this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this);
    }

    protected abstract onComplete(...args:any[]);
    public abstract Update();
    public abstract addListener();
    public abstract removeListener();
    public Reset(...args:any[]):void {
        this.onComplete(...args);
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public createBitmapByName(res_name: string,w?:number,h?:number,isPivotCenter?:boolean): egret.Bitmap {
        return Utility.createBitmapByName(res_name,w,h,isPivotCenter);
    }

    public createButton(res_name: string,w:number,h:number,isPivotCenter?:boolean): egret.DisplayObjectContainer {
        if(isPivotCenter==null){isPivotCenter=false;}
        return Utility.createButton(res_name,w,h,isPivotCenter);
    }

    public createTextField(width:number,height:number,color:number,fontSize?:number,text?:string,fontFamily?:string,HAlign?:string,VAlign?:string):egret.TextField{
        return Utility.createTextField(width,height,color,fontSize,text,fontFamily,HAlign,VAlign);
    }

    public createGif(jsonRes:string,pngRes:string):egret.MovieClip {
        return Utility.createGif(jsonRes,pngRes);
    }

    public getRandomNum(Min, Max): number {
        return Utility.getRandomNum(Min, Max);
    }
}

class SceneManager {
    private static _manager: SceneManager;
    public static get Instance() {
        if (SceneManager._manager == null) {
            SceneManager._manager = new SceneManager();
        }
        return SceneManager._manager;
    }
    public constructor() {
        this.sceneDic = new Object();
    }

    private sceneDic;
    public RegisterScene(name: string, s: Scene) {
        s.name=name;
        this.sceneDic[name] = s;
    }

    public static ScreenWidth: number;
    public static ScreenHeight: number;

    public rootLayer: eui.UILayer;//起始场景
    private currentScene: Scene;//需要显示的场景
    private pop_scene: Scene;//弹出场景层

    public GetCurScene(): Scene {
        return this.currentScene;
    }
    public GetPopScene():Scene{
        return this.pop_scene;
    }
    //切换场景
    public changeScene(name: string,...args:any[]) {
        let s: Scene = this.sceneDic[name];
        if (this.currentScene) {
            this.rootLayer.removeChild(this.currentScene);
            this.currentScene.removeListener();
        }
        this.rootLayer.addChild(s);
        this.currentScene = s;
        this.currentScene.Reset(...args);
        this.currentScene.addListener();
    }

    //弹出场景层
    public pushScene(name: string,...args:any[]) {
        let s: Scene = this.sceneDic[name];
        this.popScene();
        if (!this.pop_scene) {
            this.rootLayer.addChild(s);
            this.pop_scene = s;
            this.pop_scene.Reset(...args);
            this.pop_scene.addListener();
        }
    }
    //关闭场景层
    public popScene() {
        if (this.pop_scene) {
            this.rootLayer.removeChild(this.pop_scene);
            this.pop_scene.removeListener();
            this.pop_scene = null;
        }
    }
}
