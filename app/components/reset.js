import React from 'react';
import { Link } from 'react-router'
import configObject from '../config/app'
import axios from 'axios'
import CircularProgress from 'material-ui/CircularProgress'

class Reset extends React.Component {
   constructor(){
      super()
      this.state = {
         errorMessage:'',
         email:'',
         successMessage: "",
         progress:false
      }
   }
   reset(e){
      e.preventDefault()
      this.setProgress(true)
      let postData = {email:this.state.email}
      axios.post(configObject.frontendServerURL+"/user/ResetPassword",postData).then(function(data){
         this.setProgress(false)
         this.state.email = ''
         this.state.successMessage = "We have sent you an email with a password reset link. Please check your spam (just in case)."
         this.state['errorMessage'] = ''
         this.setState(this.state)
      }.bind(this),function(err){
         this.setProgress(false)
         this.state['errorMessage'] = 'Invalid Email, please try again.'
         if(err.response == undefined){
            this.state['errorMessage'] = "Sorry, we currently cannot process your request, please try again later."
         }
         this.state.email = ''
         this.setState(this.state)
      }.bind(this))
   }
   changeHandler(which,e){
      this.state[which] = e.target.value
      this.setState(this.state)
   }
   setProgress(which){
      this.state.progress = which
      this.setState(this.state)
   }
   render() {
      return (
         <div>
            <div className={this.state.progress ? 'loader':'hide'}>
               <CircularProgress color="#4E8EF7" size={50} thickness={6} />
            </div>
          	<div id="login" className={!this.state.progress ? '':'hide'}>
               <div id="image">
                  <img className="logo" src="./app/assets/images/CbLogoIcon.png"/>
               </div>
               <div id="headLine">
                  <h3 className="tacenter hfont">Reset your password.</h3>
               </div>
               <div id="box">
                  <h5 className="tacenter bfont">Enter your email and we'll reset the password for you.</h5>
               </div>
         		<div className="loginbox">
                  <h5 className="tacenter red">{ this.state.errorMessage }</h5>
                  <h5 className="tacenter green">{ this.state.successMessage }</h5>
                  <h4 className={!this.state.successMessage == '' ? 'tacenter':'hide'}><Link to="/login"><a href="#" className="forgotpw">Go to login</a></Link> </h4>
                  <form onSubmit={this.reset.bind(this)} className={this.state.successMessage == '' ? '':'hide'}>
            			<input type="email" value={this.state.email} onChange={this.changeHandler.bind(this,'email')} className="loginInput from-control" placeholder="Email." disabled={this.state.successReset} required/>
            			<button className="loginbtn" type="submit"> Reset Password </button>
                  </form>
                  <Link to="/login" className={this.state.successMessage == '' ? '':'hide'}><a href="#" className="forgotpw fl">Login.</a></Link>
                  <Link to="/signup" className={this.state.successMessage == '' ? '':'hide'}><a href="#" className="forgotpw fr"><span class="blackColor">Dont have an account?</span> Create one.</a></Link>
         		</div>
         	</div>
         </div>
      );
   }
}

export default Reset;