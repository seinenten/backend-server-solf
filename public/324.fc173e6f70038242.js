"use strict";(self.webpackChunksolf=self.webpackChunksolf||[]).push([[324],{324:(z,m,s)=>{s.r(m),s.d(m,{AuthModule:()=>R});var u=s(6895),r=s(4006),l=s(9197),b=s(5226),d=s.n(b),o=s(4650),h=s(6046);let p=(()=>{class e{constructor(){this.emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",this.passPattern=/(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{5,}/}camposIguales(t,n){return a=>{const c=a.get(t)?.value,g=a.get(n)?.value;return c!==g?(a.get(n)?.setErrors({noIguales:!0}),{noIguales:!0}):(a.get(n)?.setErrors(null),null)}}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var _=s(1005),C=s(4004),Z=s(2340),x=s(529);let v=(()=>{class e{constructor(t){this.http=t,this.baseUrl=Z.N.base_url}validate(t){return this.http.get(`${this.baseUrl}/usuarios?q=${t.value}`).pipe((0,_.g)(3e3),(0,C.U)(a=>0===a.length?null:{emailTomado:!0}))}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(x.eN))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var f=s(3360);const M=["googleBtn"];function P(e,i){1&e&&(o.TgZ(0,"span",33),o._uU(1," Debe de contener minimo 3 letras "),o.qZA())}function O(e,i){1&e&&(o.TgZ(0,"span",33),o._uU(1," Debe de contener minimo 3 letras "),o.qZA())}function k(e,i){1&e&&(o.TgZ(0,"span",33),o._uU(1," Debe de contener minimo 3 letras "),o.qZA())}function A(e,i){if(1&e&&(o.TgZ(0,"span",33),o._uU(1),o.qZA()),2&e){const t=o.oxw();o.xp6(1),o.hij(" ",t.emailErrorMsg," ")}}function U(e,i){if(1&e&&(o.TgZ(0,"span",33),o._uU(1),o.qZA()),2&e){const t=o.oxw();o.xp6(1),o.hij(" ",t.passErrorMsg," ")}}function T(e,i){1&e&&(o.TgZ(0,"span",33),o._uU(1," Las contrase\xf1as deben de ser iguales "),o.qZA())}function y(e,i){1&e&&(o.TgZ(0,"span",33),o._uU(1," Debe de aceptar los terminos "),o.qZA())}let q=(()=>{class e{constructor(t,n,a,c,g,J,Y){this.fb=t,this.snackbar=n,this.vS=a,this.emailValidator=c,this.router=g,this.usuarioService=J,this.ngZone=Y,this.formSubmitted=!1,this.miFormulario=this.fb.group({nombre:["",[r.kI.required,r.kI.minLength(3)]],apellidoP:["",[r.kI.required,r.kI.minLength(3)]],apellidoM:["",[r.kI.required,r.kI.minLength(3)]],password:["",[r.kI.required,r.kI.pattern(this.vS.passPattern)]],password2:["",[r.kI.required]],email:["",[r.kI.required,r.kI.pattern(this.vS.emailPattern)]],condiciones:[!1,r.kI.requiredTrue]},{validators:[this.vS.camposIguales("password","password2")]}),this.inicializador={nombre:"test1",apellidoP:"test1",apellidoM:"test1",password:"Rosa123",password2:"Rosa123",email:"test1@gmail.com",condiciones:!1}}ngAfterViewInit(){this.googleInit()}googleInit(){google.accounts.id.initialize({client_id:"597820303932-nc7dmt1ceaad8p4s65h6sjas6daqn6lc.apps.googleusercontent.com",callback:t=>this.handleCredentialResponse(t)}),google.accounts.id.renderButton(this.googleBtn.nativeElement,{theme:"outline",size:"large"})}handleCredentialResponse(t){this.usuarioService.loginGoogle(t.credential).subscribe(n=>{this.ngZone.run(()=>{this.router.navigateByUrl("gestor/inicio")})})}ngOnInit(){this.miFormulario.reset({...this.inicializador})}get emailErrorMsg(){const t=this.miFormulario.get("email")?.errors;return t?.required?"El correo es obligatorio":t?.pattern?"No es un formato de correo valido":t?.emailTomado?"El correo electronico ya existe":""}get passErrorMsg(){const t=this.miFormulario.get("password")?.errors;return t?.required?"La contrase\xf1a es obligatoria":t?.pattern?"La contrase\xf1a debe de ser mayor a 5 caracteres. tener mayusculas, minusculas y numeros":""}campoNoEsValido(t){return this.miFormulario.controls[t]?.errors&&this.miFormulario.controls[t].touched}guardar(){if(this.formSubmitted=!0,this.miFormulario.invalid)return void this.miFormulario.markAllAsTouched();const t={...this.miFormulario.value};delete t.password2,delete t.condiciones,console.log(t),this.usuarioService.crearUsuario(t).subscribe({next:()=>{this.router.navigateByUrl("gestor/inicio")},error:n=>{d().fire("Error",n.error.msg,"error")}}),this.miFormulario.reset()}mostrarSnackbar(t){this.snackbar.open(t,"ok!",{duration:5e3,panelClass:["blue-snackbar"]})}aceptaTerminos(){return!this.miFormulario.get("condiciones")?.value&&this.formSubmitted}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(r.qu),o.Y36(h.ux),o.Y36(p),o.Y36(v),o.Y36(l.F0),o.Y36(f.i),o.Y36(o.R0b))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-registro"]],viewQuery:function(t,n){if(1&t&&o.Gf(M,5),2&t){let a;o.iGM(a=o.CRH())&&(n.googleBtn=a.first)}},decls:79,vars:9,consts:[[1,"container"],[1,"row","px-3"],[1,"col-lg-10","col-xl-9","card","flex-row","mx-auto","px-0"],[1,"img-left","d-none","d-md-flex"],[1,"card-body"],[1,"title","text-center","mt-4"],["autocomplete","off",1,"form-box","px-3",3,"formGroup","ngSubmit"],[1,"form-input"],[1,"fa","fa-user"],["type","text","formControlName","nombre","placeholder","Nombre","tabindex","10"],["class","form-text text-danger",4,"ngIf"],[1,"fa-input-text"],["type","text","formControlName","apellidoP","placeholder","Apellido Paterno","tabindex","10"],["type","text","formControlName","apellidoM","placeholder","Apellido Materno","tabindex","10"],[1,"fa","fa-envelope-o"],["type","email","formControlName","email","placeholder","Correo","tabindex","10"],[1,"fa","fa-key"],["type","password","formControlName","password","placeholder","Contrase\xf1a"],["type","password","formControlName","password2","placeholder","Confirmar la contrase\xf1a"],[1,"mb-3"],[1,"custom-control","custom-checkbox"],["type","checkbox","id","cb1","formControlName","condiciones",1,"custom-control-input"],["for","cb1",1,"custom-control-label"],["type","submit",1,"btn","btn-block","text-uppercase",3,"disabled"],[1,"text-center","mb-3"],[1,"row","mb-3"],[1,"col-4"],[1,"btn","btn-block","btn-social","btn-google"],["googleBtn",""],[1,"my-4"],[1,"text-center","mb-2"],["routerLink","./login",1,"register-link"],[1,"cursor"],[1,"form-text","text-danger"]],template:function(t,n){1&t&&(o._UZ(0,"br")(1,"br"),o.TgZ(2,"div",0)(3,"div",1)(4,"div",2),o._UZ(5,"div",3),o.TgZ(6,"div",4)(7,"h2",5),o._uU(8," Registro "),o.qZA(),o.TgZ(9,"form",6),o.NdJ("ngSubmit",function(){return n.guardar()}),o.TgZ(10,"label"),o._uU(11,"Nombre"),o.qZA(),o.TgZ(12,"div",7)(13,"span"),o._UZ(14,"i",8),o.qZA(),o._UZ(15,"input",9),o.qZA(),o.YNc(16,P,2,0,"span",10),o.TgZ(17,"label"),o._uU(18,"Apellido Paterno"),o.qZA(),o.TgZ(19,"div",7)(20,"span"),o._UZ(21,"i",11),o.qZA(),o._UZ(22,"input",12),o.qZA(),o.YNc(23,O,2,0,"span",10),o.TgZ(24,"label"),o._uU(25,"Apellido Materno"),o.qZA(),o.TgZ(26,"div",7)(27,"span"),o._UZ(28,"i",11),o.qZA(),o._UZ(29,"input",13),o.qZA(),o.YNc(30,k,2,0,"span",10),o.TgZ(31,"label"),o._uU(32,"Correo"),o.qZA(),o.TgZ(33,"div",7)(34,"span"),o._UZ(35,"i",14),o.qZA(),o._UZ(36,"input",15),o.qZA(),o.YNc(37,A,2,1,"span",10),o.TgZ(38,"label"),o._uU(39,"Contrase\xf1a"),o.qZA(),o.TgZ(40,"div",7)(41,"span"),o._UZ(42,"i",16),o.qZA(),o._UZ(43,"input",17),o.qZA(),o.YNc(44,U,2,1,"span",10),o.TgZ(45,"label"),o._uU(46,"Repite la Contrase\xf1a"),o.qZA(),o.TgZ(47,"div",7)(48,"span"),o._UZ(49,"i",16),o.qZA(),o._UZ(50,"input",18),o.qZA(),o.YNc(51,T,2,0,"span",10),o.TgZ(52,"div",19)(53,"div",20),o._UZ(54,"input",21),o.TgZ(55,"label",22),o._uU(56,"Aceptar Terminos y Condiciones"),o.qZA(),o.YNc(57,y,2,0,"span",10),o.qZA()(),o.TgZ(58,"div",19)(59,"button",23),o._uU(60," Registrame "),o.qZA()(),o.TgZ(61,"div",24),o._uU(62," O registrate con "),o.qZA(),o.TgZ(63,"div",25)(64,"div",26)(65,"a",27),o._uU(66," google "),o.qZA(),o._UZ(67,"div",null,28),o.qZA()(),o._UZ(69,"hr",29),o.TgZ(70,"div",30)(71,"p"),o._uU(72,"\xbfYa tienes cuenta?"),o.TgZ(73,"a",31)(74,"b",32),o._uU(75,"Iniciar Sesion"),o.qZA()()()()()()()()(),o._UZ(76,"br")(77,"br")(78,"br")),2&t&&(o.xp6(9),o.Q6J("formGroup",n.miFormulario),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("nombre")),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("apellidoP")),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("apellidoM")),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("email")),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("password")),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("password2")),o.xp6(6),o.Q6J("ngIf",n.aceptaTerminos()),o.xp6(2),o.Q6J("disabled",n.miFormulario.pending))},dependencies:[u.O5,l.yS,r._Y,r.Fj,r.Wl,r.JJ,r.JL,r.sg,r.u],styles:["body[_ngcontent-%COMP%]{height:100vh;background:#0062E6!important;display:flex;flex-direction:column;align-items:center;justify-content:center}.card[_ngcontent-%COMP%]{overflow:hidden;border:0!important;border-radius:20px!important;box-shadow:0 .5rem 1rem #0000001a}.img-left[_ngcontent-%COMP%]{width:45%;background:url(https://static01.nyt.com/images/2020/02/26/multimedia/26JimenezES-1/26JimenezES-1-mediumSquareAt3X.jpg) center;background-size:cover}.card-body[_ngcontent-%COMP%]{padding:2rem}.title[_ngcontent-%COMP%]{margin-bottom:2rem}.form-input[_ngcontent-%COMP%]{position:relative}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:45px;padding-left:40px;margin-bottom:20px;box-sizing:border-box;box-shadow:none;border:1px solid #00000020;border-radius:50px;outline:none;background:transparent}.form-input[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:10px;padding-left:15px;color:#521a49}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#000;padding-left:0}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid{border:2px solid #521a49}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus::placeholder{color:#454b69}.custom-checkbox[_ngcontent-%COMP%]   .custom-control-input[_ngcontent-%COMP%]:checked ~ .custom-control-label[_ngcontent-%COMP%]:before{background-color:#007bff!important;border:0px}.form-box[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]{margin-top:10px;border:none;cursor:pointer;border-radius:50px;background:#007bff;color:#fff;font-size:90%;font-weight:700;letter-spacing:.1rem;transition:.5s;padding:12px}.form-box[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover{background:#0069d9}.forget-link[_ngcontent-%COMP%], .register-link[_ngcontent-%COMP%]{color:#007bff;font-weight:700}.forget-link[_ngcontent-%COMP%]:hover, .register-link[_ngcontent-%COMP%]:hover{color:#0069d9;text-decoration:none}.form-box[_ngcontent-%COMP%]   .btn-social[_ngcontent-%COMP%]{color:#fff!important;border:0;font-weight:700}.form-box[_ngcontent-%COMP%]   .btn-facebook[_ngcontent-%COMP%]{background:#4866a8}.form-box[_ngcontent-%COMP%]   .btn-google[_ngcontent-%COMP%]{background:#da3f34}.form-box[_ngcontent-%COMP%]   .btn-twitter[_ngcontent-%COMP%]{background:#33ccff}.form-box[_ngcontent-%COMP%]   .btn-facebook[_ngcontent-%COMP%]:hover{background:#3d578f}.form-box[_ngcontent-%COMP%]   .btn-google[_ngcontent-%COMP%]:hover{background:#bf3b31}.form-box[_ngcontent-%COMP%]   .btn-twitter[_ngcontent-%COMP%]:hover{background:#2eb7e5}.blue-snackbar[_ngcontent-%COMP%]{background:#2196F3}"]}),e})();const w=["googleBtn"];function I(e,i){if(1&e&&(o.TgZ(0,"span",28),o._uU(1),o.qZA()),2&e){const t=o.oxw();o.xp6(1),o.hij(" ",t.emailErrorMsg," ")}}function F(e,i){1&e&&(o.TgZ(0,"span",28),o._uU(1," la contrase\xf1a es requerida "),o.qZA())}const S=[{path:"",children:[{path:"login",component:(()=>{class e{constructor(t,n,a,c,g){this.router=t,this.fb=n,this.vs=a,this.usuarioService=c,this.ngZone=g,this.formSubmitted=!1,this.miFormulario=this.fb.group({email:[localStorage.getItem("email")||"",[r.kI.required,r.kI.pattern(this.vs.emailPattern)]],password:["",r.kI.required],remember:[!1]})}ngAfterViewInit(){this.googleInit()}googleInit(){google.accounts.id.initialize({client_id:"597820303932-nc7dmt1ceaad8p4s65h6sjas6daqn6lc.apps.googleusercontent.com",callback:t=>this.handleCredentialResponse(t)}),google.accounts.id.renderButton(this.googleBtn.nativeElement,{theme:"outline",size:"medium"})}handleCredentialResponse(t){this.usuarioService.loginGoogle(t.credential).subscribe(n=>{this.ngZone.run(()=>{this.router.navigateByUrl("gestor/inicio")})})}ngOnInit(){}get emailErrorMsg(){const t=this.miFormulario.get("email")?.errors;return t?.required?"El correo es obligatorio":t?.pattern?"No es un formato de correo valido":""}campoNoEsValido(t){return this.miFormulario.controls[t]?.errors&&this.miFormulario.controls[t].touched}login(){this.usuarioService.login(this.miFormulario.value).subscribe({next:()=>{this.miFormulario.get("remember")?.value?localStorage.setItem("email",this.miFormulario.get("email")?.value):localStorage.removeItem("email"),this.router.navigateByUrl("gestor/inicio")},error:t=>{d().fire("Error",t.error.msg,"error")}})}}return e.\u0275fac=function(t){return new(t||e)(o.Y36(l.F0),o.Y36(r.qu),o.Y36(p),o.Y36(f.i),o.Y36(o.R0b))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-login"]],viewQuery:function(t,n){if(1&t&&o.Gf(w,5),2&t){let a;o.iGM(a=o.CRH())&&(n.googleBtn=a.first)}},decls:51,vars:4,consts:[[1,"container"],[1,"row","px-3"],[1,"col-lg-10","col-xl-9","card","flex-row","mx-auto","px-0"],[1,"img-left","d-none","d-md-flex"],[1,"card-body"],[1,"title","text-center","mt-4"],["autocomplete","off",1,"form-box","px-3",3,"formGroup","ngSubmit"],[1,"form-input"],[1,"fa","fa-envelope-o"],["type","email","placeholder","Usuario","formControlName","email"],["class","form-text text-danger",4,"ngIf"],[1,"fa","fa-key"],["type","password","placeholder","Contrse\xf1a","formControlName","password"],[1,"mb-3"],[1,"custom-control","custom-checkbox"],["type","checkbox","formControlName","remember","id","cb1",1,"custom-control-input"],["for","cb1",1,"custom-control-label"],["type","submit",1,"btn","btn-block","text-uppercase",3,"disabled"],[1,"text-right"],[1,"forget-link"],[1,"text-center","mb-3"],[1,"row","mb-3"],[1,"col-4"],[1,"btn","btn-block","btn-social","btn-google"],["googleBtn",""],[1,"my-4"],[1,"text-center","mb-2"],["routerLink","./registro",1,"register-link"],[1,"form-text","text-danger"]],template:function(t,n){1&t&&(o._UZ(0,"br")(1,"br"),o.TgZ(2,"div",0)(3,"div",1)(4,"div",2),o._UZ(5,"div",3),o.TgZ(6,"div",4)(7,"h4",5),o._uU(8," Inicio de Sesion "),o.qZA(),o.TgZ(9,"form",6),o.NdJ("ngSubmit",function(){return n.login()}),o.TgZ(10,"label"),o._uU(11,"Email"),o.qZA(),o.TgZ(12,"div",7)(13,"span"),o._UZ(14,"i",8),o.qZA(),o._UZ(15,"input",9),o.qZA(),o.YNc(16,I,2,1,"span",10),o.TgZ(17,"label"),o._uU(18,"contrase\xf1a"),o.qZA(),o.TgZ(19,"div",7)(20,"span"),o._UZ(21,"i",11),o.qZA(),o._UZ(22,"input",12),o.qZA(),o.YNc(23,F,2,0,"span",10),o.TgZ(24,"div",13)(25,"div",14),o._UZ(26,"input",15),o.TgZ(27,"label",16),o._uU(28,"Recuerdame"),o.qZA()()(),o.TgZ(29,"div",13)(30,"button",17),o._uU(31," Iniciar Sesion "),o.qZA()(),o.TgZ(32,"div",18)(33,"a",19),o._uU(34," Olvide mi contrase\xf1a? "),o.qZA()(),o.TgZ(35,"div",20),o._uU(36," O inicia sesion con "),o.qZA(),o.TgZ(37,"div",21)(38,"div",22)(39,"a",23),o._uU(40," google "),o.qZA(),o._UZ(41,"div",null,24),o.qZA()(),o._UZ(43,"hr",25),o.TgZ(44,"div",26),o._uU(45," No tienes cuenta? "),o.TgZ(46,"a",27),o._uU(47," Registrate "),o.qZA()()()()()()(),o._UZ(48,"br")(49,"br")(50,"br")),2&t&&(o.xp6(9),o.Q6J("formGroup",n.miFormulario),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("email")),o.xp6(7),o.Q6J("ngIf",n.campoNoEsValido("password")),o.xp6(7),o.Q6J("disabled",n.miFormulario.invalid))},dependencies:[u.O5,l.yS,r._Y,r.Fj,r.Wl,r.JJ,r.JL,r.sg,r.u],styles:["body[_ngcontent-%COMP%]{height:100vh;background:#0062E6!important;display:flex;flex-direction:column;align-items:center;justify-content:center}.card[_ngcontent-%COMP%]{overflow:hidden;border:0!important;border-radius:20px!important;box-shadow:0 .5rem 1rem #0000001a}.img-left[_ngcontent-%COMP%]{width:45%;background:url(https://static01.nyt.com/images/2020/02/26/multimedia/26JimenezES-1/26JimenezES-1-mediumSquareAt3X.jpg) center;background-size:cover}.card-body[_ngcontent-%COMP%]{padding:2rem}.title[_ngcontent-%COMP%]{margin-bottom:2rem}.form-input[_ngcontent-%COMP%]{position:relative}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:45px;padding-left:40px;margin-bottom:20px;box-sizing:border-box;box-shadow:none;border:1px solid #00000020;border-radius:50px;outline:none;background:transparent}.form-input[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:absolute;top:10px;padding-left:15px;color:#007bff}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#000;padding-left:0}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, .form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid{border:2px solid #007bff}.form-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus::placeholder{color:#454b69}.custom-checkbox[_ngcontent-%COMP%]   .custom-control-input[_ngcontent-%COMP%]:checked ~ .custom-control-label[_ngcontent-%COMP%]:before{background-color:#007bff!important;border:0px}.form-box[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]{margin-top:10px;border:none;cursor:pointer;border-radius:50px;background:#007bff;color:#fff;font-size:90%;font-weight:700;letter-spacing:.1rem;transition:.5s;padding:12px}.form-box[_ngcontent-%COMP%]   button[type=submit][_ngcontent-%COMP%]:hover{background:#0069d9}.forget-link[_ngcontent-%COMP%], .register-link[_ngcontent-%COMP%]{color:#007bff;font-weight:700}.forget-link[_ngcontent-%COMP%]:hover, .register-link[_ngcontent-%COMP%]:hover{color:#0069d9;text-decoration:none}.form-box[_ngcontent-%COMP%]   .btn-social[_ngcontent-%COMP%]{color:#fff!important;border:0;font-weight:700}.form-box[_ngcontent-%COMP%]   .btn-facebook[_ngcontent-%COMP%]{background:#4866a8}.form-box[_ngcontent-%COMP%]   .btn-google[_ngcontent-%COMP%]{background:#da3f34}.form-box[_ngcontent-%COMP%]   .btn-twitter[_ngcontent-%COMP%]{background:#33ccff}.form-box[_ngcontent-%COMP%]   .btn-facebook[_ngcontent-%COMP%]:hover{background:#3d578f}.form-box[_ngcontent-%COMP%]   .btn-google[_ngcontent-%COMP%]:hover{background:#bf3b31}.form-box[_ngcontent-%COMP%]   .btn-twitter[_ngcontent-%COMP%]:hover{background:#2eb7e5}"]}),e})()},{path:"registro",component:q},{path:"**",redirectTo:"login"}]}];let N=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[l.Bz.forChild(S),l.Bz]}),e})();var E=s(7009);let R=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[u.ez,N,r.UX,E.q]}),e})()}}]);