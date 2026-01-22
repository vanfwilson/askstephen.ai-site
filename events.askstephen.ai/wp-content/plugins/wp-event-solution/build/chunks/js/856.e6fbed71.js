"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[856],{10110(e,t,n){n.d(t,{A:()=>r});var i=n(51609),a=(n(27723),n(53441)),o=n(53303);const r=()=>(0,i.createElement)(i.Fragment,null,(0,i.createElement)(a.A,null),(0,i.createElement)(o.A,null))},19575(e,t,n){n.d(t,{A:()=>r});var i=n(52619),a=n(27723),o=n(64282);const r=async(e,t)=>{try{const n=await o.A.extensions.updateExtension({name:e,status:t});return(0,i.doAction)("eventin_notification",{type:"success",message:n?.message}),!0}catch(e){return(0,i.doAction)("eventin_notification",{type:"error",message:e?.message||(0,a.__)("Update failed! Please check the plugin list and try again.","eventin")}),!1}}},29705(e,t,n){n.d(t,{A:()=>r});var i=n(51609),a=(n(27723),n(61660)),o=n(88976);const r=()=>(0,i.createElement)(i.Fragment,null,(0,i.createElement)(a.A,null),(0,i.createElement)(o.A,null))},34264(e,t,n){n.d(t,{A:()=>o});var i=n(51609),a=n(6836);const o=({height:e=22,width:t=22})=>(0,a.iconCreator)(()=>(({height:e,width:t})=>(0,i.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"none",viewBox:"0 0 20 20"},(0,i.createElement)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.5",d:"M6.25 4.121h7.083c.69 0 1.25.56 1.25 1.25v1.25M12.5 10.788h-5M10 14.121H7.5"}),(0,i.createElement)("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:"1.5",d:"M15.414 1.667H5.256c-.414 0-.837.06-1.172.306-1.062.78-1.88 2.517-.228 4.086.464.44 1.112.6 1.75.6h9.63c.662 0 1.847.095 1.847 2.114v6.211a3.34 3.34 0 0 1-3.33 3.35H6.226c-1.836 0-3.172-1.298-3.277-3.274L2.922 4.304"})))({height:e,width:t}))},39041(e,t,n){n.d(t,{A8:()=>f,BT:()=>A,MD:()=>c,MN:()=>h,PQ:()=>z,UC:()=>w,UM:()=>_,YH:()=>u,ZB:()=>E,_f:()=>v,ee:()=>k,ff:()=>p,gV:()=>m,os:()=>y,wi:()=>b,wn:()=>g,xe:()=>x});var i=n(6836),a=n(69815),o=n(77278),r=n(92911);const l=(0,i.assetURL)("/images/setup_wizard.webp"),s=(0,i.assetURL)("/images/welcome_image.webp"),d=(0,i.assetURL)("/images/setup_widget_bg.webp"),p=a.default.div`
	background-color: #f4f6fa;
	padding: 12px 32px;
	min-height: 100vh;
`,c=(a.default.div`
	h3 {
		margin-top: 10px;
	}
	.etn-card-setup-wizard {
		position: relative;
		overflow: hidden;
		background-image: url( ${l} );
		background-position: 95% 100%;
		background-size: contain;
		background-repeat: no-repeat;

		@media screen and ( max-width: 1200px ) {
			background-position: 130% 0px;
			background-size: 72%;
		}
		@media screen and ( max-width: 992px ) {
			background-image: none;
		}
	}
	.etn-card-help-center {
		position: relative;
		overflow: hidden;
		background-image: url( ${s} );
		background-position: 100% 100%;
		background-size: contain;
		background-repeat: no-repeat;

		@media screen and ( max-width: 1200px ) {
			background-position: 130% 0px;
			background-size: 64%;
		}
		@media screen and ( max-width: 992px ) {
			background-image: none;
		}
	}
	.etn-card-help-cards {
		padding: 0px 40px;
		img {
			width: 80px;
			height: 80px;
		}
		@media screen and ( max-width: 992px ) {
			padding: 0px 10px;
			img {
				width: 50px;
				height: 50px;
			}
		}
	}
`,(0,a.default)(o.A)`
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba( 0, 0, 0, 0.1 );
	text-align: center;
	margin-bottom: 0px;
	.ant-card-body {
		padding: 24px;
	}
	h3 {
		font-size: 18px;
		font-weight: bold;
	}
`,a.default.div`
	max-width: 1360px;
	margin: 0 auto;
	.ant-tabs-nav-wrap {
		background-color: white;
		border-radius: 0px;
	}

	.ant-tabs-tab {
		font-size: 18px;
		font-weight: 600;
		padding: 16px 30px;
		color: #334155;
	}
`),m=a.default.div`
	position: relative;
	padding: 20px 40px 60px 60px;
	background: #fff;
	overflow: hidden;
	border-radius: 8px;
	margin-bottom: 40px;

	@media screen and ( max-width: 768px ) {
		padding: 40px 20px 60px 20px;
		margin-bottom: 20px;
	}
	.about-content-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 30px;

		@media screen and ( max-width: 768px ) {
			flex-direction: column;
			text-align: center;
		}
	}

	.about-content {
		flex-basis: 60%;
		@media screen and ( max-width: 768px ) {
			order: 2;
		}
	}
	.about-top-right-shape {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		@media screen and ( max-width: 768px ) {
			display: none;
		}
	}

	.about-image-u-shape {
		position: absolute;
		top: 20px;
		right: 155px;
		z-index: 1;
		@media screen and ( max-width: 768px ) {
			display: none;
		}
	}

	.about-bottom-shape {
		position: absolute;
		bottom: -6px;
		right: 0px;
		@media screen and ( max-width: 768px ) {
			display: none;
		}
	}

	.about-image {
		border-radius: 8px;
		flex-basis: 40%;
		position: relative;

		@media screen and ( max-width: 768px ) {
			width: 100%;
			margin-top: 30px;
			order: 1;
		}
		img {
			width: 100%;
			height: auto;
			border-radius: 8px;
		}
	}

	h3 {
		font-size: 28px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #111827;
		@media screen and ( max-width: 768px ) {
			font-size: 24px;
		}
	}

	p {
		font-size: 16px;
		color: #595959;
		line-height: 1.6;
		margin-bottom: 16px;
	}
