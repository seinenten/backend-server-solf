"use strict";(self.webpackChunksolf=self.webpackChunksolf||[]).push([[592],{7716:(c,l,r)=>{r.d(l,{u:()=>a});var o=r(4004),h=r(2340),i=r(4650),p=r(529);let a=(()=>{class u{constructor(t){this.http=t,this.baseUrl=h.N.base_url}get token(){return localStorage.getItem("token")||""}get headers(){return{headers:{"x-token":this.token}}}getEquipos(){return this.http.get(`${this.baseUrl}/equipos`,this.headers).pipe((0,o.U)(e=>e.equipos))}getEquiposStatusTrue(){return this.http.get(`${this.baseUrl}/equipos/statusTrue`,this.headers).pipe((0,o.U)(e=>e.equipos))}getEquiposStatusFalse(){return this.http.get(`${this.baseUrl}/equipos/statusFalse`,this.headers).pipe((0,o.U)(e=>e.equipos))}smallgetEquipos(){return this.http.get(`${this.baseUrl}/equipos?&_limite=3`,this.headers).pipe((0,o.U)(e=>e.equipos))}getEquipoPorId(t){return this.http.get(`${this.baseUrl}/equipos/${t}`,this.headers).pipe((0,o.U)(n=>n.equipo))}getEquipoPorLiga(t){return this.http.get(`${this.baseUrl}/equipos/liga/${t}`,this.headers).pipe((0,o.U)(n=>n.equipos))}agregarEquipo(t){return this.http.post(`${this.baseUrl}/equipos`,t,this.headers)}actualizarEquipo(t){return this.http.put(`${this.baseUrl}/equipos/${t._id}`,t,this.headers)}desactivarEquipo(t){return this.http.put(`${this.baseUrl}/equipos/desactivar/${t._id}`,{status:!1},this.headers)}activarEquipo(t){return this.http.put(`${this.baseUrl}/equipos/desactivar/${t._id}`,{status:!0},this.headers)}}return u.\u0275fac=function(t){return new(t||u)(i.LFG(p.eN))},u.\u0275prov=i.Yz7({token:u,factory:u.\u0275fac,providedIn:"root"}),u})()},3576:(c,l,r)=>{r.d(l,{k:()=>p});var o=r(2340),h=r(4650),i=r(529);let p=(()=>{class a{constructor(s){this.http=s,this.baseUrl=o.N.base_url}get token(){return localStorage.getItem("token")||""}get headers(){return{headers:{"x-token":this.token}}}copiBD(){return this.http.get(`${this.baseUrl}/upload/copia`,this.headers)}respaldoBD(){return this.http.get(`${this.baseUrl}/upload/restaurar`,this.headers)}}return a.\u0275fac=function(s){return new(s||a)(h.LFG(i.eN))},a.\u0275prov=h.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a})()},2797:(c,l,r)=>{r.d(l,{o:()=>h});var o=r(4650);let h=(()=>{class i{constructor(){this.emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",this.passPattern=/(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{5,}/,this.nombresPattern="^[A-Z\xe0-\xfc\xff\xf1\xd1][a-z\xe0-\xfc\xff\xf1\xd1]+ *[A-Za-z\xe0-\xfc\xff\xf1\xd1]+ *[A-Za-z\xe0-\xfc\xff\xf1\xd1]+$",this.equipoPattern="^[A-Z][a-z]+$",this.curpPattern=/^([A-Z\xd1][AEIOUX\xc1\xc9\xcd\xd3\xda][A-Z\xd1]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/}camposIguales(a,u){return s=>{const t=s.get(a)?.value,e=s.get(u)?.value;return t!==e?(s.get(u)?.setErrors({noIguales:!0}),{noIguales:!0}):(s.get(u)?.setErrors(null),null)}}}return i.\u0275fac=function(a){return new(a||i)},i.\u0275prov=o.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()}}]);