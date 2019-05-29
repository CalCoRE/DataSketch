using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DataSketch.Web
{
    public class RoleAuthorizeAttribute : AuthorizeAttribute
    {
        private readonly string[] allowedroles;
        public RoleAuthorizeAttribute(params string[] roles)
        {
            this.allowedroles = roles;
        }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool authorize = false;
            if (allowedroles.Contains(httpContext.Session["Role"].ToString()))
            {
                authorize = true;
            }
            return authorize;
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectResult("~/Home/Dashboard", false);
            //base.HandleUnauthorizedRequest(filterContext);            
        }

    }
}