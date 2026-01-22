"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[546],{5004(e,t,a){a.d(t,{A:()=>f});var n=a(51609),r=a(29491),l=a(47143),o=a(86087),i=a(27723),s=a(75063),c=a(16784),p=a(75093),d=a(32677),m=a(64525),u=a(73080),g=a(44655);const v=(0,l.withDispatch)(e=>({setShouldRevalidateSpeakerList:e("eventin/global").setRevalidateSpeakerList})),h=(0,l.withSelect)(e=>({shouldRevalidateSpeakerList:e("eventin/global").getRevalidateSpeakerList()})),f=(0,r.compose)([v,h])(({isLoading:e,setShouldRevalidateSpeakerList:t,shouldRevalidateSpeakerList:a})=>{const[r,l]=(0,o.useState)({paged:1,per_page:10}),[v,h]=(0,o.useState)([]),{filteredList:f,totalCount:E,loading:y}=(0,u.G)(r,a,t),k=(0,o.useMemo)(()=>({selectedRowKeys:v,onChange:h}),[v]),x=(0,o.useMemo)(()=>({current:r.paged,pageSize:r.per_page,total:E,showSizeChanger:!0,showLessItems:!0,onShowSizeChange:(e,t)=>l(e=>({...e,per_page:t})),onChange:e=>l(t=>({...t,paged:e})),showTotal:(e,t)=>(0,n.createElement)(p.CustomShowTotal,{totalCount:e,range:t,listText:(0,i.__)(" speakers","eventin")})}),[r,E]);return e?(0,n.createElement)(g.f,{className:"eventin-page-wrapper"},(0,n.createElement)(s.A,{active:!0})):(0,n.createElement)(g.f,{className:"eventin-page-wrapper"},(0,n.createElement)("div",{className:"event-list-wrapper"},(0,n.createElement)(m.A,{selectedSpeakers:v,setSelectedSpeakers:h,setParams:l}),(0,n.createElement)(c.A,{className:"eventin-data-table",columns:d.A,dataSource:f,loading:y,rowSelection:k,rowKey:e=>e.id,scroll:{x:900},sticky:{offsetHeader:100},pagination:x})))})},32677(e,t,a){a.d(t,{A:()=>s});var n=a(51609),r=a(27723),l=a(18537),o=a(63608),i=a(84976);const s=[{title:(0,r.__)("Name","eventin"),dataIndex:"name",key:"name",width:"20%",render:(e,t)=>(0,n.createElement)(i.Link,{to:`/speakers/edit/${t.id}`,className:"event-title"},(0,l.decodeEntities)(e))},{title:(0,r.__)("Job Title","eventin"),dataIndex:"designation",key:"designation",render:e=>(0,n.createElement)("span",{className:"author"}," ",(0,l.decodeEntities)(e)||"-")},{title:(0,r.__)("Group","eventin"),dataIndex:"speaker_group",key:"speaker_group",render:e=>(0,n.createElement)("span",null,Array.isArray(e)&&e?.join(", "))},{title:(0,r.__)("Role","eventin"),dataIndex:"category",key:"category",render:e=>e?.map((e,t)=>(0,n.createElement)("span",{key:t,className:"etn-category-group"},e))},{title:(0,r.__)("Company","eventin"),dataIndex:"company_name",key:"company_name",render:e=>(0,n.createElement)("span",{className:"author"}," ",(0,l.decodeEntities)(e)||"-")},{title:(0,r.__)("Action","eventin"),key:"action",width:120,render:(e,t)=>(0,n.createElement)(o.A,{record:t})}]},44655(e,t,a){a.d(t,{f:()=>r});var n=a(69815);const r=n.default.div`
	background-color: #f4f6fa;
	padding: 12px 32px;
	min-height: 100vh;

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
				background-color: #ffffff;
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

	.etn-category-group {
		display: flex;
		gap: 10px;
		text-transform: capitalize;
	}
`;n.default.div`
	padding: 22px 36px;
	background: #fff;
	border-radius: 12px 12px 0 0;
	border-bottom: 1px solid #ddd;

	.ant-form-item {
		margin-bottom: 0;
	}

	.event-filter-by-name {
		height: 36px;
		border: 1px solid #ddd;
		max-width: 220px;

		input.ant-input {
			min-height: auto;
		}
	}