`,u=a.default.div`
	padding: 20px 40px 60px 60px;
	background: #fff;
	overflow: hidden;
	border-radius: 8px;
	margin-bottom: 40px;

	@media screen and ( max-width: 768px ) {
		padding: 40px 20px 60px 20px;
		margin-bottom: 20px;
	}
	h3 {
		font-size: 28px;
		font-weight: bold;
		margin-bottom: 20px;
		color: #111827;
	}
`,g=a.default.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #ffffff;
	border-radius: 12px;
	gap: 40px;
	min-height: 280px;
	padding-inline: 50px 80px;
	background-image: url( ${d} );
	background-repeat: no-repeat;
	background-position: right;

	@media screen and ( max-width: 992px ) {
		flex-direction: column;
		padding-inline: 30px;
		background-position: 95% 100%;
		align-items: flex-start;
		min-height: 300px;
		background-size: cover;
		padding-block: 20px 35px;
		gap: 20px;
	}

	@media screen and ( max-width: 768px ) {
		flex-direction: column;
		padding-inline: 20px;
		background-position: bottom right;
		align-items: flex-start;
		background-size: cover;
		padding-block: 20px 35px;
		gap: 20px;
	}
`,h=a.default.div`
	flex: 2;

	h2 {
		font-size: 26px;
		font-weight: 500;
		color: #212327;
		margin: 0px;
		margin-bottom: 12px;
	}

	p {
		color: #41454f;
		margin-bottom: 20px;
		font-size: 16px;
		line-height: 22px;
		margin: 0px;
		margin-bottom: 32px;
	}
`,x=a.default.div`
	flex: 1;
	max-width: 400px;
	width: 100%;

	.ant-carousel .slick-dots-bottom {
		bottom: -30px;

		li {
			height: 12px;
			width: 12px;
			border-radius: 100%;
			border: 1.5px solid #00000033;
			button {
				width: 12px;
				height: 12px;
				border-radius: 100%;
				background: #00000033;
			}
			&.slick-active {
				&::after {
					background: #00000033;
					opacity: 1;
					width: 100%;
					height: 100%;
					border-radius: 100%;
				}
			}
		}
	}

	@media screen and ( max-width: 992px ) {
		max-width: 100%;
	}
`,v=a.default.div`
	border-radius: 12px;
	padding: 20px;
	min-height: 160px;
	border: 1px solid #c3c5cb;
`,w=a.default.p`
	font-size: 16px;
	line-height: 22px;
	color: #41454f;
	margin-bottom: 20px;
`,b=a.default.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;

	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid #c3c5cb;
	}
