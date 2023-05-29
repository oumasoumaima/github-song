import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { AdminModule } from '../../admin.module';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit{
  formValue !: FormGroup;
  adminModelObj : AdminModule = new AdminModule();
  adminData !: any;
  showAdd! : boolean;
  showUpdate! : boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService){}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      MusicName : [''],
      AuthorName : [''],
      url : [''],

    })
    this.getAllAdmin();
  }
  clickAddMusic(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postAdminDetails(){
    this.adminModelObj.MusicName = this.formValue.value.MusicName;
    this.adminModelObj.AuthorName = this.formValue.value.AuthorName;
    this.adminModelObj.url = this.formValue.value.url;

    this.api.postMusic(this.adminModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Music Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAdmin();
    },
    err=>{
      alert("Something Went wrong");
    })
  }

  getAllAdmin(){
    this.api.getMusic()
    .subscribe(res=>{
      this.adminData = res;
    })
  }
  deleteMusic(row : any){
    this.api.deleteMusic(row.id)
    .subscribe(res=>{
      alert("Music Deleted")
      this.getAllAdmin();
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.adminModelObj.id = row.id;
    this.formValue.controls['MusicName'].setValue(row.MusicName);
    this.formValue.controls['AuthorName'].setValue(row.AuthorName);
    this.formValue.controls['url'].setValue(row.url);

  }
  updatetAdminDetails(){
    this.adminModelObj.MusicName = this.formValue.value.MusicName;
    this.adminModelObj.AuthorName = this.formValue.value.AuthorName;
    this.adminModelObj.url = this.formValue.value.url;
    this.api.updateMusic(this.adminModelObj,this.adminModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfuly");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllAdmin();
    })
  }

}
