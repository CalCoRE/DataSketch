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
using System.Transactions;
using System.Web.Routing;
using System.Diagnostics;
using System.IO;
using Newtonsoft.Json;
//using DataSketch.Web.CustomFilters;

namespace DataSketch.Web.Controllers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class NoCacheAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);
            filterContext.HttpContext.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            filterContext.HttpContext.Response.Cache.SetNoStore();

            base.OnResultExecuting(filterContext);
        }
    }

    [CustomAuthorizeAttribute]
    public class HomeController : Controller
    {
        #region Initialization
        private ILog logger = log4net.LogManager.GetLogger(typeof(AccountController));
        #endregion

        #region DataSketch
        //[NoCache]
        [RoleAuthorize(UserRole.Administrator, UserRole.Teacher, UserRole.Student,UserRole.SuperAdministrator)]
        public ActionResult Dashboard()
        {
            try
            {
                ViewData["SubTitle"] = "Welcome to Datasketch ";
                ViewData["Message"] = "Exploring computational data visualization in the middle grades.";
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View();
        }
        #endregion

        #region SharedSketch Management
        [NoCache]
        [RoleAuthorize(UserRole.Teacher, UserRole.Student)]
        public ActionResult SharedSketch()
        {
            SketchShareMappingEntity sketchShareMappingEntity = new SketchShareMappingEntity();
            List<SketchMasterModel> lstsharedSketches = new List<SketchMasterModel>();
            try
            {
                List<GetSharedSketchList_Result> lstSharedSketches = sketchShareMappingEntity.GetSharedSketchList(Convert.ToInt64(Session["UserId"])).ToList();

                foreach (GetSharedSketchList_Result obj in lstSharedSketches)
                {
                    SketchMasterModel model = new SketchMasterModel();
                    model.SketchId = obj.SketchId;
                    model.SketchName = obj.SketchName;
                    model.SketchPath = obj.SketchPath;
                    model.UserId = obj.UserId;
                    model.CreatedBy = obj.CreatedBy;
                    model.CreatedOn = obj.CreatedOn;
                    model.UpdatedBy = obj.UpdatedBy;
                    model.UpdatedOn = obj.UpdatedOn;
                    model.IsActive = obj.IsActive;
                    model.IsDelete = obj.IsDelete;
                    model.FirstName = obj.FullName;
                    lstsharedSketches.Add(model);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(lstsharedSketches);
        }

        #endregion

        #region Manage Sketch Management

        /// <summary>
        /// Action for retriving the sketch list according to user.
        /// </summary>
        /// <returns></returns>
        [NoCache]
        [RoleAuthorize(UserRole.Teacher, UserRole.Student)]
        public ActionResult ManageSketch()
        {
            SketchMasterEntity sketchMasterEntity = new SketchMasterEntity();
            List<GetAllSketch_Result> lstSketchMaster = new List<GetAllSketch_Result>();
            List<SketchMaster> lstTeacherSketchMaster = new List<SketchMaster>();
            string Role = Convert.ToString(Session["Role"]);
            try
            {
                lstSketchMaster = sketchMasterEntity.GetAllSketch(Convert.ToInt64(Session["UserId"])).ToList();
                if (Role == "Teacher")
                    lstTeacherSketchMaster = sketchMasterEntity.GetSketchMasterById(Convert.ToInt64(Session["UserId"]));
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(Tuple.Create(lstTeacherSketchMaster, lstSketchMaster));
        }
        /// <summary>
        /// Action for activeinactive and delete the user.
        /// </summary>
        /// <param name="UserId"></param>
        /// <param name="SketchId"></param>
        /// <param name="Operation"></param>
        /// <returns></returns>
        [HttpPost]
        [NoCache]
        public ActionResult ManageSketch(long UserId = 0, long SketchId = 0, string Operation = "")
        {
            SketchMasterEntity sketchMasterEntity = new SketchMasterEntity();
            List<GetAllSketch_Result> lstSketchMaster = new List<GetAllSketch_Result>();
            List<SketchMaster> lstTeacherSketchMaster = new List<SketchMaster>();
            string Role = Convert.ToString(Session["Role"]);
            try
            {
                if (!string.IsNullOrEmpty(Operation))
                {
                    SketchMaster sketchMaster = sketchMasterEntity.GetSketchBySketchIdAndUserId(UserId, SketchId);

                    if (sketchMaster != null)
                    {
                        if (Operation.Equals("ActiveInactive"))
                        {
                            sketchMaster.IsActive = !sketchMaster.IsActive;
                        }
                        else
                        {
                            sketchMaster.IsActive = false;
                            sketchMaster.IsDelete = true;
                        }
                        sketchMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                        sketchMaster.UpdatedOn = DateTime.Now;
                        sketchMasterEntity.Save(sketchMaster);
                    }
                }
                lstSketchMaster = sketchMasterEntity.GetAllSketch(Convert.ToInt64(Session["UserId"])).ToList();
                if (Role == "Teacher")
                {
                    lstTeacherSketchMaster = sketchMasterEntity.GetSketchMasterById(Convert.ToInt64(Session["UserId"]));
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_partialSketch", Tuple.Create(lstTeacherSketchMaster, lstSketchMaster));
        }
        [NoCache]
        public ActionResult ShareSketchMapping(StudentMasterModel model, string[] chklstStudent)
        {
            SketchShareMappingEntity sketchShareMappingEntity = new SketchShareMappingEntity();
            SketchShareMapping sketchShareMapping = null;
            try
            {
                sketchShareMappingEntity.Delete(chklstStudent, model.SketchId);
                if (chklstStudent != null)
                {
                    foreach (string studentId in chklstStudent)
                    {
                        bool studentSketchMapped = sketchShareMappingEntity.IsMappingExist(model.SketchId, Convert.ToInt64(studentId));
                        if (studentSketchMapped == false)
                        {
                            sketchShareMapping = sketchShareMappingEntity.Create();
                            sketchShareMapping.SketchId = Convert.ToInt64(model.SketchId);
                            sketchShareMapping.UserId = Convert.ToInt64(studentId);
                            sketchShareMapping.IsActive = true;
                            sketchShareMapping.IsDelete = false;
                            sketchShareMapping.CreatedBy = Convert.ToInt64(Session["UserId"]);
                            sketchShareMapping.CreatedOn = DateTime.Now;
                            sketchShareMappingEntity.Save(sketchShareMapping);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return RedirectToAction("ManageSketch");
        }
        /// <summary>
        /// Action for get student of particular standard.
        /// </summary>
        /// <param name="StandardId"></param>
        /// <param name="SketchId"></param>
        /// <returns></returns>
        [NoCache]
        public ActionResult GetStudentByStandard(long UserId, long SketchId)
        {
            StudentMasterEntity studentMasterEntity = new StudentMasterEntity();
            SketchShareMappingEntity sketchShareMappingEntity = new SketchShareMappingEntity();
            StudentMasterModel studentMasterModel = new StudentMasterModel();
            try
            {
                StudentMaster studentMaster = studentMasterEntity.GetStudentMasterById(UserId);
                List<StudentMaster> lststudentMaster = studentMasterEntity.GetStudentByStandard(studentMaster.StandardId, studentMaster.SchoolId, studentMaster.UserId);

                studentMasterModel.lstStudentList = StudentMasterModel.Mapping(lststudentMaster);
                studentMasterModel.SketchId = SketchId;
                List<GetSketchShareStudents_Result> lstCheckedStudent = studentMasterEntity.GetSketchShareStudents(SketchId).ToList();
                studentMasterModel.lstCheckedStudent = new List<StudentMasterModel>();
                foreach (var item in lstCheckedStudent)
                {
                    StudentMasterModel model = new StudentMasterModel();
                    model.StudentId = item.StudentId;
                    model.FirstName = item.FirstName;
                    model.LastName = item.LastName;
                    model.UserName = item.UserName;
                    model.Teacher = item.TeacherId;
                    model.School = item.SchoolId;
                    model.Standard = item.StandardId;
                    model.Class = item.ClassId;
                    model.IsActive = item.IsActive;
                    model.IsDelete = item.IsDelete;
                    model.CreatedBy = item.CreatedBy;
                    model.CreatedOn = item.CreatedOn;
                    model.UpdatedBy = item.UpdatedBy;
                    model.UpdatedOn = item.UpdatedOn;
                    model.UserId = Convert.ToInt64(item.UserId);
                    studentMasterModel.lstCheckedStudent.Add(model);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_partialSketchSharedStudentList", studentMasterModel);
        }
        [NoCache]
        public ActionResult GetStudentListForTeacher(long SketchId)
        {
            StudentMasterModel studentMasterModel = new StudentMasterModel();
            try
            {
                List<GetStudentListOfTeacher_Result> lststudentMaster = new TeacherMasterEntity().GetStudentListOfTeacher(Convert.ToInt64(Session["UserId"])).ToList();
                foreach (var item in lststudentMaster)
                {
                    StudentMaster model = new StudentMaster();
                    model.StudentId = item.StudentId;
                    model.FirstName = item.FirstName;
                    model.LastName = item.LastName;
                    model.UserName = item.UserName;
                    model.TeacherId = item.TeacherId;
                    model.SchoolId = item.SchoolId;
                    model.StandardId = item.StandardId;
                    model.ClassId = item.ClassId;
                    model.IsActive = item.IsActive;
                    model.IsDelete = item.IsDelete;
                    model.CreatedBy = item.CreatedBy;
                    model.CreatedOn = item.CreatedOn;
                    model.UpdatedBy = item.UpdatedBy;
                    model.UpdatedOn = item.UpdatedOn;
                    model.UserId = item.UserId;
                    studentMasterModel.lstStudentList.Add(StudentMasterModel.Mapping(model));
                }
                studentMasterModel.SketchId = SketchId;
                List<GetSketchShareStudents_Result> lstCheckedStudent = new StudentMasterEntity().GetSketchShareStudents(SketchId).ToList();
                studentMasterModel.lstCheckedStudent = new List<StudentMasterModel>();
                foreach (var item in lstCheckedStudent)
                {
                    StudentMasterModel model = new StudentMasterModel();
                    model.StudentId = item.StudentId;
                    model.FirstName = item.FirstName;
                    model.LastName = item.LastName;
                    model.UserName = item.UserName;
                    model.Teacher = item.TeacherId;
                    model.School = item.SchoolId;
                    model.Standard = item.StandardId;
                    model.Class = item.ClassId;
                    model.IsActive = item.IsActive;
                    model.IsDelete = item.IsDelete;
                    model.CreatedBy = item.CreatedBy;
                    model.CreatedOn = item.CreatedOn;
                    model.UpdatedBy = item.UpdatedBy;
                    model.UpdatedOn = item.UpdatedOn;
                    model.UserId = Convert.ToInt64(item.UserId);
                    studentMasterModel.lstCheckedStudent.Add(model);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_partialSketchSharedStudentList", studentMasterModel);
        }
        #endregion

        #region Teacher Pages Managment

        //[AuthLog(Roles = "Teacher")]
        [NoCache]
        [RoleAuthorize(UserRole.Administrator,UserRole.SuperAdministrator)]
        public ActionResult Teachers()
        {
            try
            {
                List<TeacherMasterModel> lstTeachers = TeacherMasterModel.Mapping(new TeacherMasterEntity().GetAllTeacherMaster());
                ToasterDataModel toasterDataModel = new ToasterDataModel();
                toasterDataModel.Message = (TempData["Message"] != null) ? TempData["Message"].ToString() : string.Empty;
                toasterDataModel.ToasterType = "success";

                return View(Tuple.Create(toasterDataModel, lstTeachers));
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                return View();
            }
        }

        [HttpPost]
        [NoCache]
        public ActionResult ManageTeacher(long? TeacherId = 0, string Operation = "")
        {
            TeacherMasterEntity teacherMasterEntity = new TeacherMasterEntity();
            List<TeacherMasterModel> lstTeachers = new List<TeacherMasterModel>();

            try
            {
                if (!string.IsNullOrEmpty(Operation))
                {
                    UserMasterEntity userMasterEntity = new UserMasterEntity();
                    TeacherMaster teacherMaster = teacherMasterEntity.GetTeacherMasterById(Convert.ToInt64(TeacherId));
                    UserMaster userMaster = userMasterEntity.GetusermasterById(Convert.ToInt64(teacherMaster.UserId));

                    if (teacherMaster != null && userMaster != null)
                    {
                        if (Operation.Equals("ActiveInactive"))
                        {
                            userMaster.IsActive = teacherMaster.IsActive = !teacherMaster.IsActive;
                        }
                        else
                        {
                            userMaster.IsActive = teacherMaster.IsActive = false;
                            userMaster.IsDelete = teacherMaster.IsDelete = true;
                        }
                        userMaster.UpdatedBy = teacherMaster.UpdateBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.UpdatedOn = teacherMaster.UpdatedOn = DateTime.Now;
                        teacherMasterEntity.Save(teacherMaster);
                        userMasterEntity.Save(userMaster);
                    }
                }
                lstTeachers = TeacherMasterModel.Mapping(new TeacherMasterEntity().GetAllTeacherMaster());
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_partialTeacher", lstTeachers);
        }

        public JsonResult IsEmailExist(string EmailId)
        {
            bool result = false;
            try
            {
                TeacherMasterEntity teacherMasterEntity = new TeacherMasterEntity();
                result = teacherMasterEntity.IsEmailExist(EmailId);
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [NoCache]
        [RoleAuthorize(UserRole.Administrator, UserRole.SuperAdministrator)]
        public ActionResult AddEditTeacher(long? id = 0)
        {
            TeacherMasterModel teacherMasterModel = new TeacherMasterModel();
            teacherMasterModel.lstSchool = SchoolMasterModel.Mapping(new SchoolMasterEntity().GetAllSchoolMaster());
            teacherMasterModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
            TempData["Message"] = null;
            try
            {
                if (id == 0)
                {
                    ViewBag.Title = "Add Teacher";
                }
                else
                {
                    ViewBag.Title = "Edit Teacher";
                    TeacherMasterEntity teacherMasterEntity = new TeacherMasterEntity();
                    TeacherMaster teacherMaster = teacherMasterEntity.GetTeacherMasterById(Convert.ToInt64(id));
                    if (teacherMaster != null)
                    {
                        UserMaster usermaster = new UserMasterEntity().GetusermasterById(Convert.ToInt64(teacherMaster.UserId));
                        teacherMasterModel.FirstName = teacherMaster.FirstName;
                        teacherMasterModel.LastName = teacherMaster.LastName;
                        teacherMasterModel.EmailAddress = teacherMaster.EmailAddress;
                        teacherMasterModel.Password = usermaster.Password;
                        teacherMasterModel.ConfirmPassword = usermaster.Password;
                        teacherMasterModel.SchoolId = teacherMaster.SchoolId;
                        teacherMasterModel.TeacherId = teacherMaster.TeacherId;
                        List<long> lstSelectedStandard = (new TeacherStandardMappingEntity().GetAllTeacherStandardMapping(teacherMaster.TeacherId).Select(p => p.StandardId)).ToList();
                        teacherMasterModel.lstCheckedStandard = lstSelectedStandard;
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(teacherMasterModel);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        [NoCache]
        public ActionResult AddEditTeacher(TeacherMasterModel model, string[] chklstStandard)
        {
            TeacherMasterEntity teacherMasterEntity = new TeacherMasterEntity();
            TeacherMaster teacherMaster = null;
            UserMasterEntity userMasterEntity = new UserMasterEntity();
            UserMaster userMaster = null;
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    if (model.TeacherId == 0)
                    {
                        teacherMaster = teacherMasterEntity.Create();
                        teacherMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                        teacherMaster.CreatedOn = DateTime.Now;
                        teacherMaster.IsActive = true;
                        teacherMaster.IsDelete = false;

                        userMaster = userMasterEntity.Create();
                        userMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.CreatedOn = DateTime.Now;
                        userMaster.IsActive = true;
                        userMaster.IsDelete = false;
                        TempData["Message"] = "Teacher added successfully.";
                    }
                    else
                    {
                        teacherMaster = teacherMasterEntity.GetTeacherMasterById(model.TeacherId);
                        userMaster = userMasterEntity.GetusermasterById(teacherMaster.UserId);
                        userMaster.UpdatedBy = teacherMaster.UpdateBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.UpdatedOn = teacherMaster.UpdatedOn = DateTime.Now;
                        TempData["Message"] = "Teacher updated successfully.";
                    }

                    userMaster.EmailAddress = model.EmailAddress;
                    userMaster.Password = model.Password;
                    userMaster.RoleId = new RoleEntity().GetRole("T").RoleId;
                    userMasterEntity.Save(userMaster);

                    teacherMaster.EmailAddress = model.EmailAddress;
                    teacherMaster.FirstName = model.FirstName;
                    teacherMaster.LastName = model.LastName;
                    teacherMaster.SchoolId = model.SchoolId;
                    teacherMaster.UserId = userMaster.UserId;
                    teacherMasterEntity.Save(teacherMaster);

                    TeacherStandardMappingEntity teacherStandardEntity = new TeacherStandardMappingEntity();
                    TeacherStandardMapping teacherStandard = null;

                    teacherStandardEntity.Delete(chklstStandard, teacherMaster.TeacherId);

                    foreach (string standardId in chklstStandard)
                    {
                        bool teacherStandardMapped = teacherStandardEntity.IsMappingExist(teacherMaster.TeacherId, Convert.ToInt64(standardId));
                        if (teacherStandardMapped == false)
                        {
                            teacherStandard = teacherStandardEntity.Create();
                            teacherStandard.StandardId = Convert.ToInt64(standardId);
                            teacherStandard.TeacherId = teacherMaster.TeacherId;
                            teacherStandardEntity.Save(teacherStandard);
                        }
                    }
                    scope.Complete();
                    return RedirectToAction("Teachers");
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                TeacherMasterModel teacherMasterModel = new TeacherMasterModel();
                teacherMasterModel.lstSchool = SchoolMasterModel.Mapping(new SchoolMasterEntity().GetAllSchoolMaster());
                teacherMasterModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                return View(teacherMasterModel);
            }
        }

        #endregion


        /// <summary>
        /// Students List Page
        /// </summary>
        /// <returns></returns>
        [NoCache]
        [RoleAuthorize(UserRole.SuperAdministrator)]
        public ActionResult Administrator()
        {
            UserMasterEntity userMasterEntity = new UserMasterEntity();
            List<UserMaster> lstUserMaster = userMasterEntity.GetUserMasterByRoleID(1);
            List<UserMasterModel> lstUserMasterModel = UserMasterModel.Mapping(lstUserMaster);
            ToasterDataModel toasterDataModel = new ToasterDataModel();

            toasterDataModel.Message = (TempData["Message"] != null) ? TempData["Message"].ToString() : string.Empty;
            toasterDataModel.ToasterType = "success";

            return View(Tuple.Create(toasterDataModel, lstUserMasterModel));
        }



        [HttpGet]
        [NoCache]
        public JsonResult CheckEmailAddress(string EmailAddress)
        {
            bool Result = false;
            try
            {
                UserMaster userMaster = new UserMasterEntity().GetusermasterByEmailAddress(EmailAddress);
                if (userMaster != null)
                {
                    Result = true;
                }
                else
                {
                    Result = false;
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                Result = false;
            }
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Update Student Status Active,Inactive and Delete.
        /// </summary>
        /// <param name="StudentId"></param>
        /// <param name="Operation"></param>
        /// <returns></returns>
        [HttpPost]
        [NoCache]
        public ActionResult ManageAdministrator(long? UserId = 0, string Operation = "")
        {
            UserMasterEntity userMasterEntity = new UserMasterEntity();
            List<UserMaster> lstUserMaster = null;
            try
            {
                if (!string.IsNullOrEmpty(Operation))
                {
                    UserMaster userMaster = userMasterEntity.GetusermasterById(Convert.ToInt64(UserId));

                    if (userMaster != null && userMaster != null)
                    {
                        if (Operation.Equals("ActiveInactive"))
                        {
                            userMaster.IsActive = !userMaster.IsActive;
                        }
                        else
                        {
                            userMaster.IsActive = false;
                            userMaster.IsDelete = true;
                        }
                        userMasterEntity.Save(userMaster);
                        userMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.UpdatedOn = DateTime.Now;
                        userMasterEntity.Save(userMaster);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }

            lstUserMaster = userMasterEntity.GetUserMasterByRoleID(1);
            return PartialView("_partialAdministrator", lstUserMaster);
        }

        /// <summary>
        /// Add Edit Administrator Page
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [NoCache]
        [RoleAuthorize(UserRole.SuperAdministrator)]
        public ActionResult AddEditAdministrator(long? id = 0)
        {
            UserMasterModel userMasterModel = new UserMasterModel();
            TempData["Message"] = null;
            try
            {
                ViewBag.Parent = "Administrator";
                if (id == 0)
                {
                    ViewBag.Title = "Add Administrator";
                }
                else
                {
                    ViewBag.Title = "Edit Administrator";
                    UserMasterEntity userMasterEntity = new UserMasterEntity();
                    UserMaster userMaster = userMasterEntity.GetusermasterById(Convert.ToInt64(id));
                    if (userMaster != null)
                    {
                        userMasterModel = UserMasterModel.Mapping(userMaster);
                        userMasterModel.ConfirmPassword = userMasterModel.Password;
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(userMasterModel);
        }



        /// <summary>
        /// Add Edit Administrator Submit Event
        /// </summary>
        /// <param name="userMasterModel"></param>
        /// <returns></returns>
        [HttpPost]
        [NoCache]
        [ValidateAntiForgeryToken]
        public ActionResult AddEditAdministrator(UserMasterModel userMasterModel)
        {
            try
            {
                UserMasterEntity userMasterEntity = new UserMasterEntity();
                UserMaster userMaster = null;
                ViewBag.Parent = "Administrator";

                if (ModelState.IsValid)
                {
                    if (userMasterModel.UserId == 0)
                    {
                        userMaster = userMasterEntity.Create();
                        TempData["Message"] = "Administrator Added Successfully";
                        ViewBag.Title = "Add Administrator";
                        userMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.CreatedOn = DateTime.Now;
                    }
                    else
                    {
                        userMaster = userMasterEntity.GetusermasterById(userMasterModel.UserId);
                        TempData["Message"] = "Administrator Updated Successfully";
                        ViewBag.Title = "Edit Administrator";
                        userMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.UpdatedOn = DateTime.Now;
                    }

                    userMaster.EmailAddress = userMasterModel.EmailAddress;
                    userMaster.Password = userMasterModel.Password;
                    userMaster.IsActive = true;
                    userMaster.IsDelete = false;
                    userMaster.RoleId = 1;
                    userMaster.Token = "token";
                    long userId = userMasterEntity.Save(userMaster);

                    return RedirectToAction("Administrator");
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(userMasterModel);
        }




        #region Studnets Pages Management

        /// <summary>
        /// Students List Page
        /// </summary>
        /// <returns></returns>
        [NoCache]
        [RoleAuthorize(UserRole.Administrator, UserRole.Teacher, UserRole.SuperAdministrator)]
        public ActionResult Students()
        {
            try
            {
                List<GetStudentList_Result> getStudentList = new StudentMasterEntity().GetStudentList().ToList();
                ToasterDataModel toasterDataModel = new ToasterDataModel();

                toasterDataModel.Message = (TempData["Message"] != null) ? TempData["Message"].ToString() : string.Empty;
                toasterDataModel.ToasterType = "success";

                return View(Tuple.Create(toasterDataModel, getStudentList));
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                return View();
            }
        }

        /// <summary>
        /// Add Edit Student Page
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [NoCache]
        [RoleAuthorize(UserRole.Administrator, UserRole.Teacher,UserRole.SuperAdministrator)]
        public ActionResult AddEditStudent(long? id = 0)
        {
            StudentMasterModel studentMasterModel = new StudentMasterModel();
            TempData["Message"] = null;
            try
            {
                List<TeacherMasterModel> teacherMasterModel = TeacherMasterModel.Mapping(new TeacherMasterEntity().GetAllTeacherMaster());
                List<SchoolMasterModel> schoolMasterModel = SchoolMasterModel.Mapping(new SchoolMasterEntity().GetAllSchoolMaster());
                List<StandardMasterModel> standardMasterModel = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                ViewBag.Parent = "Students";
                if (id == 0)
                {
                    List<GetClassListStandardWise_Result> classMasterModel = new ClassMasterEntity().GetClassListStandardWise(0).ToList();
                    List<ClassMasterModel> classmasterModel = new List<ClassMasterModel>();
                    foreach (GetClassListStandardWise_Result obj in classMasterModel)
                    {
                        ClassMasterModel model = new ClassMasterModel();
                        model.ClassId = obj.ClassId;
                        model.ClassName = obj.ClassName;
                        model.IsActive = obj.IsActive;
                        model.IsDelete = obj.IsDelete;
                        model.CreatedBy = obj.CreatedBy;
                        model.CreatedOn = obj.CreatedOn;
                        model.UpdatedBy = obj.UpdatedBy;
                        model.UpdatedOn = obj.UpdatedOn;
                        classmasterModel.Add(model);
                    }
                    studentMasterModel.lstTeacher = teacherMasterModel;
                    studentMasterModel.lstSchool = schoolMasterModel;
                    studentMasterModel.lstStandard = standardMasterModel;
                    studentMasterModel.lstClass = classmasterModel;
                    ViewBag.Title = "Add Student";
                }
                else
                {
                    ViewBag.Title = "Edit Student";
                    StudentMasterEntity studentMasterEntity = new StudentMasterEntity();
                    StudentMaster studentMaster = studentMasterEntity.GetStudentMasterByStudentId(Convert.ToInt64(id));
                    if (studentMaster != null)
                    {
                        List<GetClassListStandardWise_Result> classMasterModel = new ClassMasterEntity().GetClassListStandardWise(Convert.ToInt16(studentMaster.StandardId)).ToList();
                        List<ClassMasterModel> classmasterModel = new List<ClassMasterModel>();
                        foreach (GetClassListStandardWise_Result obj in classMasterModel)
                        {
                            ClassMasterModel model = new ClassMasterModel();
                            model.ClassId = obj.ClassId;
                            model.ClassName = obj.ClassName;
                            model.IsActive = obj.IsActive;
                            model.IsDelete = obj.IsDelete;
                            model.CreatedBy = obj.CreatedBy;
                            model.CreatedOn = obj.CreatedOn;
                            model.UpdatedBy = obj.UpdatedBy;
                            model.UpdatedOn = obj.UpdatedOn;
                            classmasterModel.Add(model);
                        }

                        UserMaster usermaster = new UserMasterEntity().GetusermasterById(Convert.ToInt64(studentMaster.UserId));
                        studentMasterModel.FirstName = studentMaster.FirstName;
                        studentMasterModel.LastName = studentMaster.LastName;
                        studentMasterModel.UserName = studentMaster.UserName;
                        studentMasterModel.Password = usermaster.Password;
                        studentMasterModel.ConfirmPassword = usermaster.Password;
                        studentMasterModel.StudentId = studentMaster.StudentId;
                        studentMasterModel.lstTeacher = teacherMasterModel;
                        studentMasterModel.lstSchool = schoolMasterModel;
                        studentMasterModel.lstStandard = standardMasterModel;
                        studentMasterModel.lstClass = classmasterModel;
                        studentMasterModel.Teacher = Convert.ToInt16(studentMaster.TeacherId);
                        studentMasterModel.School = Convert.ToInt16(studentMaster.SchoolId);
                        studentMasterModel.Standard = Convert.ToInt16(studentMaster.StandardId);
                        studentMasterModel.Class = Convert.ToInt16(studentMaster.ClassId);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(studentMasterModel);
        }


        [HttpGet]
        [NoCache]
        public JsonResult GetClassStandardWise(long standardId)
        {
            List<ClassMasterModel> classmasterModel = new List<ClassMasterModel>();
            try
            {
                List<GetClassListStandardWise_Result> classMasterModel = new ClassMasterEntity().GetClassListStandardWise(Convert.ToInt16(standardId)).ToList();
                
                foreach (GetClassListStandardWise_Result obj in classMasterModel)
                {
                    ClassMasterModel model = new ClassMasterModel();
                    model.ClassId = obj.ClassId;
                    model.ClassName = obj.ClassName;
                    model.IsActive = obj.IsActive;
                    model.IsDelete = obj.IsDelete;
                    model.CreatedBy = obj.CreatedBy;
                    model.CreatedOn = obj.CreatedOn;
                    model.UpdatedBy = obj.UpdatedBy;
                    model.UpdatedOn = obj.UpdatedOn;
                    classmasterModel.Add(model);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return Json(classmasterModel, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Add Edit Studnet Submit Event
        /// </summary>
        /// <param name="studentMasterModel"></param>
        /// <returns></returns>
        [HttpPost]
        [NoCache]
        [ValidateAntiForgeryToken]
        public ActionResult AddEditStudent(StudentMasterModel studentMasterModel)
        {
            try
            {
                StudentMasterEntity studentMasterEntity = new StudentMasterEntity();
                UserMasterEntity userMasterEntity = new UserMasterEntity();
                UserMaster userMaster = null;
                StudentMaster studentMaster = null;
                ViewBag.Parent = "Students";

                if (ModelState.IsValid)
                {
                    if (studentMasterModel.StudentId == 0)
                    {
                        userMaster = userMasterEntity.Create();
                        studentMaster = studentMasterEntity.Create();
                        TempData["Message"] = "Student Added Successfully";
                        ViewBag.Title = "Add Student";
                    }
                    else
                    {

                        studentMaster = studentMasterEntity.GetStudentMasterByStudentId(studentMasterModel.StudentId);
                        if (studentMaster != null)
                        {
                            userMaster = userMasterEntity.GetusermasterById(Convert.ToInt64(studentMaster.UserId));
                        }

                        TempData["Message"] = "Student Updated Successfully";
                        ViewBag.Title = "Edit Student";
                    }

                    userMaster.EmailAddress = studentMasterModel.UserName;
                    userMaster.Password = studentMasterModel.Password;
                    userMaster.IsActive = true;
                    userMaster.IsDelete = false;
                    userMaster.RoleId = 3;
                    userMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                    userMaster.CreatedOn = DateTime.Now;
                    userMaster.Token = "token";
                    long userId = userMasterEntity.Save(userMaster);

                    studentMaster.FirstName = studentMasterModel.FirstName;
                    studentMaster.LastName = studentMasterModel.LastName;
                    studentMaster.UserName = studentMasterModel.UserName;
                    studentMaster.UserId = userId;
                    studentMaster.IsActive = true;
                    studentMaster.IsDelete = false;
                    studentMaster.TeacherId = studentMasterModel.Teacher;
                    studentMaster.SchoolId = studentMasterModel.School;
                    studentMaster.StandardId = studentMasterModel.Standard;
                    studentMaster.ClassId = studentMasterModel.Class;
                    studentMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                    studentMaster.CreatedOn = DateTime.Now;
                    studentMasterEntity.Save(studentMaster);

                    return RedirectToAction("Students");
                }
                List<TeacherMasterModel> teacherMasterModel = TeacherMasterModel.Mapping(new TeacherMasterEntity().GetAllTeacherMaster());
                List<SchoolMasterModel> schoolMasterModel = SchoolMasterModel.Mapping(new SchoolMasterEntity().GetAllSchoolMaster());
                List<ClassMasterModel> classMasterModel = ClassMasterModel.Mapping(new ClassMasterEntity().GetAllClassMaster());
                List<StandardMasterModel> standardMasterModel = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                studentMasterModel.lstTeacher = teacherMasterModel;
                studentMasterModel.lstStandard = standardMasterModel;
                studentMasterModel.lstClass = classMasterModel;
                studentMasterModel.lstSchool = schoolMasterModel;
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return View(studentMasterModel);
        }


        /// <summary>
        /// Update Student Status Active,Inactive and Delete.
        /// </summary>
        /// <param name="StudentId"></param>
        /// <param name="Operation"></param>
        /// <returns></returns>
        [HttpPost]
        [NoCache]
        public ActionResult ManageStudent(long? StudentId = 0, string Operation = "")
        {
            StudentMasterEntity studentMasterEntity = new StudentMasterEntity();
            List<GetStudentList_Result> getStudentList = null;
            try
            {
                if (!string.IsNullOrEmpty(Operation))
                {
                    UserMasterEntity userMasterEntity = new UserMasterEntity();
                    StudentMaster studentMaster = studentMasterEntity.GetStudentMasterByStudentId(Convert.ToInt64(StudentId));
                    UserMaster userMaster = userMasterEntity.GetusermasterById(Convert.ToInt64(studentMaster.UserId));

                    if (studentMaster != null && userMaster != null)
                    {
                        if (Operation.Equals("ActiveInactive"))
                        {
                            userMaster.IsActive = studentMaster.IsActive = !studentMaster.IsActive;
                        }
                        else
                        {
                            userMaster.IsActive = studentMaster.IsActive = false;
                            userMaster.IsDelete = studentMaster.IsDelete = true;
                        }
                        studentMasterEntity.Save(studentMaster);
                        userMasterEntity.Save(userMaster);
                        userMaster.UpdatedBy = studentMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                        userMaster.UpdatedOn = studentMaster.UpdatedOn = DateTime.Now;
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }

            getStudentList = studentMasterEntity.GetStudentList().ToList();
            return PartialView("_partialStudent", getStudentList);
        }

        [HttpGet]
        [NoCache]
        public JsonResult CheckUserName(string UserName)
        {
            bool Result = false;
            try
            {
                StudentMaster studentMaster = new StudentMasterEntity().CheckUserNameAvailability(UserName);
                if (studentMaster != null)
                {
                    Result = true;
                }
                else
                {
                    Result = false;
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                Result = false;
            }
            return Json(Result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region School Management

        /// <summary>
        /// Setup school Page Load
        /// </summary>
        /// <param name="StandardList"></param>
        /// <returns></returns>
        [NoCache]
        [RoleAuthorize(UserRole.Administrator,UserRole.SuperAdministrator)]
        public ActionResult SetUpSchool(long? StandardList = 0)
        {
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();
            try
            {
                setUpSchoolModel.lstSchool = SchoolMasterModel.Mapping(new SchoolMasterEntity().GetAllSchoolMaster());
                setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                setUpSchoolModel.lstClass = ClassMasterModel.Mapping(new ClassMasterEntity().GetClassByStandard(Convert.ToInt64(StandardList)));
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            return View(setUpSchoolModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [NoCache]
        public ActionResult SetUpSchool(SetUpSchooolModel setUpSchoolModel)
        {
            SchoolMasterEntity schoolMasterEntity = new SchoolMasterEntity();
            SchoolMaster schoolMaster = null;

            try
            {
                if (setUpSchoolModel.School.SchoolName != null && setUpSchoolModel.School.SchoolId == 0)
                {
                    schoolMaster = schoolMasterEntity.SchoolExist(setUpSchoolModel.School.SchoolName);

                    if (schoolMaster == null)
                    {
                        schoolMaster = new SchoolMaster();
                        schoolMaster.SchoolName = setUpSchoolModel.School.SchoolName;
                        schoolMaster.IsActive = true;
                        schoolMaster.IsDelete = false;
                        schoolMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                        schoolMaster.CreatedOn = DateTime.Now;
                        schoolMasterEntity.Save(schoolMaster);
                        setUpSchoolModel.toasterObject.Message = "School added successfully.";
                    }
                    else
                    {
                        ModelState.AddModelError("", "School already exist.");
                    }
                }
                else if (setUpSchoolModel.School.SchoolName != null && setUpSchoolModel.School.SchoolId != 0)
                {
                    schoolMaster = schoolMasterEntity.GetSchoolMasterById(setUpSchoolModel.School.SchoolId);

                    if (schoolMaster != null)
                    {
                        schoolMaster.SchoolName = setUpSchoolModel.School.SchoolName;
                        schoolMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                        schoolMaster.UpdatedOn = DateTime.Now;
                        schoolMasterEntity.Save(schoolMaster);
                        setUpSchoolModel.toasterObject.Message = "School updated successfully.";
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }

            setUpSchoolModel.lstSchool = SchoolMasterModel.Mapping(new SchoolMasterEntity().GetAllSchoolMaster());
            return PartialView("_schoolTab", setUpSchoolModel);
        }

        [HttpGet]
        [NoCache]
        public JsonResult SchoolExist(string SchoolName)
        {
            SchoolMaster schoolMaster = null;
            try
            {
                schoolMaster = new SchoolMasterEntity().SchoolExist(SchoolName);
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return Json(schoolMaster, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [NoCache]
        public ActionResult ActiveInactiveSchool(long id)
        {
            SchoolMasterEntity schoolMasterEntity = new SchoolMasterEntity();
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();
            try
            {
                SchoolMaster schoolMaster = schoolMasterEntity.GetSchoolMasterById(id);

                if (schoolMaster != null)
                {
                    schoolMaster.IsActive = !schoolMaster.IsActive;
                    schoolMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                    schoolMaster.UpdatedOn = DateTime.Now;
                    schoolMasterEntity.Save(schoolMaster);
                }
                setUpSchoolModel.lstSchool = SchoolMasterModel.Mapping(schoolMasterEntity.GetAllSchoolMaster());
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_schoolTab", setUpSchoolModel);
        }

        [HttpPost]
        [NoCache]
        public ActionResult DeleteSchool(long id)
        {
            SchoolMasterEntity schoolMasterEntity = new SchoolMasterEntity();
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();
            try
            {
                SchoolMaster schoolMaster = schoolMasterEntity.GetSchoolMasterById(id);
                schoolMaster.IsDelete = true;
                schoolMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                schoolMaster.UpdatedOn = DateTime.Now;
                schoolMasterEntity.Save(schoolMaster);
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            setUpSchoolModel.lstSchool = SchoolMasterModel.Mapping(schoolMasterEntity.GetAllSchoolMaster());
            return PartialView("_schoolTab", setUpSchoolModel);
        }

        #endregion

        #region Standard Management

        public JsonResult GetStandard()
        {
            List<StandardMasterModel> standardMasterModel = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
            return Json(standardMasterModel, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult AddStandard(string Standard)
        {
            StandardMasterEntity standardMasterEntity = new StandardMasterEntity();
            bool Result = false;
            try
            {
                StandardMaster standardMaster = standardMasterEntity.GetStandardMasterByStandard(Standard);
                if (standardMaster != null)
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    standardMaster = new StandardMaster();
                    standardMaster.Standard = Standard;
                    standardMaster.IsActive = true;
                    standardMaster.IsDelete = false;
                    standardMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                    standardMaster.CreatedOn = DateTime.Now;
                    standardMasterEntity.Save(standardMaster);
                    RedirectToAction("SetUpSchool");
                    Result = true;    
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
                
            }
            return Json(Result,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [NoCache]
        public ActionResult ManageStandard(SetUpSchooolModel setUpSchoolModel)
        {
            StandardMasterEntity standardMasterEntity = new StandardMasterEntity();
            StandardMaster standardMaster = null;
            try
            {
                if (setUpSchoolModel.Standard.Standard != null && setUpSchoolModel.Standard.StandardId == 0)
                {
                    standardMaster = standardMasterEntity.GetStandardMasterByStandard(setUpSchoolModel.Standard.Standard);

                    if (standardMaster == null)
                    {
                        standardMaster = new StandardMaster();
                        standardMaster.Standard = setUpSchoolModel.Standard.Standard;
                        standardMaster.IsActive = true;
                        standardMaster.IsDelete = false;
                        standardMaster.CreatedBy = Convert.ToInt64(Session["UserId"]);
                        standardMaster.CreatedOn = DateTime.Now;
                        standardMasterEntity.Save(standardMaster);
                        setUpSchoolModel.toasterObject.Message = "Standard added successfully.";
                    }
                    else
                    {
                        ModelState.AddModelError("", "Standard already exist.");
                        setUpSchoolModel.toasterObject.Message = "";
                    }
                }
                else if (setUpSchoolModel.Standard.Standard != null && setUpSchoolModel.Standard.StandardId != 0)
                {
                    standardMaster = standardMasterEntity.GetStandardMasterById(setUpSchoolModel.Standard.StandardId);
                    standardMaster.Standard = setUpSchoolModel.Standard.Standard;
                    standardMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                    standardMaster.UpdatedOn = DateTime.Now;
                    standardMasterEntity.Save(standardMaster);
                    setUpSchoolModel.toasterObject.Message = "Standard updated successfully.";
                }
                else
                {
                    setUpSchoolModel.toasterObject.Message = "";
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }

            setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
            return PartialView("_standardTab", setUpSchoolModel);
        }

        [HttpPost]
        public ActionResult ActiveInactiveStandard(long id)
        {
            StandardMasterEntity standardMasterEntity = new StandardMasterEntity();
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();

            try
            {
                StandardMaster standardMaster = standardMasterEntity.GetStandardMasterById(id);
                if (standardMaster != null)
                {
                    standardMaster.IsActive = !standardMaster.IsActive;
                    standardMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                    standardMaster.UpdatedOn = DateTime.Now;
                    standardMasterEntity.Save(standardMaster);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }

            setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(standardMasterEntity.GetAllStandardMaster());
            return PartialView("_standardTab", setUpSchoolModel);
        }

        [HttpPost]
        [NoCache]
        public ActionResult DeleteStandard(long id)
        {
            StandardMasterEntity standardMasterEntity = new StandardMasterEntity();
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();

            try
            {
                StandardMaster standardMaster = standardMasterEntity.GetStandardMasterById(id);
                standardMaster.IsDelete = true;
                standardMaster.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                standardMaster.UpdatedOn = DateTime.Now;
                standardMasterEntity.Save(standardMaster);
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(standardMasterEntity.GetAllStandardMaster());
            return PartialView("_standardTab", setUpSchoolModel);
        }

        #endregion

        #region Class Management
        [NoCache]
        public ActionResult ManageClass(dynamic manageStudent)
        {
            return View();
        }

        [HttpGet]
        [NoCache]
        public ActionResult FilterClass(long id)
        {
            SetUpSchooolModel setupSchoolModel = new SetUpSchooolModel();
            try
            { 
              setupSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
              setupSchoolModel.lstClass = ClassMasterModel.Mapping(new ClassMasterEntity().GetClassByStandard(Convert.ToInt64(id)));
              setupSchoolModel.StandardId = id;
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_classTab", setupSchoolModel);
        }

        [HttpPost]
        [NoCache]
        public ActionResult ActiveInactiveClass(long standardId, long classId)
        {
            StandardClassMappingEntity standardClassMappingEntity = new StandardClassMappingEntity();
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();
            try
            {
                StandardClassMapping standardClassMapping = standardClassMappingEntity.GetStandardClassMappingById(standardId, classId);
                setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                if (standardClassMapping != null)
                {
                    standardClassMapping.IsActive = !standardClassMapping.IsActive;
                    standardClassMapping.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                    standardClassMapping.UpdatedOn = DateTime.Now;
                    standardClassMappingEntity.Save(standardClassMapping);
                    setUpSchoolModel.lstClass = ClassMasterModel.Mapping(new ClassMasterEntity().GetClassByStandard(standardId));
                    setUpSchoolModel.StandardId = standardId;
                }
                else
                {
                    setUpSchoolModel.lstClass = null;
                    setUpSchoolModel.StandardId = 0;
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_classTab", setUpSchoolModel);
        }

        [HttpPost]
        [NoCache]
        public ActionResult DeleteClass(long standardId, long classId)
        {
            SetUpSchooolModel setUpSchoolModel = new SetUpSchooolModel();
            StandardClassMappingEntity standardClassMappingEntity = new StandardClassMappingEntity();
            try
            {
                StandardClassMapping standardClassMapping = standardClassMappingEntity.GetStandardClassMappingById(standardId, classId);
                setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                if (standardClassMapping != null)
                {
                    standardClassMapping.IsDelete = true;
                    standardClassMapping.IsActive = false;
                    standardClassMapping.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                    standardClassMapping.UpdatedOn = DateTime.Now;
                    standardClassMappingEntity.Save(standardClassMapping);
                    setUpSchoolModel.lstClass = ClassMasterModel.Mapping(new ClassMasterEntity().GetClassByStandard(standardId));
                    setUpSchoolModel.StandardId = standardId;
                }
                else
                {
                    setUpSchoolModel.lstClass = null;
                    setUpSchoolModel.StandardId = 0;
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return PartialView("_classTab", setUpSchoolModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [NoCache]
        public ActionResult ManageClass(SetUpSchooolModel setUpSchoolModel)
        {
            string toasterMessage = "";
            ClassMasterEntity classMasterEntity = new ClassMasterEntity();
            StandardClassMappingEntity standardClassMappingEntity = new StandardClassMappingEntity();
            StandardClassMapping standardClassMapping = null;
            ClassMaster classMaster = null;
            long selectedStandardId = setUpSchoolModel.StandardId;

            try
            {
                if (setUpSchoolModel != null && !string.IsNullOrEmpty(setUpSchoolModel.Class.ClassName))
                {
                    if (setUpSchoolModel.Class.ClassId == 0)
                    {
                        classMaster = classMasterEntity.GetClassMasterByName(setUpSchoolModel.Class.ClassName.Trim());

                        if (classMaster == null)
                        {
                            classMaster = classMasterEntity.Create();
                            classMaster.ClassName = setUpSchoolModel.Class.ClassName;
                            classMaster.IsActive = true;
                            classMaster.IsDelete = false;
                            classMaster.CreatedBy = Convert.ToInt64(Session["UserId"]); ;
                            classMaster.CreatedOn = DateTime.Now;
                            classMasterEntity.Save(classMaster);
                        }
                        setUpSchoolModel.Class = ClassMasterModel.Mapping(classMaster);
                    }
                }

                if (setUpSchoolModel.Class != null && setUpSchoolModel.Standard != null && setUpSchoolModel.Class.ClassId > 0 && setUpSchoolModel.Standard.StandardId > 0)
                {
                    standardClassMapping = standardClassMappingEntity.GetStandardClassMappingById(setUpSchoolModel.Standard.StandardId, setUpSchoolModel.Class.ClassId);

                    if (standardClassMapping != null)
                    {
                        setUpSchoolModel = new SetUpSchooolModel();
                        setUpSchoolModel.isEditAction = false;
                        setUpSchoolModel.oldStandardId = setUpSchoolModel.oldClassId = 0;
                        setUpSchoolModel.lstClass = ClassMasterModel.Mapping(new ClassMasterEntity().GetClassByStandard(selectedStandardId));
                        setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
                        ModelState.AddModelError("", "Class already exist in selected standard.");
                        return PartialView("_classTab", setUpSchoolModel);
                    }

                    if (setUpSchoolModel.oldClassId > 0 && setUpSchoolModel.oldStandardId > 0)
                        standardClassMapping = standardClassMappingEntity.GetStandardClassMappingById(setUpSchoolModel.oldStandardId, setUpSchoolModel.oldClassId);

                    if (standardClassMapping != null)
                    {
                        standardClassMapping.UpdatedBy = Convert.ToInt64(Session["UserId"]);
                        standardClassMapping.UpdatedOn = DateTime.Now;
                        toasterMessage = "Class updated successfully.";
                    }
                    else
                    {
                        standardClassMapping = standardClassMappingEntity.Create();
                        standardClassMapping.IsActive = true;
                        standardClassMapping.IsDelete = false;
                        standardClassMapping.CreatedBy = Convert.ToInt64(Session["UserId"]);
                        standardClassMapping.CreatedOn = DateTime.Now;
                        toasterMessage = "Class added successfully.";
                    }
                    standardClassMapping.StandardId = setUpSchoolModel.Standard.StandardId;
                    standardClassMapping.ClassId = setUpSchoolModel.Class.ClassId;
                    standardClassMappingEntity.Save(standardClassMapping);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            setUpSchoolModel = new SetUpSchooolModel();
            setUpSchoolModel.isEditAction = false;
            setUpSchoolModel.lstStandard = StandardMasterModel.Mapping(new StandardMasterEntity().GetAllStandardMaster());
            setUpSchoolModel.StandardId = standardClassMapping.StandardId;
            setUpSchoolModel.lstClass = ClassMasterModel.Mapping(new ClassMasterEntity().GetClassByStandard(selectedStandardId));
            setUpSchoolModel.toasterObject.Message = toasterMessage;
            return PartialView("_classTab", setUpSchoolModel);
        }

        #endregion


        #region CSV Manage
        public ActionResult ManageCSV()
        {
            string path = HttpContext.Server.MapPath("DataSketchApp\\data").Replace("\\Home", "");

            DirectoryInfo d = new DirectoryInfo(path);

            List<Models.CSVFiles> lstCSVFiles = new List<Models.CSVFiles>();

            foreach (FileInfo file in d.GetFiles("*.csv"))
            {
                lstCSVFiles.Add(new Models.CSVFiles { FileName = file.Name, CreatedOn = file.CreationTime });
            }

            string json = JsonConvert.SerializeObject(lstCSVFiles.Select(x => x.FileName).ToArray());
            //write string to file
            System.IO.File.WriteAllText(path + "\\" + "csvfiles.json", json);
            return View(lstCSVFiles);
        }

        [HttpPost]
        public ActionResult ManageCSV(HttpPostedFileBase uploadedfile)
        {
            string path = HttpContext.Server.MapPath("DataSketchApp\\data").Replace("\\Home", "");

            if (uploadedfile != null && uploadedfile.ContentLength > 0)
            {
                try
                {
                    string filePath = Path.Combine(path, Path.GetFileName(uploadedfile.FileName));
                    uploadedfile.SaveAs(filePath);
                    TempData["Message"] = "File uploaded successfully";
                }
                catch (Exception ex)
                {
                    TempData["Message"] = "ERROR:" + ex.Message.ToString();
                }
            }
            else
            {
                TempData["Message"] = "You have not specified a file.";                
            }

            DirectoryInfo d = new DirectoryInfo(path);
            List<Models.CSVFiles> lstCSVFiles = new List<Models.CSVFiles>();

            foreach (FileInfo file in d.GetFiles("*.csv"))
            {
                lstCSVFiles.Add(new Models.CSVFiles { FileName = file.Name, CreatedOn = file.CreationTime });
            }

            string json = JsonConvert.SerializeObject(lstCSVFiles.Select(x => x.FileName).ToArray());
            //write string to file
            System.IO.File.WriteAllText(path + "\\" + "csvfiles.json", json);
            return View(lstCSVFiles);
        }

        [HttpPost]
        public ActionResult DeleteCSV(string FileName)
        {
            string path = HttpContext.Server.MapPath("DataSketchApp\\data").Replace("\\Home", "");

            if (System.IO.File.Exists(path + "\\" + FileName))
            {
                System.IO.File.Delete(path + "\\" + FileName);
            }

            DirectoryInfo d = new DirectoryInfo(path);
            List<Models.CSVFiles> lstCSVFiles = new List<Models.CSVFiles>();

            foreach (FileInfo file in d.GetFiles("*.csv"))
            {
                lstCSVFiles.Add(new Models.CSVFiles { FileName = file.Name, CreatedOn = file.CreationTime });
            }

            string json = JsonConvert.SerializeObject(lstCSVFiles.Select(x => x.FileName).ToArray());
            //write string to file
            System.IO.File.WriteAllText(path + "\\" + "csvfiles.json", json);

            return PartialView("_partialManageCSV", lstCSVFiles);
        }
        #endregion

        #region Common Helper

        [HttpPost]
        public JsonResult AutoComplete(string prefix, string forWhat)
        {
            try
            {
                switch (forWhat)
                {
                    case "Class":
                        return Json(ClassMasterModel.Mapping(new ClassMasterEntity().GetAllClassMaster(prefix)), JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                logger.Error("An error occured.", ex);
            }
            return Json(string.Empty);
        }
        #endregion
    }
}