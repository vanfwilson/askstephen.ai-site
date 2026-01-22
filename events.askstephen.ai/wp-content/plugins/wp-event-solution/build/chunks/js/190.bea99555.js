"use strict";(globalThis.webpackChunkwp_event_solution=globalThis.webpackChunkwp_event_solution||[]).push([[190],{1184(e,t,n){n.d(t,{o:()=>l});var a=n(47767),i=n(55397),s=n(62337);function l({hasEventId:e,onSaveDraft:t,currentStep:n,nextStep:l,eventStatus:r}){const o=(0,a.useNavigate)(),{handleCreateEvent:d,isLoading:c}=(0,i.T)(),{handleEventStatus:u,isPublishLoading:v,isSaveLoading:m,handleSaveChanges:p}=(0,s.B)(),g=(e,t)=>{o(`/events/edit/${t}/${e}`)};return{handleSaveAndNext:async()=>{e?await(async()=>{let e;e="advanced"===n?"draft"===r?await u("publish"):await p():await t(),e?.id&&g(l,e.id)})():await(async()=>{const e=await d("draft");e?.id&&g(l,e.id)})()},isLoading:"advanced"===n?"draft"===r?v:m:c}}},7241(e,t,n){n.d(t,{A:()=>o});var a=n(51609),i=n(27723),s=(n(86087),n(60742)),l=n(93997),r=n(75093);function o(){const{form:e}=(0,l.useEventSelectContext)(),t=[{value:"publish",label:(0,i.__)("Publish","eventin")},{value:"draft",label:(0,i.__)("Draft","eventin")}];return(0,a.createElement)(s.A,{layout:"vertical",form:e},(0,a.createElement)(r.SelectInput,{name:"visibility_status",label:(0,i.__)("Visibility Status","eventin"),options:t}),(0,a.createElement)(r.TextInputPassword,{name:"password",label:(0,i.__)("Password","eventin"),placeholder:(0,i.__)("Enter password","eventin")}))}},12615(e,t,n){n.d(t,{A:()=>v});var a=n(51609),i=n(47767),s=n(60742),l=n(74353),r=n.n(l),o=n(55397),d=n(28106),c=n(51557),u=n(93997);function v(){const{form:e}=(0,u.useEventSelectContext)(),{handleCreateEvent:t,isLoading:n}=(0,o.T)(),l=(0,i.useNavigate)(),v={start_date_time:r()(new Date),end_date_time:r()(new Date).add(5,"hour")};return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(d.A,null),(0,a.createElement)(c.wn,{className:"eventin-event-details-section"},(0,a.createElement)(s.A,{form:e,name:"event-create-form",layout:"vertical",autoComplete:"on",scrollToFirstError:!0,onFinish:async()=>{const n=e._submitStatus||"draft",a=await t(n);a?.id&&l(`/events/edit/${a?.id}/basic`)},onFinishFailed:t=>{t.errorFields.length>0&&e.scrollToField(t.errorFields[0].name[0])},className:"etn-event-creation-form",requiredMark:(e,{required:t})=>(0,a.createElement)(a.Fragment,null,e,t&&(0,a.createElement)("span",{style:{color:"#EF4444",marginLeft:"4px"}},"*")),colon:!1,initialValues:v},(0,a.createElement)(i.Outlet,null))))}},13232(e,t,n){n.d(t,{A:()=>d});var a=n(51609),i=n(27723),s=n(11721),l=n(54725),r=n(7638),o=(n(69815),n(40372));function d({onSaveChanges:e,onSwitchToDraft:t,setVisibilityModalOpen:n,onDelete:d,disabled:c,loading:u}){const v=o.Ay.useBreakpoint()?.md,m=[{label:(0,a.createElement)(r.Ay,{className:"eventin-event-detail-header-dropdown-button",variant:r.qy,size:"small",icon:(0,a.createElement)(l.DraftOutlined,{width:"16",height:"16"}),onClick:t,disabled:c},(0,i.__)("Switch to Draft","eventin")),key:"draft"},{label:(0,a.createElement)(r.Ay,{className:"eventin-event-detail-header-dropdown-button",variant:r.qy,size:"small",onClick:()=>n(!0),icon:(0,a.createElement)(l.VisibilityIcon,null)},(0,i.__)("Visibility Status","eventin")),key:"visibility-status"},{label:(0,a.createElement)(r.Ay,{className:"eventin-event-detail-header-dropdown-button",variant:r.qy,onClick:d,icon:(0,a.createElement)(l.DeleteOutlined,{width:"16",height:"16"}),size:"small",disabled:c,sx:{color:"#FF4D4F"}},(0,i.__)("Move to Trash","eventin")),key:"delete",className:"delete-event"}];return(0,a.createElement)(s.A.Button,{trigger:["click"],placement:"bottomRight",overlayClassName:"etn-action-dropdown",className:"etn-event-header-dropdown etn-header-status-dropdown",size:v?"large":"middle",arrow:!0,type:"primary",icon:(0,a.createElement)(l.AngleDownIcon,null),onClick:e,disabled:c,loading:u,menu:{items:m}},(0,i.__)("Update","eventin"))}},24646(e,t,n){n.d(t,{A:()=>f});var a=n(51609),i=n(27723),s=n(47767),l=n(92911),r=n(94455),o=n(7638),d=n(54725),c=n(75093),u=n(95803),v=n(37878),m=n(88213),p=n(86419),g=n(1184),h=n(93997);const f=({hasEventId:e,onSaveDraft:t,isPublishLoading:n,isSaveLoading:f})=>{const _=(0,s.useNavigate)(),{id:b}=(0,s.useParams)(),{sourceData:x}=(0,h.useEventSelectContext)(),{currentStep:E,nextStep:y,backStep:A,isAdvancedStep:w,isBasicStep:S}=(0,v.Y)(),k=(0,m.b)(),D=(0,p.X)(E,k),{handleSaveAndNext:C,isLoading:L}=(0,g.o)({hasEventId:e,onSaveDraft:t,currentStep:E,nextStep:y,eventStatus:x?.status});return D?(0,a.createElement)(r.q,null,(0,a.createElement)(l.A,{justify:"space-between",align:"center"},(0,a.createElement)("p",null,u.G[E]),(0,a.createElement)(l.A,{gap:10,align:"center"},(0,a.createElement)(c.If,{condition:!S},(0,a.createElement)(o.Ay,{variant:o.Rm,onClick:()=>{_(e?`/events/edit/${b}/${A}`:`/events/create/${A}`)}},(0,i.__)("Back","eventin"))),(0,a.createElement)(o.Ay,{onClick:C,variant:o.Vt,iconPosition:"end",sx:{borderColor:"#5700D1",color:"#5700D1"},loading:n||f||L,...!w&&{icon:(0,a.createElement)(d.ButtonRightArrowIcon,null)}},w&&e?"draft"===x?.status?(0,i.__)("Publish","eventin"):(0,i.__)("Save","eventin"):w&&!e?(0,i.__)("Save as Draft","eventin"):(0,i.__)("Save & Next step","eventin"))))):null}},28106(e,t,n){n.d(t,{A:()=>f});var a=n(51609),i=(n(56427),n(47767)),s=n(86087),l=(n(27154),n(51557)),r=n(70142),o=n(78473),d=n(77469),c=n(81502),u=n(62337),v=n(93997),m=n(78619),p=n(69460),g=n(24646),h=n(50256);const f=()=>{(0,i.useLocation)();const[e,t]=(0,s.useState)(!1),{form:n,id:f,isCreateLoading:_}=(0,v.useEventSelectContext)(),{eventTitle:b,formattedDateTime:x,eventLink:E,isLoading:y}=(0,d.T)(),{isDraft:A,isPublished:w,isPublishDisabled:S}=(0,c.K)(),{handleEventStatus:k,handleSaveChanges:D,handleDelete:C,isPublishLoading:L,isSaveLoading:F}=(0,u.B)(null),N=(0,m.I3)(f),O=N?F:_,I=N?L:_;return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(l.Fc,{className:"eventin-event-details-header"},(0,a.createElement)(r.A,{eventTitle:b,formattedDateTime:x,isLoading:y,hasEventId:N}),(0,a.createElement)(p.A,null),(0,a.createElement)(o.A,{isDraft:A,isPublished:w,eventLink:E,onSaveDraft:N?D:()=>{n._submitStatus="draft",n.submit()},onPublish:N?()=>k("publish"):()=>{n._submitStatus="publish",n.submit()},onSwitchToDraft:()=>k("draft"),onDelete:C,onSaveChanges:D,isPublishLoading:I,isSaveLoading:O,isPublishDisabled:S,hasEventId:N,isDataLoading:y,setVisibilityModalOpen:t})),(0,a.createElement)(g.A,{hasEventId:N,onSaveDraft:D,isPublishLoading:L,isSaveLoading:F}),(0,a.createElement)(h.A,{visibilityModalOpen:e,setVisibilityModalOpen:t,handleSubmit:D,loading:F}))}},29397(e,t,n){n.d(t,{A:()=>d});var a=n(51609),i=n(27723),s=n(7638),l=n(54725),r=n(40372);const{useBreakpoint:o}=r.Ay;function d({onClick:e,loading:t,disabled:n}){const o=r.Ay.useBreakpoint()?.md,d={fontSize:"14px",height:o?"40px":"32px"};return(0,a.createElement)(s.Ay,{loading:t,onClick:e,variant:{...s.Rm,size:o?"large":"small"},sx:d,disabled:n},(0,a.createElement)(l.DraftOutlined,{width:"16",height:"16"}),o&&(0,i.__)("Save as Draft","eventin"))}},35190(e,t,n){n.r(t),n.d(t,{default:()=>u});var a=n(51609),i=n(86087),s=n(47143),l=n(12615),r=n(93997),o=n(47767),d=n(5028),c=n(87660);const u=()=>{const{setEventState:e}=(0,s.useDispatch)("eventin/events");(0,i.useEffect)(()=>{e({autocompleteValue:[],location:null})},[]),(0,i.useEffect)(()=>(document.documentElement.classList.add("create-event-page"),()=>document.documentElement.classList.remove("create-event-page")),[]);const t=e=>{const t=e.component,n=e.sidebarContent;return(0,a.createElement)(c.A,{sidebarContent:n},(0,a.createElement)(t,{title:e.title}))};return(0,a.createElement)(r.default,null,(0,a.createElement)(o.Routes,null,(0,a.createElement)(o.Route,{element:(0,a.createElement)(l.A,null)},d.ev.map(e=>(0,a.createElement)(o.Route,{key:e.slug,path:e.slug,element:t(e)})),(0,a.createElement)(o.Route,{path:"*",element:(0,a.createElement)(o.Navigate,{to:d.uT,replace:!0})}))))}},37878(e,t,n){n.d(t,{Y:()=>s});var a=n(47767),i=n(95803);function s(){const e=(0,a.useLocation)().pathname,t=i.O.find(t=>e.includes(t))||"basic",n=i.O.indexOf(t);return{currentStep:t,nextStep:i.O[n+1]||i.O[i.O.length-1],backStep:i.O[n-1]||i.O[0],isAdvancedStep:"advanced"===t,isBasicStep:"basic"===t}}},43065(e,t,n){n.d(t,{A:()=>s});var a=n(68949),i=n(1671);function s(e){const t={...e},{start_date:n,end_date:s,start_time:l,end_time:r}=(0,a.G)(t);t.start_date=n,t.end_date=s,t.start_time=l,t.end_time=r;const o=t.location,{address:d,place_id:c,latitude:u,longitude:v,...m}=Object.assign({},o);if(t?.event_type===i.R.OFFLINE)t.location={address:d?.toString(),place_id:c,latitude:u,longitude:v};else if(t?.event_type===i.R.HYBRID){const e=o?.offline||{},n=o?.online||{};t.location={address:e.address?.toString(),place_id:e.place_id,latitude:e.latitude,longitude:e.longitude,integration:n.integration||"",custom_url:n.custom_url||""}}else"custom_url"!==m?.integration&&(m.custom_url=""),t.location=m;if(t.fluent_crm=t.fluent_crm?"yes":"no",t.recurring_enabled=t.recurring_enabled&&"no"!==t.recurring_enabled?"yes":"no",t.virtual_product=t._virtual,t._virtual=t._virtual?"yes":"no",t.tax_status=t._tax_status,t._tax_status=t._tax_status?"none":"taxable",t?.organizer_type||(t.organizer_type="single"),t?.speaker_type||(t.speaker_type="single"),t?.event_recurrence?.recurrence_custom){const e=t?.event_recurrence?.recurrence_custom&&t?.event_recurrence?.recurrence_custom?.map(e=>dayjs(e).format("YYYY-MM-DD"));t.event_recurrence.recurrence_custom=e}return t}},48366(e,t,n){n.d(t,{p:()=>l});var a=n(74353),i=n.n(a),s=n(6836);function l(e,t){return e?`${i()(e).format("ddd")}, ${(0,s.getWordpressFormattedDate)(e)}, ${(0,s.getWordpressFormattedTime)(t)}`:""}},50256(e,t,n){n.d(t,{A:()=>d});var a=n(51609),i=n(27723),s=(n(86087),n(60742)),l=n(500),r=n(7241),o=n(93997);const d=e=>{const{visibilityModalOpen:t,setVisibilityModalOpen:n,handleSubmit:d,loading:c}=e,{form:u}=(0,o.useEventSelectContext)(),v=s.A.useWatch("status",u),m=s.A.useWatch("password",u);return(0,a.createElement)(l.A,{title:(0,i.__)("Event Visibility status","eventin"),open:t,onCancel:()=>{n(!1)},cancelText:(0,i.__)("Cancel","eventin"),okText:(0,i.__)("Save","eventin"),confirmLoading:c,onOk:async()=>{try{u.setFieldsValue({status:v,password:m}),await d(),n(!1)}catch(e){console.log("Form validation failed:",e)}},destroyOnHidden:!0},(0,a.createElement)(r.A,null))}},55397(e,t,n){n.d(t,{T:()=>m});var a=n(52619),i=n(27723),s=n(47767),l=n(47143),r=n(43065),o=n(51201),d=n(64282),c=n(1671),u=n(93997),v=n(5028);function m(){const{form:e,isCreateLoading:t}=(0,u.useEventSelectContext)(),{setSourceData:n,setIsCreateLoading:m}=(0,u.useEventDispatchContext)(),p=(0,s.useNavigate)(),{programs:g}=(0,l.useSelect)(e=>e(v.EF).getEventState());return{handleCreateEvent:async(t="draft")=>{m(!0);try{const s=e.getFieldsValue(!0);s.event_type||(s.event_type=c.R.OFFLINE);const l=(0,r.A)(s);if(l.visibility_status=t,l.schedules=Array.isArray(g)?g?.map(e=>e.key):[],s.event_type===c.R.OFFLINE&&!l?.location?.address)return m(!1),(0,a.doAction)("eventin_notification",{type:"error",message:(0,i.__)("Location is required","eventin")}),void p("/events/create/basic");l.timezone||(l.timezone=Intl.DateTimeFormat().resolvedOptions().timeZone);const u=await d.A.events.createEvent(l);if(u.id){const t=await(0,o.A)(u,e);e.setFieldsValue(t),n(t),(0,a.doAction)("eventin_notification",{type:"success",message:(0,i.__)("Event created successfully!","eventin")})}return u}catch(e){(0,a.doAction)("eventin_notification",{type:"error",message:e.message||(0,i.__)("Couldn't create event!","eventin")}),p("/events/create/basic")}finally{m(!1)}},isLoading:t}}},62337(e,t,n){n.d(t,{B:()=>p});var a=n(86087),i=n(52619),s=n(27723),l=n(47143),r=n(47767),o=n(93997),d=n(51201),c=n(43065),u=n(80734),v=n(64282),m=n(5028);function p(e){const{form:t,id:n,sourceData:p}=(0,o.useEventSelectContext)(),{setSourceData:g}=(0,o.useEventDispatchContext)(),h=(0,r.useNavigate)(),{programs:f}=(0,l.useSelect)(e=>e(m.EF).getEventState()),[_,b]=(0,a.useState)(!1),[x,E]=(0,a.useState)(!1);return{handleEventStatus:async a=>{if(!n)return;const l="publish"===a?(0,s.__)("Event published successfully!","eventin"):(0,s.__)("Event status changed to draft!","eventin");b(!0);try{await t.validateFields();const s=t.getFieldsValue(!0),r=(0,c.A)(s);r.schedules=Array.isArray(f)?f?.map(e=>e.key):[];const o={...r,visibility_status:a},u=await v.A.events.updateEvent(n,o),m=await(0,d.A)(u,t);return g(m),t.setFieldsValue({visibility_status:a,event_slug:u?.event_slug}),e&&e(!0),(0,i.doAction)("eventin_notification",{type:"success",message:l}),u}catch(e){(0,i.doAction)("eventin_notification",{type:"error",message:(0,s.__)("Couldn't change event status!","eventin"),description:`Reason: ${e?.response?.message}`})}finally{b(!1)}},handleSaveChanges:async()=>{if(n){E(!0);try{await t.validateFields();const a=t.getFieldsValue(!0),l=(0,c.A)(a);l.schedules=Array.isArray(f)?f?.map(e=>e.key):[];const r=await v.A.events.updateEvent(n,l),o=await(0,d.A)(r,t);return g(o),t.setFieldsValue(o),e&&e(!0),(0,i.doAction)("eventin_notification",{type:"success",message:(0,s.__)("Event updated successfully!","eventin")}),r}catch(e){if(e?.errorFields){const t=e.errorFields[0],n=Array.isArray(t?.name)?t.name.join("."):t?.name||"";(0,i.doAction)("eventin_notification",{type:"error",message:t?.errors?.[0]||(0,s.__)("Validation failed!","eventin"),description:n?(0,s.__)("Please check the fields","eventin"):""})}else(0,i.doAction)("eventin_notification",{type:"error",message:e.message||(0,s.__)("Couldn't update event!","eventin")})}finally{E(!1)}}},handleDelete:()=>{n&&(0,u.A)({title:(0,s.__)("Are you sure?","eventin"),content:(0,s.__)("Are you sure you want to delete this event?","eventin"),onOk:async()=>{try{await v.A.events.deleteEvent(n),e&&e(!0),h("/events")}catch(e){console.error("Error deleting event",e),(0,i.doAction)("eventin_notification",{type:"error",message:(0,s.__)("Couldn't delete event!","eventin")})}}})},isPublishLoading:_,isSaveLoading:x}}},68909(e,t,n){n.d(t,{A:()=>d});var a=n(51609),i=n(27723),s=n(32099),l=n(54725),r=n(7638),o=n(40372);function d({eventLink:e}){if(!e)return null;const t=o.Ay.useBreakpoint()?.md;return(0,a.createElement)(s.A,{placement:"bottom",title:(0,i.__)("Preview","eventin")},(0,a.createElement)(r.Ay,{variant:{...r.Rm,size:t?"large":"small"},sx:{height:"40px",fontSize:"14px"},onClick:()=>window.open(e,"_blank")},t&&(0,i.__)("Preview","eventin"),(0,a.createElement)(l.ExternalLinkOutlined,{width:"16",height:"16"})))}},69460(e,t,n){n.d(t,{A:()=>r});var a=n(51609),i=n(27723),s=(n(86087),n(47767)),l=n(51557);function r(){const e=(0,s.useLocation)(),t=(0,s.useNavigate)(),{id:n}=(0,s.useParams)(),r={basic:1,tickets:2,schedule:3,advanced:4},o=(()=>{const t=e.pathname.split("/").filter(e=>e),n=t[t.length-1];return r[n]||1})(),d=[{number:1,label:(0,i.__)("Basic Info","eventin"),slug:"basic"},{number:2,label:(0,i.__)("Tickets","eventin"),slug:"tickets"},{number:3,label:(0,i.__)("Schedule","eventin"),slug:"schedule"},{number:4,label:(0,i.__)("Advanced","eventin"),slug:"advanced"}],c=(e.pathname.includes("/create/"),e.pathname.includes("/edit/")),u=(()=>{if(c){const t=e.pathname.split("/"),n=t.indexOf("edit");if(-1!==n&&t[n+1])return`/events/edit/${t[n+1]}`}return"/events/create"})();return(0,a.createElement)(l.Pi,{className:"etn-step-indicator-container"},d.map((e,n)=>{const i=e.number===o;return(0,a.createElement)("div",{key:e.number,style:{display:"flex",alignItems:"center"}},(0,a.createElement)(l.yi,{$isActive:i,onClick:()=>(e=>{const n=`${u}/${e.slug}`;t(n)})(e),className:"etn-step-item-button"},(0,a.createElement)("span",{className:"step-number"},e.number),(0,a.createElement)("span",{className:"step-label"},e.label)),n<d.length-1&&(0,a.createElement)(l.OT,{className:"etn-step-connector"}))}))}},70142(e,t,n){n.d(t,{A:()=>m});var a=n(51609),i=n(27723),s=n(75063),l=n(54725),r=n(7638),o=n(57237),d=n(47767),c=n(98901),u=n(51557),v=n(40372);function m({eventTitle:e,formattedDateTime:t,isLoading:n,hasEventId:m}){const p=(0,d.useNavigate)(),g=v.Ay.useBreakpoint()?.md,h=m&&e||(0,i.__)("Creating Your Event!","eventin"),f={margin:"0 0 5px",fontSize:g?"20px":"16px",lineHeight:g?"26px":"20px",color:"#41454f",fontWeight:"500"};return(0,a.createElement)(u.G$,{className:"eventin-event-details-header-left"},(0,a.createElement)(r.Ay,{variant:{...r.qy,size:g?"large":"middle"},icon:(0,a.createElement)(l.AngleLeftIcon,{height:24,width:24}),onClick:()=>p("/events"),className:"etn-event-title-back-button"}),(0,a.createElement)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}},(0,a.createElement)(c.k3,{className:"etn-event-title-container"},(0,a.createElement)(o.A,{ellipsis:{tooltip:h},sx:f},n?(0,a.createElement)(s.A.Input,{active:!0,size:"small"}):h))))}},77469(e,t,n){n.d(t,{T:()=>l});var a=n(60742),i=n(93997),s=n(48366);function l(){const{form:e,sourceData:t,isLoading:n}=(0,i.useEventSelectContext)(),l=a.A.useWatch("title",e)||e.getFieldValue("title"),r=a.A.useWatch("start_date",e)||e.getFieldValue("start_date"),o=a.A.useWatch("start_time",e)||e.getFieldValue("start_time"),d=(0,s.p)(r,o),c=t?.link;return{eventTitle:l,formattedDateTime:d,eventLink:c,isLoading:n}}},78473(e,t,n){n.d(t,{A:()=>v});var a=n(51609),i=n(27723),s=n(86087),l=n(51557),r=n(68909),o=n(92559),d=n(29397),c=n(13232),u=n(7638);function v({isDataLoading:e,isDraft:t,eventLink:n,onSaveDraft:v,onPublish:m,onSwitchToDraft:p,onDelete:g,onSaveChanges:h,isPublishLoading:f,isSaveLoading:_,setVisibilityModalOpen:b,hasEventId:x}){const[E,y]=(0,s.useState)(null);return x?x&&t?(0,a.createElement)(l.lX,{className:"eventin-event-details-header-right"},(0,a.createElement)(d.A,{onClick:v,loading:_,disabled:e}),(0,a.createElement)(o.A,{onPublish:m,onDelete:g,eventLink:n,loading:f,showDelete:!0,isDraft:t,disabled:e,setVisibilityModalOpen:b})):x&&!t?(0,a.createElement)(l.lX,{className:"eventin-event-details-header-right"},(0,a.createElement)(r.A,{eventLink:n,disabled:e}),(0,a.createElement)(c.A,{onSaveChanges:h,onSwitchToDraft:p,onDelete:g,loading:f||_,disabled:e,setVisibilityModalOpen:b})):null:(0,a.createElement)(l.lX,{className:"eventin-event-details-header-right"},(0,a.createElement)(d.A,{onClick:()=>{y("draft"),v()},loading:"draft"===E&&_}),(0,a.createElement)(u.Ay,{variant:u.zB,onClick:()=>{y("publish"),m()},loading:"publish"===E&&f,sx:{fontSize:"14px",height:"40px"}},(0,i.__)("Publish","eventin")))}},78619(e,t,n){function a(e){return"draft"===e}function i(e){return"publish"===e||"published"===e||"Ongoing"===e||"Upcoming"===e||"Expired"===e}function s(e){return e?.visibility_status||"draft"}function l(e){return Boolean(e)}n.d(t,{I3:()=>l,Sb:()=>a,bO:()=>i,rI:()=>s})},81502(e,t,n){n.d(t,{K:()=>l});var a=n(86087),i=n(93997),s=n(78619);function l(){const{sourceData:e}=(0,i.useEventSelectContext)(),t=(0,s.rI)(e)||"draft",n=(0,s.Sb)(t),l=(0,s.bO)(t),[r,o]=(0,a.useState)(!n),[d,c]=(0,a.useState)(n);return(0,a.useEffect)(()=>{o(!n),c(n)},[n,t]),{status:t,isDraft:n,isPublished:l,isPublishDisabled:r,isDraftVisible:d,setPublishDisabled:o,setDraftVisible:c}}},86419(e,t,n){n.d(t,{X:()=>i});var a=n(1671);function i(e,t){const n=t.title&&t.start&&t.end,i={[a.R.OFFLINE]:n&&t.locationAddress,[a.R.ONLINE]:n&&t.locationIntegration,[a.R.HYBRID]:n&&t.hybridIntegration};return"basic"!==e||i[t.eventType]}},87660(e,t,n){n.d(t,{A:()=>r});var a=n(51609),i=n(86087),s=n(51557),l=n(75093);function r({children:e,sidebarContent:t}){const n=window.localized_multivendor_data?Number(window.localized_multivendor_data?.is_vendor):void 0;return(0,i.useEffect)(()=>(document.documentElement.classList.add("create-event-page"),()=>document.documentElement.classList.remove("create-event-page")),[]),(0,a.createElement)(s.Uk,{$sidebarContent:!!t},(0,a.createElement)(l.If,{condition:t},(0,a.createElement)(s.Od,{$isVendor:n},(0,a.createElement)(s.J3,{$isVendor:n},e)),(0,a.createElement)(s.B6,{$isVendor:n},(0,a.createElement)("div",{className:"etn-event-sidebar-content"},t))),(0,a.createElement)(l.If,{condition:!t},(0,a.createElement)(s.zf,null,(0,a.createElement)(s.vo,null,e))))}},88213(e,t,n){n.d(t,{b:()=>l});var a=n(60742),i=n(1671),s=n(93997);function l(){const{form:e}=(0,s.useEventSelectContext)();return{title:a.A.useWatch("title",e),start:a.A.useWatch("start_date_time",e),end:a.A.useWatch("end_date_time",e),locationAddress:a.A.useWatch(["location","address"],e),locationIntegration:a.A.useWatch(["location","integration"],e),hybridIntegration:a.A.useWatch(["location","online","integration"],e),eventType:a.A.useWatch("event_type",{form:e,preserve:!0})||i.R.OFFLINE}}},92559(e,t,n){n.d(t,{A:()=>d});var a=n(51609),i=n(27723),s=n(11721),l=n(54725),r=n(7638),o=n(40372);function d({onPublish:e,onDelete:t,eventLink:n,loading:d,showDelete:c=!1,setVisibilityModalOpen:u,disabled:v}){const m=o.Ay.useBreakpoint()?.md,p=[n&&{label:(0,a.createElement)(r.Ay,{className:"eventin-event-detail-header-dropdown-button",variant:r.qy,size:"small",onClick:()=>window.open(n,"_blank"),disabled:v,icon:(0,a.createElement)(l.ExternalLinkOutlined,{width:"16",height:"16"})},(0,i.__)("Preview","eventin")),key:"preview"},{label:(0,a.createElement)(r.Ay,{className:"eventin-event-detail-header-dropdown-button",variant:r.qy,size:"small",onClick:()=>u(!0),icon:(0,a.createElement)(l.VisibilityIcon,null)},(0,i.__)("Visibility Status","eventin")),key:"visibility-status"},c&&t&&{label:(0,a.createElement)(r.Ay,{className:"eventin-event-detail-header-dropdown-button",variant:r.qy,onClick:t,icon:(0,a.createElement)(l.DeleteOutlined,{width:"16",height:"16"}),size:"small",sx:{color:"#FF4D4F"}},(0,i.__)("Move to Trash","eventin")),key:"delete",className:"delete-event"}].filter(Boolean);return(0,a.createElement)(s.A.Button,{trigger:["click"],placement:"bottomRight",overlayClassName:"etn-action-dropdown",className:"etn-event-header-dropdown etn-header-status-dropdown",size:m?"large":"middle",arrow:!0,type:"primary",icon:(0,a.createElement)(l.AngleDownIcon,null),onClick:e,disabled:v,loading:d,menu:{items:p}},(0,i.__)("Publish","eventin"))}},94455(e,t,n){n.d(t,{q:()=>a});const a=n(69815).default.div`
	position: fixed;
	bottom: 10px;
	background-color: white;
	z-index: 1000;
	box-shadow:
		0px 4px 24px 0px rgba( 44, 34, 69, 0.1 ),
		0px 1.5px 4px 0px rgba( 44, 34, 69, 0.06 );
	border-radius: 8px;
	max-width: 650px;
	width: 100%;
	padding: 16px 40px;
	height: 76px;
	left: 50%;
	transform: translateX( -50% );
	p {
		font-size: 14px;
		color: #4b4b4b;
		font-weight: 400;
	}

	@media ( max-width: 768px ) {
		display: none;
	}
`},95803(e,t,n){n.d(t,{G:()=>s,O:()=>i});var a=n(27723);const i=["basic","tickets","schedule","advanced"],s={basic:(0,a.__)("Save & next step for your event tickets","eventin"),tickets:(0,a.__)("Save & next step for your event schedule","eventin"),schedule:(0,a.__)("Save & next step for your event advanced","eventin"),advanced:(0,a.__)("Save & publish your event","eventin")}},98901(e,t,n){n.d(t,{k3:()=>i});var a=n(69815);a.default.section`
	display: flex;
	width: 100%;
	background-color: #f3f5f7;
`,a.default.div`
	width: 100%;
	height: max-content;
	background-color: #ffffff;
	padding: 40px 50px;
	border-radius: 12px;
	margin: 40px;
	transition:
		margin 0.3s ease,
		padding 0.3s ease;

	@media ( max-width: 1350px ) {
		margin: 20px;
		padding: 30px 20px;
	}

	@media ( max-width: 991px ) {
		margin: 15px;
		padding: 20px;
	}

	@media ( max-width: 768px ) {
		margin: 10px;
		padding: 15px;
	}
	.etn-section-title {
		font-size: 16px;
		font-weight: 400;
		color: #41454f;
	}
`,a.default.main`
	max-width: 850px;
	transition: all 0.3s ease;
	@media ( max-width: 1350px ) {
		margin: 0 20px;
	}
	@media ( max-width: 991px ) {
		width: 100%;
		margin: 0 20px;
		padding: 0 10px;
	}

	@media ( max-width: 768px ) {
		width: 100%;
		padding: 0 10px;
		margin: 0 10px;
	}
`,a.default.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	flex-wrap: wrap;
`,a.default.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px 16px;
	position: sticky;
	top: 0;
	z-index: 1024;
	@media ( max-width: 1024px ) {
		flex-wrap: wrap;
	}
`;const i=a.default.div`
	max-width: 250px;
	transition: all 0.3s ease;

	@media ( max-width: 768px ) {
		max-width: 200px;
	}
	@media ( max-width: 480px ) {
		max-width: 140px;
	}
`;a.default.button`
	display: flex;
	align-items: center;
	height: 40px;
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
	svg {
		color: #ff69b4;
	}
	&:hover,
	&:active,
	&:focus {
		transform: translateY( -0.2px );
		background: #f9f5ff;
	}
`,a.default.span`
	background: linear-gradient(
		90deg,
		#fc8327 0%,
		#e83aa5 50.5%,
		#3a4ff2 100%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: rgba( 0, 0, 0, 0 );
	background-clip: text;
`,a.default.div`
	display: flex;
	align-items: center;
	gap: 8px;

	@media ( max-width: 768px ) {
		gap: 4px;
	}
`,a.default.div`
	display: flex;
	align-items: center;
	gap: 8px;
`}}]);