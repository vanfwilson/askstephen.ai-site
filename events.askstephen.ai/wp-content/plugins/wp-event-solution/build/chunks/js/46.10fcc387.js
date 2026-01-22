"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[46],{1907(e,t,n){n.d(t,{A:()=>u});var i=n(51609),a=n(47143),o=n(27723),l=n(29491),s=n(52619),r=n(60742),c=n(75093),d=n(64282),g=n(54725);const m=(0,a.withSelect)(e=>{const t=e("eventin/global");return{extensionsList:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),u=(0,l.compose)(m)(e=>{const{open:t,onCancel:n,extensionsList:l}=e,[m]=r.A.useForm(),{integrationLoading:u}=(0,a.useSelect)(e=>e("eventin/global").getEventinState(),[]),{setEventinState:p}=(0,a.useDispatch)("eventin/global"),_=Array.isArray(l)&&l?.find(e=>"zoom"===e.slug),{data:v={}}=_||{data:{}},{zoom_redirect_url:E}=v||{},x=async()=>{try{const e=m.getFieldsValue();p({integrationLoading:!0});const t=await d.A.settings.updateSettings(e);t.zoom_authorize_url&&(window.location.href=t.zoom_authorize_url)}catch(e){(0,s.doAction)("eventin_notification",{type:"error",message:e.message})}finally{p({integrationLoading:!1})}};return(0,i.createElement)(c.ExtensionConfigModal,{open:t,onCancel:n,title:(0,o.__)("Zoom Configure","eventin"),onConnect:x,width:500,loading:u,form:m},(0,i.createElement)(r.A,{form:m,layout:"vertical",onFinish:x,initialValues:{zoom_client_id:v?.zoom_client_id,zoom_client_secret:v?.zoom_client_secret,zoom_redirect_url:v?.zoom_redirect_url}},(0,i.createElement)(c.TextInputPassword,{label:(0,o.__)("Client ID","eventin"),name:"zoom_client_id",placeholder:(0,o.__)("Enter Client ID","eventin"),tooltip:(0,o.__)("Enter Client ID","eventin"),required:!0,rules:[{required:!0,message:(0,o.__)("Client ID is required","eventin")}]}),(0,i.createElement)(c.TextInputPassword,{label:(0,o.__)("Client Secret Key","eventin"),name:"zoom_client_secret",placeholder:(0,o.__)("Enter Client Secret Key","eventin"),tooltip:(0,o.__)("Enter Client Secret Key","eventin"),required:!0,rules:[{required:!0,message:(0,o.__)("Client Secret Key is required","eventin")}]}),(0,i.createElement)(r.A.Item,{label:(0,o.__)("Redirect URL","eventin"),name:"zoom_redirect_url"},(0,i.createElement)(c.InputFieldWithCopyButton,{copyText:E||"",buttonTooltipText:(0,o.__)("Copy Redirect URL","eventin"),icon:(0,i.createElement)(g.CopyIconOutlined,null),placeholder:(0,o.__)("Enter redirect url","eventin")}))))})},4436(e,t,n){n.d(t,{A:()=>c});var i=n(51609),a=n(86087),o=n(80560),l=n(17026),s=n(59255),r=n(21120);const c=function(e){const{activeTab:t,setActiveTab:n,extensions:c}=e||{},[d,g]=(0,a.useState)(!0);return(0,a.useEffect)(()=>{null!=c&&g(!1)},[c]),d?(0,i.createElement)(l.A,null):(0,i.createElement)("div",{className:"etn-extensions-container"},(0,i.createElement)(r.nA,null,(0,i.createElement)(o.A,{defaultActiveKey:t,onTabClick:e=>n(e),items:s.l})))}},4629(e,t,n){n.d(t,{A:()=>m});var i=n(51609),a=n(27723),o=n(29491),l=n(47143),s=n(52619),r=n(60742),c=n(75093),d=n(64282);const g=(0,l.withSelect)(e=>{const t=e("eventin/global");return{extensionsList:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),m=(0,o.compose)(g)(e=>{const{open:t,onCancel:n,extensionsList:o}=e,[g]=r.A.useForm(),{integrationLoading:m}=(0,l.useSelect)(e=>e("eventin/global").getEventinState(),[]),{setEventinState:u}=(0,l.useDispatch)("eventin/global"),p=Array.isArray(o)&&o?.find(e=>"google_map"===e.slug),{data:_={}}=p||{data:{}},{google_api_key:v}=_||{},E=async()=>{try{const e=g.getFieldsValue();u({integrationLoading:!0}),(await d.A.settings.updateSettings(e)).google_api_key&&(0,s.doAction)("eventin_notification",{type:"success",message:(0,a.__)("Google Map API key updated successfully","eventin")}),n()}catch(e){(0,s.doAction)("eventin_notification",{type:"error",message:e.message})}finally{u({integrationLoading:!1})}};return(0,i.createElement)(c.ExtensionConfigModal,{open:t,onCancel:n,title:(0,a.__)("Google Map Configure","eventin"),onConnect:E,width:500,loading:m,form:g},(0,i.createElement)(r.A,{form:g,layout:"vertical",onFinish:E,initialValues:{google_api_key:v}},(0,i.createElement)(c.TextInputPassword,{label:(0,a.__)("Map API Key","eventin"),name:"google_api_key",placeholder:(0,a.__)("Enter Map API Key","eventin"),tooltip:(0,a.__)("Map API Key","eventin"),required:!0,rules:[{required:!0,message:(0,a.__)("Map API Key is required","eventin")}]})))})},6660(e,t,n){n.d(t,{A:()=>m});var i=n(51609),a=n(67313),o=n(57584),l=n(25280),s=n(21120),r=n(37762),c=n(32066),d=n(70334);const{Title:g}=a.A,m=({module:e,invalidateExtensions:t,isExtensionsLoading:n,invalidateSettings:a})=>{const{name:m,title:u,description:p,status:_,notice:v,icon:E,settings_link:x,doc_link:y,is_pro:h,upgrade_link:A,upgrade:f,deps:b,type:w,slug:C,data:k={}}=e||{},{status:S,isLoading:L,buttonLoading:I,isActive:z,toggleModule:T,updateStatus:R}=(0,l.A)(m,_,t,n,a),O=!!window.localized_data_obj.evnetin_pro_active;return(0,i.createElement)(s.vi,null,(0,i.createElement)("div",{className:"etn-module-card-header"},(0,i.createElement)("div",{className:"etn-module-card-header-icon",dangerouslySetInnerHTML:{__html:E}}),!O&&h?(0,i.createElement)(s.Jj,null,(0,i.createElement)(o.A,null)):(0,i.createElement)(d.j,{checked:z,onChange:T,loading:L})),(0,i.createElement)("div",{className:"etn-module-card-body"},(0,i.createElement)(g,{level:4,style:{margin:"0 0 10px 0",fontSize:"20px"}},u),(0,i.createElement)(r.v,{description:p,notice:v,doc_link:y})),(0,i.createElement)(s.dQ,{isFooter:!0},(0,i.createElement)(c.x,{status:_,loading:I,onChangeStatus:R,upgrade:f,upgrade_link:A,settings_link:x,type:w,slug:C,deps:b,is_pro:h,isProActive:O,data:k})))}},17026(e,t,n){n.d(t,{A:()=>r});var i=n(51609),a=n(77278),o=n(16370),l=n(47152),s=n(75063);const r=()=>(0,i.createElement)(l.A,{gutter:[16,16]},(0,i.createElement)(o.A,{xs:24,sm:24},(0,i.createElement)(s.A.Input,{active:!0,size:"large",style:{margin:"20px 0"}})),[...Array(6)].map((e,t)=>(0,i.createElement)(o.A,{xs:24,sm:12,md:8,key:t},(0,i.createElement)(a.A,{style:{borderRadius:8}},(0,i.createElement)(s.A.Avatar,{active:!0,size:"large",shape:"circle",style:{marginBottom:16,marginRight:16}}),(0,i.createElement)(s.A.Input,{style:{width:200,marginBottom:8},active:!0}),(0,i.createElement)(s.A.Input,{style:{width:120,marginBottom:8},active:!0}),(0,i.createElement)("div",{style:{display:"flex",gap:10,alignItems:"center",marginTop:16}},(0,i.createElement)(s.A.Button,{style:{width:100},active:!0}),(0,i.createElement)(s.A.Button,{style:{width:100},active:!0}))))))},19575(e,t,n){n.d(t,{A:()=>l});var i=n(52619),a=n(27723),o=n(64282);const l=async(e,t)=>{try{const n=await o.A.extensions.updateExtension({name:e,status:t});return(0,i.doAction)("eventin_notification",{type:"success",message:n?.message}),!0}catch(e){return(0,i.doAction)("eventin_notification",{type:"error",message:e?.message||(0,a.__)("Update failed! Please check the plugin list and try again.","eventin")}),!1}}},20710(e,t,n){n.d(t,{A:()=>E});var i=n(51609),a=n(29491),o=n(47143),l=n(86087),s=n(27723),r=n(16370),c=n(92911),d=n(47152),g=n(67313),m=n(6660);const{Title:u,Text:p}=g.A,_=(0,o.withDispatch)(e=>{const t=e("eventin/global");return{invalidateExtensions:()=>t.invalidateResolution("getExtensions")}}),v=(0,o.withSelect)(e=>{const t=e("eventin/global");return{extensions:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),E=(0,a.compose)(v,_)(e=>{const{extensions:t,isExtensionsLoading:n,invalidateExtensions:a}=e||{},[o,g]=(0,l.useState)([]);return(0,l.useEffect)(()=>{t&&g(Array.isArray(t)&&t?.filter(e=>"integration"===e.type)||[])},[t]),(0,i.createElement)("div",{className:"etn-module-section"},(0,i.createElement)(d.A,{gutter:[30,30]},(0,i.createElement)(r.A,{span:24},(0,i.createElement)(c.A,{justify:"space-between",align:"center",gap:10},(0,i.createElement)(u,{level:3,className:"etn-extension-title"},(0,s.__)("Integrations","eventin")),(0,i.createElement)(p,{className:"etn-extension-description"}," ",(0,s.__)("Third-party integrations","eventin")))),o.map(e=>(0,i.createElement)(r.A,{key:e.name,xs:24,sm:12,xl:8},(0,i.createElement)(m.A,{module:e,invalidateExtensions:a,isExtensionsLoading:n})))))})},21120(e,t,n){n.d(t,{Jj:()=>c,dQ:()=>r,ff:()=>o,nA:()=>l,vi:()=>s});var i=n(27154),a=n(69815);const o=a.default.div`
	background-color: #f4f6fa;
	padding: 12px 32px;
	min-height: 100vh;

	.addons-area-heading {
		width: 50%;
		margin-bottom: 30px;
		@media ( max-width: 768px ) {
			width: 100%;
		}
	}
