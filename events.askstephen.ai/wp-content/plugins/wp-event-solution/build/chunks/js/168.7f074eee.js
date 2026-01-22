"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[168],{3120(e,t,n){n.d(t,{A:()=>c});var l=n(51609),a=n(69815),o=n(54725),i=n(15371),r=n(10012);function c(e){const{value:t}=e,n=a.default.div`
		content: '';
		position: absolute;
		width: 100px;
		height: 30px;
		top: 4px;
		right: 40px;
		z-index: 1;
		background-image: linear-gradient(
			to right,
			rgba( 255, 255, 255, 0.3 ) 50%,
			rgb( 255, 255, 255 ) 75%
		);
	`;return(0,l.createElement)("div",{style:{position:"relative"}},(0,l.createElement)(r.ks,{value:t,readOnly:!0}),(0,l.createElement)(i.A,{copy:t,variant:{type:"ghost",size:"large"},sx:{position:"absolute",top:" 1px",right:" 1px",zIndex:100,height:"38px",borderRadius:"6px",width:"38px",backgroundColor:"#F0EAFC"},icon:(0,l.createElement)(o.CopyFillIcon,null)}),(0,l.createElement)(n,null))}},20878(e,t,n){n.d(t,{A:()=>h});var l=n(51609),a=(n(86087),n(27723)),o=n(16370),i=n(60742),r=n(31058),c=(n(7638),n(45446)),d=n(85660),s=(n(3120),n(63363),n(64282),n(71541));const _=[{value:"events_calendar",label:(0,a.__)("Event With Calendar","eventin")}],m=[{value:"style-1",label:(0,a.__)("Style 1","eventin")},{value:"style-2",label:(0,a.__)("Style 2","eventin")}],p=[{value:"full_width",label:(0,a.__)("Full Width","eventin")},{value:"left",label:(0,a.__)("Left","eventin")},{value:"right",label:(0,a.__)("Right","eventin")}],v=[{value:"yes",label:(0,a.__)("Yes","eventin")},{value:"no",label:(0,a.__)("No","eventin")}],h=e=>{const{form:t,generatedShortcode:n,getScript:h,loading:u,handleGenerate:g,handleGetScript:S}=(0,s.c)({post_name:"event-with-calendar"}),f=[{label:(0,a.__)("Show Event Description","eventin"),name:"show_dec",defaultValue:"no"},{label:(0,a.__)("Show Upcoming Events","eventin"),name:"show_upcoming_event",defaultValue:"yes"},{label:(0,a.__)("Show Recurring Child Events","eventin"),name:"show_child_event",defaultValue:"no"},{label:(0,a.__)("Show Recurring Parent Events","eventin"),name:"show_parent_event",defaultValue:"no"}];return(0,l.createElement)(s.q,{form:t,formatShortcode:e=>`[${e.events_calendar} style='${e.style}' event_cat_ids=${e?.category||""} calendar_show='${e.calendar_show}' limit="${e.limit}" show_dec='${e.show_dec}' show_upcoming_event='${e.show_upcoming_event}' show_child_event='${e.show_child_event}' show_parent_event='${e.show_parent_event}']`,handleGenerate:g,handleGetScript:S,generatedShortcode:n,getScript:h,loading:u},(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Select Calendar Event","eventin"),name:"events_calendar",initialValue:"events_calendar",placeholder:(0,a.__)("Select Calendar Event","eventin"),options:_,tooltip:(0,a.__)("Select the calendar event you want to display","eventin")})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Select Style","eventin"),name:"style",initialValue:"style-1",placeholder:(0,a.__)("Select Style","eventin"),options:m,tooltip:(0,a.__)("Select the style you want to display","eventin")})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Select Category","eventin"),name:"category",tooltip:(0,a.__)("Select the category you want to display","eventin")},(0,l.createElement)(c.A,null))),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Display Calendar","eventin"),name:"calendar_show",initialValue:"full_width",placeholder:(0,a.__)("Select calendar show","eventin"),options:p,tooltip:(0,a.__)("Select the calendar show","eventin")})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Post Limit","eventin"),name:"limit",initialValue:5,tooltip:(0,a.__)("Enter the post limit","eventin")},(0,l.createElement)(r.A,{size:"large",placeholder:(0,a.__)("Post Limit","eventin"),min:1,style:{width:"100%"}}))),f.map((e,t)=>(0,l.createElement)(o.A,{xs:24,md:12,key:t},(0,l.createElement)(d.A,{label:e.label,name:e.name,initialValue:e.defaultValue||"no",options:v}))))}},25113(e,t,n){n.d(t,{A:()=>c});var l=n(51609),a=n(27723),o=n(16370),i=n(85660),r=n(71541);const c=()=>{const{form:e,generatedShortcode:t,getScript:n,loading:c,handleGenerate:d,handleGetScript:s}=(0,r.c)({post_name:"advanced-search"});return(0,l.createElement)(r.q,{form:e,formatShortcode:e=>`[${e.event_search_filter}]`,handleGenerate:d,handleGetScript:s,generatedShortcode:t,getScript:n,loading:c},(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A,{label:(0,a.__)("Select Template","eventin"),name:"event_search_filter",initialValue:"event_search_filter",tooltip:(0,a.__)("Select the template you want to use for the shortcode.","eventin"),options:[{value:"event_search_filter",label:(0,a.__)("Advanced Search","eventin")}]})))}},30111(e,t,n){n.d(t,{A:()=>_});var l=n(51609),a=n(29491),o=n(47143),i=(n(86087),n(27723)),r=n(16370),c=(n(7638),n(85660)),d=(n(3120),n(71541));const s=(0,o.withSelect)(e=>({scheduleList:e("eventin/global").getScheduleList()})),_=(0,a.compose)(s)(e=>{const{scheduleList:t}=e,{form:n,generatedShortcode:a,getScript:o,loading:s,handleGenerate:_,handleGetScript:m}=(0,d.c)({post_name:"schedule"}),p=t?.map(e=>({value:e.id,label:e.program_title}))||[];return(0,l.createElement)(d.q,{form:n,formatShortcode:e=>`[${e.schedules} order='${e.order}' ids='${e.ids||""}']`,handleGenerate:_,handleGetScript:m,generatedShortcode:a,getScript:o,loading:s},(0,l.createElement)(r.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,i.__)("Select Schedule Style","eventin"),name:"schedules",initialValue:"schedules",tooltip:(0,i.__)("Select Schedule Style","eventin"),options:[{value:"schedules",label:"Schedule Tab"},{value:"schedules_list",label:"Schedule List"}]})),(0,l.createElement)(r.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,i.__)("Select Order","eventin"),name:"order",initialValue:"DESC",placeholder:(0,i.__)("Select Order","eventin"),options:[{value:"ASC",label:"Ascending"},{value:"DESC",label:"Descending"}]})),(0,l.createElement)(r.A,{xs:24,md:24},(0,l.createElement)(c.A,{label:(0,i.__)("Select Schedule","eventin"),name:"ids",placeholder:(0,i.__)("Select Schedule","eventin"),options:p,tooltip:(0,i.__)("Select a Schedule to display","eventin")})))})},38466(e,t,n){n.d(t,{A:()=>r});var l=n(51609),a=n(27723),o=n(69815),i=n(75093);const r=e=>{const{topicItem:t,showModal:n,setShowModal:r}=e||{},{title:c,formContent:d}=t||{},s=o.default.div`
		max-height: 65vh;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 10px;
	`;return(0,l.createElement)(i.Modal,{title:(0,a.__)(`${c} Shortcode`,"eventin"),open:n,onCancel:()=>r(!1),onClose:()=>r(!1),width:"800px",destroyOnHidden:!0,centered:!0,footer:null},(0,l.createElement)(s,null,d))}},43168(e,t,n){n.r(t),n.d(t,{default:()=>m});var l=n(51609),a=n(27723),o=n(56427),i=n(92911),r=n(75093),c=n(18062),d=n(27154),s=n(51212),_=n(69218);function m(){return(0,l.createElement)(s.f,{className:"eventin-page-wrapper"},(0,l.createElement)(o.Fill,{name:d.PRIMARY_HEADER_NAME},(0,l.createElement)(i.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,l.createElement)(c.A,{title:(0,a.__)("Shortcodes","eventin")}))),(0,l.createElement)(_.A,null),(0,l.createElement)(r.FloatingHelpButton,null))}},51212(e,t,n){n.d(t,{f:()=>l});const l=n(69815).default.div`
	background-color: #f4f6fa;
	padding: 12px 32px;
	min-height: 100vh;
	@media ( max-width: 768px ) {
		padding: 10px 20px;
	}
	.ant-table-wrapper {
		padding: 15px 30px;
		background-color: #fff;
		border-radius: 0 0 12px 12px;
	}

	.event-list-wrapper {
		border-radius: 0 0 12px 12px;
	}

	.ant-table-thead {
		> tr {
			> th {
				background-color: #fff;
				padding-top: 10px;
				font-weight: 400;
				color: #7a7a99;
				font-size: 16px;
				&:before {
					display: none;
				}
			}
		}
	}

	tr {
		&:hover {
			background-color: #f8fafc !important;
		}
	}

	.event-title {
		color: #262626;
		font-size: 16px;
		font-weight: 600;
		line-height: 26px;
		display: inline-flex;
		margin-bottom: 6px;
	}

	.event-location,
	.event-date-time {
		color: #334155;
		font-weight: 400;
		margin: 0;
		line-height: 1.4;
		font-size: 14px;
	}
	.event-date-time {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.event-location {
		margin-bottom: 4px;
	}

	.event-actions {
		.ant-btn {
			padding: 0;
			width: 28px;
			height: 28px;
			line-height: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			border-color: #94a3b8;
			color: #525266;
			background-color: #f5f5f5;
		}
	}

	.ant-tag {
		border-radius: 20px;
		font-size: 12px;
		font-weight: 400;
		padding: 4px 13px;
		min-width: 80px;
		text-align: center;
	}

	.ant-tag.event-category {
		background-color: transparent;
		font-size: 16px;
		color: #334155;
		font-wight: 400;
		padding: 0;
		text-align: left;
	}

	.author {
		font-size: 16px;
		color: #334155;
		font-wight: 400;
		text-transform: capitalize;
	}
	.recurring-badge {
		background-color: #1890ff1a;
		color: #1890ff;
		font-size: 12px;
		padding: 5px 12px;
		border-radius: 50px;
		font-weight: 600;
		margin-inline: 10px;
	}
`},51390(e,t,n){n.d(t,{A:()=>m});var l=n(51609),a=n(27723),o=n(16370),i=n(60742),r=n(31058),c=n(45446),d=n(85660),s=n(16326),_=n(71541);const m=()=>{const{form:e,generatedShortcode:t,getScript:n,loading:m,handleGenerate:p,handleGetScript:v}=(0,_.c)({post_name:"event-shortcode"}),h=[{label:(0,a.__)("Show Event End Date","eventin"),name:"show_end_date"},{label:(0,a.__)("Show Recurring Child Events","eventin"),name:"show_child_event"},{label:(0,a.__)("Show Recurring Parent Events","eventin"),name:"show_parent_event"},{label:(0,a.__)("Show Event Location","eventin"),name:"show_event_location"},{label:(0,a.__)("Show Event Description","eventin"),name:"etn_desc_show"},{label:(0,a.__)("Show Remaining Tickets","eventin"),name:"show_remaining_tickets"}];return(0,l.createElement)(_.q,{form:e,formatShortcode:e=>`[${e.event} style='${e.style}' event_cat_ids='${e.category||""}' event_tag_ids='${e.tag||""}' order='${e.order}' orderby='${e.orderby}' filter_with_status='${e.filter_with_status}' etn_event_col='${e.etn_event_col}' limit='${e.limit}' show_end_date='${e.show_end_date}' show_child_event='${e.show_child_event}' show_parent_event='${e.show_parent_event}' show_event_location='${e.show_event_location}' etn_desc_show='${e.etn_desc_show}'  show_remaining_tickets='${e.show_remaining_tickets}']`,handleGenerate:p,handleGetScript:v,generatedShortcode:t,getScript:n,loading:m},(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Select Template","eventin"),name:"event",initialValue:"events_tab",placeholder:(0,a.__)("Select event","eventin"),options:[{value:"events",label:"Event List"},{value:"events_tab",label:"Event Tab"}],tooltip:(0,a.__)("Select the template you want to use for the shortcode.","eventin")})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Select Style","eventin"),name:"style",initialValue:"event-1",placeholder:(0,a.__)("Select Style","eventin"),options:[{value:"event-1",label:"Style 1"},{value:"event-2",label:"Style 2"}],tooltip:(0,a.__)("Select the style you want to use for the shortcode.","eventin")})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Select Category","eventin"),name:"category",tooltip:(0,a.__)("Select the category you want to use for the shortcode.","eventin")},(0,l.createElement)(c.A,null))),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Select Tag","eventin"),name:"tag",tooltip:(0,a.__)("Select the tag you want to use for the shortcode.","eventin")},(0,l.createElement)(s.A,null))),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Select Order","eventin"),name:"order",initialValue:"ASC",placeholder:(0,a.__)("Select Order","eventin"),tooltip:(0,a.__)("Select ascending or descending order for the shortcode.","eventin"),options:[{value:"ASC",label:"Ascending"},{value:"DESC",label:"Descending"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Select Order By","eventin"),name:"orderby",initialValue:"ID",placeholder:(0,a.__)("Select Order By","eventin"),tooltip:(0,a.__)("Select the order by you want to use for the shortcode.","eventin"),options:[{value:"title",label:"Title"},{value:"ID",label:"ID"},{value:"post_date",label:"Post Date"},{value:"etn_start_date",label:"Event Start Date"},{value:"etn_end_date",label:"Event End Date"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Filter by Status","eventin"),name:"filter_with_status",initialValue:"upcoming",placeholder:(0,a.__)("Select Status","eventin"),tooltip:(0,a.__)("Filter events by status.","eventin"),options:[{value:"",label:"All"},{value:"upcoming",label:"Upcoming"},{value:"ongoing",label:"Ongoing"},{value:"expire",label:"Expired"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(d.A,{label:(0,a.__)("Event Column","eventin"),name:"etn_event_col",placeholder:(0,a.__)("Select Column","eventin"),initialValue:"1",tooltip:(0,a.__)("Select the column you want to use for the shortcode.","eventin"),options:[1,2,3,4,5].map(e=>({value:e.toString(),label:`Column ${e}`}))})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Post Limit","eventin"),name:"limit",initialValue:20,tooltip:(0,a.__)("Select the limit you want to use for the shortcode.","eventin")},(0,l.createElement)(r.A,{size:"large",placeholder:(0,a.__)("20","eventin"),min:1,style:{width:"100%"}}))),h.map((e,t)=>(0,l.createElement)(o.A,{xs:24,md:12,key:t},(0,l.createElement)(d.A,{label:e.label,name:e.name,initialValue:"no",options:[{value:"yes",label:"Yes"},{value:"no",label:"No"}]}))))}},63109(e,t,n){n.d(t,{A:()=>s});var l=n(51609),a=n(27723),o=n(16370),i=n(60742),r=n(34544),c=n(85660),d=n(71541);const s=()=>{const{form:e,generatedShortcode:t,getScript:n,loading:s,handleGenerate:_,handleGetScript:m}=(0,d.c)({post_name:"event-meta-info"});return(0,l.createElement)(d.q,{form:e,formatShortcode:e=>`[${e.etn_event_meta_info} event_id=${e.event}]`,handleGenerate:_,handleGetScript:m,generatedShortcode:t,getScript:n,loading:s},(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,a.__)("Select Event Meta Info","eventin"),name:"etn_event_meta_info",initialValue:"etn_event_meta_info",tooltip:(0,a.__)("Select the template you want to use for the shortcode.","eventin"),options:[{value:"etn_event_meta_info",label:(0,a.__)("Event Meta Info","eventin")}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Select Event","eventin"),name:"event",tooltip:(0,a.__)("Select the event you want to use for the shortcode.","eventin")},(0,l.createElement)(r.A,null))))}},63363(e,t,n){n.d(t,{Cf:()=>d,Q_:()=>o,VY:()=>c,ff:()=>a,hE:()=>r,ny:()=>i});var l=n(69815);const a=l.default.div`
	padding: 30px;
	background-color: #fdfdff;
	border-radius: 12px;
	margin: 0 auto;
`,o=l.default.div`
	background: #fff;
	border-radius: 8px;
	padding: 20px 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 2px 8px rgba( 0, 0, 0, 0.1 );
	gap: 20px;
	margin-bottom: 30px;
	&:last-child {
		margin-bottom: 0;
	}
	@media ( max-width: 768px ) {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
`,i=l.default.div`
	flex: 1;
`,r=l.default.h3`
	font-size: 16px;
	font-weight: 600;
	margin: 0 0 4px;
	color: #333;
`,c=l.default.p`
	font-size: 14px;
	margin: 0;
	color: #666;
`,d=l.default.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin: 20px 0;
`},68076(e,t,n){n.d(t,{U:()=>p});var l=n(51609),a=n(52619),o=n(27723),i=n(51390),r=n(20878),c=n(96662),d=n(30111),s=n(25113),_=n(63109);const m=[{title:(0,o.__)("Event","eventin"),description:(0,o.__)('Show "event details" in any specific location.',"eventin"),formContent:(0,l.createElement)(i.A,null)},{title:(0,o.__)("Events With Calendar","eventin"),description:(0,o.__)('Show "events in calendar view" in any specific location.',"eventin"),formContent:(0,l.createElement)(r.A,null)},{title:(0,o.__)("Speakers","eventin"),description:(0,o.__)('Add "speakers profile" to show it in any specific location.',"eventin"),formContent:(0,l.createElement)(c.A,null)},{title:(0,o.__)("Schedules","eventin"),description:(0,o.__)('Use "schedules" to show it in any specific location.',"eventin"),formContent:(0,l.createElement)(d.A,null)},{title:(0,o.__)("Advanced Search Filter","eventin"),description:(0,o.__)('Add the "advanced search filter option" in any specific location.',"eventin"),formContent:(0,l.createElement)(s.A,null)},{title:(0,o.__)("Event Meta Info","eventin"),description:(0,o.__)('The "events meta info" is for showing event meta details in widgets.',"eventin"),formContent:(0,l.createElement)(_.A,null)}],p=(0,a.applyFilters)("eventin-pro-shortcodes",m)},69218(e,t,n){n.d(t,{A:()=>s});var l=n(51609),a=n(27723),o=n(86087),i=n(7638),r=n(68076),c=n(63363),d=n(38466);const s=()=>{const[e,t]=(0,o.useState)(!1),[n,s]=(0,o.useState)(null),[_,m]=(0,o.useState)("");return(0,l.createElement)(c.ff,null,r.U.map((e,n)=>(0,l.createElement)(c.Q_,{key:n},(0,l.createElement)(c.ny,null,(0,l.createElement)(c.hE,null,e.title),(0,l.createElement)(c.VY,null,e.description)),(0,l.createElement)(i.Ay,{variant:i.zB,onClick:()=>(e=>{t(!0),s(e)})(e)},(0,a.__)("Generate Shortcode","eventin")))),(0,l.createElement)(d.A,{topicItem:n,setShowModal:t,showModal:e,generatedShortcode:_,setGeneratedShortcode:m}))}},71541(e,t,n){n.d(t,{c:()=>h,q:()=>u});var l=n(51609),a=n(86087),o=n(27723),i=n(16370),r=n(60742),c=n(47152),d=n(32099),s=n(7638),_=n(64282),m=n(3120),p=n(63363);const v=!!window.localized_data_obj.evnetin_pro_active,h=e=>{const[t,n]=(0,a.useState)(""),[l,o]=(0,a.useState)(""),[i,c]=(0,a.useState)(!1),[d]=r.A.useForm(),{post_name:s}=e||{};return{form:d,generatedShortcode:t,getScript:l,loading:i,handleGenerate:e=>{d.validateFields().then(t=>{n(e(t))}).catch(e=>console.error("Validation failed:",e))},handleGetScript:async()=>{try{c(!0);const e=await _.A.shortcodeScript.createShortcodeScript({post_name:s,shortcode:t}),n=e?.id?`<script src="${window?.localized_data_obj?.site_url}/eventin-external-script?id=${e?.id}"><\/script>`:"";o(n)}catch(e){console.log(e)}finally{c(!1)}}}},u=({form:e,formatShortcode:t,handleGenerate:n,handleGetScript:a,generatedShortcode:_,getScript:h,loading:u,children:g})=>(0,l.createElement)(r.A,{form:e,layout:"vertical"},(0,l.createElement)(c.A,{gutter:[20,20]},g),(0,l.createElement)(c.A,null,(0,l.createElement)(i.A,{xs:24,md:12},(0,l.createElement)(p.Cf,null,(0,l.createElement)(r.A.Item,null,(0,l.createElement)(s.Ay,{variant:s.zB,onClick:()=>n(t)},(0,o.__)("Generate Shortcode","eventin"))),v&&(0,l.createElement)(r.A.Item,null,(0,l.createElement)(d.A,{title:_?(0,o.__)("Click to get script and it's only worked registered domain.","eventin"):(0,o.__)("Please Generate Shortcode First","eventin")},(0,l.createElement)(s.Ay,{variant:s.zB,onClick:a,disabled:!_,loading:u},(0,o.__)("Get Script","eventin"))))))),_&&(0,l.createElement)(m.A,{value:_}),h&&(0,l.createElement)(m.A,{value:h}))},96662(e,t,n){n.d(t,{A:()=>_});var l=n(51609),a=n(27723),o=n(16370),i=n(60742),r=n(31058),c=n(85660),d=n(36438),s=n(71541);const _=()=>{const{form:e,generatedShortcode:t,getScript:n,loading:_,handleGenerate:m,handleGetScript:p}=(0,s.c)({post_name:"speakers"});return(0,l.createElement)(s.q,{form:e,formatShortcode:e=>`[${e.speakers} style='${e.style}' cat_id='${e.category||""}' etn_speaker_col='${e.column}' order='${e.order}' orderby='${e.orderby}' limit='${e.limit}']`,handleGenerate:m,handleGetScript:p,generatedShortcode:t,getScript:n,loading:_},(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,a.__)("Select speakers","eventin"),name:"speakers",initialValue:"speakers",tooltip:(0,a.__)("Select Speaker Shortcode Type","eventin"),options:[{value:"speakers",label:"Speakers"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,a.__)("Select Style","eventin"),name:"style",initialValue:"speaker-1",placeholder:(0,a.__)("Select Style","eventin"),tooltip:(0,a.__)("Select Speaker Style","eventin"),options:[{value:"speaker-1",label:"Style 1"},{value:"speaker-2",label:"Style 2"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Select Category","eventin"),name:"category",tooltip:(0,a.__)("Select Speaker Category","eventin")},(0,l.createElement)(d.A,null))),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,a.__)("Column","eventin"),name:"column",placeholder:(0,a.__)("Select Column","eventin"),initialValue:"1",options:[1,2,3,4].map(e=>({value:e.toString(),label:`Column ${e}`}))})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,a.__)("Select Order","eventin"),name:"order",initialValue:"DESC",placeholder:(0,a.__)("Select Order","eventin"),options:[{value:"ASC",label:"Ascending"},{value:"DESC",label:"Descending"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(c.A,{label:(0,a.__)("Select Order By","eventin"),name:"orderby",initialValue:"ID",placeholder:(0,a.__)("Select Order By","eventin"),options:[{value:"title",label:"Title"},{value:"ID",label:"ID"},{value:"post_date",label:"Post Date"},{value:"name",label:"Name"}]})),(0,l.createElement)(o.A,{xs:24,md:12},(0,l.createElement)(i.A.Item,{label:(0,a.__)("Post Limit","eventin"),name:"limit",initialValue:5,tooltip:(0,a.__)("Post Limit","eventin")},(0,l.createElement)(r.A,{size:"large",placeholder:(0,a.__)("Post Limit","eventin"),min:1,style:{width:"100%"}}))))}}}]);