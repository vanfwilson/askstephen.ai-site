"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[407,981],{1806(e,t,n){n.d(t,{A:()=>g});var a=n(51609),r=n(19549),i=n(29491),l=n(47143),o=n(52619),s=n(27723),c=n(54725),d=n(7638),p=n(64282);const{confirm:m}=r.A,u=(0,l.withDispatch)(e=>{const t=e("eventin/global");return{refreshGroupList:()=>t.invalidateResolution("getSpeakerCategories")}}),g=(0,i.compose)(u)(function(e){const{refreshGroupList:t,record:n}=e;return(0,a.createElement)(d.Ay,{variant:d.Vt,onClick:()=>{m({title:(0,s.__)("Are you sure?","eventin"),icon:(0,a.createElement)(c.DeleteOutlinedEmpty,null),content:(0,s.__)("Are you sure you want to delete this group?","eventin"),okText:(0,s.__)("Delete","eventin"),okButtonProps:{type:"primary",danger:!0,classNames:"delete-btn"},centered:!0,onOk:async()=>{try{await p.A.speakerCategories.deleteCategory(n.id),t(),(0,o.doAction)("eventin_notification",{type:"success",message:(0,s.__)("Successfully deleted the group!","eventin")})}catch(e){console.error("Error deleting group!",e),(0,o.doAction)("eventin_notification",{type:"error",message:(0,s.__)("Failed to delete the group!","eventin")})}},onCancel(){console.log("Cancel")}})}},(0,a.createElement)(c.DeleteOutlined,{width:"16",height:"16"}))})},23985(e,t,n){n.d(t,{A:()=>v});var a=n(51609),r=n(29491),i=n(47143),l=n(86087),o=n(52619),s=n(27723),c=n(60742),d=n(500),p=n(10012),m=n(65981),u=n(64282);const g=(0,i.withDispatch)(e=>{const t=e("eventin/global");return{refreshCategoryList:()=>t.invalidateResolution("getSpeakerCategories")}}),v=(0,r.compose)(g)(e=>{const{modalOpen:t,setModalOpen:n,refreshCategoryList:r,keyName:i,...g}=e,[v]=c.A.useForm(),[f,_]=(0,l.useState)(!1),{groupsData:h,setGroupsData:E}=(0,l.useContext)(m.SpeakersGroupContext)||{},y=h?.editData?.id;return(0,l.useEffect)(()=>{if(t){if(y){const{name:e}=h?.editData;v.setFieldsValue({name:e})}}else v.resetFields(),E&&E(e=>({...e,editData:{}}))},[t]),(0,a.createElement)(d.A,{title:(0,s.__)(y?"Edit Group":"New Group","eventin"),open:t,onCancel:()=>n(!1),cancelText:(0,s.__)("Cancel","eventin"),okText:(0,s.__)(y?" Update Group":"Add Group","eventin"),onOk:async()=>{await v.validateFields();try{_(!0);const t=v.getFieldsValue(!0);if(y){const e=h?.editData?.id;await u.A.speakerCategories.updateCategory(e,t),(0,o.doAction)("eventin_notification",{type:"success",message:(0,s.__)("Successfully updated the group!","eventin")})}else{const n=await u.A.speakerCategories.createCategory(t);if(e?.form&&n?.id){const t=e?.form?.getFieldValue(i,{preserve:!0})||[];Array.isArray(t)&&e?.form?.setFieldsValue({[i]:[n?.id,...t]})}(0,o.doAction)("eventin_notification",{type:"success",message:(0,s.__)("Successfully created group!","eventin")})}r(),n(!1),v.resetFields()}catch(e){(0,o.doAction)("eventin_notification",{type:"error",message:(0,s.__)(`Couldn't ${y?"Update":"Create"} Speaker Group`,"eventin"),description:`Reason: ${e?.message}`}),console.error(e)}finally{_(!1)}},confirmLoading:f,destroyOnHidden:!0},(0,a.createElement)(c.A,{layout:"vertical",form:v},(0,a.createElement)("div",null,(0,a.createElement)(p.ks,{name:"name",placeholder:"Enter Group Name",label:(0,s.__)("Group Name","eventin"),size:"middle",rules:[{required:!0,message:(0,s.__)("Group Name is Required!","eventin")}],required:!0}))))})},30549(e,t,n){n.d(t,{MG:()=>l,ff:()=>r,sC:()=>i});var a=n(69815);const r=a.default.div`
	background: #f3f5f7;
	min-height: calc( 100vh - 60px );
	padding-top: 30px;