`,l=a.default.div`
	background: #fff;
	border-radius: 8px;
	margin-bottom: 30px;
	padding: 30px;
	@media ( max-width: 768px ) {
		padding: 20px;
	}
	.etn-extension-title {
		font-size: 20px;
		display: inline-block;
		color: #212327;
		font-weight: 600;
	}
	.etn-extension-description {
		font-size: 14px;
		color: #6b7280;
		font-weight: 400;
	}
	.ant-tabs-tab {
		font-size: 18px;
		font-weight: 600;
		padding: 16px 30px;
	}
	.ant-tabs-top > .ant-tabs-nav::before {
		border-bottom: 2px solid #d9d9d9;
	}
`,s=a.default.div`
	border-radius: 8px;
	margin: 0;
	min-height: 350px;
	overflow: hidden;
	position: relative;
	border: 1px solid #d9d9d9;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.etn-module-card-header {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		gap: 20px;
		@media ( max-width: 768px ) {
			flex-wrap: wrap;
		}
	}
	.etn-module-card-header-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
	}
	.etn-module-card-body,
	.etn-module-card-footer {
		padding: 0 20px;
	}

	.etn-card-desc {
		font-size: 14px;
		color: #838790;
		.etn-doc-link {
			color: ${i.PRIMARY_COLOR};
			margin-top: 20px;
			a {
				display: inline-flex;
				gap: 8px;
				font-size: 16px !important;
				font-weight: 600 !important;
				text-decoration: none !important;
			}
		}
	}
	.etn-link-button {
		color: ${i.PRIMARY_COLOR};
		font-size: 15px;
		font-weight: 600;
		margin-top: 10px;
		text-decoration: underline;
		&:hover {
			text-decoration: underline;
			color: ${i.PRIMARY_COLOR};
		}
	}
	@media ( max-width: 768px ) {
		.ant-card .ant-card-body {
			padding: 40px 10px;
		}
	}
	.ant-switch .ant-switch-loading-icon.anticon {
		position: relative;
		top: -2px;
		color: rgba( 0, 0, 0, 0.65 );
		vertical-align: top;
	}
