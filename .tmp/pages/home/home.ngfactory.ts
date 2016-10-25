/**
 * This file is generated by the Angular 2 template compiler.
 * Do not edit.
 */
 /* tslint:disable */

import * as import0 from '@angular/core/src/render/api';
import * as import1 from '@angular/core/src/linker/view';
import * as import2 from '@angular/core/src/linker/element';
import * as import3 from './home';
import * as import4 from '@angular/core/src/linker/view_utils';
import * as import5 from '@angular/core/src/di/injector';
import * as import6 from '@angular/core/src/linker/view_type';
import * as import7 from '@angular/core/src/change_detection/change_detection';
import * as import8 from 'ionic-angular/navigation/nav-controller';
import * as import9 from 'ionic-angular/components/menu/menu-controller';
import * as import10 from '../../service/varios.service';
import * as import11 from '@angular/core/src/metadata/view';
import * as import12 from '@angular/core/src/linker/component_factory';
import * as import13 from 'ionic-angular/components/toolbar/toolbar';
import * as import14 from 'ionic-angular/components/navbar/navbar';
import * as import15 from 'ionic-angular/components/button/button';
import * as import16 from 'ionic-angular/components/menu/menu-toggle';
import * as import17 from 'ionic-angular/components/toolbar/toolbar-item';
import * as import18 from '@angular/core/src/linker/query_list';
import * as import19 from 'ionic-angular/components/icon/icon';
import * as import20 from 'ionic-angular/components/toolbar/toolbar-title';
import * as import21 from 'ionic-angular/components/content/content';
import * as import22 from 'ionic-angular/components/list/list';
import * as import23 from 'ionic-angular/components/item/item';
import * as import24 from 'ionic-angular/config/config';
import * as import25 from '@angular/core/src/linker/element_ref';
import * as import26 from 'ionic-angular/navigation/view-controller';
import * as import27 from '../../node_modules/ionic-angular/components/navbar/navbar.ngfactory';
import * as import28 from 'ionic-angular/components/app/app';
import * as import29 from '../../node_modules/ionic-angular/components/button/button.ngfactory';
import * as import30 from '../../node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory';
import * as import31 from '../../node_modules/ionic-angular/components/content/content.ngfactory';
import * as import32 from 'ionic-angular/util/keyboard';
import * as import33 from '@angular/core/src/zone/ng_zone';
import * as import34 from 'ionic-angular/components/tabs/tabs';
import * as import35 from 'ionic-angular/gestures/gesture-controller';
import * as import36 from '../../node_modules/ionic-angular/components/item/item.ngfactory';
import * as import37 from 'ionic-angular/util/form';
var renderType_HomePage_Host:import0.RenderComponentType = (null as any);
class _View_HomePage_Host0 extends import1.AppView<any> {
  _el_0:any;
  /*private*/ _appEl_0:import2.AppElement;
  _HomePage_0_4:import3.HomePage;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_HomePage_Host0,renderType_HomePage_Host,import6.ViewType.HOST,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    this._el_0 = this.selectOrCreateHostElement('ng-component',rootSelector,(null as any));
    this._appEl_0 = new import2.AppElement(0,(null as any),this,this._el_0);
    var compView_0:any = viewFactory_HomePage0(this.viewUtils,this.injector(0),this._appEl_0);
    this._HomePage_0_4 = new import3.HomePage(this.parentInjector.get(import8.NavController),this.parentInjector.get(import9.MenuController),this.parentInjector.get(import10.VariosService));
    this._appEl_0.initComponent(this._HomePage_0_4,[],compView_0);
    compView_0.create(this._HomePage_0_4,this.projectableNodes,(null as any));
    this.init([].concat([this._el_0]),[this._el_0],[],[]);
    return this._appEl_0;
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import3.HomePage) && (0 === requestNodeIndex))) { return this._HomePage_0_4; }
    return notFoundResult;
  }
}
function viewFactory_HomePage_Host0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<any> {
  if ((renderType_HomePage_Host === (null as any))) { (renderType_HomePage_Host = viewUtils.createRenderComponentType('',0,import11.ViewEncapsulation.None,[],{})); }
  return new _View_HomePage_Host0(viewUtils,parentInjector,declarationEl);
}
export const HomePageNgFactory:import12.ComponentFactory<import3.HomePage> = new import12.ComponentFactory<import3.HomePage>('ng-component',viewFactory_HomePage_Host0,import3.HomePage);
const styles_HomePage:any[] = [];
var renderType_HomePage:import0.RenderComponentType = (null as any);
class _View_HomePage0 extends import1.AppView<import3.HomePage> {
  _el_0:any;
  _Header_0_3:import13.Header;
  _text_1:any;
  _el_2:any;
  /*private*/ _appEl_2:import2.AppElement;
  _Navbar_2_4:import14.Navbar;
  _text_3:any;
  _el_4:any;
  /*private*/ _appEl_4:import2.AppElement;
  _Button_4_4:import15.Button;
  _MenuToggle_4_5:import16.MenuToggle;
  _ToolbarItem_4_6:import17.ToolbarItem;
  _query_Button_4_0:import18.QueryList<any>;
  _text_5:any;
  _el_6:any;
  _Icon_6_3:import19.Icon;
  _text_7:any;
  _text_8:any;
  _el_9:any;
  /*private*/ _appEl_9:import2.AppElement;
  _ToolbarTitle_9_4:import20.ToolbarTitle;
  _text_10:any;
  _text_11:any;
  _text_12:any;
  _text_13:any;
  _el_14:any;
  /*private*/ _appEl_14:import2.AppElement;
  _Content_14_4:import21.Content;
  _text_15:any;
  _el_16:any;
  _text_17:any;
  _text_18:any;
  _el_19:any;
  _List_19_3:import22.List;
  _text_20:any;
  _el_21:any;
  /*private*/ _appEl_21:import2.AppElement;
  _Item_21_4:import23.Item;
  _ItemContent_21_5:import23.ItemContent;
  _query_Label_21_0:import18.QueryList<any>;
  _query_Button_21_1:import18.QueryList<any>;
  _query_Icon_21_2:import18.QueryList<any>;
  _text_22:any;
  _el_23:any;
  /*private*/ _appEl_23:import2.AppElement;
  _Button_23_4:import15.Button;
  _text_24:any;
  _text_25:any;
  _text_26:any;
  _el_27:any;
  /*private*/ _appEl_27:import2.AppElement;
  _Item_27_4:import23.Item;
  _ItemContent_27_5:import23.ItemContent;
  _query_Label_27_0:import18.QueryList<any>;
  _query_Button_27_1:import18.QueryList<any>;
  _query_Icon_27_2:import18.QueryList<any>;
  _text_28:any;
  _el_29:any;
  /*private*/ _appEl_29:import2.AppElement;
  _Button_29_4:import15.Button;
  _text_30:any;
  _text_31:any;
  _text_32:any;
  _text_33:any;
  _text_34:any;
  /*private*/ _expr_0:any;
  /*private*/ _expr_1:any;
  /*private*/ _expr_3:any;
  /*private*/ _expr_4:any;
  /*private*/ _expr_5:any;
  /*private*/ _expr_6:any;
  /*private*/ _expr_7:any;
  /*private*/ _expr_8:any;
  constructor(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement) {
    super(_View_HomePage0,renderType_HomePage,import6.ViewType.COMPONENT,viewUtils,parentInjector,declarationEl,import7.ChangeDetectorStatus.CheckAlways);
  }
  createInternal(rootSelector:string):import2.AppElement {
    const parentRenderNode:any = this.renderer.createViewRoot(this.declarationAppElement.nativeElement);
    this._el_0 = this.renderer.createElement(parentRenderNode,'ion-header',(null as any));
    this._Header_0_3 = new import13.Header(this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_0),this.renderer,this.parentInjector.get(import26.ViewController,(null as any)));
    this._text_1 = this.renderer.createText(this._el_0,'\n  ',(null as any));
    this._el_2 = this.renderer.createElement(this._el_0,'ion-navbar',(null as any));
    this.renderer.setElementAttribute(this._el_2,'class','toolbar');
    this._appEl_2 = new import2.AppElement(2,0,this,this._el_2);
    var compView_2:any = import27.viewFactory_Navbar0(this.viewUtils,this.injector(2),this._appEl_2);
    this._Navbar_2_4 = new import14.Navbar(this.parentInjector.get(import28.App),this.parentInjector.get(import26.ViewController,(null as any)),this.parentInjector.get(import8.NavController,(null as any)),this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_2),this.renderer);
    this._appEl_2.initComponent(this._Navbar_2_4,[],compView_2);
    this._text_3 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_4 = this.renderer.createElement((null as any),'button',(null as any));
    this.renderer.setElementAttribute(this._el_4,'ion-button','');
    this.renderer.setElementAttribute(this._el_4,'menuToggle','');
    this._appEl_4 = new import2.AppElement(4,2,this,this._el_4);
    var compView_4:any = import29.viewFactory_Button0(this.viewUtils,this.injector(4),this._appEl_4);
    this._Button_4_4 = new import15.Button('','',this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_4),this.renderer);
    this._MenuToggle_4_5 = new import16.MenuToggle(this.parentInjector.get(import9.MenuController),new import25.ElementRef(this._el_4),this.parentInjector.get(import26.ViewController,(null as any)),this._Navbar_2_4);
    this._ToolbarItem_4_6 = new import17.ToolbarItem(this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_4),this.renderer,this.parentInjector.get(import13.Toolbar,(null as any)),this._Navbar_2_4);
    this._query_Button_4_0 = new import18.QueryList<any>();
    this._appEl_4.initComponent(this._Button_4_4,[],compView_4);
    this._text_5 = this.renderer.createText((null as any),'\n      ',(null as any));
    this._el_6 = this.renderer.createElement((null as any),'ion-icon',(null as any));
    this.renderer.setElementAttribute(this._el_6,'name','menu');
    this.renderer.setElementAttribute(this._el_6,'role','img');
    this._Icon_6_3 = new import19.Icon(this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_6),this.renderer);
    this._text_7 = this.renderer.createText((null as any),'\n    ',(null as any));
      compView_4.create(this._Button_4_4,[[].concat([
        this._text_5,
        this._el_6,
        this._text_7
      ]
    )],(null as any));
    this._text_8 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._el_9 = this.renderer.createElement((null as any),'ion-title',(null as any));
    this._appEl_9 = new import2.AppElement(9,2,this,this._el_9);
    var compView_9:any = import30.viewFactory_ToolbarTitle0(this.viewUtils,this.injector(9),this._appEl_9);
    this._ToolbarTitle_9_4 = new import20.ToolbarTitle(this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_9),this.renderer,this.parentInjector.get(import13.Toolbar,(null as any)),this._Navbar_2_4);
    this._appEl_9.initComponent(this._ToolbarTitle_9_4,[],compView_9);
    this._text_10 = this.renderer.createText((null as any),'\n      Partes de Trabajo\n    ',(null as any));
    compView_9.create(this._ToolbarTitle_9_4,[[].concat([this._text_10])],(null as any));
    this._text_11 = this.renderer.createText((null as any),'\n  ',(null as any));
    compView_2.create(this._Navbar_2_4,[
      [].concat([this._el_4]),
      [],
      [],
      [].concat([
        this._text_3,
        this._text_8,
        this._el_9,
        this._text_11
      ]
      )
    ]
    ,(null as any));
    this._text_12 = this.renderer.createText(this._el_0,'\n',(null as any));
    this._text_13 = this.renderer.createText(parentRenderNode,'\n\n',(null as any));
    this._el_14 = this.renderer.createElement(parentRenderNode,'ion-content',(null as any));
    this.renderer.setElementAttribute(this._el_14,'class','home');
    this.renderer.setElementAttribute(this._el_14,'padding','');
    this._appEl_14 = new import2.AppElement(14,(null as any),this,this._el_14);
    var compView_14:any = import31.viewFactory_Content0(this.viewUtils,this.injector(14),this._appEl_14);
    this._Content_14_4 = new import21.Content(this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_14),this.renderer,this.parentInjector.get(import28.App),this.parentInjector.get(import32.Keyboard),this.parentInjector.get(import33.NgZone),this.parentInjector.get(import26.ViewController,(null as any)),this.parentInjector.get(import34.Tabs,(null as any)));
    this._appEl_14.initComponent(this._Content_14_4,[],compView_14);
    this._text_15 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_16 = this.renderer.createElement((null as any),'h2',(null as any));
    this.renderer.setElementAttribute(this._el_16,'style','text-align:center');
    this._text_17 = this.renderer.createText(this._el_16,'',(null as any));
    this._text_18 = this.renderer.createText((null as any),'\n  ',(null as any));
    this._el_19 = this.renderer.createElement((null as any),'ion-list',(null as any));
    this._List_19_3 = new import22.List(this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_19),this.renderer,this.parentInjector.get(import35.GestureController));
    this._text_20 = this.renderer.createText(this._el_19,'\n\n    ',(null as any));
    this._el_21 = this.renderer.createElement(this._el_19,'ion-item',(null as any));
    this.renderer.setElementAttribute(this._el_21,'class','transparente item item-block');
    this.renderer.setElementAttribute(this._el_21,'style','text-align:center');
    this._appEl_21 = new import2.AppElement(21,19,this,this._el_21);
    var compView_21:any = import36.viewFactory_Item0(this.viewUtils,this.injector(21),this._appEl_21);
    this._Item_21_4 = new import23.Item(this.parentInjector.get(import37.Form),this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_21),this.renderer);
    this._ItemContent_21_5 = new import23.ItemContent();
    this._query_Label_21_0 = new import18.QueryList<any>();
    this._query_Button_21_1 = new import18.QueryList<any>();
    this._query_Icon_21_2 = new import18.QueryList<any>();
    this._appEl_21.initComponent(this._Item_21_4,[],compView_21);
    this._text_22 = this.renderer.createText((null as any),'\n      ',(null as any));
    this._el_23 = this.renderer.createElement((null as any),'button',(null as any));
    this.renderer.setElementAttribute(this._el_23,'ion-button','');
    this.renderer.setElementAttribute(this._el_23,'style','height: 30vh;width:30vh');
    this._appEl_23 = new import2.AppElement(23,21,this,this._el_23);
    var compView_23:any = import29.viewFactory_Button0(this.viewUtils,this.injector(23),this._appEl_23);
    this._Button_23_4 = new import15.Button((null as any),'',this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_23),this.renderer);
    this._appEl_23.initComponent(this._Button_23_4,[],compView_23);
    this._text_24 = this.renderer.createText((null as any),'Clientes',(null as any));
    compView_23.create(this._Button_23_4,[[].concat([this._text_24])],(null as any));
    this._text_25 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._query_Label_21_0.reset([]);
    this._Item_21_4.contentLabel = this._query_Label_21_0.first;
    compView_21.create(this._Item_21_4,[
      [],
      [],
      [].concat([
        this._text_22,
        this._el_23,
        this._text_25
      ]
      ),
      [],
      []
    ]
    ,(null as any));
    this._text_26 = this.renderer.createText(this._el_19,'\n    ',(null as any));
    this._el_27 = this.renderer.createElement(this._el_19,'ion-item',(null as any));
    this.renderer.setElementAttribute(this._el_27,'class','transparente item item-block');
    this.renderer.setElementAttribute(this._el_27,'style','text-align:center');
    this._appEl_27 = new import2.AppElement(27,19,this,this._el_27);
    var compView_27:any = import36.viewFactory_Item0(this.viewUtils,this.injector(27),this._appEl_27);
    this._Item_27_4 = new import23.Item(this.parentInjector.get(import37.Form),this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_27),this.renderer);
    this._ItemContent_27_5 = new import23.ItemContent();
    this._query_Label_27_0 = new import18.QueryList<any>();
    this._query_Button_27_1 = new import18.QueryList<any>();
    this._query_Icon_27_2 = new import18.QueryList<any>();
    this._appEl_27.initComponent(this._Item_27_4,[],compView_27);
    this._text_28 = this.renderer.createText((null as any),'\n      ',(null as any));
    this._el_29 = this.renderer.createElement((null as any),'button',(null as any));
    this.renderer.setElementAttribute(this._el_29,'ion-button','');
    this.renderer.setElementAttribute(this._el_29,'style','height: 30vh;width:30vh');
    this._appEl_29 = new import2.AppElement(29,27,this,this._el_29);
    var compView_29:any = import29.viewFactory_Button0(this.viewUtils,this.injector(29),this._appEl_29);
    this._Button_29_4 = new import15.Button((null as any),'',this.parentInjector.get(import24.Config),new import25.ElementRef(this._el_29),this.renderer);
    this._appEl_29.initComponent(this._Button_29_4,[],compView_29);
    this._text_30 = this.renderer.createText((null as any),'Partes',(null as any));
    compView_29.create(this._Button_29_4,[[].concat([this._text_30])],(null as any));
    this._text_31 = this.renderer.createText((null as any),'\n    ',(null as any));
    this._query_Label_27_0.reset([]);
    this._Item_27_4.contentLabel = this._query_Label_27_0.first;
    compView_27.create(this._Item_27_4,[
      [],
      [],
      [].concat([
        this._text_28,
        this._el_29,
        this._text_31
      ]
      ),
      [],
      []
    ]
    ,(null as any));
    this._text_32 = this.renderer.createText(this._el_19,'\n  ',(null as any));
    this._text_33 = this.renderer.createText((null as any),'\n  \n',(null as any));
    compView_14.create(this._Content_14_4,[
      [],
      [].concat([
        this._text_15,
        this._el_16,
        this._text_18,
        this._el_19,
        this._text_33
      ]
      ),
      []
    ]
    ,(null as any));
    this._text_34 = this.renderer.createText(parentRenderNode,'\n',(null as any));
    this._expr_0 = import7.UNINITIALIZED;
    this._expr_1 = import7.UNINITIALIZED;
    var disposable_0:Function = this.renderer.listen(this._el_4,'click',this.eventHandler(this._handle_click_4_0.bind(this)));
    this._expr_3 = import7.UNINITIALIZED;
    this._expr_4 = import7.UNINITIALIZED;
    this._expr_5 = import7.UNINITIALIZED;
    this._expr_6 = import7.UNINITIALIZED;
    this._expr_7 = import7.UNINITIALIZED;
    this._expr_8 = import7.UNINITIALIZED;
    var disposable_1:Function = this.renderer.listen(this._el_23,'click',this.eventHandler(this._handle_click_23_0.bind(this)));
    var disposable_2:Function = this.renderer.listen(this._el_29,'click',this.eventHandler(this._handle_click_29_0.bind(this)));
    this.init([],[
      this._el_0,
      this._text_1,
      this._el_2,
      this._text_3,
      this._el_4,
      this._text_5,
      this._el_6,
      this._text_7,
      this._text_8,
      this._el_9,
      this._text_10,
      this._text_11,
      this._text_12,
      this._text_13,
      this._el_14,
      this._text_15,
      this._el_16,
      this._text_17,
      this._text_18,
      this._el_19,
      this._text_20,
      this._el_21,
      this._text_22,
      this._el_23,
      this._text_24,
      this._text_25,
      this._text_26,
      this._el_27,
      this._text_28,
      this._el_29,
      this._text_30,
      this._text_31,
      this._text_32,
      this._text_33,
      this._text_34
    ]
    ,[
      disposable_0,
      disposable_1,
      disposable_2
    ]
    ,[]);
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import19.Icon) && (6 === requestNodeIndex))) { return this._Icon_6_3; }
    if (((token === import15.Button) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._Button_4_4; }
    if (((token === import16.MenuToggle) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._MenuToggle_4_5; }
    if (((token === import17.ToolbarItem) && ((4 <= requestNodeIndex) && (requestNodeIndex <= 7)))) { return this._ToolbarItem_4_6; }
    if (((token === import20.ToolbarTitle) && ((9 <= requestNodeIndex) && (requestNodeIndex <= 10)))) { return this._ToolbarTitle_9_4; }
    if (((token === import14.Navbar) && ((2 <= requestNodeIndex) && (requestNodeIndex <= 11)))) { return this._Navbar_2_4; }
    if (((token === import13.Header) && ((0 <= requestNodeIndex) && (requestNodeIndex <= 12)))) { return this._Header_0_3; }
    if (((token === import15.Button) && ((23 <= requestNodeIndex) && (requestNodeIndex <= 24)))) { return this._Button_23_4; }
    if (((token === import23.Item) && ((21 <= requestNodeIndex) && (requestNodeIndex <= 25)))) { return this._Item_21_4; }
    if (((token === import23.ItemContent) && ((21 <= requestNodeIndex) && (requestNodeIndex <= 25)))) { return this._ItemContent_21_5; }
    if (((token === import15.Button) && ((29 <= requestNodeIndex) && (requestNodeIndex <= 30)))) { return this._Button_29_4; }
    if (((token === import23.Item) && ((27 <= requestNodeIndex) && (requestNodeIndex <= 31)))) { return this._Item_27_4; }
    if (((token === import23.ItemContent) && ((27 <= requestNodeIndex) && (requestNodeIndex <= 31)))) { return this._ItemContent_27_5; }
    if (((token === import22.List) && ((19 <= requestNodeIndex) && (requestNodeIndex <= 32)))) { return this._List_19_3; }
    if (((token === import21.Content) && ((14 <= requestNodeIndex) && (requestNodeIndex <= 33)))) { return this._Content_14_4; }
    return notFoundResult;
  }
  detectChangesInternal(throwOnChange:boolean):void {
    const currVal_3:any = '';
    if (import4.checkBinding(throwOnChange,this._expr_3,currVal_3)) {
      this._MenuToggle_4_5.menuToggle = currVal_3;
      this._expr_3 = currVal_3;
    }
    const currVal_5:any = 'menu';
    if (import4.checkBinding(throwOnChange,this._expr_5,currVal_5)) {
      this._Icon_6_3.name = currVal_5;
      this._expr_5 = currVal_5;
    }
    if (((this.numberOfChecks === 0) && !throwOnChange)) { this._Content_14_4.ngOnInit(); }
    this.detectContentChildrenChanges(throwOnChange);
    if (!throwOnChange) {
      if (this._query_Button_4_0.dirty) {
        this._query_Button_4_0.reset([this._Button_4_4]);
        this._ToolbarItem_4_6._buttons = this._query_Button_4_0;
        this._query_Button_4_0.notifyOnChanges();
      }
      if (this._query_Button_21_1.dirty) {
        this._query_Button_21_1.reset([this._Button_23_4]);
        this._Item_21_4._buttons = this._query_Button_21_1;
        this._query_Button_21_1.notifyOnChanges();
      }
      if (this._query_Icon_21_2.dirty) {
        this._query_Icon_21_2.reset([]);
        this._Item_21_4._icons = this._query_Icon_21_2;
        this._query_Icon_21_2.notifyOnChanges();
      }
      if (this._query_Button_27_1.dirty) {
        this._query_Button_27_1.reset([this._Button_29_4]);
        this._Item_27_4._buttons = this._query_Button_27_1;
        this._query_Button_27_1.notifyOnChanges();
      }
      if (this._query_Icon_27_2.dirty) {
        this._query_Icon_27_2.reset([]);
        this._Item_27_4._icons = this._query_Icon_27_2;
        this._query_Icon_27_2.notifyOnChanges();
      }
      if ((this.numberOfChecks === 0)) { this._Button_4_4.ngAfterContentInit(); }
      if ((this.numberOfChecks === 0)) { this._Button_23_4.ngAfterContentInit(); }
      if ((this.numberOfChecks === 0)) { this._Item_21_4.ngAfterContentInit(); }
      if ((this.numberOfChecks === 0)) { this._Button_29_4.ngAfterContentInit(); }
      if ((this.numberOfChecks === 0)) { this._Item_27_4.ngAfterContentInit(); }
    }
    const currVal_0:any = this._Navbar_2_4._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_0,currVal_0)) {
      this.renderer.setElementProperty(this._el_2,'hidden',currVal_0);
      this._expr_0 = currVal_0;
    }
    const currVal_1:any = this._Navbar_2_4._sbPadding;
    if (import4.checkBinding(throwOnChange,this._expr_1,currVal_1)) {
      this.renderer.setElementClass(this._el_2,'statusbar-padding',currVal_1);
      this._expr_1 = currVal_1;
    }
    const currVal_4:any = this._MenuToggle_4_5.isHidden;
    if (import4.checkBinding(throwOnChange,this._expr_4,currVal_4)) {
      this.renderer.setElementProperty(this._el_4,'hidden',currVal_4);
      this._expr_4 = currVal_4;
    }
    const currVal_6:any = this._Icon_6_3._hidden;
    if (import4.checkBinding(throwOnChange,this._expr_6,currVal_6)) {
      this.renderer.setElementClass(this._el_6,'hide',currVal_6);
      this._expr_6 = currVal_6;
    }
    const currVal_7:any = this._Content_14_4._sbPadding;
    if (import4.checkBinding(throwOnChange,this._expr_7,currVal_7)) {
      this.renderer.setElementClass(this._el_14,'statusbar-padding',currVal_7);
      this._expr_7 = currVal_7;
    }
    const currVal_8:any = import4.interpolate(1,'',this.context.dia,'');
    if (import4.checkBinding(throwOnChange,this._expr_8,currVal_8)) {
      this.renderer.setText(this._text_17,currVal_8);
      this._expr_8 = currVal_8;
    }
    this.detectViewChildrenChanges(throwOnChange);
    if (!throwOnChange) { if ((this.numberOfChecks === 0)) { this._Navbar_2_4.ngAfterViewInit(); } }
  }
  destroyInternal():void {
    this._Icon_6_3.ngOnDestroy();
    this._Content_14_4.ngOnDestroy();
  }
  private _handle_click_4_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this._MenuToggle_4_5.toggle()) !== false);
    return (true && pd_0);
  }
  private _handle_click_23_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.clientelist()) !== false);
    return (true && pd_0);
  }
  private _handle_click_29_0($event:any):boolean {
    this.markPathToRootAsCheckOnce();
    const pd_0:any = ((<any>this.context.partelist()) !== false);
    return (true && pd_0);
  }
}
export function viewFactory_HomePage0(viewUtils:import4.ViewUtils,parentInjector:import5.Injector,declarationEl:import2.AppElement):import1.AppView<import3.HomePage> {
  if ((renderType_HomePage === (null as any))) { (renderType_HomePage = viewUtils.createRenderComponentType('/Users/franciscogarcia/Documents/angular2/ionic2partes-rc/.tmp/pages/home/home.html',0,import11.ViewEncapsulation.None,styles_HomePage,{})); }
  return new _View_HomePage0(viewUtils,parentInjector,declarationEl);
}