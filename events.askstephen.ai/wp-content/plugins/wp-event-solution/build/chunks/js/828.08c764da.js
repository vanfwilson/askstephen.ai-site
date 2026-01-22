"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[828],{5063(e,t,a){a.d(t,{$4:()=>r,GI:()=>i});var n=a(27154),l=a(69815);const i=l.default.div`
	background-color: #ffffff;
	max-width: 1200px;
	border-radius: 6px;
	margin: 0 auto;

	.header-title {
		text-align: center;
		font-weight: 600;
		font-size: 30px;
		color: #000000;
		margin-top: 10px;
		margin-bottom: 0px;
	}
	.header-desc {
		color: #475569;
		font-size: 16px;
		text-align: center;
		margin-bottom: 30px;
	}

	.intro-title {
		font-weight: 600;
		font-size: 2rem;
		line-height: 38px;
		margin: 0 0 20px;
		color: #020617;
	}

	.intro-list {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 1rem;
		gap: 8px;
		margin: 0 0 2rem;
		padding: 0;
		color: #020617;
		list-style: none;
		font-weight: 400;
	}
	.intro-button {
		display: flex;
		align-items: center;
		border-radius: 6px;
	}
`,r=(l.default.div`
	margin: 0;
	position: relative;

	@media screen and ( max-width: 768px ) {
		margin: 0 0 2rem;
	}

	img {
		display: block;
		max-width: 100%;
	}

	iframe {
		border: none;
		border-radius: 10px;
	}

	.video-play-button {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate( -50%, -50% );
		border-radius: 50%;
		background-color: rgba( 255, 255, 255, 0.2 );
		color: #fff;
		width: 60px !important;
		height: 60px;
		border-color: #f0eafc;

		&:hover {
			background-color: ${n.PRIMARY_COLOR};
			color: #fff;
			border-color: transparent;
		}

		&:focus {
			outline: none;
		}
	}
