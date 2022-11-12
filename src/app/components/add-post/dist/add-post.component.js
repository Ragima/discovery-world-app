"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddPostComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
// import { user } from '@angular/fire/auth';
var AddPostComponent = /** @class */ (function () {
    function AddPostComponent(fb, database, router, storageService, postDataService) {
        this.fb = fb;
        this.database = database;
        this.router = router;
        this.storageService = storageService;
        this.postDataService = postDataService;
        this.createPostForm = this.fb.group({
            cityName: new forms_1.FormControl('', [forms_1.Validators.required]),
            description: new forms_1.FormControl('', [forms_1.Validators.required]),
            tags: new forms_1.FormControl('', [forms_1.Validators.required]),
            photoUrl: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    }
    AddPostComponent.prototype.ngOnInit = function () {
    };
    AddPostComponent.prototype.onSubmit = function () {
        var _this = this;
        var formValue = this.createPostForm.value;
        var newPost = {};
        this.storageService.getItem('userData').subscribe(function (val) {
            var userData = JSON.parse(val);
            var user = userData.user;
            newPost = {
                id: new Date().getUTCMilliseconds(),
                userId: userData.user.id,
                dateOfCreate: new Date(),
                likes: [],
                comments: [],
                photo: _this.base64Output,
                cityName: formValue.cityName,
                description: formValue.description,
                photoUrl: formValue.photoUrl,
                tags: formValue.tags
            };
            console.log('create------------', formValue, newPost);
            _this.postDataService.addPost(newPost);
            _this.router.navigate(['/posts']);
        });
    };
    AddPostComponent.prototype.onFileSelected = function (event) {
        var _this = this;
        this.convertFile(event.target.files[0]).subscribe(function (base64) {
            _this.base64Output = base64;
        });
    };
    AddPostComponent.prototype.convertFile = function (file) {
        var result = new rxjs_1.ReplaySubject(1);
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (event) { return result.next(btoa(event.target.result.toString())); };
        return result;
    };
    AddPostComponent = __decorate([
        core_1.Component({
            selector: 'app-add-post',
            templateUrl: './add-post.component.html',
            styleUrls: ['./add-post.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AddPostComponent);
    return AddPostComponent;
}());
exports.AddPostComponent = AddPostComponent;
