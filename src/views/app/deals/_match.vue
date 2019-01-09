<template>
    <div>
        <div class="row align-items-center px-3 my-4">
            <div class="col-auto">
                <h6 class="mb-0 text-primary">Matchs lenders</h6>
            </div>
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

        <!--Note: List of matchs-->

        <table class="border-bottom  border-bottom-table-secondary  border-primary small table text-default">
            <thead>

            <tr>
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Lender Name
                </th>
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary"></th>

                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Interest rate
                </th>
                <th scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Terms
                </th>

                <th width="20%" scope="col" class="border-bottom-table-secondary border-top-table-secondary">
                    Status
                </th>
            </tr>
            </thead>
            <tbody>

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
                    <div><span class="font-size-3 font-weight-heavy">1.25 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">% RATE</span>
                    </div>
                    <div class="align-items-center d-flex">
                        <span class="align-items-center badge badge-danger d-flex font-weight-light mt-1 p-0 pl-1 pr-2 py-1"> <i class="font-size-1 ti-medall mr-0 p-0 pt-1"></i> Recommended</span>
                    </div>
                </td>
                <td>
                    <div class=""><span class="font-size-3 font-weight-heavy">2 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">YEARS</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Updated: May 10 - 2018</p>

                </td>

                <td>
                    <button class="align-items-center btn-primary d-flex font-weight-light pb-1 pr-3 pt-2 rounded-0 text-white">
                        <span class="ion ion-ios-paperplane top-05 position-relative mr-1"></span>Send
                        Docs
                    </button>
                    <a href="javascript:;" class="d-block font-weight-normal mt-2 pt-1 small text-primary"><span class="font-size-1 ti-medall mr-1 pl-0"></span><span class="position-relative text-default top-1-negative">Lender Details</span>
                    </a>

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
                    <div><span class="font-size-3 font-weight-heavy">1.97 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">% RATE</span>
                    </div>

                </td>
                <td>
                    <div class=""><span class="font-size-3 font-weight-heavy">8 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">MONTHS</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Updated: May 10 - 2018</p>

                </td>

                <td>
                    <button class="align-items-center btn-primary d-flex font-weight-light pb-1 pr-3 pt-2 rounded-0 text-white">
                        <span class="ion ion-ios-paperplane top-05 position-relative mr-1"></span>Send
                        Docs
                    </button>
                    <a href="javascript:;" class="d-block font-weight-normal mt-2 pt-1 small text-primary"><span class="font-size-1 ti-medall mr-1 pl-0"></span><span class="position-relative text-default top-1-negative">Lender Details</span>
                    </a>

                </td>
            </tr>
            <tr>

                <td class="font-weight-normal" style="
    font-size: 1rem;
">Globality<br><span class="text-default small"> R1243568</span><br>
                    <p class="font-weight-normal mb-0 small text-primary"> (458) 245-2145</p>

                </td>
                <td>
                    <img src="http://localhost:8000/img/1stglobal.png" class="img-thumbnail lender-img rounded-circle">
                </td>

                <td>
                    <div><span class="font-size-3 font-weight-heavy">1.07 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">% RATE</span>
                    </div>
                    <div class="align-items-center d-flex">
                        <span class="align-items-center badge badge-danger d-flex font-weight-light mt-1 p-0 pl-1 pr-2 py-1"> <i class="font-size-1 ti-medall mr-0 p-0 pt-1"></i> Recommended</span>
                    </div>
                </td>
                <td>
                    <div class=""><span class="font-size-3 font-weight-heavy">5 </span>
                        <span class="font-edit-size position-relative top-2-negative font-weight-heavy">YEARS</span>
                    </div>
                    <p class="font-weight-normal mb-0 mt-1 position-relative small top-05">
                        Updated: May 10 - 2018</p>

                </td>

                <td>
                    <button class="align-items-center btn-primary d-flex font-weight-light pb-1 pr-3 pt-2 rounded-0 text-white">
                        <span class="ion ion-ios-paperplane top-05 position-relative mr-1"></span>Send
                        Docs
                    </button>
                    <a href="javascript:;" class="d-block font-weight-normal mt-2 pt-1 small text-primary"><span class="font-size-1 ti-medall mr-1 pl-0"></span><span class="position-relative text-default top-1-negative">Lender Details</span>
                    </a>

                </td>
            </tr>

            </tbody>

        </table>
    </div>
</template>

<script>
export default {
  name: 'match'
}
</script>

<style scoped>

</style>
