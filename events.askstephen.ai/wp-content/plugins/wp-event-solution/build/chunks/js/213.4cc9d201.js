"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[213],{4762(e,t,n){n.d(t,{GI:()=>r,VT:()=>l,WO:()=>o,oY:()=>s});var a=n(69815),i=n(27154);const r=a.default.div`
	background-color: #ffffff;
	max-width: 1224px;
	margin: 40px auto;
	padding: 0 20px;

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
`,l=a.default.div`
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
			background-color: ${i.PRIMARY_COLOR};
			color: #fff;
			border-color: transparent;
		}

		&:focus {
			outline: none;
		}
	}
`,o=a.default.button`
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
`,s=a.default.span`
	background: linear-gradient(
		90deg,
		#fc8327 0%,
		#e83aa5 50.5%,
		#3a4ff2 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: rgba( 0, 0, 0, 0 );
	background-clip: text;
`},29721(e,t,n){n.d(t,{A:()=>l});var a=n(51609),i=n(69815);n(27723);const r=i.default.li`
	position: relative;
	padding: 0 0 0 24px;

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 8px;
		width: 4px;
		height: 4px;
		background-color: rgba( 0, 0, 0, 0.6 );
		border-radius: 50%;
		transform: translateY( -50% );
	}
`,l=({text:e})=>(0,a.createElement)(r,null,e)},34492(e,t,n){n.d(t,{A:()=>c});var a=n(51609),i=n(86087),r=n(54725),l=n(7638),o=n(6836),s=n(4762);const c=()=>{const[e,t]=(0,i.useState)(!1),n=(0,o.assetURL)("/images/events/video-cover.webp");return(0,a.createElement)(s.VT,null,e?(0,a.createElement)("iframe",{"aria-label":"demo-video",width:"100%",height:"372.5",src:"https://www.youtube.com/embed/dhSwZ3p02v0?si=lNY2_iFYzU0zFva0?autoplay=1",allow:"accelerometer; autoplay",allowFullScreen:!0}):(0,a.createElement)(a.Fragment,null,(0,a.createElement)("img",{src:n,alt:"Eventin intro video"}),(0,a.createElement)(l.Ay,{variant:l.zB,icon:(0,a.createElement)(r.PlayFilled,null),size:"large",className:"video-play-button",onClick:()=>t(!0)})))}},50962(e,t,n){n.d(t,{A:()=>v});var a=n(51609),i=n(16370),r=n(92911),l=n(47152),o=n(84976),s=n(27723),c=n(54725),d=n(7638),m=n(57237),p=n(29721),u=n(4762),g=n(34492),f=n(27154);const v=()=>{const{evnetin_ai_active:e,evnetin_pro_active:t}=window.eventin_ai_local_data||window?.localized_multivendor_data?.eventin_ai||{},n=window?.localized_multivendor_data?.is_vendor||!1,{doAction:v}=wp.hooks;return(0,a.createElement)(u.GI,{className:"wrapper"},(0,a.createElement)(l.A,{className:"intro",gutter:60,align:"middle"},(0,a.createElement)(i.A,{xs:24,sm:24,md:24,lg:12},(0,a.createElement)(g.A,null)),(0,a.createElement)(i.A,{xs:24,sm:24,md:24,lg:12,style:{paddingInline:"0px"}},(0,a.createElement)(r.A,{vertical:!0,style:{padding:"0 20px"}},(0,a.createElement)(m.A,{className:"intro-title",level:2},(0,s.__)("Build dynamic events & memorable experiences","eventin")),(0,a.createElement)("ul",{className:"intro-list"},(0,a.createElement)(p.A,{text:(0,s.__)("Define Speaker/Organizer roles and profiles.","eventin")}),(0,a.createElement)(p.A,{text:(0,s.__)("Set ticket tiers, pricing models, and availability.","eventin")}),(0,a.createElement)(p.A,{text:(0,s.__)("Craft a visually appealing landing page to promote your event.","eventin")}),(0,a.createElement)(p.A,{text:(0,s.__)("Configure RSVP options and manage attendee confirmation flow.","eventin")})),(0,a.createElement)(r.A,{className:"intro-actions",justify:"start",align:"center",wrap:!0,gap:12},!n&&(0,a.createElement)(u.WO,{onClick:()=>{v(e&&t?"eventin-ai-create-event-modal-visible":"eventin-ai-text-generator-modal",{visible:!0})}},(0,a.createElement)(c.AIGenerateIcon,null),(0,a.createElement)(u.oY,null,(0,s.__)("Create an event with AI","eventin"))),(0,a.createElement)(o.Link,{to:"/events/create/basic"},(0,a.createElement)(d.Ay,{variant:d.zB,className:"intro-button"},(0,a.createElement)(c.PlusOutlined,{width:18,height:18}),(0,s.__)("Creating new event","eventin"))),(0,a.createElement)(d.Ay,{variant:d.Vt,className:"intro-button",onClick:()=>{window.open(f.DOCUMENTATION_LINK,"_blank")}},(0,s.__)("Learn more","eventin"),(0,a.createElement)(c.ExternalLinkOutlined,{width:16,height:16})))))))}},79213(e,t,n){n.r(t),n.d(t,{default:()=>v});var a=n(51609),i=n(92911),r=n(47767),l=n(56427),o=n(29491),s=n(47143),c=n(52619),d=n(86087),m=n(75093),p=n(18062),u=n(27154),g=n(50962);const f=(0,s.withSelect)(e=>{const t=e("eventin/global");return{totalEvents:t.getTotalEvents(),isLoading:t.isResolving("getTotalEvents")}}),v=(0,o.compose)(f)(function(e){const{totalEvents:t,isLoading:n}=e,o=(0,r.useNavigate)(),{pathname:s}=(0,r.useLocation)();(0,d.useLayoutEffect)(()=>{!n&&t>0&&o("/events",{replace:!0})},[t,n]);const f=(0,c.applyFilters)("eventin-ai-create-event-modal","eventin-ai");return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(l.Fill,{name:u.PRIMARY_HEADER_NAME},(0,a.createElement)(i.A,{justify:"space-between",align:"center"},(0,a.createElement)(p.A,{title:"Events"}))),(0,a.createElement)(g.A,null),(0,a.createElement)(f,{navigate:o,pathname:s}),(0,a.createElement)(m.FloatingHelpButton,null))})}}]);