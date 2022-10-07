"use strict";(self.webpackChunkhw14=self.webpackChunkhw14||[]).push([[150],{6580:function(e,r,a){a.d(r,{g:function(){return l}});a(2791);var i=a(1087);var s=a.p+"static/media/arrow.9eb5f0989be33713d2dd94c6d875dba5.svg",n=a(5028),o="BackToPackList_back__EFlwy",t=a(184),l=function(){return(0,t.jsx)(i.OL,{to:n.m.PACKS_LIST,children:(0,t.jsxs)("div",{className:o,children:[(0,t.jsx)("img",{src:s,alt:"back"}),(0,t.jsx)("span",{children:"Back to Packs List"})]})})}},5261:function(e,r,a){a.r(r),a.d(r,{default:function(){return N}});var i=a(1413),s=a(885),n=a(2791),o=a(9569),t=a(3710),l=a(1898),c=a(508),d=a(3287),m=a(8254),u=a(3811),p=a(2900),h=a(5473),_=a(5705),f=a(7689),x=a(1087),v=a(7265),j=a(1411),g=a(5776),w={formContainer:"Login_formContainer__jM8Rp",title:"Login_title__SuNUI",recover:"Login_recover__Qtxky",link:"Login_link__geQWG",text:"Login_text__uP+nC",emailError:"Login_emailError__S0CCS",passwordError:"Login_passwordError__mxZwb"},Z=a(9931),P=a(184),b=a(7686),N=function(){var e=(0,n.useState)(!1),r=(0,s.Z)(e,2),a=r[0],N=r[1],y=(0,v.TL)(),E=(0,v.CG)((function(e){return e.login.isLoggedIn})),k=(0,_.TA)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var r={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(r.email="Invalid email address"):r.email="Required",e.password?e.password.length<3&&(r.password="Invalid password"):r.password="Required",r},onSubmit:function(e){y((0,Z.YJ)(e.email,e.password,e.rememberMe)),k.resetForm()}});return E?(0,P.jsx)(f.Fg,{to:"/packs_list/"}):(0,P.jsx)("div",{className:w.wrapper,children:(0,P.jsx)(b,{duration:"2000",children:(0,P.jsxs)("form",{onSubmit:k.handleSubmit,className:w.formContainer,children:[(0,P.jsx)("h2",{className:w.title,children:"Sign in"}),(0,P.jsxs)(l.Z,{variant:"standard",children:[(0,P.jsx)(c.Z,{color:"primary",children:"Email"}),(0,P.jsx)(d.Z,(0,i.Z)({id:"email",type:"email",placeholder:"Email",color:"primary",className:g.Z.input},k.getFieldProps("email")))]}),k.errors.email&&k.touched.email&&(0,P.jsx)("div",{className:w.emailError,children:k.errors.email}),(0,P.jsxs)(l.Z,{variant:"standard",children:[(0,P.jsx)(c.Z,{color:"primary",children:"Password"}),(0,P.jsx)(d.Z,(0,i.Z)({id:"password",type:a?"text":"password",placeholder:"password",color:"primary",className:g.Z.input,endAdornment:(0,P.jsx)(m.Z,{position:"end",children:(0,P.jsx)(u.Z,{onClick:function(){N(!a)},color:"primary",children:a?(0,P.jsx)(o.Z,{}):(0,P.jsx)(t.Z,{})})})},k.getFieldProps("password")))]}),k.errors.password&&k.touched.password&&(0,P.jsx)("div",{className:w.passwordError,children:k.errors.password}),(0,P.jsx)(l.Z,{children:(0,P.jsx)(p.Z,{className:w.input,control:(0,P.jsx)(h.Z,{}),label:"Remember me"})}),(0,P.jsx)("div",{className:w.recover,children:(0,P.jsx)(x.rU,{className:w.link,to:"/recovery",children:"Forgot Password?"})}),(0,P.jsx)(j.Z,{style:{fontFamily:"Montserrat",fontStyle:"normal",fontWeight:500,fontSize:"16px",lineHeight:"20px",letterSpacing:"0.01em"},type:"submit",children:"Sign in"}),(0,P.jsx)("span",{className:w.text,children:"Don`t have an account?"}),(0,P.jsx)(x.rU,{className:w.link,to:"/registration",children:"Sign Up"})]})})})}},3521:function(e,r,a){a.r(r),a.d(r,{default:function(){return Z}});var i=a(1413),s=a(885),n=a(2791),o=a(9569),t=a(3710),l=a(1898),c=a(508),d=a(3287),m=a(8254),u=a(3811),p=a(5705),h=a(7689),_=a(1087),f=a(7265),x=a(1411),v={formContainer:"Registration_formContainer__pxoO2",title:"Registration_title__cAmO-",link:"Registration_link__-XkO6",text:"Registration_text__HgTU5",input:"Registration_input__+KzDN",emailError:"Registration_emailError__4UDVZ",passwordError:"Registration_passwordError__6MxAG",confirmPasswordError:"Registration_confirmPasswordError__9tOYz"},j=a(1059),g=a(184),w=a(7686),Z=function(){var e=(0,f.TL)(),r=(0,f.CG)((function(e){return e.login.isLoggedIn})),a=(0,n.useState)({password:"",showPass:!1}),Z=(0,s.Z)(a,2),P=Z[0],b=Z[1],N=(0,n.useState)({passwordConfirm:"",showPassConfirm:!1}),y=(0,s.Z)(N,2),E=y[0],k=y[1],C=(0,p.TA)({initialValues:{email:"",password:"",confirmPassword:""},validate:function(e){var r={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(r.email="Invalid email address"):r.email="Enter email",e.password?e.password.length<=7&&(r.password="Password must be more than 7 characters..."):r.password="Enter password",e.confirmPassword?e.confirmPassword!==e.password&&(r.confirmPassword="The password and confirmation password do not match"):r.confirmPassword="Repeat  password",r},onSubmit:function(r){e((0,j.D)(r))}}),S=(0,n.useCallback)((function(){b((0,i.Z)((0,i.Z)({},P),{},{showPass:!P.showPass}))}),[P]),L=(0,n.useCallback)((function(){k((0,i.Z)((0,i.Z)({},E),{},{showPassConfirm:!E.showPassConfirm}))}),[E]),A=function(e){e.preventDefault()};return r?(0,g.jsx)(h.Fg,{to:"/login"}):(0,g.jsx)("div",{className:v.wrapper,children:(0,g.jsx)(w,{duration:"2000",children:(0,g.jsxs)("form",{className:v.formContainer,onSubmit:C.handleSubmit,children:[(0,g.jsx)("div",{className:v.title,children:"Sign UP"}),(0,g.jsxs)(l.Z,{variant:"standard",children:[(0,g.jsx)(c.Z,{color:"primary",children:"Email"}),(0,g.jsx)(d.Z,(0,i.Z)({id:"email",type:"email",placeholder:"Email",className:v.input,color:"primary"},C.getFieldProps("email")))]}),C.errors.email&&C.touched.email&&(0,g.jsx)("div",{className:v.emailError,children:C.errors.email}),(0,g.jsxs)(l.Z,{variant:"standard",children:[(0,g.jsx)(c.Z,{color:"primary",children:"Password"}),(0,g.jsx)(d.Z,(0,i.Z)((0,i.Z)({id:"password",type:P.showPass?"text":"password",placeholder:"Password",className:v.input,color:"primary"},C.getFieldProps("password")),{},{autoComplete:"on",endAdornment:(0,g.jsx)(m.Z,{position:"end",children:(0,g.jsx)(u.Z,{onClick:S,onMouseDown:A,color:"primary",children:P.showPass?(0,g.jsx)(o.Z,{}):(0,g.jsx)(t.Z,{})})})}))]}),C.errors.password&&C.touched.password&&(0,g.jsx)("div",{className:v.passwordError,children:C.errors.password}),(0,g.jsxs)(l.Z,{variant:"standard",children:[(0,g.jsx)(c.Z,{color:"primary",children:"Confirm password"}),(0,g.jsx)(d.Z,(0,i.Z)((0,i.Z)({id:"confirmPassword",type:E.showPassConfirm?"text":"password",placeholder:"Confirm password",className:v.input,color:"primary"},C.getFieldProps("confirmPassword")),{},{autoComplete:"on",endAdornment:(0,g.jsx)(m.Z,{position:"end",children:(0,g.jsx)(u.Z,{onClick:L,onMouseDown:A,color:"primary",children:E.showPassConfirm?(0,g.jsx)(o.Z,{}):(0,g.jsx)(t.Z,{})})})}))]}),C.errors.confirmPassword&&C.touched.confirmPassword&&(0,g.jsx)("div",{className:v.confirmPasswordError,children:C.errors.confirmPassword}),(0,g.jsx)(x.Z,{style:{fontFamily:"Montserrat",fontStyle:"normal",fontWeight:500,fontSize:"16px",lineHeight:"20px",letterSpacing:"0.01em"},type:"submit",children:"Sign Up"}),(0,g.jsx)("span",{className:v.text,children:"Already have an account?"}),(0,g.jsx)(_.rU,{className:v.link,to:"/login",children:"Sign In"})]})})})}},5347:function(e,r,a){a.r(r),a.d(r,{default:function(){return C}});var i=a(2791),s=a(7689),n=a(5754),o=a(8440);var t=a.p+"static/media/photo.90ad4ef14262e7bebbb5e1c2b2223f5a.svg",l=a(7265),c=a(6580),d=a(9931),m=a(885),u=a(1898),p=a(508),h=a(3287);var _=a.p+"static/media/edit.a169cd90c950b39da314c5bb65c8ed51.svg",f="EditableProfileName_editNameBlock__3jrhf",x="EditableProfileName_editNameInput__A9nl4",v="EditableProfileName_saveButton__YJPdA",j="EditableProfileName_error__cwSnd",g="EditableProfileName_nameBlock__xhEnH",w="EditableProfileName_name__cMp0C",Z="EditableProfileName_onEditModeButton__OVqTT",P=a(184),b=function(e){var r=e.profile,a=e.updateProfile,s=(0,i.useState)(!1),n=(0,m.Z)(s,2),o=n[0],t=n[1],l=(0,i.useState)(r.name),c=(0,m.Z)(l,2),d=c[0],b=c[1],N=(0,i.useState)(null),y=(0,m.Z)(N,2),E=y[0],k=y[1],C=function(){""!==d.trim()?(a({name:d}),t(!1)):k("Name is required")};return(0,P.jsx)(P.Fragment,{children:o?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)("div",{className:f,children:[(0,P.jsxs)(u.Z,{variant:"standard",className:x,children:[(0,P.jsx)(p.Z,{color:"primary",children:"Nickname"}),(0,P.jsx)(h.Z,{onKeyDown:function(e){"Enter"===e.key&&C()},id:"name",placeholder:"Nickname",value:d,onChange:function(e){k(null),b(e.currentTarget.value)},color:"primary"})]}),(0,P.jsx)("button",{className:v,onClick:C,disabled:!!E,children:"SAVE"})]}),E&&(0,P.jsx)("div",{className:j,children:E})]}):(0,P.jsxs)("div",{className:g,children:[(0,P.jsx)("h4",{className:w,children:r.name}),(0,P.jsx)("button",{className:Z,onClick:function(){t(!0)},children:(0,P.jsx)("img",{src:_,alt:"edit"})})]})})},N={container:"Profile_container__sWXjP",title:"Profile_title__+RmOC",avatarBlock:"Profile_avatarBlock__Po7nu",avatar:"Profile_avatar__j-pSG",holder:"Profile_holder__d19gV",changeAvatarButton:"Profile_changeAvatarButton__uPLl-",email:"Profile_email__+5Y8q",logoutButtonBlock:"Profile_logoutButtonBlock__IEL0c",logoutButton:"Profile_logoutButton__bY8jT"},y=a(8555),E=a(4075),k=a(7686),C=function(){var e=(0,l.TL)(),r=(0,l.CG)((function(e){return e.profile.profile}));return(0,l.CG)((function(e){return e.login.isLoggedIn}))?(0,P.jsxs)("div",{className:N.wrapper,children:[(0,P.jsx)(E,{left:!0,duration:"2000",children:(0,P.jsx)(c.g,{})}),(0,P.jsx)(k,{duration:"2000",children:(0,P.jsxs)("div",{className:N.container,children:[(0,P.jsx)("h3",{className:N.title,children:"Personal Information"}),(0,P.jsx)("div",{className:N.avatarBlock,children:(0,P.jsxs)("div",{className:N.avatar,children:[(0,P.jsx)("div",{className:N.holder,children:(0,P.jsx)("img",{src:n,alt:"avatar"})}),(0,P.jsx)("button",{className:N.changeAvatarButton,children:(0,P.jsx)("img",{src:t,alt:"changePhoto"})})]})}),(0,P.jsx)(b,{profile:r,updateProfile:function(r){e((0,y.UA)(r))}}),(0,P.jsx)("span",{className:N.email,children:r.email}),(0,P.jsx)("div",{className:N.logoutButtonBlock,children:(0,P.jsxs)("button",{className:N.logoutButton,onClick:function(){e((0,d.$F)())},children:[(0,P.jsx)("img",{src:o.Z,alt:"logout"}),"Log out"]})})]})})]}):(0,P.jsx)(s.Fg,{to:"/login"})}},3710:function(e,r,a){var i=a(1245),s=a(184);r.Z=(0,i.Z)((0,s.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility")},9569:function(e,r,a){var i=a(1245),s=a(184);r.Z=(0,i.Z)((0,s.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff")},8254:function(e,r,a){a.d(r,{Z:function(){return Z}});var i=a(4942),s=a(3366),n=a(7462),o=a(2791),t=a(8182),l=a(4419),c=a(9853),d=a(4565),m=a(1211),u=a(529),p=a(6863),h=a(1217);function _(e){return(0,h.Z)("MuiInputAdornment",e)}var f,x=(0,a(5878).Z)("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),v=a(5873),j=a(184),g=["children","className","component","disablePointerEvents","disableTypography","position","variant"],w=(0,p.ZP)("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:function(e,r){var a=e.ownerState;return[r.root,r["position".concat((0,c.Z)(a.position))],!0===a.disablePointerEvents&&r.disablePointerEvents,r[a.variant]]}})((function(e){var r=e.theme,a=e.ownerState;return(0,n.Z)({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(r.vars||r).palette.action.active},"filled"===a.variant&&(0,i.Z)({},"&.".concat(x.positionStart,"&:not(.").concat(x.hiddenLabel,")"),{marginTop:16}),"start"===a.position&&{marginRight:8},"end"===a.position&&{marginLeft:8},!0===a.disablePointerEvents&&{pointerEvents:"none"})})),Z=o.forwardRef((function(e,r){var a=(0,v.Z)({props:e,name:"MuiInputAdornment"}),i=a.children,p=a.className,h=a.component,x=void 0===h?"div":h,Z=a.disablePointerEvents,P=void 0!==Z&&Z,b=a.disableTypography,N=void 0!==b&&b,y=a.position,E=a.variant,k=(0,s.Z)(a,g),C=(0,u.Z)()||{},S=E;E&&C.variant,C&&!S&&(S=C.variant);var L=(0,n.Z)({},a,{hiddenLabel:C.hiddenLabel,size:C.size,disablePointerEvents:P,position:y,variant:S}),A=function(e){var r=e.classes,a=e.disablePointerEvents,i=e.hiddenLabel,s=e.position,n=e.size,o=e.variant,t={root:["root",a&&"disablePointerEvents",s&&"position".concat((0,c.Z)(s)),o,i&&"hiddenLabel",n&&"size".concat((0,c.Z)(n))]};return(0,l.Z)(t,_,r)}(L);return(0,j.jsx)(m.Z.Provider,{value:null,children:(0,j.jsx)(w,(0,n.Z)({as:x,ownerState:L,className:(0,t.Z)(A.root,p),ref:r},k,{children:"string"!==typeof i||N?(0,j.jsxs)(o.Fragment,{children:["start"===y?f||(f=(0,j.jsx)("span",{className:"notranslate",children:"\u200b"})):null,i]}):(0,j.jsx)(d.Z,{color:"text.secondary",children:i})}))})}))},5776:function(e,r){r.Z={formContainer:"Recovery_formContainer__yUXDe",title:"Recovery_title__TLWo8",input:"Recovery_input__6sHYA",instructionsText:"Recovery_instructionsText__sQEEB",loginMessage:"Recovery_loginMessage__4084D",link:"Recovery_link__82ajD",btn:"Recovery_btn__-6Fox",error:"Recovery_error__FMzDx",inputBlock:"Recovery_inputBlock__aj+2d"}}}]);
//# sourceMappingURL=Registration.c17aea77.chunk.js.map