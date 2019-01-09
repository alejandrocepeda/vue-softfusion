<template>
    <div>
        <div class="row align-items-center px-3 my-4">
            <div class="col-auto">
                <h6 class="mb-0 text-primary">Approvals list</h6>
            </div>
            <div class="col">

                <button class="btn-success small text-white float-right d-flex align-items-center rounded-0 py-2 px-3" data-toggle="modal" data-target=".modal-add-approval">
                    <span class="ti-plus mr-1"></span>Add new
                </button>
                <form class="d-none d-sm-block float-md-right mr-4 ml-lg-auto">
                    <div class="input-group my-2 my-md-0">
                        <input type="text" placeholder="Search..." class="form-control search">
                        <div class="input-group-prepend ">
                                        <span class="input-group-text rounded-right search-icon">
                                            <span class="ti-search mr-0 "></span>
                                        </span>
                        </div>
                    </div>
                </form>

            </div>

            <!--Modal Approvals -->

            <div class="modal opacity-modal fade note-editor modal-add-approval" tabindex="-1">
                <div class="modal-dialog" role="document">
                    <div class="modal-content rounded-0">
                        <div class="px-5 modal-header rounded-0 bg-primary text-white">
                            <h5 class="modal-title font-weight-normal">Add new approval</h5>
                            <button type="button" class="close" data-dismiss="modal">
                                <span aria-hidden="true" class="text-white font-weight-light">×</span>
                            </button>
                        </div>
                        <div class="modal-body px-5 mt-2">
                            <p class="small text-default">Please fill the fields: </p>

                            <form class="create-form modal-create">
                                <div class="row">
                                    <div class="col mb-4">
                                        <input placeholder="Choose a Lender" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                                    </div>
                                </div>
                                <div class="row d-flex align-items-center">
                                    <div class="col mb-4">
                                        <input placeholder="Payment" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">

                                    </div>
                                    <div class="col mb-4">
                                        <div class="row px-3 mt-4">
                                            <label class="small text-default">Daily </label>
                                            <input class="col ml-1 val-edit" name="periodicity" type="radio">
                                            <label class="small text-default">Weekly </label>
                                            <input type="radio" name="periodicity" class="col ml-1 val-edit">
                                            <label class="small text-default">Monthly </label>
                                            <input type="radio" name="periodicity" class="col ml-1 val-edit">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col mb-4">
                                        <input placeholder="Payback" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                                    </div>
                                    <div class="col mb-4">
                                        <input placeholder="Terms (Months)" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col mb-4">
                                        <input placeholder="Interest Rate (%)" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                                    </div>
                                    <div class="col mb-4">
                                        <input placeholder="Comission (%)" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                                    </div>
                                    <div class="col mb-4">

                                        <input placeholder="Choose Status" class="small border border-bottom border-left-0 border-right-0 border-top-0 form-control rounded-0">
                                    </div>

                                </div>

                            </form>

                        </div>
                        <div class="px-5 col-12 clearfix pt-3 border-top modal-footer justify-content-start">
                            <button class="small rounded-0 px-3 py-2 btn btn-primary btn-sm mr-3 disabled save-note button-validate">
                                Finish
                            </button>
                            <button class="small rounded-0 px-3 py-2 btn btn-outline-primary btn-sm discard" data-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!--End Modal-->

        </div>

        <!--Note: List of approvals-->

        <table class="border-bottom border-bottom-table-secondary border-primary small table text-default">
            <thead>

            <tr id="match-table-header">
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Lender Name
                </th>
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary"></th>

                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Payment
                </th>
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Terms
                </th>
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Loan Approval
                </th>
                <th width="8%" scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Actions
                </th>
            </tr>
            </thead>
            <tbody id="match-table-body">

            <tr>
                <td class="font-weight-normal" style="
    font-size: 1rem;
">First Global <br><span class="text-default small"> R1243568</span><br>
                    <p class="font-weight-normal mb-0 small text-primary"> (458) 245-2145</p>
                </td>
                <td>
                    <img src="http://localhost:8000/img/1stglobal.png" class="img-thumbnail lender-img rounded-circle">
                </td>
                <td>
                    <div><span class="font-size-3 font-weight-heavy">$ 48 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">WEEKLY</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Payback: $ 0</p>
                </td>
                <td>
                    <div class=""><span class="font-size-3 font-weight-heavy">2 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">YEARS</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Interest Rate: 3.5%</p>

                </td>

                <td>
                    <div><span class="font-size-3 font-weight-heavy">$ 120,000 </span>

                    </div>
                    <div class="align-items-center d-flex">
                        <span class="align-items-center badge badge-success d-flex font-weight-light mt-1 p-0 pl-3 pr-4 py-1"> <i class="font-size-1 ti-check ap-icon mr-1 p-0 pt-1"></i> Accepted</span>
                    </div>
                </td>
                <td>
                    <a href="javascript:;" data-toggle="modal" data-target=".modal-add-underwriting" class="mr-2">
                        <span class="ti-pencil-alt text-default view bg-transparent mr-1"></span>
                    </a> <a href="javascript:;" class="mr-3 delete-checked-row">
                    <span class="delete ti-trash text-default bg-transparent mr-1"></span> </a>
                </td>
            </tr>
            <tr>

                <td class="font-weight-normal" style="
    font-size: 1rem;
">Five Tower<br><span class="text-default small"> R1243568</span><br>
                    <p class="font-weight-normal mb-0 small text-primary"> (458) 245-2145</p>

                </td>
                <td>
                    <img src="http://localhost:8000/img/5-tower.jpg" class="img-thumbnail lender-img rounded-circle">
                </td>

                <td>
                    <div><span class="font-size-3 font-weight-heavy">$ 197 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">MONTHLY</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Payback: $ 0</p>

                </td>
                <td>
                    <div class=""><span class="font-size-3 font-weight-heavy">8 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">MONTHS</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Interest Rate: 1.75%</p>

                </td>

                <td>
                    <div><span class="font-size-3 font-weight-heavy">$ 120,000 </span>

                    </div>
                    <div class="align-items-center d-flex">
                        <span class="align-items-center badge badge-danger d-flex font-weight-light mt-1 p-0 pl-3 pr-4 py-1"> <i class="font-size-1 ti-close ap-icon mr-1 p-0 pt-1"></i> Rejected</span>
                    </div>
                </td>
                <td>
                    <a href="javascript:;" data-toggle="modal" data-target=".modal-add-underwriting" class="mr-2">
                        <span class="ti-pencil-alt text-default view bg-transparent mr-1"></span>
                    </a> <a href="javascript:;" class="mr-3 delete-checked-row">
                    <span class="delete ti-trash text-default bg-transparent mr-1"></span> </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: 'approval'
}
</script>

<style scoped>

</style>