`,_=a.default.span`
	font-weight: 500;
	color: #333;
`,f=a.default.div`
	display: flex;
	gap: 2px;
	flex-direction: column;
`,y=a.default.div`
	padding: 40px;
	background: #fff;
	margin-top: 40px;
	border-radius: 6px;

	@media screen and ( max-width: 768px ) {
		padding: 20px;
	}

	h1 {
		font-size: 26px;
		font-weight: 600;
		color: #212327;
		line-height: 38px;
		margin-bottom: 20px;
	}
`,k=a.default.div`
	border-radius: 12px;
	padding: 20px;
	border: 1px solid #d9d9d9;
	height: 100%;
	.ant-card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 12px;
	}

	@media screen and ( max-width: 1024px ) {
		padding: 12px;
	}

	@media screen and ( max-width: 768px ) {
		padding: 10px;
	}
`,E=a.default.h3`
	font-size: 18px;
	font-weight: 600;
	margin: 0;
	margin-bottom: 12px;
	color: #262626;

	@media screen and ( max-width: 1024px ) {
		font-size: 16px;
	}

	@media screen and ( max-width: 768px ) {
		font-size: 14px;
	}
`,A=a.default.p`
	font-size: 14px;
	margin: 0;
	color: #414454;
	line-height: 20px;

	@media screen and ( max-width: 768px ) {
		font-size: 12px;
	}
`,z=(0,a.default)(r.A)`
	gap: 8px;
	margin-top: 10px;

	@media screen and ( max-width: 768px ) {
		gap: 0px;
		margin-top: 5px;
	}