`},53546(e,t,a){a.r(t),a.d(t,{default:()=>c});var n=a(51609),r=a(27723),l=a(47767),o=a(75093),i=a(96031),s=a(5004);const c=function(){const e=(0,l.useNavigate)();return(0,n.createElement)("div",null,(0,n.createElement)(i.A,{title:(0,r.__)("Speakers and Organizers","eventin"),buttonText:(0,r.__)("Add New","eventin"),onClickCallback:()=>e("/speakers/create")}),(0,n.createElement)(s.A,null),(0,n.createElement)(o.FloatingHelpButton,null))}},53996(e,t,a){a.d(t,{M:()=>g});var n=a(51609),r=a(46784),l=a(36877),o=a(47767),i=a(54725),s=a(7638),c=a(500),p=a(48842),d=a(57237),m=a(27154),u=a(83211);const g=e=>{const{modalOpen:t,setModalOpen:a,recordData:g}=e,{id:v,name:h,category:f,designation:E,summary:y,email:k,social:x,image:_}=g,w=(0,o.useNavigate)(),b=e=>{const t=m.socialIcons.find(t=>t.iconClass===e);return t?.icon||null};return(0,n.createElement)(c.A,{open:t,onCancel:()=>a(!1),header:!1,footer:!1,width:680,destroyOnHidden:!0},(0,n.createElement)(u.g,null,(0,n.createElement)("div",{className:"etn-speaker-view-wrapper"},_?(0,n.createElement)("img",{style:{width:150,height:150,objectFit:"cover",border:"1px solid #f0f0f0",borderRadius:"8px"},src:_,alt:"speaker-image"}):(0,n.createElement)(l.A,{shape:"square",size:150}),(0,n.createElement)("div",{className:"etn-speaker-details"},(0,n.createElement)("div",{className:"etn-speaker-header"},(0,n.createElement)(d.A,{level:3,style:{fontSize:20,margin:0}},h),f&&f.map((e,t)=>(0,n.createElement)(p.A,{style:{fontSize:12,color:"#1890FF",backgroundColor:"#1890FF1A",padding:"5px 8px",borderRadius:"20px"},key:t},e)),(0,n.createElement)(s.Ay,{variant:s.qy,onClick:()=>w(`/speakers/edit/${v}`),style:{color:"#1890FF",fontWeight:"bold",padding:"4px 10px"}},(0,n.createElement)(i.EditOutlined,{width:"16",height:"16"}))),(0,n.createElement)("div",{className:"etn-speaker-content"},E&&(0,n.createElement)(p.A,null,E),k&&(0,n.createElement)(p.A,null,k),(0,n.createElement)("div",{className:"etn-speaker-social"},x&&x?.map((e,t)=>(0,n.createElement)(u.W,{key:t,onClick:()=>window.open(e?.etn_social_url,"_blank")},(0,n.createElement)(r.g,{icon:b(e?.icon),size:"1x"}))))))),(0,n.createElement)("div",{className:"etn-speaker-bio",style:{marginTop:"20px"}},(0,n.createElement)(p.A,null,y))))}},63608(e,t,a){a.d(t,{A:()=>s});var n=a(51609),r=a(90070),l=a(99391),o=a(72190),i=a(89100);function s(e){const{record:t}=e;return(0,n.createElement)(r.A,{size:"small",className:"event-actions"},(0,n.createElement)(i.A,{record:t}),(0,n.createElement)(o.A,{record:t}),(0,n.createElement)(l.A,{record:t}))}},63757(e,t,a){a.d(t,{A:()=>g});var n=a(51609),r=a(1455),l=a.n(r),o=a(86087),i=a(52619),s=a(27723),c=a(7638),p=a(11721),d=a(32099),m=a(54725),u=a(48842);const g=e=>{const{type:t,arrayOfIds:a,shouldShow:r,eventId:g}=e||{},[v,h]=(0,o.useState)(!1),f=async(e,t,a)=>{const n=new Blob([e],{type:a}),r=URL.createObjectURL(n),l=document.createElement("a");l.href=r,l.download=t,l.click(),URL.revokeObjectURL(r)},E=async e=>{let n=`/eventin/v2/${t}/export`;g&&(n+=`?event_id=${g}`);try{if(h(!0),"json"===e){const r=await l()({path:n,method:"POST",data:{format:e,ids:a||[]}});await f(JSON.stringify(r,null,2),`${t}.json`,"application/json")}if("csv"===e){const r=await l()({path:n,method:"POST",data:{format:e,ids:a||[]},parse:!1}),o=await r.text();await f(o,`${t}.csv`,"text/csv")}(0,i.doAction)("eventin_notification",{type:"success",message:(0,s.__)("Exported successfully","eventin")})}catch(e){console.error("Error exporting data",e),(0,i.doAction)("eventin_notification",{type:"error",message:e.message})}finally{h(!1)}},y=[{key:"1",label:(0,n.createElement)(u.A,{style:{padding:"10px 0"},onClick:()=>E("json")},(0,s.__)("Export JSON Format","eventin")),icon:(0,n.createElement)(m.JsonFileIcon,null)},{key:"2",label:(0,n.createElement)(u.A,{onClick:()=>E("csv")},(0,s.__)("Export CSV Format","eventin")),icon:(0,n.createElement)(m.CsvFileIcon,null)}],k={display:"flex",alignItems:"center",borderColor:"#d9d9d9",fontSize:"14px",fontWeight:400,color:"#64748B",height:"36px"};return(0,n.createElement)(d.A,{title:r?(0,s.__)("Upgrade to Pro","eventin"):(0,s.__)("Download table data","eventin")},r?(0,n.createElement)(c.Ay,{className:"etn-export-btn eventin-export-button",variant:c.Vt,onClick:()=>window.open("https://themewinter.com/eventin/pricing/","_blank"),sx:k},(0,n.createElement)(m.ExportIcon,{width:20,height:20}),(0,s.__)("Export","eventin"),r&&(0,n.createElement)(m.ProFlagIcon,null)):(0,n.createElement)(p.A,{overlayClassName:"etn-export-actions action-dropdown",menu:{items:y},placement:"bottomRight",arrow:!0,disabled:r},(0,n.createElement)(c.Ay,{className:"etn-export-btn eventin-export-button",variant:c.Vt,loading:v,sx:k},(0,n.createElement)(m.ExportIcon,{width:20,height:20}),(0,s.__)("Export","eventin"))))}},64525(e,t,a){a.d(t,{A:()=>k});var n=a(51609),r=a(92911),l=a(79888),o=a(36492),i=a(27723),s=a(29491),c=a(47143),p=a(54725),d=a(79351),m=a(62215),u=a(61149),g=a(64282),v=a(63757),h=a(84174),f=a(57933);const E=(0,c.withSelect)(e=>{const t=e("eventin/global");return{speakerGroup:t.getSpeakerCategories(),isLoading:t.isResolving("getSpeakerCategories")}}),y=(0,c.withDispatch)(e=>({shouldRefetchSpeakerList:e("eventin/global").setRevalidateSpeakerList})),k=(0,s.compose)(E,y)(e=>{const{selectedSpeakers:t,setSelectedSpeakers:a,setParams:s,speakerGroup:c,shouldRefetchSpeakerList:E}=e,y=!!t?.length,k=c?.map(e=>({label:e.name,value:e.id})),x=[{label:(0,i.__)("All","eventin"),value:"all"},{label:(0,i.__)("Speaker","eventin"),value:"speaker"},{label:(0,i.__)("Organizer","eventin"),value:"organizer"}],_=(0,f.useDebounce)(e=>{s(t=>({...t,search:e.target.value||void 0}))},500);return(0,n.createElement)(u.O,{className:"filter-wrapper"},(0,n.createElement)(r.A,{justify:"space-between",align:"center",wrap:"wrap",gap:10},(0,n.createElement)(r.A,{justify:"start",align:"center",gap:8,wrap:"wrap"},y?(0,n.createElement)(d.A,{selectedCount:t?.length,callbackFunction:async()=>{const e=(0,m.A)(t);await g.A.speakers.deleteSpeaker(e),E(!0),a([])},setSelectedRows:a}):(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.A,{placeholder:(0,i.__)("Filter by Group","eventin"),options:k,size:"default",style:{minWidth:"200px",width:"100%"},onChange:e=>{s(t=>({...t,speaker_group:e}))},allowClear:!0,showSearch:!0,filterOption:(e,t)=>t?.label?.toLowerCase().includes(e?.toLowerCase())}),(0,n.createElement)(o.A,{placeholder:(0,i.__)("Filter by Role","eventin"),options:x,defaultValue:"all",size:"default",style:{minWidth:"200px",width:"100%"},onChange:e=>{s(t=>({...t,category:e}))},allowClear:!0,showSearch:!0}))),!y&&(0,n.createElement)(r.A,{justify:"end",gap:8},(0,n.createElement)(l.A,{className:"event-filter-by-name",placeholder:(0,i.__)("Search by Name","eventin"),size:"default",prefix:(0,n.createElement)(p.SearchIconOutlined,null),onChange:_,allowClear:!0}),(0,n.createElement)(v.A,{type:"speakers"}),(0,n.createElement)(h.A,{type:"speakers",paramsKey:"speaker_import",revalidateList:E})),y&&(0,n.createElement)(r.A,{justify:"end",gap:8},(0,n.createElement)(v.A,{type:"speakers",arrayOfIds:t}))))})},72190(e,t,a){a.d(t,{A:()=>o});var n=a(51609),r=a(7638),l=a(47767);function o(e){const{record:t}=e,a=(0,l.useNavigate)();return(0,n.createElement)(r.vQ,{variant:r.Vt,onClick:()=>{a(`/speakers/edit/${t.id}`)}})}},73080(e,t,a){a.d(t,{G:()=>i});var n=a(86087),r=a(47767),l=a(6836),o=a(64282);const i=(e,t,a)=>{const[i,s]=(0,n.useState)([]),[c,p]=(0,n.useState)(null),[d,m]=(0,n.useState)(!0),u=(0,r.useNavigate)(),g=(0,n.useCallback)(async()=>{m(!0);try{const{paged:t,per_page:a,speaker_group:n,category:r,search:l}=e,i=await o.A.speakers.speakersList({speaker_group:n,category:r,search:l,paged:t,per_page:a}),c=Boolean(n)||Boolean(r)||Boolean(l),d=i.headers.get("X-Wp-Total")||0;p(d);const m=await i.json();s(m||[]),c||0!==Number(d)||u("/speakers/empty",{replace:!0})}catch(e){console.error("Error fetching speakers:",e)}finally{m(!1),(0,l.scrollToTop)()}},[e,u]);return(0,n.useEffect)(()=>{g()},[g]),(0,n.useEffect)(()=>{t&&(g(),a(!1))},[t,g,a]),{filteredList:i,totalCount:c,loading:d}}},83211(e,t,a){a.d(t,{W:()=>l,g:()=>r});var n=a(69815);const r=n.default.div`
	padding: 20px;
	@media ( min-width: 767px ) {
		padding: 40px;
	}
	.etn-speaker-view-wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
		@media ( min-width: 767px ) {
			flex-direction: row;
		}
	}

	.etn-speaker-header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
		flex-wrap: wrap;
	}
	.etn-speaker-content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.etn-speaker-social {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-top: 10px;
	}
