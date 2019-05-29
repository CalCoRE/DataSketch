using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DataSketch.Models
{
    public class Result
    {   
        public bool HasError
        {
            get
            {
                return (Status == StatusType.Error);
            }
            set { }
        }

        public bool HasSuccess
        {
            get
            {
                return (Status == StatusType.Success);
            }
            set { }
        }

        public StatusType Status { get; set; }

        public string MessageTitle { get; set; }
        public string Message { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionStackTrace { get; set; }
        public Exception ResultException { get; set; }

        public Object ResultObject; // to pass generic data in results

        // Success result
        public Result()
        {
            this.Status = StatusType.Success;
        }

        // Error result
        public Result(string message)
        {
            this.Status = StatusType.Error;
            this.Message = message;
        }

        public Result(string message, StatusType statusType)
        {
            this.Status = statusType;
            this.Message = message;
        }

        // Error result
        public Result(string message, Exception exp)
        {
            this.Status = StatusType.Error;
            this.Message = message;
            if (null != exp)
            {
                this.ExceptionMessage = exp.Message;
                this.ExceptionStackTrace = exp.StackTrace;
            }
            this.ResultException = exp;
        }
    }
    public enum StatusType
    {
        Success = 200,
        Warning = 201,
        Error = 500
    }
}