`,i=a.default.div`
	background: #ffffff;
	border: 1px solid #e1e4e9;
	border-radius: 8px;
	padding: 20px;
	margin: 30px;
	margin-top: 0;
	@media ( max-width: 768px ) {
		padding: 10px;
		margin: 5px;
	}
`,l=a.default.div`
	max-width: 800px;
	padding: 20px 40px;
	margin: 0 auto;
	@media ( max-width: 768px ) {
		padding: 10px;
	}
`;a.default.div`
	padding-right: 20px;
	@media ( max-width: 768px ) {
		padding-right: 10px;
	}
`},43647(e,t,n){n.d(t,{A:()=>s});var a=n(51609),r=n(86087),i=n(54725),l=n(7638),o=n(65981);function s(e){const{record:t}=e,{setGroupsData:n}=(0,r.useContext)(o.SpeakersGroupContext);return(0,a.createElement)(l.Ay,{variant:l.Vt,onClick:()=>{n(e=>({...e,editData:t,isModalOpen:!0}))}},(0,a.createElement)(i.EditOutlined,{width:"16",height:"16"}))}},51837(e,t,n){n.d(t,{A:()=>o});var a=n(51609),r=n(27723),i=n(54711),l=n(84601);window.innerWidth;const o=[{title:(0,r.__)("ID","eventin"),dataIndex:"id",key:"id",defaultSortOrder:"ascend",sorter:(e,t)=>e.id-t.id},{title:(0,r.__)("Group","eventin"),dataIndex:"name",key:"name",width:"30%",render:(e,t)=>(0,a.createElement)(l.A,{text:e,record:t})},{title:(0,r.__)("Count","eventin"),dataIndex:"count",key:"count",render:e=>(0,a.createElement)("span",{className:"author"},e)},{title:(0,r.__)("Action","eventin"),key:"action",width:120,render:(e,t)=>(0,a.createElement)(i.A,{record:t})}]},54711(e,t,n){n.d(t,{A:()=>o});var a=n(51609),r=n(90070),i=n(1806),l=n(43647);function o(e){const{record:t}=e;return(0,a.createElement)(r.A,{size:"small",className:"event-actions"},(0,a.createElement)(l.A,{record:t}),(0,a.createElement)(i.A,{record:t}))}},59320(e,t,n){n.d(t,{A:()=>g});var a=n(51609),r=n(92911),i=n(79888),l=n(86087),o=n(27723),s=n(54725),c=n(79351),d=n(62215),p=n(61149),m=n(64282),u=n(65981);const g=e=>{const{selectedGroups:t,setSelectedGroups:n}=e,{setGroupsData:g}=(0,l.useContext)(u.SpeakersGroupContext),v=!!t?.length;return(0,a.createElement)(p.O,{className:"filter-wrapper"},(0,a.createElement)(r.A,{justify:v?"space-between":"flex-end",align:"center"},(0,a.createElement)(r.A,{justify:"start",align:"center",gap:8},v&&(0,a.createElement)(c.A,{refreshListName:"getSpeakerCategories",selectedCount:t?.length,callbackFunction:async()=>{const e=(0,d.A)(t);await m.A.speakerCategories.deleteCategory(e),n([])},setSelectedRows:n})),!v&&(0,a.createElement)(i.A,{className:"event-filter-by-name",placeholder:(0,o.__)("Search by group name","eventin"),size:"default",prefix:(0,a.createElement)(s.SearchIconOutlined,null),onChange:e=>{g(t=>({...t,filter:{...t.filter,searchTerm:e.target.value}}))},allowClear:!0})))}},61328(e,t,n){n.d(t,{f:()=>r});var a=n(69815);const r=a.default.div`
	background-color: #f4f6fa;
	padding: 12px 32px;
	min-height: 100vh;

	.ant-table-wrapper {
		padding: 15px 30px;
		background-color: #fff;
		border-radius: 0 0 12px 12px;
	}

	.ant-table-thead {
		> tr {
			> th {
				background-color: #ffffff;
				padding-top: 10px;
				font-weight: 400;
				font-size: 16px;
				color: #7a7a99;
				&:before {
					display: none;
				}
			}
			th.ant-table-column-sort {
				background-color: transparent;
			}
		}
	}
	.ant-table-wrapper td.ant-table-column-sort {
		background-color: transparent;
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
			border-color: #c9c9c9;
			color: #525266;
			background-color: #f5f5f5;
		}
	}

	.title {
		color: #020617;
		font-size: 18px;
		font-weight: 600;
		line-height: 26px;
		display: inline-flex;
		margin-bottom: 6px;
	}
