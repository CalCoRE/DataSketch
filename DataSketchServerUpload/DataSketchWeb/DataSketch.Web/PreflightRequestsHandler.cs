using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace DemoWebAPI
{
    public class PreflightRequestsHandler : DelegatingHandler
    {
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.Headers.Contains("Origin") && request.Method.Method.Equals("OPTIONS"))
            {
                var response = new HttpResponseMessage { StatusCode = HttpStatusCode.OK };
                // Define and add values to variables: origins, headers, methods (can be global)               
                response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Accept, Origin, X-Requested-With, Token, Authorization");
                response.Headers.Add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
                var tsc = new TaskCompletionSource<HttpResponseMessage>();
                tsc.SetResult(response);
                return tsc.Task;
            }
            return base.SendAsync(request, cancellationToken);
        }
    }
}