$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "400",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
});
function CancelAction(Action) {
    if (Action == "Students")
        window.location.href = 'Students';
    else if (Action == "Teachers")
        window.location.href = 'Teachers';
    else if (Action == "Administrator")
        window.location.href = 'Administrator';
}
function InitDataTable(controlId) {
    if (window["dataTable" + controlId]) {
        window["dataTable" + controlId].clear();
        window["dataTable" + controlId].destroy();
    }
    //$('.dataTables-example').DataTable().clear().destroy();

    window["dataTable" + controlId] = $('#' + controlId).DataTable({
        "order": [[0, "asc"]],
        pageLength: 10,
        responsive: true,
        dom: 'frtip',
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [-1]
            }
        ],
        "bStateSave": true,
        "fnStateSave": function (oSettings, oData) {
            localStorage.setItem('offersDataTables' + controlId, JSON.stringify(oData));
        },
        "fnStateLoad": function (oSettings) {
            return JSON.parse(localStorage.getItem('offersDataTables' + controlId));
        }
    });
}