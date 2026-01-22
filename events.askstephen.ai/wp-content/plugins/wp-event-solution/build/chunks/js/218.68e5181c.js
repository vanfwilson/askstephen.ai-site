"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[218],{38296(e,t,o){o.d(t,{A:()=>c});var n=o(51609),i=o(56427),r=o(92911),a=o(18062),l=o(27154);function c(e){const{title:t}=e;return(0,n.createElement)(i.Fill,{name:l.PRIMARY_HEADER_NAME},(0,n.createElement)(r.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,n.createElement)(a.A,{title:t})))}},86952(e,t,o){o.d(t,{b:()=>n});const n={prefix:"eve",theme:{primaryColor:"#6b2ee5",secondaryColor:"oklch(0.97 0 0)",successColor:"#10b981",warningColor:"#f59e0b",errorColor:"#ef4444"},helpDocUrl:"https://support.themewinter.com/docs/plugins/plugin-docs/email-settings/automation/",helpVideoUrl:"https://www.youtube.com/watch?v=9gV6MZeT164",translationDomain:"eventin"}},89279(e,t,o){o.d(t,{D:()=>n});const n=o(69815).default.div`
	/* background-color: #f4f6fa; */
	padding: 12px 32px;

	.automation-list__header .ant-btn-primary {
		height: 40px;
	}
	.automation-list .bulk-actions-bar .bulk-delete-btn {
		margin-right: 16px;
		background-color: #fff;
		border: 1px solid #ff4d4f;
		color: #ff4d4f;
	}

	input.notif-flow-input,
	input.automation-list__header
		.filter-search-group
		.automation-search
		.ant-input-outlined,
	input.automation-list__header
		.filter-search-group
		.status-filter-select
		.ant-select-selector {
		border: 1px solid #d9d9d9 !important;
	}

	select.notif-flow-select.notif-flow-select--middle.notif-flow-select {
		border: 1px solid #d9d9d9 !important;
	}
	.notif-flow-switch-checked .notif-flow-switch-track {
		background-color: #6b2ee5;
	}
	@media ( prefers-color-scheme: dark ) {
		.notif-flow-switch-track {
			background-color: #c3c4c7;
		}

		.notif-flow-table input[type='checkbox'],
		.notif-flow-table input[type='radio'] {
			accent-color: #6b2ee5;
			background-color: transparent;
			border: 1px solid #d9d9d9 !important;
		}
		input[type='checkbox']:checked::before {
			border-radius: 3px;
			background-color: #6b2ee5;
		}
	}
`},94218(e,t,o){o.r(t),o.d(t,{default:()=>b});var n=o(51609),i=o(29491),r=o(47143),a=o(27723),l=o(98731),c=o(47767),s=o(75093),d=o(38296),u=o(86952),p=o(89279);const f=(0,r.withSelect)(e=>{const t=e("eventin/global");return{settings:t.getSettings(),isLoading:t.isResolving("getSettings")}}),b=(0,i.compose)(f)(function(e){(0,l.fB)(u.b);const{settings:t,isLoading:o}=e||{},i=(0,c.useNavigate)();return t&&"on"!==t?.modules?.automation?(0,n.createElement)(c.Navigate,{to:"/dashboard",replace:!0}):(0,n.createElement)(l.gI,null,(0,n.createElement)(d.A,{title:(0,a.__)("Automation","eventin")}),(0,n.createElement)(p.D,null,(0,n.createElement)(l.eb,{onEdit:e=>i(`/automation/${e}/edit`)})),(0,n.createElement)(s.FloatingHelpButton,null))})}}]);