`},43129(e,t,n){n.d(t,{A:()=>s});var i=n(51609),a=n(56427),o=n(92911),r=n(18062),l=n(27154);function s(e){const{title:t}=e;return(0,i.createElement)(a.Fill,{name:l.PRIMARY_HEADER_NAME},(0,i.createElement)(o.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,i.createElement)(r.A,{title:t})))}},53303(e,t,n){n.d(t,{A:()=>h});var i=n(51609),a=n(27723),o=n(29491),r=n(47143),l=n(86087),s=n(16370),d=n(47152),p=n(39041),c=n(56621),m=n(70228);const u=(0,r.withDispatch)(e=>{const t=e("eventin/global");return{invalidatePluginList:()=>t.invalidateResolution("getPluginList")}}),g=(0,r.withSelect)(e=>({pluginsList:e("eventin/global").getPluginList()})),h=(0,o.compose)(g,u)(e=>{const{pluginsList:t,invalidatePluginList:n}=e||{},[o,r]=(0,l.useState)(!0);return(0,l.useEffect)(()=>{null!=t&&r(!1)},[t]),o?(0,i.createElement)(m.A,null):(0,i.createElement)(p.YH,null,(0,i.createElement)("h3",null,(0,a.__)("Our plugins","eventin")),(0,i.createElement)("div",{className:"etn-module-section"},(0,i.createElement)(d.A,{gutter:[30,30]},t.map(e=>(0,i.createElement)(s.A,{key:e.name,xs:24,sm:12,xl:8},(0,i.createElement)(c.A,{...e,invalidatePluginList:n}))))))})},53441(e,t,n){n.d(t,{A:()=>s});var i=n(51609),a=n(27723),o=n(54725),r=n(39041),l=n(8228);const s=()=>{const e=(0,l.A)("/images/about_us_image.webp");return(0,i.createElement)(r.gV,null,(0,i.createElement)("span",{className:"about-top-right-shape"},(0,i.createElement)(o.AboutTopRightShapeIcon,null)),(0,i.createElement)("span",{className:"about-bottom-shape"},(0,i.createElement)(o.AboutBottomShapeSvg,null)),(0,i.createElement)("div",{className:"about-content-wrapper"},(0,i.createElement)("div",{className:"about-content"},(0,i.createElement)("h3",null,(0,a.__)("About Our Company","eventin")),(0,i.createElement)("p",null,(0,a.__)("Arraytics is a software company founded in 2013, specializing in WordPress, AI, Machine Learning, SaaS, and mobile applications. We’re committed to delivering high-quality tech solutions that help businesses grow and simplify people’s lives.","eventin")),(0,i.createElement)("p",null,(0,a.__)("Today, our products are trusted by nearly 70,000 customers across 120+ countries, powered by a passionate team of 30+ experts with over 12 years of industry experience. We’re proud to be a Level 12 author on Envato.","eventin"))),(0,i.createElement)("div",{className:"about-image"},(0,i.createElement)("img",{src:e,alt:(0,a.__)("About Image","eventin")}),(0,i.createElement)("span",{className:"about-image-u-shape"},(0,i.createElement)(o.AboutImageUShapeIcon,null)))))}},56621(e,t,n){n.d(t,{A:()=>x});var i=n(51609),a=n(86087),o=n(27723),r=n(34264),l=n(75093),s=n(7638),d=n(92911),p=n(67313),c=n(76450),m=n(19575);const{Title:u,Text:g,Link:h}=p.A,x=({name:e,title:t,description:n,status:p,notice:h,icon:x,settings_link:v,demo_link:w,doc_link:b,is_pro:_,upgrade_link:f,upgrade:y,deps:k,invalidatePluginList:E})=>{const[A,z]=(0,a.useState)(!1),R=async t=>{z(!0),await(0,m.A)(e,t),E(),z(!1)},L={fontSize:"16px",padding:"6px 14px"};return(0,i.createElement)(c.vi,null,(0,i.createElement)("div",{className:"etn-plugin-card-header"},x&&(0,i.createElement)("img",{src:x,alt:t,style:{width:"50px",height:"50px"}})),(0,i.createElement)("div",{className:"etn-plugin-card-body"},(0,i.createElement)(u,{level:4,style:{margin:"10px 0",fontSize:"20px"}},t),(0,i.createElement)("div",{className:"etn-card-desc"},(0,i.createElement)("div",{style:{marginBottom:"20px"}},(0,i.createElement)(g,{className:"etn-paragraph"},n.length>92?`${n.slice(0,92)}...`:n)," ",(0,i.createElement)("br",null),h&&(0,i.createElement)(g,{style:{display:"flex",color:"#ff7129",marginTop:"10px"}},h),(0,i.createElement)("div",{className:"etn-doc-link"},(0,i.createElement)(l.LinkText,{href:b,target:"_blank"},(0,i.createElement)(r.A,null)," ",(0,o.__)("Documentation","eventin")))))),(0,i.createElement)("div",{className:"etn-card-actions"},"on"==p&&(0,i.createElement)(s.Ay,{variant:s.zB,onClick:()=>{R("install")},target:"_blank",sx:L,loading:A},(0,o.__)("Install","eventin")),"install"==p&&(0,i.createElement)(s.Ay,{variant:s.zB,onClick:()=>{R("activate")},target:"_blank",sx:L,loading:A},(0,o.__)("Activate","eventin")),"upgrade"==p&&y&&(0,i.createElement)(s.Ay,{variant:s.zB,href:f,target:"_blank",sx:L,loading:A},(0,o.__)("Download","eventin")),"activate"==p&&(0,i.createElement)(d.A,{gap:20,wrap:"wrap"},(0,i.createElement)(s.Ay,{variant:s.Vt,onClick:()=>{R("deactivate")},target:"_blank",sx:L,loading:A},(0,o.__)("Deactivate","eventin")),v&&(0,i.createElement)(s.Ay,{variant:s.Vt,target:"_blank",sx:L,href:v},(0,o.__)("Configure","eventin")))))}},61660(e,t,n){n.d(t,{A:()=>h});var i=n(51609),a=n(75093),o=n(7638),r=n(28266),l=n(55539),s=n(27723),d=n(36877),p=n(5394),c=n(92911),m=n(40372),u=n(86382),g=n(39041);const h=()=>{const e=localized_data_obj.admin_url+"admin.php?page=etn-wizard",{useBreakpoint:t}=m.Ay,n=t();return(0,i.createElement)(g.wn,null,(0,i.createElement)(g.MN,null,(0,i.createElement)("h2",{level:3},(0,s.__)("Setup Wizard","eventin")),(0,i.createElement)("p",{style:{display:"block",marginBottom:"20px"}},(0,s.__)("Launch Eventin in minutes with our guided Setup Wizard.","eventin")," ",n.md&&(0,i.createElement)("br",null),(0,s.__)("From event settings to ticketing and payments — we’ll walk you ","eventin"),n.md&&(0,i.createElement)("br",null),(0,s.__)(" through everything step by step.","eventin")),(0,i.createElement)(o.Ay,{variant:a.primary,href:e,sx:{height:"48px",paddingInline:"24px",fontSize:"16px"}},(0,s.__)("Get started","eventin"))),(0,i.createElement)(g.xe,null,(0,i.createElement)(p.A,{autoplay:!0,draggable:!0,dotPosition:"bottom",autoplaySpeed:4e3,dots:{className:"slick-dots-bottom"}},u.r.map((e,t)=>(0,i.createElement)(g._f,{key:t},(0,i.createElement)(g.UC,null,e.content.slice(0,130),"..."),(0,i.createElement)(g.wi,null,(0,i.createElement)(d.A,{src:e.image,size:"large",icon:(0,i.createElement)(l.A,null)}),(0,i.createElement)(g.A8,null,(0,i.createElement)(g.UM,null,e.author),(0,i.createElement)(c.A,{gap:2,align:"center"},Array.from({length:e.rating}).map((e,t)=>(0,i.createElement)(r.A,{key:t,style:{color:"#faad14"}}))))))))))}},70228(e,t,n){n.d(t,{A:()=>s});var i=n(51609),a=n(77278),o=n(16370),r=n(47152),l=n(75063);const s=()=>(0,i.createElement)(r.A,{gutter:[16,16]},[...Array(3)].map((e,t)=>(0,i.createElement)(o.A,{xs:24,sm:12,md:8,key:t},(0,i.createElement)(a.A,{style:{borderRadius:8}},(0,i.createElement)(l.A.Avatar,{active:!0,size:"large",shape:"circle",style:{marginBottom:16,marginRight:16}}),(0,i.createElement)(l.A.Input,{style:{width:200,marginBottom:8},active:!0}),(0,i.createElement)(l.A,{paragraph:{rows:4}}),(0,i.createElement)("div",{style:{display:"flex",gap:10,alignItems:"center",marginTop:16}},(0,i.createElement)(l.A.Button,{style:{width:100},active:!0}),(0,i.createElement)(l.A.Button,{style:{width:100},active:!0}))))))},76450(e,t,n){n.d(t,{vi:()=>o});var i=n(27154),a=n(69815);a.default.div`
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
`,a.default.div`
	background: #fff;
	border-radius: 8px;
	margin-bottom: 30px;
	padding: 30px;
	@media ( max-width: 768px ) {
		padding: 20px;
	}
	.etn-extension-title {
		font-size: 24px;
		margin: 25px 0;
		padding: 14px 0;
		display: inline-block;
		border-bottom: 2px solid #d9d9d9;
		margin-top: 0;
	}
	.ant-tabs-tab {
		font-size: 18px;
		font-weight: 600;
		padding: 16px 30px;
	}
	.ant-tabs-top > .ant-tabs-nav::before {
		border-bottom: 2px solid #d9d9d9;
	}
