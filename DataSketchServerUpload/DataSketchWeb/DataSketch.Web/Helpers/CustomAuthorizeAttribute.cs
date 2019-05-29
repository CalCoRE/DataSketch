using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataSketch.Web
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly string[] allowedroles;
        public CustomAuthorizeAttribute(params string[] roles)
        {
            this.allowedroles = roles;
        }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool authorize = false;
            if (HttpContext.Current.Session != null && HttpContext.Current.Session["UserId"] != null && Convert.ToInt64(HttpContext.Current.Session["UserId"]) > 0)
            {
                authorize = true;
                //if (allowedroles.Contains(SessionHelper.AdminUserSession.UserType.Trim()))
                //{
                //    authorize = true;
                //}
            }
            return authorize;
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {

            filterContext.Result = new RedirectResult("~/Account/Logout", false);
            //base.HandleUnauthorizedRequest(filterContext);
        }
    }
}