`,l=n.default.div`
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #ccc;
	border-radius: 5px;
	cursor: pointer;
`},84174(e,t,a){a.d(t,{A:()=>v});var n=a(51609),r=a(1455),l=a.n(r),o=a(86087),i=a(52619),s=a(27723),c=a(19549),p=a(32099),d=a(81029),m=a(7638),u=a(54725);const{Dragger:g}=d.A,v=e=>{const{type:t,paramsKey:a,shouldShow:r,revalidateList:d}=e||{},[v,h]=(0,o.useState)([]),[f,E]=(0,o.useState)(!1),[y,k]=(0,o.useState)(!1),x=()=>{k(!1)},_=`/eventin/v2/${t}/import`,w=(0,o.useCallback)(async e=>{try{E(!0);const t=await l()({path:_,method:"POST",body:e});return(0,i.doAction)("eventin_notification",{type:"success",message:(0,s.__)(` ${t?.message} `,"eventin")}),d(!0),h([]),E(!1),x(),t?.data||""}catch(e){throw E(!1),(0,i.doAction)("eventin_notification",{type:"error",message:e.message}),console.error("API Error:",e),e}},[t]),b={name:"file",accept:".json, .csv",multiple:!1,maxCount:1,onRemove:e=>{const t=v.indexOf(e),a=v.slice();a.splice(t,1),h(a)},beforeUpload:e=>(h([e]),!1),fileList:v},A=r?()=>window.open("https://themewinter.com/eventin/pricing/","_blank"):()=>k(!0);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(p.A,{title:r?(0,s.__)("Upgrade to Pro","eventin"):(0,s.__)("Import data","eventin")},(0,n.createElement)(m.Ay,{className:"etn-import-btn eventin-import-button",variant:m.Vt,sx:{display:"flex",alignItems:"center",borderColor:"#d9d9d9",fontSize:"14px",fontWeight:400,color:"#64748B",height:"36px"},onClick:A},(0,n.createElement)(u.ImportIcon,null),(0,s.__)("Import","eventin"),r&&(0,n.createElement)(u.ProFlagIcon,null))),(0,n.createElement)(c.A,{title:(0,s.__)("Import file","eventin"),open:y,onCancel:x,maskClosable:!1,footer:null,centered:!0,destroyOnHidden:!0,wrapClassName:"etn-import-modal-wrap",className:"etn-import-modal-container eventin-import-modal-container"},(0,n.createElement)("div",{className:"etn-import-file eventin-import-file-container",style:{marginTop:"25px"}},(0,n.createElement)(g,{...b},(0,n.createElement)("p",{className:"ant-upload-drag-icon"},(0,n.createElement)(u.UploadCloudIcon,{width:"50",height:"50"})),(0,n.createElement)("p",{className:"ant-upload-text"},(0,s.__)("Click or drag file to this area to upload","eventin")),(0,n.createElement)("p",{className:"ant-upload-hint"},(0,s.__)("Choose a JSON or CSV file to import","eventin")),0!=v.length&&(0,n.createElement)(m.Ay,{onClick:async e=>{e.preventDefault(),e.stopPropagation();const t=new FormData;t.append(a,v[0],v[0].name),await w(t)},disabled:0===v.length,loading:f,variant:m.zB,className:"eventin-start-import-button"},f?(0,s.__)("Importing","eventin"):(0,s.__)("Start Import","eventin"))))))}},89100(e,t,a){a.d(t,{A:()=>s});var n=a(51609),r=(a(27723),a(86087)),l=a(54725),o=a(7638),i=a(53996);function s(e){const[t,a]=(0,r.useState)(!1),{record:s}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(o.Ay,{variant:o.Vt,onClick:()=>{window.open(`${s?.author_url}`,"_blank")}},(0,n.createElement)(l.EyeOutlinedIcon,{width:"16",height:"16"})),(0,n.createElement)(i.M,{modalOpen:t,setModalOpen:a,recordData:s}))}},96031(e,t,a){a.d(t,{A:()=>v});var n=a(51609),r=a(56427),l=a(27723),o=a(52741),i=a(11721),s=a(92911),c=a(47767),p=a(69815),d=a(7638),m=a(18062),u=a(27154),g=a(54725);function v(e){const{title:t,buttonText:a,onClickCallback:p}=e,v=(0,c.useNavigate)(),{pathname:h}=(0,c.useLocation)(),f=["/speakers"!==h&&{key:"0",label:(0,l.__)("Speaker List","eventin"),icon:(0,n.createElement)(g.EventListIcon,{width:20,height:20}),onClick:()=>{v("/speakers")}},"/speakers/group"!==h&&{key:"2",label:(0,l.__)("Speaker Groups","eventin"),icon:(0,n.createElement)(g.CategoriesIcon,null),onClick:()=>{v("/speakers/group")}}];return(0,n.createElement)(r.Fill,{name:u.PRIMARY_HEADER_NAME},(0,n.createElement)(s.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,n.createElement)(m.A,{title:t}),(0,n.createElement)("div",{style:{display:"flex",alignItems:"center"}},(0,n.createElement)(d.Ay,{variant:d.zB,htmlType:"button",onClick:p,sx:{display:"flex",alignItems:"center"}},(0,n.createElement)(g.PlusOutlined,null),a),(0,n.createElement)(o.A,{type:"vertical",style:{height:"40px",marginInline:"12px",top:"0"}}),(0,n.createElement)(s.A,{gap:12},(0,n.createElement)(i.A,{menu:{items:f},trigger:["click"],placement:"bottomRight",overlayClassName:"action-dropdown"},(0,n.createElement)(d.Ay,{variant:d.Vt,sx:{borderColor:"#E5E5E5",color:"#8C8C8C"}},(0,n.createElement)(g.MoreIconOutlined,null)))))))}p.default.div`
	@media ( max-width: 360px ) {
		display: none;
		border: 1px solid red;
	}