`;a.default.div`
	padding: 22px 36px;
	background: #fff;
	border-radius: 12px 12px 0 0;
	border-bottom: 1px solid #ddd;

	.event-filter-by-name {
		height: 36px;
		border: 1px solid #ddd;
		max-width: 220px;

		input.ant-input {
			min-height: auto;
		}
	}
`},65407(e,t,n){n.r(t),n.d(t,{default:()=>S});var a=n(51609),r=n(29491),i=n(47143),l=n(86087),o=n(52619),s=n(27723),c=n(92911),d=n(60742),p=n(428),m=n(67313),u=n(74353),g=n.n(u),v=n(47767),f=n(55401),_=n(7638),h=n(6836),E=n(64282),y=n(94200),x=n(86434),A=n(30549),k=n(75093);const{Title:C,Text:b}=m.A,w=(0,i.withDispatch)(e=>{const t=e("eventin/global");return{invalidateSpeakerList:()=>t.invalidateResolution("getTotalSpeakers")}}),S=(0,r.compose)(w)(function(e){const{invalidateSpeakerList:t}=e,[n]=d.A.useForm(),{id:r}=(0,v.useParams)(),i=(0,v.useNavigate)(),m=!!r,[u,w]=(0,l.useState)(!1),[S,N]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{m&&(N(!0),E.A.speakers.singleSpeaker(r).then(e=>{const t={...e,social:Array.isArray(e?.social)&&e?.social?.every(e=>Array.isArray(e))?[{}]:e?.social,date:g()(e.date)};n.setFieldsValue(t)}).finally(()=>{N(!1)}))},[]),(0,a.createElement)(A.ff,null,(0,a.createElement)(x.A,null),(0,a.createElement)(A.sC,{className:"eventin-create-speaker-form-wrapper"},(0,a.createElement)(A.MG,{className:"eventin-create-speaker-form-container"},(0,a.createElement)("div",{style:{marginBottom:"40px"}},(0,a.createElement)(C,{level:3,style:{fontWeight:600,margin:"0 0 8px 0",fontSize:"26px",lineHeight:"32px",color:"#111827"}},m?(0,s.__)("Update speaker & organizer for events","eventin"):(0,s.__)("New speaker & organizer for events","eventin")),(0,a.createElement)(b,{style:{fontSize:"14px",color:"#6B7280",display:"block"}},(0,s.__)("Effortlessly manage speaker and organizer profiles for a seamless event experience","eventin"))),S?(0,a.createElement)(c.A,{justify:"center",align:"center",style:{minHeight:"320px"}},(0,a.createElement)(p.A,null)):(0,a.createElement)(d.A,{layout:"vertical",form:n,scrollToFirstError:!0,size:"large",onFinish:async()=>{w(!0);try{await n.validateFields();const e=n.getFieldsValue(!0);if(e.date=(0,h.dateFormatter)(e.date),m){const n=await E.A.speakers.updateSpeaker(r,e);if(!n?.id)throw new Error((0,s.__)("Couldn't edit speaker properly!","eventin"));t(),i("/speakers"),(0,o.doAction)("eventin_notification",{type:"success",message:(0,s.__)(`Successfully updated the ${e?.category.join(" & ")}!`,"eventin")})}else{const n=await E.A.speakers.createSpeaker(e);if(!n?.id)throw new Error((0,s.__)("Couldn't edit speaker properly!","eventin"));t(),i("/speakers"),(0,o.doAction)("eventin_notification",{type:"success",message:(0,s.__)(`Successfully created the ${e?.category.join(" & ")}!`,"eventin")})}}catch(e){(0,o.doAction)("eventin_notification",{type:"error",message:(0,s.__)(`Failed to ${m?"update":"create"} the speaker!`,"eventin"),description:e?.message||""})}finally{w(!1)}},requiredMark:f.A},(0,a.createElement)(y.A,{form:n}),(0,a.createElement)(c.A,{gap:12,justify:"end"},(0,a.createElement)(_.Ay,{variant:_.Vt,htmlType:"reset",onClick:()=>i("/speakers"),sx:{color:"#262626",padding:"8px 24px"}},(0,s.__)("Cancel","eventin")),(0,a.createElement)(_.Ay,{variant:_.zB,loading:u,htmlType:"submit"},m?(0,s.__)("Update","eventin"):(0,s.__)("Create New","eventin")))))),(0,a.createElement)(k.FloatingHelpButton,null))})},65981(e,t,n){n.r(t),n.d(t,{SpeakersGroupContext:()=>m,default:()=>g});var a=n(51609),r=n(29491),i=n(47143),l=n(86087),o=n(27723),s=n(57770),c=n(96031),d=n(82615),p=n(23985);const m=(0,l.createContext)(),u=(0,i.withSelect)(e=>{const t=e("eventin/global");return{groupList:t.getSpeakerCategories(),isLoading:t.isResolving("getSpeakerCategories")}}),g=(0,r.compose)(u)(function(e){const{groupList:t,isLoading:n}=e;let r=(0,s.A)(t,"name");const[i,u]=(0,l.useState)({filter:{group:null,searchTerm:null},editData:{},isModalOpen:!1}),g=e=>{u(t=>({...t,isModalOpen:e}))};return(0,a.createElement)(m.Provider,{value:{groupsData:i,setGroupsData:u}},(0,a.createElement)("div",{className:"event-tags-wrapper"},(0,a.createElement)(c.A,{title:(0,o.__)("Speakers Group","eventin"),onClickCallback:()=>g(!0),buttonText:(0,o.__)("New Group","eventin")}),(0,a.createElement)(d.A,{isLoading:n,groupList:r}),(0,a.createElement)(p.A,{modalOpen:i.isModalOpen,setModalOpen:g})))})},82615(e,t,n){n.d(t,{A:()=>u});var a=n(51609),r=n(86087),i=n(27723),l=n(75063),o=n(16784),s=n(65981),c=n(59320),d=n(51837),p=n(61328),m=n(75093);function u(e){const{groupList:t,isLoading:n}=e,[u,g]=(0,r.useState)([]),[v,f]=(0,r.useState)([]),{groupsData:_}=(0,r.useContext)(s.SpeakersGroupContext),h={selectedRowKeys:v,onChange:e=>{f(e)}};return(0,r.useEffect)(()=>{(()=>{let e=t;_?.filter?.searchTerm&&(e=e?.filter(e=>e?.name?.toLowerCase()?.includes(_?.filter?.searchTerm?.toLowerCase()))),g(e)})()},[t,_]),n?(0,a.createElement)(p.f,{className:"eventin-page-wrapper"},(0,a.createElement)(l.A,{active:!0})):(0,a.createElement)(p.f,{className:"eventin-page-wrapper"},(0,a.createElement)("div",{className:"event-list-wrapper"},(0,a.createElement)(c.A,{selectedGroups:v,setSelectedGroups:f,groupList:t}),(0,a.createElement)(o.A,{className:"eventin-data-table",columns:d.A,dataSource:u,rowSelection:h,rowKey:e=>e.id,scroll:{x:560},sticky:{offsetHeader:80},showSorterTooltip:!1,pagination:{showTotal:(e,t)=>(0,a.createElement)(m.CustomShowTotal,{totalCount:e,range:t,listText:(0,i.__)("groups","eventin")})}})))}},84601(e,t,n){n.d(t,{A:()=>l});var a=n(51609),r=n(86087),i=n(65981);function l(e){const{text:t,record:n}=e,{setGroupsData:l}=(0,r.useContext)(i.SpeakersGroupContext);return(0,a.createElement)("p",{style:{cursor:"pointer",color:"#020617",fontSize:"18px",margin:0,fontWeight:600},onClick:()=>{l(e=>({...e,editData:n,isModalOpen:!0}))}},t)}},86434(e,t,n){n.d(t,{A:()=>u});var a=n(51609),r=n(56427),i=n(27723),l=n(92911),o=n(47767),s=n(69815),c=n(54725),d=n(7638),p=n(18062),m=n(27154);function u(e){const{id:t}=(0,o.useParams)(),n=(0,o.useNavigate)(),u=!!t;return s.default.div`
		@media ( max-width: 560px ) {
			display: none;
			border: 1px solid red;
		}
	`,(0,a.createElement)(r.Fill,{name:m.PRIMARY_HEADER_NAME},(0,a.createElement)(l.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,a.createElement)(l.A,{align:"center",gap:16},(0,a.createElement)(d.Ay,{variant:d.Vt,icon:(0,a.createElement)(c.AngleLeftIcon,null),sx:{height:"36px",width:"36px",backgroundColor:"#fafafa",borderColor:"transparent",lineHeight:"1"},onClick:()=>{n("/speakers")}}),(0,a.createElement)(p.A,{title:u?(0,i.__)("Update Speaker / Organizer","eventin"):(0,i.__)("Add Speaker / Organizer","eventin")}))))}},94200(e,t,n){n.d(t,{A:()=>C});var a=n(51609),r=n(29491),i=n(47143),l=n(86087),o=n(27723),s=n(38181),c=n(16370),d=n(92911),p=n(60742),m=n(47152),u=n(36492),g=n(32099),v=n(54725),f=n(7638),_=n(3606),h=n(13444),E=n(16032),y=n(10012),x=n(91807),A=n(23985);const k=(0,i.withSelect)(e=>{const t=e("eventin/global");return{speakerCategories:t.getSpeakerCategories(),isLoading:t.isResolving("getSpeakerCategories")}}),C=(0,r.compose)(k)(e=>{const{form:t,speakerCategories:n}=e,[r,i]=(0,l.useState)(!1);return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(m.A,{gutter:[16,0]},(0,a.createElement)(c.A,{xs:24,md:12},(0,a.createElement)(y.ks,{label:(0,o.__)("Full Name","eventin"),name:"name",rules:[{required:!0,message:(0,o.__)("Full name is required!","eventin")}],required:!0,placeholder:(0,o.__)("Write Full Name","eventin"),size:"large",tooltip:(0,o.__)("Please enter full name of speaker/organizer","eventin")})),(0,a.createElement)(c.A,{xs:24,md:12},(0,a.createElement)(y.ks,{label:(0,o.__)("Email Address","eventin"),name:"email",required:!0,rules:[{type:"email",required:!0,message:(0,o.__)("Please enter valid email address","eventin")}],placeholder:(0,o.__)("Write Email Address","eventin"),size:"large",tooltip:(0,o.__)("Please enter email address of speaker/organizer","eventin")})),(0,a.createElement)(c.A,{xs:24,md:12},(0,a.createElement)(p.A.Item,{label:(0,o.__)("Role","eventin"),name:"category",style:{width:"100%"},rules:[{required:!0,message:(0,o.__)("You must choose a Roll","eventin")}],tooltip:(0,o.__)("Select a role of speaker/organizer","eventin")},(0,a.createElement)(u.A,{options:b,placeholder:(0,o.__)("Select Role","eventin"),size:"large",mode:"multiple",showSearch:!1}))),(0,a.createElement)(c.A,{xs:24,md:12},(0,a.createElement)(p.A.Item,{label:(0,o.__)("Category","eventin"),name:"speaker_group",style:{width:"100%"},tooltip:(0,o.__)("Select a group category of speaker/organizer","eventin")},(0,a.createElement)(h.A,{placeholder:(0,o.__)("Select a group category","eventin"),options:n,fieldNames:{value:"id",label:"name"},mode:"multiple",maxTagCount:"responsive"},(0,a.createElement)(f.yl,{onClick:()=>i(!0)},(0,o.__)("Add New","eventin"))))),(0,a.createElement)(c.A,{xs:24,md:24},(0,a.createElement)(_.A,{name:"summary",label:(0,o.__)("Bio","eventin"),form:t,sx:{height:"150px",marginBottom:"50px"}})),(0,a.createElement)(c.A,{xs:24,md:12},(0,a.createElement)(y.ks,{label:(0,o.__)("Job Title","eventin"),name:"designation",placeholder:(0,o.__)("Write Job Title","eventin"),size:"large"})),(0,a.createElement)(c.A,{xs:24,md:12},(0,a.createElement)(y.ks,{label:(0,o.__)("Company Name","eventin"),name:"company_name",placeholder:(0,o.__)("Enter Company Name","eventin"),size:"large"})),(0,a.createElement)(c.A,{xs:24},(0,a.createElement)(y.ks,{label:(0,o.__)("Company URL","eventin"),name:"company_url",placeholder:(0,o.__)("Enter Company URL","eventin"),size:"large",rules:[{type:"url",message:(0,o.__)("Please enter a valid URL!","eventin")}]}))),(0,a.createElement)(m.A,{gutter:[16,0]},(0,a.createElement)(c.A,{xs:24,md:8},(0,a.createElement)(p.A.Item,{label:(0,o.__)("Photo","eventin"),name:"image",tooltip:(0,o.__)("Upload photo","eventin")},(0,a.createElement)(x.ng,{form:t,name:"image",buttonText:(0,o.__)("Upload Photo","eventin")}))),(0,a.createElement)(c.A,{xs:24,md:8},(0,a.createElement)(p.A.Item,{label:(0,o.__)("Company logo","eventin"),name:"company_logo",tooltip:(0,o.__)("Upload your company logo","eventin")},(0,a.createElement)(x.ng,{form:t,name:"company_logo",buttonText:(0,o.__)("Upload Logo","eventin")})))),(0,a.createElement)(m.A,{gutter:[16,0],align:"middle"},(0,a.createElement)(c.A,{xs:24},(0,a.createElement)("div",null,(0,a.createElement)(d.A,{align:"center"},(0,a.createElement)("p",{style:{margin:"10px 0px",fontSize:"16px",fontWeight:600,color:"#444444"}},(0,o.__)("Social Profiles","eventin")),(0,a.createElement)(g.A,{title:(0,o.__)("Promote your event by adding links to your social media profiles.","eventin")},(0,a.createElement)("span",{style:{marginLeft:"7px"}},(0,a.createElement)(v.InfoCircleOutlined,{width:20,height:20})))))),(0,a.createElement)(c.A,{xs:24},(0,a.createElement)(E.A,{form:t,name:"social",label:(0,o.__)("Social Profiles","eventin")}))),(0,a.createElement)(m.A,null,(0,a.createElement)(c.A,{xs:24},(0,a.createElement)(p.A.Item,{name:"hide_user",valuePropName:"checked"},(0,a.createElement)(s.A,{defaultChecked:!0,style:{fontWeight:500,margin:"20px 0px"}},(0,o.__)("Hide From Users","eventin"),(0,a.createElement)(g.A,{title:(0,o.__)("When enabled, this profile will be hidden from the “Users > All Users” list in your WordPress dashboard. This is useful for adding internal event roles without exposing them as site users.","eventin")},(0,a.createElement)("span",{style:{marginLeft:"10px"}},(0,a.createElement)(v.InfoCircleOutlined,{width:20,height:20}))))))),(0,a.createElement)(A.A,{modalOpen:r,setModalOpen:i,form:t,keyName:"speaker_group"}))}),b=[{value:"speaker",label:(0,o.__)("Speaker","eventin")},{value:"organizer",label:(0,o.__)("Organizer","eventin")}]},96031(e,t,n){n.d(t,{A:()=>v});var a=n(51609),r=n(56427),i=n(27723),l=n(52741),o=n(11721),s=n(92911),c=n(47767),d=n(69815),p=n(7638),m=n(18062),u=n(27154),g=n(54725);function v(e){const{title:t,buttonText:n,onClickCallback:d}=e,v=(0,c.useNavigate)(),{pathname:f}=(0,c.useLocation)(),_=["/speakers"!==f&&{key:"0",label:(0,i.__)("Speaker List","eventin"),icon:(0,a.createElement)(g.EventListIcon,{width:20,height:20}),onClick:()=>{v("/speakers")}},"/speakers/group"!==f&&{key:"2",label:(0,i.__)("Speaker Groups","eventin"),icon:(0,a.createElement)(g.CategoriesIcon,null),onClick:()=>{v("/speakers/group")}}];return(0,a.createElement)(r.Fill,{name:u.PRIMARY_HEADER_NAME},(0,a.createElement)(s.A,{justify:"space-between",align:"center",wrap:"wrap",gap:20},(0,a.createElement)(m.A,{title:t}),(0,a.createElement)("div",{style:{display:"flex",alignItems:"center"}},(0,a.createElement)(p.Ay,{variant:p.zB,htmlType:"button",onClick:d,sx:{display:"flex",alignItems:"center"}},(0,a.createElement)(g.PlusOutlined,null),n),(0,a.createElement)(l.A,{type:"vertical",style:{height:"40px",marginInline:"12px",top:"0"}}),(0,a.createElement)(s.A,{gap:12},(0,a.createElement)(o.A,{menu:{items:_},trigger:["click"],placement:"bottomRight",overlayClassName:"action-dropdown"},(0,a.createElement)(p.Ay,{variant:p.Vt,sx:{borderColor:"#E5E5E5",color:"#8C8C8C"}},(0,a.createElement)(g.MoreIconOutlined,null)))))))}d.default.div`
	@media ( max-width: 360px ) {
		display: none;
		border: 1px solid red;
	}
`}}]);