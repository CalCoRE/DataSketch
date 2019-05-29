using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DataSketch.Models;
using System.Threading.Tasks;
using DataSketch.DAL;
using DataSketch.BAL;
using log4net;
using System.Net.Mail;
using System.IO;
using System.Configuration;

namespace DataSketch.Web.Controllers
{
    public class AccountController : Controller
    {
        private ILog logger = log4net.LogManager.GetLogger(typeof(AccountController));
        [HttpPost]
        [AllowAnonymous]
        public JsonResult ForgotPassword(string EmailId)
        {
            try
            {
                UserMasterEntity userMasterEntity = new UserMasterEntity();
                UserMaster userMaster = userMasterEntity.GetusermasterByEmailAddress(EmailId);

                if (userMaster != null)
                {
                    if (userMaster.RoleId == 2)
                    {
                        TeacherMaster teacherMaster = new TeacherMasterEntity().GetTeacherByEmailAddress(EmailId);
                        userMaster.Token = Guid.NewGuid().ToString();
                        userMasterEntity.Save(userMaster);
                        var callbackUrl = "<a href='" + Url.Action("ResetPassword", "Account", new { email = userMaster.EmailAddress, code = userMaster.Token }, "http") + "'>Reset Password</a>";
                        MailMessage mail = new MailMessage();
                        mail.To.Add(userMaster.EmailAddress);
                        mail.From = new MailAddress(ConfigurationManager.AppSettings["SMTP_UserName"]);
                        string body = this.ForgotPassword(teacherMaster.FirstName, teacherMaster.LastName, callbackUrl);
                        mail.Subject = "Password reset link.";
                        mail.Body = body;
                        mail.IsBodyHtml = true;
                        SmtpClient smtp = new SmtpClient();
                        smtp.Host = ConfigurationManager.AppSettings["SMTP_Host"];
                        smtp.Port = Convert.ToInt16(ConfigurationManager.AppSettings["SMTP_Port"]);
                        smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["SMTP_UserName"], ConfigurationManager.AppSettings["SMTP_Password"]); // Enter seders User name and password  
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                        return Json(1, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(2, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return Json(JsonRequestBehavior.AllowGet);
        }
        public string ForgotPassword(string firstName, string lastName, string ResetLink)
        {

            string body = string.Empty;
            //using streamreader for reading my htmltemplate   

            using (StreamReader reader = new StreamReader(System.Web.HttpContext.Current.Server.MapPath("~/email_templates/forgotpassword.html")))
            {

                body = reader.ReadToEnd();

            }

            body = body.Replace("{firstName}", firstName); //replacing the required things  
            body = body.Replace("{lastName}", lastName); //replacing the required things  
            body = body.Replace("{ResetLink}", ResetLink);

            return body;

        }
        public ActionResult ResetPassword(string email, string code)
        {
            ManageUserViewModel manageUserViewModel = new ManageUserViewModel();
            UserMasterEntity userMasterEntity = new UserMasterEntity();
            UserMaster userMaster = userMasterEntity.IsTokenExist(email, code);
            if (userMaster != null)
            {
                manageUserViewModel.EmailAddress = email;
                return View(manageUserViewModel);
            }
            else
            {
                LoginViewModel loginViewModel = new LoginViewModel();
                loginViewModel.toasterObject.Message = "Password reset link is not valid.";
                return View("Login", loginViewModel);
                //return RedirectToAction("Login", "Account");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult ResetPassword(ManageUserViewModel manageUserViewModel)
        {
            UserMasterEntity userMasterEntity = new UserMasterEntity();
            UserMaster userMaster = userMasterEntity.GetusermasterByEmailAddress(manageUserViewModel.EmailAddress);
            userMaster.Password = manageUserViewModel.NewPassword;
            userMaster.Token = "random";
            userMasterEntity.Save(userMaster);
            return RedirectToAction("Login", "Account", new { id = "PasswordReset" });
        }
        public ActionResult Logout()
        {
            Session.Abandon();
            //FormsAuthentication.SignOut();
            Session.Clear();//clear session
            ////Session.Abandon();//Abandon session
            Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();
            return RedirectToAction("Login", "Account");
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string id, string returnUrl)
        {
            try
            {
                //Session.Abandon();
                ////FormsAuthentication.SignOut();
                //Session.Clear();//clear session
                //////Session.Abandon();//Abandon session
                //Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
                //Response.Cache.SetCacheability(HttpCacheability.NoCache);
                //Response.Cache.SetNoStore();
                ////Request.Cookies.Remove(CommonLogic.AuthenticateCookieName);
                //AuthenticationManager.SignOut();
                LoginViewModel loginViewModel = new LoginViewModel();
                loginViewModel.toasterObject.Message = "";

                return View(loginViewModel);
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                return View();
            }
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model, string returnUrl)
        {
            try
            {
                UserMasterEntity userMasterEntity = new UserMasterEntity();
                ValidateUser_Result validateUserResult = userMasterEntity.ValidateUser(model.UserName, model.Password).FirstOrDefault();
                if (validateUserResult != null)
                {
                    Session["UserName"] = validateUserResult.FirstName + " " + validateUserResult.LastName;
                    Session["Role"] = validateUserResult.Role;
                    Session["UserId"] = validateUserResult.UserId;

                    if (!string.IsNullOrEmpty(returnUrl))
                        return Redirect(returnUrl);
                    else
                        return RedirectToAction("Dashboard", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid username or password.");
                    return View(model);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                return View(model);
            }
        }

        public ActionResult PageNotFound()
        {
            return View();
        }

    }
}