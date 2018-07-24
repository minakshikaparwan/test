var newForm = `
    <form action="#" id="newTLForm">
        <div class="form-group row">
            <label for="dtp_input2" class="col-md-2 control-label">Date</label>
            <div class="input-group date col-sm-10" data-date="" data-date-format="d M, y" data-link-field="dtp_input2" data-link-format="d M ,y">
                <input class="form_date form-control " id="date" type="text" readonly  value="">
                <span class="input-group-addon"></span>
            </div> 
        </div>  
        <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title<span class="required"> * </span></label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="title" placeholder="New Title" >
            </div>
        </div>
        <div class="form-group row">
            <label for="content" class="col-sm-2 col-form-label">Content<span class="required"> * </span></label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="content" placeholder="Description Content" >
            </div>
        </div>
        <div class="form-group row">
            <label for="background" class="col-sm-2 col-form-label">Background</label>
            <div class="col-sm-10">
            <input type="color" name="favcolor" id="background" value="#ff0000">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 d-flex justify-content-end">
                <button type="button" class="btn  btn-md" id="cancel"><i class="fa fa-close"></i> Cancel </button>
                <button type="button" class="btn btn-md btn-primary" id="save" value="Save"> Save </button>
            </div>
        </div>
    </form>
`;