`,l.default.button`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	font-size: 16px;
	font-weight: 500;
	background: #f9f5ff;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	transition: all 0.2s ease;

	&::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 6px;
		padding: 1px;
		background: linear-gradient( to left top, #fc8229, #e93da0, #404ef0 );
		-webkit-mask:
			linear-gradient( #fff 0 0 ) content-box,
			linear-gradient( #fff 0 0 );
		mask:
			linear-gradient( #fff 0 0 ) content-box,
			linear-gradient( #fff 0 0 );
		-webkit-mask-composite: xor;
		mask-composite: exclude;
	}

	&:hover {
		transform: translateY( -1px );
		background: rgba( 99, 102, 241, 0.04 );
	}

	&:active {
		transform: translateY( 0 );
	}

	svg {
		color: #ff69b4;
	}
`,l.default.span`
	background: linear-gradient(
		90deg,
		#fc8327 0%,
		#e83aa5 50.5%,
		#3a4ff2 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: rgba( 0, 0, 0, 0 );
	background-clip: text;
`,l.default.div`
	width: 100%;
	border: 1px solid #d9d9d9;
	border-radius: 6px;

	img {
		width: 100%;
	}

	.content-wrapper {
		padding: 20px;

		&-title {
			color: #0f172a;
			font-size: 20px;
			font-weight: 600;
			line-height: 28px;
			margin-top: 0px;
		}

		&-description {
			position: relative;
			margin: 0px 0px 12px 10px;
			color: #475569;
			font-size: 14px;
			&::before {
				content: '';
				position: absolute;
				width: 10px;
				height: 10px;
				background-color: ${({color:e})=>e};
				border-radius: 100px;
				left: -20px;
				bottom: 5px;
			}
		}
	}
`)},5100(e,t,a){a.d(t,{m:()=>i,t:()=>r});var n=a(51609),l=a(54725);const i=[{key:"gutenberg",title:"Block Editor",icon:(0,n.createElement)(l.WordpressIcon,null)},{key:"elementor",title:"Elementor",icon:(0,n.createElement)(l.ElementorTemplateIcon,null)}],r="https://support.themewinter.com/docs/plugins/plugin-docs/template-builder/how-to-create-event-templates/"},6525(e,t,a){a.d(t,{f:()=>l,g:()=>i});var n=a(69815);const l=n.default.div`
	background-color: #f4f6fa;
	padding: 12px 32px;
	min-height: 100vh;
`,i=n.default.div`
	padding: 20px;
	margin-top: -20px;
	.ant-tabs-nav-wrap {
		background-color: #fff;
	}
	.ant-tabs {
		.ant-tabs-tab {
			font-size: 18px;
			font-weight: 600;
			background: transparent;
			color: #262626;
			padding: 15px 20px;
		}
		.ant-tabs-content-holder {
			background-color: #ffffff;
			border: 1px solid #d9d9d9;
			border-radius: 8px;
			padding: 20px;
		}
		.ant-tabs-tab-active {
			background-color: #ffffff;
			border-bottom: 2px solid #d9d9d9;
		}
	}
`},9765(e,t,a){a.d(t,{A:()=>m});var n=a(51609),l=a(29491),i=a(47143),r=a(86087),o=a(27723),c=a(7638),s=a(64282),d=a(92911);const p=(0,i.withDispatch)(e=>({setShowCreateTemplateModal:e("eventin/global").setShowCreateTemplateModal})),m=(0,l.compose)([p])(({selectedEditor:e,setOpenSelectEditorModal:t,setShowCreateTemplateModal:a})=>{const[l,i]=(0,r.useState)(!1);return(0,n.createElement)(d.A,{gap:12,justify:"flex-end"},(0,n.createElement)(c.Ay,{variant:c.Vt,onClick:()=>t(!1)},(0,o.__)("Cancel","eventin")),(0,n.createElement)(c.Ay,{variant:c.zB,onClick:async()=>{try{i(!0),(await s.A.settings.updateSettings({selected_template_builder:e})).selected_template_builder&&(t(!1),a(!0))}catch(e){console.log(e)}finally{i(!1)}},loading:l},(0,o.__)("Apply Template","eventin")))})},12236(e,t,a){a.d(t,{A:()=>g});var n=a(51609),l=a(56427),i=a(27723),r=a(52741),o=a(92911),c=a(71524),s=a(32099),d=a(54725),p=a(75093),m=a(7638),u=a(27154);function g(e){const{title:t,buttonText:a,onClickCallback:g,handleOpenEditorSelectModal:f,selectedEditor:v}=e;return(0,n.createElement)(l.Fill,{name:u.PRIMARY_HEADER_NAME},(0,n.createElement)(o.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,n.createElement)(p.LogoWithTitle,{title:t}),(0,n.createElement)(o.A,{align:"center",gap:8,wrap:"wrap"},v||window.localized_data_obj?.selected_template_builder?(0,n.createElement)(n.Fragment,null,(0,n.createElement)("p",null,(0,i.__)("Selected builder : ","eventin")),(0,n.createElement)(c.A,{color:"magenta"},(v||window.localized_data_obj?.selected_template_builder).charAt(0).toUpperCase()+(v||window.localized_data_obj?.selected_template_builder).slice(1))):null,(0,n.createElement)(s.A,{title:(0,i.__)("Open builder select","eventin"),placement:"bottomRight"},(0,n.createElement)(m.Ay,{variant:p.secondary,onClick:f},(0,n.createElement)(d.SelectEditorSettingsIcon,null))),(0,n.createElement)(p.PrimaryButton,{htmlType:"button",onClick:g},(0,n.createElement)(d.PlusOutlined,null),a),(0,n.createElement)(r.A,{type:"vertical",style:{height:"40px",marginInline:"12px",top:"0"}}))))}},18448(e,t,a){a.d(t,{W:()=>c});var n=a(6836),l=a(27723);const i=(0,n.assetURL)("/images/events/event-emptypage.webp"),r=(0,n.assetURL)("/images/events/ticket-image.webp"),o=(0,n.assetURL)("/images/events/certificate.webp"),c=[{key:"template",title:(0,l.__)("Create your landing template","eventin"),lists:[(0,l.__)("Choose a layout that matches your event style","eventin"),(0,l.__)("Add your event details  & customize","eventin"),(0,l.__)("Save & publish your landing page instantly","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/template-builder/how-to-create-event-templates/",image:i,color:"#874CFC"},{key:"tickets",title:(0,l.__)("Create your tickets ","eventin"),lists:[(0,l.__)("Pick a professional ticket design","eventin"),(0,l.__)("Fill in event details & customize","eventin"),(0,l.__)("Save & publish your ready-to-use tickets","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/template-builder/template-builder-for-eventin-certificate-and-ticket/",image:r,color:"#3B82F6"},{key:"certificates",title:(0,l.__)("Create your certificates  ","eventin"),lists:[(0,l.__)("Select a certificate template you like","eventin"),(0,l.__)("Enter recipient details & add your signature","eventin"),(0,l.__)("Save & publish your certificate with one click","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/template-builder/certificate-builder-for-attendee/",image:o,color:"#10B981"}]},28631(e,t,a){a.d(t,{f:()=>i});var n=a(86087),l=a(64282);const i=()=>{const[e,t]=(0,n.useState)([]),[a,i]=(0,n.useState)(!1);return{getAllActiveTemplateBuilders:async()=>{i(!0);try{const e=await l.A.template.getActiveTemplateBuilders();return t(e),e}catch(e){console.log(e)}finally{i(!1)}},builderLists:e,builderLoading:a}}},30828(e,t,a){a.r(t),a.d(t,{default:()=>_});var n=a(51609),l=a(29491),i=a(47143),r=a(86087),o=a(52619),c=a(27723),s=a(75093),d=a(87968),p=a(64282),m=a(42670),u=a(47079),g=a(48290),f=a(57922),v=a(6525),h=a(43715),x=a(74349),b=a(12236),w=a(77247);const E=(0,i.withSelect)(e=>{const t=e("eventin/global");return{templateList:t.getTemplateList(),templateListLoading:t.getTemplateListLoading()}}),y=(0,i.withDispatch)(e=>({setShowCreateTemplateModal:e("eventin/global").setShowCreateTemplateModal})),_=(0,l.compose)([E,y])(e=>{const{setShowCreateTemplateModal:t,templateList:a,templateListLoading:l}=e,[i,E]=(0,r.useState)(window?.localized_data_obj?.selected_template_builder),[y,_]=(0,r.useState)(!1),[k,A]=(0,r.useState)("event"),{selectTemplate:T,getSelectedTemplate:S}=(0,f.A)(a),C=()=>{window?.localized_data_obj?.selected_template_builder||i?t(!0):_(!0)},L=async e=>{try{const t=await p.A.template.selectEventTemplate({id:e.id,type:e.type});t?.message&&T(e.type,{...e})}catch(e){(0,o.doAction)("eventin_notification",{type:"error",message:e.message})}};return l?(0,n.createElement)("div",null,(0,n.createElement)(b.A,{title:(0,c.__)("Template Builder","eventin"),buttonText:(0,c.__)("New Template","eventin"),onClickCallback:C,selectedEditor:i,handleOpenEditorSelectModal:()=>_(!0)}),(0,n.createElement)(d.A,null)):(0,n.createElement)("div",null,(0,n.createElement)(b.A,{title:(0,c.__)("Template Builder","eventin"),buttonText:(0,c.__)("New Template","eventin"),onClickCallback:C,selectedEditor:i,handleOpenEditorSelectModal:()=>_(!0)}),a&&a.length>0?(0,n.createElement)(v.f,{className:"eventin-page-wrapper"},(0,n.createElement)(w.A,{activeTab:k,setActiveTab:A,children:{event:(0,n.createElement)(h.A,{templates:a.filter(e=>"event"===e.type),templateType:"event",onTemplateSelect:L,selectedTemplateId:S("event")?.id,isLoading:l}),tickets:(0,n.createElement)(h.A,{templates:a.filter(e=>"ticket"===e.type),templateType:"ticket",onTemplateSelect:L,selectedTemplateId:S("ticket")?.id,isLoading:l}),certificate:(0,n.createElement)(h.A,{templates:a.filter(e=>"certificate"===e.type),templateType:"certificate",onTemplateSelect:L,selectedTemplateId:null,isLoading:l}),speaker:(0,n.createElement)(h.A,{templates:a.filter(e=>"speaker"===e.type),templateType:"speaker",onTemplateSelect:L,selectedTemplateId:S("speaker")?.id,isLoading:l})}})):(0,n.createElement)(g.A,null),(0,n.createElement)(m.A,{selectedEditor:i,setSelectedEditor:E,openSelectEditorModal:y,setOpenSelectEditorModal:_}),(0,n.createElement)(u.A,{selectedEditor:i,templateType:k}),(0,n.createElement)(x.A,null),(0,n.createElement)(s.FloatingHelpButton,null))})},38693(e,t,a){a.d(t,{A:()=>p});var n=a(51609),l=a(27723),i=a(92911),r=a(54725),o=a(72725),c=a(5100),s=a(80624),d=a(74871);const p=({installResponse:e,setInstallResponse:t,selectedEditor:a,setSelectedEditor:p,builderLists:m,builderLoading:u})=>(0,n.createElement)(d.d4,null,(0,n.createElement)(i.A,{justify:"center",gap:10},c.m.map(e=>(0,n.createElement)(d.$w,{key:e.key,active:a===e.key,onClick:()=>(async e=>{p(e)})(e.key)},a===e.key&&(0,n.createElement)("span",{className:"eve-svg-wrapper"},(0,n.createElement)(r.EditorSelectIcon,null)),e.icon,(0,n.createElement)("h4",null,e.title)))),(0,o.P)(m,a)&&a||"gutenberg"===a||e?.is_active||!a?(0,n.createElement)("p",{className:"eve-editor-list"},(0,l.__)("Please choose your preferred page builder from the list so you will only see templates that are made using that page builder.","eventin"),(0,n.createElement)("a",{className:"eve-link",href:c.t,target:"_blank"},(0,l.__)(" learn More","eventin"))):(0,n.createElement)(s.c,{installResponse:e,setInstallResponse:t,selectedEditor:a}))},42670(e,t,a){a.d(t,{A:()=>p});var n=a(51609),l=a(86087),i=a(27723),r=a(75093),o=a(72725),c=a(38693),s=a(28631),d=a(9765);const p=({selectedEditor:e,setSelectedEditor:t,openSelectEditorModal:a,setOpenSelectEditorModal:p})=>{const[m,u]=(0,l.useState)(null),{getAllActiveTemplateBuilders:g,builderLists:f,builderLoading:v}=(0,s.f)();return(0,l.useEffect)(()=>{g()},[]),(0,n.createElement)(r.Modal,{open:a,onCancel:()=>p(!1),footer:!!((0,o.P)(f,e)&&e||"gutenberg"===e||m?.is_active)&&(0,n.createElement)(d.A,{selectedEditor:e,setOpenSelectEditorModal:p}),width:"670px",destroyOnHidden:!0,wrapClassName:"etn-template-create-modal",title:(0,i.__)("Choose a Page Builder to Continue","eventin")},(0,n.createElement)(c.A,{builderLists:f,builderLoading:v,installResponse:m,setInstallResponse:u,selectedEditor:e,setSelectedEditor:t}))}},43715(e,t,a){a.d(t,{A:()=>u});var n=a(51609),l=a(47143),i=a(52619),r=a(27723),o=a(16133),c=a(90455),s=a(36082),d=a(80734),p=a(61751),m=a(64282);const u=(0,l.withDispatch)(e=>{const t=e("eventin/global");return{setRevalidateData:e=>{t.setRevalidateTemplateList(e),t.invalidateResolution("getTemplateList")}}})(({templates:e,setRevalidateData:t,templateType:a,onTemplateSelect:l,selectedTemplateId:u,isLoading:g=!1})=>{if(g)return(0,n.createElement)(s.g,null,Array.from({length:6}).map((e,t)=>(0,n.createElement)(s.O,{key:t})));if(0===e.length)return"certificate"===a?(0,n.createElement)(c.A,null):(0,n.createElement)(o.A,{description:(0,r.__)("No templates found","eventin"),style:{marginTop:"40px"}});const f=e=>{window.open(e,"_blank")},v=e=>{(0,d.A)({title:(0,r.__)("Are you sure?","eventin"),content:(0,r.__)("Are you sure you want to delete this template?","eventin"),onOk:()=>(async e=>{try{await m.A.template.deleteTemplate(e),t(!0),(0,i.doAction)("eventin_notification",{type:"success",message:(0,r.__)("Successfully deleted the template!","eventin")})}catch(e){(0,i.doAction)("eventin_notification",{type:"error",message:(0,r.__)("Failed to delete the template!","eventin")})}})(e)})};return(0,n.createElement)(s.g,null,e.map((e,t)=>(0,n.createElement)("div",{key:e.id,className:"template-card-item"},(0,n.createElement)(p.A,{selectedTemplateId:u,templateType:a,handleClick:()=>l(e),handleDeleteConfirm:v,handleEdit:f,template:e}))))})},47079(e,t,a){a.d(t,{A:()=>w});var n=a(51609),l=a(29491),i=a(47143),r=a(86087),o=a(52619),c=a(27723),s=a(71133),d=a(6836),p=a(64282),m=a(82654),u=a(58892),g=a(51572);const f="https://product.themewinter.com/eventin-template",v=`${f}/wp-json/eventin/v2/templates?is_remote=true`,h=`${f}/?action=etn-preview-template&template_id=`;(0,d.assetURL)("/images/event_certificate.webp"),(0,d.assetURL)("/images/event_ticket.webp");const x=(0,i.withDispatch)(e=>({setShowCreateTemplateModal:e("eventin/global").setShowCreateTemplateModal,invalidateTemplateList:()=>e("eventin/global").invalidateResolution("getTemplateList")})),b=(0,i.withSelect)(e=>({showCreateTemplateModal:e("eventin/global").getShowCreateTemplateModal(),templateLists:e("eventin/global").getTemplateList()})),w=(0,l.compose)([b,x])(function(e){const{templateType:t,showCreateTemplateModal:a,setShowCreateTemplateModal:l,invalidateTemplateList:i,selectedEditor:d,templateLists:f}=e||{},[x,b]=(0,r.useState)(t||"event"),[w,E]=(0,r.useState)(!1),[y,_]=(0,r.useState)({}),[k,A]=(0,r.useState)(!1),[T,S]=(0,r.useState)({event:[],certificate:[],ticket:[]});(0,r.useEffect)(()=>{b("speaker"===t?"event":t||"event")},[t]),(0,r.useEffect)(()=>{(async()=>{try{A(!0);const e=await fetch(v),t=await e.json(),a=d||window?.localized_data_obj?.selected_template_builder||"gutenberg",n=Array.isArray(t)?t.filter(e=>e?.template_builder===a):[];n&&n.length>0?S({event:n.filter(e=>"event"===e?.type),certificate:n.filter(e=>"certificate"===e?.type),ticket:n.filter(e=>"ticket"===e?.type)}):Array.isArray(t)&&S({event:t.filter(e=>"event"===e?.type),certificate:t.filter(e=>"certificate"===e?.type),ticket:t.filter(e=>"ticket"===e?.type)})}catch(e){console.error("Error fetching templates:",e)}finally{A(!1)}})()},[]);const C=!!window.localized_data_obj?.evnetin_pro_active;return(0,n.createElement)(u.vq,{open:a,onCancel:()=>l(!1),footer:!1,width:"65vw",destroyOnHidden:!0,wrapClassName:"etn-template-create-modal",title:(0,c.__)("Choose a template","eventin")},(0,n.createElement)("div",{className:"etn-template-view-wrapper"},(0,n.createElement)("div",{className:"etn-template-header"},(0,n.createElement)(s.s,{value:x,onChange:b})),!C&&Array.isArray(f)&&1===f?.filter(e=>!e.isStatic).length&&(0,n.createElement)(m.A,{message:(0,c.__)("Upgrade to Eventin Pro to create unlimited templates!","eventin"),type:"warning",style:{marginBottom:"12px",width:"fit-content"}}),(0,n.createElement)("div",{className:"etn-template-view-content"},(0,n.createElement)(g.A,{templateLists:f,templates:T[x],templateType:x,createBlankTemplate:async()=>{E(!0);let e="\x3c!-- wp:paragraph --\x3e\n<p></p>\n\x3c!-- /wp:paragraph --\x3e";"certificate"!==x&&"ticket"!==x||(e='\x3c!-- wp:eventin-pro/template-container --\x3e\n<div class="wp-block-eventin-pro-template-container"><div><div id="eventin-container-block-wrapper"><div class="etn-downloadable-container" style="border-radius:0px 0px 0px 0px;margin:0px auto 0px auto;padding:20px 20px 20px 20px;background-color:#f3f3f3;min-height:600px;max-width:850px"><div class="eventin-container-block"></div></div></div></div></div>\n\x3c!-- /wp:eventin-pro/template-container --\x3e');try{const t=await p.A.template.createTemplate({name:`New ${x} template`,orientation:"landscape",content:e,status:"draft",type:x});l(!1),i();const a=t?.edit_link;a&&window.open(`${a}`,"_blank")}catch(e){console.error("Error creating template:",e),(0,o.doAction)("eventin_notification",{type:"error",message:e.message}),l(!1)}finally{E(!1)}},useTemplate:async e=>{_(!0),_(t=>({...t,[e.id]:!0}));try{const t=await p.A.template.createTemplate({name:e.name||`New ${e.type} template`,orientation:e.orientation||"landscape",content:e.content||"",status:"draft",type:e.type});l(!1),i();const a=t?.edit_link;a&&window.open(`${a}`,"_blank")}catch(e){console.error("Error using template:",e),(0,o.doAction)("eventin_notification",{type:"error",message:e.message}),l(!1)}finally{_(t=>({...t,[e.id]:!1}))}},previewTemplate:e=>{window.open(`${h}${e}`,"_blank")},templateLoading:k,loadingBlankTemplate:w,loadingUseTemplate:y}))))})},48290(e,t,a){a.d(t,{A:()=>m});var n=a(51609),l=a(16370),i=a(92911),r=a(47152),o=a(27723),c=a(54725),s=a(7638),d=a(18448),p=a(5063);const m=()=>(0,n.createElement)(p.GI,{className:"wrapper"},(0,n.createElement)("h3",{className:"header-title"},(0,o.__)("Template Builder","eventin")),(0,n.createElement)("p",{className:"header-desc"},(0,o.__)("Easily create landing pages, tickets, and certificates in just a few steps.","eventin")),(0,n.createElement)(r.A,{className:"intro",gutter:[30,30],align:"middle"},d.W.map(e=>(0,n.createElement)(l.A,{xs:24,sm:24,md:12,lg:8,key:e.key},(0,n.createElement)(p.$4,{color:e.color},(0,n.createElement)("img",{src:e.image}),(0,n.createElement)("div",{className:"content-wrapper"},(0,n.createElement)("h4",{className:"content-wrapper-title"},e.title),(0,n.createElement)(i.A,{vertical:!0,gap:4},e.lists.map(e=>(0,n.createElement)("p",{className:"content-wrapper-description",key:e},e))),(0,n.createElement)(s.Ay,{variant:s.Qq,sx:{color:e.color,fontSize:"16px",fontWeight:600},icon:(0,n.createElement)(c.NewTabOpenIcon,{color:e.color}),iconPosition:"end",onClick:()=>window.open(e.docs_link,"_blank")},(0,o.__)("learn More","eventin"))))))))},51572(e,t,a){a.d(t,{A:()=>g});var n=a(51609),l=a(27723),i=a(16370),r=a(47152),o=a(75063),c=a(428),s=a(54725),d=a(75093),p=a(6836),m=a(58892);const u={certificate:(0,p.assetURL)("/images/event_certificate.webp"),ticket:(0,p.assetURL)("/images/event_ticket.webp")},g=e=>{const{templateLists:t,templates:a,templateType:p,createBlankTemplate:g,useTemplate:f,previewTemplate:v,templateLoading:h,loadingBlankTemplate:x,loadingUseTemplate:b}=e||{},w={height:40,width:160,textAlign:"center",border:"1px solid #6B2EE5",color:"#6B2EE5",fontSize:16,fontWeight:600,padding:"0px 16px",backgroundColor:"white",cursor:"pointer","&:hover":{backgroundColor:"#6B2EE5 !important",color:"white !important"}},E={event:(0,l.__)("Event Landing","eventin"),certificate:(0,l.__)("Event Certificate","eventin"),ticket:(0,l.__)("Event Ticket","eventin")},y=!!window.localized_data_obj.evnetin_pro_active,_=E[p]||"";return(0,n.createElement)(r.A,{gutter:[16,16]},(0,n.createElement)(i.A,null,(0,n.createElement)(m.Uj,{onClick:y||"event"===p?g:void 0,disabled:!y&&"event"!==p,onKeyDown:e=>"Enter"===e.key&&g()},(0,n.createElement)(c.A,{spinning:x},!y&&"event"!==p||!y&&1===t.length?(0,n.createElement)(d.ProButton,null):(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.PlusCircleOutlined,{width:36,height:36}),(0,n.createElement)("p",null,(0,l.__)("Create your own","eventin")," ",(0,n.createElement)("br",null)," ",_))))),h?(0,n.createElement)(n.Fragment,null,(0,n.createElement)(i.A,{key:1},(0,n.createElement)(o.A.Node,{active:!0,style:{width:280,height:280}})),(0,n.createElement)(i.A,{key:2},(0,n.createElement)(o.A.Node,{active:!0,style:{width:280,height:280}}))):a?.map(e=>(0,n.createElement)(i.A,{key:e.id},(0,n.createElement)(m.xW,null,(0,n.createElement)(m.iX,{src:e.thumbnail||u[p]}),(0,n.createElement)("div",{className:"template-name-overlay"},(0,n.createElement)("div",{className:"etn-template-card-action"},!y&&"event"!==p||!y&&1===t.length?(0,n.createElement)(d.ProButton,null):(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.Button,{onClick:()=>f(e),loading:b[e.id]||!1,sx:w},(0,l.__)("Use this template","eventin")),(0,n.createElement)(d.Button,{onClick:()=>v(e.id),sx:w},(0,l.__)("Preview now","eventin")))))))))}},57922(e,t,a){a.d(t,{A:()=>l});var n=a(86087);const l=e=>{const[t,a]=(0,n.useState)({event:null,ticket:null,certificate:null,speaker:null}),l=(0,n.useCallback)((e,t)=>{a(a=>({...a,[e]:{...t}}))},[]),i=(0,n.useCallback)(e=>t[e],[t]);return(0,n.useEffect)(()=>{Array.isArray(e)&&e.forEach(e=>{e.is_default&&a(t=>({...t,[e.type]:{...e}}))})},[e]),{selectedTemplates:t,selectTemplate:l,getSelectedTemplate:i}}},58892(e,t,a){a.d(t,{Uj:()=>r,iX:()=>c,vq:()=>i,xW:()=>o});var n=a(69815),l=a(19549);const i=(0,n.default)(l.A)`
	.ant-modal-content {
		padding: 0;
		border-radius: 8px;

		.ant-modal-header {
			margin: 0;
		}

		.ant-modal-title {
			padding: 26px 24px;
			font-size: 26px;
			font-weight: 600;
			line-height: 1;
			background-color: #ffffff;
			border-radius: 8px 8px 0 0;
		}

		.ant-modal-body {
			padding: 20px 24px 22px;
			background-color: #f3f5f7;
			border-radius: 0 0 8px 8px;
			img {
				display: block;
				width: 100%;
			}
		}
	}
	.etn-template-header {
		margin-bottom: 25px;
		border-radius: 4px 4px 0 0;
		border-bottom: 1px solid #ddd;
	}

	.etn-template-view-wrapper {
		width: 100%;
		height: 70vh;
		overflow-y: auto;
		overflow-x: hidden;
	}
`,r=n.default.div`
	border: 1px solid rgba( 0, 0, 0, 0.06 );
	padding: 0px;
	border-radius: 6px;
	width: 280px;
	height: 280px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f5f5f5;
	border-radius: 8px;
	border: 1px solid rgba( 0, 0, 0, 0.06 );

	&:hover {
		cursor: pointer;
		background-color: #170a3233;
	}

	.anticon {
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		width: 100%;
		color: #6b2ee5;
	}

	p {
		font-size: 14px;
		font-weight: 600;
		line-height: 22px;
		margin: 0;
		text-align: center;
	}
`,o=n.default.div`
	position: relative;
	overflow: hidden;
	width: 280px;
	height: 280px;
	background-color: #fff;
	border-radius: 8px;
	border: 1px solid rgba( 0, 0, 0, 0.06 );
	.template-name-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 8px;
		background-color: #170a3233;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.etn-template-card-action {
		gap: 10px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate( -50%, -50% );
		display: none;
		opacity: 0;
	}

	&:hover {
		.template-name-overlay {
			opacity: 1;
		}
		.etn-template-card-action {
			display: flex;
			opacity: 1;
		}
	}
`,c=n.default.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url( ${({src:e})=>e} );
	background-size: cover;
	background-position: top center;
	background-repeat: no-repeat;
`},64074(e,t,a){a.d(t,{P:()=>n});const n=a(69815).default.div`
	.ant-segmented {
		padding: 10px;
		border-radius: 6px;
		width: 100%;

		.ant-segmented-item {
			border: 1px solid transparent;
			border-radius: 4px;
			padding: 4px 20px;
			font-weight: 500;
		}
		.ant-segmented-item-selected {
			color: #6b2ee5;
			align-items: center;
		}
	}
	.ant-segmented-item-label {
		min-height: 50px;
		line-height: 53px;
		padding: 0 18px;
		font-size: 16px !important;
		font-weight: 600;
	}

	.button-title {
		display: flex;
		align-items: center;
		gap: 8px;
	}
`},71133(e,t,a){a.d(t,{s:()=>p});var n=a(51609),l=a(86087),i=a(27723),r=a(40372),o=a(11804),c=a(54725),s=a(64074);const{useBreakpoint:d}=r.Ay,p=({value:e="event",onChange:t,isSpeaker:a})=>{const r=!d()?.md,p=(0,l.useMemo)(()=>[{label:(0,n.createElement)("span",{className:"button-title"},(0,n.createElement)(c.EventTemplateIcon,{width:16,height:16})," ",(0,i.__)("Event Landing","eventin")),value:"event"},{label:(0,n.createElement)("span",{className:"button-title"},(0,n.createElement)(c.TicketIcon,{width:16,height:16})," ",(0,i.__)("Tickets","eventin")),value:"ticket"},{label:(0,n.createElement)("span",{className:"button-title"},(0,n.createElement)(c.CertificateIcon,{width:16,height:16})," ",a?(0,i.__)("Speaker","eventin"):(0,i.__)("Certificate","eventin")),value:a?"speaker ":"certificate"}],[]);return(0,n.createElement)(s.P,null,(0,n.createElement)(o.A,{options:p,value:e,size:"large",onChange:t,vertical:!!r}))}},72725(e,t,a){a.d(t,{P:()=>n});const n=(e=[],t)=>{if(!Array.isArray(e)||0===e.length)return!1;const a=e.find(e=>e&&e.id===t);return!!a&&Boolean(a.is_active)}},74349(e,t,a){a.d(t,{A:()=>o});var n=a(51609),l=a(86087),i=a(500),r=a(48290);const o=()=>{var e;const[t,a]=(0,l.useState)(null===(e=JSON.parse(localStorage.getItem("showGuideModal")))||void 0===e||e),o=()=>{localStorage.setItem("showGuideModal",!1),a(!1)};return(0,n.createElement)(i.A,{open:t,destroyOnHidden:!0,onCancel:o,onOk:o,footer:null,maskClosable:!1,width:"75vw",className:"create-template-guide-modal"},(0,n.createElement)(r.A,null))}},74871(e,t,a){a.d(t,{$w:()=>i,Gj:()=>r,d4:()=>l});var n=a(69815);const l=n.default.div`
	.eve-editor-list {
		font-size: 14px;
		line-height: 18px;
		color: #454545;

		.eve-link {
			color: #6b2ee5;
			font-weight: 500;
			cursor: pointer;
		}
	}
`,i=n.default.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-width: 120px;
	min-height: 120px;
	border-radius: 6px;
	border: 1px solid ${({active:e})=>e?"#6B2EE5":"#F0F0F0"};
	position: relative;
	cursor: pointer;
	h4 {
		color: #334155;
		font-size: 14px;
		font-weight: 500;
		line-height: 16px;
		margin: 12px 0px 0px 0px;
	}

	.eve-svg-wrapper {
		position: absolute;
		top: 8px;
		right: 8px;
	}
`,r=n.default.div`
	background-color: #f5f5f5;
	padding: 20px;
	border-radius: 6px;
	margin-top: 12px;

	h3 {
		font-weight: 600;
		font-size: 18px;
		color: #454545;
		margin: 0px;
	}
	p {
		font-size: 14px;
		line-height: 18px;
		color: #454545;
	}
`},77247(e,t,a){a.d(t,{A:()=>c});var n=a(51609),l=a(27723),i=a(80560),r=a(54725),o=a(6525);const c=({activeTab:e,setActiveTab:t,children:a})=>{const c=[{key:"event",label:(0,n.createElement)("span",{style:{display:"flex",alignItems:"center",gap:"8px"}},(0,n.createElement)(r.LandingPageIcon,null),(0,l.__)("Landing page","eventin")),children:a.event},{key:"ticket",label:(0,n.createElement)("span",{style:{display:"flex",alignItems:"center",gap:"8px"}},(0,n.createElement)(r.TicketIcon,null),(0,l.__)("Tickets","eventin")),children:a.tickets},{key:"certificate",label:(0,n.createElement)("span",{style:{display:"flex",alignItems:"center",gap:"8px"}},(0,n.createElement)(r.CertificateIcon,null),(0,l.__)("Certificate","eventin")),children:a.certificate},{key:"speaker",label:(0,n.createElement)("span",{style:{display:"flex",alignItems:"center",gap:"8px"}},(0,n.createElement)(r.SpeakerAndOrganizerIcon,null),(0,l.__)("Speaker","eventin")),children:a.speaker}];return(0,n.createElement)(o.g,null,(0,n.createElement)(i.A,{activeKey:e,onChange:t,items:c,style:{marginTop:"24px"}}))}},80624(e,t,a){a.d(t,{c:()=>s});var n=a(51609),l=a(86087),i=a(27723),r=a(7638),o=a(64282),c=a(74871);const s=({setInstallResponse:e,selectedEditor:t})=>{const[a,s]=(0,l.useState)(!1);return(0,n.createElement)(c.Gj,null,(0,n.createElement)("h3",null,(0,i.__)("It seems that the page builder you selected is inactive.","eventin")),(0,n.createElement)("p",null,(0,i.__)("By selecting Elementor, you can edit all Event, Certificate, and Ticket templates with ease. Create your own designs using both Eventin’s widgets and Elementor’s widgets easily.","eventin")),(0,n.createElement)(r.Ay,{variant:r.Vt,onClick:async()=>{s(!0);try{const a=await o.A.template.activeSelectedEditor({builder_id:t});return e(a),a}catch(e){console.log(e)}finally{s(!1)}},loading:a},(0,i.__)("Install & Active","eventin")))}},87968(e,t,a){a.d(t,{A:()=>p});var n=a(51609),l=a(69815),i=a(92911),r=a(75063);const o=l.default.div`
	padding: 24px;
	background: white;
	border-radius: 8px;
	box-shadow: 0 1px 3px rgba( 0, 0, 0, 0.1 );
`,c=l.default.div`
	padding: 24px;
	background: white;
`,s=(l.default.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	margin-bottom: 24px;
	flex-wrap: wrap;

	@media ( max-width: 768px ) {
		flex-direction: column;
		gap: 24px;

		> div {
			width: 100%;
			justify-content: flex-start;
			flex-wrap: wrap;
		}
	}
`,l.default.div`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 1fr 1fr 80px;
	padding: 12px 0;
	background: #f9fafb;
	margin-bottom: 8px;
	border-radius: 4px;

	@media ( max-width: 1024px ) {
		grid-template-columns: 40px 2fr 1fr 1fr 1fr 80px;
	}

	@media ( max-width: 768px ) {
		grid-template-columns: 40px 2fr 1fr 1fr 80px;
	}

	@media ( max-width: 576px ) {
		display: none;
	}
`),d=l.default.div`
	display: grid;
	grid-template-columns: 40px 2fr 1fr 1fr 1fr 1fr 80px;
	padding: 16px 0;
	align-items: center;
	border-bottom: 1px solid #f0f0f0;

	@media ( max-width: 1024px ) {
		grid-template-columns: 40px 2fr 1fr 1fr 1fr 80px;
	}

	@media ( max-width: 768px ) {
		grid-template-columns: 40px 2fr 1fr 1fr 80px;
	}

	@media ( max-width: 576px ) {
		grid-template-columns: 20px 1.5fr 1fr 1fr 80px;
		> div:first-of-child {
			display: none;
		}
		> div:nth-of-child( 7 ) {
			display: none;
		}
	}
`,p=()=>(0,n.createElement)(o,null,(0,n.createElement)(c,null,(0,n.createElement)(s,null,(0,n.createElement)("div",null),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:80}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:80}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:80}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:80}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:80}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:80}})),[1,2,3,4,5,6].map(e=>(0,n.createElement)(d,{key:e},(0,n.createElement)("div",null),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:"80%"}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:"80%"}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:"80%"}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:"80%"}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:"80%"}}),(0,n.createElement)(r.A.Button,{active:!0,size:"small",style:{width:"80%"}}))),(0,n.createElement)(i.A,{justify:"space-between",style:{marginTop:24},wrap:"wrap",gap:16},(0,n.createElement)(r.A.Button,{active:!0,style:{width:150}}),(0,n.createElement)(r.A.Button,{active:!0,style:{width:200}}))))}}]);