`,r=a.default.div`
	height: ${({isFooter:e})=>e?"76px":"0px"};
	background: linear-gradient( 90deg, #eff6ff 0%, #f9f5ff 100% );
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 16px;
	padding-inline: 20px;
`,c=(a.default.span`
	font-size: 24px;
	margin-right: 10px;
`,a.default.div`
	position: absolute;
	height: 85px;
	width: 60px;
	transform: rotate( -45deg );
	top: -38px;
	right: -22px;
	background-color: #faad14;
	color: #fff;
	padding: 5px 16px;
	.anticon {
		position: absolute;
		top: 38px;
		left: 7px;
		transform: rotate( 45deg );
	}
`)},22423(e,t,n){n.d(t,{A:()=>E});var i=n(51609),a=n(29491),o=n(47143),l=n(86087),s=n(27723),r=n(16370),c=n(92911),d=n(47152),g=n(67313),m=n(6660);const{Title:u,Text:p}=g.A,_=(0,o.withDispatch)((e,t,{select:n})=>{const i=e("eventin/global");return{invalidateExtensions:()=>i.invalidateResolution("getExtensions"),invalidateSettings:()=>{i.invalidateResolution("getSettings"),n("eventin/global").getSettings()}}}),v=(0,o.withSelect)(e=>{const t=e("eventin/global");return{extensions:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),E=(0,a.compose)(v,_)(e=>{const{extensions:t,isExtensionsLoading:n,invalidateExtensions:a,invalidateSettings:o}=e||{},[g,_]=(0,l.useState)([]);return(0,l.useEffect)(()=>{t&&_(Array.isArray(t)&&t?.filter(e=>"addon"===e.type)||[])},[t]),(0,i.createElement)("div",{className:"etn-module-section"},(0,i.createElement)(d.A,{gutter:[30,30]},(0,i.createElement)(r.A,{span:24},(0,i.createElement)(c.A,{justify:"space-between",align:"center",gap:10},(0,i.createElement)(u,{level:3,className:"etn-extension-title"},(0,s.__)("Addons","eventin")),(0,i.createElement)(p,{className:"etn-extension-description"}," ",(0,s.__)("Eventin addons","eventin")))),g.map(e=>(0,i.createElement)(r.A,{key:e.name,xs:24,sm:12,xl:8},(0,i.createElement)(m.A,{module:e,invalidateExtensions:a,isExtensionsLoading:n,invalidateSettings:o})))))})},24581(e,t,n){n.d(t,{A:()=>r});var i=n(51609),a=n(56427),o=n(92911),l=n(18062),s=n(27154);function r(e){const{title:t}=e;return(0,i.createElement)(a.Fill,{name:s.PRIMARY_HEADER_NAME},(0,i.createElement)(o.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,i.createElement)(l.A,{title:t})))}},25046(e,t,n){n.r(t),n.d(t,{default:()=>p});var i=n(51609),a=n(29491),o=n(47143),l=n(86087),s=n(27723),r=n(75093),c=n(49603),d=n(24581),g=n(4436),m=n(21120);const u=(0,o.withSelect)(e=>{const t=e("eventin/global");return{extensions:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),p=(0,a.compose)(u)(function(e){const{extensions:t,isExtensionsLoading:n}=e,[a,o]=(0,l.useState)("1");return(0,i.createElement)(m.ff,{className:"eventin-page-wrapper"},(0,i.createElement)(d.A,{title:(0,s.__)("Extensions","eventin")}),(0,i.createElement)(g.A,{activeTab:a,setActiveTab:o,extensions:t,isExtensionsLoading:n}),(0,i.createElement)(c.A,null),(0,i.createElement)(r.FloatingHelpButton,null))})},25280(e,t,n){n.d(t,{A:()=>o});var i=n(86087),a=n(19575);function o(e,t,n,o,l){const[s,r]=(0,i.useState)(t),[c,d]=(0,i.useState)(!1),[g,m]=(0,i.useState)(!1);return{status:s,isLoading:c,isActive:"off"!==s,buttonLoading:g,toggleModule:async t=>{d(!0);const i=await(0,a.A)(e,t?"on":"off");i&&(r(t?"on":"off"),await n()),setTimeout(()=>!o&&d(!1),1500),i&&"eventin-addon-for-surecart"===e&&l()},updateStatus:async t=>{m(!0),await(0,a.A)(e,t)&&await n(),setTimeout(()=>!o&&m(!1),1500)}}}},32066(e,t,n){n.d(t,{x:()=>_});var i=n(51609),a=n(86087),o=n(27723),l=n(47143),s=n(50400),r=n(92911),c=n(7638),d=n(64282),g=n(52619);const m={fontSize:"16px",padding:"20px"},u={backgroundColor:"#F3F4F6"},p="zoom",_=e=>{const{type:t,isProActive:n,is_pro:_,deps:v,loading:E,data:x}=e,{setEventinState:y}=(0,l.useDispatch)("eventin/global"),{actions:h,btnStyle:A}=(({status:e,type:t,slug:n,onChangeStatus:i,upgrade_link:l,settings_link:s,deps:r,upgrade:d,setEventinState:g})=>{const p=(0,a.useCallback)(()=>{g({modalType:n})},[n,g]),_={on:()=>"integration"===t?[{label:(0,o.__)("Configure","eventin"),variant:c.Vt,style:u,onClick:p}]:r?.length?[{label:(0,o.__)("Install","eventin"),variant:c.zB,onClick:()=>i("install")}]:[],install:()=>[{label:(0,o.__)("Activate","eventin"),variant:c.zB,onClick:()=>i("activate")}],upgrade:()=>[{label:(0,o.__)("Download","eventin"),variant:c.zB,href:l,target:"_blank"}],activate:()=>[{label:(0,o.__)("Deactivate","eventin"),variant:c.Vt,onClick:()=>i("deactivate")},s&&{label:(0,o.__)("Configure","eventin"),variant:c.Vt,href:s,target:"_blank"}].filter(Boolean)};return{actions:_[e]?.()||[],btnStyle:m}})({...e,setEventinState:y}),[f,b]=(0,a.useState)(!1),[w,C]=(0,a.useState)({zoom_connected:"yes"===x?.zoom_connected,google_meet_connected:"yes"===x?.google_meet_connected}),k=(0,a.useCallback)(async e=>{try{b(!0),await d.A.settings.updateSettings(e)&&(C(t=>({...t,zoom_connected:e?.zoom_connected,google_meet_connected:e?.google_meet_connected})),(0,g.doAction)("eventin_notification",{type:"success",message:(0,o.__)("Disconnected successfully","eventin")}))}catch(e){(0,g.doAction)("eventin_notification",{type:"error",message:e.message})}finally{b(!1)}},[]),S=(0,a.useCallback)((e,n,a)=>"integration"===t&&n?(0,i.createElement)(s.Ay,{style:A,variant:e===p?c.Vt:c.zB,onClick:()=>k(a),loading:f,disabled:f},(0,o.__)("Disconnect","eventin")):null,[t,A,k,f]);return(0,a.useMemo)(()=>{if(!n&&_)return(0,i.createElement)(c.Oc,null);if("module"===t&&!v?.length)return null;if(!h.length)return null;const e=S(p,w?.zoom_connected,{zoom_token:{},zoom_connected:!1}),a=S("google_meet",w?.google_meet_connected,{google_token:{},google_meet_connected:!1});return(0,i.createElement)(r.A,{gap:20,wrap:"wrap"},e,a,h.map((e,t)=>(0,i.createElement)(s.Ay,{key:t,...e,style:{...A,...e.style||{}},loading:E},e.label)))},[h,A,v,E,n,_,t,w,S])}},34264(e,t,n){n.d(t,{A:()=>o});var i=n(51609),a=n(6836);const o=({height:e=22,width:t=22})=>(0,a.iconCreator)(()=>(({height:e,width:t})=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"none",viewBox:"0 0 20 20"},(0,i.createElement)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M6.25 4.121h7.083c.69 0 1.25.56 1.25 1.25v1.25M12.5 10.788h-5M10 14.121H7.5"}),(0,i.createElement)("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",d:"M15.414 1.667H5.256c-.414 0-.837.06-1.172.306-1.062.78-1.88 2.517-.228 4.086.464.44 1.112.6 1.75.6h9.63c.662 0 1.847.095 1.847 2.114v6.211a3.34 3.34 0 0 1-3.33 3.35H6.226c-1.836 0-3.172-1.298-3.277-3.274L2.922 4.304"})))({height:e,width:t}))},37762(e,t,n){n.d(t,{v:()=>c});var i=n(51609),a=n(27723),o=n(67313),l=n(34264),s=n(75093);const{Text:r}=o.A,c=({description:e,notice:t,doc_link:n})=>(0,i.createElement)("div",{className:"etn-card-desc",style:{marginBottom:"20px"}},(0,i.createElement)(r,null,e.length>90?e.slice(0,90).concat("..."):e),t&&(0,i.createElement)(r,{style:{display:"flex",color:"#ff7129",marginTop:"10px"}},t),(0,i.createElement)("div",{className:"etn-doc-link"},(0,i.createElement)(s.LinkText,{href:n,target:"_blank"},(0,i.createElement)(l.A,null)," ",(0,a.__)("Documentation","eventin"))))},44207(e,t,n){n.d(t,{A:()=>u});var i=n(51609),a=n(47143),o=n(29491),l=n(52619),s=n(27723),r=n(60742),c=n(75093),d=n(64282),g=n(54725);const m=(0,a.withSelect)(e=>{const t=e("eventin/global");return{extensionsList:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),u=(0,o.compose)(m)(e=>{const{open:t,onCancel:n,extensionsList:o}=e,[m]=r.A.useForm(),{integrationLoading:u}=(0,a.useSelect)(e=>e("eventin/global").getEventinState(),[]),{setEventinState:p}=(0,a.useDispatch)("eventin/global"),_=Array.isArray(o)&&o?.find(e=>"google_meet"===e.slug),{data:v={}}=_||{data:{}},{google_meet_client_id:E,google_meet_client_secret_key:x,google_meet_redirect_url:y}=v||{},h=async()=>{try{const e=m.getFieldsValue();p({integrationLoading:!0});const t=await d.A.settings.updateSettings(e);t.google_meet_authorize_url&&(window.location.href=t.google_meet_authorize_url)}catch(e){(0,l.doAction)("eventin_notification",{type:"error",message:e.message})}finally{p({integrationLoading:!1})}};return(0,i.createElement)(c.ExtensionConfigModal,{open:t,onCancel:n,title:(0,s.__)("Google Meet Configure","eventin"),onConnect:h,width:500,loading:u,form:m},(0,i.createElement)(r.A,{form:m,layout:"vertical",onFinish:h,initialValues:{google_meet_client_id:E,google_meet_client_secret_key:x,google_meet_redirect_url:y}},(0,i.createElement)(c.TextInputPassword,{label:(0,s.__)("Client ID","eventin"),name:"google_meet_client_id",placeholder:(0,s.__)("Enter Client ID","eventin"),tooltip:(0,s.__)("Enter Client ID","eventin"),required:!0,type:"password",rules:[{required:!0,message:(0,s.__)("Client ID is required","eventin")}]}),(0,i.createElement)(c.TextInputPassword,{label:(0,s.__)("Client Secret Key","eventin"),name:"google_meet_client_secret_key",placeholder:(0,s.__)("Enter Client Secret Key","eventin"),tooltip:(0,s.__)("Enter Client Secret Key","eventin"),required:!0,type:"password",rules:[{required:!0,message:(0,s.__)("Client Secret Key is required","eventin")}]}),(0,i.createElement)(r.A.Item,{label:(0,s.__)("Authorized Redirect URL","eventin"),name:"google_meet_redirect_url"},(0,i.createElement)(c.InputFieldWithCopyButton,{copyText:y,buttonTooltipText:(0,s.__)("Copy Redirect URL","eventin"),icon:(0,i.createElement)(g.CopyIconOutlined,null),placeholder:(0,s.__)("Enter redirect url","eventin")}))))})},49603(e,t,n){n.d(t,{A:()=>d});var i=n(51609),a=n(47143),o=n(59255),l=n(85890),s=n(4629),r=n(44207),c=n(1907);const d=()=>{const{modalType:e}=(0,a.useSelect)(e=>e("eventin/global").getEventinState(),[]),{setEventinState:t}=(0,a.useDispatch)("eventin/global"),n=()=>t({modalType:null,modalProps:null});return e&&{[o.e.ZOOM_CONFIG]:(0,i.createElement)(c.A,{open:!0,onCancel:n}),[o.e.GOOGLE_MEET_CONFIG]:(0,i.createElement)(r.A,{open:!0,onCancel:n}),[o.e.EVENTIN_AI_CONFIG]:(0,i.createElement)(l.A,{open:!0,onCancel:n}),[o.e.GOOGLE_MAP_CONFIG]:(0,i.createElement)(s.A,{open:!0,onCancel:n})}[e]||null}},57584(e,t,n){n.d(t,{A:()=>o});var i=n(51609),a=n(6836);const o=({height:e=22,width:t=22})=>(0,a.iconCreator)(()=>(({height:e,width:t})=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",fill:"none",viewBox:"0 0 14 14"},(0,i.createElement)("path",{fill:"#fff",fillRule:"evenodd",d:"M6.999 1.895a2.04 2.04 0 0 0-2.042 2.042v.91a57 57 0 0 1 2.042-.035c.72 0 1.39.012 2.041.035v-.91A2.04 2.04 0 0 0 7 1.895M3.79 3.937v1.036a2.51 2.51 0 0 0-1.735 2.059c-.087.641-.16 1.316-.16 2.009s.073 1.368.16 2.01c.158 1.176 1.133 2.106 2.333 2.16.834.04 1.68.06 2.61.06.932 0 1.778-.02 2.611-.06 1.2-.054 2.175-.984 2.334-2.16.086-.642.16-1.317.16-2.01s-.074-1.368-.16-2.01a2.5 2.5 0 0 0-1.736-2.057V3.936a3.208 3.208 0 1 0-6.417 0m6.125 5.098a.583.583 0 1 0-1.166 0v.006a.583.583 0 1 0 1.166 0zM7 8.452c.322 0 .583.261.583.583v.006a.583.583 0 1 1-1.167 0v-.006c0-.322.262-.583.584-.583m-1.75.583a.583.583 0 1 0-1.167 0v.006a.583.583 0 1 0 1.167 0z",clipRule:"evenodd"})))({height:e,width:t}))},59255(e,t,n){n.d(t,{e:()=>g,l:()=>d});var i=n(51609),a=n(27723),o=n(67313),l=n(64945),s=n(20710),r=n(22423);const{Title:c}=o.A,d=[{key:"1",label:(0,a.__)("Extensions","eventin"),children:(0,i.createElement)(l.A,null)},{key:"2",label:(0,a.__)("Integrations","eventin"),children:(0,i.createElement)(s.A,null)},{key:"3",label:(0,a.__)("Addons","eventin"),children:(0,i.createElement)(r.A,null)}],g={ZOOM_CONFIG:"zoom",GOOGLE_MEET_CONFIG:"google_meet",EVENTIN_AI_CONFIG:"eventin_ai",GOOGLE_MAP_CONFIG:"google_map"}},64945(e,t,n){n.d(t,{A:()=>E});var i=n(51609),a=n(29491),o=n(47143),l=n(86087),s=n(27723),r=n(16370),c=n(92911),d=n(47152),g=n(67313),m=n(6660);const{Title:u,Text:p}=g.A,_=(0,o.withDispatch)((e,t,{select:n})=>{const i=e("eventin/global");return{invalidateExtensions:()=>i.invalidateResolution("getExtensions"),invalidateSettings:()=>{i.invalidateResolution("getSettings"),n("eventin/global").getSettings()}}}),v=(0,o.withSelect)(e=>{const t=e("eventin/global");return{extensions:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),E=(0,a.compose)(v,_)(e=>{const{extensions:t,isExtensionsLoading:n,invalidateExtensions:a,invalidateSettings:o}=e||{},[g,_]=(0,l.useState)([]),[v,E]=(0,l.useState)([]),[x,y]=(0,l.useState)([]);return(0,l.useEffect)(()=>{t&&(_(Object.values(t).filter(e=>"module"===e.type)),E(Object.values(t).filter(e=>"addon"===e.type)),y(Object.values(t).filter(e=>"integration"===e.type)))},[t]),(0,i.createElement)("div",{className:"etn-module-section"},(0,i.createElement)(d.A,{gutter:[30,30]},(0,i.createElement)(r.A,{span:24},(0,i.createElement)(c.A,{justify:"space-between",align:"center",gap:10},(0,i.createElement)(u,{level:3,className:"etn-extension-title"},(0,s.__)("Modules","eventin")),(0,i.createElement)(p,{className:"etn-extension-description"}," ",(0,s.__)("Eventin modules","eventin")))),g.map(e=>(0,i.createElement)(r.A,{key:e.name,xs:24,sm:12,xl:8},(0,i.createElement)(m.A,{module:e,invalidateExtensions:a,isExtensionsLoading:n})))),(0,i.createElement)(d.A,{gutter:[30,30]},(0,i.createElement)(r.A,{span:24},(0,i.createElement)(c.A,{justify:"space-between",align:"center",gap:10,style:{marginTop:"30px"}},(0,i.createElement)(u,{level:3,className:"etn-extension-title"},(0,s.__)("Addons","eventin")),(0,i.createElement)(p,{className:"etn-extension-description"}," ",(0,s.__)("Eventin addons","eventin")))),v.map(e=>(0,i.createElement)(r.A,{key:e.name,xs:24,sm:12,xl:8},(0,i.createElement)(m.A,{module:e,invalidateExtensions:a,isExtensionsLoading:n,invalidateSettings:o})))),(0,i.createElement)(d.A,{gutter:[30,30]},(0,i.createElement)(r.A,{span:24},(0,i.createElement)(c.A,{justify:"space-between",align:"center",gap:10,style:{marginTop:"30px"}},(0,i.createElement)(u,{level:3,className:"etn-extension-title"},(0,s.__)("Integrations","eventin")),(0,i.createElement)(p,{className:"etn-extension-description"}," ",(0,s.__)("Eventin integrations","eventin")))),x.map(e=>(0,i.createElement)(r.A,{key:e.name,xs:24,sm:12,xl:8},(0,i.createElement)(m.A,{module:e,invalidateExtensions:a,isExtensionsLoading:n})))))})},70334(e,t,n){n.d(t,{j:()=>o});var i=n(51609),a=n(43960);const o=({checked:e,loading:t,disabled:n,onChange:o})=>(0,i.createElement)(a.A,{className:"etn-addon-module-switch",loading:t,checked:e,onChange:o,disabled:n})},85890(e,t,n){n.d(t,{A:()=>m});var i=n(51609),a=n(27723),o=n(29491),l=n(47143),s=n(52619),r=n(60742),c=n(75093),d=n(64282);const g=(0,l.withSelect)(e=>{const t=e("eventin/global");return{extensionsList:t.getExtensions(),isExtensionsLoading:t.isResolving("getExtensions")}}),m=(0,o.compose)(g)(e=>{const{open:t,onCancel:n,extensionsList:o}=e,[g]=r.A.useForm(),{integrationLoading:m}=(0,l.useSelect)(e=>e("eventin/global").getEventinState(),[]),{setEventinState:u}=(0,l.useDispatch)("eventin/global"),p=Array.isArray(o)&&o?.find(e=>"eventin_ai"===e.slug),{data:_={}}=p||{data:{}},{eventin_ai_auth_key:v}=_||{},E=async()=>{try{const e=g.getFieldsValue();u({integrationLoading:!0}),(await d.A.settings.updateSettings(e)).eventin_ai_auth_key&&(0,s.doAction)("eventin_notification",{type:"success",message:(0,a.__)("Open AI key updated successfully","eventin")}),n()}catch(e){(0,s.doAction)("eventin_notification",{type:"error",message:e.message})}finally{u({integrationLoading:!1,modalType:null})}};return(0,i.createElement)(c.ExtensionConfigModal,{open:t,onCancel:n,title:(0,a.__)("Eventin AI Configure","eventin"),onConnect:E,width:500,loading:m,form:g},(0,i.createElement)(r.A,{form:g,layout:"vertical",onFinish:E,initialValues:{eventin_ai_auth_key:v}},(0,i.createElement)(c.TextInputPassword,{label:(0,a.__)("Open AI Key","eventin"),name:"eventin_ai_auth_key",placeholder:(0,a.__)("Enter Open AI Key","eventin"),required:!0,type:"password",rules:[{required:!0,message:(0,a.__)("Open AI Key is required","eventin")}]})))})}}]);