`},99391(e,t,a){a.d(t,{A:()=>g});var n=a(51609),r=a(19549),l=a(29491),o=a(47143),i=a(52619),s=a(27723),c=a(54725),p=a(7638),d=a(64282);const{confirm:m}=r.A,u=(0,o.withDispatch)(e=>({shouldRefetchSpeakerList:e("eventin/global").setRevalidateSpeakerList})),g=(0,l.compose)(u)(function(e){const{shouldRefetchSpeakerList:t,record:a}=e;return(0,n.createElement)(p.Ib,{variant:p.Vt,onClick:()=>{m({title:(0,s.__)("Are you sure?","eventin"),icon:(0,n.createElement)(c.DeleteOutlinedEmpty,null),content:(0,s.__)("Are you sure you want to delete this speaker?","eventin"),okText:(0,s.__)("Delete","eventin"),okButtonProps:{type:"primary",danger:!0,classNames:"delete-btn"},centered:!0,onOk:async()=>{try{await d.A.speakers.deleteSpeaker(a.id),t(!0),(0,i.doAction)("eventin_notification",{type:"success",message:(0,s.__)("Successfully deleted the speaker!","eventin")})}catch(e){console.error("Error deleting category",e),(0,i.doAction)("eventin_notification",{type:"error",message:(0,s.__)("Failed to delete the speaker!","eventin")})}},onCancel(){}})}})})}}]);