`;const o=a.default.div`
	border-radius: 8px;
	margin: 0;
	min-height: 350px;
	overflow: hidden;
	position: relative;
	border: 1px solid #e6e6e6;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.etn-plugin-card-header {
		display: flex;
		justify-content: space-between;
		gap: 20px;
		padding: 20px;
		@media ( max-width: 768px ) {
			flex-wrap: wrap;
		}
	}
	.etn-plugin-card-body {
		padding: 0 20px 0px 20px;
	}

	.etn-card-actions {
		padding: 20px;
		background: linear-gradient( 90deg, #eff6ff 0%, #f9f5ff 100% );
	}

	.etn-card-desc {
		font-size: 14px;
		color: #838790;

		.etn-paragraph {
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.etn-doc-link {
			color: ${i.PRIMARY_COLOR};
			margin-top: 20px;
			a {
				display: flex;
				gap: 8px;
				font-size: 16px !important;
				font-weight: 600 !important;
				text-decoration: none !important;
			}
		}
		.etn-paragraph {
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
`;a.default.span`
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
`},78856(e,t,n){n.r(t),n.d(t,{default:()=>m});var i=n(51609),a=n(27723),o=n(86087),r=n(80560),l=n(75093),s=n(39041),d=n(29705),p=n(10110),c=n(43129);function m(){const[e,t]=(0,o.useState)("1"),n=[{key:"1",label:(0,a.__)("Getting Started","eventin"),children:(0,i.createElement)(d.A,null)},{key:"2",label:(0,a.__)("About us","eventin"),children:(0,i.createElement)(p.A,null)}];return(0,i.createElement)(s.ff,{className:"eventin-page-wrapper"},(0,i.createElement)(c.A,{title:(0,a.__)("1"===e?"Getting Started":"About us","eventin")}),(0,i.createElement)(s.MD,null,(0,i.createElement)(r.A,{defaultActiveKey:e,onTabClick:e=>t(e),items:n})),(0,i.createElement)(l.FloatingHelpButton,null))}},86382(e,t,n){n.d(t,{E:()=>o,r:()=>r});var i=n(6836),a=n(27723);const o=[{title:(0,a.__)("An Introduction to Eventin","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],description:(0,a.__)("New to Eventin? Start here. This quick guide breaks down how Eventin works and shows you how to build your first event in minutes.","eventin"),docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/eventin/introductions-of-eventin/",video_link:"https://www.youtube.com/watch?v=Vc2chtcGLDU"},{title:(0,a.__)("How to install & activate extensions","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],description:(0,a.__)("Get the most out of Eventin. Learn how to install premium or free extensions to expand functionality like Zoom, ticketing, and automation tools.","eventin"),docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/gettings-started/plugin-installation/",video_link:"https://www.youtube.com/watch?v=Qp1iRy1Ongw"},{title:(0,a.__)("Eventin Setup Walkthrough","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],description:(0,a.__)("A hands-on guide to walk you through the essential setup: event creation, calendar sync, ticket templates, and speaker layouts.","eventin"),docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/gettings-started/plugin-installation/",video_link:"https://www.youtube.com/watch?v=Qp1iRy1Ongw"},{title:(0,a.__)("Ticket Manage","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/event/create-event-tickets-free-paid/",video_link:"https://www.youtube.com/watch?v=Sq-fXHeakoM"},{title:(0,a.__)("Zoom Integration","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/integration/zoom-meeting-2/",video_link:"https://www.youtube.com/watch?v=RGApyZO5bGE&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=9&pp=iAQB"},{title:(0,a.__)("Google Meet Integration","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/integration/google-meet/",video_link:"https://www.youtube.com/watch?v=7RCx6yIKULY"},{title:(0,a.__)("Attendee QR","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/attendee/qr-code/",video_link:"https://www.youtube.com/watch?v=tE6rjoZwnRY&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=1&pp=iAQB0gcJCfYJAYcqIYzv"},{title:(0,a.__)("Event Template Setup","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/template-builder/how-to-create-event-templates/",video_link:"https://www.youtube.com/watch?v=0JUdhlaBOMs&pp=0gcJCfsJAYcqIYzv"},{title:(0,a.__)("Certificate Builder","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/template-builder/certificate-builder-for-attendee/",video_link:"https://www.youtube.com/watch?v=ETWc7ho7Kyc&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=8&pp=iAQB"},{title:(0,a.__)("Organizer & Speaker Setup","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/speakers-and-organizers/how-to-create-eventin-speaker/",video_link:"https://www.youtube.com/watch?v=Naq6znx-oRg"},{title:(0,a.__)("Seatmap Integration","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/visual-seat-map/visual-seat-plan/",video_link:"https://www.youtube.com/watch?v=Vc2chtcGLDU&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=14"},{title:(0,a.__)("Dokan Setup","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/integration/multivendor-event-marketplace/",video_link:"https://www.youtube.com/watch?v=OfOoL6b0nwc&t=9s"},{title:(0,a.__)("Attendee Extra Field","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/attendee/how-to-add-attendee-extra-fields/",video_link:"https://www.youtube.com/watch?v=Vc2chtcGLDU&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=14"},{title:(0,a.__)("RSVP Setup","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/rsvp-settings/single-event-settings/",video_link:"https://www.youtube.com/watch?v=Qjoue63-O4A&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=13&pp=iAQB"},{title:(0,a.__)("Event Email Automation","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/email-settings/automation/",video_link:"https://www.youtube.com/watch?v=e3OSwa1h0xU&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=11&pp=iAQB"},{title:(0,a.__)("Hybrid Event Setup","eventin"),actions:[(0,a.__)("Read More","eventin"),(0,a.__)("Watch Tutorial","eventin")],docs_link:"https://support.themewinter.com/docs/plugins/plugin-docs/event/how-to-create-a-hybrid-event-in-eventin/",video_link:"https://www.youtube.com/watch?v=qysoO3ZVAYY&list=PLW54c-mt4ObDYahEXLuOjzYoygbe7Nz4C&index=5&pp=iAQB"}],r=[{image:(0,i.assetURL)("/images/rio_mastri.webp"),content:(0,a.__)("I have researched numerous event plugins to meet specific needs, and I have found that Eventin provides all the features necessary for creating a variety of event website types.","eventin"),author:"Rio Mastri",rating:5},{image:(0,i.assetURL)("/images/tony_brown.webp"),content:(0,a.__)("Arraytics has truly impressed me. their solutions work seamlessly, n their support team is absolutely topnotch. Any time I've had a question or a minor issue, theyve been incredibly responsive, knowledgeable, and genuinely eager to help. It's rare to find a company that combines excellent products with such outstanding customer service. Highly recommend.","eventin"),author:"Tony Brown ",rating:5},{image:(0,i.assetURL)("/images/Oyiadika_Millionaire.webp"),content:(0,a.__)("To be very honest, I have never seen a great support team than Arraytics support team. From the very day i started using the plugins, they have been very helpful on every issues i bring to them and fix it in less than no time to get my website fully active without any issues again... I would recommend to anyone who is interested in trying out their plugins.","eventin"),author:"Oyiadika Millionaire I.",rating:5}]},88976(e,t,n){n.d(t,{A:()=>c});var i=n(51609),a=n(27723),o=n(50400),r=n(16370),l=n(47152),s=n(54725),d=n(86382),p=n(39041);const c=()=>(0,i.createElement)(p.os,null,(0,i.createElement)("h1",null,(0,a.__)("Eventin Resources","eventin")),(0,i.createElement)(l.A,{gutter:[16,16]},d.E.map((e,t)=>(0,i.createElement)(r.A,{key:t,xs:24,sm:12,md:t<3?8:6,lg:t<3?8:6},(0,i.createElement)(p.ee,null,(0,i.createElement)("div",null,(0,i.createElement)(p.ZB,null,e.title),e.description&&(0,i.createElement)(p.BT,null,e.description)),(0,i.createElement)(p.PQ,{wrap:!0},e.actions.map((t,n)=>(0,i.createElement)(o.Ay,{type:"text",key:n,size:"small",icon:t.includes("Read")?(0,i.createElement)(s.AboutPageReadmoreIcon,null):(0,i.createElement)(s.AboutPagePlayIcon,null),onClick:()=>t.includes("Read")?window.open(e.docs_link,"_blank"):window.open(e.video_link,"_blank"),sx:{fontSize:"16px",lineHeight:500,color:"#595959"}},(0,i.createElement)("p",null,t)))))))))}}]);